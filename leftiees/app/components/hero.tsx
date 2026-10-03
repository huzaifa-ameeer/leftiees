"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import BrandMarquee from "./brand-marquee";

const SLIDES = [
  {
    src: "https://images.pexels.com/photos/7679454/pexels-photo-7679454.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop",
    alt: "Denim jeans hanging on a clothing rack",
  },
  {
    src: "https://images.pexels.com/photos/4109797/pexels-photo-4109797.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop",
    alt: "Stack of folded denim jeans",
  },
  {
    src: "https://images.pexels.com/photos/219633/pexels-photo-219633.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop",
    alt: "Close-up of blue denim jeans",
  },
  {
    src: "https://images.pexels.com/photos/16811856/pexels-photo-16811856.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop",
    alt: "Denim jeans on hangers in a shop",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!playing || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % SLIDES.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [playing, paused]);

  const goTo = (next: number) =>
    setIndex((next + SLIDES.length) % SLIDES.length);

  return (
    <section className="grid w-full max-w-6xl items-center gap-5 px-4 pt-8 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
      <div className="flex flex-col items-start gap-6 lg:self-start">
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-denim">
          <span className="h-1.5 w-1.5 rounded-full bg-denim" />
          Leftover drop
        </p>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-7xl">
          Only the leftovers worth taking.{" "}
          <span className="text-denim">Denim pants</span>, jackets, and more.
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-zinc-600">
          One-off pieces rescued from past drops. Limited runs, no restocks —
          when a piece is gone, it is gone.
        </p>
        <Link
          href="/explore"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-foreground/85"
        >
          Explore products
          <ArrowIcon />
        </Link>
      </div>

      <div className="flex w-full flex-col gap-5 lg:max-w-[460px] lg:justify-self-end">
        <div
          className="relative aspect-[4/5] max-h-[70vh] w-full overflow-hidden rounded-3xl bg-zinc-100"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          role="group"
          aria-roledescription="carousel"
          aria-label="Featured pieces"
        >
          <div
            className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {SLIDES.map((slide, i) => (
              <div
                key={slide.src}
                className="relative h-full w-full shrink-0"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${SLIDES.length}`}
                aria-hidden={i !== index}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  preload={i === 0}
                />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous image"
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-white"
            >
              <ChevronIcon className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next image"
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-white"
            >
              <ChevronIcon />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-foreground"
                    : "w-2 bg-black/20 hover:bg-black/40"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            aria-pressed={!playing}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-foreground transition-colors hover:bg-black/5"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>

      <BrandMarquee className="lg:col-span-2" />
    </section>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-5 w-5 ${className ?? ""}`}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}
