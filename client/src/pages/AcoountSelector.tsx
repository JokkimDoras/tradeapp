import Navbar from "../component/NavBar";
import { useSidebar } from "../hooks/useSidebar";

function AccountSelector() {
    
    const { toggleSidebar } = useSidebar()
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white relative">
      <div>
        <Navbar toggleSidebar={toggleSidebar}>Account Selector</Navbar>
      </div>
      <div className="flex gap-10 min-h-full justify-center items-center rounded  ">
        <div className="w-80 h-30 bg-red-500 rounded border border-zinc-900 bg-zinc-950"></div>
        <div className="w-80 h-30 bg-red-500 rounded border border-zinc-900 bg-zinc-950"></div>
        <div className="w-80 h-30 bg-red-500 rounded border border-zinc-900 bg-zinc-950"></div>
      </div>
      <div>

      </div>
    </div>
  );
}

export default AccountSelector;
