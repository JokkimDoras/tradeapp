import { useState } from "react";
import { useSidebar } from "../hooks/useSidebar";
import AssetSelectionPanel from "./addtrade/AssetSelectionPanel";
import PricingPanel from "./addtrade/PricingPanel";
import RiskConfigurationPanel from "./addtrade/RiskConfigurationPanel";
import useTrade from "../hooks/useTrade";

type TradeType = "buy" | "sell";
type TradeStatus = "open" | "closed";

interface AddTradeProps {
  setIsOpen: (isOpen: boolean) => void;
}

export default function AddTrade({ setIsOpen }: AddTradeProps) {
  const { toggleSidebar } = useSidebar();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = localStorage.getItem('token') ?? ''
  const { addTrade } = useTrade()
  const [formData, setFormData] = useState({
    currency_pair: "",
    trade_type: "buy" as TradeType,
    status: "open" as TradeStatus,
    entry_price: "",
    exit_price: "",
    stop_loss: "",
    take_profit: "",
    lot_size: "",
    risk_percentage: "",
    pips: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setType = (type: TradeType) => setFormData((p) => ({ ...p, trade_type: type }));
  const setStatus = (status: TradeStatus) => setFormData((p) => ({ ...p, status }));

  const handleCancel = () => {
    setSearchQuery("");
    setFormData({
      currency_pair: "", trade_type: "buy", status: "open", entry_price: "",
      exit_price: "", stop_loss: "", take_profit: "", lot_size: "",
      risk_percentage: "", pips: "", notes: ""
    });
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      setLoading(true);
      await addTrade(formData,token)
      console.log('from addTrade.tsx',formData,token)
    }catch(err){
      console.log(err)
      throw err
    }finally{
      setLoading(false)
    }
    // if (!formData.currency_pair) return alert("Please select or enter an asset pair.");
    
    // setLoading(true);
    // const payload = {
    //   ...formData,
    //   entry_price: parseFloat(formData.entry_price),
    //   exit_price: formData.status === "closed" && formData.exit_price ? parseFloat(formData.exit_price) : null,
    //   stop_loss: formData.stop_loss ? parseFloat(formData.stop_loss) : null,
    //   take_profit: formData.take_profit ? parseFloat(formData.take_profit) : null,
    //   lot_size: parseFloat(formData.lot_size),
    //   risk_percentage: formData.risk_percentage ? parseFloat(formData.risk_percentage) : null,
    //   pips: formData.pips ? parseFloat(formData.pips) : null,
    // };

    // console.log("Submitting Payload:", payload);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // setLoading(false);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white">
      {/* ── TOPBAR ── */}
      <header className="h-16 border-b border-zinc-900 flex items-center justify-between px-8 shrink-0 bg-black">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            type="button"
            className="w-9 h-9 flex items-center justify-center rounded-md border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
              <path d="M2 4.5h11M2 7.5h11M2 10.5h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex items-center gap-2 text-base font-medium tracking-tight text-zinc-400">
            <span>Execution Terminal</span>
          </div>
        </div>
      </header>

      {/* ── MAIN WORKSPACE CONTAINER ── */}
      <div className="w-full flex-1 px-8 py-12 flex flex-col items-center gap-10 overflow-y-auto">
        <div className="flex flex-col gap-2 w-full max-w-5xl text-left">
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight sm:text-4xl">New Position Node</h1>
          <p className="text-base text-zinc-400 font-normal">
            Commit an active or closed ledger sequence to secure vault database analytics.
          </p>
        </div>

        {/* ── TERMINAL FORM GRID ── */}
        <form onSubmit={handleSubmit} className="w-full max-w-5xl border border-zinc-900 rounded-xl bg-zinc-950/40 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/50">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-r divide-zinc-900">
            
            <AssetSelectionPanel 
              tradeType={formData.trade_type}
              status={formData.status}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              setFormData={setFormData}
              setType={setType}
              setStatus={setStatus}
            />

            <PricingPanel formData={formData} handleChange={handleChange} />

            <RiskConfigurationPanel formData={formData} handleChange={handleChange} />

          </div>

          {/* LOWER ANALYSIS TEXTAREA CONTAINER */}
          <div className="border-t border-zinc-900 p-6 bg-black/40">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider font-mono text-zinc-500">
                04 // Post-Execution Commentary
              </label>
              <textarea
                name="notes"
                rows={3}
                placeholder="Log internal psychological drivers, structural constraints..."
                value={formData.notes}
                onChange={handleChange}
                className="w-full bg-zinc-900/20 border border-zinc-900 focus:border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none transition-colors resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* LOWER TERMINAL METADATA ACTION BAR */}
          <div className="border-t border-zinc-900 px-6 py-4 bg-zinc-950/80 flex items-center justify-between text-xs font-medium text-zinc-500 font-mono">
            <span>Terminal Registry Stream Node</span>
            <div className="flex items-center gap-4">
              <button type="button" onClick={handleCancel} className="hover:text-zinc-300 transition-colors text-red-500 cursor-pointer">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="bg-zinc-50 text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 font-sans font-bold text-xs px-4 py-2 rounded-md transition-colors cursor-pointer">
                {loading ? "Vaulting Core..." : "Commit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}