import { H1 } from "@/components/ui/headers";
import { getCurrentUser } from "@/features/auth/lib/session";
import { Main } from "@/components/ui/main";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  getActivePackages,
  getAllPackages,
} from "@/features/packages/use-cases/get-packages";
import PackageCard from "@/features/packages/components/package-card";
import { Package } from "@/database/types";

export default async function PackagesPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  let packages: Package[];
  if (user.isAdmin()) {
    packages = await getAllPackages();
  } else {
    packages = await getActivePackages();
  }
  return (
    <Main>
      {user.isAdmin() && (
        <Button size="icon" className="flex ml-auto" asChild>
          <Link href="/dashboard/packages/create">
            <Plus />
            <span className="sr-only">Add package</span>
          </Link>
        </Button>
      )}
      <section className="space-y-10">
        <div>
          <H1>Nuestros paquetes</H1>
          <p className="text-sm text-neutral-500">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
            dolorem, libero obcaecati voluptate tempora labore quam maxime
            accusantium architecto dignissimos.
          </p>
        </div>
        <div role="grid" className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {packages.map((p) => (
            <PackageCard
              key={p.id}
              p={p}
              isAdmin={user.isAdmin()}
              isActive={p.isActive}
            />
          ))}
        </div>
      </section>
    </Main>
  );
}
