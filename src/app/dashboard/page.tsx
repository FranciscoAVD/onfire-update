import { Main } from "@/components/ui/main";
import { getCurrentUser } from "@/features/auth/lib/session";
import { UserPackageCard } from "@/features/packages/components/user-package-card";
import { getActivePurchase } from "@/features/purchases/use-cases/get-purchase";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  //get active user package
  const purchase = await getActivePurchase(user.getId());

  return (
    <Main>
      <section className="grid grid-cols-2 gap-6">
        {purchase && <UserPackageCard p={purchase} />}
      </section>
    </Main>
  );
}
