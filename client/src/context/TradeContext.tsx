import { createContext, useState, type ReactNode,type  Dispatch, type SetStateAction, useEffect } from "react";
import { createTradeApi } from "../services/tradeApi";
import type { TradeFormData } from "../services/tradeApi";
import { getTrade } from "../services/tradeApi";


interface TradeContextType {
  trades: any[]; 
  setTrades: Dispatch<SetStateAction<any[]>>;
  addTrade: (formData: any, token: string  ) => Promise<void>; 
}


export const TradeContext = createContext<TradeContextType | null>(null);

interface TradeProviderProps {
  children: ReactNode;
}





export default function TradeProvider({ children }: TradeProviderProps) {
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {

    console.log('Effect is running')
    const fetchInitialState = async () => {
      const {data} = await getTrade();
      setTrades(data)
    }
    fetchInitialState()

  },[])

   const addTrade = async(formData:TradeFormData,token:string  ) => {
    console.log('get the item name',formData)
      try{
       const {data} = await createTradeApi(formData,token)
        setTrades((prev) => ([
          ...prev,
          data
        ]))
      }catch(err:any){
        console.log('erroe from tradeContext',err)
        throw err
      }
  
    }

  return (
    <TradeContext.Provider value={{ trades, setTrades,addTrade }}>
      {children}
    </TradeContext.Provider>
  );
}