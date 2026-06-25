import { useSidebar } from "../hooks/useSidebar";
import AddTrade from "../component/addtrade/AddTrade";
import { useState, useMemo, useEffect } from "react";
import useTrade from "../hooks/useTrade";
import Navbar from "../component/NavBar";
import HistoryToolbar from "../component/history/HistoryToolbar";
import HistoryRow from "../component/history/HistoryRow";
import ExitPriceModal from "../component/history/ExitPriceModal";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import useAccount from "../hooks/useAccount";
import { getTradeApi } from "../services/tradeApi";
import { useUser } from "../hooks/useUser";
import HistorySkeleton from "../component/skeltons/HistorySkelton";


export default function History() {
  const { toggleSidebar } = useSidebar();
  const { trades, removeTrade, updateTrade,setLoading,setTrades,loading } = useTrade(); 
  const { selectedAccount} = useAccount();
  const navigate = useNavigate();
  const { user } = useUser();

  const [formState, setFormState] = useState<boolean | any>(false);
  const [deleteingId, setDeleleteingId] = useState<null | number>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTradeToClose, setActiveTradeToClose] = useState<any>(null);

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          setLoading((prev:any) => ({
            ...prev,
            fetchTrades: true,
          }));
          const { data } = await getTradeApi(selectedAccount!.id!);
          setTrades(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading((prev:any) => ({
            ...prev,
            fetchTrades: false,
          }));
        }
      };
  
      if (!user || !selectedAccount?.id) return;
        fetchInitialState();
      
  
    }, [user,selectedAccount?.id]);

  const handleDelete = async (idToDel: number) => {
    try {
      setDeleleteingId(idToDel);
      await removeTrade(idToDel);
      toast.success("Deleted Successfully");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed To Delete");
    } finally {
      setDeleleteingId(null);
    }
  };

  const handleOpenCompleteModal = (id: number) => {
    const targetTrade = trades.find((t: any) => t.id === id);
    if (targetTrade) {
      setActiveTradeToClose(targetTrade);
      setIsModalOpen(true);
    }
  };

  const handleFinalizeCompletion = async (finalExitPrice: number) => {
    if (!activeTradeToClose) return;

    try {
      const updatedPayload = {
        ...activeTradeToClose,
        exit_price: finalExitPrice,
        status: "closed",
      };

      await updateTrade(activeTradeToClose.id, updatedPayload);

      toast.success(`Position ${activeTradeToClose.currency_pair} closed at ${finalExitPrice}`);
      setIsModalOpen(false);
      setActiveTradeToClose(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status changes.");
    }
  };

  const filteredTrades = useMemo(() => {
    return trades.filter((trade: any) => {
      const matchesSearch = trade.currency_pair?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || trade.status?.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [trades, searchQuery, statusFilter]);

  if (formState) {
    return (
      <AddTrade 
        setIsOpen={setFormState} 
        editData={typeof formState === "object" ? formState : null} 
      />
    );
  }

  if(loading.fetchTrades) return <HistorySkeleton/>

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased relative selection:bg-zinc-800 selection:text-white">
      <Navbar toggleSidebar={toggleSidebar} >History</Navbar>

      <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto flex-1 p-6 pb-24">
        
        {/* Header Layout Section */}
        <div className="flex flex-col gap-2 border-b border-zinc-900 pb-5">
          <h1 className="text-xl font-mono font-bold tracking-wider text-white uppercase">
            Archive / Execution Logs
          </h1>
          <p className="text-xs font-mono text-zinc-500">
            Historical sequence record of all processed systemic executions.
          </p>
        </div>

        {/* Toolbar Component */}
        <HistoryToolbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Layout Box Container */}
        <div className="w-full flex-1 flex flex-col">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold mb-4">
            Sequence Registry ({filteredTrades.length})
          </span>

          {filteredTrades.length === 0 ? (
            <div className="text-zinc-500 font-mono text-sm p-6 rounded-lg border border-zinc-900 bg-zinc-950">
              No matching execution patterns found in the archive.
            </div>
          ) : (
            <div className="w-full border border-zinc-900 bg-zinc-950 rounded-lg overflow-hidden shadow-md">
              
              {/* Header Box Column Layout */}
              <div className="grid grid-cols-7 p-4 border-b border-zinc-900 text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold bg-zinc-950">
                <div>Asset / Risk</div>
                <div>Action / Size</div>
                <div>Entry / Exit</div>
                <div>Targets (SL/TP)</div>
                <div>P&L / Pips</div>
                <div>Status / Notes</div>
                <div className="text-right">Actions</div>
              </div>

              {/* Table Rows Wrapper */}
              <div className="divide-y divide-zinc-900">
                {filteredTrades.map((trade: any, idx: number) => (
                  <HistoryRow 
                    key={trade.id || idx}
                    trade={trade}
                    isDeleting={deleteingId === trade.id}
                    onEdit={setFormState}
                    onDelete={handleDelete}
                    onComplete={handleOpenCompleteModal}
                    onRowClick={(id) => navigate(`/trade/${id}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ExitPriceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveTradeToClose(null);
        }}
        onSubmit={handleFinalizeCompletion}
        currencyPair={activeTradeToClose?.currency_pair || ""}
        entryPrice={activeTradeToClose?.entry_price}
      />
    </div>
  );
}