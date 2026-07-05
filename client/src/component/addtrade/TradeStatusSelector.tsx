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
    <div className="flex flex-col gap-1.5 select-none antialiased">
      <label className="text-[12px] font-medium text-zinc-400 tracking-tight">
        Lifecycle Status
      </label>

      <div className="grid grid-cols-2 p-1 bg-[#050505] border border-zinc-900 rounded-lg">
        <button
          type="button"
          onClick={() => onChange("open")}
          className={`py-1.5 text-[11px] font-mono font-bold uppercase tracking-tight rounded-md transition-all duration-150 cursor-pointer ${
            value === "open"
              ? "bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-sm"
              : "text-zinc-500 hover:text-zinc-400 border border-transparent"
          }`}
        >
          Active / Open
        </button>

        <button
          type="button"
          onClick={() => onChange("closed")}
          className={`py-1.5 text-[11px] font-mono font-bold uppercase tracking-tight rounded-md transition-all duration-150 cursor-pointer ${
            value === "closed"
              ? "bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-sm"
              : "text-zinc-500 hover:text-zinc-400 border border-transparent"
          }`}
        >
          Settled / Closed
        </button>
      </div>
    </div>
  );
}