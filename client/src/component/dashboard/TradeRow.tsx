import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router";

interface TradeRowProps {
  trade: any;
  idx: number;
  isDeleting: boolean;
  onEdit: (trade: any) => void;
  onDelete: (id: number) => void;
}

export default function TradeRow({ trade, idx, isDeleting, onEdit, onDelete }: TradeRowProps) {
  const navigate = useNavigate();
  const isBuy = trade.trade_type?.toLowerCase() === "buy";

  return (
    <div
      onClick={() => !isDeleting && navigate(`/trade/${trade.id}`)}
      key={trade.id || idx}
      className={`grid grid-cols-6 p-4 items-center hover:bg-zinc-900/40 transition-colors font-mono text-sm cursor-pointer ${
        isDeleting ? "opacity-35 pointer-events-none select-none" : ""
      }`}
    >
      {/* Col 1: Asset & Risk */}
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-white tracking-tight text-base">
          {trade.currency_pair || "—"}
        </span>
        <span className="text-xs text-zinc-500">
          Risk: {trade.risk_percentage != null ? `${trade.risk_percentage}%` : "—"}
        </span>
      </div>

      {/* Col 2: Side & Size */}
      <div className="flex flex-col gap-1 items-start">
        <span
          className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide border ${
            isBuy 
              ? "bg-emerald-950/40 border-emerald-900/60 text-emerald-400" 
              : "bg-rose-950/40 border-rose-900/60 text-rose-400"
          }`}
        >
          {trade.trade_type || "POSITION"}
        </span>
        <span className="text-xs text-zinc-400 font-medium">
          {trade.lot_size ?? "—"} Lots
        </span>
      </div>

      {/* Col 3: Entry & Exit */}
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

      {/* Col 6: Actions */}
      <div className="flex items-center justify-end gap-2 text-right">
        <button
          disabled={isDeleting}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(trade);
          }}
          className="w-7 h-7 flex items-center justify-center rounded border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all active:scale-95 cursor-pointer disabled:opacity-30"
          title="Edit"
        >
          <FiEdit2 size={12} />
        </button>
        <button
          disabled={isDeleting}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(trade.id);
          }}
          className="w-7 h-7 flex items-center justify-center rounded border border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-rose-400 hover:border-rose-900 transition-all active:scale-95 cursor-pointer disabled:opacity-30"
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