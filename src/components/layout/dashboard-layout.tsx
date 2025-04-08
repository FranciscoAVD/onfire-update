import { cn } from "@/lib/utils";
import React from "react";

export function DashboardLayout({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div {...props} className={cn(`grid grid-rows-[4rem_1fr] grid-cols-[15rem_1fr] h-screen ${className}`)}>
      {children}
    </div>
  );
}
