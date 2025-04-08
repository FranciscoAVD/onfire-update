import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <nav className="flex items-center gap-4">
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </header>
      <main>Home page</main>
    </>
  );
}
