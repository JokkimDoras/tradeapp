import { useEffect, useState } from "react";
import { useSidebar } from "../hooks/useSidebar";
import useTrade from "../hooks/useTrade";
import Navbar from "../component/ui/NavBar";
import AddTrade from "../component/addtrade/AddTrade";
import DashboardSkeleton from "../component/skeltons/DashBoardSkelton";
import StatsGrid from "../component/dashboard/StatsGrid";
import SystemAnalysis from "../component/dashboard/SystemAnalysis";
import TradeRow from "../component/dashboard/TradeRow";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";
import { useAnalytics } from "../hooks/useAnalytics";
import useAccount from "../hooks/useAccount";
import { useUser } from "../hooks/useUser";
// import useMediaQuery from "../hooks/useMediaQuery";
// import { useLocation } from "react-router";

export default function Dashboard() {
  const { toggleSidebar } = useSidebar();
  const [formState, setFormState] = useState<boolean | any>(false);
  const [deleteingId, setDeleleteingId] = useState<null | number>(null);
  const { trades, removeTrade, fetchTradesData,loading } = useTrade();
  const { getAnalyticsData, isOld, analyticsData } = useAnalytics();
  const { selectedAccount } = useAccount();
  const { user } = useUser();
  const recentTrades = trades.slice(0, 5);

  

  useEffect(() => {
const handleKeyDown = (e:KeyboardEvent) => {

  if(e.key === 'c' && document.activeElement?.tagName !=='INPUT' && document.activeElement?.tagName !== 'TEXTAREA' ){
    e.preventDefault();
    setFormState(true)
  }
}

window.addEventListener('keydown',handleKeyDown)
return () => window.removeEventListener('keydown',handleKeyDown)
 
},[])

  
  useEffect(() => {
    getAnalyticsData();
    // getParticularAccount()
  }, [])
  // useEffect(() => {
  //   getParticularAccount();

  // },[selectedAccount?.id])
  const hasLoadedData = selectedAccount && analyticsData?.summary;
  const currentBalance = hasLoadedData 
    ? (selectedAccount.starting_balance || 0) + (analyticsData.summary.net_profit_loss || 0)
    : (selectedAccount?.starting_balance || 0);

  // useEffect(() => {
  //   if (!user || !selectedAccount?.id || ) return;
    
  //   getParticularAccount(); 
    
  // }, [user, selectedAccount?.id]);
  

  useEffect(() => {
    if (!selectedAccount || !selectedAccount.id || selectedAccount.id === "undefined") return;

    if (formState === false && isOld) {
      getAnalyticsData(true, selectedAccount.id);
    } else {
      getAnalyticsData(false, selectedAccount.id);
    }
  }, [selectedAccount?.id, formState, isOld]);

  useEffect(() => {
    if (!user || !selectedAccount?.id) return;
    
    fetchTradesData(selectedAccount.id); 
    
  }, [user, selectedAccount?.id]);

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
    <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white relative w-full">
      <Navbar toggleSidebar={toggleSidebar} >WorkSpace</Navbar>

      <div className="flex flex-col gap-8 w-full max-w-none flex-1 p-6 pb-24">        
        <StatsGrid 
        totalwin={analyticsData?.summary.overall_wins} 
        totalLosses={analyticsData?.summary.overall_losses} 
        currentBalance={currentBalance} 
        margin={selectedAccount?.starting_balance} 
        analyticsData={analyticsData} 
        totalExecutions={trades.length}
        avgWin={analyticsData?.summary.average_win}
        avgLoss={analyticsData?.summary.average_loss}
        />

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
              {/* Clean 6-column header split */}
              <div className="grid grid-cols-6 p-4 border-b border-zinc-900 text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold bg-zinc-950">
                <div>Asset / Risk</div>
                <div>Action / Size</div>
                <div>Entry / Exit</div>
                <div>Stop Loss</div>
                <div>Take Profit</div>
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

      <div className="fixed bottom-6 right-6 z-50">
      <button
  onClick={() => setFormState(true)}
  className="h-14 px-6 bg-white hover:bg-zinc-200 text-black rounded-full shadow-2xl shadow-white/10 flex flex-col justify-center items-center gap-0.5 transition-all duration-200 ease-out hover:scale-105 active:scale-95 border border-zinc-200 cursor-pointer group"
> 
  <div className="flex items-center gap-2 font-bold text-xs">
    <FiPlus size={16} strokeWidth={3} />
    <span>New Trade</span>
  </div>
  
  <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-700 transition-colors">
    Press <kbd className="bg-zinc-100 border border-zinc-300 px-1 rounded text-[9px] font-sans font-bold shadow-sm">C</kbd>
  </span>
</button>
      </div>
    </div>
  );
}