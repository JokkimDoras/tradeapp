import {
  FiGrid,
  FiBookOpen,
  FiBarChart2,
  FiClock,
  FiLayers,
  FiUser,
  FiSettings,
} from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router";
import { useSidebar } from "../../hooks/useSidebar";
import { useUser } from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { getToken } from "../../utils/auth";
import { useState, useRef, useEffect } from "react";
import useAccount from "../../hooks/useAccount";
import SidebarHeader from "./SidebarHeader";
import AccountDropdown from "./AccountDropdown";
import SidebarNavigation from "./SidebarNavigation";
import SidebarFooter from "./SidebarFooter";

type Account = {
  id: string;
  name: string;
  broker: string | null;
  account_type: "live" | "demo" | "funded";
  currency: string;
  starting_balance: any;
};

const navigation = [
  {
    section: "Overview",
    items: [
      { id: 1, name: "Dashboard", path: "/dashboard", icon: <FiGrid size={14} strokeWidth={1.75} /> },
      { id: 2, name: "Calendar", path: "/calendar", icon: <CiCalendarDate size={16} strokeWidth={1.75} /> },
      { id: 3, name: "Trade Journal", path: "/journal", icon: <FiBookOpen size={14} strokeWidth={1.75} /> },
      { id: 4, name: "Analytics", path: "/analytics", icon: <FiBarChart2 size={14} strokeWidth={1.75} /> },
      { id: 5, name: "History", path: "/history", icon: <FiClock size={14} strokeWidth={1.75} /> },
      { id: 6, name: "Strategies", path: "/strategies", icon: <FiLayers size={14} strokeWidth={1.75} /> },
      { id: 7, name: "News", path: "/news", icon: <FaRegNewspaper size={14} strokeWidth={1.75} /> },
    ],
  },
  {
    section: "Account",
    items: [
      { id: 8, name: "Profile", path: "/profile", icon: <FiUser size={14} strokeWidth={1.75} /> },
      { id: 9, name: "Settings", path: "/setting", icon: <FiSettings size={14} strokeWidth={1.75} /> },
    ],
  },
];

export default function SideBar() {
  const { closeSidebar, setCurrentPath } = useSidebar();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { selectedAccount, accounts, setSelectedAccount, setIsModalOpen } = useAccount();
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleLogout = async (e: any) => {
    const token = getToken();
    e.stopPropagation();
    await logout(token);
  };

  const initials = user.full_name
    ? user.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "TV";

    useEffect(() => {
      if (!selectedAccount?.id) return;
    
      const pages = ["dashboard", "history", "calendar", "analytics"];
    
      const currentPage = pages.find((page) =>
        location.pathname.startsWith(`/${page}`)
      );
    
      if (currentPage) {
        navigate(`/${currentPage}/${selectedAccount.id}`);
      }
    }, [selectedAccount?.id, location.pathname, navigate]);

  const handleNavigation = (item: { id: number; name: string; path: string }) => {
    if (
      item.name === "Dashboard" ||
      item.name === "History" ||
      item.name === "Calendar" ||
      item.name === "Analytics"
    ) {
      setCurrentPath(item.name);
      navigate(`${item.path}/${selectedAccount?.id}`);
    } else {
      setCurrentPath(item.name);
      navigate(item.path);
    }
  };

  const handleSelectAccount = (account: Account) => {
    setSelectedAccount(account);
    setAccountDropdownOpen(false);
  };

  const handleContainerMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleContainerMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setAccountDropdownOpen(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-64 h-screen bg-black border-r border-zinc-900 py-4 font-sans antialiased selection:bg-zinc-800 selection:text-white">
      <SidebarHeader closeSidebar={closeSidebar} />

      <AccountDropdown
        accountDropdownOpen={accountDropdownOpen}
        setAccountDropdownOpen={setAccountDropdownOpen}
        handleContainerMouseEnter={handleContainerMouseEnter}
        handleContainerMouseLeave={handleContainerMouseLeave}
        selectedAccount={selectedAccount}
        accounts={accounts}
        handleSelectAccount={handleSelectAccount}
        setIsModalOpen={setIsModalOpen}
      />

      <SidebarNavigation
        navigation={navigation}
        location={location}
        handleNavigation={handleNavigation}
      />

      <SidebarFooter
        initials={initials}
        user={user}
        setCurrentPath={setCurrentPath}
        navigate={navigate}
        handleLogout={handleLogout}
      />
    </div>
  );
}