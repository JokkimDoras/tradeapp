import { createContext, useState } from "react";
import { createAccountApi } from "../services/accoutApi";


type Account = {
    id: string;
    name: string;
    broker: string | null;
    account_type: "live" | "demo" | "funded";
    currency: string;
    starting_balance: any;
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
       const  res  = await createAccountApi(accountData);
       if(res.success){
        // 1. Grab the new account object
    //   const newAccount = res.data;

    //   // 2. Explicitly force starting_balance to be a number
    //   const sanitizedAccount = {
    //     ...newAccount,
    //     starting_balance: Number(newAccount.starting_balance)
    //   };
        setAccounts((prev) => ([
            ...prev,
            res.data
        ]))
       }
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