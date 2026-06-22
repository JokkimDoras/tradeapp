import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/userApi";
import type { User,AuthContextType } from "../types/user.types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({
    full_name: "",
    email: "",
    country: "",
    bio: "",
    account_currency: "",
    default_lot_size: 0,
    risk_per_trade: 0,
    trading_experience: "",
    timezone:""
  });


  
  useEffect(() => {
    const restoreuser = async() => {
      try{
        const {data} =  await getUser();
        setUser(data)
      }catch(err){
        console.log(err,'from also authContext useEffect')
        throw err
      }
    }
    restoreuser()
  },[])
  



  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
