"use client";

import { useActionState, useState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, LucideMonitorSmartphone, Percent } from "lucide-react";
import { MINIMUM_PRIVATE_COST } from "@/features/classes/lib/constants";
import { addPackageAction } from "@/features/packages/actions/add-package-action";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FormError } from "@/components/ui/form-error";

export function AddPackageForm({ className }: { className?: string }) {
  const [state, formAction, isLoading] = useActionState(addPackageAction, {
    success: false,
  });
  const [numPriv, setNumPriv] = useState<number>(1);
  const [discount, setDiscount] = useState<number>(0);
  const total: number = MINIMUM_PRIVATE_COST * numPriv;
  const cost: number = total - (total * discount) / 100;

  useEffect(() => {
    if (state.success) {
      toast("Package successully created!", {
        description: "Visit package page to see the newly added package.",
      });
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className={cn(`grid grid-cols-2 gap-4 ${className}`)}
    >
      <div className="col-span-full flex flex-col gap-1">
        <Label htmlFor="name">Package name</Label>
        <Input
          name="name"
          type="text"
          defaultValue={state.previous?.name}
          autoFocus
          required
        />
        {state.errors?.name && <FormError>{state.errors.name[0]}</FormError>}
      </div>
      <div className="col-span-full flex flex-col gap-1">
        <Label htmlFor="privates">Number of privates</Label>
        <Select
          name="privates"
          defaultValue={state.previous?.privates ?? "1"}
          onValueChange={(v) => setNumPriv(+v)}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
        {state.errors?.privates && (
          <FormError>{state.errors.privates[0]}</FormError>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="cost">
          Cost
          <DollarSign className="size-4" aria-hidden />
        </Label>
        <Input name="cost" type="text" value={cost} required readOnly />
        {state.errors?.cost && <FormError>{state.errors.cost[0]}</FormError>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="discount">
          Discount
          <Percent className="size-4" aria-hidden />{" "}
        </Label>
        <Select
          name="discount"
          defaultValue={state.previous?.discount ?? "0"}
          onValueChange={(v) => setDiscount(+v)}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">0</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
        {state.errors?.discount && (
          <FormError>{state.errors.discount[0]}</FormError>
        )}
      </div>
      <div className="col-span-full flex flex-col gap-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          defaultValue={state.previous?.description ?? ""}
          required
        />
        {state.errors?.description && (
          <FormError>{state.errors.description[0]}</FormError>
        )}
      </div>
      <Button type="submit" className="col-span-full">
        {isLoading ? <LoadingSpinner /> : "Add package"}
      </Button>
    </form>
  );
}
