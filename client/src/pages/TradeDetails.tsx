import { useParams, useNavigate } from "react-router";
import { useEffect, useMemo } from "react";
import useTrade from "../hooks/useTrade";
import { useSidebar } from "../hooks/useSidebar";
import Navbar from "../component/ui/NavBar";
import StatCard from "../component/tradeDetails/StatCard"; 
import DataRow from "../component/tradeDetails/DataRow";   
import { FiArrowLeft, FiClock, FiActivity, FiLayers, FiShield,FiX } from "react-icons/fi";
import useScreenshot from "../hooks/useScreenshot";
import { useState } from "react";
import type {responseScreenshotData} from '../types/screenshot.types'
import { MdDeleteOutline } from "react-icons/md";

export default function TradeDetails() {
  const [screenshots, setScreenshots] = useState<responseScreenshotData[]>([]);
  const [selectedImage,setSelectedImage ] = useState<string | null>(null);
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();
  const { trades } = useTrade();
  const { fetchScreenshots,deleteScreenshot } = useScreenshot();

  useEffect(() => {
     const getStuffs =async () => {

      const data = await fetchScreenshots(id)
       setScreenshots(data)
     }

     getStuffs();
  },[id])

  const trade = useMemo(() => {
    return trades.find((t: any) => String(t.id) === String(id));
  }, [trades, id]);

  const metrics = useMemo(() => {
    if (!trade) return null;
    const entry = Number(trade.entry_price) || 0;
    const sl = Number(trade.stop_loss) || 0;
    const tp = Number(trade.take_profit) || 0;
    const risk = Math.abs(entry - sl);
    const reward = Math.abs(tp - entry);
    
    return {
      isBuy: trade.trade_type?.toLowerCase() === "buy",
      isOpen: trade.status?.toLowerCase() === "open",
      rrRatio: risk === 0 ? "—" : `1:${(reward / risk).toFixed(1)}`,
    };
  }, [trade]);

  const formatTime = (dateString: string) => {
    if (!dateString) return "—";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", hour12: false,
      });
    } catch {
      return dateString;
    }
  };

  if (!trade || !metrics) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-zinc-100 font-mono text-sm antialiased">
        <Navbar toggleSidebar={toggleSidebar} >Details</Navbar>
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <span className="text-zinc-500">Execution node {id} not found.</span>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-400 hover:text-white">
            <FiArrowLeft size={14} /> Back
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = async(delDetails:responseScreenshotData,index:number) => {
       try{
        console.log('Running the detele Image')
       const res =  await deleteScreenshot(delDetails)
        if(res.success){
          const filtered = screenshots.filter((_,i) => {
          return i !== index;
          })
      setScreenshots(filtered)
        }

       }catch(err:any){
        console.error(err?.message || err)
        throw err
       }
  }


  const handleFullView = (url:string) => {
setSelectedImage(url)

  }
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-mono antialiased selection:bg-zinc-800 relative">
      <Navbar toggleSidebar={toggleSidebar} >Details</Navbar>

      <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto flex-1 p-6 pb-24">
        
        <div className="flex flex-col gap-4 border-b border-zinc-900 pb-6">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 w-fit">
            <FiArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" /> 
            Back to Registry Log
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-white uppercase">{trade.currency_pair || "—"}</h1>
                <span className={`text-xs font-bold ${metrics.isBuy ? "text-emerald-400" : "text-rose-400"}`}>
                  {trade.trade_type || "—"}
                </span>
              </div>
              <p className="text-xs text-zinc-500">System Registry Entity ID: <span className="text-zinc-400">{trade.id}</span></p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-zinc-900 bg-zinc-950 w-fit">
              <span className={`w-1.5 h-1.5 rounded-full ${metrics.isOpen ? "bg-orange-500 animate-pulse" : "bg-zinc-600"}`} />
              <span className={`text-xs uppercase tracking-wider ${metrics.isOpen ? "text-orange-500 font-bold" : "text-zinc-500"}`}>
                {trade.status || "—"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          <StatCard label="Net Execution P&L" icon={<FiActivity size={12} />} value={trade.profit_loss} isValueColored colorClass={trade.profit_loss > 0 ? "text-emerald-400" : trade.profit_loss < 0 ? "text-rose-400" : "text-zinc-400"} prefix={trade.profit_loss > 0 ? "+" : ""} />
          <StatCard label="Position Volume" icon={<FiLayers size={12} />} value={trade.lot_size} suffix=" Lots" />
          <StatCard label="Calculated Risk" icon={<FiShield size={12} />} value={trade.risk_percentage != null ? `${trade.risk_percentage}%` : null} />
          <StatCard label="Target Efficiency" icon={<FiClock size={12} />} value={trade.pips} suffix=" Pips" valueColorOverride="text-zinc-300" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start w-full">
          
          <div className="md:col-span-2 border border-zinc-900 bg-zinc-950 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-zinc-900"><h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Execution Coordinate Parameters</h3></div>
            <div className="divide-y divide-zinc-900 text-sm">
              <DataRow label="Entry Matrix Target (En)" value={trade.entry_price} />
              <DataRow label="Exit Execution Threshold (Ex)" value={trade.exit_price} />
              <DataRow label="Invalidation Floor (SL)" value={trade.stop_loss} valueClass="text-rose-400 font-semibold" />
              <DataRow label="Liquidation Ceiling (TP)" value={trade.take_profit} valueClass="text-emerald-400 font-semibold" />
              <DataRow label="Risk-to-Reward Blueprint (RR)" value={metrics.rrRatio} valueClass="text-zinc-100 font-bold" />
            </div>
          </div>

          <div className="border border-zinc-900 bg-zinc-950 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-zinc-900"><h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">System Audit Logs</h3></div>
            <div className="p-4 flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Created On Sequence</span>
                <span className="text-zinc-300 font-medium">{formatTime(trade.created_at)}</span>
              </div>
              {trade.updated_at && (
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Last Operational Sync</span>
                  <span className="text-zinc-300 font-medium">{formatTime(trade.updated_at)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-3">
          <span className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">Execution Strategy Context & Notes</span>
          <div className="text-sm text-zinc-500 min-h-[60px] leading-relaxed whitespace-pre-wrap">
            {trade.notes ? <span className="text-zinc-300">{trade.notes}</span> : "No textual metadata or discretionary annotations appended to this sequence block."}
          </div>
        </div>
      </div>

{screenshots && screenshots.length > 0 && (
  <div className="w-full max-w-7xl mx-auto px-6 pb-24 flex flex-col gap-4">
    <span className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">Attached Visual Evidence / Screenshots</span>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {screenshots.map((screenshot,index) => {
        return (
          <div key={screenshot.id} className="border relative border-zinc-900 bg-zinc-950 p-2 rounded-lg overflow-hidden">
            <MdDeleteOutline onClick={() => handleDelete(screenshot,index)} size={20} className="absolute right-5  bottom-5 cursor-pointer  " color="red" />
            <img 
              onClick={() =>handleFullView(screenshot.public_url)}
              src={screenshot.public_url} 
              alt="Trade Setup Screenshot" 
              className="w-full h-auto object-cover rounded"
            />
          </div>
        );
      })}
    </div>
  </div>
)}
{selectedImage && (
  <div 
  className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300"
  onClick={() => setSelectedImage(null)}
>
  <button 
    className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
    onClick={() => setSelectedImage(null)}
  >
    <FiX size={24} />
  </button>

  {/* Full Screen Image */}
  <img 
    src={selectedImage} 
    alt="Full Screen Evidence" 
    className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl border border-zinc-800"
    onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking the image window
  />
</div>
)}

    </div>
  );
}