import { UserButton } from "@/features/users/components/user-button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn(`flex items-center ${className}`)}>
      <div className="flex items-center container mx-auto">
        <Link href="/" className="text-xl font-bold">
          On Fire Dance Studio
        </Link>{" "}
        <UserButton className="ml-auto" />
      </div>
    </header>
  );
}
