"use client";

import { useActionState, useState, useEffect } from "react";
import { registerAction } from "@/features/auth/actions/register-action";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn, formatPhoneNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FormError } from "@/components/ui/form-error";
import Link from "next/link";

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
        <Input
          name="first"
          type="text"
          defaultValue={state.previous?.first}
          autoFocus
          required
        />
        {state?.errors?.first && <FormError>{state.errors.first[0]}</FormError>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="last">Last name</Label>
        <Input
          name="last"
          type="text"
          defaultValue={state.previous?.last}
          required
        />
        {state?.errors?.last && <FormError>{state.errors.last[0]}</FormError>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          type="email"
          defaultValue={state.previous?.email}
          required
        />
        {state?.errors?.email && <FormError>{state.errors.email[0]}</FormError>}
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
        {state?.errors?.phone && <FormError>{state.errors.phone[0]}</FormError>}
      </div>
      <div className="col-span-full flex flex-col gap-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" min={8} required />
        {state?.errors?.password && (
          <FormError>{state.errors.password[0]}</FormError>
        )}
      </div>
      <p className="col-span-full text-sm text-neutral-500">
        Already have an account? <Link href="/login">Login</Link>
      </p>
      <Button type="submit" className="col-span-full" disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : "Register"}
      </Button>
    </form>
  );
}
