import { useNavigate } from "react-router";
import { useSidebar } from "../hooks/useSidebar";

const navigation = [
  {
    section: "Overview",
    items: [
      { id: 1, name: "Dashboard", path: "/dashboard", icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      )},
      { id: 2, name: "Trade Journal", path: "/journal", icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
        </svg>
      )},
      { id: 3, name: "History", path: "/history", icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      )},
      { id: 4, name: "Strategies", path: "/strategies", icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
        </svg>
      )},
    ],
  },
  {
    section: "Account",
    items: [
      { id: 5, name: "Profile", path: "/profile", icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      )},
      { id: 6, name: "Settings", path: "/setting", icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
      )},
    ],
  },
];

export default function SideBar() {
  const { closeSidebar, currentPath, setCurrentPath } = useSidebar();
  const fullname = localStorage.getItem("fullname");
  const navigate = useNavigate();

  const initials = fullname
    ? fullname.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "TV";

  const handleNavigation = (item: { id: number; name: string; path: string }) => {
    setCurrentPath(item.name);
    navigate(item.path);
  };

  return (
    <div className="flex flex-col w-64 h-screen bg-black border-r border-zinc-900 py-4">

      {/* ── LOGO + CLOSE ── */}
      <div className="flex items-center justify-between px-4 pb-4 border-b border-zinc-900">
        <span className="text-sm font-semibold text-white tracking-tight">TradeVault</span>
        <button
          onClick={closeSidebar}
          className="w-7 h-7 flex items-center justify-center rounded-md border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 text-zinc-500 hover:text-white transition-all"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      </div>

      {/* ── NAV ── */}
      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-6">
        {navigation.map((group) => (
          <div key={group.section} className="flex flex-col gap-0.5">
            <p className="text-[11px] font-medium text-zinc-600 px-2 mb-1 tracking-wide">
              {group.section}
            </p>
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-all text-left ${
                  currentPath === item.name
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50"
                }`}
              >
                <span className={currentPath === item.name ? "text-white" : "text-zinc-600"}>
                  {item.icon}
                </span>
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* ── USER FOOTER ── */}
      <div className="px-3 pt-4 border-t border-zinc-900">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-zinc-900 transition-all cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-semibold text-white flex-shrink-0">
            {initials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-white truncate leading-tight">
              {fullname || "Guest"}
            </span>
            <span className="text-[11px] text-zinc-600 leading-tight">Free plan</span>
          </div>
        </div>
      </div>

    </div>
  );
}