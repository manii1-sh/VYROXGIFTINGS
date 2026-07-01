import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronLeft, Gift, Heart, Minus, PackageCheck, Plus, Ruler, ShieldCheck, ShoppingBag, Sparkles, Star, Truck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { toast } from "sonner";
import { MobileChrome } from "../components/mobile-shell";
import { getHamper, HAMPERS } from "../lib/hampers";
import { SIZE_CHART, SIZES } from "../lib/products";
import { useCart } from "../lib/cart";

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

  const total = hamper.price * qty + (handwritten ? 49 * qty : 0);

  const addToCart = () => {
    add({
      slug: hamper.slug,
      name: hamper.name + (recipient ? ` — for ${recipient}` : ""),
      price: hamper.price + (handwritten ? 49 : 0),
      size: hamper.includesApparel ? size : "One Size",
      qty,
    });
    toast.success(`Added ${hamper.name} to cart`, {
      description: message ? `Message: "${message.slice(0, 40)}${message.length > 40 ? "…" : ""}"` : undefined,
    });
  };

  const buyNow = () => {
    addToCart();
    navigate({ to: "/checkout" });
  };

  return (
    <main className="bg-background text-foreground">
      <MobileChrome />

      <div className="section-shell pt-4 pb-32 md:pt-8 md:pb-16">
        <Link to="/" className="mb-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
          <ChevronLeft className="size-4" /> Back to hampers
        </Link>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
              <img src={hamper.image} alt={hamper.name} width={1024} height={1280} className="h-full w-full object-cover" />
              <span className="absolute left-3 top-3 bg-gold px-3 py-1 font-display text-[10px] font-black uppercase tracking-widest text-background">
                Just {hamper.priceLabel}
              </span>
              <button aria-label="Wishlist" className="absolute right-3 top-3 grid size-10 place-items-center border border-border bg-background/80 backdrop-blur">
                <Heart className="size-4" />
              </button>
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="section-kicker">Gift Hamper</p>
            <h1 className="section-title mt-2">{hamper.name}</h1>
            <p className="mt-2 font-serif-italic text-lg text-gold">{hamper.tagline}</p>

            <div className="mt-3 flex items-center gap-3">
              <span className="flex tracking-widest text-primary">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-4 fill-current" />)}
              </span>
              <span className="text-xs text-muted-foreground">(184 reviews)</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl font-black">{hamper.priceLabel}</span>
              {hamper.originalPrice && <span className="text-xs text-muted-foreground line-through">{hamper.originalPrice}</span>}
              <span className="font-display text-xs font-bold uppercase text-primary">Limited offer</span>
            </div>

            {/* What's inside */}
            <div className="mt-7 border border-gold/40 bg-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <Gift className="size-4 text-gold" />
                <h2 className="font-display text-sm font-bold uppercase tracking-widest">What's inside the box</h2>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {hamper.contents.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-xs">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Personalize */}
            <div className="mt-7">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="size-4 text-gold" />
                <h2 className="font-display text-sm font-bold uppercase tracking-widest">Personalize your gift</h2>
              </div>
              <div className="grid gap-3">
                <input
                  type="text"
                  placeholder="Recipient's name (e.g. Aisha)"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="h-11 border border-border bg-background/60 px-3 text-sm outline-none focus:border-primary"
                />
                <textarea
                  placeholder="Gift message (up to 200 characters)"
                  value={message}
                  maxLength={200}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-11 border border-border bg-background/60 px-3 text-sm outline-none focus:border-primary"
                />
                <label className="flex cursor-pointer items-center justify-between border border-border bg-background/60 px-3 py-3 text-sm">
                  <span className="flex items-center gap-2">
                    <span className="font-serif-italic text-gold">Add a handwritten note</span>
                    <span className="text-xs text-muted-foreground">(+₹49)</span>
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

            {/* Size (only if apparel) */}
            {hamper.includesApparel && (
              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <p className="font-display text-xs font-bold uppercase tracking-widest">Shirt Size</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                        <Ruler className="size-3" /> Size Chart
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-card">
                      <DialogHeader><DialogTitle className="font-display uppercase">Size Chart (inches)</DialogTitle></DialogHeader>
                      <table className="w-full border-collapse text-xs">
                        <thead><tr className="border-b border-border text-left"><th className="py-2">Size</th><th>Chest</th><th>Length</th><th>Shoulder</th></tr></thead>
                        <tbody>
                          {SIZE_CHART.map((row) => (
                            <tr key={row.size} className="border-b border-border/60">
                              <td className="py-2 font-bold">{row.size}</td><td>{row.chest}"</td><td>{row.length}"</td><td>{row.shoulder}"</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`grid h-11 min-w-11 place-items-center border px-3 font-display text-sm font-bold ${
                        size === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="mt-7">
              <p className="font-display text-xs font-bold uppercase tracking-widest">Quantity</p>
              <div className="mt-2 inline-flex items-center border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="grid size-11 place-items-center hover:text-primary"><Minus className="size-4" /></button>
                <span className="w-10 text-center font-display text-base font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="grid size-11 place-items-center hover:text-primary"><Plus className="size-4" /></button>
              </div>
            </div>

            {/* Total + desktop actions */}
            <div className="mt-7 flex items-baseline justify-between border-t border-border pt-4">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">Total</span>
              <span className="font-display text-2xl font-black text-gold">₹{total.toLocaleString("en-IN")}</span>
            </div>

            <div className="mt-4 hidden gap-3 md:flex">
              <Button onClick={addToCart} variant="outline" className="h-12 flex-1"><ShoppingBag className="mr-2 size-4" />Add to Cart</Button>
              <Button onClick={buyNow} className="h-12 flex-1">Buy Now</Button>
            </div>

            {/* Trust */}
            <ul className="mt-6 grid grid-cols-3 gap-3 text-[11px] text-muted-foreground">
              <li className="flex items-center gap-2"><Truck className="size-4 text-primary" />Free shipping ₹999+</li>
              <li className="flex items-center gap-2"><PackageCheck className="size-4 text-primary" />Hand-packed 24h</li>
              <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" />Gift-ready wrap</li>
            </ul>

            {/* Accordion */}
            <Accordion type="single" collapsible className="mt-8">
              <AccordionItem value="desc">
                <AccordionTrigger className="font-display uppercase">Description</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{hamper.description}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="inside">
                <AccordionTrigger className="font-display uppercase">Full contents</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  <ul className="list-disc space-y-1 pl-5">{hamper.contents.map((c) => <li key={c}>{c}</li>)}</ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ship">
                <AccordionTrigger className="font-display uppercase">Shipping &amp; Returns</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Hand-packed within 24 hours. Delivered in 3–5 business days across India. Personalized hampers are non-returnable; unopened boxes can be exchanged within 7 days.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* You may also like */}
        <section className="mt-16">
          <h2 className="section-title mb-6">More <span className="text-primary">hampers</span></h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {HAMPERS.filter((p) => p.slug !== hamper.slug).map((p) => (
              <Link key={p.slug} to="/hamper/$slug" params={{ slug: p.slug }} className="group block overflow-hidden border border-border bg-card">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="border-t border-border p-4">
                  <h3 className="font-display text-sm font-bold uppercase">{p.name}</h3>
                  <p className="mt-1 font-serif-italic text-xs text-gold">{p.tagline}</p>
                  <p className="mt-2 font-display text-base font-black">{p.priceLabel}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Mobile sticky buy bar */}
      <div className="fixed inset-x-0 bottom-16 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <Button onClick={addToCart} variant="outline" className="h-12">Add to Cart</Button>
        <Button onClick={buyNow} className="h-12">Buy · ₹{total.toLocaleString("en-IN")}</Button>
      </div>
    </main>
  );
}
