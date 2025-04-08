import { cn } from "@/lib/utils";

export function Sidebar({className}:{className?: string}){

    return <aside className={cn(`p-4 ${className}`)}>Sidebar</aside>
}