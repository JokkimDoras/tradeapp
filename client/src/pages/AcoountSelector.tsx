import { useState } from "react";
import Navbar from "../component/NavBar";
import useAccount from "../hooks/useAccount";
import { useSidebar } from "../hooks/useSidebar";
import AddAccount from "../component/AddAccount";
import { IoIosAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import DeleteAccountModal from "../component/DeleteAccountModal";

function AccountSelector() {
  const { toggleSidebar } = useSidebar();
  const { accounts } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);
  const [whichOne,setWhichOne] = useState('')

  if(isDeleteModalOpen) return <DeleteAccountModal setIsDeleteModalOpen={setIsDeleteModalOpen}>{whichOne}</DeleteAccountModal>

  return (
    <div className="flex flex-col min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white">
      <Navbar toggleSidebar={toggleSidebar}>Account Selector</Navbar>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex flex-col gap-8">
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

        {accounts && accounts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="w-full h-32 bg-black border border-zinc-900 rounded-lg p-4 flex flex-col justify-between hover:border-zinc-800 hover:bg-[#050505] transition-all cursor-pointer duration-200 group shadow-sm"
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] font-semibold text-zinc-100 tracking-tight group-hover:text-white transition-colors truncate max-w-[170px]">
                      {account.name}
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
                      setWhichOne(account.name)
                      
                    }}
                    className="text-zinc-500 hover:text-red-400 p-1.5 rounded hover:bg-zinc-900/50 transition-colors duration-150 cursor-pointer mb-[-4px] mr-[-4px]"
                  >
                    <MdDeleteOutline  onClick={() => setIsDeleteModalOpen(true)} color="red" size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-lg py-16 text-center">
            <p className="text-[14px] text-zinc-400 font-medium">
              No accounts found
            </p>
            <p className="text-[12px] text-zinc-600 mt-0.5">
              Create your first account workspace to begin trading.
            </p>
          </div>
        )}
      </main>

      {isModalOpen && <AddAccount setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default AccountSelector;