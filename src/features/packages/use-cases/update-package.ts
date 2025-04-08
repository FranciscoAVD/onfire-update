import { db } from "@/database";
import { packageTable } from "@/database/schema";
import { Package } from "@/database/types";
import { eq } from "drizzle-orm";

export async function updatePackageActivity(
  packageId: Package["id"],
  newStatus: boolean,
): Promise<void> {
  try {
    await db
      .update(packageTable)
      .set({ isActive: newStatus })
      .where(eq(packageTable.id, packageId));
  } catch (err) {
    throw new Error("Database error while update package isActive.");
  }
}
