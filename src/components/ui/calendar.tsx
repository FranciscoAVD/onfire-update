"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  format,
  startOfToday,
  startOfMonth,
  getDay,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isBefore,
  isAfter,
  isEqual,
  endOfMonth,
  addMonths,
  isSameMonth,
} from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DISABLED_DAYS } from "@/features/classes/lib/constants";
import { cn } from "@/lib/utils";
const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function Calendar({
  day,
  setDay,
  disabledAfter,
}: {
  day: Date;
  setDay: Dispatch<SetStateAction<Date>>;
  disabledAfter?: Date;
}) {
  const today = startOfToday();
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(startOfMonth(today));
  const daysOfTheMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });
  function nextMonth() {
    setFirstDayOfMonth((prev) => addMonths(prev, 1));
  }
  function previousMonth() {
    setFirstDayOfMonth((prev) => addMonths(prev, -1));
  }
  function previousDisabled(): boolean {
    const firstDayOfCurrentMonth = startOfMonth(today);
    return isBefore(addMonths(firstDayOfMonth, -1), firstDayOfCurrentMonth);
  }
  function nextDisabled(): boolean {
    if (!disabledAfter) return false;
    const firstDayOfNextMonth = addMonths(firstDayOfMonth, 1);
    return isAfter(firstDayOfNextMonth, disabledAfter);
  }
  return (
    <div>
      <div className="flex items-center pl-2">
        <p className="font-semibold">{format(firstDayOfMonth, "MMMM yyyy")}</p>
        <Button
          size="icon"
          variant="ghost"
          className="ml-auto"
          onClick={previousMonth}
          disabled={previousDisabled()}
        >
          <ChevronLeft aria-hidden />
          <span className="sr-only">Previous month</span>
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={nextMonth}
          disabled={nextDisabled()}
        >
          <ChevronRight aria-hidden />
          <span className="sr-only">Next month</span>
        </Button>
      </div>
      <div
        role="grid"
        className="grid grid-cols-7 py-2 text-center text-sm text-neutral-500"
      >
        {daysOfTheWeek.map((d) => (
          <div key={d} role="gridcell">
            {d}
          </div>
        ))}
      </div>
      <div role="grid" className="grid grid-cols-7 ">
        {daysOfTheMonth.map((d) => {
          const isToday = isEqual(d, today);
          const isDisabled =
            isBefore(d, today) ||
            isToday ||
            DISABLED_DAYS.includes(getDay(d)) ||
            (disabledAfter && isAfter(d, disabledAfter));
          return (
            <button
              key={d.toDateString()}
              className={cn(
                "flex items-center justify-center aspect-square hover:bg-neutral-100 disabled:hover:bg-transparent disabled:text-neutral-500 rounded-full cursor-pointer disabled:cursor-default",
                isToday && "disabled:text-orange-500",
                disabledAfter && isEqual(d, disabledAfter) && "text-blue-500",
                isEqual(day, d) &&
                  "bg-orange-100 hover:bg-orange-100/90 text-orange-500",
              )}
              onClick={() => {
                setDay(d);
                if (!isSameMonth(d, firstDayOfMonth)) {
                  if (isBefore(d, firstDayOfMonth)) previousMonth();
                  else nextMonth();
                }
              }}
              disabled={isDisabled}
            >
              <time dateTime={d.toDateString()}>{format(d, "d")}</time>
            </button>
          );
        })}
      </div>
    </div>
  );
}
