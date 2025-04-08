"use client";

import { useActionState, useState, useEffect } from "react";
import { registerAction } from "@/features/auth/actions/register-action";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn, formatPhoneNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FormError } from "@/components/ui/form-error";

export function RegisterForm({ className }: { className?: string }) {
  const [state, formAction, isLoading] = useActionState(registerAction, {
    success: false,
  });
  const [phone, setPhone] = useState<string>("");

  return (
    <form
      action={formAction}
      className={cn(`grid grid-cols-2 gap-4 ${className}`)}
    >
      <div className="flex flex-col gap-1">
        <Label htmlFor="first">First name</Label>
        <Input name="first" type="text" required />
        {state?.errors?.first && <FormError>{state.errors.first}</FormError>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="last">Last name</Label>
        <Input name="last" type="text" required />
        {state?.errors?.last && <FormError>{state.errors.last}</FormError>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" required />
        {state?.errors?.email && <FormError>{state.errors.email}</FormError>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="phone">Phone</Label>
        <Input
          name="phone"
          type="text"
          value={formatPhoneNumber(phone)}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {state?.errors?.phone && <FormError>{state.errors.phone}</FormError>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" min={8} required />
        {state?.errors?.password && (
          <FormError>{state.errors.password}</FormError>
        )}
      </div>
      <Button type="submit">
        {isLoading ? <LoadingSpinner /> : "Register"}
      </Button>
    </form>
  );
}
