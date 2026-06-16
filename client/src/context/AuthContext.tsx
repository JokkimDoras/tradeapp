import { createContext, useState } from "react";

interface AuthContextType {
  fullname: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  country:string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  bio:string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const[country,setCountry] = useState('')
  const [bio,setBio] = useState('')

  console.log(fullname,'from authcontext')
  return (
    <AuthContext.Provider
      value={{
        fullname,
        setFullName,
        email,
        setEmail,
        country,
        setCountry,
        bio,
        setBio
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}