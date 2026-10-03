import Link from "next/link";

export const metadata = {
  title: "About — Leftiees",
  description:
    "Leftiees is a small denim label built around one-off leftover pieces, limited runs, and no restocks.",
};

const VALUES = [
  {
    title: "Limited runs",
    body: "Every drop is a small batch. Once a piece sells out, we don't restock it.",
  },
  {
    title: "Honest quality",
    body: "We keep what we sell intentionally small so nothing leaves without being checked.",
  },
  {
    title: "Less waste",
    body: "Rescuing leftovers means fewer perfectly good pieces end up discarded.",
  },
];

export default function About() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-14 px-4 py-20 sm:px-6 lg:px-8">
      <header className="flex max-w-3xl flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          About
        </p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          About us
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600">
          Leftiees is a small denim label built around a single idea: the best
          pieces are often the ones that were almost gone.
        </p>
      </header>

      <div className="flex max-w-3xl flex-col gap-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">
            Our story
          </h2>
          <p className="leading-relaxed text-zinc-600">
            We started by rescuing leftover stock from past drops — one-off
            pairs, cancelled orders, and end-of-run pieces that would otherwise
            sit in a warehouse. Instead of letting them disappear, we give them
            a second life and pass them on at a fair price.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">
            What we sell
          </h2>
          <p className="leading-relaxed text-zinc-600">
            Denim pants, jackets, and the occasional extra. Every item is a
            limited run — when a piece is gone, it is gone. You won&apos;t find
            endless sizes and colourways here, just a handful of pieces worth
            keeping.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">
            Why limited
          </h2>
          <p className="leading-relaxed text-zinc-600">
            Small batches let us keep quality high and waste low. Fewer, better
            pieces means less guesswork for you and less overproduction for
            everyone.
          </p>
        </section>

        <ul className="grid gap-6 sm:grid-cols-3">
          {VALUES.map((value) => (
            <li key={value.title} className="flex flex-col gap-2">
              <span className="h-1.5 w-6 rounded-full bg-denim" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em]">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600">
                {value.body}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Link
          href="/explore"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-foreground/85"
        >
          Explore products
        </Link>
      </div>
    </main>
  );
}
