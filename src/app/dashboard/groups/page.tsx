import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Main } from "@/components/ui/main";
import { H1 } from "@/components/ui/headers";
import { getCurrentUser } from "@/features/auth/lib/session";
import { getActiveGroups } from "@/features/classes/groups/use-cases/get-groups";
import { GroupCard } from "@/features/classes/groups/components/group-card";
import { groupsSchema } from "@/features/classes/groups/lib/schemas";
export default async function GroupsPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  const groups = await getActiveGroups();
  console.log(groups);
  const { success, data } = groupsSchema.safeParse(groups);
  return (
    <Main>
      {user.isAdmin() && (
        <Button className="flex ml-auto w-fit" asChild>
          <Link href="/dashboard/groups/add">
            <Plus />
            Add group
          </Link>
        </Button>
      )}
      <section className="space-y-10">
        <div className="space-y-4">
          <H1>Nuestros grupos</H1>
          <p className="text-justify text-neutral-500">
            Nuestras grupales se dividen en dos categorias: cursos progresivos y
            clases abiertas. Ofrecemos cursos basicos para Salsa y Bachata y
            clases abiertas para Salsa. Cualquier duda o pregunta se puede
            comunicar al 7879999999.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {success && data.map((g) => <GroupCard key={g.id} group={g} />)}
        </div>
      </section>
    </Main>
  );
}
