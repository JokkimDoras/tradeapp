import axios from "axios"
import { getToken } from "../utils/auth"

const API_URL = import.meta.env.VITE_API_URL
export async function createAccountApi (accDetails:any) {
const token = getToken();
    try{
       const response = await axios.post(`${API_URL}/api/accounts/create`,accDetails,{
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

export async function deleteAccountApi(idToDel:string) {
    const token = getToken();
  try{
    const response = await axios.delete(`${API_URL}/api/accounts/delete/${idToDel}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
     })

     console.log(response.data)
     return response.data
  }catch(err:any){
     throw err
  }
}


export async function getAccountApi() {
    const token = getToken();
    try{
       const response = await axios.get(`${API_URL}/api/accounts`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
       })
       return response.data
    }catch(err:any){
        throw err
    }
    
}