import { useState } from "react";
import { deleteUserAccountApi } from "../services/deleteAccountApi";


export function useDeleteAccount() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteUserAccount = async () => {
        try {
            setLoading(true)
            const res = await deleteUserAccountApi();
            return res
        } catch (err: any) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        deleteUserAccount
    }

}

