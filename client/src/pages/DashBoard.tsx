import { useSidebar } from "../hooks/useSidebar";
import AddTrade from "../component/AddTrade";
import { useState } from "react";

export default function Dashboard() {
  const { toggleSidebar } = useSidebar();
  const[isOpen,setIsOpen]=useState(false)


  if(isOpen) return <AddTrade setIsOpen={setIsOpen}/>

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white">
      {/* ── TOPBAR ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="w-9 h-9 flex items-center justify-center rounded-md border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
            <path
              d="M2 4.5h11M2 7.5h11M2 10.5h11"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button onClick={() => setIsOpen(true)} className="absolute right-6 bottom-8 h-10 px-5 bg-white text-black font-medium text-sm rounded-lg shadow-md flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 active:scale-95">
         + New Trade
        </button>
      </div>
    </div>
  );
}
