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
    <div className="flex flex-col gap-2 select-none antialiased">
      <label className="font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        Lifecycle Status
      </label>

      <div className="grid grid-cols-2 gap-1 rounded-md border border-zinc-800 bg-black p-1">
        <button
          type="button"
          onClick={() => onChange("open")}
          className={`py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded transition-all duration-150 cursor-pointer ${
            value === "open"
              ? "bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm"
              : "text-zinc-500 hover:text-zinc-400 border border-transparent"
          }`}
        >
          Active / Open
        </button>

        <button
          type="button"
          onClick={() => onChange("closed")}
          className={`py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded transition-all duration-150 cursor-pointer ${
            value === "closed"
              ? "bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm"
              : "text-zinc-500 hover:text-zinc-400 border border-transparent"
          }`}
        >
          Settled / Closed
        </button>
      </div>
    </div>
  );
}
