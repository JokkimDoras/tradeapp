type TradeStatus = "open" | "closed";

interface TradeStatusSelectorProps {
  value: TradeStatus;
  onChange: (status: TradeStatus) => void;
}

export default function TradeStatusSelector({
  value,
  onChange,
}: TradeStatusSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-zinc-400 tracking-tight">
        Lifecycle Status
      </label>

      <div className="grid grid-cols-2 p-1 bg-zinc-900 border border-zinc-800 rounded-lg">
        <button
          type="button"
          onClick={() => onChange("open")}
          className={`py-1.5 text-xs font-semibold rounded-md tracking-wide uppercase transition-all cursor-pointer ${
            value === "open"
              ? "bg-zinc-800 text-zinc-50 border border-zinc-700"
              : "text-zinc-500 hover:text-zinc-400"
          }`}
        >
          Active / Open
        </button>

        <button
          type="button"
          onClick={() => onChange("closed")}
          className={`py-1.5 text-xs font-semibold rounded-md tracking-wide uppercase transition-all cursor-pointer ${
            value === "closed"
              ? "bg-zinc-800 text-zinc-50 border border-zinc-700"
              : "text-zinc-500 hover:text-zinc-400"
          }`}
        >
          Settled / Closed
        </button>
      </div>
    </div>
  );
}