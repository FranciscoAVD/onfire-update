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
import { format, startOfToday, parseISO, isWeekend } from "date-fns";
import { cn, formatDateToDefault } from "@/lib/utils";
import {
  rhythms,
  weekdayPrivateTimeSlots,
  weekendPrivateTimeSlots,
} from "@/features/classes/lib/constants";
import { addPrivateAction } from "@/features/classes/privates/actions/add-private-action";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FormError } from "@/components/ui/form-error";

export function AddPrivateForm({
  className,
  expirationDate,
}: {
  className?: string;
  expirationDate: string;
}) {
  const [state, formAction, isLoading] = useActionState(addPrivateAction, {
    success: false,
  });
  const validDay = getValidDate(startOfToday());
  const [selected, setSelected] = useState<Date>(validDay.day);
  useEffect(() => {
    if (state.success) {
      toast("Private scheduled", {
        description: `Private schedule for ${format(selected, "EEEE, MMMM d")}`,
      });
    }
  }, [state]);
  return (
    <form action={formAction} className={cn(`grid gap-4 ${className}`)}>
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
        {state.errors?.date && <FormError>{state.errors.date[0]}</FormError>}
      </div>
      <div className="flex flex-col gap-1">
        <Label>Times</Label>
        <Select
          name="time"
          defaultValue={state.previous?.time.toString() ?? undefined}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a time" />
          </SelectTrigger>
          <SelectContent>
            {isWeekend(selected)
              ? Array.from(weekendPrivateTimeSlots.entries()).map(
                  ([key, value]) => (
                    <SelectItem key={key} value={key.toString()}>
                      {value}
                    </SelectItem>
                  ),
                )
              : Array.from(weekdayPrivateTimeSlots.entries()).map(
                  ([key, value]) => (
                    <SelectItem key={key} value={key.toString()}>
                      {value}
                    </SelectItem>
                  ),
                )}
          </SelectContent>
        </Select>
        {state.errors?.time && <FormError>{state.errors.time[0]}</FormError>}
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
        {state.errors?.rhythm && (
          <FormError>{state.errors.rhythm[0]}</FormError>
        )}
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : "Schedule"}
      </Button>
    </form>
  );
}
