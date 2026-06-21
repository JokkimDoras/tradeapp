import axios from "axios";
import { getToken } from "../utils/auth";
import type { responseScreenshotData } from "../types/screenshot.types";

const API_URL = import.meta.env.VITE_API_URL

const token = getToken();

export const createScreenshotApi = async (tradeId:number,imageData:FormData) => {
  console.warn(imageData)
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

export const getScreenshotApi =async (tradeId:string) => {
    
    try{
     const response = await axios.get(`${API_URL}/api/trades/${tradeId}/screenshot`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
     })
     console.log(response.data)
     return response.data
    }catch(err:any){
      console.log(err?.message || 'Failed in screenshotApi')
      throw err
    }
     
}

export const deleteScreenshotApi = async(delDetails:responseScreenshotData) => {
    try{
        const response = await axios.delete(`${API_URL}/api/trades/delete/screenshot`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            data:delDetails
        })
        return response.data
    }catch(err:any){
        console.error(err?.message || 'Failed in deleteScreenshotApi')
        throw err
    }


}
  