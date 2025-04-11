import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Main } from "@/components/ui/main";
import { getCurrentUser } from "@/features/auth/lib/session";

export default async function GroupsPage() {
  const user = await getCurrentUser();
  if (!user) return null;
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
      Groups Page
    </Main>
  );
}
