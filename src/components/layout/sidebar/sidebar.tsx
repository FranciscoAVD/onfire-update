"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Home,
  ShoppingBag,
  Users,
  CalendarDays,
  Search,
  CalendarClock,
  LineChart,
  Settings,
} from "lucide-react";
import { routes } from "@/lib/constants";

const nav = [
  {
    route: routes.dashboard.index,
    Icon: Home,
  },
  {
    route: routes.dashboard.packages,
    Icon: ShoppingBag,
  },
  {
    route: routes.dashboard.groups,
    Icon: Users,
  },
  {
    route: routes.dashboard.staffSchedule,
    Icon: CalendarDays,
  },
  {
    route: routes.dashboard.search,
    Icon: Search,
  },
  {
    route: routes.dashboard.assignSchedule,
    Icon: CalendarClock,
  },
  {
    route: routes.dashboard.analytics,
    Icon: LineChart,
  },
  {
    route: routes.dashboard.settings,
    Icon: Settings,
  },
] as const;

export function Sidebar({ className }: { className?: string }) {
  const path = usePathname();
  return (
    <aside className={cn(`py-4 px-2 ${className}`)}>
      <nav className="space-y-1">
        {nav.map(({ route, Icon }) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn("flex items-center gap-2 px-3 py-2 hover:bg-neutral-100 text-sm rounded-md capitalize transition-colors",
                path === route.href && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <Icon className="size-4" aria-hidden />
            {route.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
