import signatureImage from "../assets/hamper-signature.jpg";
import luxuryImage from "../assets/hamper-luxury.jpg";
import midnightImage from "../assets/hamper-midnight.jpg";
import corporateImage from "../assets/hamper-corporate.png";

// New hamper images
import ladiesHamper1 from "../assets/ladieshamper1.jpeg";
import ladiesHamper2 from "../assets/ladieshamper2.jpeg";
import ladiesHamper3 from "../assets/ladieshamper3.jpeg";
import ladiesHamper4 from "../assets/ladieshamper4.jpeg";
import maleHamper1 from "../assets/malehamper1.jpeg";
import maleHamper2 from "../assets/malehamper2.jpeg";
import maleHamper3 from "../assets/malehamper3.jpeg";
import maleHamper4 from "../assets/malehamper4.jpeg";
import onamMaleHamper1 from "../assets/onammalehamper1.jpeg";
import onamMaleHamper2 from "../assets/onammalehamper2.jpeg";
import onamMaleHamper3 from "../assets/onammalehamper3.jpeg";
import onamMaleHamper4 from "../assets/onammalehamper4.jpeg";
import onamFemaleHamper1 from "../assets/onamfemalehamper1.jpeg";
import onamFemaleHamper2 from "../assets/onamfemalehamper2.jpeg";

// Additional new hampers
import newHamper1 from "../assets/new1.webp";
import newHamper2 from "../assets/new1 (1).webp";
import newHamper3 from "../assets/new1 (3).webp";
import newHamper4 from "../assets/new1 (4).webp";
import newHamper5 from "../assets/new1 (5).webp";
import newHamper6 from "../assets/new1 (6).webp";
import newHamper7 from "../assets/new1 (7).webp";
import newHamper8 from "../assets/new1 (8).webp";

export type HamperCategory = "For Female" | "For Male" | "Festive Special";

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
  category: HamperCategory;
  contents: string[];
  image: string;
  includesApparel: boolean;
  tone: "dark" | "light";
};

