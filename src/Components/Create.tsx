import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAppDispatch } from "@/redux/hooks";
import { useAddBookMutation } from "@/redux/api/BookApi";
import { setLoading } from "@/redux/loadingSlice";
import { toast } from "sonner";

export default function Create() {
  const [open, setOpen] = useState(false);
  const [addBook] = useAddBookMutation();
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
    };
    setOpen(false);
    try {
      dispatch(setLoading(true));
      await addBook({ book: updatedBook }).unwrap();
      toast.success("Book created successfully");
    } catch (error) {
      console.error("Failed to create book:", error);
      toast.error("Failed to create book");
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }

    console.log("📘 Created Book:", updatedBook);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size={"default"}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          + New Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New Book</DialogTitle>
            <DialogDescription>
              Create your new book. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title-1">Title</Label>
              <Input id="title-1" name="title" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="author-1">Author</Label>
              <Input id="author-1" name="author" required />
            </div>
            <div className="grid gap-3 ">
              <Label htmlFor="genre-1">Genre</Label>
              <select
                id="genre-1"
                name="genre"
                className="border border-[0.92,0,0,1] px-3 py-1 rounded-md"
                defaultValue={"Select the genre"}
                required
              >
                <option disabled>Select the genre</option>
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
              <Input id="isbn-1" name="isbn" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="copies-1">Copies</Label>
              <Input
                id="copies-1"
                name="copies"
                type="number"
                min={0}
                step={1}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="available-1">Availability</Label>
              <select
                name="available"
                defaultValue="true"
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
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
