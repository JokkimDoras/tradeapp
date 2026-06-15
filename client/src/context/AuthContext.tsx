import { createContext, useState } from "react";

interface AuthContextType {
  fullname: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
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

  return (
    <AuthContext.Provider
      value={{
        fullname,
        setFullName,
        email,
        setEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}