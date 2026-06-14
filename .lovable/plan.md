# VYROX product and collection expansion

## Product detail pages
- Make every Best Seller card open a dedicated route such as `/product/discipline-oversized-tee`.
- Build a premium shopping layout matching the current black/red VYROX visual system: media viewer on the left, product information and purchase controls on the right.
- Include product name, price, rating, short description, fabric/fit details, delivery/returns highlights, quantity selector, and related products.

## Interactive 360° preview
- Create consistent multi-angle product imagery for each T-shirt: front, front-quarter, side, back-quarter, and back.
- Add a drag/swipe-controlled viewer that cycles smoothly through those angles, with arrow controls, thumbnails, an angle indicator, and mobile touch support.
- Keep a standard image gallery fallback and respect reduced-motion preferences.

## Size and purchase controls
- Add selectable sizes `S`, `M`, `L`, `XL`, and `XXL`, with a clear selected state and validation before purchase.
- Add a size-chart modal with chest, length, shoulder, and recommended-fit measurements.
- Add quantity controls, `Add to Cart`, and `Buy Now` actions.
- Build a frontend cart drawer with line items, selected size, quantity changes, subtotal, removal, and an empty state. `Buy Now` will open the same checkout-ready cart state.
- Because Shopify setup was skipped, checkout will remain a polished frontend demo rather than processing real orders; it can be connected later without redesigning these pages.

## Collection pages
- Make each `Explore Our Collections` card open its own route:
  - `/collections/oversized-tees`
  - `/collections/premium-tees`
  - `/collections/accessories`
  - `/collections/gift-box`
- Add collection hero imagery, category description, product counts, sorting, lightweight filters, and responsive product grids.
- Link collection products back to their product detail pages and preserve the shared VYROX navigation/footer.

## Shared structure and verification
- Centralize catalog, sizes, pricing, imagery, and collection membership so cards and detail pages stay consistent.
- Reuse the existing semantic design tokens and Button component; add only product-viewer, modal, cart, and collection-specific presentation styles.
- Add unique title, description, and social metadata for each product and collection route.
- Verify card navigation, mouse drag, touch swipe, size validation, size chart, cart updates, responsive layouts, keyboard focus, and direct-route loading.