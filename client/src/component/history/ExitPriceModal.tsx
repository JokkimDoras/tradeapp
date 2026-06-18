import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

interface ExitPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (exitPrice: number) => void;
  currencyPair: string;
  entryPrice: number;
}

export default function ExitPriceModal({
  isOpen,
  onClose,
  onSubmit,
  currencyPair,
  entryPrice,
}: ExitPriceModalProps) {
  const [exitPrice, setExitPrice] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Reset local states on toggle open
  useEffect(() => {
    if (isOpen) {
      setExitPrice("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(exitPrice);
    
    if (!isNaN(priceNum) && priceNum > 0) {
      setIsSubmitting(true);
      try {
        // Await the update tracking to let the spinner render
        await onSubmit(priceNum);
      } catch (err) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] transition-opacity">
      <div className="w-full max-w-sm bg-black border border-zinc-800 rounded-md shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] overflow-hidden font-sans text-zinc-200">
        
        {/* Header Block */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-900 bg-zinc-950/50">
          <span className="text-xs font-semibold tracking-tight text-white">
            Close Position
          </span>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 p-1 rounded transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
          >
            <FiX size={14} />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleProcess} className="p-5 flex flex-col gap-4">
          
          {/* Metadata Display Row */}
          <div className="flex justify-between items-center bg-zinc-950 border border-zinc-900 p-3 rounded-md text-xs">
            <div>
              <span className="block text-zinc-500 text-[10px] font-medium mb-0.5">Asset</span>
              <span className="text-white font-semibold font-mono tracking-wide">{currencyPair}</span>
            </div>
            <div className="text-right">
              <span className="block text-zinc-500 text-[10px] font-medium mb-0.5">Entry Price</span>
              <span className="text-zinc-300 font-medium font-mono">{entryPrice || "—"}</span>
            </div>
          </div>

          {/* Form Input Field Group */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] text-zinc-400 font-medium tracking-tight">
              Execution Exit Price
            </label>
            <input
              autoFocus
              type="number"
              step="any"
              required
              disabled={isSubmitting}
              placeholder="0.00000"
              value={exitPrice}
              onChange={(e) => setExitPrice(e.target.value)}
              className="w-full bg-black border border-zinc-800 focus:border-zinc-400 text-white placeholder-zinc-700 font-mono text-sm rounded-md px-3 py-2 outline-none transition-all disabled:opacity-50"
            />
          </div>

          {/* Action Footer Controls */}
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="flex-1 py-1.5 text-xs font-medium text-zinc-400 hover:text-white border border-zinc-800 bg-black hover:bg-zinc-900 rounded-md transition-all cursor-pointer disabled:opacity-0 disabled:pointer-events-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-[34px] flex items-center justify-center text-xs font-medium bg-white text-black rounded-md hover:bg-zinc-200 active:scale-[0.99] transition-all cursor-pointer font-sans disabled:bg-zinc-900 disabled:text-zinc-600 disabled:border-zinc-800 disabled:scale-100 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <div className="w-3.5 h-3.5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                "Confirm Exit"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}