import { IoIosAdd } from "react-icons/io";

interface AccountHeaderProps {
  setIsModalOpen: (open: boolean) => void;
}

export default function AccountHeader({ setIsModalOpen }: AccountHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-900 pb-5">
      <div>
        <h1 className="text-[20px] font-bold text-zinc-50 tracking-tight">
          Select Account
        </h1>
        <p className="text-[13px] text-zinc-400 mt-1">
          Choose an active account dashboard context to continue.
        </p>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium bg-zinc-50 text-black hover:bg-zinc-200 border border-zinc-50 rounded-md transition-all cursor-pointer shadow-sm"
      >
        <IoIosAdd size={16} className="stroke-[1.5]" />
        <span>New Account</span>
      </button>
    </div>
  );
}