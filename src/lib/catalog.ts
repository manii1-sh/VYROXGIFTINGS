import discipline360 from "../assets/discipline-360.jpg";
import fearless360 from "../assets/fearless-360.jpg";
import standout360 from "../assets/standout-360.jpg";
import signature360 from "../assets/signature-360.jpg";
import productsImage from "../assets/vyrox-products.jpg";
import collectionsImage from "../assets/vyrox-collections.jpg";

export const sizes = ["S", "M", "L", "XL", "XXL"] as const;

export type Product = {
  slug: string;
  name: string;
  price: number;
  collection: string;
  spriteIndex: number;
  spinImage: string;
  description: string;
};

export const products: Product[] = [
  { slug: "discipline-oversized-tee", name: "Discipline Oversized Tee", price: 899, collection: "oversized-tees", spriteIndex: 0, spinImage: discipline360, description: "A heavyweight oversized essential with a distressed medieval graphic and a confident dropped-shoulder silhouette." },
  { slug: "fearless-oversized-tee", name: "Fearless Oversized Tee", price: 899, collection: "oversized-tees", spriteIndex: 1, spinImage: fearless360, description: "Crimson artwork on dense black cotton, cut wide through the body for an effortless streetwear drape." },
  { slug: "born-to-stand-out-tee", name: "Born To Stand Out Tee", price: 799, collection: "premium-tees", spriteIndex: 2, spinImage: standout360, description: "A bold vintage-inspired statement print on breathable premium cotton made for everyday rotation." },
  { slug: "vyrox-signature-tee", name: "VYROX Signature Tee", price: 699, collection: "premium-tees", spriteIndex: 3, spinImage: signature360, description: "Our signature monochrome artwork, finished with a soft hand-feel and clean relaxed proportions." },
];

export const collections = [
  { slug: "oversized-tees", name: "Oversized Tees", copy: "Heavyweight cotton. Dropped shoulders. Maximum attitude.", imageIndex: 0 },
  { slug: "premium-tees", name: "Premium Tees", copy: "Elevated everyday staples with statement artwork.", imageIndex: 1 },
  { slug: "accessories", name: "Accessories", copy: "The finishing details for an uncompromising look.", imageIndex: 2 },
  { slug: "gift-box", name: "Gift Box", copy: "A premium VYROX unboxing, made to be remembered.", imageIndex: 3 },
] as const;

export const catalogAssets = { productsImage, collectionsImage };

export function getProduct(slug: string) { return products.find((product) => product.slug === slug); }
export function getCollection(slug: string) { return collections.find((collection) => collection.slug === slug); }