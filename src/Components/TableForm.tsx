import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "@/redux/api/BookApi";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { CiEdit } from "react-icons/ci";
import { ClockLoader } from "react-spinners";
import { Button } from "./ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiNotebookDuotone } from "react-icons/pi";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
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
} from "./ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { nextPage, prevPage } from "@/redux/paginationSlice";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function TableForm() {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector((state) => state.pagination);
  const { data, isSuccess, isLoading, isError, error } =
    useGetAllBooksQuery(pagination);

  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap(); // unwrap to catch actual error
      // toast.success("Book deleted successfully");
      toast.success("Book deleted successfully");
      console.log("Deleted!");
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  if (isLoading || isDeleting)
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
                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <Button variant="secondary" size={"default"}>
                          <CiEdit />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Book</DialogTitle>
                          <DialogDescription>
                            Make changes to your book here. Click save when
                            you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="grid gap-3">
                            <Label htmlFor="title-1">Title</Label>
                            <Input
                              id="title-1"
                              name="title"
                              defaultValue={book.title}
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="author-1">Author</Label>
                            <Input
                              id="author-1"
                              name="author"
                              defaultValue={book.author}
                            />
                          </div>
                          <div className="grid gap-3">
                            {/* <Label htmlFor="genre-1">Genre</Label>
                            <Input
                              id="author-1"
                              name="genre"
                              defaultValue={book.genre}
                            /> */}
                            {/* Genre */}
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Genre" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="history" aria-checked="true">
                                  HISTORY
                                </SelectItem>
                                <SelectItem value="fiction">FICTION</SelectItem>
                                <SelectItem value="non-fiction">
                                  NON_FICTION
                                </SelectItem>
                                <SelectItem value="biography">
                                  BIOGRAPHY
                                </SelectItem>
                                <SelectItem value="science">SCIENCE</SelectItem>
                                <SelectItem value="fanatasy">
                                  FANATASY
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="isbn-1">Isbn</Label>
                            <Input
                              id="isbn-1"
                              name="isbn"
                              defaultValue={book.isbn}
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="copies-1">Copies</Label>
                            <Input
                              id="copies-1"
                              name="copies"
                              defaultValue={book.copies}
                            />
                          </div>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Availability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem
                                value="true"
                                aria-checked={book.copies > 0 ? true : false}
                              >
                                True
                              </SelectItem>
                              <SelectItem
                                value="false"
                                aria-checked={book.copies === 0 ? true : false}
                              >
                                False
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </form>
                  </Dialog>
                  {/* Delete Modal */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="default">
                        <RiDeleteBin6Line />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. The book will be
                          permanently deleted.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(book._id)}
                        >
                          Yes, delete it
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

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
