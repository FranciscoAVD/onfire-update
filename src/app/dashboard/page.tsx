import { Main } from "@/components/ui/main";
import { getCurrentUser } from "@/features/auth/lib/session";
import { AddPrivateForm } from "@/features/classes/privates/components/add-private-form";
import { UserPackageCard } from "@/features/packages/components/user-package-card";
import { getActivePurchase } from "@/features/purchases/use-cases/get-purchase";
import Link from "next/link";
import { routes } from "@/lib/constants";
import { getStudentPrivatesByStatus } from "@/features/classes/privates/use-cases/get-privates";
import { getDay, parseISO, startOfToday } from "date-fns";
import { PrivatesTable } from "@/features/classes/privates/components/privates-table";
import { getActiveGroups } from "@/features/classes/groups/use-cases/get-groups";
import { TGroup } from "@/features/classes/groups/lib/types";
import { H1 } from "@/components/ui/headers";
import { getValidDate } from "@/features/classes/lib/utils";
import { UpcomingGroupsSection } from "@/features/classes/groups/components/upcoming-groups-section";
export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [purchase, privates, groups] = await Promise.all([
    getActivePurchase(user.getId()),
    getStudentPrivatesByStatus(user.getId()),
    getActiveGroups(),
  ]);

  return (
    <Main className="space-y-6">
      <H1>Home</H1>
      <section className="">
        <PrivatesTable privates={privates} />
      </section>
      <section className="grid grid-cols-2 gap-6">
        {purchase && (
          <>
            <UserPackageCard p={purchase} />
            <AddPrivateForm
              expirationDate={parseISO(purchase.expirationDate)}
            />
          </>
        )}
        {!purchase && <NoPurchase />}
      </section>
      <UpcomingGroupsSection groups={groups} />
    </Main>
  );
}

function NoPurchase() {
  return (
    <div className="col-span-full py-20">
      <p className="text-center text-lg">
        Buy a{" "}
        <Link
          href={routes.dashboard.packages.href}
          className="underline underline-offset-1"
        >
          package
        </Link>{" "}
        to get started scheduling your classes.
      </p>
    </div>
  );
}
