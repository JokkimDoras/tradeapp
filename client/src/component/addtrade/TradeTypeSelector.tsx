type TradeType = "buy" | "sell";

interface TradeTypeSelectorProps {
  value: TradeType;
  onChange: (type: TradeType) => void;
  isthatSell:TradeType
}

export default function TradeTypeSelector({
  onChange,
  isthatSell
}: TradeTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-zinc-400 tracking-tight">
        Order Action
      </label>

      <div className="grid grid-cols-2 p-1 bg-zinc-900 border border-zinc-800 rounded-lg">
        <button
          type="button"
          onClick={() => onChange("buy")}
          className={`py-1.5 text-xs font-bold rounded-md tracking-wider uppercase transition-all cursor-pointer ${
            isthatSell === "buy"
              ? "bg-emerald-500 text-black shadow-lg"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Buy / Long
        </button>

        <button
          type="button"
          onClick={() => onChange("sell")}
          className={`py-1.5 text-xs font-bold rounded-md tracking-wider uppercase transition-all cursor-pointer ${
            isthatSell === "sell"
              ? "bg-rose-500 text-white shadow-lg"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Sell / Short
        </button>
      </div>
    </div>
  );
}