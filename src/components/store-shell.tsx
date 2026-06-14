import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "./store-state";

export function StoreHeader() {
  const { count, openCart } = useCart();
  return <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur"><div className="section-shell flex h-18 items-center justify-between"><Link to="/" className="font-logo text-2xl tracking-[0.35em] text-primary">VYROX<span className="text-foreground">╱</span></Link><nav className="hidden gap-7 text-[10px] font-bold uppercase tracking-widest md:flex"><Link to="/">Home</Link><Link to="/collections/$collectionSlug" params={{ collectionSlug: "oversized-tees" }}>Oversized</Link><Link to="/collections/$collectionSlug" params={{ collectionSlug: "premium-tees" }}>Premium</Link></nav><Button variant="ghost" onClick={openCart} aria-label={`Open cart with ${count} items`}><ShoppingBag className="mr-2 size-4"/>Cart <span className="ml-2 bg-primary px-1.5 py-0.5 text-primary-foreground">{count}</span></Button></div></header>;
}

export function StoreFooter() {
  return <footer className="section-shell flex flex-col gap-3 border-t border-border py-8 text-[10px] uppercase tracking-widest text-muted-foreground sm:flex-row sm:justify-between"><span>© 2026 VYROX. Wear your attitude.</span><span>Easy returns · Secure checkout · Premium quality</span></footer>;
}