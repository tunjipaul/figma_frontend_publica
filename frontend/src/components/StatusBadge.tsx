import type { Patient } from "../types/patient";

type Status = Patient["status"];

const STATUS_STYLE: Record<Status, { bg: string; text: string; border: string }> = {
  "Completed":    { bg: "bg-[#e8f8f0]", text: "text-[#27ae60]", border: "border-[#a8e6c4]" },
  "Due & Paid":   { bg: "bg-[#fff8e6]", text: "text-[#e6a817]", border: "border-[#f5d68a]" },
  "Due & Unpaid": { bg: "bg-[#fdecea]", text: "text-[#e74c3c]", border: "border-[#f5b7b1]" },
  "Assigned":     { bg: "bg-[#eaf4fb]", text: "text-[#2980b9]", border: "border-[#aed6f1]" },
  "Paid":         { bg: "bg-[#e8f8f0]", text: "text-[#1e8449]", border: "border-[#a9dfbf]" },
};

const FALLBACK = { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200" };

export function StatusBadge({ status }: { status: Status }) {
  const s = STATUS_STYLE[status] ?? FALLBACK;
  return (
    <span
      className={`${s.bg} ${s.text} border ${s.border} rounded-[6px] px-3 py-1 text-[13px] font-semibold whitespace-nowrap inline-block`}
    >
      {status}
    </span>
  );
}
