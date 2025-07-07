import { useGetAllBooksQuery } from "@/redux/api/BookApi";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { nextPage, prevPage } from "@/redux/paginationSlice";

import Delete from "@/components/Delete";
import { useEffect } from "react";
import { setLoading } from "@/redux/loadingSlice";
import Edit from "@/components/Edit";
import Borrow from "@/components/Borrow";

function TableForm() {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector((state) => state.pagination);
  const { data, isLoading, isSuccess, isError, error } =
    useGetAllBooksQuery(pagination);

  // Sync RTK query loading to global loading state:
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  if (isError) return <p>Error loading books: {JSON.stringify(error)}</p>;

  if (isSuccess) {
    return (
      <div className="w-full p-5 ">
        <Table>
          <TableCaption>
            A list of all the books in your library.
            <ul className="flex items-center -space-x-px h-8 text-sm">
              <li onClick={() => pagination.page > 1 && dispatch(prevPage())}>
                <MdNavigateBefore
                  size={50}
                  className="hover:cursor-pointer hover:bg-gray-200"
                />
              </li>
              <li
                onClick={() => {
                  if (data?.data?.length === pagination.limit) {
                    dispatch(nextPage());
                  }
                }}
              >
                <MdNavigateNext
                  size={50}
                  className="hover:cursor-pointer hover:bg-gray-200"
                />
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
                  {/* Edit Modal */}
                  <Edit book={book} />
                  {/* Delete Modal */}
                  <Delete id={book._id} />

                  <Borrow
                    title={book.title}
                    id={book._id}
                    copies={book.copies}
                  />
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
