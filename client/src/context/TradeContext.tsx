import { createContext, useState, type ReactNode,type  Dispatch, type SetStateAction } from "react";
import { createTradeApi } from "../services/tradeApi";
import type { TradeFormData } from "../services/tradeApi";
interface TradeContextType {
  trade: any[]; 
  setTrade: Dispatch<SetStateAction<any[]>>;
  addTrade: (formData: any, token: string  ) => Promise<void>; 
}


export const TradeContext = createContext<TradeContextType | null>(null);

interface TradeProviderProps {
  children: ReactNode;
}





export default function TradeProvider({ children }: TradeProviderProps) {
  const [trade, setTrade] = useState<any[]>([]);

   const addTrade = async(formData:TradeFormData,token:string  ) => {
    console.log('get the item name',formData)
      try{
        await createTradeApi(formData,token)
        
      }catch(err:any){
        console.log('erroe from tradeContext',err)
        throw err
      }
  
    }

  return (
    <TradeContext.Provider value={{ trade, setTrade,addTrade }}>
      {children}
    </TradeContext.Provider>
  );
}