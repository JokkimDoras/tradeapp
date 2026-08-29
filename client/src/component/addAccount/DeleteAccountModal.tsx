import { useState } from "react";
import useAccount from "../../hooks/useAccount";
import { toast } from "sonner";
import ConfirmModal from "../ui/ConfirmModal";

interface DeleteAccountModalProps {
    setIsDeleteModalOpen: (open: boolean) => void;
    children: any;
}

function DeleteAccountModal({
    setIsDeleteModalOpen,
    children
}: DeleteAccountModalProps) {

    const [loading, setLoading] = useState(false);
    const { deleteAccount } = useAccount();

    const handleDelete = async (idToDel: string) => {
        try {
            setLoading(true);

            await deleteAccount(idToDel);

            setIsDeleteModalOpen(false);
            toast.success("Account Deleted");

        } catch (err: any) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
      <ConfirmModal
      title="Delete Workspace Account"
      description={
          <>
              Are you sure you want to permanently delete{" "}
              <span className="text-zinc-100 font-semibold">
                  "{children.name}"
              </span>
              ? This action cannot be undone and will immediately wipe all
              context dashboard metrics.
          </>
      }
      loading={loading}
      onClose={() => setIsDeleteModalOpen(false)}
      onDelete={() => handleDelete(children.id)}
  />
    );
}

export default DeleteAccountModal;