import Link from "next/link";

const FOOTER_LINKS = [
  {
    heading: "Shop",
    links: [
      { href: "/explore", label: "Explore" },
      { href: "/about", label: "About us" },
    ],
  },
  {
    heading: "Account",
    links: [
      { href: "/login", label: "Login" },
      { href: "/signup", label: "Sign up" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Link
              href="/"
              className="text-2xl font-semibold tracking-tight text-foreground"
            >
              Leftiees
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              One-off leftover denim, rescued from past drops. Limited runs, no
              restocks.
            </p>
          </div>

          <div className="flex gap-12 sm:gap-16">
            {FOOTER_LINKS.map((group) => (
              <div key={group.heading}>
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-denim">
                  {group.heading}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-600 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-black/10 pt-6">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Leftiees. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
