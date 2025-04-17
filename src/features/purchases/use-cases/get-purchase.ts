import { db } from "@/database";
import { packagesPurchasedTable } from "@/database/schema";
import { PackagePurchased, User } from "@/database/types";
import { eq, and } from "drizzle-orm";

export async function getActivePurchase(
  userId: User["id"],
): Promise<PackagePurchased | null> {
  try {
    const [res] = await db
      .select()
      .from(packagesPurchasedTable)
      .where(
        and(
          eq(packagesPurchasedTable.studentId, userId),
          eq(packagesPurchasedTable.isActive, true),
        ),
      );
    return res ?? null;
  } catch (err) {
    throw new Error("Database error while querying active user package.");
  }
}
