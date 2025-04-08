import { cn } from "@/lib/utils";

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn(`flex items-center ${className}`)}>
      <div className="container mx-auto">
        header
      </div>
    </header>
  );
}
