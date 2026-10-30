import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { FiChevronLeft } from "react-icons/fi";
import { HouseholdMember } from "../../hooks/estateCommunity/useEstateCommunity";

interface Prop {
  member: HouseholdMember;
  estateName?: string;
  onClose: () => void;
}

export function householdIdNumber(estateId: number, memberId: number) {
  const estate = String(estateId).padStart(4, "0");
  const person = String(memberId).padStart(6, "0");
  return `AH-${estate}-${person}`;
}

function displayId(value: string) {
  const [, estate, person] = value.split("-");
  return `AH - ${estate} - ${person}`;
}

const HouseholdDigitalId: React.FC<Prop> = ({ member, estateName, onClose }) => {
  const [qrUrl, setQrUrl] = useState("");
  const idNumber = householdIdNumber(member.estate_id, member.id);
  const idType = member.kind === "staff" ? "Staff ID" : "Family ID";
  const place = estateName || "Adron Homes";
  const initials = member.full_name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  useEffect(() => {
    let cancelled = false;
    const payload = [
      "Adron Homes Household ID",
      idNumber,
      member.full_name,
      `${idType} · ${member.role_label}`,
      place,
    ].join("\n");

    QRCode.toDataURL(payload, {
      margin: 1,
      width: 280,
      color: { dark: "#032147", light: "#ffffff" },
    })
      .then((url) => {
        if (!cancelled) setQrUrl(url);
      })
      .catch(() => {
        if (!cancelled) setQrUrl("");
      });

    return () => {
      cancelled = true;
    };
  }, [idNumber, idType, member.full_name, member.role_label, place]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <article
        className="flex h-[min(720px,92vh)] w-full max-w-[390px] flex-col overflow-hidden rounded-[36px] bg-[#032147] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between px-4 pt-5 text-white">
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Close digital ID"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <p className="text-sm font-semibold tracking-[0.22em]">ADRON</p>
          <span className="h-9 w-9" />
        </header>

        <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-6 pt-2 text-center text-white">
          <div className="rounded-full bg-white p-1 ring-4 ring-[#79B833]">
            {member.profile_picture ? (
              <img
                src={member.profile_picture}
                alt=""
                className="h-28 w-28 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-28 w-28 items-center justify-center rounded-full bg-[#F4F7F2] text-2xl font-semibold text-[#032147]">
                {initials || "ID"}
              </span>
            )}
          </div>

          <h2 className="mt-5 text-2xl font-semibold">{member.full_name}</h2>
          <span className="mt-3 rounded-lg bg-[#79B833] px-3 py-1 text-sm font-semibold text-white">
            {member.role_label}
          </span>

          <div className="mt-6 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <AdronMark />
            </span>
            <p className="text-xl font-bold tracking-wide">ADRON HOMES</p>
          </div>

          <div className="mt-4 space-y-1 text-sm text-white/80">
            <p>ID type: {idType}</p>
            <p>Estate: {place}</p>
            <p>Identifier: {idNumber}</p>
          </div>
        </div>

        <div className="mx-4 mb-4 shrink-0 rounded-[28px] bg-white px-5 pb-4 pt-4 text-[#032147]">
          <div className="border-b-4 border-[#79B833] pb-3">
            <p className="text-sm font-bold">Check ID</p>
            <p className="mt-1 text-sm leading-5 text-gray-600">
              Show this card at the estate gate. The QR code carries this household ID.
            </p>
          </div>
          <p className="mt-3 text-center text-sm font-semibold">ID no: {displayId(idNumber)}</p>
          <div className="mt-2 flex justify-center">
            {qrUrl ? (
              <img src={qrUrl} alt="" className="h-32 w-32" />
            ) : (
              <div className="h-32 w-32 animate-pulse rounded-lg bg-gray-100" />
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

function AdronMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
      <path
        d="M16 4 6 14h4v10h12V14h4L16 4Z"
        fill="#79B833"
      />
    </svg>
  );
}

export default HouseholdDigitalId;
