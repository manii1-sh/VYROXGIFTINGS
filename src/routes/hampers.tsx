import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { MobileChrome } from "../components/mobile-shell";
import { HAMPERS, OCCASIONS, type HamperCategory } from "../lib/hampers";

export const Route = createFileRoute("/hampers")({
  head: () => ({
    meta: [
      { title: "All Gift Hampers — VYROX" },
      { name: "description", content: "Browse every VYROX gift hamper. Filter by occasion." },
      { property: "og:title", content: "All Gift Hampers — VYROX" },
      { property: "og:description", content: "Premium curated gift hampers for every occasion." },
    ],
  }),
  component: HampersPage,
});

const CATEGORY_FILTERS: Array<"All" | HamperCategory> = ["All", "For Female", "For Male", "Festive Special"];

function HampersPage() {
  const [categoryFilter, setCategoryFilter] = useState<"All" | HamperCategory>("All");
  
  const visible =
    categoryFilter === "All" 
      ? HAMPERS 
      : HAMPERS.filter((h) => h.category === categoryFilter);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <MobileChrome />

      {/* ── BREADCRUMB BAR ── */}
      <div className="border-b border-border">
        <div className="section-shell flex items-center gap-3 py-4">
          <Link
            to="/"
            className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary"
          >
            Home
          </Link>
          <ChevronLeft className="size-3 rotate-180 text-border" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
            Hampers
          </span>
        </div>
      </div>

      <div className="section-shell py-8">

        {/* ── TITLE ── */}
        <div className="mb-8">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Curated Boxes
          </p>
          <h1 className="mt-1 font-display text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">
            Signature <span className="text-primary">Hampers</span>
          </h1>
          <p className="mt-2 font-serif-italic text-base text-gold">Every box, packed with love.</p>
        </div>

        {/* ── CATEGORY TABS ── */}
        <div className="mb-8 border-b border-border">
          <div className="flex gap-8 overflow-x-auto">
            {CATEGORY_FILTERS.map((cat) => {
              const count = cat === "All" ? HAMPERS.length : HAMPERS.filter(h => h.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`relative whitespace-nowrap pb-3 font-display text-sm font-bold uppercase tracking-widest transition-colors ${
                    categoryFilter === cat
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat === "All" ? "All Hampers" : cat} ({count})
                  {categoryFilter === cat && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── GRID ── */}
        {visible.length === 0 ? (
          <p className="py-24 text-center text-sm text-muted-foreground">
            No hampers in this category yet — new drops soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {visible.map((h) => (
              <Link
                key={h.slug}
                to="/hamper/$slug"
                params={{ slug: h.slug }}
                className="group relative flex flex-col bg-card"
              >
                {/* Image — square */}
                <div className="relative overflow-hidden">
                  <div className="aspect-square">
                    <img
                      src={h.image}
                      alt={h.name}
                      loading="lazy"
                      width={600}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>

                  {/* Price badge flush left */}
                  <span className="absolute left-0 top-3 bg-gold px-3 py-1 font-display text-[9px] font-black uppercase tracking-widest text-background">
                    {h.priceLabel}
                  </span>

                  {/* Hover CTA slides up */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-primary px-4 py-2.5 transition-transform duration-300 group-hover:translate-y-0">
                    <span className="flex items-center justify-center gap-2 font-display text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                      View Hamper <ArrowRight className="size-3" />
                    </span>
                  </div>
                </div>

                {/* Card info */}
                <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
                  <div>
                    <h3 className="font-display text-sm font-bold uppercase leading-snug tracking-wider sm:text-base">
                      {h.name}
                    </h3>
                    <p className="mt-1 font-serif-italic text-xs text-gold line-clamp-1 sm:text-sm">
                      {h.tagline}
                    </p>
                  </div>

                  <div className="mt-3 flex items-end justify-between border-t border-border/40 pt-3">
                    <span className="font-display text-base font-black sm:text-lg">
                      {h.priceLabel}
                    </span>
                    {h.originalPrice && (
                      <span className="text-[10px] text-muted-foreground/50 line-through">
                        {h.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
