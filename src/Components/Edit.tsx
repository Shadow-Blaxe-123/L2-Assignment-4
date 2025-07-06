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
import { Button } from "./ui/button";
import type { Book } from "@/redux/api/types";
import { useEditBookMutation } from "@/redux/api/BookApi";
import { useAppDispatch } from "@/redux/hooks";
import type React from "react";
import { setLoading } from "@/redux/loadingSlice";
import { toast } from "sonner";
import { useState } from "react";
interface EditProps {
  book: Book;
}
export default function Edit({ book }: EditProps) {
  const [open, setOpen] = useState(false);
  const [editBook] = useEditBookMutation();
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const updatedBook = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      genre: formData.get("genre") as string,
      isbn: formData.get("isbn") as string,
      copies: Number(formData.get("copies")),
      available: formData.get("available") === "true",
      description: book.description,
    };
    setOpen(false);
    try {
      dispatch(setLoading(true));
      await editBook({
        id: book._id,
        newBook: updatedBook,
      }).unwrap();
      toast.success("Book updated successfully");
    } catch (error) {
      console.error("Failed to update book:", error);
      toast.error("Failed to update book");
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }

    console.log("📘 Edited Book:", updatedBook);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size={"default"}>
          <CiEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Make changes to your book here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title-1">Title</Label>
              <Input
                id="title-1"
                name="title"
                defaultValue={book.title}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="author-1">Author</Label>
              <Input
                id="author-1"
                name="author"
                defaultValue={book.author}
                required
              />
            </div>
            <div className="grid gap-3 ">
              <Label htmlFor="genre-1">Genre</Label>
              <select
                id="genre-1"
                name="genre"
                defaultValue={book.genre}
                className="border border-[0.92,0,0,1] px-3 py-1 rounded-md"
                required
              >
                <option value="HISTORY">HISTORY</option>
                <option value="FICTION">FICTION</option>
                <option value="NON_FICTION">NON_FICTION</option>
                <option value="BIOGRAPHY">BIOGRAPHY</option>
                <option value="SCIENCE">SCIENCE</option>
                <option value="FANTASY">FANTASY</option>
              </select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="isbn-1">Isbn</Label>
              <Input
                id="isbn-1"
                name="isbn"
                defaultValue={book.isbn}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="copies-1">Copies</Label>
              <Input
                id="copies-1"
                name="copies"
                defaultValue={book.copies}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="available-1">Availability</Label>
              <select
                name="available"
                defaultValue={book.available ? "true" : "false"}
                id="available-1"
                className="border border-[0.92,0,0,1] px-3 py-1 rounded-md mb-5"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
