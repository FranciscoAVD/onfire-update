import {
  weekdayTimeSlots,
  weekendTimeSlots,
} from "@/features/classes/lib/constants";
import { Times } from "@/features/classes/lib/types";

/**
@param dayIdx - the idx of the day of the week ranging from 0 - 6 (Sun - Sat).
@returns a map of the time slots for the day.
*/
export function getDayTimeSlots(dayIdx: number): Times | null {
  if (dayIdx < 0 || dayIdx > 6) return null;
  if (dayIdx === 0 || dayIdx === 6) return weekendTimeSlots;
  return weekdayTimeSlots;
}
