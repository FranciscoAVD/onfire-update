import { Rhythm, Style, Times } from "@/features/classes/lib/types";

export const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const DISABLED_DAYS = [0,5]; //Sunday & Friday
export const salsaStyles: Style[] = ["On 1", "On 2", "On 1/On 2"];
export const otherStyles: Style[] = ["Tradicional"];
export const rhythms: Rhythm[] = ["Salsa","Bachata","Cha-Cha-Cha"];

const weekdayGroupTimeSlots: Times = new Map([
  [1700, "5:00 PM"],
  [1730, "5:30 PM"],
  [1800, "6:00 PM"],
  [1830, "6:30 PM"],
  [1900, "7:00 PM"],
  [1930, "7:30 PM"],
  [2000, "8:00 PM"],
  [2030, "8:30 PM"],
  [2100, "9:00 PM"],
  [2130, "9:30 PM"],
]);

const weekendGroupTimeSlots: Times = new Map([
  [1300, "1:00 PM"],
  [1330, "1:30 PM"],
  [1400, "2:00 PM"],
  [1430, "2:30 PM"],
  [1500, "3:00 PM"],
  [1530, "3:30 PM"],
  [1600, "4:00 PM"],
  [1630, "4:30 PM"],
  [1700, "5:00 PM"],
]);

export const weekdayPrivateTimeSlots: Times = new Map([
  [1700, "5:00 PM"],
  [1800, "6:00 PM"],
  [1900, "7:00 PM"],
  [2000, "8:00 PM"],
]);

export const weekendPrivateTimeSlots: Times = new Map([
  [1000, "10:00 AM"],
  [1100, "11:00 AM"],
  [1200, "12:00 PM"],
  [1300, "1:00 PM"],
  [1400, "2:00 PM"],
  [1500, "3:00 PM"],
  [1600, "4:00 PM"],
]);

export const weekGroupTimeSlots: Map<number,Times> = new Map([
  [1, weekdayGroupTimeSlots],
  [2, weekdayGroupTimeSlots],
  [3, weekdayGroupTimeSlots],
  [4, weekdayGroupTimeSlots],
  [6, weekendGroupTimeSlots],
]);
export const weekPrivateTimeSlots: Map<number,Times> = new Map([
  [1, weekdayPrivateTimeSlots],
  [2, weekdayPrivateTimeSlots],
  [3, weekdayPrivateTimeSlots],
  [4, weekdayPrivateTimeSlots],
  [6, weekendPrivateTimeSlots],
]);
