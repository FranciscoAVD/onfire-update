import { H1 } from "@/components/ui/headers";
import { getCurrentUser } from "@/features/auth/lib/session";
import { Main } from "@/components/ui/main";
import {
  getActivePackages,
  getAllPackages,
} from "@/features/packages/use-cases/get-packages";
import PackageCard from "@/features/packages/components/package-card";
import { Package } from "@/database/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

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
        <Button className="flex ml-auto w-fit" asChild>
          <Link href="/dashboard/packages/add">
            <Plus />
            Add package
          </Link>
        </Button>
      )}
      <section className="space-y-10">
        <div className="text-center">
          <H1>Nuestros paquetes</H1>
          <p className="max-w-2xl mx-auto text-neutral-500">
            Cuando compres cualquiera de nuestros paquetes podras reservar
            clases privadas en cualquier ritmo que ofrezcamos. Cada paquete
            tiene una fecha de expiracion y por lo tanto la totalidad de las
            clases privadas tendran que programarse en o antes de la fecha de
            expiracion. Solo se puede tener un paquete activo a la vez.
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
