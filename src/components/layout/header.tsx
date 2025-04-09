import { UserButton } from "@/features/users/components/user-button";
import { cn } from "@/lib/utils";

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn(`flex items-center ${className}`)}>
      <div className="flex items-center container mx-auto">
        <UserButton className="ml-auto" />
      </div>
    </header>
  );
}
