import { FiEdit2, FiTrash2, FiCheckSquare } from "react-icons/fi";
import React from "react";
interface HistoryRowProps {
  trade: any;
  isDeleting: boolean;
  onEdit: (trade: any) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  onRowClick: (id: number) => void;
}
import { useEffect,useRef } from "react";

export default React.memo(function HistoryRow({ 
  trade, 
  isDeleting, 
  onEdit, 
  onDelete, 
  onComplete,
  onRowClick
}: HistoryRowProps) {
  const prevRef = useRef({
    trade,
    onDelete,
    onComplete,
    onRowClick,
  });
  
  useEffect(() => {
    console.log("trade same?", prevRef.current.trade === trade);
    console.log("onDelete same?", prevRef.current.onDelete === onDelete);
    console.log("onComplete same?", prevRef.current.onComplete === onComplete);
    console.log("onRowClick same?", prevRef.current.onRowClick === onRowClick);
  
    prevRef.current = {
      trade,
      onDelete,
      onComplete,
      onRowClick,
    };
  });

  const isBuy = trade.trade_type?.toLowerCase() === "buy";
  const isOpen = trade.status?.toLowerCase() === "open";
console.log('am i rendering')
  const formatTime = (dateString: string) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div
      onClick={() => onRowClick(trade.id)}
      className={`grid grid-cols-8 p-4 items-center hover:bg-zinc-900/50 transition-colors font-mono text-sm cursor-pointer ${
        isDeleting ? "opacity-35 pointer-events-none select-none" : ""
      }`}
    >
      {/* Col 1: Asset / Risk & Created Time */}
      <div className="flex flex-col gap-0.5">
        <span className="font-bold text-white tracking-wide text-base">
          {trade.currency_pair || "—"}
        </span>
        <div className="flex flex-col text-xs text-zinc-500 gap-0.5">
          <span>Risk: {trade.risk_percentage != null ? `${trade.risk_percentage}%` : "—"}</span>
          <span className="text-[11px] text-zinc-600">
            {trade.created_at ? formatTime(trade.created_at) : "—"}
          </span>
        </div>
      </div>

      {/* Col 2: Action / Size */}
      <div className="flex flex-col gap-0.5 items-start">
        <span 
          className={`font-medium font-mono text-sm ${
            isBuy ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {trade.trade_type?.toUpperCase() || "—"}
        </span>
        <span className="text-xs text-zinc-400 font-medium">
          {trade.lot_size ?? "—"} Lots
        </span>
      </div>

      {/* Col 3: Entry / Exit */}
      <div className="flex flex-col gap-0.5">
        <span className="text-zinc-300 font-medium">
          En: {trade.entry_price ?? "—"}
        </span>
        <span className="text-xs text-zinc-500">
          Ex: {trade.exit_price ?? "—"}
        </span>
      </div>

      {/* Col 4: Stop Loss */}
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-zinc-500 uppercase tracking-wider">Stop Loss</span>
        <span className="text-sm font-medium text-rose-400/90">{trade.stop_loss ?? "—"}</span>
      </div>

      {/* Col 5: Take Profit */}
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-zinc-500 uppercase tracking-wider">Take Profit</span>
        <span className="text-sm font-medium text-emerald-400/90">{trade.take_profit ?? "—"}</span>
      </div>

      {/* Col 6: P&L / Pips */}
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

      {/* Col 7: Status / Notes */}
      <div className="flex flex-col gap-0.5 items-start">
        <span
          className={`text-xs font-medium uppercase tracking-wider ${
            isOpen ? "text-orange-500 font-bold" : "text-zinc-500"
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

      {/* Col 8: Actions */}
      <div className="flex items-center justify-end gap-2 text-right" onClick={(e) => e.stopPropagation()}>
        {isOpen && (
          <button
            disabled={isDeleting}
            onClick={() => onComplete(trade.id)}
            className="w-7 h-7 flex items-center justify-center rounded border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all active:scale-90 cursor-pointer disabled:opacity-30"
            title="Complete Position"
          >
            <FiCheckSquare size={12} />
          </button>
        )}

        <button
          disabled={isDeleting}
          onClick={() => onEdit(trade)}
          className="w-7 h-7 flex items-center justify-center rounded border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all active:scale-90 cursor-pointer disabled:opacity-30"
          title="Edit"
        >
          <FiEdit2 size={12} />
        </button>

        <button
          disabled={isDeleting}
          onClick={() => onDelete(trade.id)}
          className="w-7 h-7 flex items-center justify-center rounded border border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-rose-400 hover:border-rose-900 transition-all active:scale-90 cursor-pointer disabled:opacity-30"
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
}
)