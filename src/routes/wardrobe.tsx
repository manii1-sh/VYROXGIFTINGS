import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { MobileChrome } from "../components/mobile-shell";
import { PRODUCTS } from "../lib/products";

export const Route = createFileRoute("/wardrobe")({
  head: () => ({
    meta: [
      { title: "Wardrobe — Premium Oversized Tees | VYROX" },
      { name: "description", content: "Explore VYROX premium oversized tees. Built for those who stand out." },
    ],
  }),
  component: Wardrobe,
});

function Wardrobe() {
  return (
    <main className="min-h-screen bg-background">
      <MobileChrome />

      {/* Hero Section */}
      <section className="border-b border-border bg-hero-gift py-16 sm:py-20">
        <div className="hero-grid absolute inset-0 opacity-15" />
        <div className="section-shell relative">
          <p className="font-display text-xs font-bold uppercase tracking-widest text-primary">
            VYROX Collection
          </p>
          <h1 className="mt-2 font-display text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl">
            Shop the <span className="text-primary">Wardrobe</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Premium oversized tees crafted with heavyweight cotton. Built for those who don't just follow — they lead.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-shell py-12">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing all {PRODUCTS.length} products
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              to="/product/$slug"
              params={{ slug: p.slug }}
              className="group block overflow-hidden border border-border bg-card transition hover:shadow-lg"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted flex items-center justify-center">
                <img
                  src={p.images[0]}
                  alt={`${p.name} product`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border p-3 sm:p-4">
                <div className="min-w-0">
                  <h3 className="truncate text-xs font-semibold sm:text-sm">{p.name}</h3>
                  <p className="mt-1 font-display text-sm font-bold sm:text-base">{p.price}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground line-clamp-1 sm:text-xs">
                    {p.tagline}
                  </p>
                </div>
                <ShoppingBag className="size-4 shrink-0 text-primary sm:size-5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-shell border-t border-border py-16 text-center">
        <h2 className="font-display text-3xl font-black uppercase sm:text-4xl">
          Complete the <span className="text-primary">Experience</span>
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Add a premium gift hamper to your order
        </p>
        <Link
          to="/hampers"
          className="mt-6 inline-flex h-12 items-center justify-center gap-2 bg-primary px-8 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:scale-[1.02]"
        >
          Shop Hampers
        </Link>
      </section>

      {/* Footer */}
      <footer className="section-shell flex flex-col gap-4 border-t border-border py-8 text-[10px] uppercase tracking-widest text-muted-foreground sm:flex-row sm:justify-between">
        <span>© 2026 VYROX. Wear your attitude.</span>
        <span>Privacy · Terms · Shipping</span>
      </footer>
    </main>
  );
}
