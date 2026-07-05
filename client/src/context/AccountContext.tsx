import {
  createContext,
  useState,
  useEffect,
  type SetStateAction,
  type Dispatch,
} from "react";
import {
  createAccountApi,
  deleteAccountApi,
  getAccountApi,
  getParticularAccountApi,
} from "../services/accoutApi";

type Account = {
  id: string | null;
  name: string | null;
  broker: string | null;
  account_type: "live" | "demo" | "funded" | "";
  currency: string;
  starting_balance: any;
};

interface AccountProviderTypes {
  accounts: Account[];
  setAccounts: any;
  selectedAccount: Account | null;
  setSelectedAccount: any;
  createAccount: (some: any) => Promise<void>;
  getAccount: () => Promise<void>;
  deleteAccount: (idToDel: string) => Promise<void>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  loading: boolean;
  getParticularAccount: () => Promise<void>;
}

export const AccountContext = createContext<AccountProviderTypes | null>(null);

function AccountProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(() => {
    const saved = localStorage.getItem("selectedAccount");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedAccount) {
      localStorage.setItem("selectedAccount", JSON.stringify(selectedAccount));
    } else {
      localStorage.removeItem("selectedAccount");
    }
  }, [selectedAccount]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        await getAccount();
      } catch (err: any) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

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
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);

      throw err;
    }
  };

  const deleteAccount = async (idToDel: string) => {
    try {
      await deleteAccountApi(idToDel);
      const filtered = accounts.filter((account) => {
        return account.id !== idToDel;
      });
      setAccounts(filtered);
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };
  const getAccount = async () => {
    try {
      const res = await getAccountApi();
      if (res.success) {
        setAccounts(res.data);
      }
    } catch (err: any) {
      throw err;
    }
  };

  const getParticularAccount = async () => {
    try {
      const res = await getParticularAccountApi(selectedAccount?.id!);

      return res;
    } catch (err) {
      console.error(err);
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
        deleteAccount,
        isModalOpen,
        setIsModalOpen,
        loading,
        getParticularAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export default AccountProvider;
