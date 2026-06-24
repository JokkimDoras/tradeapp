import { createContext, useState } from "react";
import { createAccountApi, deleteAccountApi, getAccountApi } from "../services/accoutApi";

type Account = {
  id: number;
  name: string;
  broker: string | null;
  account_type: "live" | "demo" | "funded";
  currency: string;
  starting_balance: any;
};

interface AccountProviderTypes {
  accounts: Account[];
  setAccounts: any;
  selectedAccount: string | null;
  setSelectedAccount: any;
  createAccount: (some: any) => Promise<void>;
  getAccount:() => Promise<void>;
  deleteAccount:(idToDel:number) => Promise<void>
}

export const AccountContext = createContext<AccountProviderTypes | null>(null);

function AccountProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const createAccount = async (accountData: any) => {
    try {
      const res = await createAccountApi(accountData);
      if (res.success) {
        // 1. Grab the new account object
        //   const newAccount = res.data;

        //   // 2. Explicitly force starting_balance to be a number
        //   const sanitizedAccount = {
        //     ...newAccount,
        //     starting_balance: Number(newAccount.starting_balance)
        //   };
        setAccounts((prev) => [...prev, res.data]);
      }
    } catch (err) {
        console.error(err)

      throw err;
    }
  };

  const deleteAccount = async (idToDel:number) => {
    try{
        await deleteAccountApi(idToDel);
        const filtered = accounts.filter((account) => {
            return account.id !== idToDel;
        })
        setAccounts(filtered)

    }catch(err:any){
        console.error(err)
        throw err
    }
  }
  const getAccount = async () => {
    try {
     const res = await getAccountApi();
     if(res.success){
        setAccounts(res.data)
     }
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <AccountContext.Provider
      value={{
        accounts,
        setAccounts,
        selectedAccount,
        setSelectedAccount,
        createAccount,
        getAccount,
        deleteAccount
        
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export default AccountProvider;
