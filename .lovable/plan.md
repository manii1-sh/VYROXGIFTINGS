
# Pivot: Gift Hampers primary, Clothing secondary

The current site is streetwear-first: near-black + crimson, big "DISCIPLINE / FEARLESS" attitude copy, two-model parallax hero. Hampers need warmth (roses, fairy lights, "Just for You", "Made with love"). We'll evolve the brand, not replace it — keep the premium dark VYROX feel and layer in romantic warmth so hampers feel like the hero product.

## 1. Brand positioning shift

- New tagline direction: **"VYROX — Wear Your Attitude. Gift The Feeling."**
- Homepage headline changes from attitude/streetwear to gifting-first, e.g. **"THE GIFT THAT SPEAKS FOR YOU"** with subline *"Curated hampers, hand-packed with love."*
- Clothing becomes a secondary rail ("Shop the Wardrobe") lower on the page.

## 2. Color & mood evolution (keep masculine bones, add romance)

Keep the near-black base and crimson primary — they actually match the dark-velvet + red-rose hamper photos (image 1). Add two warm accents so lighter hamper shots (images 2 & 4) also feel at home:

- `--background` near-black (kept)
- `--primary` crimson red (kept — matches roses, ribbons, "Especially For You" red)
- **NEW** `--accent-gold` warm champagne `#c9a84c` (for "Premium", price badges, "Just for You")
- **NEW** `--accent-blush` soft rose `#e8c5d0` (for hamper category tags, hover states)
- **NEW** `--surface-cream` `#f5f0e8` for one "gifting" section that flips to light background (so light hamper photos breathe)

Result: still bold and premium, no longer purely masculine — reads as "premium gifting house that also does apparel."

## 3. Typography

- Keep Barlow Condensed for display (still strong, works for gifting when paired right).
- Add **Cormorant Garamond** (italic) for romantic accent lines: *"Especially for you"*, *"Made with love"*, gift-card copy. This single serif addition instantly reframes the brand as gifting.
- Keep IBM Plex Sans for body.

## 4. Hero redesign (keep the parallax mechanic)

Reuse the sticky-scroll parallax you already love, but change the payload:

- **Scene 1 (only visible at rest):** an opened VYROX hamper box on dark velvet with roses + fairy lights (like image 1), floating center. Nothing else.
- **Scroll reveals behind it:** big "VYROX" wordmark → then *"Gift the feeling."* in Cormorant italic → then a row of 3 hamper category chips (Signature ₹1000 · Luxury ₹2500 · Him & Her ₹3500).
- Mobile: same choreography, shorter scene (200vh), hamper image scales to fit.
- Models are retired from the hero (moved to a "Shop the Wardrobe" strip lower down).

## 5. New page structure

```
Home
  ├─ Hero: Hamper parallax
  ├─ "Signature Hampers" grid (3–6 hampers, price + "What's inside" chips)
  ├─ Occasions rail (Birthday · Anniversary · Valentine · Rakhi · Corporate)
  ├─ "How it works" (3 steps: Choose → Personalize → We hand-pack & ship)
  ├─ "Wear the Wardrobe" (secondary clothing rail — 4 tees, small)
  ├─ Testimonials (kept, reworded to gifting)
  └─ Footer
```

New routes:
- `/hampers` — full hamper catalogue with filters (price, occasion, for him/her/couple)
- `/hamper/$slug` — hamper detail page (replaces the current product detail as the primary template)
- `/wardrobe` — the old shop, kept for clothing
- `/product/$slug` — kept for tees
- `/build-your-box` — (phase 2, optional) pick-your-items builder

## 6. Hamper detail page (`/hamper/$slug`)

Different from a tee page because a hamper is a bundle:

- Large hero image of the opened box (like image 2/3).
- Price badge in gold ("JUST ₹1000") — style borrowed directly from image 2.
- **"What's inside" checklist** with icons: Premium Shirt · Romantic Flowers · Premium Perfume · Greeting Card · Sweet Treats · … (same icon-list pattern as image 2's left rail — this is on-brand for the owner).
- **Personalization block:** recipient name, gift message (textarea, 200 chars), delivery date picker, "Add a handwritten note (+₹49)" toggle.
- **Shirt size selector** (only shown if the hamper includes apparel) — reuses existing size chart dialog.
- Sticky mobile bar: Add to Cart · Buy Now (kept as-is).
- Trust strip: Free shipping over ₹999 · Hand-packed in 24 hrs · Gift-ready packaging.
- Accordion: Description · What's inside (detailed) · Shipping & Returns.

## 7. Data model changes (`src/lib/products.ts`)

Add a `Hamper` type alongside `Product`:

```ts
type Hamper = {
  slug: string;
  name: string;             // "Signature Gift Hamper"
  price: number;            // 1000
  occasion: string[];       // ["Anniversary", "Valentine"]
  audience: "him" | "her" | "couple";
  tagline: string;          // "Especially for you. Made with love."
  contents: { icon: string; label: string }[];
  image: string;
  gallery: string[];
  includesApparel: boolean; // shows size selector if true
};
```

Seed with 3–4 hampers using your uploaded photos:
- **Signature Hamper ₹1000** (image 2 / image 4) — shirt + perfume + roses + chocolates + card
- **Luxury Hamper ₹2500** (image 3) — 4 perfumes + watch + snow globe + chocolates + tee
- **Midnight Romance ₹1500** (image 1) — dark-velvet variant, shirt + roses + perfume + panda light + KitKat

Cart context stays as-is; a hamper is just a cart item with extra metadata (personalization payload).

## 8. Mobile shell tweaks

Keep the bottom-nav shopping-app pattern. Change tabs to reflect the pivot:
- Home · **Hampers** · Occasions · Wishlist · Account
- "Wardrobe" moves into the hamburger drawer.

## 9. Assets to generate

- New hero: opened hamper on dark velvet with roses & fairy lights (transparent PNG, like image 1 mood, VYROX-branded)
- 3 hamper product photos matching the 3 SKUs above
- Small icon set for "what's inside" (shirt, rose, perfume, card, chocolate, watch, seeds) — line icons in gold

## 10. Out of scope for this pass

- Real payment / order fulfillment
- Gift-scheduling backend / delivery calendar validation
- "Build-your-own-box" builder (phase 2)
- Blog / gifting guide content

---

## What this achieves

- Hampers become the unmistakable hero, matching the owner's new priority.
- The masculine dark/red identity is preserved — you didn't waste the earlier work — but softened with gold + blush + a romantic serif so the light hamper photography looks intentional, not out of place.
- Clothing stays available as a secondary line, and the existing product/cart/checkout plumbing keeps working with minimal refactor (hampers are modelled as a superset of products).
