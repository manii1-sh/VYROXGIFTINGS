# Mobile shopping UI + product detail pages

Keep the current desktop design and parallax animation exactly as-is. Add a mobile-first shopping app layout, and add product detail pages.

## 1. Mobile shopping app shell (under `md` breakpoint only)

- **Top header (sticky)**: VYROX logo left, search icon + cart icon (with item count badge) right. Compact, dark, border-bottom.
- **Bottom nav (fixed)**: 5 tabs — Home, Shop, Collections, Wishlist, Account. Active tab in primary red. Safe-area padding for iOS.
- **Hamburger drawer** (slides from left) for full menu: Home, Shop, Oversized Tees, Collections, Gift Box, Track Order, Contact.
- Desktop (`md+`) keeps the current top nav untouched; mobile header + bottom nav are hidden on desktop.

## 2. Hero parallax — keep animation, tune for mobile

- Same scroll-driven choreography, same reveal order, same models-in-front layering.
- On mobile: shorter scene height (`200vh` vs `300vh`), tightened text sizes, models scale to fit narrow viewport, the "New Drop" card and benefit strip stay desktop-only as today.
- Verify with Playwright at 390px and 1280px.

## 3. Product cards → link to detail page

- Each Best Seller card becomes a `<Link>` to `/product/$slug`.
- Add a slug to the product list (e.g. `discipline-oversized-tee`).

## 4. Product detail page `/product/$slug`

New route `src/routes/product.$slug.tsx`:

- **Mobile layout**: full-width image gallery (swipeable thumbnails strip), then title, price, rating, color swatches, size selector (S/M/L/XL/XXL) with "Size Chart" link opening a modal, quantity stepper, sticky bottom action bar with **Add to Cart** + **Buy Now**.
- **Desktop layout**: 2-column — gallery left, details right; actions inline (not sticky).
- **Size chart modal**: table with Chest / Length / Shoulder for each size in inches + cm, plus fit note.
- **Sections below**: Description, Fabric & Care, Shipping & Returns (accordion), "You may also like" 4-card grid linking to other products.
- SEO `head()` per product (title, description, og:image using product image).

## 5. Cart state (lightweight, client-only)

- Simple React context `CartProvider` in `__root.tsx` holding `{items, add, remove, count}` in `localStorage`.
- Cart icon badge reads `count`. Add to Cart updates it; toast confirmation.
- No checkout backend — Buy Now routes to a placeholder `/checkout` page with order summary (keeps scope tight).

## 6. Design tokens / components

- Reuse existing red/black/white palette and Barlow Condensed display.
- New small components: `MobileHeader`, `MobileBottomNav`, `ProductGallery`, `SizeChartDialog`, `QuantityStepper`, `StickyBuyBar`.
- Use shadcn `Dialog`, `Sheet` (drawer), `Accordion` for the new UI.

## 7. Validation

- Playwright at 390×844 (mobile) and 1280×800 (desktop): hero animation still scrolls, mobile shows bottom nav, desktop hides it.
- Click a product → detail page loads, size chart opens, Add to Cart updates badge.
- No console errors; reduced-motion respected.

## Out of scope

- Real checkout / payments, accounts, wishlist persistence beyond localStorage, search results page.
