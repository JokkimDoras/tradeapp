import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL

export async function userDetailsUpdate(formData:any){
    const token = getToken();
    try{
        const response = await axios.post(`${API_URL}/api/user/update`,formData,{
            headers:{
                Authorization:`Bearer ${token}`
            }

        })
        console.log(response)
        return response.data
    }catch(err:any){
        console.log(err)
        throw err;
    }

}

