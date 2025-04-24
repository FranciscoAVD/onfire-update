import { Main } from "@/components/ui/main";
import { getCurrentUser } from "@/features/auth/lib/session";
import { AddPrivateForm } from "@/features/classes/privates/components/add-private-form";
import { UserPackageCard } from "@/features/packages/components/user-package-card";
import { getActivePurchase } from "@/features/purchases/use-cases/get-purchase";
import Link from "next/link";
import { routes } from "@/lib/constants";
import { getPrivatesByUserAndStatus } from "@/features/classes/privates/use-cases/get-privates";
import { getDay, parseISO, startOfToday } from "date-fns";
import { PrivatesTable } from "@/features/classes/privates/components/privates-table";
import { getActiveGroups } from "@/features/classes/groups/use-cases/get-groups";
import { groupsSchema } from "@/features/classes/groups/lib/schemas";
import { TGroup } from "@/features/classes/groups/lib/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H1, H2 } from "@/components/ui/headers";
import { Clock } from "lucide-react";
import { weekGroupTimeSlots } from "@/features/classes/lib/constants";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  //get active user package
  const [purchase, privates, groups] = await Promise.all([
    getActivePurchase(user.getId()),
    getPrivatesByUserAndStatus(user.getId()),
    getActiveGroups(),
  ]);

  const { success, data } = groupsSchema.safeParse(groups);
  let groupsForToday: TGroup[] = [];
  const todayIdx = getDay(startOfToday());
  if (success) {
    groupsForToday = data.filter((g) => {
      let found = false;
      for (let i = 0; i < g.dayTime.length; i++) {
        if (g.dayTime[i].day === todayIdx) found = true;
      }
      return found;
    });
  }
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
      <section className="space-y-4">
        <H2>
          Events for <span className="text-orange-500">today</span>
        </H2>
        <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {groupsForToday.length > 0 &&
            groupsForToday.map((g) => (
              <Card key={g.id}>
                <CardHeader>
                  <CardTitle className="text-xl">{g.name}</CardTitle>
                  {g.dayTime
                    .filter((d) => d.day === todayIdx)
                    .map((d) => {
                      const start = weekGroupTimeSlots
                        .get(d.day)
                        ?.get(d.startTime);
                      const end = weekGroupTimeSlots.get(d.day)?.get(d.endTime);
                      return (
                        <CardDescription
                          key={`${g.id}${d.day}`}
                          className="flex items-center gap-2"
                        >
                          <Clock className="size-4" aria-hidden /> {start} -{" "}
                          {end}
                        </CardDescription>
                      );
                    })}
                  <CardDescription>${g.cost / 100}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          {groupsForToday.length === 0 && (
            <p className="col-span-full">No events for today.</p>
          )}
        </div>
      </section>
    </Main>
  );
}

function NoPurchase() {
  return (
    <div className="col-span-full py-20">
      <p className="text-center text-lg">
        No active package. Buy a{" "}
        <Link
          href={routes.dashboard.packages.href}
          className="underline underline-offset-1"
        >
          package
        </Link>{" "}
        to get started.
      </p>
    </div>
  );
}
