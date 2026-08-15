# Hong Kong Local Payment Checklist

## What To Provide

### FPS

- FPS ID, phone number, or email alias.
- Account display name.
- Optional FPS QR code image.
- Confirmation rule: when an order is considered paid.

Example environment values:

```env
NEXT_PUBLIC_FPS_ID=your-fps-id
NEXT_PUBLIC_FPS_ACCOUNT_NAME="lamsumsum cookies"
```

### PayMe

- PayMe business or personal payment link.
- PayMe QR code image URL or asset.
- Confirmation rule: manual screenshot upload, WhatsApp confirmation, or admin review.

Example environment values:

```env
NEXT_PUBLIC_PAYME_LINK=https://payme.hsbc/...
NEXT_PUBLIC_PAYME_QR_IMAGE_URL=/payments/payme-qr.png
```

### AlipayHK

AlipayHK generally requires a supported payment gateway or merchant acquiring provider.

Provide:

- Chosen provider name.
- Merchant ID.
- API credentials.
- Callback/webhook documentation.
- Test credentials if available.

Example environment values:

```env
ALIPAYHK_PROVIDER=provider-name
ALIPAYHK_MERCHANT_ID=merchant-id
ALIPAYHK_API_KEY=secret-api-key
```

## Recommended First Launch

Start with:

1. FPS manual transfer with order reference.
2. PayMe QR/link with order reference.
3. Stripe/card as optional.
4. AlipayHK after merchant gateway approval.

This lets the store accept Hong Kong customer payments sooner without blocking on every gateway approval.
