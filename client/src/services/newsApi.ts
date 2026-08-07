import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL 

export async function newsApi () {
    const token = getToken();
    try{
       const res = await axios.get(`${API_URL}/api/news/trade`,{
        headers: {
            Authorization:`Bearer ${token}`
        }
       });
     
       return res.data.data
    }catch(err) {
        console.log('Error from frontened',err)
    }
}