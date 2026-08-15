# Payment Function

## Customer Goal

Customers can pay securely and understand payment success, failure, cancellation, and retry states.

## Scope

- Payment provider decision.
- Payment form or hosted checkout.
- Hong Kong local payment methods: AlipayHK, PayMe, and FPS.
- Success state.
- Failed payment state.
- Cancelled payment state.
- Refund/support policy placement.

## First Build Slice

Decide payment provider and design payment states before integrating real payments.

## Recommended Launch Approach

For Hong Kong customers, support local payment methods first:

- `AlipayHK`: integrate through a payment gateway/acquirer that supports AlipayHK.
- `PayMe`: launch with QR/payment-reference confirmation first unless merchant API access is available.
- `FPS`: launch with FPS ID or QR code plus order reference; automate reconciliation later if bank tooling allows it.
- `Card / Stripe`: keep as an optional card checkout path.

The first live version can use manual PayMe/FPS confirmation while gateway integrations are being approved.

## Design Requirements

- Never expose secret keys in frontend code.
- Never expose gateway API keys in frontend code.
- Keep payment UI quiet and trustworthy.
- Clearly show secure payment messaging and final totals.
- For manual PayMe/FPS flows, show the order reference clearly and tell customers when the order will be confirmed.

## Verification

- Payment success creates an order confirmation.
- Failed payment allows retry without losing cart data.
- Totals remain consistent across cart, order review, and payment.
- Manual local payment orders include payment method, order reference, and support instructions.
