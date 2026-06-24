import type { ReactNode } from "react";

interface DeleteAccountModalProps {
  setIsDeleteModalOpen: (open: boolean) => void;
  children: ReactNode;
}

function DeleteAccountModal({ setIsDeleteModalOpen, children }: DeleteAccountModalProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 cursor-pointer font-sans antialiased selection:bg-zinc-800 selection:text-white"
      onClick={() => setIsDeleteModalOpen(false)} 
    >
      <div 
        className="w-full max-w-[400px] bg-black border border-zinc-900 rounded-lg overflow-hidden shadow-2xl shadow-black animate-in zoom-in-95 duration-200 cursor-default"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="p-5 flex flex-col gap-2">
          <h2 className="text-[14px] font-semibold text-zinc-50 tracking-tight">
            Delete Workspace Account
          </h2>
          <p className="text-[13px] text-zinc-400 leading-relaxed tracking-tight">
            Are you sure you want to permanently delete <span className="text-zinc-100 font-semibold">"{children}"</span>? This action cannot be undone and will immediately wipe all context dashboard metrics.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-3 bg-[#050505] border-t border-zinc-900">
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-3 py-1.5 text-[12px] font-medium text-zinc-400 hover:text-zinc-100 bg-transparent hover:bg-zinc-900/50 rounded-md transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-[12px] font-medium bg-red-600 hover:bg-red-500 text-white border border-red-700 hover:border-red-600 rounded-md transition-all cursor-pointer shadow-sm shadow-red-950/20"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;