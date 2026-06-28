interface SidebarNavigationProps {
  navigation: any[];
  location: any;
  handleNavigation: (item: any) => void;
}

export default function SidebarNavigation({
  navigation,
  location,
  handleNavigation,
}: SidebarNavigationProps) {
  return (
    <div
      className="flex-1 overflow-y-auto px-3 py-6 flex flex-col gap-7"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#27272a transparent",
      }}
    >
      <style>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 5px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #27272a; 
          border-radius: 9999px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background-color: #3f3f46;
        }
      `}</style>

      {navigation.map((group) => (
        <div key={group.section} className="flex flex-col gap-1">
          <p className="text-[11px] font-semibold text-zinc-500 uppercase px-3 mb-1 tracking-wider font-mono">
            {group.section}
          </p>
          {group.items.map((item:any) => {
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
                <span
                  className={`transition-colors ${
                    isActive ? "text-zinc-100" : "text-zinc-500"
                  }`}
                >
                  {item.icon}
                </span>
                {item.name}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}