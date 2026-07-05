export default function EmptyState() {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-lg py-16 text-center">
        <p className="text-[14px] text-zinc-400 font-medium">No accounts found</p>
        <p className="text-[12px] text-zinc-600 mt-0.5">
          Create your first account workspace to begin trading.
        </p>
      </div>
    );
  }