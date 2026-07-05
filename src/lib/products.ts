import disc1 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_19 AM.webp";
import disc2 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_21 AM.webp";
import disc3 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_23 AM.webp";
import fear1 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_43 AM.webp";
import fear2 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_46 AM.webp";
import fear3 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_49 AM.webp";
import born1 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_51 AM.webp";
import born2 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_52 AM.webp";
import born3 from "../assets/ChatGPT Image Jun 29, 2026, 11_57_54 AM.webp";
import sig1 from "../assets/Gemini_Generated_Image_arph3narph3narph.webp";
import sig2 from "../assets/Gemini_Generated_Image_vh75hyvh75hyvh75.webp";

export type Product = {
  slug: string;
  name: string;
  price: string;
  priceValue: number;
  tagline: string;
  description: string;
  fabric: string;
  images: string[];
};

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
    images: [disc1, disc2],
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
    images: [fear1, fear2],
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
    images: [born1, born2],
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
    images: [sig1, sig2],
  },
  {
    slug: "gotham-dark-knight-tee",
    name: "Gotham Dark Knight Tee",
    price: "₹899",
    priceValue: 899,
    tagline: "Unleash the hero within.",
    description:
      "Special edition Batman-inspired tee with a premium front graphic. Boxy fit, heavyweight combed cotton, built to make a bold statement.",
    fabric: "100% combed cotton · 240 GSM · Pre-shrunk · Machine wash cold.",
    images: [sig2],
  },
  {
    slug: "tokyo-streetwear-tee",
    name: "Tokyo Streetwear Tee",
    price: "₹799",
    priceValue: 799,
    tagline: "Inspired by the neon streets of Tokyo.",
    description:
      "Mid-weight graphic tee features a detailed print and custom back branding. Loose shoulders and a comfortable feel.",
    fabric: "100% combed cotton · 200 GSM · Soft hand-feel · Machine wash cold.",
    images: [born3],
  },
  {
    slug: "wolf-alpha-tee",
    name: "Wolf Alpha Tee",
    price: "₹899",
    priceValue: 899,
    tagline: "Lead the pack in style.",
    description:
      "A striking wolf print overlaying a rich washed black fabric. Built with our premium oversized fit and heavy rib details.",
    fabric: "100% combed cotton · 240 GSM · Pre-shrunk · Machine wash cold.",
    images: [fear3],
  },
  {
    slug: "claws-oversized-tee",
    name: "Claws Oversized Tee",
    price: "₹899",
    priceValue: 899,
    tagline: "Scratch the limits of everyday style.",
    description:
      "A bold, high-contrast claws graphic across the chest. Drop shoulder fit with double-needle stitched seams.",
    fabric: "100% combed cotton · 240 GSM · Pre-shrunk · Machine wash cold.",
    images: [disc3],
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
