import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ChevronLeft, MapPin, MessageCircle, Minus, Phone, Plus, Trash2, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { MobileChrome } from "../components/mobile-shell";
import { useCart } from "../lib/cart";
import { HAMPERS } from "../lib/hampers";
import { PRODUCTS } from "../lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — VYROX" },
      { name: "description", content: "Review your cart and place your order." },
    ],
  }),
  component: Checkout,
});

// ── helpers ───────────────────────────────────────────────────────────────────

function getItemImage(slug: string) {
  return HAMPERS.find((h) => h.slug === slug)?.image ?? null;
}
function getProductImage(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)?.images[0] ?? null;
}

const WHATSAPP = "918848303003";

// Fallback SVG for missing images
const ImageFallback = () => (
  <div className="flex h-full w-full items-center justify-center bg-muted">
    <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
      VYROX
    </span>
  </div>
);

type ShippingForm = {
  name: string; phone: string; address: string;
  city: string; state: string; pin: string; note: string;
};
type Errors = Partial<Record<keyof ShippingForm, string>>;

function validate(f: ShippingForm): Errors {
  const e: Errors = {};
  
  // Name validation
  if (!f.name.trim()) {
    e.name = "Full name is required";
  } else if (f.name.trim().length < 2) {
    e.name = "Name must be at least 2 characters";
  } else if (!/^[a-zA-Z\s.]+$/.test(f.name.trim())) {
    e.name = "Name can only contain letters and spaces";
  }
  
  // Phone validation (Indian numbers)
  const phone = f.phone.trim();
  if (!phone) {
    e.phone = "Mobile number is required";
  } else if (!/^[6-9]\d{9}$/.test(phone)) {
    e.phone = "Enter a valid 10-digit mobile number";
  }
  
  // Address validation
  if (!f.address.trim()) {
    e.address = "Address is required";
  } else if (f.address.trim().length < 10) {
    e.address = "Please enter a complete address (min 10 characters)";
  }
  
  // City validation
  if (!f.city.trim()) {
    e.city = "City is required";
  } else if (!/^[a-zA-Z\s]+$/.test(f.city.trim())) {
    e.city = "City name can only contain letters";
  }
  
  // State validation
  if (!f.state.trim()) {
    e.state = "State is required";
  } else if (!/^[a-zA-Z\s]+$/.test(f.state.trim())) {
    e.state = "State name can only contain letters";
  }
  
  // PIN validation
  if (!f.pin.trim()) {
    e.pin = "PIN code is required";
  } else if (!/^\d{6}$/.test(f.pin.trim())) {
    e.pin = "Enter a valid 6-digit PIN code";
  }
  
  return e;
}

function buildMessage(
  items: ReturnType<typeof useCart>["items"],
  subtotal: number, shipping: number, total: number,
  f: ShippingForm,
) {
  const lines = [
    "🛍️ *New VYROX Order*",
    "━━━━━━━━━━━━━━━━━━━",
    "*🧾 ORDER ITEMS*",
    ...items.map((item, i) =>
      `${i + 1}. *${item.name}*\n   Size: ${item.size}  ·  Qty: ${item.qty}  ·  ₹${(item.price * item.qty).toLocaleString("en-IN")}`
    ),
    "━━━━━━━━━━━━━━━━━━━",
    `Subtotal : ₹${subtotal.toLocaleString("en-IN")}`,
    `Shipping : ${shipping === 0 ? "FREE 🎉" : `₹${shipping}`}`,
    `*TOTAL   : ₹${total.toLocaleString("en-IN")}*`,
    "━━━━━━━━━━━━━━━━━━━",
    "*📦 DELIVERY ADDRESS*",
    `Name    : ${f.name}`,
    `Phone   : ${f.phone}`,
    `Address : ${f.address}`,
    `City    : ${f.city}, ${f.state} - ${f.pin}`,
    ...(f.note ? [`Note    : ${f.note}`] : []),
    "━━━━━━━━━━━━━━━━━━━",
    "_Kindly confirm this order. Thank you!_ 🙏",
  ];
  return lines.join("\n");
}

// ── component ─────────────────────────────────────────────────────────────────

