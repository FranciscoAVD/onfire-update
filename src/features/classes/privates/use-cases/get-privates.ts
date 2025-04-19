import { db } from "@/database";
import { privatesScheduleTable } from "@/database/schema";
import { Private, User } from "@/database/types";
import { eq, and } from "drizzle-orm";
import { DEFAULT_PRIVATE_STATUS } from "@/features/classes/privates/lib/constants";
import { Status } from "@/features/classes/privates/lib/types";

export async function getPrivatesByDate(date: string): Promise<Private[]> {
  try {
    return await db
      .select()
      .from(privatesScheduleTable)
      .where(eq(privatesScheduleTable.date, date));
  } catch (err) {
    throw new Error("Database error while querying privates by date.");
  }
}
/**
This function defaults to querying privates that are still "pending".
@returns An array of privates with a matching user id and status.
*/
export async function getPrivatesByUserAndStatus(
  userId: User["id"],
  status: Status = DEFAULT_PRIVATE_STATUS,
): Promise<Private[]> {
  try {
    return await db
      .select()
      .from(privatesScheduleTable)
      .where(
        and(
          eq(privatesScheduleTable.studentId, userId),
          eq(privatesScheduleTable.status, status),
        ),
      );
  } catch (err) {
    throw new Error("Database error while querying user privates.");
  }
}
