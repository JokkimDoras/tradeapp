import { FiChevronDown, FiPlus } from "react-icons/fi";

// type Account = {
//   id: string | null;
//   name: string;
//   broker: string | null;
//   account_type: "live" | "demo" | "funded" | '';
//   currency: string;
//   starting_balance: any;
// };

interface AccountDropdownProps {
  accountDropdownOpen: boolean;
  setAccountDropdownOpen: (open: boolean) => void;
  handleContainerMouseEnter: () => void;
  handleContainerMouseLeave: () => void;
  selectedAccount: any;
  accounts: any[];
  handleSelectAccount: any;
  setIsModalOpen: (open: boolean) => void;
}

export default function AccountDropdown({
  accountDropdownOpen,
  setAccountDropdownOpen,
  handleContainerMouseEnter,
  handleContainerMouseLeave,
  selectedAccount,
  accounts,
  handleSelectAccount,
  setIsModalOpen,
}: AccountDropdownProps) {
  return (
    <div
      className="px-3 pt-4 pb-3 border-b border-zinc-900 relative"
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
    >
      <p className="text-[11px] font-semibold text-zinc-500 uppercase px-1 mb-2 tracking-wider font-mono">
        Active Account
      </p>
      <button
        onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
        onMouseEnter={() => setAccountDropdownOpen(true)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-md border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all"
      >
        <div className="flex flex-col items-start min-w-0">
          <span className="text-[13px] font-semibold text-zinc-100 truncate tracking-tight">
            {selectedAccount?.name ?? "Select Account"}
          </span>
          {selectedAccount && (
            <span className="text-[11px] text-zinc-500 capitalize">
              {selectedAccount.account_type} - {selectedAccount.currency}
            </span>
          )}
        </div>
        <FiChevronDown
          size={14}
          className={`text-zinc-500 flex-shrink-0 transition-transform duration-200 ${
            accountDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {accountDropdownOpen && (
        <div className="absolute left-3 right-3 top-full mt-1 bg-zinc-950 border border-zinc-800 rounded-md overflow-hidden z-50 shadow-xl">
          {accounts.map((account: any) => (
            <button
              key={account.id}
              onClick={() => handleSelectAccount(account)}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-zinc-900 transition-all ${
                selectedAccount?.id === account.id ? "bg-zinc-900" : ""
              }`}
            >
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-zinc-100">
                  {account.name}
                </span>
                <span className="text-[11px] text-zinc-500 capitalize">
                  {account.account_type} · {account.currency}
                </span>
              </div>
              {selectedAccount?.id === account.id && (
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
              )}
            </button>
          ))}

          <div className="border-t border-zinc-900">
            <button
              onClick={() => {
                setAccountDropdownOpen(true);
                setIsModalOpen(true);
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-zinc-900 transition-all text-zinc-500 hover:text-zinc-300"
            >
              <FiPlus size={13} />
              <span className="text-[13px]">Manage accounts</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}