export const HAMPERS: Hamper[] = [
  // FOR MALE
  {
    slug: "signature-1000",
    name: "Signature Gift Hamper",
    price: 1200,
    priceLabel: "₹1,200",
    tagline: "Especially for you. Made with love.",
    description:
      "The perfect gift for your loved ones — a premium VYROX shirt, romantic roses, luxury perfume, sweet treats and a heartfelt greeting card, all hand-packed in a keepsake box.",
    occasion: ["Anniversary", "Valentine", "Birthday"],
    audience: "Him",
    category: "For Male",
    contents: [
      "Premium VYROX Shirt",
      "Romantic Roses Bouquet",
      "Bellavita Premium Perfume",
      "Handwritten Greeting Card",
      "Premium Seeds & Berries",
      "Sweet Treats Assortment",
    ],
    image: maleHamper1,
    includesApparel: true,
    tone: "light",
  },
  {
    slug: "luxury-2500",
    name: "Luxury Grand Hamper",
    price: 2400,
    priceLabel: "₹2,400",
    tagline: "Just for you — with all my heart.",
    description:
      "Our most-loved luxury box. A Bellavita 4-piece perfume collection, a matte black wristwatch, a glowing LOVE snow globe, heart-shaped Ferrero, artisan chocolates and a VYROX premium tee.",
    occasion: ["Anniversary", "Valentine", "Wedding"],
    audience: "Him",
    category: "For Male",
    contents: [
      "Bellavita Luxury Perfume 4-Set",
      "Matte Black Wristwatch",
      "LED Love Snow Globe",
      "Ferrero Rocher Heart Box",
      "VYROX Premium Tee",
      "Cadbury & Nestlé Assortment",
      "Red Roses Bed",
    ],
    image: maleHamper2,
    includesApparel: true,
    tone: "dark",
  },
  {
    slug: "midnight-romance-1500",
    name: "Midnight Romance",
    price: 2500,
    priceLabel: "₹2,500",
    tagline: "Style. Statement. You.",
    description:
      "A moody, romantic box built for a night to remember. Premium VYROX shirt, Bellavita Blush, pink roses, a keepsake panda, wafer rolls and KitKat — presented on rich crimson velvet.",
    occasion: ["Valentine", "Anniversary", "Proposal"],
    audience: "Him",
    category: "For Male",
    contents: [
      "VYROX Premium Black Shirt",
      "Bellavita Blush Eau de Parfum",
      "Pink & Red Roses",
      "Panda Keepsake Figurine",
      "Anthon Berg Wafer Rolls",
      "KitKat Duo",
      "'Just for You' Heart Card",
    ],
    image: maleHamper3,
    includesApparel: true,
    tone: "dark",
  },
  {
    slug: "executive-prestige-1800",
    name: "Executive Gift Hamper",
    price: 3500,
    priceLabel: "₹3,500",
    tagline: "Excellence in every box.",
    description: "A sophisticated, premium gift box curated for professionals. Features a matte black thermos, premium leather journal, signature brass pen, dark roast coffee brew bags, and gourmet almond brittle.",
    occasion: ["Birthday"],
    audience: "Him",
    category: "For Male",
    contents: [
      "Matte Black Thermos Bottle",
      "Premium Saffiano Leather Journal",
      "Signature Gold-Accent Brass Pen",
      "Artisanal Cold Brew Coffee Bags",
      "Gourmet Almond Brittle Box",
      "Professional Card & Gift Wrap"
    ],
    image: maleHamper4,
    includesApparel: false,
    tone: "dark"
  },

  // FOR FEMALE
  {
    slug: "elegance-for-her-1200",
    name: "Elegance For Her",
    price: 1200,
    priceLabel: "₹1,200",
    tagline: "Graceful. Elegant. Timeless.",
    description:
      "A luxurious gift box designed for the special woman in your life. Features premium perfume, romantic roses, gourmet chocolates, and elegant accessories.",
    occasion: ["Birthday", "Anniversary", "Valentine"],
    audience: "Her",
    category: "For Female",
    contents: [
      "Bellavita Premium Perfume",
      "Fresh Rose Bouquet",
      "Gourmet Chocolate Selection",
      "Elegant Gift Card",
      "Premium Gift Wrapping",
    ],
    image: ladiesHamper1,
    includesApparel: false,
    tone: "light",
  },
  {
    slug: "romance-special-1400",
    name: "Romance Special",
    price: 1200,
    priceLabel: "₹1,200",
    tagline: "Love in every detail.",
    description:
      "Express your love with this beautifully curated hamper featuring premium beauty products, romantic roses, and sweet treats.",
    occasion: ["Valentine", "Anniversary"],
    audience: "Her",
    category: "For Female",
    contents: [
      "Luxury Beauty Set",
      "Pink & Red Roses",
      "Ferrero Rocher Collection",
      "Scented Candles",
      "Love Card & Gift Wrap",
    ],
    image: ladiesHamper2,
    includesApparel: false,
    tone: "dark",
  },
  {
    slug: "premium-grace-1600",
    name: "Premium Grace",
    price: 1450,
    priceLabel: "₹1,450",
    tagline: "Sophistication redefined.",
    description:
      "An exquisite collection of premium items that speak elegance and grace. Perfect for making any occasion memorable.",
    occasion: ["Birthday", "Wedding", "Anniversary"],
    audience: "Her",
    category: "For Female",
    contents: [
      "Premium Perfume Trio",
      "Designer Rose Arrangement",
      "Luxury Chocolates",
      "Elegant Accessories",
      "Personal Message Card",
    ],
    image: ladiesHamper3,
    includesApparel: false,
    tone: "light",
  },
  {
    slug: "luxe-collection-1800",
    name: "Luxe Collection",
    price: 2500,
    priceLabel: "₹2,500",
    tagline: "The ultimate expression of love.",
    description:
      "Our finest collection for her, featuring premium beauty products, exclusive perfumes, and handpicked gourmet treats.",
    occasion: ["Anniversary", "Proposal", "Birthday"],
    audience: "Her",
    category: "For Female",
    contents: [
      "Bellavita Premium Collection",
      "Luxury Rose Box",
      "Gourmet Treats Selection",
      "Premium Gift Accessories",
      "Handcrafted Card",
    ],
    image: ladiesHamper4,
    includesApparel: false,
    tone: "dark",
  },

  // FESTIVE SPECIAL
  {
    slug: "onam-celebration-him-1500",
    name: "Onam Celebration - Him",
    price: 2200,
    priceLabel: "₹2,200",
    tagline: "Celebrate tradition with style.",
    description:
      "A special Onam hamper for him featuring traditional elements combined with modern luxury. Perfect for festival celebrations.",
    occasion: ["Festival"],
    audience: "Him",
    category: "Festive Special",
    contents: [
      "Premium VYROX Kasavu Shirt",
      "Traditional Sweets Assortment",
      "Festival Greeting Card",
      "Premium Gift Wrapping",
    ],
    image: onamMaleHamper1,
    includesApparel: true,
    tone: "light",
  },
  {
    slug: "onam-premium-him-1800",
    name: "Onam Premium - Him",
    price: 2200,
    priceLabel: "₹2,200",
    tagline: "Premium festive elegance.",
    description:
      "An elevated Onam gift box with premium traditional items and luxury additions for a memorable celebration.",
    occasion: ["Festival"],
    audience: "Him",
    category: "Festive Special",
    contents: [
      "VYROX Premium Festival Wear",
      "Traditional Snack Collection",
      "Luxury Perfume",
      "Festival Décor Items",
      "Onam Special Card",
    ],
    image: onamMaleHamper2,
    includesApparel: true,
    tone: "dark",
  },
  {
    slug: "onam-grand-him-2000",
    name: "Onam Grand - Him",
    price: 2650,
    priceLabel: "₹2,650",
    tagline: "Grand celebrations await.",
    description:
      "The grandest Onam hamper for him, featuring premium festival essentials and luxury items for a memorable Onam.",
    occasion: ["Festival"],
    audience: "Him",
    category: "Festive Special",
    contents: [
      "Premium Festival Attire",
      "Traditional Sweet & Snack Box",
      "Luxury Grooming Set",
      "Festival Decorative Items",
      "Premium Gift Packaging",
    ],
    image: onamMaleHamper3,
    includesApparel: true,
    tone: "light",
  },
  {
    slug: "onam-signature-him-1600",
    name: "Onam Signature - Him",
    price: 2650,
    priceLabel: "₹2,650",
    tagline: "Traditional meets contemporary.",
    description:
      "A signature Onam collection blending traditional festival elements with modern luxury items.",
    occasion: ["Festival"],
    audience: "Him",
    category: "Festive Special",
    contents: [
      "VYROX Festival Collection Shirt",
      "Premium Traditional Sweets",
      "Festival Essentials",
      "Luxury Gift Card",
    ],
    image: onamMaleHamper4,
    includesApparel: true,
    tone: "dark",
  },
  {
    slug: "onam-elegance-her-1400",
    name: "Onam Elegance - Her",
    price: 2999,
    priceLabel: "₹2,999",
    tagline: "Festival grace and beauty.",
    description:
      "A beautiful Onam hamper for her featuring traditional items, premium beauty products, and festive treats.",
    occasion: ["Festival"],
    audience: "Her",
    category: "Festive Special",
    contents: [
      "Traditional Festival Set",
      "Premium Beauty Products",
      "Festival Sweets Collection",
      "Decorative Items",
      "Onam Special Card",
    ],
    image: onamFemaleHamper1,
    includesApparel: false,
    tone: "light",
  },
  {
    slug: "onam-premium-her-1600",
    name: "Onam Premium - Her",
    price: 2999,
    priceLabel: "₹2,999",
    tagline: "Elegance meets tradition.",
    description:
      "An exquisite festival hamper for her with premium beauty essentials, traditional sweets, and festive decorations.",
    occasion: ["Festival"],
    audience: "Her",
    category: "Festive Special",
    contents: [
      "Premium Beauty Collection",
      "Traditional Festive Treats",
      "Decorative Festival Items",
      "Luxury Gift Card",
      "Premium Packaging",
    ],
    image: onamFemaleHamper2,
    includesApparel: false,
    tone: "dark",
  },

  // NEW COLLECTION
  {
    slug: "premium-delight-5000",
    name: "Premium Delight Hamper",
    price: 5000,
    priceLabel: "₹5,000",
    tagline: "Luxury redefined.",
    description:
      "Our most premium collection featuring exclusive items, gourmet treats, and luxury accessories. Perfect for those special moments.",
    occasion: ["Anniversary", "Wedding", "Birthday"],
    audience: "Couple",
    category: "For Male",
    contents: [
      "Premium Gift Set",
      "Luxury Perfume Collection",
      "Gourmet Chocolates & Treats",
      "Exclusive Accessories",
      "Handcrafted Gift Card",
      "Premium Gift Wrapping",
    ],
    image: newHamper1,
    includesApparel: false,
    tone: "light",
  },
  {
    slug: "celebration-special-1500",
    name: "Celebration Special",
    price: 1500,
    priceLabel: "₹1,500",
    tagline: "Celebrate every moment.",
    description:
      "A delightful hamper perfect for celebrations. Includes premium sweets, chocolates, and festive items.",
    occasion: ["Birthday", "Anniversary"],
    audience: "Couple",
    category: "For Male",
    contents: [
      "Premium Sweets Box",
      "Chocolate Collection",
      "Festive Treats",
      "Greeting Card",
      "Gift Wrap",
    ],
    image: newHamper2,
    includesApparel: false,
    tone: "light",
  },
  {
    slug: "classic-gift-1000",
    name: "Classic Gift Hamper",
    price: 1000,
    priceLabel: "₹1,000",
    tagline: "Simple. Classic. Perfect.",
    description:
      "A classic gift hamper featuring essential items and sweet treats. Perfect for any occasion.",
    occasion: ["Birthday", "Valentine"],
    audience: "Him",
    category: "For Male",
    contents: [
      "Chocolate Assortment",
      "Gourmet Snacks",
      "Gift Card",
      "Premium Wrapping",
    ],
    image: newHamper3,
    includesApparel: false,
    tone: "light",
  },
  {
    slug: "grand-celebration-2000",
    name: "Grand Celebration Hamper",
    price: 2000,
    priceLabel: "₹2,000",
    tagline: "Make it grand.",
    description:
      "A grand collection of premium items perfect for major celebrations. Features luxury products and gourmet treats.",
    occasion: ["Wedding", "Anniversary"],
    audience: "Couple",
    category: "For Male",
    contents: [
      "Luxury Gift Collection",
      "Premium Chocolates",
      "Festive Items",
      "Decorative Accessories",
      "Special Card",
    ],
    image: newHamper4,
    includesApparel: false,
    tone: "dark",
  },
  {
    slug: "festive-joy-1500",
    name: "Festive Joy Hamper",
    price: 1500,
    priceLabel: "₹1,500",
    tagline: "Spread the joy.",
    description:
      "Bring festive joy with this beautiful hamper featuring traditional sweets, chocolates, and celebration items.",
    occasion: ["Festival", "Birthday"],
    audience: "Couple",
    category: "Festive Special",
    contents: [
      "Traditional Sweets",
      "Chocolate Selection",
      "Festive Decor",
      "Gift Card",
      "Premium Packaging",
    ],
    image: newHamper5,
    includesApparel: false,
    tone: "light",
  },
  {
    slug: "elegant-wishes-1500",
    name: "Elegant Wishes",
    price: 1500,
    priceLabel: "₹1,500",
    tagline: "Elegant. Thoughtful. Beautiful.",
    description:
      "Express your wishes elegantly with this curated collection of premium items and sweet treats.",
    occasion: ["Birthday", "Anniversary"],
    audience: "Her",
    category: "For Female",
    contents: [
      "Premium Gift Items",
      "Luxury Chocolates",
      "Beautiful Roses",
      "Elegant Card",
      "Gift Wrapping",
    ],
    image: newHamper6,
    includesApparel: false,
    tone: "light",
  },
  {
    slug: "sweet-moments-1000",
    name: "Sweet Moments",
    price: 1000,
    priceLabel: "₹1,000",
    tagline: "Create sweet memories.",
    description:
      "A sweet collection perfect for creating memorable moments. Features chocolates, treats, and lovely gifts.",
    occasion: ["Valentine", "Birthday"],
    audience: "Her",
    category: "For Female",
    contents: [
      "Chocolate Box",
      "Sweet Treats",
      "Gift Items",
      "Love Card",
      "Beautiful Wrapping",
    ],
    image: newHamper7,
    includesApparel: false,
    tone: "light",
  },
  {
    slug: "premium-celebration-2500",
    name: "Premium Celebration",
    price: 2500,
    priceLabel: "₹2,500",
    tagline: "Celebrate in style.",
    description:
      "Our premium celebration hamper with luxury items, gourmet treats, and exclusive accessories for grand occasions.",
    occasion: ["Anniversary", "Wedding", "Birthday"],
    audience: "Couple",
    category: "For Male",
    contents: [
      "Premium Luxury Items",
      "Gourmet Chocolate Collection",
      "Exclusive Gifts",
      "Decorative Elements",
      "Premium Card & Wrap",
    ],
    image: newHamper8,
    includesApparel: false,
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
  "Wedding",
  "Festival",
];
