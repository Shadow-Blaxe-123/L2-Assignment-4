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
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { ClockLoader } from "react-spinners";
import { Button } from "./ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiNotebookDuotone } from "react-icons/pi";

function TableForm() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isSuccess, isLoading, isError, error } = useGetAllBooksQuery({
    limit,
    page,
  });

  if (isLoading)
    return (
      <p className="flex items-center justify-center h-screen">
        <ClockLoader size={200} color="purple" speedMultiplier={2} />
      </p>
    );
  if (isError) return <p>Error loading books: {JSON.stringify(error)}</p>;

  if (isSuccess) {
    return (
      <div className="w-full p-5 ">
        <Table>
          <TableCaption>
            A list of all the books in your library.
            <ul className="flex items-center -space-x-px h-8 text-sm">
              <li onClick={() => page > 1 && setPage(page - 1)}>
                <div className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </div>
              </li>
              <li
                onClick={() => {
                  // setPage(page + 1);
                  if (data?.data?.length === limit) {
                    setPage((page) => page + 1);
                  }
                }}
              >
                <div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </div>
              </li>
            </ul>
          </TableCaption>
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
            {data.data.map((book) => (
              <TableRow
                className="md:text-xl lg:text-lg font-semibold"
                key={book._id}
              >
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  {book.available ? "Available" : "Unavailable"}
                </TableCell>
                <TableCell className="flex gap-3">
                  <Button variant="secondary" size={"default"}>
                    <CiEdit />
                  </Button>
                  <Button variant="destructive" size={"default"}>
                    <RiDeleteBin6Line />
                  </Button>
                  <Button>
                    <PiNotebookDuotone />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return null; // Fallback return if somehow nothing matched
}

export default TableForm;
