import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Box, Headphones, RefreshCw, Search, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { Button } from "../components/ui/button";
import { MobileChrome } from "../components/mobile-shell";
import { useCart } from "../lib/cart";
import { PRODUCTS, PRODUCT_IMAGE } from "../lib/products";
import heroModels from "../assets/vyrox-hero-models-v2.png";
import collectionsImage from "../assets/vyrox-collections.jpg";
import campaignImage from "../assets/vyrox-campaign.jpg";
import newsletterImage from "../assets/vyrox-newsletter.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VYROX Streetwear — Wear Your Attitude" },
      { name: "description", content: "Premium oversized streetwear for those who make a statement. Explore the latest VYROX collection." },
      { property: "og:title", content: "VYROX Streetwear — Wear Your Attitude" },
      { property: "og:description", content: "Not just a T-shirt. It's a statement." },
    ],
  }),
  component: Index,
});

const collections = ["OVERSIZED TEES", "PREMIUM TEES", "ACCESSORIES", "GIFT BOX"];

const benefits = [
  [Truck, "FREE SHIPPING", "On Orders Above ₹999"],
  [RefreshCw, "EASY RETURNS", "7 Days Return Policy"],
  [ShieldCheck, "QUALITY ASSURED", "Premium Products"],
  [Headphones, "CUSTOMER SUPPORT", "We're Here to Help"],
] as const;

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
      <section ref={sceneRef} className="relative h-[300vh]" aria-label="VYROX campaign introduction">
        <div className="sticky top-0 h-dvh overflow-hidden border-b border-border bg-hero">
          <div className="hero-grid absolute inset-0 opacity-30" />
          <nav className="absolute inset-x-0 top-0 z-50 mx-auto grid max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 sm:flex sm:justify-between sm:px-9">
            <a href="#top" className="min-w-0 font-logo text-2xl tracking-[0.35em] text-primary sm:text-3xl">VYROX<span className="text-foreground">╱</span></a>
            <div className="hidden items-center gap-7 text-[10px] font-semibold uppercase tracking-widest lg:flex">
              <a className="text-primary" href="#top">Home</a><a href="#best">Shop</a><a href="#best">Oversized Tees</a><a href="#collections">Collections</a><a href="#join">Gift Box</a><a href="#join">Track Order</a><a href="#join">Contact</a>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="icon" aria-label="Search"><Search className="size-4" /></Button>
              <Button variant="ghost" size="icon" aria-label="Shopping bag"><ShoppingBag className="size-4" /></Button>
              <Button className="hidden sm:inline-flex">Shop Now</Button>
            </div>
          </nav>

          <div className="absolute inset-0 flex items-center justify-center pt-12">
            <div className="absolute inset-x-[4vw] top-[18%] z-10 text-center font-display text-[24vw] font-black leading-none tracking-[-0.08em] text-transparent hero-outline sm:top-[12%] sm:text-[17vw]" style={{ opacity: words, transform: `translateY(${(1 - words) * 70}px) scale(${0.82 + words * 0.18})` }}>VYROX</div>

            <div className="absolute left-[5vw] top-[24%] z-20 max-w-[34rem]" style={{ opacity: words, transform: `translateX(${(1 - words) * -80}px)` }}>
              <p className="mb-2 font-display text-sm font-bold uppercase tracking-widest text-primary sm:text-lg">Not just a T-shirt.</p>
              <h1 className="font-display text-[15vw] font-black uppercase leading-[0.8] tracking-tight sm:text-[7vw] lg:text-[6rem]">It’s a<br/><span className="text-primary">Statement.</span></h1>
              <p className="mt-5 hidden text-xs font-bold uppercase tracking-[0.25em] sm:block">Premium style. Premium you.</p>
              <div className="mt-6 hidden gap-3 sm:flex"><Button className="h-12 px-7">Shop Now</Button><Button className="h-12 px-7" variant="outline">View Collection</Button></div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center" style={{ transform: `translateY(${progress * 12}px) scale(${0.94 + progress * 0.06})` }}><img src={heroModels} alt="Female and male VYROX models in crimson tailoring" width={1024} height={1536} className="h-auto w-[96vw] max-w-none object-contain drop-shadow-hero sm:h-[92vh] sm:w-auto" /></div>

            <div className="absolute bottom-[15%] right-[5vw] z-40 hidden w-44 border border-border bg-panel/90 p-3 backdrop-blur md:block" style={{ opacity: details, transform: `translateY(${(1 - details) * 50}px)` }}>
              <p className="font-display text-lg font-black uppercase text-primary">New Drop</p><p className="font-display text-lg font-bold uppercase">Limited Edition</p><div className="mt-3 h-20 bg-primary/10"><Box className="mx-auto h-full w-10 text-primary" /></div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-40 hidden border-t border-border bg-background/75 backdrop-blur-sm lg:block" style={{ opacity: details }}>
            <div className="mx-auto grid max-w-[1500px] grid-cols-4 gap-8 px-9 py-4">
              {benefits.map(([Icon, title, copy]) => <div key={title} className="flex items-center gap-3"><Icon className="size-6 text-primary"/><div><b className="block font-display text-xs">{title}</b><span className="text-[10px] text-muted-foreground">{copy}</span></div></div>)}
            </div>
          </div>
          <div className="absolute bottom-5 left-5 z-50 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground lg:hidden">Scroll to reveal · {Math.round(progress * 100)}%</div>
        </div>
      </section>

      <section id="best" className="section-shell border-b border-border py-20">
        <div className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="section-kicker">Trending Now</p><h2 className="section-title">Best Sellers</h2></div><div className="flex gap-7 text-[10px] font-bold uppercase tracking-widest"><span className="text-primary">All</span><span>T-Shirts</span><span>Accessories</span><span>Combos</span></div></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(([name, price], index) => <article key={name} className="group overflow-hidden border border-border bg-card"><div className="aspect-[4/5] overflow-hidden"><img src={productsImage} alt={`${name} product`} loading="lazy" width={1536} height={864} className="h-full w-[400%] max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.03]" style={{ transform: `translateX(-${index * 25}%)` }}/></div><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border p-4"><div className="min-w-0"><h3 className="truncate text-xs">{name}</h3><p className="mt-1 text-xs">{price}</p></div><ShoppingBag className="size-4 shrink-0"/></div></article>)}
        </div>
      </section>

      <section id="collections" className="section-shell border-b border-border py-20">
        <div className="mb-8 flex items-center justify-between"><h2 className="section-title">Explore Our <span className="text-primary">Collections</span></h2><div className="flex gap-2"><Button variant="outline" size="icon"><ArrowLeft className="size-4"/></Button><Button variant="outline" size="icon"><ArrowRight className="size-4"/></Button></div></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{collections.map((name, index) => <article key={name} className="group relative aspect-[4/5] overflow-hidden border border-border"><img src={collectionsImage} alt={name} loading="lazy" width={1536} height={864} className="h-full w-[400%] max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.04]" style={{ transform: `translateX(-${index * 25}%)` }}/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-5 pt-20"><h3 className="font-display text-xl font-bold">{name}</h3><p className="mt-3 text-[9px] font-bold text-primary">SHOP NOW →</p></div></article>)}</div>
      </section>

      <section className="relative min-h-[680px] overflow-hidden border-b border-border"><img src={campaignImage} alt="VYROX attitude streetwear campaign" loading="lazy" width={1536} height={864} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-campaign"/><div className="section-shell relative z-10 flex min-h-[680px] items-center"><div className="max-w-md"><h2 className="section-title text-5xl sm:text-7xl">Wear <span className="text-primary">VYROX.</span><br/>Own the attitude.</h2><p className="mt-5 text-sm text-muted-foreground">Fashion that speaks before you do.</p><Button variant="outline" className="mt-7 h-12 px-7">Explore Now</Button></div></div></section>

      <section className="section-shell grid gap-px border-b border-border bg-border py-px sm:grid-cols-2 lg:grid-cols-4">{benefits.map(([Icon, title, copy]) => <div key={title} className="flex items-center gap-4 bg-background px-5 py-8"><Icon className="size-7 text-primary"/><div><b className="font-display text-sm">{title}</b><p className="mt-1 text-[10px] text-muted-foreground">{copy}</p></div></div>)}</section>

      <section className="section-shell py-20"><h2 className="section-title mb-9 text-center">What Our <span className="text-primary">Customers</span> Say</h2><div className="grid gap-4 md:grid-cols-3">{[["Amazing quality and perfect fit. Vyrox is not just a brand, it’s an attitude!","Rohit M."],["The oversized tees are next level. Got so many compliments!","Aryan S."],["Loved the packaging and the free gift. Will shop again for sure.","Karan D."]].map(([quote,name]) => <blockquote key={name} className="border border-border bg-card p-6"><div className="mb-4 tracking-widest text-primary">★★★★★</div><p className="min-h-14 text-xs leading-6 text-muted-foreground">{quote}</p><footer className="mt-6 text-xs">— {name}</footer></blockquote>)}</div></section>

      <section id="join" className="relative overflow-hidden border-y border-border"><img src={newsletterImage} alt="VYROX black hoodie campaign" loading="lazy" width={1536} height={768} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-newsletter"/><div className="section-shell relative z-10 grid min-h-[390px] items-center py-16 md:grid-cols-2"><div className="md:col-start-2"><h2 className="section-title">Join the VYROX movement</h2><p className="mt-3 text-sm">Be bold. Be you. Be Vyrox.</p><form className="mt-7 flex max-w-xl flex-col gap-2 sm:flex-row" onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" placeholder="Enter your email" className="h-12 min-w-0 flex-1 border border-border bg-background/80 px-4 text-xs outline-none focus:border-primary"/><Button type="submit" className="h-12 px-8">Join Now</Button></form></div></div></section>
      <footer className="section-shell flex flex-col gap-4 py-8 text-[10px] uppercase tracking-widest text-muted-foreground sm:flex-row sm:justify-between"><span>© 2026 VYROX. Wear your attitude.</span><span>Privacy · Terms · Shipping</span></footer>
    </main>
  );
}
