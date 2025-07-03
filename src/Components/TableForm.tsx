import { useGetAllBooksQuery } from "@/redux/api/getBookQuery";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

function TableForm() {
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  return (
    <div className="w-full p-5">
      <Table>
        <TableCaption>A list of all the books in your library.</TableCaption>
        <TableHeader>
          <TableRow className="md:text-xl lg:text-3xl text-black">
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="md:text-xl lg:text-lg font-semibold">
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default TableForm;
