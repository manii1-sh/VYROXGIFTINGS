import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Heart, Minus, Plus, Ruler, ShieldCheck, Share2, ShoppingBag, Star, Truck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { toast } from "sonner";
import { MobileChrome } from "../components/mobile-shell";
import { getProduct, PRODUCT_IMAGE, PRODUCTS, SIZES, SIZE_CHART } from "../lib/products";
import { useCart } from "../lib/cart";

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
  const [view, setView] = useState(0);

  const offsetPct = product.imageIndex * 25;

  const addToCart = () => {
    add({ slug: product.slug, name: product.name, price: product.priceValue, size, qty });
    toast.success(`Added ${product.name} (${size}) to cart`);
  };

  const buyNow = () => {
    add({ slug: product.slug, name: product.name, price: product.priceValue, size, qty });
    navigate({ to: "/checkout" });
  };

  return (
    <main className="bg-background text-foreground">
      <MobileChrome />

      <div className="section-shell pt-4 md:pt-8 pb-32 md:pb-16">
        <Link to="/" className="mb-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
          <ChevronLeft className="size-4" /> Back to shop
        </Link>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
              <img
                src={PRODUCT_IMAGE}
                alt={product.name}
                width={1536}
                height={864}
                className="h-full w-[400%] max-w-none object-cover"
                style={{ transform: `translateX(-${offsetPct}%)` }}
              />
              <button aria-label="Wishlist" className="absolute right-3 top-3 grid size-10 place-items-center border border-border bg-background/80 backdrop-blur">
                <Heart className="size-4" />
              </button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setView(i)}
                  className={`relative aspect-square w-20 shrink-0 overflow-hidden border ${view === i ? "border-primary" : "border-border"}`}
                  aria-label={`View ${i + 1}`}
                >
                  <img
                    src={PRODUCT_IMAGE}
                    alt=""
                    className="h-full w-[400%] max-w-none object-cover"
                    style={{ transform: `translateX(-${((product.imageIndex + i) % 4) * 25}%)` }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="section-kicker">New Drop</p>
            <h1 className="section-title mt-2">{product.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{product.tagline}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex tracking-widest text-primary"><Star className="size-4 fill-current"/><Star className="size-4 fill-current"/><Star className="size-4 fill-current"/><Star className="size-4 fill-current"/><Star className="size-4 fill-current"/></span>
              <span className="text-xs text-muted-foreground">(248 reviews)</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl font-black">{product.price}</span>
              <span className="text-xs text-muted-foreground line-through">₹1,299</span>
              <span className="font-display text-xs font-bold uppercase text-primary">31% Off</span>
            </div>

            {/* Color */}
            <div className="mt-6">
              <p className="font-display text-xs font-bold uppercase tracking-widest">Color: Crimson</p>
              <div className="mt-2 flex gap-2">
                {["#b51d2a", "#0a0a0a", "#e8e3d6"].map((c, i) => (
                  <button key={c} aria-label={`Color ${i + 1}`} className={`size-8 border ${i === 0 ? "border-primary" : "border-border"}`} style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="font-display text-xs font-bold uppercase tracking-widest">Select Size</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                      <Ruler className="size-3" /> Size Chart
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-card">
                    <DialogHeader>
                      <DialogTitle className="font-display uppercase">Size Chart (inches)</DialogTitle>
                    </DialogHeader>
                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="py-2">Size</th><th>Chest</th><th>Length</th><th>Shoulder</th>
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
                    <p className="mt-2 text-[11px] text-muted-foreground">Oversized fit. We recommend your usual size for a relaxed drop, or size down for a closer fit.</p>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`grid h-11 min-w-11 place-items-center border px-3 font-display text-sm font-bold ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="mt-6">
              <p className="font-display text-xs font-bold uppercase tracking-widest">Quantity</p>
              <div className="mt-2 inline-flex items-center border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="grid size-11 place-items-center hover:text-primary"><Minus className="size-4"/></button>
                <span className="w-10 text-center font-display text-base font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="grid size-11 place-items-center hover:text-primary"><Plus className="size-4"/></button>
              </div>
            </div>

            {/* Desktop actions */}
            <div className="mt-7 hidden gap-3 md:flex">
              <Button onClick={addToCart} variant="outline" className="h-12 flex-1 px-7"><ShoppingBag className="mr-2 size-4"/>Add to Cart</Button>
              <Button onClick={buyNow} className="h-12 flex-1 px-7">Buy Now</Button>
              <Button variant="ghost" size="icon" aria-label="Share"><Share2 className="size-4"/></Button>
            </div>

            {/* Trust */}
            <ul className="mt-6 grid grid-cols-2 gap-3 text-[11px] text-muted-foreground">
              <li className="flex items-center gap-2"><Truck className="size-4 text-primary"/>Free shipping over ₹999</li>
              <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary"/>7-day easy returns</li>
            </ul>

            {/* Accordion */}
            <Accordion type="single" collapsible className="mt-8">
              <AccordionItem value="desc">
                <AccordionTrigger className="font-display uppercase">Description</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{product.description}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="fabric">
                <AccordionTrigger className="font-display uppercase">Fabric &amp; Care</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{product.fabric}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="ship">
                <AccordionTrigger className="font-display uppercase">Shipping &amp; Returns</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">Dispatched in 24 hrs. Delivered in 3–5 business days across India. Free returns within 7 days of delivery.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* You may also like */}
        <section className="mt-16">
          <h2 className="section-title mb-6">You may <span className="text-primary">also like</span></h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.filter((p) => p.slug !== product.slug).map((p) => (
              <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} className="group block overflow-hidden border border-border bg-card">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={PRODUCT_IMAGE} alt={p.name} loading="lazy" className="h-full w-[400%] max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.03]" style={{ transform: `translateX(-${p.imageIndex * 25}%)` }} />
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
      </div>

      {/* Mobile sticky buy bar */}
      <div className="fixed inset-x-0 bottom-16 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <Button onClick={addToCart} variant="outline" className="h-12">Add to Cart</Button>
        <Button onClick={buyNow} className="h-12">Buy Now · {product.price}</Button>
      </div>
    </main>
  );
}
