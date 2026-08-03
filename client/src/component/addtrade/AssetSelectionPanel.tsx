import { useEffect, useRef } from "react";
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
  isthatSell: TradeType;
  editData:any;
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
  isthatSell,
  editData
}: AssetSelectionPanelProps) {
  const assetInput = useRef<HTMLInputElement>(null);
  

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

  useEffect(() => {
    if(editData) return;
     assetInput.current?.focus()
  },[])

  return (
    <div className="w-full bg-black border border-zinc-900 rounded-lg p-5 flex flex-col gap-5 select-none antialiased">
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-mono font-medium tracking-wider text-zinc-600 uppercase">
          01 // Position Type
        </span>
      </div>

      <div className="flex flex-col gap-1.5 relative">
        <div className="flex items-center justify-between">
          <label className="text-[12px] font-medium text-zinc-400 tracking-tight">
            Asset Pair Selection
          </label>
          {searchQuery && (
            ''
          )}
        </div>

        <div className="relative w-full">
          <input
          ref={assetInput}
            type="text"
            placeholder="Search assets (e.g., BTC/USD)..."
            value={searchQuery}
            onFocus={() => setIsDropdownOpen(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-md px-3 py-2 text-[13px] font-mono text-zinc-100 placeholder-zinc-800 focus:outline-none transition-colors duration-150 shadow-sm"
          />
        </div>

        {isDropdownOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)} />
            <div className="absolute top-[64px] left-0 w-full bg-[#050505] border border-zinc-900 rounded-md max-h-60 overflow-y-auto z-40 shadow-2xl divide-y divide-zinc-950">
              {filteredPairs.length > 0 ? (
                filteredPairs.map((pair) => (
                  <button
                    key={pair.symbol}
                    type="button"
                    onClick={() => handleSelect(pair.symbol)}
                    className="w-full text-left px-3 py-2 hover:bg-black transition-colors flex items-center justify-between text-xs group cursor-pointer"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono font-bold text-[13px] text-zinc-200 group-hover:text-white transition-colors">
                        {pair.symbol}
                      </span>
                      <span className="text-[11px] text-zinc-600 group-hover:text-zinc-500 transition-colors truncate max-w-[140px]">
                        {pair.asset}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold tracking-tight rounded bg-zinc-900 text-zinc-400 px-1.5 py-0.5 uppercase border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                      {pair.type}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-2.5 text-[11px] font-mono text-zinc-600">
                  No preset assets match your criteria
                </div>
              )}

              {cleanQuery.length > 0 && !isExactMatch && (
                <button
                  type="button"
                  onClick={() => handleSelect(cleanQuery)}
                  className="w-full text-left px-3 py-2.5 bg-black hover:bg-[#090909] text-[11px] transition-colors flex items-center gap-2 border-t border-zinc-900 group cursor-pointer"
                >
                  <span className="text-emerald-500 font-mono font-bold text-sm leading-none">+</span>
                  <span className="text-zinc-400 font-medium font-mono group-hover:text-zinc-200 transition-colors">
                    Create asset <span className="text-emerald-400 font-bold">"{cleanQuery}"</span>
                  </span>
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3.5 border-t border-zinc-900/80 pt-4 mt-1">
        <TradeTypeSelector isthatSell={isthatSell} value={tradeType} onChange={setType} />
        <TradeStatusSelector value={status} onChange={setStatus} />
      </div>
    </div>
  );
}