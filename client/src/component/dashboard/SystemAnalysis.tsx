interface SystemAnalysisProps {
    hasTrades: boolean;
  }
  
  export default function SystemAnalysis({ hasTrades }: SystemAnalysisProps) {
    return (
      <div className="w-full p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-3">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">System Analysis</span>
        <div className="text-sm font-mono text-zinc-400 min-h-[50px] flex items-center leading-relaxed">
          {!hasTrades
            ? "Awaiting data synchronisation to generate real-time performance analytics metrics."
            : "Ledger status operational. Review continuous execution sequence logs below."}
        </div>
      </div>
    );
  }