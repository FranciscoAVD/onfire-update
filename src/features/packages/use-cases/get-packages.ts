import { db } from "@/database";
import { packageTable } from "@/database/schema";
import { Package } from "@/database/types";
import { eq } from "drizzle-orm";

export async function getActivePackages(): Promise<Package[]> {
  try {
    return await db
      .select()
      .from(packageTable)
      .where(eq(packageTable.isActive, true))
      .orderBy(packageTable.id);
  } catch (err) {
    throw new Error("Database error while querying packages.");
  }
}

export async function getAllPackages(): Promise<Package[]> {
  try {
    return await db.select().from(packageTable).orderBy(packageTable.id);
  } catch (err) {
    throw new Error("Database error while querying packages.");
  }
}

export async function getPackage(packageId: Package["id"]): Promise<Package | null> {
  try {
    const [res] = await db
      .select()
      .from(packageTable)
      .where(eq(packageTable.id, packageId));
    return res ?? null;
  } catch (err) {
    throw new Error("Database error while querying package.");
  }
}
