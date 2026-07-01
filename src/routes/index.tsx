import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Gift, Headphones, Heart, PackageCheck, RefreshCw, Search, ShieldCheck, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { Button, buttonVariants } from "../components/ui/button";
import { MobileChrome } from "../components/mobile-shell";
import { useCart } from "../lib/cart";
import { PRODUCTS, PRODUCT_IMAGE } from "../lib/products";
import { HAMPERS } from "../lib/hampers";
import hamperHero from "../assets/vyrox-hamper-hero.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VYROX — Premium Gift Hampers, Hand-Packed with Love" },
      { name: "description", content: "Curated premium gift hampers for every occasion. Perfume, shirts, roses, chocolates and more — packed with love by VYROX." },
      { property: "og:title", content: "VYROX — Gift the Feeling" },
      { property: "og:description", content: "Curated premium gift hampers, hand-packed for the ones you love." },
    ],
  }),
  component: Index,
});

const occasions = [
  { name: "Valentine", icon: Heart },
  { name: "Anniversary", icon: Sparkles },
  { name: "Birthday", icon: Gift },
  { name: "Rakhi", icon: Heart },
  { name: "Wedding", icon: Sparkles },
  { name: "Corporate", icon: PackageCheck },
];

const benefits = [
  [Truck, "FREE SHIPPING", "On Orders Above ₹999"],
  [PackageCheck, "HAND-PACKED", "Ready in 24 Hours"],
  [ShieldCheck, "PREMIUM CURATED", "Only the Best Inside"],
  [Headphones, "GIFT SUPPORT", "We're Here to Help"],
] as const;

const steps = [
  ["01", "Choose", "Pick a hamper for the occasion — Valentine, birthday, anniversary or corporate."],
  ["02", "Personalize", "Add the recipient's name, a gift message and your delivery date."],
  ["03", "We Deliver", "We hand-pack, gift-wrap and ship it straight to their door."],
];

