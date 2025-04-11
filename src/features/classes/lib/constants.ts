import { Times } from "@/features/classes/lib/types";

export const MINIMUM_PRIVATE_COST = 40;

export const weekdayTimeSlots: Times = new Map([
  [17, "5:00 PM"],
  [18, "6:00 PM"],
  [19, "7:00 PM"],
  [20, "8:00 PM"],
]);
export const weekendTimeSlots: Times = new Map([
  [9, "9:00 AM"],
  [10, "10:00 AM"],
  [11, "11:00 AM"],
  [12, "12:00 PM"],
  [13, "1:00 PM"],
  [14, "2:00 PM"],
  [15, "3:00 PM"],
  [16, "4:00 PM"],
]);
