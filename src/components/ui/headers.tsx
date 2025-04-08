import React from "react";
import { cn } from "@/lib/utils";

export function H1({
  className,
  children,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1 {...props} className={cn(`text-4xl font-bold ${className}`)}>
      {children}
    </h1>
  );
}
export function H2({
  className,
  children,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2 {...props} className={cn(`text-2xl font-semibold ${className}`)}>
      {children}
    </h2>
  );
}
export function H3({
  className,
  children,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3 {...props} className={cn(`text-xl font-semibold ${className}`)}>
      {children}
    </h3>
  );
}
