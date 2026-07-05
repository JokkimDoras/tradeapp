import { Outlet } from "react-router";
import SideBar from "./sidebar/SideBar";
import { useSidebar } from "../hooks/useSidebar";
import { SidebarProvider } from "../context/SidebarContext";
import TradeProvider from "../context/TradeContext";
import AccountProvider from "../context/AccountContext";
import useAccount from "../hooks/useAccount";
import AddAccount from "./addAccount/AddAccount";

function DashboardLayoutContent() {
  const { isOpen } = useSidebar();
  const { isModalOpen} = useAccount()

  return (
    <div className="flex min-h-screen bg-black text-white font-mono overflow-x-hidden relative">
      <div
        className={`
          fixed inset-y-0 left-0 z-50 h-screen bg-[#121212] transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? "w-64 border-r border-zinc-800" : "w-0 border-r-0"}
        `}
      >
        <SideBar />
      </div>

      <div
        className={`flex-1 min-w-0 transition-all duration-300 min-h-screen flex flex-col
          ${isOpen ? "pl-64" : "pl-0"}
        `}
      >
        <Outlet />
      </div>
      {isModalOpen && (
        <AddAccount />
      )} 
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <AccountProvider>
      <SidebarProvider>
        <TradeProvider>
          <DashboardLayoutContent />
        </TradeProvider>
      </SidebarProvider>
    </AccountProvider>
  );
}
