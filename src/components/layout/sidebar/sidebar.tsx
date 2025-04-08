import { getCurrentUser } from "@/features/auth/lib/session";
import { cn } from "@/lib/utils";
import { SidebarNav } from "./sidebar-nav";

export async function Sidebar({ className }: { className?: string }) {
  const user = await getCurrentUser();
  return (
    <aside className={cn(`py-4 px-2 ${className}`)}>
        {user && <SidebarNav role={user.getRole()}/>}
    </aside>
  );
}
