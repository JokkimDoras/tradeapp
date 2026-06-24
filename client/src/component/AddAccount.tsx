import { useState } from "react";
import useAccount from "../hooks/useAccount";
import { useSidebar } from "../hooks/useSidebar";
import Navbar from "./NavBar";

interface AddAccountProps{
    setIsModalOpen:any;
}
function AddAccount ({setIsModalOpen}:AddAccountProps) {
    const { toggleSidebar } = useSidebar();
    const { setAccounts } = useAccount(); 

    const [newAccount, setNewAccount] = useState({
        name: "",
        size: "",
        platform: ""
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        
        if (name === 'accountsize') {
            const onlyNumbers = value.replace(/[^0-9]/g, "");
            setNewAccount((prev) => ({
                ...prev,
                size: onlyNumbers
            }));
        } else {
            setNewAccount((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    
    const handleSave = () => {
        if (!newAccount.name || !newAccount.size) return; 

        setAccounts((prevArray:any) => [
            ...prevArray,
            { 
                ...newAccount, 
                id: crypto.randomUUID() 
            }
        ]);

        setIsModalOpen(false); 
    };

    return (
        <div className="font-sans antialiased selection:bg-zinc-800 selection:text-white">
            <Navbar toggleSidebar={toggleSidebar}>Add an Account</Navbar>
            
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[1px] ">
                <div className="w-full max-w-[430px] bg-black border border-zinc-900 rounded-lg shadow-2xl overflow-hidden flex flex-col ">
                    
                    <div className="p-5 border-b border-zinc-900 flex flex-col gap-1.5">
                        <h3 className="text-[16px] font-bold text-zinc-50 tracking-tight">Add an Account</h3>
                        <p className="text-[13px] text-zinc-400 font-medium tracking-tight">
                            Mention your account details
                        </p>
                    </div>
                    
                    <div className="p-5 flex flex-col gap-2">
                        <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider font-mono">
                            Account Name
                        </label>
                        <input 
                            type="text" 
                            name="name" 
                            value={newAccount.name}
                            onChange={handleChange}
                            placeholder="Personal Trading"
                            className="w-full bg-[#0a0a0a] border border-zinc-900 rounded-md px-3 py-2 text-[14px] font-medium text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-zinc-100 transition-all"
                        />
                    </div>

                    {/* Account Size */}
                    <div className="p-5 flex flex-col gap-2">
                        <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider font-mono">
                            Account size
                        </label>
                        <input 
                            type="text"
                            name="accountsize" 
                            value={newAccount.size}
                            inputMode="numeric" 
                            pattern="[0-9]*"
                            onChange={handleChange}
                            placeholder="10000"
                            className="w-full bg-[#0a0a0a] border border-zinc-900 rounded-md px-3 py-2 text-[14px] font-medium text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-zinc-100 transition-all"
                        />
                    </div>

                    {/* Account Platform */}
                    <div className="p-5 flex flex-col gap-2">
                        <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider font-mono">
                            Account Platform
                        </label>
                        <input 
                            type="text" 
                            name="platform"
                            value={newAccount.platform}
                            onChange={handleChange}
                            placeholder="MetaTrader"
                            className="w-full bg-[#0a0a0a] border border-zinc-900 rounded-md px-3 py-2 text-[14px] font-medium text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-zinc-100 transition-all"
                        />
                    </div>

                    {/* Footer Actions */}
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