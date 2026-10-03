"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

const LINKS = [
  { href: "/admin", label: "Fresh products" },
  { href: "/admin/products/new", label: "Add product" },
  { href: "/admin/products", label: "Manage products" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activePath, setActivePath] = useState(pathname);

  if (activePath !== pathname) {
    setActivePath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open admin menu"
          aria-expanded={open}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-black/5"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        </button>
        <span className="text-sm font-semibold">Leftiees admin</span>
      </div>

      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 transform border-r border-black/10 bg-background transition-transform duration-300 ease-out motion-reduce:transition-none lg:static lg:z-auto lg:w-60 lg:translate-x-0 lg:border-0 lg:bg-transparent ${
          open ? "translate-x-0 shadow-xl lg:shadow-none" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col gap-6 overflow-y-auto p-4">
          <div className="flex items-start justify-between gap-2 px-1">
            <div className="min-w-0">
              <p className="text-sm font-semibold">Leftiees admin</p>
              <p className="truncate text-xs text-zinc-500">{email}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close admin menu"
              className="-mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-black/5 hover:text-foreground lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-black/5 font-medium text-foreground"
                      : "text-zinc-600 hover:bg-black/5 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-auto self-start rounded-full px-3 py-2 text-sm text-zinc-600 transition-colors hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
