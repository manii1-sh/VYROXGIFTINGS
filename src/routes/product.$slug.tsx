import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronLeft,
  Minus,
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
import { getProduct, PRODUCTS, SIZES, SIZE_CHART } from "../lib/products";
import { useCart } from "../lib/cart";
import { ProductSchema } from "../components/seo-schema";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — VYROX` },
          { name: "description", content: loaderData.product.tagline },
          { property: "og:title", content: `${loaderData.product.name} — VYROX` },
          { property: "og:description", content: loaderData.product.tagline },
        ]
      : [],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const { add } = useCart();
  const [size, setSize] = useState("L");
  const [qty, setQty] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const addToCart = () => {
    add({ slug: product.slug, name: product.name, price: product.priceValue, size, qty });
    toast.success(`${product.name} (${size}) added to cart`);
  };

  const buyNow = () => {
    addToCart();
    navigate({ to: "/checkout" });
  };

  return (
    <main className="bg-background text-foreground">
      <MobileChrome />
      
      {/* SEO Schema for Google */}
      <ProductSchema 
        product={product} 
        url={`https://vyrox.com/product/${product.slug}`} 
      />

      {/* ── DESKTOP: full-bleed two-panel ── */}
      <div className="hidden md:flex md:h-screen md:overflow-hidden">

        {/* LEFT — image fills entire panel */}
        <div className="relative w-1/2 shrink-0 bg-muted flex items-center justify-center">
          <button
            onClick={() => setLightbox(true)}
            className="group block h-full w-full focus:outline-none overflow-hidden"
            aria-label="View full image"
          >
            <img
              src={product.images[activeImgIndex]}
              alt={`${product.name} - Premium oversized tee from VYROX`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/50 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white/80 backdrop-blur hover:text-white">
              <ZoomIn className="size-3.5" /> Zoom
            </span>
          </button>

          {/* Thumbnails overlay */}
          <div className="absolute bottom-4 left-6 z-10 flex gap-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImgIndex(idx)}
                className={`size-12 overflow-hidden border bg-background/50 backdrop-blur transition-all ${
                  activeImgIndex === idx
                    ? "border-primary scale-105"
                    : "border-white/20 hover:border-white/60"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <Link
            to="/"
            className="absolute left-6 top-6 z-10 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/80 hover:text-white"
          >
            <ChevronLeft className="size-3.5" /> Wardrobe
          </Link>
        </div>

        {/* RIGHT — scrollable purchase panel */}
        <div className="flex w-1/2 flex-col overflow-y-auto border-l border-border bg-card">
          <div className="flex flex-1 flex-col px-10 py-10 xl:px-14 xl:py-12">

            <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              New Drop · Oversized Tee
            </p>
            <h1 className="mt-2 font-display text-3xl font-black uppercase leading-tight tracking-tight xl:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{product.tagline}</p>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3 border-b border-border pb-5">
              <span className="font-display text-3xl font-black">{product.price}</span>
              <span className="text-xs text-muted-foreground/50 line-through">₹1,299</span>
              <span className="ml-auto rounded-sm bg-primary/10 px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-widest text-primary">
                31% Off
              </span>
            </div>

            {/* Fabric quick-facts */}
            <div className="mt-5 grid grid-cols-3 gap-3 border-b border-border pb-5">
              {[
                ["240 GSM", "Heavyweight"],
                ["100% Cotton", "Combed"],
                ["Oversized", "Boxy fit"],
              ].map(([val, label]) => (
                <div key={val} className="border border-border/60 p-3 text-center">
                  <p className="font-display text-sm font-black">{val}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {/* Size */}
            <div className="mt-5 border-b border-border pb-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Size
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
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      Oversized fit. Size as usual for a relaxed drop, size down for a closer fit.
                    </p>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`grid h-10 w-12 place-items-center border font-display text-xs font-bold transition-colors ${
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

            {/* Qty + Total */}
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="grid size-9 place-items-center text-muted-foreground hover:text-primary">
                  <Minus className="size-3.5" />
                </button>
                <span className="w-10 text-center font-display text-sm font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="grid size-9 place-items-center text-muted-foreground hover:text-primary">
                  <Plus className="size-3.5" />
                </button>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total</p>
                <p className="font-display text-2xl font-black">
                  ₹{(product.priceValue * qty).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Button 
                onClick={addToCart} 
                variant="outline" 
                className="h-12"
                aria-label={`Add ${product.name} size ${size} to cart`}
              >
                <ShoppingBag className="mr-2 size-4" /> Add to Cart
              </Button>
              <Button 
                onClick={buyNow} 
                className="h-12"
                aria-label={`Buy ${product.name} now`}
              >
                Buy Now
              </Button>
            </div>

            {/* Trust */}
            <ul className="mt-5 flex gap-5 text-[10px] text-muted-foreground">
              <li className="flex items-center gap-1.5"><Truck className="size-3.5 text-primary" /> Free shipping ₹999+</li>
            </ul>

            {/* Accordion */}
            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="desc">
                <AccordionTrigger className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                  About this tee
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
                  {product.description}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="fabric">
                <AccordionTrigger className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                  Fabric &amp; Care
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
                  {product.fabric}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ship">
                <AccordionTrigger className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                  Shipping &amp; Returns
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
                  Dispatched in 24 hrs. Delivered in 3–5 business days across India. 
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* ── MOBILE: stacked layout ── */}
      <div className="md:hidden">
        <div className="relative">
          <button onClick={() => setLightbox(true)} className="block w-full focus:outline-none" aria-label="View full image">
            <div className="aspect-square overflow-hidden bg-muted flex items-center justify-center">
              <img
                src={product.images[activeImgIndex]}
                alt={`${product.name} - VYROX oversized tee`}
                className="h-full w-full object-cover"
              />
            </div>
          </button>

          {/* Thumbnails overlay */}
          <div className="absolute bottom-4 left-4 z-10 flex gap-1.5">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImgIndex(idx)}
                className={`size-10 overflow-hidden border bg-background/50 backdrop-blur transition-all ${
                  activeImgIndex === idx
                    ? "border-primary scale-105"
                    : "border-white/20 hover:border-white/50"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <Link to="/" className="absolute left-4 top-4 inline-flex items-center gap-1 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
            <ChevronLeft className="size-3" /> Back
          </Link>
        </div>

        <div className="space-y-5 px-4 pb-40 pt-5">
          <div>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-primary">New Drop</p>
            <h1 className="mt-1 font-display text-2xl font-black uppercase leading-tight">{product.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
          </div>

          <div className="flex items-baseline gap-3 border-b border-border pb-4">
            <span className="font-display text-2xl font-black">{product.price}</span>
            <span className="text-xs text-muted-foreground/50 line-through">₹1,299</span>
            <span className="font-display text-xs font-bold uppercase text-primary">31% Off</span>
          </div>

          <div className="grid grid-cols-3 gap-2 border-b border-border pb-4">
            {[["240 GSM", "Heavyweight"], ["100% Cotton", "Combed"], ["Oversized", "Boxy fit"]].map(([val, label]) => (
              <div key={val} className="border border-border/60 p-2 text-center">
                <p className="font-display text-xs font-black">{val}</p>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <div className="border-b border-border pb-4">
            <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Size</p>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`grid h-10 w-11 place-items-center border font-display text-xs font-bold ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-9 place-items-center text-muted-foreground"><Minus className="size-3.5" /></button>
              <span className="w-10 text-center font-display text-sm font-bold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid size-9 place-items-center text-muted-foreground"><Plus className="size-3.5" /></button>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Total</p>
              <p className="font-display text-xl font-black">₹{(product.priceValue * qty).toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-16 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-3 backdrop-blur">
          <Button 
            onClick={addToCart} 
            variant="outline" 
            className="h-11"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </Button>
          <Button 
            onClick={buyNow} 
            className="h-11"
            aria-label={`Buy ${product.name} for ${product.price}`}
          >
            Buy Now · {product.price}
          </Button>
        </div>
      </div>

      {/* ── YOU MAY ALSO LIKE ── */}
      <div className="section-shell border-t border-border py-12">
        <h2 className="mb-6 font-display text-2xl font-black uppercase">
          You may <span className="text-primary">also like</span>
        </h2>
        <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {PRODUCTS.filter((p) => p.slug !== product.slug).map((p) => (
            <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} className="group flex flex-col bg-card" onClick={() => setActiveImgIndex(0)}>
              <div className="aspect-square overflow-hidden bg-muted flex items-center justify-center">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-bold uppercase">{p.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{p.tagline}</p>
                <p className="mt-2 font-display text-base font-black">{p.price}</p>
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
          <button onClick={() => setLightbox(false)} aria-label="Close" className="absolute right-5 top-5 grid size-10 place-items-center border border-white/20 bg-white/10 text-white hover:bg-white/20">
            <X className="size-5" />
          </button>
          <img
            src={product.images[activeImgIndex]}
            alt={`${product.name} - Full view`}
            className="max-h-[92vh] max-w-[92vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
