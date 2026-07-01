import signatureImage from "../assets/hamper-signature.jpg";
import luxuryImage from "../assets/hamper-luxury.jpg";
import midnightImage from "../assets/hamper-midnight.jpg";

export type Hamper = {
  slug: string;
  name: string;
  price: number;
  priceLabel: string;
  originalPrice?: string;
  tagline: string;
  description: string;
  occasion: string[];
  audience: "Him" | "Her" | "Couple";
  contents: string[];
  image: string;
  includesApparel: boolean;
  tone: "dark" | "light";
};

export const HAMPERS: Hamper[] = [
  {
    slug: "signature-1000",
    name: "Signature Gift Hamper",
    price: 1000,
    priceLabel: "₹1,000",
    originalPrice: "₹1,499",
    tagline: "Especially for you. Made with love.",
    description:
      "The perfect gift for your loved ones — a premium VYROX shirt, romantic roses, luxury perfume, sweet treats and a heartfelt greeting card, all hand-packed in a keepsake box.",
    occasion: ["Anniversary", "Valentine", "Birthday"],
    audience: "Him",
    contents: [
      "Premium VYROX Shirt",
      "Romantic Roses Bouquet",
      "Bellavita Premium Perfume",
      "Handwritten Greeting Card",
      "Premium Seeds & Berries",
      "Sweet Treats Assortment",
    ],
    image: signatureImage,
    includesApparel: true,
    tone: "light",
  },
  {
    slug: "luxury-2500",
    name: "Luxury Grand Hamper",
    price: 2500,
    priceLabel: "₹2,500",
    originalPrice: "₹3,299",
    tagline: "Just for you — with all my heart.",
    description:
      "Our most-loved luxury box. A Bellavita 4-piece perfume collection, a matte black wristwatch, a glowing LOVE snow globe, heart-shaped Ferrero, artisan chocolates and a VYROX premium tee.",
    occasion: ["Anniversary", "Valentine", "Wedding"],
    audience: "Him",
    contents: [
      "Bellavita Luxury Perfume 4-Set",
      "Matte Black Wristwatch",
      "LED Love Snow Globe",
      "Ferrero Rocher Heart Box",
      "VYROX Premium Tee",
      "Cadbury & Nestlé Assortment",
      "Red Roses Bed",
    ],
    image: luxuryImage,
    includesApparel: true,
    tone: "dark",
  },
  {
    slug: "midnight-romance-1500",
    name: "Midnight Romance",
    price: 1500,
    priceLabel: "₹1,500",
    originalPrice: "₹1,999",
    tagline: "Style. Statement. You.",
    description:
      "A moody, romantic box built for a night to remember. Premium VYROX shirt, Bellavita Blush, pink roses, a keepsake panda, wafer rolls and KitKat — presented on rich crimson velvet.",
    occasion: ["Valentine", "Anniversary", "Proposal"],
    audience: "Couple",
    contents: [
      "VYROX Premium Black Shirt",
      "Bellavita Blush Eau de Parfum",
      "Pink & Red Roses",
      "Panda Keepsake Figurine",
      "Anthon Berg Wafer Rolls",
      "KitKat Duo",
      "'Just for You' Heart Card",
    ],
    image: midnightImage,
    includesApparel: true,
    tone: "dark",
  },
];

export function getHamper(slug: string) {
  return HAMPERS.find((h) => h.slug === slug);
}

export const OCCASIONS = [
  "Valentine",
  "Anniversary",
  "Birthday",
  "Rakhi",
  "Wedding",
  "Corporate",
];
