"use client";

import { useActionState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { loginAction } from "../actions/login-action";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";

export function LoginForm({ className }: { className?: string }) {
  const [state, formAction, isLoading] = useActionState(loginAction, {
    success: false,
  });
  return (
    <form action={formAction} className={cn(`grid gap-4 ${className}`)}>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" required />
        {state?.errors?.email && <FormError>{state.errors.email}</FormError>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" required />
        {state?.errors?.password && (
          <FormError>{state.errors.password}</FormError>
        )}
      </div>
      <Button type="submit">{isLoading ? <LoadingSpinner /> : "Login"}</Button>
    </form>
  );
}
