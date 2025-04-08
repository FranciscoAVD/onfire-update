import { cn } from "@/lib/utils";
import React from "react";

export function Main({
  className,
  children,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main {...props} className={cn(`p-4 ${className}`)}>
      {children}
    </main>
  );
}
