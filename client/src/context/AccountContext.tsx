import { createContext, useState } from "react";


type Account = {
    id: string;
    name: string;
    size: number;
    broker: string;
    platform: string;
};

interface AccountProviderTypes{
    accounts:Account[];
    setAccounts:any;
    selectedAccount:string | null;
    setSelectedAccount:any;
}

export const AccountContext = createContext<AccountProviderTypes | null>(null) 



function AccountProvider ({ children }: { children: React.ReactNode }) {
    
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccount,setSelectedAccount] = useState<string | null>(null);

    return (
        <AccountContext.Provider value={{ 
            accounts,
            setAccounts,
            selectedAccount,
            setSelectedAccount
            
             }}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;