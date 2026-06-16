import { useNavigate } from "react-router";
import { useSidebar } from "../hooks/useSidebar";
import { useUser } from "../hooks/useUser";

const navigation = [
  {
    section: "Overview",
    items: [
      { id: 1, name: "Dashboard", path: "/dashboard", icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      )},
      { id: 2, name: "Trade Journal", path: "/journal", icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
        </svg>
      )},
      { id: 3, name: "Analytics", path: "/analytics", icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      )},
      { id: 4, name: "History", path: "/history", icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      )},
      { id: 5, name: "Strategies", path: "/strategies", icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
        </svg>
      )},
    ],
  },
  {
    section: "Account",
    items: [
      { id: 6, name: "Profile", path: "/profile", icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      )},
      { id: 7, name: "Settings", path: "/setting", icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
      )},
    ],
  },
];

export default function SideBar() {
  const { closeSidebar, currentPath, setCurrentPath } = useSidebar();
  const { user } = useUser();
  const navigate = useNavigate();

  const initials = user.full_name
    ? user.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "TV";

  const handleNavigation = (item: { id: number; name: string; path: string }) => {
    setCurrentPath(item.name);
    navigate(item.path);
  };

  return (
    <div className="flex flex-col w-64 h-screen bg-black border-r border-zinc-900 py-4 font-sans antialiased selection:bg-zinc-800 selection:text-white">

      {/* ── LOGO + CLOSE ── */}
      <div className="h-12 flex items-center justify-between px-5 pb-3 border-b border-zinc-900">
        <span className="text-base font-bold text-zinc-50 tracking-tight">TradeVault</span>
        <button
          onClick={closeSidebar}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-500 hover:text-zinc-100 transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      </div>

      {/* ── NAV ITEMS ── */}
      <div className="flex-1 overflow-y-auto px-3 py-6 flex flex-col gap-7">
        {navigation.map((group) => (
          <div key={group.section} className="flex flex-col gap-1">
            <p className="text-[11px] font-semibold text-zinc-500 uppercase px-3 mb-1 tracking-wider font-mono">
              {group.section}
            </p>
            {group.items.map((item) => {
              const isActive = currentPath === item.name;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-[14px] font-medium tracking-tight transition-all text-left ${
                    isActive
                      ? "bg-zinc-900 text-zinc-50 font-semibold"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40"
                  }`}
                >
                  <span className={`transition-colors ${isActive ? "text-zinc-100" : "text-zinc-500"}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* ── USER FOOTER ── */}
      <div className="px-4 pt-4 border-t border-zinc-900">
        <div 
          onClick={() => {
            setCurrentPath("Profile");
            navigate("/profile");
          }}
          className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg border border-transparent hover:border-zinc-900 hover:bg-zinc-900/60 transition-all cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-200 tracking-wide flex-shrink-0 group-hover:border-zinc-700 transition-colors">
            {initials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[14px] font-semibold text-zinc-100 truncate tracking-tight group-hover:text-white transition-colors">
              {user.full_name || "Guest User"}
            </span>
            <span className="text-xs font-medium text-zinc-500 tracking-normal mt-0.5">Free Plan</span>
          </div>
        </div>
      </div>

    </div>
  );
}