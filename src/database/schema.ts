import { sql } from "drizzle-orm";
import {
  jsonb,
  integer,
  pgTable,
  varchar,
  date,
  index,
  uniqueIndex,
  boolean,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean("email_verified").notNull().default(false),
    password: text("password").notNull(),
    //Need to add country code for phone number.
    phone: varchar("phone_number", { length: 10 }).notNull(),
    role: varchar("role", { length: 7 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("user_email_idx").on(table.email),
    index("user_staff_idx")
      .on(table.role)
      .where(sql`${table.role} = 'staff'`),
  ]
);

export const packageTable = pgTable("packages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  packageName: varchar("package_name", { length: 50 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  numberOfPrivates: integer("number_of_privates").notNull(),
  cost: integer("cost").notNull(), //cents
  discount: integer("discount").notNull(),
  daysValid: integer("days_valid").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const packagesPurchasedTable = pgTable(
  "packages_purchased",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    studentId: integer("student_id")
      .references(() => usersTable.id)
      .notNull(),
    packageId: integer("package_id")
      .references(() => packageTable.id)
      .notNull(),
    privatesLeft: integer("privates_left").notNull(),
    purchaseDate: date("purchase_date").notNull(),
    expirationDate: date("expiration_date").notNull(),
    //for analytics
    purchaseYear: integer("purchase_year").notNull(),
    purchaseMonth: integer("purchase_month").notNull(),
    isActive: boolean("is_active").notNull().default(true),
  },
  (table) => [
    index("purchase_student_idx").on(table.studentId),
    index("package_is_active_idx")
      .on(table.isActive)
      .where(sql`${table.isActive} = TRUE`),
    index("package_month_year_idx").on(table.purchaseYear, table.purchaseMonth),
  ]
);

export const privatesScheduleTable = pgTable(
  "privates_schedule",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    packagePurchasedId: integer("package_purchased_id")
      .references(() => packagesPurchasedTable.id)
      .notNull(),
    studentId: integer("student_id")
      .references(() => usersTable.id)
      .notNull(),
    studentName: text("student_name").notNull(),
    rhythm: varchar("rhythm", { length: 11 }).notNull(),
    staffId: integer("staff_id").references(() => usersTable.id),
    staffName: text("staff_name"),
    date: date("date").notNull(),
    //for analytics
    scheduleYear: integer("schedule_year").notNull(),
    scheduleMonth: integer("schedule_month").notNull(),
    timeSlot: integer("time_slot").notNull(),
    status: varchar("status", { length: 10 }).notNull(),
  },
  (table) => [
    index("privates_student_idx").on(table.studentId),
    index("privates_staff_idx").on(table.staffId),
    index("privates_date_idx").on(table.date),
    index("schedule_month_year_idx").on(
      table.scheduleYear,
      table.scheduleMonth
    ),
  ]
);

export const groupTable = pgTable("groups", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", {length: 8}).notNull(),
  rhythm: varchar("rhythm", { length: 50 }).notNull(),
  style: varchar("style", { length: 50 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  cost: integer("cost").notNull(),
  dayTime: jsonb("day_time").notNull(),
  capacity: integer("capacity"),
  isActive: boolean("is_active").notNull().default(true),
});
