import { useState } from "react";
import { useSidebar } from "../hooks/useSidebar";
import useTrade from "../hooks/useTrade";
import Navbar from "../component/NavBar";
import AddTrade from "../component/addtrade/AddTrade";
import DashboardSkeleton from "../component/skeltons/DashBoardSkelton";
import StatsGrid from "../component/dashboard/StatsGrid";
import SystemAnalysis from "../component/dashboard/SystemAnalysis";
import TradeRow from "../component/dashboard/TradeRow";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";

export default function Dashboard() {
  const { toggleSidebar } = useSidebar();
  const { loading } = useTrade();
  const [formState, setFormState] = useState<boolean | any>(false);
  const [deleteingId, setDeleleteingId] = useState<null | number>(null);

  const { trades, removeTrade } = useTrade();
  const recentTrades = trades.slice(0, 5);

  const handleDelete = async (idToDel: number) => {
    try {
      setDeleleteingId(idToDel);
      await removeTrade(idToDel);
      toast.success("Deleted Successfully");
    } catch (err: any) {
      console.log(err);
      toast.error("Failed To Delete");
    } finally {
      setDeleleteingId(null);
    }
  };

  if (loading.fetchTrades) return <DashboardSkeleton />;

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
        
        <StatsGrid totalExecutions={trades.length} />

        <SystemAnalysis hasTrades={trades.length > 0} />

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
                {recentTrades.map((trade: any, idx: number) => (
                  <TradeRow
                    key={trade.id || idx}
                    trade={trade}
                    idx={idx}
                    isDeleting={deleteingId === trade.id}
                    onEdit={setFormState}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
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