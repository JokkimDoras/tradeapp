import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL

export async function getUser(){
    const token = getToken();
    try{
       const response =  await axios.get(`${API_URL}/api/user/me`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
       })
       return response
    }catch(err:any){
        console.log(err)
        throw err
    }
}

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

