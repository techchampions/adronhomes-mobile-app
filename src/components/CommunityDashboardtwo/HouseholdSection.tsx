import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import {
  HouseholdKind,
  HouseholdMember,
  useHousehold,
} from "../../hooks/estateCommunity/useEstateCommunity";
import InlineLoading from "../InlineLoading";
import AddHouseholdMember from "./AddHouseholdMember";
import HouseholdDigitalId from "./HouseholdDigitalId";

const HouseholdSection: React.FC = () => {
  const context: CommunityOutletContext = useOutletContext();
  const estateId = context.data?.estate_info.id;
  const estateName = context.data?.estate_info.name;
  const { data, isLoading, isError } = useHousehold(estateId);
  const [tab, setTab] = useState<HouseholdKind>("family");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<HouseholdMember | null>(null);
  const [idMember, setIdMember] = useState<HouseholdMember | null>(null);

  const members = data?.data || [];
  const familyCount = members.filter((member) => member.kind === "family").length;
  const staffCount = members.filter((member) => member.kind === "staff").length;
  const visible = members.filter((member) => member.kind === tab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Family and Staff</h3>
          <p className="mt-1 text-sm text-gray-500">
            People in your household at {estateName || "this estate"}.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-[#79B833] to-[#8FD14F] px-5 py-2.5 text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#79B833]/30"
        >
          <FiPlus className="h-5 w-5" />
          <span>{tab === "family" ? "Add family member" : "Add staff"}</span>
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setTab("family")}
          className={`rounded-xl border p-4 text-left ${
            tab === "family"
              ? "border-[#79B833] bg-[#79B833]/10"
              : "border-gray-100 bg-white"
          }`}
        >
          <p className="text-sm text-gray-500">Family</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{familyCount}</p>
        </button>
        <button
          type="button"
          onClick={() => setTab("staff")}
          className={`rounded-xl border p-4 text-left ${
            tab === "staff"
              ? "border-[#79B833] bg-[#79B833]/10"
              : "border-gray-100 bg-white"
          }`}
        >
          <p className="text-sm text-gray-500">Staff</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{staffCount}</p>
        </button>
      </div>

      <div className="flex gap-2">
        {(["family", "staff"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`h-10 rounded-full px-5 text-sm font-medium ${
              tab === item ? "bg-[#79B833] text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            {item === "family" ? "Family" : "Staff"}
          </button>
        ))}
      </div>

      {isLoading && <InlineLoading text="Loading household..." />}
      {isError && (
        <p className="text-sm text-red-600">Could not load family and staff.</p>
      )}
      {!isLoading && !isError && visible.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center text-sm text-gray-500">
          No {tab === "family" ? "family members" : "staff"} added yet.
        </div>
      )}
      {!isLoading && !isError && visible.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((member) => (
            <article
              key={member.id}
              className="rounded-2xl border border-gray-100 bg-white p-5"
            >
              <div className="flex items-start gap-4">
                <MemberPhoto member={member} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    {member.role_label}
                  </p>
                  <h4 className="mt-1 text-lg font-medium text-gray-800">
                    {member.full_name}
                  </h4>
                  <p className="mt-3 text-sm text-gray-800">{member.phone}</p>
                  {member.email && (
                    <p className="mt-1 truncate text-sm text-gray-500">{member.email}</p>
                  )}
                  <p className="mt-3 text-xs text-gray-400">{estateName}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIdMember(member)}
                  className="h-10 rounded-full bg-[#032147] text-sm font-semibold text-white"
                >
                  Digital ID
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(member);
                    setShowForm(true);
                  }}
                  className="h-10 rounded-full border border-gray-200 text-sm font-semibold text-[#032147] hover:border-[#79B833] hover:text-[#79B833]"
                >
                  Edit
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {idMember && (
        <HouseholdDigitalId
          member={idMember}
          estateName={estateName}
          onClose={() => setIdMember(null)}
        />
      )}
      {showForm && estateId && (
        <AddHouseholdMember
          estateId={estateId}
          kind={editing?.kind || tab}
          member={editing || undefined}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
};

function MemberPhoto({ member }: { member: HouseholdMember }) {
  const initials = member.full_name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#79B833]/15 text-sm font-semibold text-[#032147]">
      {member.profile_picture ? (
        <img src={member.profile_picture} alt="" className="h-full w-full object-cover" />
      ) : (
        initials || "P"
      )}
    </span>
  );
};

export default HouseholdSection;
