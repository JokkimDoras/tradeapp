import { createContext, useState } from "react";
import { useLocation } from "react-router";

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  currentPath:string;
  setCurrentPath: (path:string) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);


export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const pathName = location.pathname
  const activeItem = pathName.replace('/','').charAt(0).toUpperCase()+pathName.replace('/','').slice(1)
  const [isOpen, setIsOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState(activeItem);
  console.log(activeItem,'from sidebarContext')
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggleSidebar,
        openSidebar,
        closeSidebar,
        currentPath,
        setCurrentPath,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
