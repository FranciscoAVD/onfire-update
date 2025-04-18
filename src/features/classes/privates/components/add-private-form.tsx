"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { getValidDate } from "@/features/classes/lib/utils";
import { format, startOfToday, parseISO, getDay } from "date-fns";
import { cn, formatDateToDefault } from "@/lib/utils";
import {
  rhythms,
  weekPrivateTimeSlots,
} from "@/features/classes/lib/constants";
import { Times } from "@/features/classes/lib/types";
import { toast } from "sonner";
export function AddPrivateForm({
  className,
  expirationDate,
}: {
  className?: string;
  expirationDate: string;
}) {
  const validDay = getValidDate(startOfToday());
  const [selected, setSelected] = useState<Date>(validDay.day);
  const [times, setTimes] = useState<Times | undefined>(
    weekPrivateTimeSlots.get(validDay.idx),
  );
  useEffect(() => {
    setTimes(weekPrivateTimeSlots.get(getDay(selected)));
  }, [selected]);

  // useEffect(() => {
  //   toast("Private scheduled");
  // }, []);
  return (
    <form className={cn(`grid gap-4 ${className}`)}>
      <div className="flex flex-col">
        <Label htmlFor="form-private-add--date">Date</Label>
        <Popover>
          <PopoverTrigger className="mt-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm">
            {format(selected, "EEEE, MMMM d")}
          </PopoverTrigger>
          <PopoverContent align="start">
            <Calendar
              day={selected}
              setDay={setSelected}
              disabledAfter={parseISO(expirationDate)}
            />
          </PopoverContent>
        </Popover>
        <Input
          id="form-private-add--date"
          name="date"
          value={formatDateToDefault(selected)}
          className="invisible p-0 size-0"
          readOnly
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Times</Label>
        <Select name="time" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a time" />
          </SelectTrigger>
          <SelectContent>
            {times &&
              Array.from(times.entries()).map(([key, value]) => (
                <SelectItem key={key} value={`${key}`}>
                  {value}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <Label>Rhythm</Label>
        <Select name="rhythm" defaultValue={rhythms[0]} required>
          <SelectTrigger className="w-full">
            <SelectValue />
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
      <Button type="submit">Schedule</Button>
    </form>
  );
}
