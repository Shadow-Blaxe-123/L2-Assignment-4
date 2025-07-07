import { useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BorrowSummary } from "@/redux/api/types";
import { useGetBorrowSummaryQuery } from "@/redux/api/BorrowApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLoading } from "@/redux/loadingSlice";
import { borrowSummaryDialog } from "@/redux/navbarSlice";

export default function BorrowSummary() {
  const dispatch = useAppDispatch();
  //   const [open, setOpen] = useState(false);
  const open: boolean = useAppSelector(
    (state) => state.navbar.borrowSummaryDialogState
  );
  const { data, isLoading, isSuccess, isError, error } =
    useGetBorrowSummaryQuery();

  const borrowSummary: BorrowSummary[] = data?.data ?? [];

  // Sync RTK query loading to global loading state:
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  if (isError) return <p>Error loading books: {JSON.stringify(error)}</p>;

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={() => dispatch(borrowSummaryDialog())}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 text-white">
            Show Borrow Summary
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Borrow Summary</DialogTitle>
            <DialogDescription>
              All books currently borrowed with quantities.
            </DialogDescription>
          </DialogHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrowSummary.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.book.title}</TableCell>
                  <TableCell>{item.book.isbn}</TableCell>
                  <TableCell className="text-right">
                    {item.totalQuantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return null; // Fallback return if somehow nothing matched
}

{
  /*  */
}
