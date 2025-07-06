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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import type { Book } from "@/redux/api/types";
interface EditProps {
  book: Book;
}
export default function Edit({ book }: EditProps) {
  return (
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
              Make changes to your book here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title-1">Title</Label>
              <Input id="title-1" name="title" defaultValue={book.title} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="author-1">Author</Label>
              <Input id="author-1" name="author" defaultValue={book.author} />
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
                  <SelectItem value="non-fiction">NON_FICTION</SelectItem>
                  <SelectItem value="biography">BIOGRAPHY</SelectItem>
                  <SelectItem value="science">SCIENCE</SelectItem>
                  <SelectItem value="fanatasy">FANATASY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="isbn-1">Isbn</Label>
              <Input id="isbn-1" name="isbn" defaultValue={book.isbn} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="copies-1">Copies</Label>
              <Input id="copies-1" name="copies" defaultValue={book.copies} />
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
  );
}
