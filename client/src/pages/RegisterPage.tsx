import axios from "axios";
import { useEffect, useState } from "react";

export default function RegisterPage() {
    const[formData,setFormData]=useState({email:'',password:'' })

    const handleInput = (e:any) => {

        const { name,value } = e.target;
        
        setFormData((prevState) => ({
            ...prevState,       
            [name]: value      
          }));

    }

    const handleRegister =async (e:any) => {
        if(!formData.email.trim() || !formData.password.trim()){
            alert('fill the form ')
        }
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/auth/register',formData);

        }catch(err){
            console.log(err)
        }
          

    }


  return  <div>
    <form onSubmit={(e) => handleRegister(e)}>
        <input onChange={(e) => handleInput(e)} name='email' value={formData.email} />
        <input onChange={e => handleInput(e)} name='password' value={formData.password}/>
        <button type="submit">Create</button>
    </form>
    </div>
}