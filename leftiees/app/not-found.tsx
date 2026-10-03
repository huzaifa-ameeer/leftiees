import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-denim">
        404
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="max-w-prose text-lg text-zinc-600">
        The page you are looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full border border-black/15 px-6 text-base font-medium transition-colors hover:bg-black/5"
        >
          Back home
        </Link>
        <Link
          href="/explore"
          className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-foreground/85"
        >
          Explore products
        </Link>
      </div>
    </main>
  );
}
