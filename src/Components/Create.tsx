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

export default function Create() {
  return (
    <Dialog>
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
        <form>
          <DialogHeader>
            <DialogTitle>New Book</DialogTitle>
            <DialogDescription>
              Create your new book. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title-1">Title</Label>
              <Input id="title-1" name="title" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="author-1">Author</Label>
              <Input id="author-1" name="author" />
            </div>
            <div className="grid gap-3 ">
              <Label htmlFor="genre-1">Genre</Label>
              <select
                id="genre-1"
                name="genre"
                className="border border-[0.92,0,0,1] px-3 py-1 rounded-md"
                defaultValue={"Select the genre"}
              >
                <option disabled>Select the genre</option>
                <option value="HISTORY">HISTORY</option>
                <option value="FICTION">FICTION</option>
                <option value="NON_FICTION">NON_FICTION</option>
                <option value="BIOGRAPHY">BIOGRAPHY</option>
                <option value="SCIENCE">SCIENCE</option>
                <option value="FANATASY">FANATASY</option>
              </select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="isbn-1">Isbn</Label>
              <Input id="isbn-1" name="isbn" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="copies-1">Copies</Label>
              <Input id="copies-1" name="copies" />
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
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
