import Link from "next/link";
import type { Route } from "next";
import { logout } from "@/app/login/actions";
import { getAuthenticatedUser } from "@/lib/supabase/auth";

const navItems = [
  { href: "/", label: "Invoices" },
  { href: "/clients", label: "Clients" },
  { href: "/companies", label: "Companies" }
] as const satisfies ReadonlyArray<{ href: Route; label: string }>;

export async function SiteHeader() {
  const { user } = await getAuthenticatedUser();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-950">
          Invoice Creator
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-600">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-slate-950">
              {item.label}
            </Link>
          ))}
          {user ? (
            <form action={logout}>
              <button className="hover:text-slate-950" type="submit">
                Log out
              </button>
            </form>
          ) : (
            <Link href="/login" className="hover:text-slate-950">
              Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
