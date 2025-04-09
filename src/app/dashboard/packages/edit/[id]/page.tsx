import Link from "next/link";
import { Main } from "@/components/ui/main";
import { getCurrentUser } from "@/features/auth/lib/session";
import { getPackage } from "@/features/packages/use-cases/get-packages";
import { ArrowLeft, Trash2 } from "lucide-react";
import { H1, H2 } from "@/components/ui/headers";
import { routes } from "@/lib/constants";
import { EditPackageForm } from "@/features/packages/components/edit-package-form";
import { Button } from "@/components/ui/button";

export default async function EditPackagePage(props: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin()) return null;
  const { id } = await props.params;
  const p = await getPackage(+id);
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
          <H1>Edit an existing package</H1>
          <p className="text-sm text-neutral-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            omnis earum officiis reiciendis molestias? Ea.
          </p>
        </div>
        {p && (
          <>
            <EditPackageForm p={p} className="max-w-xl" />
            <Button variant={"destructive"}>
              <Trash2 aria-hidden />
              Delete package
            </Button>
          </>
        )}
      </section>
    </Main>
  );
}
