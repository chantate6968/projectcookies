# lamsumsum cookies

A Next.js + TypeScript + Tailwind storefront for a commercial cookie brand.

## Current Scope

- Branded homepage direction
- Logo template suggestions
- Featured cookie product cards
- Launch promotion concept
- Interactive cart with quantity editing, removal, promo code, and local persistence
- Checkout form with local preview order confirmation
- Step-by-step commercial UI guide
- Basic route structure for collection, product details, cart, checkout, order confirmation, and support
- Payment scaffolding for Hong Kong local methods plus optional Stripe/card integration
- Contact links for phone, Instagram, and Facebook

## Project Organization

- `docs/design`: ready-to-go design direction, brand system, logo asset references, homepage plan.
- `docs/tasks`: function-by-function build plan for marketing, browse, product details, cart, order, payment, and support.
- `src/features`: future source folders matching each ecommerce function.

## Run Locally

Install dependencies once a JavaScript package manager is available:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Next Build Slices

1. Add FPS ID/QR and PayMe link/QR for local manual confirmation.
2. Choose an AlipayHK gateway/acquirer and add test credentials.
3. Add real Stripe checkout session creation if card payments are needed.
4. Finalize delivery, refund, allergy, and privacy policies.
5. Replace illustrated placeholders with real product photography.
6. Add automated tests for pricing, discounts, cart totals, and checkout states.
7. Connect analytics, email confirmation, and order management.

## Current Routes

- `/`
- `/collection`
- `/product/brown-butter-chocolate`
- `/product/matcha-white-chocolate`
- `/product/strawberry-shortbread`
- `/cart`
- `/checkout`
- `/order-confirmation`
- `/support`

## Contact

- Phone: `+852 9522 6840`
- Instagram: `https://www.instagram.com/lamsumsumcookies`
- Facebook: `https://www.facebook.com/lamsumsumcookies`

Update the Instagram/Facebook URLs later if the official handles are different.
