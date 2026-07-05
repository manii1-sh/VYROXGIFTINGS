import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Gift, Heart, Instagram, PackageCheck, Search, ShieldCheck, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { Button, buttonVariants } from "../components/ui/button";
import { MobileChrome } from "../components/mobile-shell";
import { useCart } from "../lib/cart";
import { PRODUCTS } from "../lib/products";
import { HAMPERS } from "../lib/hampers";
import hamperHero from "../assets/vyrox-hamper-hero.png";
import useEmblaCarousel from "embla-carousel-react";
import { OrganizationSchema } from "../components/seo-schema";

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
  { name: "Wedding", icon: Sparkles },
];

const benefits = [
  [Truck, "FREE SHIPPING", "On Orders Above ₹999"],
  [PackageCheck, "HAND-PACKED", "Ready in 24 Hours"],
  [ShieldCheck, "PREMIUM CURATED", "Only the Best Inside"],
] as const;

const steps = [
  ["01", "Choose", "Pick a hamper for the occasion — Valentine, birthday, anniversary or corporate."],
  ["02", "Personalize", "Add the recipient's name, a gift message and your delivery date."],
  ["03", "We Deliver", "We hand-pack, gift-wrap and ship it straight to their door."],
];

function WardrobeCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 grid size-10 place-items-center rounded-full border border-border bg-background/95 shadow-lg transition hover:bg-primary hover:text-primary-foreground disabled:opacity-30 disabled:hover:bg-background"
        aria-label="Previous products"
      >
        <ChevronLeft className="size-5" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 grid size-10 place-items-center rounded-full border border-border bg-background/95 shadow-lg transition hover:bg-primary hover:text-primary-foreground disabled:opacity-30 disabled:hover:bg-background"
        aria-label="Next products"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              to="/product/$slug"
              params={{ slug: p.slug }}
              className="group block min-w-0 shrink-0 overflow-hidden border border-border bg-card basis-[calc(50%-0.375rem)] sm:basis-[calc(33.333%-0.5rem)] lg:basis-[calc(25%-0.5625rem)]"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted flex items-center justify-center">
                <img
                  src={p.images[0]}
                  alt={`${p.name} product`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
      </div>
    </div>
  );
}

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
      
      {/* SEO Schema for Google */}
      <OrganizationSchema url="https://vyrox.com" />
      
      <section ref={sceneRef} className="relative h-dvh md:h-[300vh]" aria-label="VYROX gift hamper introduction">
        <div className="sticky top-0 h-dvh overflow-hidden border-b border-border bg-hero-gift">
          <div className="hero-grid absolute inset-0 opacity-25" />

          <nav className="absolute inset-x-0 top-0 z-50 mx-auto hidden max-w-[1500px] items-center justify-between gap-4 px-9 py-5 md:flex">
            <Link to="/" className="min-w-0 font-logo text-2xl tracking-[0.35em] text-primary sm:text-3xl">VYROX<span className="text-foreground">╱</span></Link>
            <div className="hidden items-center gap-7 text-[10px] font-semibold uppercase tracking-widest lg:flex">
              <Link className="text-primary" to="/">Home</Link>
              <Link to="/hampers">Hampers</Link>
              <a href="#occasions">Occasions</a>
              <a href="#how">How it works</a>
              <Link to="/wardrobe">Wardrobe</Link>
              <a href="#join">Contact</a>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="icon" aria-label="Search"><Search className="size-4" /></Button>
              <DesktopCartButton />
              <Link to="/hampers" className={`${buttonVariants()} hidden h-10 px-4 sm:inline-flex`}>Shop Hampers</Link>
            </div>
          </nav>

          <div className="absolute inset-0 flex items-center justify-center pt-12">
            {/* Big VYROX outline word — desktop only */}
            <div
              className="absolute right-[4vw] top-[10%] z-10 hidden text-right font-display text-[17vw] font-black leading-none tracking-[-0.08em] text-transparent hero-outline pointer-events-none sm:block"
              style={{ opacity: words, transform: `translateX(${(1 - words) * 120}px) scale(${0.85 + words * 0.15})` }}
            >
              VYROX
            </div>

            {/* ── MOBILE hero layout ── */}
            <div className="absolute inset-0 flex flex-col sm:hidden bg-hero-gift">
              <div className="hero-grid absolute inset-0 opacity-20" />

              {/* Image — absolute, fills bottom 65% of screen, overlaps text */}
              <img
                src={hamperHero}
                alt="VYROX premium gift hamper"
                className="absolute bottom-0 left-1/2 z-0 w-[120%] max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-hero"
                style={{ top: "25%" }}
              />

              {/* Gradient — fades image into background at bottom */}
              <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-background to-transparent" />

              {/* TOP — text centered */}
              <div className="relative z-20 flex flex-col items-center px-5 pt-10 text-center">
                <p
                  className="font-display font-black leading-none tracking-[-0.05em] select-none"
                  style={{ fontSize: "22vw", WebkitTextStroke: "2px #b51d2a", color: "transparent" }}
                >
                  VYROX
                </p>
                <p className="font-serif-italic text-sm text-gold">Especially for you.</p>
                <h1 className="font-display text-[11vw] font-black uppercase leading-[0.9] tracking-tight">
                  Gift the <span className="text-primary">feeling.</span>
                </h1>
                <div className="mt-3 flex gap-2">
                  <Link to="/hampers" className={`${buttonVariants()} h-9 px-5 text-[11px]`}>Shop Hampers</Link>
                  <a href="#occasions" className={`${buttonVariants({ variant: "outline" })} h-9 px-5 text-[11px]`}>Occasions</a>
                </div>
              </div>
            </div>

            {/* ── DESKTOP hero layout — parallax ── */}
            {/* Left side gifting statement */}
            <div
              className="absolute left-[5vw] top-[26%] z-20 hidden max-w-[36rem] sm:block"
              style={{ opacity: words, transform: `translateX(${(1 - words) * -80}px)` }}
            >
              <p className="mb-2 font-serif-italic text-lg text-gold sm:text-2xl">Especially for you.</p>
              <h1 className="font-display text-[6.5vw] font-black uppercase leading-[0.85] tracking-tight lg:text-[5.5rem]">
                Gift the<br />
                <span className="text-primary">feeling.</span>
              </h1>
              <p className="mt-5 max-w-md text-xs font-medium leading-relaxed text-muted-foreground">
                Premium gift hampers, hand-packed with roses, perfume, chocolates & VYROX apparel — for the ones who matter most.
              </p>
              <div className="mt-6 flex gap-3">
                <Link to="/hampers" className={`${buttonVariants()} h-12 px-7`}>Shop Hampers</Link>
                <a href="#occasions" className={`${buttonVariants({ variant: "outline" })} h-12 px-7`}>By Occasion</a>
              </div>
            </div>

            {/* The hamper box — desktop parallax */}
            <div
              className="absolute inset-x-0 bottom-0 z-30 hidden justify-center sm:flex"
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
            <div className="mx-auto grid max-w-[1500px] grid-cols-3 gap-8 px-9 py-4">
              {benefits.map(([Icon, title, copy]) => (
                <div key={title} className="flex items-center gap-3">
                  <Icon className="size-6 text-primary" />
                  <div><b className="block font-display text-xs">{title}</b><span className="text-[10px] text-muted-foreground">{copy}</span></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SIGNATURE HAMPERS */}
      <section id="hampers" className="border-b border-border py-16">
        <div className="section-shell">
          {/* Header row */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Curated Boxes
              </p>
              <h2 className="mt-1 font-display text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                Signature <span className="text-primary">Hampers</span>
              </h2>
              <p className="mt-2 font-serif-italic text-base text-gold">Every box, packed with love.</p>
            </div>
            <Link
              to="/hampers"
              className="hidden shrink-0 items-center gap-2 font-display text-[10px] font-bold uppercase tracking-widest text-primary hover:underline md:inline-flex"
            >
              View all hampers <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Grid — same pattern as /hampers page */}
          <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {HAMPERS.slice(0, 4).map((h) => (
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
                    <span className="font-display text-base font-black sm:text-lg">{h.priceLabel}</span>
                    {h.originalPrice && (
                      <span className="text-[10px] text-muted-foreground/50 line-through">{h.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile view all */}
          <div className="mt-5 text-center md:hidden">
            <Link
              to="/hampers"
              className="inline-flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-widest text-primary"
            >
              View all hampers <ArrowRight className="size-3.5" />
            </Link>
          </div>
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

      {/* WARDROBE — clothing carousel */}
      <section id="wardrobe" className="section-shell border-b border-border py-20">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">Also from VYROX</p>
            <h2 className="section-title">Shop the <span className="text-primary">Wardrobe</span></h2>
            <p className="mt-2 text-sm text-muted-foreground">The same premium quality, worn every day.</p>
          </div>
          <Link
            to="/wardrobe"
            className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-primary hover:underline"
          >
            View All <ArrowRight className="size-4" />
          </Link>
        </div>
        <WardrobeCarousel />
      </section>

      {/* TESTIMONIALS */}
      <section className="border-b border-border py-20">
        <div className="section-shell">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Real people · Real gifts
            </p>
            <h2 className="mt-2 font-display text-4xl font-black uppercase leading-none sm:text-5xl">
              Loved by <span className="text-primary">gift-givers</span>
            </h2>
            <p className="mt-3 font-serif-italic text-base text-gold">Real stories from real celebrations.</p>
            <div className="mx-auto mt-5 h-px w-12 bg-gold" />
          </div>

          {/* Cards */}
          <div className="grid gap-px bg-border md:grid-cols-3">
            {[
              {
                quote: "Ordered the Luxury hamper for our anniversary. She actually cried. The packaging was on another level.",
                name: "Rohit M.",
                occasion: "Anniversary",
              },
              {
                quote: "The Midnight Romance box was perfect for our proposal night. Every single detail felt premium.",
                name: "Aryan S.",
                occasion: "Proposal",
              },
              {
                quote: "Sent the Signature box to my brother on rakhi. He called me the moment he opened it. Worth every rupee.",
                name: "Karan D.",
                occasion: "Rakhi",
              },
            ].map(({ quote, name, occasion }) => (
              <blockquote key={name} className="flex flex-col bg-card px-7 py-8">
                {/* Big quote mark */}
                <span className="font-serif-italic text-5xl leading-none text-primary/40 select-none">"</span>
                <p className="mt-3 flex-1 text-sm leading-7 text-foreground/80">{quote}</p>
                <footer className="mt-8 flex items-center justify-between border-t border-border pt-5">
                  <div>
                    <p className="font-display text-sm font-bold uppercase tracking-wide">{name}</p>
                    <p className="mt-0.5 font-display text-[10px] uppercase tracking-widest text-primary">{occasion}</p>
                  </div>
                  <span className="text-lg tracking-widest text-gold">★★★★★</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className="relative overflow-hidden border-y border-border bg-background">
        <div className="section-shell py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-serif-italic text-base text-gold">Connect with us.</p>
            <h2 className="mt-2 font-display text-4xl font-black uppercase leading-tight tracking-tight sm:text-5xl">
              Join the VYROX <span className="text-primary">culture</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              Follow our journey, explore new drops, and join the community for exclusive updates.
            </p>

            {/* Simple divider */}
            <div className="mx-auto my-10 h-px w-16 bg-border" />

            {/* Contact Info - Minimal Layout */}
            <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
              {/* Location */}
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-widest text-primary">Location</p>
                <p className="mt-2 text-base font-medium">Trivandrum, India</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Pan India Shipping</p>
              </div>

              {/* Divider for desktop */}
              <div className="hidden h-12 w-px bg-border sm:block" />

              {/* Phone */}
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-widest text-primary">Phone</p>
                <a 
                  href="tel:+918848303003" 
                  className="mt-2 block text-base font-medium transition hover:text-primary"
                >
                  +91 884 830 3003
                </a>
                <p className="mt-0.5 text-xs text-muted-foreground">Available 9 AM - 9 PM</p>
              </div>
            </div>

            {/* Instagram Button */}
            <div className="mt-12">
              <a
                href="https://www.instagram.com/vyrox990?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 bg-primary px-8 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:scale-[1.02]"
              >
                <Instagram className="size-4" /> Follow @vyrox990
              </a>
              
            </div>
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
