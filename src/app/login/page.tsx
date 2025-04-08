import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage(){
    return (
        <main className="h-screen grid place-content-center">
            <LoginForm className="max-w-xl"/>
        </main>
    )
}