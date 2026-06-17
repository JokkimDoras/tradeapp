import axios from "axios";
import { getToken } from "../utils/auth";

export interface TradeFormData {
    currency_pair: string;
    trade_type: "buy" | "sell";
    status: "open" | "closed";
    entry_price: string;
    exit_price: string;
    stop_loss: string;
    take_profit: string;
    lot_size: string;
    risk_percentage: string;
    notes: string;
    trade_date: string;
  }
const token = getToken();

const URL = import.meta.env.VITE_API_URL
export async function createTradeApi (formData:TradeFormData,token:string) {
    try{
      const response = await axios.post(`${URL}/api/trades/addtrade`,formData,{
        headers:{Authorization:`Bearer ${token}`}
       })
       console.log(response.data)
       return response.data
    }catch(err:any){
       console.error('Error from trade Api',err)
       throw err;
    }
}

export async function getTrade () {
  try{
    const response = await axios.get(`${URL}/api/trades/gettrade`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log(response.data)
     return response.data
  }catch(err:any){
   console.log('from getTrade',err)
   throw err
  }
}

export async function deleteTrade(tradeId:number) {
  try{
    await axios.delete(`${URL}/api/trade/deletetrade/${tradeId}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }catch(err:any){
    console.log(err)
    throw err;
  }
}