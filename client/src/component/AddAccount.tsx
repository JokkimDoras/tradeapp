import { useState } from "react";
import { useSidebar } from "../hooks/useSidebar";
import Navbar from "./NavBar";
import { toast } from "sonner";
import useAccount from "../hooks/useAccount";

function AddAccount ({setIsModalOpen}:any) {
    const { toggleSidebar } = useSidebar();
    const { createAccount } = useAccount();

    const [newAccount, setNewAccount] = useState({
        name: "",
        broker: "",
        account_type: "demo", 
        currency: "USD",
        starting_balance: ""
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        
        if (name === 'starting_balance') {
            const onlyNumbers = value.replace(/[^0-9]/g, "");
            setNewAccount((prev) => ({
                ...prev,
                starting_balance: onlyNumbers
            }));
        } else {
            setNewAccount((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSave = async() => {
        if (!newAccount.name || !newAccount.starting_balance || !newAccount.currency || !newAccount.account_type) return toast.error('Fill the account details')

            console.log(newAccount)
            try{
                await createAccount(newAccount)
            }catch(err:any){
                throw err
            }
        // setAccounts((prevArray) => [
        //     ...prevArray,
        //     { 
        //         name: newAccount.name,
        //         broker: newAccount.broker || null, 
        //         account_type: newAccount.account_type, 
        //         currency: newAccount.currency || "USD",
        //         starting_balance: Number(newAccount.starting_balance) 
        //     }
        // ]);

        setIsModalOpen(false);
    };

    return (
        <div className="font-sans antialiased selection:bg-zinc-800 selection:text-white">
            <Navbar toggleSidebar={toggleSidebar}>Add an Account</Navbar>
            
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[1px]">
                <div className="w-full max-w-[430px] bg-black border border-zinc-900 rounded-lg shadow-2xl overflow-hidden flex flex-col">
                    
                    <div className="p-5 border-b border-zinc-900 flex flex-col gap-1.5">
                        <h3 className="text-[16px] font-bold text-zinc-50 tracking-tight">Add an Account</h3>
                        <p className="text-[13px] text-zinc-400 font-medium tracking-tight">Provide your configuration data structure parameters.</p>
                    </div>
                    
                    <div className="p-5 flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider font-mono">Account Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={newAccount.name}
                                onChange={handleChange}
                                placeholder="Personal Live Workspace"
                                className="w-full bg-[#0a0a0a] border border-zinc-900 rounded-md px-3 py-2 text-[14px] font-medium text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-zinc-100 transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider font-mono">Broker</label>
                            <input 
                                type="text" 
                                name="broker"
                                value={newAccount.broker}
                                onChange={handleChange}
                                placeholder="Prop Firm / IC Markets"
                                className="w-full bg-[#0a0a0a] border border-zinc-900 rounded-md px-3 py-2 text-[14px] font-medium text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-zinc-100 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider font-mono">Account Type</label>
                                <select 
                                    name="account_type"
                                    value={newAccount.account_type}
                                    onChange={handleChange}
                                    className="w-full bg-[#0a0a0a] border border-zinc-900 rounded-md px-3 py-2 text-[14px] font-medium text-zinc-50 focus:outline-none focus:border-zinc-100 transition-all cursor-pointer appearance-none"
                                >
                                    <option value="demo">Demo</option>
                                    <option value="live">Live</option>
                                    <option value="funded">Funded</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider font-mono">Currency</label>
                                <select 
                                    name="currency"
                                    value={newAccount.currency}
                                    onChange={handleChange}
                                    className="w-full bg-[#0a0a0a] border border-zinc-900 rounded-md px-3 py-2 text-[14px] font-medium text-zinc-50 focus:outline-none focus:border-zinc-100 transition-all cursor-pointer"
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider font-mono">Starting Balance</label>
                            <input 
                                type="text" 
                                name="starting_balance"
                                value={newAccount.starting_balance}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                onChange={handleChange}
                                placeholder="100000"
                                className="w-full bg-[#0a0a0a] border border-zinc-900 rounded-md px-3 py-2 text-[14px] font-medium text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-zinc-100 transition-all"
                            />
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] px-5 py-3.5 border-t border-zinc-900 flex justify-end gap-3">
                        <button 
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-3.5 py-1.5 text-[14px] font-medium text-zinc-400 hover:text-zinc-100 rounded-md border border-transparent hover:border-zinc-900 hover:bg-zinc-900/60 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="button"
                            onClick={handleSave}
                            className="px-3.5 py-1.5 text-[14px] font-semibold bg-zinc-50 text-black hover:bg-zinc-200 border border-zinc-50 rounded-md transition-all shadow-sm"
                        >
                            Save Account
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddAccount;