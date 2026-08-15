# Stripe Launch Checklist

## Required Before Live Payments

- Create a Stripe account.
- Add `STRIPE_SECRET_KEY` to `.env.local`.
- Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env.local`.
- Add `STRIPE_WEBHOOK_SECRET` after creating a webhook endpoint.
- Install and wire the Stripe SDK.
- Create checkout sessions on the server only.
- Verify success, cancel, and failed-payment flows.
- Confirm tax, shipping, refund, and privacy policies.

## Current State

The app includes a safe placeholder API route at `/api/checkout-session`.

It returns a configuration error until real Stripe credentials and checkout-session creation are added.
