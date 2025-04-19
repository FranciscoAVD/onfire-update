"use server";

import { getCurrentUser } from "@/features/auth/lib/session";
import { TResponse } from "@/lib/types";
import { formatDateToDefault, formDataToObject } from "@/lib/utils";
import { addPrivateSchema } from "@/features/classes/privates/lib/schemas";
import { getActivePurchase } from "@/features/purchases/use-cases/get-purchase";
import { getPrivatesByDate } from "@/features/classes/privates/use-cases/get-privates";
import {
  DEFAULT_PRIVATE_STATUS,
  MAX_PRIVATES_PER_TIME_SLOT,
} from "@/features/classes/privates/lib/constants";
import { addPrivate } from "@/features/classes/privates/use-cases/add-private";
import { getYear, getMonth } from "date-fns";
import { updatePrivatesFromPurchase } from "@/features/purchases/use-cases/update-purchase";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/constants";
interface AddPrivateResponse extends TResponse {
  errors?: {
    date?: string[] | undefined;
    rhythm?: string[] | undefined;
    time?: string[] | undefined;
  };
  previous?: {
    time: number;
  };
}

export async function addPrivateAction(
  previousState: AddPrivateResponse,
  unverified: FormData,
): Promise<AddPrivateResponse> {
  console.log("Previous state: ",previousState);
  const user = await getCurrentUser();

  if (!user) return { success: false };
  const object = formDataToObject(unverified);
  const { success, data, error } = addPrivateSchema.safeParse(object);

  if (!success) return { success: false, errors: error.flatten().fieldErrors };
  console.log("Current submission: ", data);
  //Does the active package allow for another class
  const purchase = await getActivePurchase(user.getId());
  if (!purchase || purchase.privatesLeft === 0) return { success: false };

  //Is there availability for the date and time
  const privates = await getPrivatesByDate(formatDateToDefault(data.date));
  const privatesAtTimeSlot = privates.filter((p) => p.timeSlot === data.time);

  if (privatesAtTimeSlot.length > MAX_PRIVATES_PER_TIME_SLOT)
    return {
      success: false,
      errors: { time: ["No privates available for this time."] },
      previous: previousState.previous ?? { time: data.time },
    };

  //Does the user have a private for the date and time
  const userPrivatesAtTimeSlot = privatesAtTimeSlot.filter(
    (p) => p.studentId === user.getId(),
  );
  if (userPrivatesAtTimeSlot.length > 0)
    return {
      success: false,
      errors: {
        time: [`You already have a private scheduled for ${data.time}.`],
      },
      previous: previousState.previous ?? { time: data.time },
    };

  //Add private to schedule and subtract private from user purchase
  await addPrivate({
    studentId: user.getId(),
    studentName: user.getName(),
    packagePurchasedId: purchase.id,
    date: formatDateToDefault(data.date),
    timeSlot: data.time,
    status: DEFAULT_PRIVATE_STATUS,
    rhythm: data.rhythm,
    scheduleMonth: getMonth(data.date),
    scheduleYear: getYear(data.date),
  });
  await updatePrivatesFromPurchase(purchase.id, purchase.privatesLeft - 1);
  revalidatePath(routes.dashboard.index.href, "page");
  return {
    success: true,
    previous: previousState.previous ?? { time: data.time },
  };
}
