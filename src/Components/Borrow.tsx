import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/redux/hooks";
import { setLoading } from "@/redux/loadingSlice";
import { toast } from "sonner";
import { PiNotebookDuotone } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { useBorrowBookMutation } from "@/redux/api/BorrowApi";
import { borrowSummaryDialog } from "@/redux/navbarSlice";

interface Props {
  title: string;
  id: string;
  copies: number;
  available: boolean;
}

function formatDateTime(date: Date, time: string): string {
  const pad = (n: number) => n.toString().padStart(2, "0");

  // Parse time string "HH:MM:SS"
  const [hours, minutes, seconds] = time.split(":").map(Number);

  // Clone date so original is not mutated
  const combinedDateTime = new Date(date);
  combinedDateTime.setHours(hours);
  combinedDateTime.setMinutes(minutes);
  combinedDateTime.setSeconds(seconds);

  const year = combinedDateTime.getFullYear();
  const month = pad(combinedDateTime.getMonth() + 1);
  const day = pad(combinedDateTime.getDate());

  const hh = pad(combinedDateTime.getHours());
  const mm = pad(combinedDateTime.getMinutes());
  const ss = pad(combinedDateTime.getSeconds());

  return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
}

export default function Borrow({ title, id, copies, available }: Props) {
  // States
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("10:30:00"); // Default time
  const dispatch = useAppDispatch();
  const [borrow] = useBorrowBookMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dueDate = date ? formatDateTime(date, time) : null;
    console.log("Formatted dueDate:", dueDate);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const borrowBook = {
      book: id,
      quantity: Number(formData.get("quantity")),
      dueDate: dueDate ?? "",
    };
    console.log("Form Data:", borrowBook);

    setOpen1(false);
    try {
      dispatch(setLoading(true));
      const res = await borrow(borrowBook).unwrap();
      toast.success("Book borrowed successfully");
      dispatch(borrowSummaryDialog());
      console.log(res);
    } catch (error) {
      console.error("Failed to borrow book:", error);
      toast.error("Failed to borrow book");
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }

    console.log("📘 Borrow Book:");
  };
  if (available === false) {
    return (
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-red-500">Not available</span>
      </div>
    );
  }

  return (
    <Dialog open={open1} onOpenChange={setOpen1}>
      <DialogTrigger asChild>
        <Button>
          <PiNotebookDuotone />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Borrow This Book?</DialogTitle>
            <DialogDescription>
              Fill in details to borrow the book. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <span className="flex flex-col">
                Book Title:
                <span className="font-bold">{title}</span>
              </span>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="quantity-1">Quantity</Label>
              <Input
                id="quantity-1"
                name="quantity"
                required
                type="number"
                max={copies}
                defaultValue={1}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1">
                  Date
                </Label>
                <Popover open={open2} onOpenChange={setOpen2}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-32 justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen2(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                  Time
                </Label>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  value={time}
                  required
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!date}>
              Borrow
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
