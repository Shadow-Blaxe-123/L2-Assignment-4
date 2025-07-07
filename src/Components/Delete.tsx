import { RiDeleteBin6Line } from "react-icons/ri";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";
import { useDeleteBookMutation } from "@/redux/api/BookApi";
import { setLoading } from "@/redux/loadingSlice";
import { Button } from "@/components/ui/button";

interface DeleteProps {
  id: string;
}

function Delete({ id }: DeleteProps) {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    dispatch(setLoading(true));
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully");
    } catch (err) {
      console.error("Failed to delete:", err);
      toast.error("Failed to delete book");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="default" disabled={isLoading}>
          <RiDeleteBin6Line />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The book will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Yes, delete it"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Delete;
