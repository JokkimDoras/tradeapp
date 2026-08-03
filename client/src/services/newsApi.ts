import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL 

export async function newsApi () {
    try{
       const res = await axios.get(`${API_URL}/api/news/trade`);
     
       return res.data
    }catch(err) {
        console.log('Error from frontened',err)
    }
}