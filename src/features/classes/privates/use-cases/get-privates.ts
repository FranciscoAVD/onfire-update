import { db } from "@/database";
import { privatesScheduleTable } from "@/database/schema";
import { Private, User } from "@/database/types";
import { eq, and, isNull, isNotNull } from "drizzle-orm";
import { DEFAULT_PRIVATE_STATUS } from "@/features/classes/privates/lib/constants";
import { Status } from "@/features/classes/privates/lib/types";
import { sortByDateAndTime } from "@/features/classes/lib/utils";

export async function getPrivate(id: Private["id"]): Promise<Private | null> {
  try {
    const [res] = await db
      .select()
      .from(privatesScheduleTable)
      .where(eq(privatesScheduleTable.id, id));
    return res ?? null;
  } catch (err) {
    throw new Error("Database error while querying private.");
  }
}
export async function getPrivatesByDate(date: string): Promise<Private[]> {
  try {
    const res = await db
      .select()
      .from(privatesScheduleTable)
      .where(eq(privatesScheduleTable.date, date));
      return sortByDateAndTime(res);
  } catch (err) {
    throw new Error("Database error while querying privates by date.");
  }
}
/**
This function defaults to querying privates that are still "pending".
@returns An array of privates with a matching user id and status.
*/
export async function getStudentPrivatesByStatus(
  userId: User["id"],
  status: Status = DEFAULT_PRIVATE_STATUS,
): Promise<Private[]> {
  try {
    const res = await db
      .select()
      .from(privatesScheduleTable)
      .where(
        and(
          eq(privatesScheduleTable.studentId, userId),
          eq(privatesScheduleTable.status, status),
        ),
      );
    return sortByDateAndTime(res);
  } catch (err) {
    throw new Error("Database error while querying user privates.");
  }
}
export async function getStaffPrivatesByStatus(
  staffId: User["id"],
  status: Status = DEFAULT_PRIVATE_STATUS,
): Promise<Private[]> {
  try {
    const res = await db
      .select()
      .from(privatesScheduleTable)
      .where(
        and(
          eq(privatesScheduleTable.staffId, staffId),
          eq(privatesScheduleTable.status, status),
        ),
      );
    return sortByDateAndTime(res);
  } catch (err) {
    throw new Error(
      `Database error while querying staff privates with status:${status}`,
    );
  }
}

export async function getPrivatesWithoutStaff(): Promise<Private[]> {
  try {
    const res = await db
      .select()
      .from(privatesScheduleTable)
      .where(isNull(privatesScheduleTable.staffId));
    return sortByDateAndTime(res);
  } catch (err) {
    throw new Error(
      "Database error while querying privates without assigned staff.",
    );
  }
}

export async function getAllStaffPrivatesByStatus(
  status: Status = DEFAULT_PRIVATE_STATUS,
): Promise<Private[]> {
  try {
    const res = await db
      .select()
      .from(privatesScheduleTable)
      .where(
        and(
          eq(privatesScheduleTable.status, status),
          isNotNull(privatesScheduleTable.staffId),
        ),
      );
    return sortByDateAndTime(res);
  } catch (err) {
    throw new Error(
      `Database error while querying all staff privates with status:${status}`,
    );
  }
}
