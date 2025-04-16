import { db } from "@/database";
import { groupTable } from "@/database/schema";
import { Group } from "@/database/types";
import { eq } from "drizzle-orm";

export async function getActiveGroups(): Promise<Group[]> {
  try {
    return await db
      .select()
      .from(groupTable)
      .where(eq(groupTable.isActive, true))
      .orderBy(groupTable.id);
  } catch (err) {
    throw new Error("Database error while querying active groups.");
  }
}

export async function getAllGroups(): Promise<Group[]> {
  try {
    return await db.select().from(groupTable);
  } catch (err) {
    throw new Error("Database error while querying all groups.");
  }
}
