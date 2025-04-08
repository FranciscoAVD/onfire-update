import { cn } from "@/lib/utils";

export function LoadingSpinner({className}:{className?: string}){

    return <div className={cn(`size-5 border-2 border-t-neutral-500 rounded-full animate-spin ${className}`)} />
}