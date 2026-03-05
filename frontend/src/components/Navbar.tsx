import { useState, useRef, useEffect } from "react";
import {
  LayoutGrid,
  Truck,
  Users,
  Bike,
  Shield,
  ChevronDown,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

interface Tab {
  label: string;
  Icon: LucideIcon;
}

const TABS: Tab[] = [
  { label: "Overview", Icon: LayoutGrid },
  { label: "Deliveries", Icon: Truck },
  { label: "Patients", Icon: Users },
  { label: "Dispatch Riders", Icon: Bike },
  { label: "Admin", Icon: Shield },
];

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3498db] to-[#2980b9] flex items-center justify-center text-[13px] font-bold text-white shrink-0">
      {initials}
    </div>
  );
}

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const adminName = user?.name || "Admin User";

  // Close menus on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Close drawer on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setDrawerOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function handleTabSelect(label: string) {
    setActiveTab(label);
    setDrawerOpen(false);
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <>
      <nav className="bg-white border-b border-[#e8e8e8] flex items-center px-4 md:px-8 h-16 sticky top-0 z-[100] shadow-xs font-sans">
        {/* Logo */}
        <div className="w-10 h-10 rounded-full border-2 border-[#e0e0e0] overflow-hidden flex items-center justify-center bg-[#F8F9FB] shrink-0">
          <img
            src="/logo.png"
            alt="Nimcure"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Desktop tabs */}
        <div className="hidden md:flex flex-1 items-center gap-1 ml-8">
          {TABS.map(({ label, Icon }) => {
            const active = activeTab === label;
            return (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`flex items-center gap-1.5 px-4 h-16 bg-transparent border-none text-[14px] cursor-pointer transition-all border-b-[2.5px] ${
                  active
                    ? "text-[#1a56db] font-semibold border-[#1a56db]"
                    : "text-[#888] font-normal border-transparent hover:text-[#555]"
                }`}
              >
                <Icon
                  size={16}
                  className={active ? "opacity-100" : "opacity-60"}
                />
                {label}
              </button>
            );
          })}
        </div>

        {/* Spacer on mobile */}
        <div className="flex-1 md:hidden" />

        {/* Admin (desktop) */}
        <div
          className="hidden md:flex items-center gap-2.5 relative"
          ref={userMenuRef}
        >
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <AvatarPlaceholder name={adminName} />
            <span className="text-[14px] font-medium text-[#222]">
              {adminName}
            </span>
            <ChevronDown size={14} />
          </div>

          {showUserMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#e8e8e8] rounded-lg shadow-lg py-1 z-[200]">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-[14px] text-red-600 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <div className="flex md:hidden items-center gap-3">
          <AvatarPlaceholder name={adminName} />
          <button
            onClick={() => setDrawerOpen((v) => !v)}
            className="p-2 rounded-lg text-[#555] hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer"
            aria-label="Open menu"
          >
            {drawerOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[150] md:hidden transition-opacity duration-200 ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-[260px] bg-white z-[200] shadow-xl md:hidden flex flex-col transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#f0f0f0] shrink-0">
          <div className="w-9 h-9 rounded-full border-2 border-[#e0e0e0] overflow-hidden flex items-center justify-center bg-[#F8F9FB]">
            <img
              src="/logo.png"
              alt="Nimcure"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 rounded-lg text-[#888] hover:bg-gray-100 border-none bg-transparent cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer nav items */}
        <div className="flex-1 overflow-y-auto py-3">
          {TABS.map(({ label, Icon }) => {
            const active = activeTab === label;
            return (
              <button
                key={label}
                onClick={() => handleTabSelect(label)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-[15px] border-none bg-transparent cursor-pointer transition-colors text-left ${
                  active
                    ? "bg-[#f0f5ff] text-[#1a56db] font-semibold border-r-[3px] border-r-[#1a56db]"
                    : "text-[#555] font-normal hover:bg-gray-50"
                }`}
              >
                <Icon
                  size={18}
                  className={active ? "opacity-100" : "opacity-60"}
                />
                {label}
              </button>
            );
          })}
        </div>

        {/* Drawer footer – admin info */}
        <div className="px-5 py-4 border-t border-[#f0f0f0] flex flex-col gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <AvatarPlaceholder name={adminName} />
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-[#222] truncate">
                {adminName}
              </p>
              {user?.role && (
                <p className="text-[12px] text-[#888]">{user.role}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-[14px] font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border-none cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
