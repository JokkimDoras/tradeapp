// src/component/SideBar.tsx
import { useNavigate } from 'react-router';
import { FaArrowLeft } from "react-icons/fa";
import { useSidebar } from '../hooks/useSidebar';

const overviewItems = [
    { id: 1, name: 'Dashboard', path: '/dashboard' },
    { id: 2, name: 'Trade Journal', path: '/journal' },
    { id: 3, name: 'History', path: '/history' },
    { id: 4, name: 'Strategies', path: '/strategies' },
];

const accountItems = [
    { id: 5, name: 'Profile', path: '/profile' },
    { id: 6, name: 'Setting', path: '/setting' },
];

export default function SideBar() {
    const { isOpen, closeSidebar } = useSidebar();
    const fullname = localStorage.getItem('fullname');
    const navigate = useNavigate();

    const handlebutton = () => {
        console.log(isOpen)
        console.log('hello')
    }
    
    const handleNavigation = (path: string) => {
        if (path) {
            navigate(path);
            closeSidebar();
        }
    };

    return (
        <div className="flex flex-col w-64 h-screen bg-[#121212] text-gray-100 p-4 border-r border-neutral-800">
    
            {/* Logo/Header Wrap */}
            <div className="flex justify-between items-center p-2">
                <span className="text-xl font-bold tracking-wider text-indigo-400">
                    TradeVault
                </span>
                
                <button 
                    onClick={handlebutton}
                    className=" text-zinc-400 hover:text-white p-2 rounded transition-colors duration-150 "
                    aria-label="Close navigation menu"
                >
                    <FaArrowLeft className="w-4 h-4" />
                </button>
            </div>
    
            <hr className="border-neutral-800 my-3" />
            
            {/* Section 1: Overview */}
            <div className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold text-neutral-500 tracking-widest px-2 py-1 uppercase">
                    Trading Overview
                </h3>
                {overviewItems.map((item) => (
                    <button 
                        key={item.id} 
                        className="text-left px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors"
                        onClick={() => handleNavigation(item.path)}
                    >
                        {item.name}
                    </button>
                ))}
            </div>

            {/* Section 2: Account/Settings */}
            <div className="flex flex-col gap-1 mt-6">
                <h3 className="text-xs font-semibold text-neutral-500 tracking-widest px-2 py-1 uppercase">
                    Account
                </h3>
                {accountItems.map((item) => (
                    <button 
                        key={item.id} 
                        className="text-left px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors"
                        onClick={() => handleNavigation(item.path)}
                    >
                        {item.name}
                    </button>
                ))}
            </div>

            {/* Profile Footer */}
            <div className="flex justify-start items-center gap-3 mt-auto pt-4 border-t border-neutral-900 px-2">
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm font-semibold text-indigo-400 uppercase flex-shrink-0">
                    {fullname ? fullname[0] : "O"}
                </div> 
                <div className="flex flex-col min-w-0">
                    <span className="text-xs text-zinc-500 font-medium tracking-wider uppercase">Operator</span>
                    <span className="text-sm font-medium text-zinc-200 truncate leading-none mt-0.5">{fullname || "GUEST_USER"}</span>
                </div>
            </div>
        </div>
    );
}