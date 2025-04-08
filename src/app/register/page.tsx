import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <main className="h-screen grid place-items-center">
      <RegisterForm className="max-w-xl"/>
    </main>
  );
}
