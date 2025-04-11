import { H1 } from "@/components/ui/headers";
import { Main } from "@/components/ui/main";
import { getCurrentUser } from "@/features/auth/lib/session";
import { AddPackageForm } from "@/features/packages/components/add-package-form";
import { routes } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AddPackagePage() {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin()) return null;

  return (
    <Main>
      <section className="space-y-10">
        <div>
          <Link
            href={routes.dashboard.packages.href}
            className="flex items-center gap-2 mb-3"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to packages
          </Link>
          <H1>Add a new package</H1>
          <p className="text-sm text-neutral-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            omnis earum officiis reiciendis molestias? Ea.
          </p>
        </div>
        <AddPackageForm className="max-w-xl" />
      </section>
    </Main>
  );
}
