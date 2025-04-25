import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/lib/session";
import { addStaffToPrivateSchema } from "@/features/classes/privates/lib/schemas";
import { getUser } from "@/features/users/use-cases/get-user";
import {
  getPrivate,
  getPrivatesByDate,
} from "@/features/classes/privates/use-cases/get-privates";
import { updatePrivateWithStaff } from "@/features/classes/privates/use-cases/update-private";

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
        status: 401, //Unauthenticated
      },
    );
  }
  if (!user.isAdmin()) {
    return NextResponse.json(
      {
        success: false,
        errors: undefined,
        message: "Insufficient permissions.",
      },
      {
        status: 403, //Unauthorized
      },
    );
  }
  const body = await req.json();
  const { success, data, error } = addStaffToPrivateSchema.safeParse(body);
  if (!success) {
    return NextResponse.json(
      {
        success: false,
        errors: error.flatten().fieldErrors,
        message: undefined,
      },
      {
        status: 422, //Validation failed
      },
    );
  }
  const staff = await getUser(data.staffId);
  if (!staff || staff.role === "student") {
    return NextResponse.json(
      {
        success: false,
        errors: undefined,
        message: "Cannot assign private to non-staff.",
      },
      {
        status: 422,
      },
    );
  }
  const p = await getPrivate(data.privateId);
  if (!p) {
    return NextResponse.json(
      {
        success: false,
        errors: undefined,
        message: "Private does not exist",
      },
      {
        status: 422,
      },
    );
  }

  //does staff member have privates for the date and time?
  const privatesForTheDate = await getPrivatesByDate(data.date);
  const privatesAtTimeSlot = privatesForTheDate.filter(
    (p) => p.timeSlot === data.time && p.staffId === data.staffId,
  );

  if (privatesAtTimeSlot.length !== 0) {
    return NextResponse.json(
      {
        success: false,
        errors: {
          staff: [
            `${staff.firstName.toUpperCase()} already has a private for this date and time.`,
          ],
        },
        message: undefined,
      },
      {
        status: 423, //Resource locked
      },
    );
  }

  //update private with staff information
  await updatePrivateWithStaff(p.id, staff.id, staff.firstName);
  return NextResponse.json(
    {
      success: true,
      errors: undefined,
      message: undefined,
    },
    {
      status: 200, //Success
    },
  );
}