function Checkout() {
  const { items, subtotal, remove, updateQty, clear } = useCart();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total    = subtotal + shipping;

  const [form, setForm]       = useState<ShippingForm>({ name: "", phone: "", address: "", city: "", state: "", pin: "", note: "" });
  const [errors, setErrors]   = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  // Load saved form data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vyrox.checkout.form");
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm(parsed);
      }
    } catch {}
  }, []);

  // Save form data on change (debounced via useEffect)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem("vyrox.checkout.form", JSON.stringify(form));
      } catch {}
    }, 500);
    return () => clearTimeout(timer);
  }, [form]);

  const set = (field: keyof ShippingForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(p => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors(p => ({ ...p, [field]: undefined }));
    };

  const placeOrder = () => {
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      document.getElementById("ship-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildMessage(items, subtotal, shipping, total, form))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    clear();
    // Clear saved form data after successful order
    try {
      localStorage.removeItem("vyrox.checkout.form");
    } catch {}
  };

  const field = (f: keyof ShippingForm) =>
    `h-11 w-full border bg-card px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary ${errors[f] ? "border-primary/70" : "border-border"}`;

  // ── empty ──
  if (!items.length && !submitted) return (
    <main className="bg-background text-foreground">
      <MobileChrome />
      <div className="section-shell flex min-h-[70vh] flex-col items-center justify-center gap-5 py-20 text-center">
        <span className="text-6xl">🛒</span>
        <div>
          <p className="font-display text-3xl font-black uppercase">Your cart is empty</p>
          <p className="mt-2 text-sm text-muted-foreground">Add a hamper or tee to get started.</p>
        </div>
        <Link to="/"><Button className="h-12 px-10">Continue Shopping</Button></Link>
      </div>
    </main>
  );

  // ── success ──
  if (submitted) return (
    <main className="bg-background text-foreground">
      <MobileChrome />
      <div className="section-shell flex min-h-[70vh] flex-col items-center justify-center gap-6 py-20 text-center">
        <div className="flex size-20 items-center justify-center border border-gold/40 bg-gold/10 text-4xl">🎁</div>
        <div>
          <p className="font-display text-3xl font-black uppercase">Order Sent!</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            We've received your order on WhatsApp and will confirm it shortly.
          </p>
        </div>
        <Link to="/"><Button className="h-12 px-10">Back to Home</Button></Link>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <MobileChrome />

      {/* ── Top bar ── */}
      <div className="border-b border-border">
        <div className="section-shell flex items-center gap-3 py-4">
          <Link to="/" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">Home</Link>
          <ChevronLeft className="size-3 rotate-180 text-border" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Checkout</span>
        </div>
      </div>

      <div className="section-shell py-10 pb-40 md:pb-16">

        {/* ── Page title ── */}
        <div className="mb-8">
          <h1 className="font-display text-5xl font-black uppercase leading-none">
            Check<span className="text-primary">out</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""} in your cart</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">

          {/* ══ LEFT COLUMN ══════════════════════════════════════════════════ */}
          <div className="space-y-6">

            {/* ── Section 1: Cart items ── */}
            <section>
              <h2 className="mb-3 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                01 · Your Items
              </h2>
              <div className="divide-y divide-border border border-border">
                {items.map((item) => {
                  const hamperImg  = getItemImage(item.slug);
                  const productImg = getProductImage(item.slug);
                  return (
                    <div key={`${item.slug}-${item.size}`} className="flex gap-4 bg-card p-4">
                      {/* Image */}
                      <div className="relative size-20 shrink-0 overflow-hidden border border-border bg-muted sm:size-[88px] flex items-center justify-center">
                        {hamperImg ? (
                          <img src={hamperImg} alt={item.name} className="h-full w-full object-cover" />
                        ) : productImg ? (
                          <img src={productImg} alt={item.name} className="h-full w-full object-cover" />
                        ) : (
                          <ImageFallback />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <p className="font-display text-sm font-bold uppercase leading-snug">{item.name}</p>
                          <p className="mt-0.5 text-[11px] uppercase tracking-widest text-muted-foreground">
                            Size {item.size}
                          </p>
                        </div>
                        <p className="mt-2 font-display text-lg font-black">
                          ₹{(item.price * item.qty).toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Qty + remove */}
                      <div className="flex shrink-0 flex-col items-end justify-between">
                        <button
                          aria-label="Remove"
                          onClick={() => remove(item.slug, item.size)}
                          className="text-muted-foreground/50 hover:text-primary"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                        <div className="flex items-center border border-border">
                          <button
                            aria-label="Decrease"
                            onClick={() => updateQty(item.slug, item.size, item.qty - 1)}
                            className="grid size-7 place-items-center text-muted-foreground hover:text-primary"
                            title="Decrease quantity"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-7 text-center font-display text-xs font-bold">{item.qty}</span>
                          <button
                            aria-label="Increase"
                            onClick={() => updateQty(item.slug, item.size, item.qty + 1)}
                            className="grid size-7 place-items-center text-muted-foreground hover:text-primary"
                            title="Increase quantity"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Section 2: Shipping form ── */}
            <section id="ship-form">
              <h2 className="mb-3 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                02 · Delivery Details
              </h2>
              <div className="border border-border bg-card p-5 sm:p-6">
                <div className="space-y-4">

                  {/* Name + Phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <User className="size-3" /> Full Name *
                      </label>
                      <input type="text" placeholder="Rahul Sharma" value={form.name} onChange={set("name")} className={field("name")} />
                      {errors.name && <p className="mt-1 text-[10px] text-primary">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <Phone className="size-3" /> Mobile *
                      </label>
                      <input type="tel" placeholder="9876543210" maxLength={10} value={form.phone} onChange={set("phone")} className={field("phone")} />
                      {errors.phone && <p className="mt-1 text-[10px] text-primary">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <MapPin className="size-3" /> Street Address *
                    </label>
                    <input type="text" placeholder="Flat 4B, Sunrise Apartments, MG Road" value={form.address} onChange={set("address")} className={field("address")} />
                    {errors.address && <p className="mt-1 text-[10px] text-primary">{errors.address}</p>}
                  </div>

                  {/* City + State + PIN */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">City *</label>
                      <input type="text" placeholder="Mumbai" value={form.city} onChange={set("city")} className={field("city")} />
                      {errors.city && <p className="mt-1 text-[10px] text-primary">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">State *</label>
                      <input type="text" placeholder="Maharashtra" value={form.state} onChange={set("state")} className={field("state")} />
                      {errors.state && <p className="mt-1 text-[10px] text-primary">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">PIN *</label>
                      <input type="text" placeholder="400001" maxLength={6} value={form.pin} onChange={set("pin")} className={field("pin")} />
                      {errors.pin && <p className="mt-1 text-[10px] text-primary">{errors.pin}</p>}
                    </div>
                  </div>

                  {/* Note */}
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Order Note <span className="normal-case font-normal tracking-normal text-muted-foreground/40">(optional)</span>
                    </label>
                    <textarea
                      placeholder="Special packing or delivery instructions..."
                      value={form.note}
                      onChange={set("note")}
                      rows={2}
                      className="w-full resize-none border border-border bg-background/60 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ══ RIGHT COLUMN — sticky order summary ══════════════════════════ */}
          <aside className="lg:sticky lg:top-6 h-fit space-y-4">

            {/* Summary card */}
            <div className="border border-border bg-card p-5">
              <h2 className="font-display text-base font-bold uppercase tracking-wide">Order Summary</h2>

              {/* Items */}
              <ul className="mt-4 space-y-3 border-b border-border pb-4">
                {items.map((item) => {
                  const hamperImg  = getItemImage(item.slug);
                  const productImg = getProductImage(item.slug);
                  return (
                    <li key={`${item.slug}-${item.size}`} className="flex items-center gap-3">
                      {/* Mini image */}
                      <div className="size-10 shrink-0 overflow-hidden border border-border bg-muted flex items-center justify-center">
                        {hamperImg ? (
                          <img src={hamperImg} alt="" className="h-full w-full object-cover" />
                        ) : productImg ? (
                          <img src={productImg} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <ImageFallback />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold uppercase">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground">×{item.qty} · {item.size}</p>
                      </div>
                      <span className="shrink-0 font-display text-sm font-black">
                        ₹{(item.price * item.qty).toLocaleString("en-IN")}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Totals */}
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Subtotal</dt>
                  <dd>₹{subtotal.toLocaleString("en-IN")}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Shipping</dt>
                  <dd className={shipping === 0 ? "text-gold font-bold" : ""}>{shipping === 0 ? "Free" : `₹${shipping}`}</dd>
                </div>
                {shipping === 0 && subtotal > 0 && (
                  <p className="text-[10px] text-gold">✓ Free shipping on orders above ₹999</p>
                )}
                <div className="flex justify-between border-t border-border pt-3">
                  <dt className="font-display text-lg font-black uppercase">Total</dt>
                  <dd className="font-display text-2xl font-black text-gold">₹{total.toLocaleString("en-IN")}</dd>
                </div>
              </dl>
            </div>

            {/* WhatsApp CTA */}
            <button
              onClick={placeOrder}
              className="flex h-14 w-full items-center justify-center gap-3 bg-[#25D366] font-display text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 active:opacity-80"
            >
              <MessageCircle className="size-5" />
              Place Order via WhatsApp
            </button>
            <p className="text-center text-[10px] text-muted-foreground">
              You'll be redirected to WhatsApp to confirm · Order details sent automatically
            </p>

            {/* Payment note */}
            <div className="border border-gold/30 bg-gold/5 px-4 py-3 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wide text-gold">
                ⚠ Order confirms only after payment
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                We'll share payment details on WhatsApp. Your order is reserved once payment is received.
              </p>
            </div>

            <button onClick={clear} className="w-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 hover:text-primary">
              Clear cart
            </button>
          </aside>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-16 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <button
          onClick={placeOrder}
          className="flex h-12 w-full items-center justify-center gap-2 bg-[#25D366] font-display text-sm font-bold uppercase tracking-widest text-white"
        >
          <MessageCircle className="size-4" /> Place Order via WhatsApp
        </button>
        <p className="mt-1.5 text-center text-[9px] font-bold uppercase tracking-wide text-gold">
          ⚠ Confirms only after payment
        </p>
      </div>
    </main>
  );
}
