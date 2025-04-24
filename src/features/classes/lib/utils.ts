import { addDays, getDay, startOfToday, isEqual } from "date-fns";
import { DISABLED_DAYS } from "./constants";

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

  if (isEqual(today,d) || DISABLED_DAYS.includes(dayIdx)) return getValidDate(nextDay);

  return { day: d, idx: dayIdx };
}
