import productsImage from "../assets/vyrox-products.jpg";

export type Product = {
  slug: string;
  name: string;
  price: string;
  priceValue: number;
  tagline: string;
  description: string;
  fabric: string;
  imageIndex: number; // 0..3 into the 4-up products sprite
};

export const PRODUCT_IMAGE = productsImage;

export const PRODUCTS: Product[] = [
  {
    slug: "discipline-oversized-tee",
    name: "Discipline Oversized Tee",
    price: "₹899",
    priceValue: 899,
    tagline: "Built for those who stay consistent.",
    description:
      "Heavyweight 240 GSM cotton with a relaxed boxy fit. Drop shoulders, ribbed crew neck, and a hand-finished print that doesn't fade after the first wash.",
    fabric: "100% combed cotton · 240 GSM · Pre-shrunk · Machine wash cold.",
    imageIndex: 0,
  },
  {
    slug: "fearless-oversized-tee",
    name: "Fearless Oversized Tee",
    price: "₹899",
    priceValue: 899,
    tagline: "For the ones who don't ask for permission.",
    description:
      "Premium oversized silhouette with structured shoulders and elongated hem. Hand-printed crimson graphic on near-black cotton.",
    fabric: "100% combed cotton · 240 GSM · Pre-shrunk · Machine wash cold.",
    imageIndex: 1,
  },
  {
    slug: "born-to-stand-out-tee",
    name: "Born To Stand Out Tee",
    price: "₹799",
    priceValue: 799,
    tagline: "Loud silence. Quiet confidence.",
    description:
      "Mid-weight tee with a softer drape and slightly tapered fit. Signature VYROX chest crest and back wordmark.",
    fabric: "100% combed cotton · 200 GSM · Soft hand-feel · Machine wash cold.",
    imageIndex: 2,
  },
  {
    slug: "vyrox-signature-tee",
    name: "VYROX Signature Tee",
    price: "₹699",
    priceValue: 699,
    tagline: "The everyday essential, done right.",
    description:
      "Our cleanest cut. Tubular knit body, double-stitched seams, and the embroidered VYROX monogram at the chest.",
    fabric: "100% combed cotton · 200 GSM · Garment dyed · Machine wash cold.",
    imageIndex: 3,
  },
];

export const SIZE_CHART = [
  { size: "S", chest: 42, length: 27, shoulder: 21 },
  { size: "M", chest: 44, length: 28, shoulder: 22 },
  { size: "L", chest: 46, length: 29, shoulder: 23 },
  { size: "XL", chest: 48, length: 30, shoulder: 24 },
  { size: "XXL", chest: 50, length: 31, shoulder: 25 },
];

export const SIZES = SIZE_CHART.map((s) => s.size);

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
