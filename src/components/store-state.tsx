import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import { getProduct } from "../lib/catalog";

type CartLine = { slug: string; size: string; quantity: number };
type CartContextValue = { lines: CartLine[]; count: number; add: (line: CartLine) => void; openCart: () => void };
const CartContext = createContext<CartContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const add = (line: CartLine) => { setLines((current) => { const found = current.find((item) => item.slug === line.slug && item.size === line.size); return found ? current.map((item) => item === found ? { ...item, quantity: item.quantity + line.quantity } : item) : [...current, line]; }); setOpen(true); };
  const update = (index: number, delta: number) => setLines((current) => current.flatMap((item, itemIndex) => itemIndex === index ? (item.quantity + delta > 0 ? [{ ...item, quantity: item.quantity + delta }] : []) : [item]));
  const remove = (index: number) => setLines((current) => current.filter((_, itemIndex) => itemIndex !== index));
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + (getProduct(line.slug)?.price ?? 0) * line.quantity, 0);
  const value = useMemo(() => ({ lines, count, add, openCart: () => setOpen(true) }), [lines, count]);

  return <CartContext.Provider value={value}>{children}{open && <><div className="fixed inset-0 z-50 bg-background/75 backdrop-blur-sm" onClick={() => setOpen(false)} /><aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md animate-slide-in-right flex-col border-l border-border bg-panel" role="dialog" aria-modal="true" aria-label="Shopping cart"><div className="flex items-center justify-between border-b border-border p-5"><div><p className="section-kicker">Your selection</p><h2 className="font-display text-3xl font-black uppercase">Shopping Bag</h2></div><Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close cart"><X className="size-5"/></Button></div><div className="flex-1 overflow-y-auto p-5">{lines.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><ShoppingBag className="mb-5 size-10 text-primary"/><h3 className="font-display text-2xl font-bold uppercase">Your bag is empty</h3><p className="mt-2 text-xs text-muted-foreground">Choose a piece that makes a statement.</p></div> : <div className="space-y-4">{lines.map((line, index) => { const product = getProduct(line.slug); if (!product) return null; return <div key={`${line.slug}-${line.size}`} className="border border-border p-4"><div className="flex justify-between gap-4"><div><h3 className="text-sm font-semibold">{product.name}</h3><p className="mt-1 text-xs text-muted-foreground">Size {line.size} · ₹{product.price}</p></div><Button variant="ghost" size="icon" onClick={() => remove(index)} aria-label={`Remove ${product.name}`}><Trash2 className="size-4"/></Button></div><div className="mt-4 flex items-center gap-1"><Button variant="outline" size="icon" onClick={() => update(index, -1)}><Minus className="size-3"/></Button><span className="grid h-10 w-10 place-items-center text-xs">{line.quantity}</span><Button variant="outline" size="icon" onClick={() => update(index, 1)}><Plus className="size-3"/></Button></div></div>; })}</div>}</div>{lines.length > 0 && <div className="border-t border-border p-5"><div className="mb-5 flex items-center justify-between font-display text-xl font-bold uppercase"><span>Subtotal</span><span>₹{subtotal}</span></div><Button className="h-13 w-full">Checkout — Demo</Button><p className="mt-3 text-center text-[10px] text-muted-foreground">Store checkout can be connected when Shopify is enabled.</p></div>}</aside></>}</CartContext.Provider>;
}

export function useCart() { const context = useContext(CartContext); if (!context) throw new Error("useCart must be used inside StoreProvider"); return context; }