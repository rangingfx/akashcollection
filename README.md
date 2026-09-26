# Akash Collection

A simple Firebase-powered storefront with a secure product manager at `/admin`.

## Features

- Public product collection with search, categories, stock, featured products, and a local cart
- Reliable WhatsApp checkout—no false order-success screen or broken server API
- Protected `/admin` login
- Add, edit, hide, feature, restock, and delete products
- Multiple product-image uploads to Firebase Storage
- Firestore and Storage rules that deny unauthorised writes

## Local development

```bash
npm install
npm run dev
```

## Firebase setup

1. Enable **Email/Password** under Firebase Authentication.
2. Create the `admin@rangingfx.com` user in Firebase Authentication and complete email verification.
3. Deploy `firestore.rules` to the custom Firestore database configured in `firebase-applet-config.json`.
4. Deploy `storage.rules` to Firebase Storage.
5. Add your production domain to Firebase Authentication's authorised domains.

There is intentionally no public sign-up screen. The database and storage rules require the exact verified administrator email in addition to successful authentication.

## Deployment

Build output is in `dist/`:

```bash
npm run lint
npm run build
```

Configure the host to serve `index.html` for `/admin` so the React admin route can load. Keep `/admin` out of public navigation and search indexing.
