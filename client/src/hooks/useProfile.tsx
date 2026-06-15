import { useState } from "react"
import { userDetailsUpdate } from "../services/userApi"



export default function useProfile() {
    const [loading,setLoading]=useState(false)
    const[error,setError] = useState(null)

    const updateProfile = async(formProfile:any) => {
        console.log(formProfile,'from hook')
        try{
            setLoading(true)
            const data = await userDetailsUpdate(formProfile)
            return data
        }catch(err:any){
            setLoading(false)
            setError(err)
            console.log('From useProfile:',err)
        }finally{
            setLoading(false)
        }
    }

    return {
        updateProfile,
        loading,
        error
    }

}