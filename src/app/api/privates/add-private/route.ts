import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/lib/session";
import { addPrivateSchema } from "@/features/classes/privates/lib/schemas";
import { getActivePurchase } from "@/features/purchases/use-cases/get-purchase";
import { getPrivatesByDate } from "@/features/classes/privates/use-cases/get-privates";
import { addPrivate } from "@/features/classes/privates/use-cases/add-private";
import { formatDateToDefault } from "@/lib/utils";
import {
  DEFAULT_PRIVATE_STATUS,
  MAX_PRIVATES_PER_TIME_SLOT,
} from "@/features/classes/privates/lib/constants";
import { format, getDay, getMonth, getYear } from "date-fns";
import { weekPrivateTimeSlots } from "@/features/classes/lib/constants";
import { updatePrivatesLeft } from "@/features/purchases/use-cases/update-purchase";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      {
        success: false,
        errors: undefined,
        message: "Unauthenticated user.",
      },
      {
        status: 401,
      },
    );
  }

  const body = await req.json();
  //validate body
  const { success, data, error } = addPrivateSchema.safeParse(body);
  if (!success)
    return NextResponse.json(
      {
        success: false,
        errors: error.flatten().fieldErrors,
        message: undefined,
      },
      {
        status: 422, //Failed validation
      },
    );

  const purchase = await getActivePurchase(user.getId());
  if (!purchase || purchase.privatesLeft === 0)
    return NextResponse.json(
      {
        success: false,
        errors: undefined,
        message: "No privates left in package.",
      },
      {
        status: 403, //Unauthorized or forbidden
      },
    );

  const privates = await getPrivatesByDate(formatDateToDefault(data.date));
  const privatesAtTimeSlot = privates.filter((p) => p.timeSlot === data.time);
  const timeSlot = weekPrivateTimeSlots.get(getDay(data.date))?.get(data.time);

  if (privatesAtTimeSlot.length > MAX_PRIVATES_PER_TIME_SLOT) {
    return NextResponse.json(
      {
        success: false,
        errors: {
          time: [
            `No space left for ${format(data.date, "EEEE")} at ${timeSlot}`,
          ],
        },
        message: undefined,
      },
      {
        status: 423, //Resource locked
      },
    );
  }

  const userPrivatesAtTimeSlot = privatesAtTimeSlot.filter(
    (p) => p.studentId === user.getId(),
  );
  if (userPrivatesAtTimeSlot.length !== 0)
    return NextResponse.json(
      {
        success: false,
        errors: {
          time: [
            `Private already scheduled for ${format(data.date, "EEEE")} at ${timeSlot}`,
          ],
        },
        message: undefined,
      },
      {
        status: 409, //Conflict
      },
    );

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
  await updatePrivatesLeft(purchase.id, purchase.privatesLeft - 1);

  return NextResponse.json(
    {
      success: true,
      errors: undefined,
      message: undefined,
    },
    {
      status: 201, //Resource created
    },
  );
}
