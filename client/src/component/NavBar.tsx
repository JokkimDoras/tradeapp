import { LuMenu } from "react-icons/lu";

interface NavbarProps {
  toggleSidebar: () => void;
  children:React.ReactNode
}

export default function Navbar({ toggleSidebar,children }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full h-16 border-b border-zinc-900 bg-black/70 backdrop-blur-md px-6 flex items-center">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        
        <div className="flex items-center gap-4">
          {/* SIDEBAR TOGGLE BUTTON */}
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-all active:scale-95"
          >
            <LuMenu className="w-4 h-4" />
          </button>

          {/* BREADCRUMB / BRANDING DISPLAY */}
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">{children}</span>
            <span className="text-zinc-700">/</span>
          </div>
        </div>
  
        {/* ACTION BUTTON & STATUS */}
        
 

      </div>
    </header>
  );
}