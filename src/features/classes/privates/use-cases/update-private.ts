import { db } from "@/database";
import { privatesScheduleTable } from "@/database/schema";
import { Private, User } from "@/database/types";
import { eq } from "drizzle-orm";

export async function updatePrivateWithStaff(id:Private["id"], staffId: User["id"], staffName: string):Promise<void>{

  try{
    await db.update(privatesScheduleTable).set({
      staffId: staffId,
      staffName: staffName
    }).where(eq(privatesScheduleTable.id, id));
  }
  catch(err){
    throw new Error("Database error while updating private with staff.")
  }
}
