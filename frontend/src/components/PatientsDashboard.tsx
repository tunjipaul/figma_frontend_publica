import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Plus } from "lucide-react";
import { usePatientStore, type SortOption } from "../store/patientStore";
import type { Patient } from "../types/patient";
import { Navbar } from "./Navbar";
import { Pagination } from "./Pagination";
import { StatusBadge } from "./StatusBadge";

// ─── Constants ────────────────────────────────────────────────────────────────
const SORT_OPTIONS: SortOption[] = [
  "Hospital ID",
  "Patient Name",
  "Status",
  "Next Delivery",
];

const TABLE_HEADERS = [
  "Hospital ID",
  "Patient's Name",
  "Phone Number",
  "Next Delivery Date",
  "Location",
  "Status",
  "",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  const d = new Date(iso);
  const day = d.getDate();
  let suffix = "th";
  if (day % 10 === 1 && day !== 11) suffix = "st";
  else if (day % 10 === 2 && day !== 12) suffix = "nd";
  else if (day % 10 === 3 && day !== 13) suffix = "rd";
  return `${day}${suffix} ${d.toLocaleString("en-GB", { month: "long" })} ${d.getFullYear()}`;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PatientsDashboard() {
  const [activeTab, setActiveTab] = useState("Patients");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const {
    searchQuery,
    sortBy,
    currentPage,
    pageSize,
    setSearchQuery,
    setSortBy,
    setCurrentPage,
    getFilteredPatients,
    getPaginatedPatients,
  } = usePatientStore();

  const filteredCount = getFilteredPatients().length;
  const paginated = getPaginatedPatients();

  // Close sort dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowSortMenu(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleSortSelect(option: SortOption) {
    setSortBy(option);
    setShowSortMenu(false);
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-6 md:mb-7">
          <h1 className="text-[22px] md:text-[26px] font-bold text-[#111]">
            {activeTab}
          </h1>
          {activeTab === "Patients" && (
            <button className="flex items-center gap-2 bg-[#1a56db] text-white rounded-lg px-4 md:px-5 py-2 md:py-2.5 text-[13px] md:text-[14px] font-semibold cursor-pointer shadow-xs hover:bg-[#154fc1] transition-all border-none whitespace-nowrap">
              <Plus size={16} />
              <span className="hidden sm:inline">Add Patient</span>
              <span className="sm:hidden">Add</span>
            </button>
          )}
        </div>

        {activeTab === "Patients" ? (
          <>
            {/* ── Filters ── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              {/* Sort dropdown */}
              <div ref={sortRef} className="flex items-center gap-2 relative">
                <span className="text-[13px] text-[#888] font-medium shrink-0">
                  Sort by
                </span>
                <button
                  onClick={() => setShowSortMenu((v) => !v)}
                  className="flex items-center gap-1.5 bg-white border border-[#e0e0e0] rounded-[7px] px-3.5 py-1.5 text-[14px] font-semibold text-[#222] cursor-pointer"
                >
                  {sortBy}
                  <ChevronDown size={14} />
                </button>
                {showSortMenu && (
                  <div className="absolute top-[110%] left-0 bg-white border border-[#e0e0e0] rounded-lg shadow-lg z-[200] min-w-[160px] overflow-hidden">
                    {SORT_OPTIONS.map((o) => (
                      <div
                        key={o}
                        onClick={() => handleSortSelect(o)}
                        className={`px-4 py-2.5 text-[14px] cursor-pointer transition-colors ${
                          sortBy === o
                            ? "bg-[#f0f5ff] text-[#1a56db] font-semibold"
                            : "text-[#333] hover:bg-gray-50"
                        }`}
                      >
                        {o}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Search — full width on mobile */}
              <div className="relative w-full sm:w-[260px]">
                <Search
                  size={16}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#aaa]"
                />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by patient name, id"
                  className="w-full pl-9 pr-3 py-2 border border-[#e0e0e0] rounded-lg text-[13px] text-[#333] bg-white outline-none focus:border-[#1a56db] transition-colors"
                />
              </div>
            </div>

            {/* ── Table (horizontally scrollable on small screens) ── */}
            <div className="bg-white rounded-xl border border-[#e8e8e8] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <div className="min-w-[860px]">
                  {/* Header row */}
                  <div className="grid grid-cols-[150px_1fr_160px_180px_120px_160px_80px] px-6 py-3 border-b border-[#f0f0f0] bg-[#fafafa]">
                    {TABLE_HEADERS.map((h, i) => (
                      <span
                        key={i}
                        className="text-[13px] font-semibold text-[#888]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Data rows */}
                  {paginated.length === 0 ? (
                    <div className="p-10 text-center text-[#aaa] text-[14px]">
                      No patients found.
                    </div>
                  ) : (
                    paginated.map((patient) => (
                      <div
                        key={patient.id}
                        className="grid grid-cols-[150px_1fr_160px_180px_120px_160px_80px] px-6 py-4 border-b border-[#f5f5f5] items-center hover:bg-[#f0f5ff] transition-all last:border-none"
                      >
                        <span className="text-[14px] text-[#555] font-mono tracking-tight">
                          {patient.hospitalId}
                        </span>
                        <span className="text-[14px] font-medium text-[#111]">
                          {patient.name}
                        </span>
                        <span className="text-[14px] text-[#555]">
                          {patient.phone}
                        </span>
                        <span className="text-[14px] text-[#555]">
                          {formatDate(patient.nextDeliveryDate)}
                        </span>
                        <span className="text-[14px] text-[#555]">
                          {patient.location}
                        </span>
                        <StatusBadge status={patient.status as Patient["status"]} />
                        <button className="bg-white border border-[#d0d0d0] rounded-[7px] px-4 py-1.5 text-[13px] font-medium text-[#333] cursor-pointer hover:border-[#1a56db] hover:text-[#1a56db] transition-all">
                          View
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* ── Pagination ── */}
            {filteredCount > 0 && (
              <Pagination
                total={filteredCount}
                page={currentPage}
                setPage={setCurrentPage}
                pageSize={pageSize}
              />
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl border border-[#e8e8e8] shadow-xs p-10 text-center">
            <h2 className="text-[18px] font-semibold text-[#555] mb-2">
              {activeTab} Content
            </h2>
            <p className="text-[#888]">This section is currently under development.</p>
          </div>
        )}
      </main>
    </div>
  );
}
