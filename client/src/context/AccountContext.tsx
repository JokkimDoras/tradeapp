import { createContext, useState } from "react";
import { createAccountApi } from "../services/accoutApi";


type Account = {
    id: string;
    name: string;
    broker: string | null;
    account_type: "live" | "demo" | "funded";
    currency: string;
    starting_balance: number | null;
  };

interface AccountProviderTypes{
    accounts:Account[];
    setAccounts:any;
    selectedAccount:string | null;
    setSelectedAccount:any;
    createAccount:(some:any) => Promise<void>
}

export const AccountContext = createContext<AccountProviderTypes | null>(null) 



function AccountProvider ({ children }: { children: React.ReactNode }) {
    
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccount,setSelectedAccount] = useState<string | null>(null);

    const createAccount =async (accountData:any) => {
     try{
       const { data } = await createAccountApi(accountData);
       return data;
     }catch(err){
        throw err;
     }
    }

    return (
        <AccountContext.Provider value={{ 
            accounts,
            setAccounts,
            selectedAccount,
            setSelectedAccount,
            createAccount
            
             }}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;