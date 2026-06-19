import { useSidebar } from "../hooks/useSidebar";
import AddTrade from "../component/addtrade/AddTrade";
import { useState } from "react";
import useTrade from "../hooks/useTrade";
import Navbar from "../component/NavBar";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import DashboardSkeleton from "../component/skeltons/DashBoardSkelton";
import { useNavigate } from "react-router";
// import DashboardSkeleton from "../component/skeltons/DashBoardSkelton";

export default function Dashboard() {
  const { toggleSidebar } = useSidebar();
  const{ loading } = useTrade()
  const [formState, setFormState] = useState<boolean | any>(false);
  const [deleteingId, setDeleleteingId] = useState<null | number>(null);
  
  const { trades, removeTrade } = useTrade();

  const recentTrade = trades.slice(0,5)
  const navigate = useNavigate();

  const handleDelete = async (idToDel: number) => {
    try {
      setDeleleteingId(idToDel);
      await removeTrade(idToDel);
      toast.success('Deleted Successfully');
    } catch (err: any) {
      console.log(err);
      toast.error('Failed To Delete');
    } finally {
      setDeleleteingId(null);
    }
  };

  if(loading) return <DashboardSkeleton/>

  if (formState) {
    return (
      <AddTrade 
        setIsOpen={setFormState} 
        editData={typeof formState === "object" ? formState : null} 
      />
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white relative">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto flex-1 p-6 pb-24">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Total Executions</span>
            <span className="text-2xl font-mono font-bold text-white">{trades.length}</span>
          </div>
          <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Active Margin</span>
            <span className="text-2xl font-mono font-bold text-white">--</span>
          </div>
          <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Win Rate</span>
            <span className="text-2xl font-mono font-bold text-emerald-400">--</span>
          </div>
          <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Net Return</span>
            <span className="text-2xl font-mono font-bold text-white">--</span>
          </div>
        </div>

        <div className="w-full p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-3">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">System Analysis</span>
          <div className="text-sm font-mono text-zinc-400 min-h-[50px] flex items-center leading-relaxed">
            {trades.length === 0 
              ? "Awaiting data synchronisation to generate real-time performance analytics metrics."
              : "Ledger status operational. Review continuous execution sequence logs below."
            }
          </div>
        </div>
  
        <div className="w-full flex-1 flex flex-col">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold mb-4">
            Execution History
          </span>

          {trades.length === 0 ? (
            <div className="text-zinc-500 font-mono text-sm p-6 rounded-lg border border-zinc-900 bg-zinc-950">
              No execution history synchronized.
            </div>
          ) : (
            <div className="w-full border border-zinc-900 bg-zinc-950 rounded-lg overflow-hidden shadow-md">
              <div className="grid grid-cols-7 p-4 border-b border-zinc-900 text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold bg-zinc-950">
                <div>Asset / Risk</div>
                <div>Action / Size</div>
                <div>Entry / Exit</div>
                <div>Targets (SL/TP)</div>
                <div>P&L / Pips</div>
                <div>Status / Notes</div>
                <div className="text-right">Actions</div>
              </div>

              <div className="divide-y divide-zinc-900">
                {recentTrade.map((trade: any, idx: number) => {
                  const isBuy = trade.trade_type?.toLowerCase() === "buy";
                  
                  const isDeleting = deleteingId === trade.id;

                  return (
                    <div
                    onClick={() => navigate(`/trade/${trade.id}`)}
                      key={trade.id || idx}
                      className={`grid grid-cols-7 p-4 items-center hover:bg-zinc-900/50 transition-colors font-mono text-sm ${
                        isDeleting ? "opacity-35 pointer-events-none select-none" : ""
                      }`}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-white tracking-wide text-base">
                          {trade.currency_pair || "—"}
                        </span>
                        <span className="text-xs text-zinc-500">
                          Risk: {trade.risk_percentage != null ? `${trade.risk_percentage}%` : "—"}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 items-start">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide ${
                            isBuy ? "bg-emerald-950 text-emerald-400" : "bg-rose-950 text-rose-400"
                          }`}
                        >
                          {trade.trade_type || "POSITION"}
                        </span>
                        <span className="text-xs text-zinc-400 font-medium">
                          {trade.lot_size ?? "—"} Lots
                        </span>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-zinc-300 font-medium">
                          En: {trade.entry_price ?? "—"}
                        </span>
                        <span className="text-xs text-zinc-500">
                          Ex: {trade.exit_price ?? "—"}
                        </span>
                      </div>

                      <div className="flex flex-col gap-0.5 text-xs">
                        <span className="text-rose-400">SL: {trade.stop_loss ?? "—"}</span>
                        <span className="text-emerald-400">TP: {trade.take_profit ?? "—"}</span>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span
                          className={`font-semibold text-base ${
                            trade.profit_loss > 0
                              ? "text-emerald-400"
                              : trade.profit_loss < 0
                              ? "text-rose-400"
                              : "text-zinc-400"
                          }`}
                        >
                          {trade.profit_loss != null
                            ? `${trade.profit_loss > 0 ? "+" : ""}${trade.profit_loss}`
                            : "—"}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {trade.pips != null ? `${trade.pips} pips` : "—"}
                        </span>
                      </div>

                      <div className="flex flex-col gap-0.5 items-start">
                        <span
                          className={`text-xs font-medium uppercase tracking-wider ${
                            trade.status === "open" ? "text-amber-400" : "text-zinc-500"
                          }`}
                        >
                          {trade.status || "—"}
                        </span>
                        {trade.notes && (
                          <span className="text-xs text-zinc-500 max-w-[110px] truncate" title={trade.notes}>
                            {trade.notes}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-2 text-right">
                        <button
                          disabled={isDeleting}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormState(trade);
                          }}
                          className="w-7 h-7 flex items-center justify-center rounded border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all active:scale-90 cursor-pointer disabled:opacity-30"
                          title="Edit"
                        >
                          <FiEdit2 size={12} />
                        </button>
                        <button
                          disabled={isDeleting}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(trade.id);
                          }}
                          className="w-7 h-7 flex items-center justify-center rounded border border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-rose-400 hover:border-rose-950/60 transition-all active:scale-90 cursor-pointer disabled:opacity-30"
                          title="Delete"
                        >
                          {isDeleting ? (
                            <div className="w-3 h-3 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <FiTrash2 size={12} />
                          )}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setFormState(true)}
          className="h-12 px-5 bg-white hover:bg-zinc-200 text-black font-bold text-xs rounded-full shadow-2xl shadow-white/10 flex items-center gap-2 transition-all duration-200 ease-out hover:scale-105 active:scale-95 border border-zinc-200 cursor-pointer"
        >
          <FiPlus size={16} strokeWidth={3} />
          <span>New Trade</span>
        </button>
      </div>
    </div>
  );
}