function Index() {
  const sceneRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scene = sceneRef.current;
      if (!scene) return;
      const rect = scene.getBoundingClientRect();
      const distance = scene.offsetHeight - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, -rect.top / Math.max(distance, 1))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const reveal = (start: number, end: number) => Math.min(1, Math.max(0, (progress - start) / (end - start)));
  const words = reveal(0.12, 0.42);
  const details = reveal(0.4, 0.7);

  return (
    <main className="overflow-clip bg-background text-foreground">
      <MobileChrome />
      <section ref={sceneRef} className="relative h-[220vh] md:h-[300vh]" aria-label="VYROX gift hamper introduction">
        <div className="sticky top-0 h-dvh overflow-hidden border-b border-border bg-hero-gift">
          <div className="hero-grid absolute inset-0 opacity-25" />

          <nav className="absolute inset-x-0 top-0 z-50 mx-auto hidden max-w-[1500px] items-center justify-between gap-4 px-9 py-5 md:flex">
            <Link to="/" className="min-w-0 font-logo text-2xl tracking-[0.35em] text-primary sm:text-3xl">VYROX<span className="text-foreground">╱</span></Link>
            <div className="hidden items-center gap-7 text-[10px] font-semibold uppercase tracking-widest lg:flex">
              <Link className="text-primary" to="/">Home</Link>
              <Link to="/hampers">Hampers</Link>
              <a href="#occasions">Occasions</a>
              <a href="#how">How it works</a>
              <a href="#wardrobe">Wardrobe</a>
              <a href="#join">Contact</a>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="icon" aria-label="Search"><Search className="size-4" /></Button>
              <DesktopCartButton />
              <Link to="/hampers" className={`${buttonVariants()} hidden h-10 px-4 sm:inline-flex`}>Shop Hampers</Link>
            </div>
          </nav>

          <div className="absolute inset-0 flex items-center justify-center pt-12">
            {/* Big VYROX outline word — revealed behind the box */}
            <div
              className="absolute inset-x-[4vw] top-[14%] z-10 text-center font-display text-[24vw] font-black leading-none tracking-[-0.08em] text-transparent hero-outline sm:top-[10%] sm:text-[17vw]"
              style={{ opacity: words, transform: `translateY(${(1 - words) * 70}px) scale(${0.82 + words * 0.18})` }}
            >
              VYROX
            </div>

            {/* Left side gifting statement */}
            <div
              className="absolute left-[5vw] top-[26%] z-20 max-w-[36rem]"
              style={{ opacity: words, transform: `translateX(${(1 - words) * -80}px)` }}
            >
              <p className="mb-2 font-serif-italic text-lg text-gold sm:text-2xl">Especially for you.</p>
              <h1 className="font-display text-[14vw] font-black uppercase leading-[0.85] tracking-tight sm:text-[6.5vw] lg:text-[5.5rem]">
                Gift the<br />
                <span className="text-primary">feeling.</span>
              </h1>
              <p className="mt-5 hidden max-w-md text-xs font-medium leading-relaxed text-muted-foreground sm:block">
                Premium gift hampers, hand-packed with roses, perfume, chocolates & VYROX apparel — for the ones who matter most.
              </p>
              <div className="mt-6 hidden gap-3 sm:flex">
                <Link to="/hampers" className={`${buttonVariants()} h-12 px-7`}>Shop Hampers</Link>
                <a href="#occasions" className={`${buttonVariants({ variant: "outline" })} h-12 px-7`}>By Occasion</a>
              </div>
            </div>

            {/* The hamper box — always visible, models retired */}
            <div
              className="absolute inset-x-0 bottom-0 z-30 flex justify-center"
              style={{ transform: `translateY(${progress * 12}px) scale(${0.94 + progress * 0.06})` }}
            >
              <img
                src={hamperHero}
                alt="VYROX premium gift hamper with shirt, roses, perfume and chocolates"
                width={1280}
                height={1280}
                className="h-auto w-[92vw] max-w-none object-contain drop-shadow-hero sm:h-[88vh] sm:w-auto"
              />
            </div>

            {/* Right-side price / offer card, revealed on scroll */}
            <div
              className="absolute bottom-[15%] right-[5vw] z-40 hidden w-52 border border-gold/40 bg-panel/90 p-4 backdrop-blur md:block"
              style={{ opacity: details, transform: `translateY(${(1 - details) * 50}px)` }}
            >
              <p className="font-serif-italic text-sm text-gold">Made with love</p>
              <p className="mt-1 font-display text-2xl font-black uppercase">From ₹1,000</p>
              <div className="gold-divider my-3" />
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Signature · Luxury · Midnight</p>
            </div>
          </div>

          {/* Bottom benefit strip */}
          <div className="absolute inset-x-0 bottom-0 z-40 hidden border-t border-border bg-background/75 backdrop-blur-sm lg:block" style={{ opacity: details }}>
            <div className="mx-auto grid max-w-[1500px] grid-cols-4 gap-8 px-9 py-4">
              {benefits.map(([Icon, title, copy]) => (
                <div key={title} className="flex items-center gap-3">
                  <Icon className="size-6 text-primary" />
                  <div><b className="block font-display text-xs">{title}</b><span className="text-[10px] text-muted-foreground">{copy}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-5 left-5 z-50 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground lg:hidden">
            Scroll to reveal · {Math.round(progress * 100)}%
          </div>
        </div>
      </section>

      {/* SIGNATURE HAMPERS */}
      <section id="hampers" className="section-shell border-b border-border py-20">
        <div className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">Curated Boxes</p>
            <h2 className="section-title">Signature <span className="text-primary">Hampers</span></h2>
            <p className="mt-3 max-w-lg font-serif-italic text-lg text-gold">Every box, packed with love.</p>
          </div>
          <Link to="/hampers" className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-primary">
            View all hampers <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {HAMPERS.map((h) => (
            <Link
              key={h.slug}
              to="/hamper/$slug"
              params={{ slug: h.slug }}
              className="group relative flex flex-col overflow-hidden border border-border bg-card transition-colors hover:border-gold/60"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={h.image}
                  alt={h.name}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute left-3 top-3 bg-gold px-3 py-1 font-display text-[10px] font-black uppercase tracking-widest text-background">
                  Just {h.priceLabel}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 border-t border-border p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-bold uppercase leading-tight">{h.name}</h3>
                  <span className="shrink-0 font-serif-italic text-sm text-gold">for {h.audience}</span>
                </div>
                <p className="font-serif-italic text-sm text-muted-foreground">{h.tagline}</p>
                <ul className="mt-1 flex flex-wrap gap-1.5">
                  {h.contents.slice(0, 4).map((c) => (
                    <li key={c} className="border border-border/70 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{c}</li>
                  ))}
                  {h.contents.length > 4 && (
                    <li className="px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">+{h.contents.length - 4} more</li>
                  )}
                </ul>
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
      </section>

      {/* OCCASIONS */}
      <section id="occasions" className="bg-cream-section border-b border-border py-20">
        <div className="section-shell text-center">
          <p className="font-display text-xs font-bold uppercase tracking-widest text-primary">Shop by Moment</p>
          <h2 className="mt-2 font-display text-4xl font-black uppercase sm:text-5xl">
            A gift for every <span className="font-serif-italic font-normal normal-case italic text-primary">occasion</span>
          </h2>
          <div className="gold-divider mx-auto mt-6 w-24" />
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-3 gap-3 sm:grid-cols-6">
            {occasions.map(({ name, icon: Icon }) => (
              <Link
                key={name}
                to="/hampers"
                className="group flex flex-col items-center gap-2 border border-black/10 bg-white/70 px-3 py-5 transition hover:border-primary hover:bg-white"
              >
                <Icon className="size-6 text-primary" />
                <span className="font-display text-xs font-bold uppercase tracking-wider">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section-shell border-b border-border py-20">
        <div className="text-center">
          <p className="section-kicker">How It Works</p>
          <h2 className="section-title">Three steps to the <span className="text-primary">perfect gift</span></h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map(([n, title, copy]) => (
            <div key={n} className="relative border border-border bg-card p-8">
              <span className="font-serif-italic text-6xl text-gold/60">{n}</span>
              <h3 className="mt-4 font-display text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WARDROBE — clothing demoted to secondary */}
      <section id="wardrobe" className="section-shell border-b border-border py-20">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">Also from VYROX</p>
            <h2 className="section-title">Shop the <span className="text-primary">Wardrobe</span></h2>
            <p className="mt-2 text-sm text-muted-foreground">The same premium quality, worn every day.</p>
          </div>
          <a href="#" className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-primary">
            All tees <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} className="group block overflow-hidden border border-border bg-card">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={PRODUCT_IMAGE}
                  alt={`${p.name} product`}
                  loading="lazy"
                  width={1536}
                  height={864}
                  className="h-full w-[400%] max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ transform: `translateX(-${p.imageIndex * 25}%)` }}
                />
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border p-4">
                <div className="min-w-0">
                  <h3 className="truncate text-xs">{p.name}</h3>
                  <p className="mt-1 text-xs">{p.price}</p>
                </div>
                <ShoppingBag className="size-4 shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BENEFITS STRIP */}
      <section className="section-shell grid gap-px border-b border-border bg-border py-px sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(([Icon, title, copy]) => (
          <div key={title} className="flex items-center gap-4 bg-background px-5 py-8">
            <Icon className="size-7 text-primary" />
            <div><b className="font-display text-sm">{title}</b><p className="mt-1 text-[10px] text-muted-foreground">{copy}</p></div>
          </div>
        ))}
      </section>

      {/* TESTIMONIALS */}
      <section className="section-shell py-20">
        <h2 className="section-title mb-2 text-center">Loved by <span className="text-primary">gift-givers</span></h2>
        <p className="mb-9 text-center font-serif-italic text-lg text-gold">Real stories from real celebrations.</p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Ordered the Luxury hamper for our anniversary. She actually cried. Packaging was on another level.", "Rohit M."],
            ["The Midnight Romance box was perfect for our proposal night. Every detail felt premium.", "Aryan S."],
            ["Sent the Signature box to my brother on rakhi. He called me the moment he opened it. Worth every rupee.", "Karan D."],
          ].map(([quote, name]) => (
            <blockquote key={name} className="border border-border bg-card p-6">
              <div className="mb-4 tracking-widest text-primary">★★★★★</div>
              <p className="min-h-14 text-xs leading-6 text-muted-foreground">{quote}</p>
              <footer className="mt-6 text-xs">— {name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className="relative overflow-hidden border-y border-border bg-hero-gift">
        <div className="section-shell relative z-10 grid min-h-[360px] items-center py-16 md:grid-cols-2">
          <div className="md:col-start-2">
            <p className="font-serif-italic text-lg text-gold">Be the first to know.</p>
            <h2 className="section-title mt-1">Join the VYROX <span className="text-primary">gift club</span></h2>
            <p className="mt-3 text-sm text-muted-foreground">Early access to new hampers, seasonal drops and members-only prices.</p>
            <form className="mt-7 flex max-w-xl flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <label className="sr-only" htmlFor="email">Email address</label>
              <input id="email" type="email" placeholder="Enter your email" className="h-12 min-w-0 flex-1 border border-border bg-background/80 px-4 text-xs outline-none focus:border-primary" />
              <Button type="submit" className="h-12 px-8">Join Now</Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="section-shell flex flex-col gap-4 py-8 text-[10px] uppercase tracking-widest text-muted-foreground sm:flex-row sm:justify-between">
        <span>© 2026 VYROX. Gift the feeling.</span>
        <span>Privacy · Terms · Shipping</span>
      </footer>
    </main>
  );
}

function DesktopCartButton() {
  const { count } = useCart();
  return (
    <Link to="/checkout" aria-label="Shopping bag" className="relative inline-grid size-9 place-items-center text-foreground hover:text-primary">
      <ShoppingBag className="size-4" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 font-display text-[10px] font-bold text-primary-foreground">{count}</span>
      )}
    </Link>
  );
}
