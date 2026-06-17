import { useSidebar } from "../hooks/useSidebar";
import AddTrade from "../component/AddTrade";
import { useState } from "react";
import useTrade from "../hooks/useTrade";

export default function Dashboard() {
  const { toggleSidebar } = useSidebar();
  const[isOpen,setIsOpen]=useState(false)
  const { trades } = useTrade();


  if(isOpen) return <AddTrade setIsOpen={setIsOpen}/>

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white p-6">
      
      {/* ── TOPBAR ── */}
      <div className="flex items-center justify-between w-full border-b border-zinc-900 pb-4 mb-6">
        <div className="flex items-center gap-3">
          {/* SIDEBAR TOGGLE BUTTON */}
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
          <span className="text-zinc-400 font-mono text-sm">Trading Sequence Ledger</span>
        </div>
  
        {/* NEW TRADE ACTION BUTTON */}
        <button 
          onClick={() => setIsOpen(true)} 
          className="h-9 px-4 bg-white text-black font-medium text-xs rounded-md shadow-md flex items-center justify-center transition-all duration-200 ease-out hover:bg-zinc-200 active:scale-95"
        >
          + New Trade
        </button>
      </div>
  
      {/* ── MAIN CONTENT LEDGER DISPLAY ── */}
      <div className="flex flex-col gap-2 max-w-md">
        {trades.length === 0 ? (
          <div className="text-zinc-600 font-mono text-xs">No execution history synchronized.</div>
        ) : (
          trades.map((trade: any, idx: number) => (
            <div 
              key={trade.id || idx} 
              className="flex items-center justify-between p-3 rounded-md border border-zinc-900 bg-zinc-950 hover:border-zinc-800 transition-all"
            >
              <span className="font-mono text-sm font-semibold tracking-wider text-white">
                {trade.currency_pair}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded font-mono ${trade.trade_type === 'BUY' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                {trade.trade_type || "POSITION"}
              </span>
            </div>
          ))
        )}
      </div>
  
    </div>
  );
}
