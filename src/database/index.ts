import { env } from "@/env";
import { drizzle } from "drizzle-orm/node-postgres";

const database_connection = drizzle(env.DATABASE_URL);

export { database_connection as db };