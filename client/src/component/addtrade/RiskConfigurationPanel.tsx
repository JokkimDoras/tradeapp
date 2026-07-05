import { useState } from "react";
import Input from "../ui/Input";

interface RiskConfigurationPanelProps {
  formData: {
    stop_loss: string;
    take_profit: string;
    risk_percentage: string;
    strategy: string; 
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function RiskConfigurationPanel({ 
  formData, 
  handleChange, 
  setFormData
}: RiskConfigurationPanelProps) {

  const [isOpen, setIsOpen] = useState(false);

  const strategies = [
    "Moving Average Crossover",
    "Support & Resistance Bounce",
    "Breakout",
    "Trendline Bounce",
    "Supply & Demand / Order Block",
    "Fibonacci Retracement",
    "RSI Overbought / Oversold",
    "MACD Divergence",
    "Double Top / Double Bottom",
    "Head and Shoulders",
    "Candlestick Price Action",
    "VWAP Scalping",
    "Mean Reversion",
    "News / Fundamental Catalyst"
  ];

  const filteredStrategies = strategies.filter((strategie) => 
    strategie.toLowerCase().includes(formData.strategy.toLowerCase())
  );

  return (
    <div className="w-full bg-black border border-zinc-900 rounded-lg p-5 flex flex-col gap-5 select-none antialiased">
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-mono font-medium tracking-wider text-zinc-600 uppercase">
          03 // Risk Configuration
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-zinc-400 tracking-tight">
            Stop Loss
          </label>
          <div className="relative w-full">
            <Input
              type="number"
              step="any"
              name="stop_loss"
              placeholder="None"
              value={formData.stop_loss}
              onChange={handleChange}
              className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-md px-3 py-2 text-[13px] font-mono text-zinc-100 placeholder-zinc-800 focus:outline-none transition-colors duration-150 shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-zinc-400 tracking-tight">
            Take Profit
          </label>
          <div className="relative w-full">
            <Input
              type="number"
              step="any"
              name="take_profit"
              placeholder="None"
              value={formData.take_profit}
              onChange={handleChange}
              className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-md px-3 py-2 text-[13px] font-mono text-zinc-100 placeholder-zinc-800 focus:outline-none transition-colors duration-150 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-zinc-400 tracking-tight">
            Risk Delta (%)
          </label>
          <div className="relative w-full">
            <Input
              type="number"
              step="any"
              name="risk_percentage"
              placeholder="0.00%"
              value={formData.risk_percentage}
              onChange={handleChange}
              className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-md px-3 py-2 text-[13px] font-mono text-zinc-100 placeholder-zinc-800 focus:outline-none transition-colors duration-150 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 relative">
        <label className="text-[12px] font-medium text-zinc-400 tracking-tight">
          Strategies
        </label>
        <div className="relative w-full">
          <Input
            type="text"
            name="strategy" 
            placeholder="Select or type setup..."
            value={formData.strategy}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            onChange={handleChange} 
            className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-md px-3 py-2 text-[13px] font-mono text-zinc-100 placeholder-zinc-800 focus:outline-none transition-colors duration-150 shadow-sm"
          />
        </div>

        {isOpen && filteredStrategies.length > 0 && (
          <>
            <div className="absolute top-[68px] left-0 w-full bg-[#050505] border border-zinc-900 rounded-md max-h-48 overflow-y-auto z-50 shadow-2xl divide-y divide-zinc-950">
              {filteredStrategies.map((item, index) => (
                <div 
                  key={index}
                  onMouseDown={() => setFormData((prev: any) => ({ ...prev, strategy: item }))}              
                  className="w-full text-left px-3 py-2 hover:bg-black transition-colors text-xs font-mono font-medium text-zinc-400 hover:text-zinc-100 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}