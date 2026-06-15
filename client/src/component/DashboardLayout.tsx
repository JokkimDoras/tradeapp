import { Outlet } from "react-router";
import SideBar from "./SideBar";
import { useSidebar } from "../hooks/useSidebar";
import { SidebarProvider } from "../context/SidebarContext";

function DashboardLayoutContent() {
  const { isOpen } = useSidebar();

  return (
    <div className="flex min-h-screen bg-black text-white font-mono overflow-x-hidden relative">
      
{/*      
      {isOpen && (
        <div 
          onClick={closeSidebar} 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-200" 
        />
      )} */}

      
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 h-screen bg-[#121212] transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? "w-64 border-r border-zinc-800" : "w-0 border-r-0"}
        `}
      >
        <SideBar />
      </div>

      <div 
        className={`flex-1 p-8 min-w-0 transition-all duration-300
          ${isOpen ? "pl-72" : "pl-8"}
        `}
      >
        <Outlet />
      </div>

    </div>
  );
}

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardLayoutContent />
    </SidebarProvider>
  );
}