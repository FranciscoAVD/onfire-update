import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { NewUser, User } from "@/database/types";

export async function addUser(data: NewUser): Promise<User["id"]> {
  try {
    const [{ id }] = await db
      .insert(usersTable)
      .values(data)
      .returning({ id: usersTable.id });
    return id;
  } catch (err) {
    throw new Error("Database error while adding new user.");
  }
}
