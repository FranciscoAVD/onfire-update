import {
    usersTable,
    packageTable,
    groupTable,
    packagesPurchasedTable,
    privatesScheduleTable,
} from "@/database/schema";

//Select
type User = typeof usersTable.$inferSelect;
type Package = typeof packageTable.$inferSelect;
type Group = typeof groupTable.$inferSelect;
type Private = typeof privatesScheduleTable.$inferSelect;
type PackagePurchased = typeof packagesPurchasedTable.$inferSelect;

//Insert
type NewUser = typeof usersTable.$inferInsert;
type NewPackage = typeof packageTable.$inferInsert;
type NewGroup = typeof groupTable.$inferInsert;
type NewPrivate = typeof privatesScheduleTable.$inferInsert;
type NewPackagePurchased = typeof packagesPurchasedTable.$inferInsert;

export type {
    User,
    NewUser,
    Package,
    NewPackage,
    Group, 
    NewGroup,
    Private,
    NewPrivate,
    PackagePurchased,
    NewPackagePurchased,
}