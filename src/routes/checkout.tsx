import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { MobileChrome } from "../components/mobile-shell";
import { useCart } from "../lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Your Cart — VYROX" },
      { name: "description", content: "Review your VYROX cart and check out." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { items, subtotal, remove, clear } = useCart();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;

  return (
    <main className="bg-background text-foreground">
      <MobileChrome />
      <div className="section-shell py-8 md:py-16 pb-32">
        <h1 className="section-title">Your <span className="text-primary">Cart</span></h1>
        <p className="mt-2 text-sm text-muted-foreground">{items.length} item{items.length === 1 ? "" : "s"}</p>

        {items.length === 0 ? (
          <div className="mt-12 border border-border bg-card p-10 text-center">
            <p className="font-display text-xl font-bold uppercase">Your cart is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">Find a fit that speaks for you.</p>
            <Link to="/" className="mt-6 inline-block"><Button>Continue Shopping</Button></Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y divide-border border border-border bg-card">
              {items.map((item) => (
                <li key={`${item.slug}-${item.size}`} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4">
                  <div className="min-w-0">
                    <Link to="/product/$slug" params={{ slug: item.slug }} className="block truncate font-display font-bold uppercase hover:text-primary">{item.name}</Link>
                    <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">Size {item.size} · Qty {item.qty}</p>
                    <p className="mt-1 font-display text-sm font-bold">₹{item.price * item.qty}</p>
                  </div>
                  <button aria-label="Remove" onClick={() => remove(item.slug, item.size)} className="p-2 text-muted-foreground hover:text-primary"><Trash2 className="size-4"/></button>
                </li>
              ))}
            </ul>
            <aside className="h-fit border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold uppercase">Order Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>₹{subtotal}</dd></div>
                <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : `₹${shipping}`}</dd></div>
                <div className="mt-3 flex justify-between border-t border-border pt-3 font-display text-base font-bold uppercase"><dt>Total</dt><dd>₹{total}</dd></div>
              </dl>
              <Button className="mt-5 h-12 w-full">Place Order</Button>
              <button onClick={clear} className="mt-3 w-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">Clear Cart</button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
