import {  useState } from "react";
import Navbar from "../component/ui/NavBar";
import useAccount from "../hooks/useAccount";
import { useSidebar } from "../hooks/useSidebar";
import AddAccount from "../component/addAccount/AddAccount";
import DeleteAccountModal from "../component/DeleteAccountModal";
import AccountSelectorSkeleton from "../component/skeltons/AccountSelectorSkeleton";
import AccountHeader from "../component/addAccount/AccountHeader";
import AccountCard from "../component/addAccount/AccountCard";
import EmptyState from "../component/addAccount/EmptyState";

type whichOneState = {
  name: string;
  id: number | null;
};

function AccountSelector() {
  const { toggleSidebar } = useSidebar();
  const { accounts, loading,setIsModalOpen,isModalOpen } = useAccount();
  console.log("Type of setIsModalOpen:", typeof setIsModalOpen);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [whichOne, setWhichOne] = useState<whichOneState>({
    name: "",
    id: null,
  });
 
// useEffect(() => {
//   if(selectedAccount?.id){
//     navigate(`/dashboard/${selectedAccount?.id}`)
//   }
// },[])



  if (loading) return <AccountSelectorSkeleton />;

  if (isDeleteModalOpen)
    return (
      <DeleteAccountModal setIsDeleteModalOpen={setIsDeleteModalOpen}>
        {whichOne}
      </DeleteAccountModal>
    );

  return (
    <div className="flex flex-col min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white">
      <Navbar toggleSidebar={toggleSidebar}>Account Selector</Navbar>

      <main className="flex-1 max-w-auto w-full mx-auto px-6 py-12 flex flex-col gap-8">
        <AccountHeader setIsModalOpen={setIsModalOpen} />

        {accounts && accounts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                setWhichOne={setWhichOne}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>

      {isModalOpen && <AddAccount  />}
    </div>
  );
}

export default AccountSelector;