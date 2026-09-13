import axios from "axios";
import { getToken } from "../utils/auth";


const API_URL = import.meta.env.VITE_API_URL

export async function deleteUserAccountApi () {
    const token = getToken()
    try{
       const response = await axios.delete(`${API_URL}/api/user/me`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
       })
       return response.data 
    }catch(err){
  throw err
    }
}