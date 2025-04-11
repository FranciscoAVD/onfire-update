import { H1 } from "@/components/ui/headers";
import { Main } from "@/components/ui/main";
import { getCurrentUser } from "@/features/auth/lib/session";
import { AddGroupForm } from "@/features/classes/groups/components/add-group-form";
import { routes } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AddGroupPage() {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin()) return null;

  return (
    <Main>
      <section className="space-y-10">
        <div>
          <Link
            href={routes.dashboard.groups.href}
            className="flex items-center gap-2 mb-3"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to groups
          </Link>
          <H1>Add a new group</H1>
          <p className="text-sm text-neutral-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            omnis earum officiis reiciendis molestias? Ea.
          </p>
        </div>
        <AddGroupForm />
      </section>
    </Main>
  );
}
