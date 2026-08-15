---
name: cookie-store-planning
description: Plans and scopes cookie ecommerce website work. Use when designing pages, product catalog features, marketing sections, promotions, cart, checkout, transactions, or implementation phases for the cookie store.
---

# Cookie Store Planning

## Workflow

1. Read the current repo state and applicable Cursor rules.
2. Identify which ecommerce layer the request touches:
   - Marketing: positioning, hero, campaigns, promotions, reviews, FAQs.
   - Catalog: cookie products, variants, ingredients, allergens, pricing, availability.
   - Shopping: cart, promo codes, shipping estimates, checkout, payment, order confirmation.
   - Operations: inventory, fulfillment, emails, analytics, admin, support.
3. Turn the request into a small, buildable slice with clear user outcomes.
4. Name any product, technical, payment, legal, or content decisions that must be confirmed before implementation.
5. Recommend verification that matches risk: visual check for layout, unit tests for pricing and discounts, end-to-end tests for checkout.

## Planning Output

Use this shape for plans:

```markdown
## Goal
[One-sentence outcome]

## Recommended Slice
[Smallest useful version to build first]

## Key Decisions
- [Decision or assumption]

## Implementation Notes
- [Concrete technical direction]

## Verification
- [How to test or review]
```

## Defaults

- Prefer a premium, warm bakery brand voice.
- Prefer mobile-first ecommerce UX.
- Prefer realistic cookie content over placeholder text.
- Keep pricing, discounts, taxes, and shipping logic easy to test.
