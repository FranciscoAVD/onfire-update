import { db } from "@/database";
import { groupTable } from "@/database/schema";
import { NewGroup } from "@/database/types";

export async function addGroup(g: NewGroup): Promise<void> {
  try {
    await db.insert(groupTable).values(g);
  } catch (err) {
    throw new Error("Database error while adding new group.");
  }
}
