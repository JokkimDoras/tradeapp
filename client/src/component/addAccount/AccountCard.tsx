import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import useAccount from "../../hooks/useAccount";

interface AccountCardProps {
  account: any;
  setWhichOne: (state: { name: string; id: number | null }) => void;
  setIsDeleteModalOpen: (open: boolean) => void;
}

export default function AccountCard({
  account,
  setWhichOne,
  setIsDeleteModalOpen,
}: AccountCardProps) {

    const navigate = useNavigate();
    const { setSelectedAccount } = useAccount();

    const handleMultiTask = () => {
        setSelectedAccount({
            id: account.id,
            name: account?.name,
            broker: account.broker??null,
            account_type: account?.account_type ,
            currency: account?.currency,
            starting_balance: account?.starting_balance,
        })
        navigate(`/dashboard/${account.id}`)
    }

  return (
    <div className="w-full h-32 bg-black border border-zinc-900 rounded-lg p-4 flex flex-col justify-between hover:border-zinc-800 hover:bg-[#050505] transition-all cursor-pointer duration-200 group shadow-sm" onClick={handleMultiTask}>
      <div className="flex items-start justify-between w-full " >
        <div className="flex flex-col min-w-0" >
          <span className="text-[14px] font-semibold text-zinc-100 tracking-tight group-hover:text-white transition-colors truncate max-w-[170px]">
            {account.name?.toUpperCase() ?? ""}
          </span>
          <span className="text-[12px] text-zinc-500 truncate max-w-[150px] mt-0.5">
            {account.broker || "No Broker Specified"}
          </span>
        </div>

        <span
          className={`text-[10px] font-mono font-bold tracking-tight rounded px-1.5 py-0.5 uppercase border ${
            account.account_type === "live"
              ? "bg-emerald-850/40 text-emerald-400 border-emerald-900/50"
              : account.account_type === "funded"
              ? "bg-purple-950/40 text-purple-400 border-purple-900/50"
              : "bg-zinc-900 text-zinc-400 border-zinc-800"
          }`}
        >
          {account.account_type}
        </span>
      </div>

      <div className="flex items-end justify-between w-full mt-auto">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider font-mono">
            Starting Balance
          </span>
          <span className="text-[18px] font-bold font-mono text-zinc-50 tracking-tight leading-none">
            {account.currency === "USD" ? "$" : account.currency + " "}
            {Number(account.starting_balance || 0).toLocaleString()}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setWhichOne({
              name: account.name ?? "",
              id: account.id,
            });
          }}
          className="text-zinc-500 hover:text-red-400 p-1.5 rounded hover:bg-zinc-900/50 transition-colors duration-150 cursor-pointer mb-[-4px] mr-[-4px]"
        >
          <MdDeleteOutline
            onClick={() => setIsDeleteModalOpen(true)}
            color="red"
            size={18}
          />
        </button>
      </div>
    </div>
  );
}