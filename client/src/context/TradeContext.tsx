import { createContext, useState, type ReactNode,type  Dispatch, type SetStateAction, useEffect } from "react";
import { createTradeApi } from "../services/tradeApi";
import { deleteTrade, type TradeFormData } from "../services/tradeApi";
import { getTrade } from "../services/tradeApi";


interface TradeContextType {
  trades: any[]; 
  setTrades: Dispatch<SetStateAction<any[]>>;
  addTrade: (formData: any, token: string  ) => Promise<void>; 
  removeTrade:(idToDel:number) =>Promise<void>
}


export const TradeContext = createContext<TradeContextType | null>(null);

interface TradeProviderProps {
  children: ReactNode;
}





export default function TradeProvider({ children }: TradeProviderProps) {
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    const fetchInitialState = async () => {
      const {data} = await getTrade();
      setTrades(data)
    }
    fetchInitialState()

  },[])

   const addTrade = async(formData:TradeFormData,token:string  ) => {
      try{
       const {data} = await createTradeApi(formData,token)
        setTrades((prev) => ([
          ...prev,
          data
        ]))
      }catch(err:any){
        console.log('error from tradeContext',err)
        throw err
      }
  
    }

    const removeTrade = async(idToDel:number) => {

      try{
        await deleteTrade(idToDel)
      }catch(err:any){
        console.log(err)
        throw err
      }

    }

  return (
    <TradeContext.Provider value={{ trades, setTrades,addTrade,removeTrade }}>
      {children}
    </TradeContext.Provider>
  );
}