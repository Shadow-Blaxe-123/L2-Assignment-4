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

// function TableForm() {
//   const { data, isSuccess } = useGetAllBooksQuery(undefined);
//   if (isSuccess) {
//     console.log(data.data[0].available);
//     return (
//       <div className="w-full p-5">
//         <Table>
//           <TableCaption>A list of all the books in your library.</TableCaption>
//           <TableHeader>
//             <TableRow className="md:text-xl lg:text-3xl text-black">
//               <TableHead>Title</TableHead>
//               <TableHead>Author</TableHead>
//               <TableHead>Genre</TableHead>
//               <TableHead>ISBN</TableHead>
//               <TableHead>Copies</TableHead>
//               <TableHead>Availability</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {data.data.map((book) => (
//               <TableRow
//                 className="md:text-xl lg:text-lg font-semibold"
//                 key={book._id}
//               >
//                 <TableCell>{book.title}</TableCell>
//                 <TableCell>{book.author}</TableCell>
//                 <TableCell>{book.genre}</TableCell>
//                 <TableCell>{book.isbn}</TableCell>
//                 <TableCell>{book.copies}</TableCell>
//                 <TableCell>
//                   {book.available ? "Available" : "Not Available"}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     );
//   }
// }

function TableForm() {
  const { data, isSuccess, isLoading, isError, error } = useGetAllBooksQuery({
    limit: 10,
    page: 1,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading books: {JSON.stringify(error)}</p>;

  if (isSuccess) {
    return (
      <div className="w-full p-5 ">
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
                <TableCell>
                  <button>Edit</button>
                  <button>Delete</button>
                  <button>Borrow</button>
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
