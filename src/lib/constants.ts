import { Roles } from "@/features/users/lib/types";

type Route = {
    label: string,
    href: string,
}
type DashboardRoute = {
    visibleTo: Roles[]
} & Route;

type DashboardRoutes = {
    index: DashboardRoute;
    packages: DashboardRoute;
    groups: DashboardRoute;
    staffSchedule: DashboardRoute;
    search: DashboardRoute;
    assignSchedule: DashboardRoute;
    analytics: DashboardRoute;
    settings: DashboardRoute;
}

type AllRoutes = {
    home: Route;
    login: Route;
    register: Route;
    dashboard: DashboardRoutes;
}

export const routes:AllRoutes = {
  home: {
    label: "home",
    href: "/",
  },
  login: {
    label: "home",
    href: "/",
  },
  register: {
    label: "home",
    href: "/",
  },
  dashboard: {
    index: {
        label: "overview",
        href: "/dashboard",
        visibleTo: ["student", "staff", "admin"]
    },
    packages: {
        label: "packages",
        href: "/dashboard/packages",
        visibleTo: ["student", "staff", "admin"]
    },
    groups: {
        label: "groups & workshops",
        href: "/dashboard/groups",
        visibleTo: ["student", "staff", "admin"]
    },
    staffSchedule: {
        label: "staff schedule",
        href: "/dashboard/staff-schedule",
        visibleTo: ["staff", "admin"]
    },
    search: {
        label: "search",
        href: "/dashboard/search",
        visibleTo: ["staff", "admin"],
    },
    assignSchedule: {
        label: "assign schedule",
        href: "/dashboard/assign-schedule",
        visibleTo: ["admin"]
    },
    analytics:{
        label: "analytics",
        href: "/dashboard/analytics",
        visibleTo: ["admin"],
    },
    settings: {
        label: "settings",
        href: "/dashboard/settings",
        visibleTo: ["admin"]
    }
  }
};
