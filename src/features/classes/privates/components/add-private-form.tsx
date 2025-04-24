"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format, isWeekend, startOfToday } from "date-fns";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  rhythms,
  weekdayPrivateTimeSlots,
  weekendPrivateTimeSlots,
} from "@/features/classes/lib/constants";
import { getValidDate } from "@/features/classes/lib/utils";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FormError } from "@/components/ui/form-error";

export function AddPrivateForm({ expirationDate }: { expirationDate: Date }) {
  const router = useRouter();
  //State
  const [selected, setSelected] = useState<Date>(
    getValidDate(startOfToday()).day,
  );
  const weekend: boolean = isWeekend(selected);
  const [time, setTime] = useState<number>(weekend ? 1000 : 1700);
  const [rhythm, setRhythm] = useState<string>("Salsa");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any | undefined>();
  //Effects
  useEffect(() => {
    setTime(weekend ? 1000 : 1700);
  }, [selected]);
  //Handlers
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    const res = await fetch("/api/privates/add-private", {
      method: "POST",
      body: JSON.stringify({
        date: selected,
        time: time,
        rhythm: rhythm,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setIsLoading(false);
    if (data.success) {
      toast("Private scheduled!");
      router.refresh();
    }
    if (data.errors) setErrors(data.errors);
  }
  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger className="mt-2 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none">
            {format(selected, "EEEE, MMMM d")}
          </PopoverTrigger>
          <PopoverContent align="start">
            <Calendar
              day={selected}
              setDay={setSelected}
              disabledAfter={expirationDate}
            />
          </PopoverContent>
        </Popover>
        {errors?.date && <FormError>{errors.date[0]}</FormError>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="time">Time</Label>
        <Select
          value={time.toString()}
          onValueChange={(v) => setTime(+v)}
          name="time"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a time" />
          </SelectTrigger>
          <SelectContent>
            {weekend
              ? [...weekendPrivateTimeSlots.entries()].map(([key, value]) => (
                  <SelectItem key={key.toString()} value={key.toString()}>
                    {value}
                  </SelectItem>
                ))
              : [...weekdayPrivateTimeSlots.entries()].map(([key, value]) => (
                  <SelectItem key={key.toString()} value={key.toString()}>
                    {value}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
        {errors?.time && <FormError>{errors.time[0]}</FormError>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="form-privates-add--rhythm">Rhythm</Label>
        <Select
          name="rhythm"
          value={rhythm}
          onValueChange={(v) => setRhythm(v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a rhythm" />
          </SelectTrigger>
          <SelectContent>
            {rhythms.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : "Schedule"}
      </Button>
    </form>
  );
}
