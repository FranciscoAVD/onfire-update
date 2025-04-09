import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { deleteSession, getCurrentUser } from "@/features/auth/lib/session";
import { routes } from "@/lib/constants";
import { LogOut, Settings, User } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function UserButton({ className }: { className?: string }) {
  const user = await getCurrentUser();

  if (!user) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" className={`rounded-full ${className}`}>
          <User aria-hidden /> <span className="sr-only">User options</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[250px] p-1 pt-2">
        <div className="px-4 mb-2 leading-4">
          <p className=" font-semibold capitalize">{user.getName()}</p>
          <span className="text-sm text-neutral-500">{user.getEmail()}</span>
        </div>
        <div className="flex flex-col">
          <Button
            variant={"ghost"}
            className="justify-start font-normal"
            asChild
          >
            <Link href={routes.dashboard.index.href}>
              <Settings aria-hidden />
              Manage Account
            </Link>
          </Button>
          <form
            action={async () => {
              "use server";
              await deleteSession();
              redirect(routes.login.href);
            }}
          >
            <Button
              type="submit"
              variant={"ghost"}
              className="w-full justify-start font-normal"
            >
              <LogOut aria-hidden /> Log out
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
