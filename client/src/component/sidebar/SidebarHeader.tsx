import { useNavigate } from "react-router";
import useAccount from '../../hooks/useAccount';

interface SidebarHeaderProps {
  closeSidebar: () => void;
}

export default function SidebarHeader({ closeSidebar }: SidebarHeaderProps) {
  const navigate = useNavigate();
  const { selectedAccount } = useAccount();
  return (
    <div className="h-12 flex items-center justify-between px-5 pb-3 border-b border-zinc-900">
      <span onClick={() => navigate(`/dashboard/${selectedAccount?.id}`)} className="text-base font-bold text-zinc-50 tracking-tight cursor-pointer">
        TradeVault
      </span>
      <button
        onClick={closeSidebar}
        className="w-8 h-8 flex items-center justify-center rounded-md border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-500 hover:text-zinc-100 transition-all"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    </div>
  );
}