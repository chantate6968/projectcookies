# Cart Function

## Customer Goal

Customers can review selected cookie boxes, adjust quantities, apply promotions, and understand totals before checkout.

## Scope

- Cart drawer or cart page.
- Quantity editing.
- Remove item.
- Promo code entry.
- Subtotal, delivery estimate, discount, and total.
- Empty cart state.

## First Build Slice

Implement cart state for adding products and updating quantities.

## Design Requirements

- Keep totals exact and visible.
- Make promo validation clear without loud error styling.
- Preserve premium tone even in empty/error states.

## Verification

- Quantity changes update totals correctly.
- Empty cart has a useful return-to-shop action.
- Promo code behavior is testable.
