import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { MobileChrome } from "../components/mobile-shell";
import { HAMPERS, OCCASIONS } from "../lib/hampers";

export const Route = createFileRoute("/hampers")({
  head: () => ({
    meta: [
      { title: "All Gift Hampers — VYROX" },
      { name: "description", content: "Browse every VYROX gift hamper — Signature, Luxury and Midnight Romance. Filter by occasion and price." },
      { property: "og:title", content: "All Gift Hampers — VYROX" },
      { property: "og:description", content: "Premium curated gift hampers for every occasion." },
    ],
  }),
  component: HampersPage,
});

function HampersPage() {
  const [filter, setFilter] = useState<string>("All");
  const visible = filter === "All" ? HAMPERS : HAMPERS.filter((h) => h.occasion.includes(filter));

  return (
    <main className="bg-background text-foreground">
      <MobileChrome />

      <div className="section-shell pt-4 pb-24 md:pt-8">
        <Link to="/" className="mb-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
          <ChevronLeft className="size-4" /> Home
        </Link>

        <header className="mb-8 text-center">
          <p className="section-kicker">Every Box, Packed With Love</p>
          <h1 className="section-title">All <span className="text-primary">Hampers</span></h1>
          <p className="mx-auto mt-3 max-w-xl font-serif-italic text-lg text-gold">
            Curated gifts for the moments that matter.
          </p>
        </header>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {["All", ...OCCASIONS].map((o) => (
            <button
              key={o}
              onClick={() => setFilter(o)}
              className={`border px-4 py-2 font-display text-[11px] font-bold uppercase tracking-widest transition ${
                filter === o ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
              }`}
            >
              {o}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((h) => (
            <Link
              key={h.slug}
              to="/hamper/$slug"
              params={{ slug: h.slug }}
              className="group flex flex-col overflow-hidden border border-border bg-card transition hover:border-gold/60"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={h.image} alt={h.name} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <span className="absolute left-3 top-3 bg-gold px-3 py-1 font-display text-[10px] font-black uppercase tracking-widest text-background">
                  Just {h.priceLabel}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 border-t border-border p-5">
                <h3 className="font-display text-lg font-bold uppercase leading-tight">{h.name}</h3>
                <p className="font-serif-italic text-sm text-muted-foreground">{h.tagline}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {h.occasion.map((o) => (
                    <span key={o} className="border border-border/70 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{o}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="font-display text-xl font-black">{h.priceLabel}</span>
                  <span className="inline-flex items-center gap-1 font-display text-xs font-bold uppercase tracking-widest text-primary">
                    Shop <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">No hampers for this occasion yet — new drops soon.</p>
        )}
      </div>
    </main>
  );
}
