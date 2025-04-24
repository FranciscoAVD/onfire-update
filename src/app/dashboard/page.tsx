import { Main } from "@/components/ui/main";
import { getCurrentUser } from "@/features/auth/lib/session";
import { AddPrivateForm } from "@/features/classes/privates/components/add-private-form";
import { UserPackageCard } from "@/features/packages/components/user-package-card";
import { getActivePurchase } from "@/features/purchases/use-cases/get-purchase";
import Link from "next/link";
import { routes } from "@/lib/constants";
import { getPrivatesByUserAndStatus } from "@/features/classes/privates/use-cases/get-privates";
import { parseISO } from "date-fns";
import { PrivatesTable } from "@/features/classes/privates/components/privates-table";

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
