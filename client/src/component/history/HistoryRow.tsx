import { FiEdit2, FiTrash2, FiCheckSquare } from "react-icons/fi";

interface HistoryRowProps {
  trade: any;
  isDeleting: boolean;
  onEdit: (trade: any) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  onRowClick: (id: number) => void;
}

export default function HistoryRow({ 
  trade, 
  isDeleting, 
  onEdit, 
  onDelete, 
  onComplete,
  onRowClick
}: HistoryRowProps) {
  const isBuy = trade.trade_type?.toLowerCase() === "buy";
  const isOpen = trade.status?.toLowerCase() === "open";

  return (
    <div
      onClick={() => onRowClick(trade.id)}
      className={`grid grid-cols-7 p-4 items-center hover:bg-zinc-900/50 transition-colors font-mono text-sm cursor-pointer ${
        isDeleting ? "opacity-35 pointer-events-none select-none" : ""
      }`}
    >
      {/* Asset / Risk */}
      <div className="flex flex-col gap-0.5">
        <span className="font-bold text-white tracking-wide text-base">
          {trade.currency_pair || "—"}
        </span>
        <span className="text-xs text-zinc-500">
          Risk: {trade.risk_percentage != null ? `${trade.risk_percentage}%` : "—"}
        </span>
      </div>

      {/* Action / Size */}
      <div className="flex flex-col gap-0.5 items-start">
        <span 
          className={`font-medium font-mono text-sm ${
            isBuy ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {trade.trade_type.toUpperCase() || "—"}
        </span>
        <span className="text-xs text-zinc-400 font-medium">
          {trade.lot_size ?? "—"} Lots
        </span>
      </div>

      {/* Entry / Exit */}
      <div className="flex flex-col gap-0.5">
        <span className="text-zinc-300 font-medium">
          En: {trade.entry_price ?? "—"}
        </span>
        <span className="text-xs text-zinc-500">
          Ex: {trade.exit_price ?? "—"}
        </span>
      </div>

      {/* Targets */}
      <div className="flex flex-col gap-0.5 text-xs">
        <span className="text-rose-400">SL: {trade.stop_loss ?? "—"}</span>
        <span className="text-emerald-400">TP: {trade.take_profit ?? "—"}</span>
      </div>

      {/* P&L / Pips */}
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

      {/* Status / Notes */}
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

      {/* Actions */}
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
}