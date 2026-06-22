import TradeTypeSelector from "./TradeTypeSelector";
import TradeStatusSelector from "./TradeStatusSelector";


type TradeType = "buy" | "sell";



interface PopularPair {
  symbol: string;
  asset: string;
  type: string;
}

const POPULAR_PAIRS: PopularPair[] = [
  { symbol: "BTC/USD", asset: "Bitcoin", type: "Crypto" },
  { symbol: "ETH/USD", asset: "Ethereum", type: "Crypto" },
  { symbol: "SOL/USD", asset: "Solana", type: "Crypto" },
  { symbol: "XAU/USD", asset: "Gold Spot", type: "Commodity" },
  { symbol: "EUR/USD", asset: "Euro / US Dollar", type: "Forex" },
  { symbol: "GBP/USD", asset: "British Pound", type: "Forex" },
];

interface AssetSelectionPanelProps {
  tradeType: "buy" | "sell";
  status: "open" | "closed";
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setType: (type: "buy" | "sell") => void;
  setStatus: (status: "open" | "closed") => void;
  isthatSell:TradeType
}

export default function AssetSelectionPanel({
  tradeType,
  status,
  searchQuery,
  setSearchQuery,
  isDropdownOpen,
  setIsDropdownOpen,
  setFormData,
  setType,
  setStatus,
  isthatSell
}: AssetSelectionPanelProps) {
  const cleanQuery = searchQuery.trim().toUpperCase();
  const filteredPairs = POPULAR_PAIRS.filter(
    (pair) =>
      pair.symbol.includes(cleanQuery) ||
      pair.asset.toUpperCase().includes(cleanQuery)
  );
  const isExactMatch = POPULAR_PAIRS.some((pair) => pair.symbol === cleanQuery);

  const handleSelect = (symbol: string) => {
    setFormData((prev: any) => ({ ...prev, currency_pair: symbol }));
    setSearchQuery(symbol);
    setIsDropdownOpen(false);
  };

  return (
    <div className="p-6 flex flex-col gap-6 bg-zinc-900/5">
      <h3 className="text-[11px] font-semibold uppercase tracking-widest font-mono text-zinc-500">
        01 // Position Type
      </h3>

      <div className="flex flex-col gap-2 relative">
        <label className="text-xs font-semibold text-zinc-400 tracking-tight">
          Asset Pair Selection
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Type to filter or create custom..."
            value={searchQuery}
            onFocus={() => setIsDropdownOpen(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            className="w-full bg-zinc-900/40 border border-zinc-800 focus:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-700 font-mono focus:outline-none transition-colors"
          />
          <span className="absolute right-3 top-2.5 text-zinc-600 font-mono text-[10px] pointer-events-none">
            ▼
          </span>
        </div>

        {isDropdownOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
            <div className="absolute top-[68px] left-0 w-full bg-zinc-950 border border-zinc-800 rounded-lg max-h-56 overflow-y-auto z-20 shadow-2xl divide-y divide-zinc-900/50 backdrop-blur-md">
              {filteredPairs.map((pair) => (
                <button
                  key={pair.symbol}
                  type="button"
                  onClick={() => handleSelect(pair.symbol)}
                  className="w-full text-left px-3 py-2.5 hover:bg-zinc-900/80 transition-colors flex items-center justify-between text-xs group cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-zinc-200 group-hover:text-white">{pair.symbol}</span>
                    <span className="text-[10px] text-zinc-500">{pair.asset}</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase bg-zinc-900 px-1.5 py-0.5 border border-zinc-800 rounded text-zinc-400 group-hover:border-zinc-700">
                    {pair.type}
                  </span>
                </button>
              ))}

              {cleanQuery.length > 0 && !isExactMatch && (
                <button
                  type="button"
                  onClick={() => handleSelect(cleanQuery)}
                  className="w-full text-left px-3 py-3 bg-zinc-900/30 hover:bg-zinc-900 text-xs transition-colors flex items-center gap-2 border-t border-zinc-900 group cursor-pointer"
                >
                  <span className="text-zinc-500 font-mono">＋</span>
                  <span className="text-zinc-400 font-medium group-hover:text-zinc-200">
                    Register custom pair <span className="font-mono font-bold text-emerald-400">"{cleanQuery}"</span>
                  </span>
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <TradeTypeSelector isthatSell={isthatSell} value={tradeType} onChange={setType} />
      <TradeStatusSelector value={status} onChange={setStatus} />
    </div>
  );
}