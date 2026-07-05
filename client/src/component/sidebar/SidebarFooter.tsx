import { IoIosLogOut } from "react-icons/io";

interface SidebarFooterProps {
  initials: string;
  user: any;
  setCurrentPath: (path: string) => void;
  navigate: any;
  handleLogout: (e: any) => void;
}

export default function SidebarFooter({
  initials,
  user,
  setCurrentPath,
  navigate,
  handleLogout,
}: SidebarFooterProps) {
  return (
    <div className="px-4 pt-4 border-t border-zinc-900">
      <div
        onClick={() => {
          setCurrentPath("Profile");
          navigate("/profile");
        }}
        className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg border border-transparent hover:border-zinc-900 hover:bg-zinc-900/60 transition-all cursor-pointer group w-40 relative"
      >
        <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-200 tracking-wide flex-shrink-0 group-hover:border-zinc-700 transition-colors">
          {initials}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[14px] font-semibold text-zinc-100 truncate tracking-tight group-hover:text-white transition-colors">
            {user.full_name || "Guest User"}
          </span>
          <span className="text-xs font-medium text-zinc-500 tracking-normal mt-0.5">
            Free Plan
          </span>
        </div>
        <div className="absolute ml-47">
          <IoIosLogOut
            size={20}
            onClick={handleLogout}
            className="hover:text-red-800"
          />
        </div>
      </div>
    </div>
  );
}