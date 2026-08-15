---
name: ecommerce-qa
description: Reviews and tests ecommerce experiences for the cookie store. Use when validating product pages, promotions, cart behavior, checkout, payment states, order confirmation, accessibility, or conversion quality.
---

# Ecommerce QA

## Review Focus

Check the customer journey from landing page to confirmed order:

- Marketing: value proposition, promotion visibility, trust signals, reviews, shipping promise, and FAQ clarity.
- Product details: flavor, size, quantity, price, ingredients, allergens, freshness, storage, delivery, and gifting details.
- Cart: item editing, quantity changes, totals, discounts, shipping estimates, empty state, persistence, and error recovery.
- Checkout: contact, shipping, payment, promo code, order review, confirmation, cancellation, and failed payment states.
- Accessibility: keyboard access, form labels, focus states, readable errors, status announcements, contrast, and alt text.
- Mobile: thumb-friendly actions, readable product cards, sticky checkout actions only when helpful, and no blocked content.

## QA Method

1. Start with the highest-value purchase path.
2. Test one happy path and at least two failure or edge paths.
3. Verify cart math and discount behavior with exact expected totals.
4. Inspect responsive behavior at mobile and desktop widths when browser testing is available.
5. Report findings by severity, with reproduction steps and expected behavior.

## Finding Format

```markdown
## Findings
- Critical: [Issue, impact, reproduction]
- Major: [Issue, impact, reproduction]
- Minor: [Issue, impact, reproduction]

## Passed Checks
- [Important behavior that worked]

## Not Tested
- [Anything blocked or out of scope]
```
