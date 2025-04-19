import { Main } from "@/components/ui/main";
import { getCurrentUser } from "@/features/auth/lib/session";
import { AddPrivateForm } from "@/features/classes/privates/components/add-private-form";
import { UserPackageCard } from "@/features/packages/components/user-package-card";
import { getActivePurchase } from "@/features/purchases/use-cases/get-purchase";
import Link from "next/link";
import { routes } from "@/lib/constants";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { getPrivatesByUserAndStatus } from "@/features/classes/privates/use-cases/get-privates";
import { format, getDay, parseISO } from "date-fns";
import { weekPrivateTimeSlots } from "@/features/classes/lib/constants";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  //get active user package
  const [purchase, privates] = await Promise.all([
    getActivePurchase(user.getId()),
    getPrivatesByUserAndStatus(user.getId()),
  ]);

  return (
    <Main>
      <section className="py-6">
        <Card className="py-0">
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Rhythm</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {privates.length > 0 &&
                  privates.map((p) => {
                    const date = parseISO(p.date);
                    return (
                      <TableRow key={p.id}>
                        <TableCell>{format(date, "EEEE, MMMM d")}</TableCell>
                        <TableCell>
                          {weekPrivateTimeSlots
                            .get(getDay(date))
                            ?.get(p.timeSlot)}
                        </TableCell>
                        <TableCell>{p.rhythm}</TableCell>
                        <TableCell>
                          {p.staffName ? p.staffName : "Undecided"}
                        </TableCell>
                        <TableCell>
                          <Button variant="destructive" size="icon">
                            <Trash2 aria-hidden />
                            <span className="sr-only">Unschedule private</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {privates.length === 0 && (
                  <TableRow>
                    <TableCell>No privates scheduled.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
      <section className="grid grid-cols-2 gap-6">
        {purchase && (
          <>
            <UserPackageCard p={purchase} />
            <AddPrivateForm expirationDate={purchase.expirationDate} />
          </>
        )}
        {!purchase && (
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
        )}
      </section>
    </Main>
  );
}
