import axios from "axios"
import { getToken } from "../utils/auth"

const API_URL = import.meta.env.VITE_API_URL
export async function createAccountApi (accDetails:any) {
const token = getToken();
    try{
       const response = await axios.post(`${API_URL}/api/account/create`,accDetails,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        console.log(response.data)
        return response.data
    }catch(err:any){
        console.error(err);
        throw err;
    }

}