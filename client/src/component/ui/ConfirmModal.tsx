 interface ConfirmModalPropType {

    title:string;
    description:string;
    loading:boolean;
    onDelete:() => void;
    onClose:() => void;

}

function ConfirmModal ({title,description,loading,onDelete,onClose}:ConfirmModalPropType) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 cursor-pointer font-sans antialiased selection:bg-zinc-800 selection:text-white" >
        <div className="w-full max-w-[400px] bg-black border border-zinc-900 rounded-lg overflow-hidden shadow-2xl shadow-black animate-in zoom-in-95 duration-200 cursor-default">

          <div className="p-5 flex flex-col gap-2">
            <h2 className="text-[14px] font-semibold text-zinc-50 tracking-tight">
              {title}
            </h2>
            <p className="text-[13px] text-zinc-400 leading-relaxed tracking-tight">
              {description}
            </p>

          </div>

          <div className="flex items-center justify-end gap-2 px-5 py-3 bg-[#050505] border-t border-zinc-900">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-[12px] font-medium text-zinc-400 hover:text-zinc-100 bg-transparent hover:bg-zinc-900/50 rounded-md transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              className="cursor-pointer px-3 py-1.5 text-[12px] font-medium bg-red-600 hover:bg-red-500 text-white border border-red-700 hover:border-red-600 rounded-md transition-all shadow-sm shadow-red-950/20 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onDelete}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </button>
          </div>

        </div>

      </div>
    )}
  


export default ConfirmModal;