import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { User } from "@/database/types";
import { eq, or } from "drizzle-orm";

export async function isUser(email: string): Promise<boolean> {
  try {
    const res = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return res[0] ? true : false;
  } catch (err) {
    throw new Error("Database error while verifying entity exists as a user.");
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const [res] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return res ?? null;
  } catch (err) {
    throw new Error("Database error while querying user by email.");
  }
}

export async function getAllStaff(): Promise<User[]> {
  try {
    return await db
      .select()
      .from(usersTable)
      .where(or(eq(usersTable.role, "staff"), eq(usersTable.role, "admin")));
  } catch (err) {
    throw new Error("Database error while querying staff.");
  }
}

export async function getUser(id: User["id"]):Promise<User | null>{
  try{
    const [res] = await db.select().from(usersTable).where(eq(usersTable.id, id));
    return res ?? null;
  }
  catch(err){
    throw new Error("Database error while querying user.")
  }
}
