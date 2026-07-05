import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";


function useAccount() {
    const context = useContext(AccountContext);

    if(!context) throw new Error('useAccount must be used inside AccountProvider')

        return context
}

export default useAccount;