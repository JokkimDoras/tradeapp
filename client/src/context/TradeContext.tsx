import { createContext, useState, type ReactNode,type  Dispatch, type SetStateAction } from "react";

interface TradeContextType {
  trade: any[]; 
  setTrade: Dispatch<SetStateAction<any[]>>;
}


export const TradeContext = createContext<TradeContextType | null>(null);

interface TradeProviderProps {
  children: ReactNode;
}

export default function TradeProvider({ children }: TradeProviderProps) {
  const [trade, setTrade] = useState<any[]>([]);

  return (
    <TradeContext.Provider value={{ trade, setTrade }}>
      {children}
    </TradeContext.Provider>
  );
}