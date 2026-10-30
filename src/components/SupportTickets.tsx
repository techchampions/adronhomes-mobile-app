import React, { useState } from "react";
import { FiChevronLeft, FiPlus, FiX } from "react-icons/fi";
import { formatDate } from "../data/utils";
import {
  SupportTicket,
  TicketMessage,
  useCreateSupportTicket,
  useReplySupportTicket,
  useSupportTicket,
  useSupportTickets,
} from "../hooks/support/useSupportTickets";
import InlineLoading from "./InlineLoading";

function when(value?: string) {
  if (!value) return "";
  return new Date(value).toLocaleString("en-NG", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const SupportTickets: React.FC = () => {
  const { data, isLoading, isError } = useSupportTickets();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const tickets = data?.data || [];

  return (
    <section className="rounded-3xl bg-white p-4 md:p-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="font-bold text-[#032147]">Support tickets</h4>
          <p className="mt-1 text-sm text-gray-500">
            Open a ticket and read replies from Adron support.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#032147] px-5 text-sm font-semibold text-white"
        >
          <FiPlus />
          New ticket
        </button>
      </div>

      {isLoading && <InlineLoading text="Loading tickets..." />}
      {isError && <p className="text-sm text-red-600">Could not load your tickets.</p>}
      {!isLoading && !isError && tickets.length === 0 && (
        <div className="rounded-2xl bg-gray-50 px-6 py-14 text-center text-sm text-gray-500">
          You have not created a ticket yet.
        </div>
      )}

      {!isLoading && !isError && tickets.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <div className={`space-y-2 ${selectedId ? "hidden lg:block" : ""}`}>
            {tickets.map((ticket) => (
              <button
                key={ticket.id}
                type="button"
                onClick={() => setSelectedId(ticket.id)}
                className={`w-full rounded-2xl border p-4 text-left ${
                  selectedId === ticket.id
                    ? "border-[#79B833] bg-[#79B833]/10"
                    : "border-gray-100 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-[#032147]">{ticket.subject}</p>
                  <Status status={ticket.status} />
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                  {ticket.latest_message?.body || "No messages yet"}
                </p>
                <p className="mt-2 text-xs text-gray-400">{formatDate(ticket.updated_at)}</p>
              </button>
            ))}
          </div>
          <div className={selectedId ? "" : "hidden lg:block"}>
            {selectedId && (
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="mb-3 flex items-center gap-1 text-sm font-semibold text-[#032147] lg:hidden"
              >
                <FiChevronLeft />
                Back to tickets
              </button>
            )}
            <TicketThread ticketId={selectedId} />
          </div>
        </div>
      )}

      {creating && (
        <NewTicketModal
          onClose={() => setCreating(false)}
          onCreated={(ticket) => {
            setCreating(false);
            setSelectedId(ticket.id);
          }}
        />
      )}
    </section>
  );
};

function TicketThread({ ticketId }: { ticketId: number | null }) {
  const { data, isLoading } = useSupportTicket(ticketId || undefined);
  const { mutate, isPending } = useReplySupportTicket();
  const [message, setMessage] = useState("");
  const ticket = data?.data;

  if (!ticketId) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-2xl bg-gray-50 text-sm text-gray-500">
        Select a ticket to read the conversation.
      </div>
    );
  }

  if (isLoading || !ticket) {
    return (
      <div className="min-h-72 rounded-2xl bg-gray-50">
        <InlineLoading text="Loading ticket..." />
      </div>
    );
  }

  const send = () => {
    const body = message.trim();
    if (!body) return;
    mutate(
      { id: ticket.id, message: body },
      { onSuccess: () => setMessage("") }
    );
  };

  return (
    <div className="flex min-h-72 flex-col rounded-2xl border border-gray-100">
      <div className="border-b border-gray-100 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <h5 className="font-semibold text-[#032147]">{ticket.subject}</h5>
          <Status status={ticket.status} />
        </div>
        <p className="mt-1 text-xs text-gray-400">Opened {formatDate(ticket.created_at)}</p>
      </div>
      <div className="flex-1 space-y-3 px-5 py-4">
        {(ticket.messages || []).map((item) => (
          <MessageBubble key={item.id} message={item} />
        ))}
      </div>
      {ticket.status === "closed" ? (
        <p className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
          This ticket is closed. Support replies stay on the thread.
        </p>
      ) : (
        <form
          className="border-t border-gray-100 p-4"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={3}
            placeholder="Write a reply"
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#79B833]"
          />
          <button
            type="submit"
            disabled={isPending || !message.trim()}
            className="mt-3 h-11 rounded-full bg-[#79B833] px-5 text-sm font-semibold text-white disabled:bg-gray-200 disabled:text-gray-400"
          >
            {isPending ? "Sending..." : "Send reply"}
          </button>
        </form>
      )}
    </div>
  );
}

function MessageBubble({ message }: { message: TicketMessage }) {
  const fromSupport = message.author_role === "support";
  return (
    <div className={`flex ${fromSupport ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          fromSupport ? "bg-[#79B833]/10 text-[#032147]" : "bg-[#032147] text-white"
        }`}
      >
        <p className={`text-xs font-semibold ${fromSupport ? "text-[#5d8f24]" : "text-white/70"}`}>
          {fromSupport ? "Adron support" : "You"}
        </p>
        <p className="mt-1 whitespace-pre-wrap text-sm leading-6">{message.body}</p>
        <p className={`mt-2 text-xs ${fromSupport ? "text-gray-400" : "text-white/60"}`}>
          {when(message.created_at)}
        </p>
      </div>
    </div>
  );
}

function NewTicketModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (ticket: SupportTicket) => void;
}) {
  const { mutate, isPending } = useCreateSupportTicket();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    if (!subject.trim() || !message.trim()) return;
    mutate(
      { subject: subject.trim(), message: message.trim() },
      { onSuccess: (data) => data.data && onCreated(data.data) }
    );
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4">
      <form
        className="w-full max-w-lg rounded-3xl bg-white p-6"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-xl font-bold text-[#032147]">New ticket</h4>
          <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
            <FiX className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-gray-700">Subject</span>
          <input
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="What do you need help with?"
            className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#79B833]"
          />
        </label>
        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-medium text-gray-700">Message</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={5}
            placeholder="Describe the issue"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#79B833]"
          />
        </label>
        <button
          type="submit"
          disabled={isPending || !subject.trim() || !message.trim()}
          className="mt-5 h-12 w-full rounded-full bg-[#032147] text-sm font-semibold text-white disabled:bg-gray-200 disabled:text-gray-400"
        >
          {isPending ? "Creating..." : "Create ticket"}
        </button>
      </form>
    </div>
  );
}

function Status({ status }: { status: SupportTicket["status"] }) {
  const open = status === "open";
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
        open ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
      }`}
    >
      {open ? "Open" : "Closed"}
    </span>
  );
}

export default SupportTickets;
