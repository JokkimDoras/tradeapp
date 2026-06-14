// src/component/DashboardLayout.tsx
import { Outlet } from "react-router";
import SideBar from "./SideBar";
import { useSidebar } from "../hooks/useSidebar";
import { SidebarProvider } from "../context/SidebarContext";
function DashboardLayoutContent() {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <div className="flex min-h-screen bg-black text-white font-mono overflow-x-hidden relative">
      
      {/* BACKGROUND SHADOW BLACKOUT */}
      {isOpen && (
        <div 
          onClick={closeSidebar} 
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity" 
        />
      )}

      {/* THIS IS THE CONTAINER THAT DRIVES THE OPEN/CLOSE WIDTH VISUALLY */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 h-screen bg-[#121212] transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? "w-64 border-r border-zinc-800" : "w-0 border-r-0"}
          md:relative md:w-64 md:border-r md:border-zinc-800 md:z-0
        `}
      >
        <SideBar />
      </div>

      {/* CONTENT INTERFACE */}
      <div className="flex-1 p-8 min-w-0">
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