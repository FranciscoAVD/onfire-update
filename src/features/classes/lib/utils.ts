import {
  addDays,
  getDay,
  startOfToday,
  isEqual,
  parseISO,
  isBefore,
} from "date-fns";
import { DISABLED_DAYS } from "@/features/classes/lib/constants";
import { Private } from "@/database/types";

/**
The function is meant to prevent initializing dates to today or dates that are
defined as disabled in the DISABLED_DAYS constant.
@param d - A Date object
@returns an object with the valid Date object and its index (0-6)
*/
export function getValidDate(d: Date): { day: Date; idx: number } {
  const today = startOfToday();
  const dayIdx = getDay(d);
  const nextDay = addDays(d, 1);

  if (isEqual(today, d) || DISABLED_DAYS.includes(dayIdx))
    return getValidDate(nextDay);

  return { day: d, idx: dayIdx };
}

export function sortByDateAndTime(privates: Private[]): Private[] {
  return privates.sort((a, b) => {
    const date1 = parseISO(a.date);
    const date2 = parseISO(b.date);
    if (isBefore(date1, date2)) {
      return -1;
    }
    if (isEqual(date1, date2)) {
      if (a.timeSlot <= b.timeSlot) return -1;
      return 1;
    }
    return 1;
  });
}
