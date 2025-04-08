"use client";

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
import { Roles } from "@/features/users/lib/types";
import { usePathname } from "next/navigation";

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

export function SidebarNav({ role }: { role: Roles }) {
  const path = usePathname();
  const isActive = (path: string, href: string) => {
    if (href === "/dashboard") {
      return path === href;
    }
    return path === href || path.startsWith(href + "/");
  };
  return (
    <nav className="space-y-1">
      {nav.map(({ route, Icon }) => {
        if (route.visibleTo.includes(role))
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 hover:bg-neutral-100 text-sm rounded-md capitalize transition-colors",
                isActive(path, route.href) &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {route.label}
            </Link>
          );
        else return null;
      })}
    </nav>
  );
}
