import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  ChevronLeft,
  Minus,
  PackageCheck,
  Plus,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Truck,
  X,
  ZoomIn,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { toast } from "sonner";
import { MobileChrome } from "../components/mobile-shell";
import { getHamper, HAMPERS } from "../lib/hampers";
import { SIZE_CHART, SIZES } from "../lib/products";
import { useCart } from "../lib/cart";
import { HamperSchema } from "../components/seo-schema";

export const Route = createFileRoute("/hamper/$slug")({
  loader: ({ params }) => {
    const hamper = getHamper(params.slug);
    if (!hamper) throw notFound();
    return { hamper };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.hamper.name} — VYROX Gift Hampers` },
          { name: "description", content: loaderData.hamper.tagline },
          { property: "og:title", content: `${loaderData.hamper.name} — VYROX` },
          { property: "og:description", content: loaderData.hamper.tagline },
        ]
      : [],
  }),
  component: HamperPage,
});

function HamperPage() {
  const { hamper } = Route.useLoaderData();
  const navigate = useNavigate();
  const { add } = useCart();
  const [size, setSize] = useState("L");
  const [qty, setQty] = useState(1);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [handwritten, setHandwritten] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  const total = hamper.price * qty + (handwritten ? 49 * qty : 0);

  const addToCart = () => {
    add({
      slug: hamper.slug,
      name: hamper.name + (recipient ? ` — for ${recipient}` : ""),
      price: hamper.price + (handwritten ? 49 : 0),
      size: hamper.includesApparel ? size : "One Size",
      qty,
    });
    toast.success(`${hamper.name} added to cart`, {
      description: recipient ? `For ${recipient}` : undefined,
    });
  };

  const buyNow = () => {
    addToCart();
    navigate({ to: "/checkout" });
  };

  return (
    <main className="bg-background text-foreground">
      <MobileChrome />
      
      {/* SEO Schema for Google */}
      <HamperSchema 
        hamper={hamper} 
        url={`https://vyrox.com/hamper/${hamper.slug}`} 
      />

      {/* ── DESKTOP: full-bleed two-panel layout ── */}
      <div className="hidden md:flex md:h-[calc(100vh-0px)] md:overflow-hidden">

        {/* LEFT — image fills entire panel, no border, no padding */}
        <div className="relative w-1/2 shrink-0">
          <button
            onClick={() => setLightbox(true)}
            className="group block h-full w-full focus:outline-none"
            aria-label="View full image"
          >
            <img
              src={hamper.image}
              alt={`${hamper.name} - Premium gift hamper from VYROX`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Gradient overlay so top badges read */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
            {/* Gradient at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
          </button>

          {/* Back link — top left over image */}
          <Link
            to="/hampers"
            className="absolute left-6 top-6 z-10 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/80 hover:text-white"
          >
            <ChevronLeft className="size-3.5" /> All Hampers
          </Link>

          {/* Price badge — bottom left over image */}
          <div className="absolute bottom-6 left-6 z-10">
            <span className="bg-gold px-4 py-1.5 font-display text-sm font-black uppercase tracking-widest text-background">
              {hamper.priceLabel}
            </span>
            {hamper.originalPrice && (
              <span className="ml-2 text-xs text-white/60 line-through">{hamper.originalPrice}</span>
            )}
          </div>

          {/* Zoom hint — bottom right */}
          <button
            onClick={() => setLightbox(true)}
            className="absolute bottom-6 right-6 z-10 flex items-center gap-1.5 bg-black/50 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white/80 backdrop-blur hover:text-white"
          >
            <ZoomIn className="size-3.5" /> Zoom
          </button>
        </div>

        {/* RIGHT — scrollable purchase panel */}
        <div className="flex w-1/2 flex-col overflow-y-auto border-l border-border bg-card">
          {/* Inner padding */}
          <div className="flex flex-1 flex-col px-10 py-10 xl:px-14 xl:py-12">

            {/* Kicker + name */}
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Gift Hamper · For {hamper.audience}
            </p>
            <h1 className="mt-2 font-display text-3xl font-black uppercase leading-tight tracking-tight xl:text-4xl">
              {hamper.name}
            </h1>
            <p className="mt-1.5 font-serif-italic text-base text-gold">{hamper.tagline}</p>

            {/* Price row */}
            <div className="mt-5 flex items-baseline gap-3 border-b border-border pb-5">
              <span className="font-display text-3xl font-black">{hamper.priceLabel}</span>
              {hamper.originalPrice && (
                <span className="text-xs text-muted-foreground/50 line-through">
                  {hamper.originalPrice}
                </span>
              )}
              <span className="ml-auto rounded-sm bg-primary/10 px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-widest text-primary">
                Limited offer
              </span>
            </div>

            {/* What's inside — clean numbered list, not chips */}
            <div className="mt-5 border-b border-border pb-5">
              <p className="mb-3 font-display text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                What's inside
              </p>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                {hamper.contents.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-xs text-foreground/80">
                    <Check className="size-3.5 shrink-0 text-primary" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Personalize */}
            <div className="mt-5 border-b border-border pb-5">
              <p className="mb-3 font-display text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                Personalize
              </p>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Recipient's name"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="h-9 border border-border bg-background/40 px-3 text-xs outline-none focus:border-primary"
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-9 border border-border bg-background/40 px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div className="relative">
                  <textarea
                    placeholder="Gift message (up to 200 characters)"
                    value={message}
                    maxLength={200}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    className="w-full resize-none border border-border bg-background/40 px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                  <span className="absolute bottom-2 right-2 text-[9px] text-muted-foreground">
                    {message.length}/200
                  </span>
                </div>
                <label className="flex cursor-pointer items-center justify-between border border-border bg-background/40 px-3 py-2 text-xs hover:border-gold/50">
                  <span className="font-serif-italic text-gold">
                    Add a handwritten note{" "}
                    <span className="font-sans not-italic text-muted-foreground">(+₹49)</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={handwritten}
                    onChange={(e) => setHandwritten(e.target.checked)}
                    className="size-4 accent-primary"
                  />
                </label>
              </div>
            </div>

            {/* Size */}
            {hamper.includesApparel && (
              <div className="mt-5 border-b border-border pb-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                    Shirt Size
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                        <Ruler className="size-3" /> Size chart
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-card">
                      <DialogHeader>
                        <DialogTitle className="font-display uppercase">Size Chart (inches)</DialogTitle>
                      </DialogHeader>
                      <table className="w-full border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-border text-left">
                            <th className="py-2">Size</th>
                            <th>Chest</th>
                            <th>Length</th>
                            <th>Shoulder</th>
                          </tr>
                        </thead>
                        <tbody>
                          {SIZE_CHART.map((row) => (
                            <tr key={row.size} className="border-b border-border/60">
                              <td className="py-2 font-bold">{row.size}</td>
                              <td>{row.chest}"</td>
                              <td>{row.length}"</td>
                              <td>{row.shoulder}"</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`grid h-9 w-11 place-items-center border font-display text-xs font-bold transition-colors ${
                        size === s
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Total */}
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease"
                  className="grid size-9 place-items-center text-muted-foreground hover:text-primary"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-10 text-center font-display text-sm font-bold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase"
                  className="grid size-9 place-items-center text-muted-foreground hover:text-primary"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total</p>
                <p className="font-display text-2xl font-black text-gold">
                  ₹{total.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Button 
                onClick={addToCart} 
                variant="outline" 
                className="h-12"
                aria-label={`Add ${hamper.name} to cart`}
              >
                <ShoppingBag className="mr-2 size-4" /> Add to Cart
              </Button>
              <Button 
                onClick={buyNow} 
                className="h-12"
                aria-label={`Buy ${hamper.name} now`}
              >
                Buy Now
              </Button>
            </div>

            {/* Trust */}
            <ul className="mt-5 flex gap-5 text-[10px] text-muted-foreground">
              <li className="flex items-center gap-1.5"><Truck className="size-3.5 text-primary" /> Free shipping ₹999+</li>
              <li className="flex items-center gap-1.5"><PackageCheck className="size-3.5 text-primary" /> Packed in 24h</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-primary" /> Gift-ready</li>
            </ul>

            {/* Description accordion — below the fold, accessible but not crowding */}
            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="desc">
                <AccordionTrigger className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                  About this hamper
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
                  {hamper.description}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ship">
                <AccordionTrigger className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                  Shipping &amp; Returns
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
                  Hand-packed within 24 hours. Delivered in 3–5 business days across India.
                  Personalized hampers are non-returnable.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* ── MOBILE: stacked layout ── */}
      <div className="md:hidden">
        {/* Full-width image */}
        <div className="relative">
          <button
            onClick={() => setLightbox(true)}
            className="block w-full focus:outline-none"
            aria-label="View full image"
          >
            <img
              src={hamper.image}
              alt={`${hamper.name} - Gift hamper`}
              className="aspect-square w-full object-cover"
            />
          </button>
          <Link
            to="/hampers"
            className="absolute left-4 top-4 inline-flex items-center gap-1 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur"
          >
            <ChevronLeft className="size-3" /> Back
          </Link>
          <span className="absolute bottom-4 left-4 bg-gold px-3 py-1 font-display text-[10px] font-black uppercase tracking-widest text-background">
            {hamper.priceLabel}
          </span>
        </div>

        {/* Mobile content */}
        <div className="space-y-5 px-4 pb-40 pt-5">
          <div>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Gift Hamper</p>
            <h1 className="mt-1 font-display text-2xl font-black uppercase leading-tight">{hamper.name}</h1>
            <p className="mt-1 font-serif-italic text-sm text-gold">{hamper.tagline}</p>
          </div>

          <div className="flex items-baseline gap-3 border-b border-border pb-4">
            <span className="font-display text-2xl font-black">{hamper.priceLabel}</span>
            {hamper.originalPrice && (
              <span className="text-xs text-muted-foreground/50 line-through">{hamper.originalPrice}</span>
            )}
          </div>

          {/* What's inside */}
          <div>
            <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-widest text-muted-foreground">What's inside</p>
            <ul className="grid grid-cols-2 gap-y-1.5 gap-x-3">
              {hamper.contents.map((c) => (
                <li key={c} className="flex items-center gap-1.5 text-xs text-foreground/80">
                  <Check className="size-3 shrink-0 text-primary" /> {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Personalize */}
          <div className="space-y-2 border-t border-border pt-4">
            <p className="font-display text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Personalize</p>
            <input
              type="text"
              placeholder="Recipient's name"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="h-10 w-full border border-border bg-background/60 px-3 text-xs outline-none focus:border-primary"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-10 w-full border border-border bg-background/60 px-3 text-xs outline-none focus:border-primary"
            />
            <div className="relative">
              <textarea
                placeholder="Gift message (up to 200 characters)"
                value={message}
                maxLength={200}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                className="w-full resize-none border border-border bg-background/60 px-3 py-2 text-xs outline-none focus:border-primary"
              />
              <span className="absolute bottom-2 right-2 text-[9px] text-muted-foreground">
                {message.length}/200
              </span>
            </div>
            <label className="flex cursor-pointer items-center justify-between border border-border bg-background/60 px-3 py-2.5 text-xs">
              <span className="font-serif-italic text-gold">Add handwritten note <span className="font-sans not-italic text-muted-foreground">(+₹49)</span></span>
              <input type="checkbox" checked={handwritten} onChange={(e) => setHandwritten(e.target.checked)} className="size-4 accent-primary" />
            </label>
          </div>

          {/* Size */}
          {hamper.includesApparel && (
            <div className="border-t border-border pt-4">
              <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Shirt Size</p>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`grid h-9 w-11 place-items-center border font-display text-xs font-bold ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Qty */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-9 place-items-center text-muted-foreground"><Minus className="size-3.5" /></button>
              <span className="w-10 text-center font-display text-sm font-bold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid size-9 place-items-center text-muted-foreground"><Plus className="size-3.5" /></button>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Total</p>
              <p className="font-display text-xl font-black text-gold">₹{total.toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>

        {/* Mobile buy bar */}
        <div className="fixed inset-x-0 bottom-16 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-3 backdrop-blur">
          <Button 
            onClick={addToCart} 
            variant="outline" 
            className="h-11"
            aria-label={`Add ${hamper.name} to cart`}
          >
            Add to Cart
          </Button>
          <Button 
            onClick={buyNow} 
            className="h-11"
            aria-label={`Buy ${hamper.name} for ${total.toLocaleString("en-IN")} rupees`}
          >
            Buy · ₹{total.toLocaleString("en-IN")}
          </Button>
        </div>
      </div>

      {/* ── MORE HAMPERS ── */}
      <div className="section-shell border-t border-border py-12">
        <h2 className="mb-6 font-display text-2xl font-black uppercase">
          More <span className="text-primary">hampers</span>
        </h2>
        <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-3">
          {HAMPERS.filter((p) => p.slug !== hamper.slug).map((p) => (
            <Link
              key={p.slug}
              to="/hamper/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col bg-card"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-xs font-bold uppercase sm:text-sm">{p.name}</h3>
                <p className="mt-0.5 font-serif-italic text-[11px] text-gold">{p.tagline}</p>
                <p className="mt-2 font-display text-base font-black">{p.priceLabel}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute right-5 top-5 grid size-10 place-items-center border border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <X className="size-5" />
          </button>
          <img
            src={hamper.image}
            alt={`${hamper.name} - Full view`}
            className="max-h-[92vh] max-w-[92vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
