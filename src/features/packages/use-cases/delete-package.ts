import { db } from "@/database";
import { packageTable } from "@/database/schema";
import { Package } from "@/database/types";
import { eq } from "drizzle-orm";

export async function deletePackage(id: Package["id"]): Promise<void> {
  try {
    await db.delete(packageTable).where(eq(packageTable.id, id));
  } catch (err) {
    throw new Error("Database error while deleting package.");
  }
}
