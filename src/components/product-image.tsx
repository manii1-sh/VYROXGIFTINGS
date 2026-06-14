import { cn } from "../lib/utils";
import { catalogAssets, type Product } from "../lib/catalog";

export function ProductImage({ product, className }: { product: Product; className?: string }) {
  return (
    <div className={cn("overflow-hidden bg-card", className)}>
      <img src={catalogAssets.productsImage} alt={`${product.name} in black`} loading="lazy" width={1920} height={1080} className="h-full w-[400%] max-w-none object-cover" style={{ transform: `translateX(-${product.spriteIndex * 25}%)` }} />
    </div>
  );
}