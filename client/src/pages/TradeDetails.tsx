import { useParams, useNavigate } from "react-router";
import { useEffect, useMemo } from "react";
import useTrade from "../hooks/useTrade";
import { useSidebar } from "../hooks/useSidebar";
import Navbar from "../component/NavBar";
import StatCard from "../component/tradeDetails/StatCard"; // Import here
import DataRow from "../component/tradeDetails/DataRow";   // Import here
import { FiArrowLeft, FiClock, FiActivity, FiLayers, FiShield } from "react-icons/fi";
import useScreenshot from "../hooks/useScreenshot";
import { useState } from "react";
import type {responseScreenshotData} from '../types/screenshot.types'

export default function TradeDetails() {
  const [screenshots, setScreenshots] = useState<responseScreenshotData[]>([]);
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();
  const { trades } = useTrade();
  const { fetchScreenshots } = useScreenshot();

  useEffect(() => {
     const getStuffs =async () => {

      const data = await fetchScreenshots(id)
       setScreenshots(data)
     }

     getStuffs();
  },[id])
  console.log(screenshots)
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
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <span className="text-zinc-500">Execution node {id} not found.</span>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-400 hover:text-white">
            <FiArrowLeft size={14} /> Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-mono antialiased selection:bg-zinc-800 relative">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto flex-1 p-6 pb-24">
        
        {/* Header */}
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

        {/* Primary Parameter Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          <StatCard label="Net Execution P&L" icon={<FiActivity size={12} />} value={trade.profit_loss} isValueColored colorClass={trade.profit_loss > 0 ? "text-emerald-400" : trade.profit_loss < 0 ? "text-rose-400" : "text-zinc-400"} prefix={trade.profit_loss > 0 ? "+" : ""} />
          <StatCard label="Position Volume" icon={<FiLayers size={12} />} value={trade.lot_size} suffix=" Lots" />
          <StatCard label="Calculated Risk" icon={<FiShield size={12} />} value={trade.risk_percentage != null ? `${trade.risk_percentage}%` : null} />
          <StatCard label="Target Efficiency" icon={<FiClock size={12} />} value={trade.pips} suffix=" Pips" valueColorOverride="text-zinc-300" />
        </div>

        {/* Details and Logs Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start w-full">
          
          {/* Coordinates Grid Mapping */}
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

          {/* System Audit Card */}
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

        {/* Discretionary Narrative Block */}
        <div className="w-full p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-3">
          <span className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">Execution Strategy Context & Notes</span>
          <div className="text-sm text-zinc-500 min-h-[60px] leading-relaxed whitespace-pre-wrap">
            {trade.notes ? <span className="text-zinc-300">{trade.notes}</span> : "No textual metadata or discretionary annotations appended to this sequence block."}
          </div>
        </div>

      </div>
    </div>
  );
}