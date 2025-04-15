import Link from "next/link";
import { Main } from "@/components/ui/main";
import { getCurrentUser } from "@/features/auth/lib/session";
import { getPackage } from "@/features/packages/use-cases/get-packages";
import { ArrowLeft, Trash2 } from "lucide-react";
import { H1 } from "@/components/ui/headers";
import { routes } from "@/lib/constants";
import { EditPackageForms } from "@/features/packages/components/edit-package-forms";
import { Button } from "@/components/ui/button";
import { DeletePackageForm } from "@/features/packages/components/delete-package-form";

export default async function EditPackagePage(props: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin()) return null;
  const { id } = await props.params;
  const p = await getPackage(+id);
  return (
    <Main>
      <section>
        <Link
          href={routes.dashboard.packages.href}
          className="flex items-center gap-2 mb-3"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to packages
        </Link>
        <H1>Edit package</H1>
        <p className="text-sm text-neutral-500">
          Altering the cost of a package might affect the accuracy of the
          analysis when creating visuals for analytics. It is recommended to
          create a new package for special events or seasons.
        </p>
      </section>
      {p && <EditPackageForms p={p} />}
      {p && <DeletePackageForm id={p.id} name={p.packageName} />}
    </Main>
  );
}
