import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @returns The date exactly one week from the current datetime.
 */
export function getOneWeekFromNow(): Date {
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}

/**
 * @param data expects to be in the shape of FormData
 */
export function formDataToObject(data: FormData): Record<string, string> {
  const formObject: Record<string, string> = {};
  data.forEach((value, key) => {
    formObject[key] = value.toString();
  });
  return formObject;
}

/**
 * 
 * @param input A string of any kind.
 * @returns A string that only includes digits.
 */
export function cleanPhoneNumber(input: string): string {
  return input.replace(/\D/g, "");
}

/**
 * 
 * @param input A string of any kind.
 * @returns A phone number in the format (XXX) XXX - XXXX if there are enough digits in the string.
 */
export function formatPhoneNumber(input: string): string {
  const digits = cleanPhoneNumber(input);

  let formatted = "";

  if (digits.length > 0) {
    formatted += `${digits.slice(0, 3)}`;
  }
  if (digits.length >= 4) {
    formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}`;
  }
  if (digits.length >= 7) {
    formatted += ` - ${digits.slice(6, 10)}`;
  }

  return formatted;
}

/**
 * 
 * @param input a string of any kind
 * @returns true if the string has a length of 10 and can be made an integer.
 */
export function isValidPhoneNumber(input: string): boolean {
  const cleaned = cleanPhoneNumber(input);

  return Number.isInteger(+cleaned) && cleaned.length === 10;
}