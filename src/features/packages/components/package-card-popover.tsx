"use client";

import { EllipsisVertical, Eye, EyeOff, SquarePen } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { routes } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Package } from "@/database/types";
import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { updatePackageStatusAction } from "@/features/packages/actions/update-package-status-action";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";

export function PackageCardPopover({
  id,
  isActive,
}: {
  id: Package["id"];
  isActive: boolean;
}) {
  const [state, formAction, isLoading] = useActionState(
    updatePackageStatusAction,
    { success: false },
  );

  useEffect(() => {
    if (state.success) {
      toast(`Package has been ${isActive ? "activated" : "disabled"}.`);
    }
  }, [state]);

  return (
    <Popover>
      <PopoverTrigger className="absolute top-2 right-2" asChild>
        <Button size="icon" variant={"ghost"}>
          <EllipsisVertical className="size-4" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col p-1 w-[150px]" align="end">
        <Button variant="ghost" className="justify-start" asChild>
          <Link href={routes.dashboard.packages.href}>
            <SquarePen aria-hidden />
            Edit
          </Link>
        </Button>
        <form action={formAction}>
          <Input name="id" value={id} className="h-0 p-0 invisible" readOnly />
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start"
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : isActive ? (
              <>
                <EyeOff aria-hidden /> Disable
              </>
            ) : (
              <>
                <Eye aria-hidden /> Activate
              </>
            )}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
