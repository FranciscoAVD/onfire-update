import { cn } from "@/lib/utils";
import React from "react";

export function FormError({children, className}:React.ComponentProps<"p">){
    return <p className={cn(`text-sm text-red-500 ${className}`)}>{children}</p>
}