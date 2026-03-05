import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
}

interface PageBtnProps {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

function PageBtn({ children, active, onClick, disabled }: PageBtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[36px] h-9 border rounded-md px-2 flex items-center justify-center text-[14px] transition-all ${
        active
          ? "border-[1.5px] border-[#1a56db] text-[#1a56db] font-bold"
          : "border-[#e0e0e0] text-[#444] font-normal hover:bg-gray-50"
      } ${disabled ? "text-[#ccc] cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      {children}
    </button>
  );
}

export function Pagination({ total, page, setPage, pageSize }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  const pages: (number | string)[] =
    totalPages <= 6
      ? Array.from({ length: totalPages }, (_, i) => i + 1)
      : [1, 2, 3, 4, "...", totalPages];

  const visibleCount = Math.min(pageSize, total - (page - 1) * pageSize);

  return (
    <div className="flex items-center justify-between py-5 pb-1 font-sans">
      <span className="text-[13px] text-[#888]">
        You're viewing {visibleCount} out of {total} patients
      </span>

      <div className="flex gap-1">
        <PageBtn onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          <ChevronLeft size={14} />
        </PageBtn>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="flex items-center px-1 text-[#888]">
              …
            </span>
          ) : (
            <PageBtn
              key={p}
              active={p === page}
              onClick={() => typeof p === "number" && setPage(p)}
            >
              {p}
            </PageBtn>
          )
        )}

        <PageBtn
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || totalPages === 0}
        >
          <ChevronRight size={14} />
        </PageBtn>
      </div>
    </div>
  );
}
