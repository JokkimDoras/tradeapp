import { 
  FiGrid, 
  FiBookOpen, 
  FiBarChart2, 
  FiClock, 
  FiLayers, 
  FiUser, 
  FiSettings 
} from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useSidebar } from "../hooks/useSidebar";
import { useUser } from "../hooks/useUser";
import { useLocation } from "react-router";

const navigation = [
  {
    section: "Overview",
    items: [
      { id: 1, name: "Dashboard", path: "/dashboard", icon: <FiGrid size={14} strokeWidth={1.75} /> },
      { id: 2, name: "Trade Journal", path: "/journal", icon: <FiBookOpen size={14} strokeWidth={1.75} /> },
      { id: 3, name: "Analytics", path: "/analytics", icon: <FiBarChart2 size={14} strokeWidth={1.75} /> },
      { id: 4, name: "History", path: "/history", icon: <FiClock size={14} strokeWidth={1.75} /> },
      { id: 5, name: "Strategies", path: "/strategies", icon: <FiLayers size={14} strokeWidth={1.75} /> },
      { id: 6, name: "News", path: "/news", icon: <FaRegNewspaper size={14} strokeWidth={1.75} /> },

    ],
  },
  {
    section: "Account",
    items: [
      { id: 6, name: "Profile", path: "/profile", icon: <FiUser size={14} strokeWidth={1.75} /> },
      { id: 7, name: "Settings", path: "/setting", icon: <FiSettings size={14} strokeWidth={1.75} /> },
    ],
  },
];

export default function SideBar() {
  const { closeSidebar, setCurrentPath } = useSidebar();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation()



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
              const isActive = location.pathname === item.path;
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