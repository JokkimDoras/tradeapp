import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL

const token = getToken();
export const createScreenshotApi = async (tradeId:number,imageData:FormData) => {
    for (let [key, value] of imageData.entries()) {
      console.log(`Key: ${key}, Value:`, value);
    }
    try{
      const response = await axios.post(`${API_URL}/api/trades/${tradeId}/screenshot`,imageData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
  
      })
      return response.data
  
    }catch(err:any){
     console.error(err?.message || 'Failed in createScreenshot Api in tradeApi file')
     throw err
    }
  }
  