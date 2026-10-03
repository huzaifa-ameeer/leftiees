# Leftiees

A modern denim e-commerce storefront — browse leftover drops, add to cart, and
check out with Cash on Delivery. Includes a full admin panel for managing
products and orders.

## Tech stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` configuration)
- **MongoDB** with **Mongoose** for products and orders
- **Better Auth** for accounts (email + password, MongoDB adapter)
- **Cloudinary** for product image uploads
- **Resend** for transactional email
- **Zustand** for cart state (persisted to `localStorage`)
- **react-hot-toast** for notifications

## Features

**Storefront**

- Explore page with filters (price range, brand) and sorting (price low/high)
- Product detail pages with image galleries and descriptions
- Guest-first flow: browse, add to cart, and place an order without an account
- Add to Cart shows a toast and keeps you on the page
- Cart page with quantity controls, remove, subtotal and total quantity
- Cash on Delivery checkout with customer and shipping details
- Optional accounts — login/signup with email + password (no OTP required)
- Responsive layout with a mobile slide-in menu

**Admin** (`/admin/login`)

- **Fresh products** — quick-add a product that appears in "Fresh drops" on the home page
- **Add product** — full product with images, description, sale price and stock
- **Manage products** — edit or delete existing products
- **Orders** — view customer/shipping details and update status (pending → dispatched → delivered)

## Getting started

### 1. Prerequisites

- Node.js 20+ (or Bun)
- A MongoDB database (Atlas or local)
- A Cloudinary account (for image uploads)

### 2. Install

```bash
bun install
```

### 3. Environment variables

Create a `.env` file in the project root:

```bash
# MongoDB (used by both Better Auth and Mongoose)
MONGO_URI="mongodb://..."
MONGO_DB_NAME="leftiees"          # optional, defaults to "leftiees"

# Better Auth
BETTER_AUTH_SECRET="..."
BETTER_AUTH_URL="http://localhost:3000"

# Cloudinary (product image uploads)
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Resend (transactional email)
RESEND_API_KEY="..."
EMAIL_FROM="Leftiees <onboarding@resend.dev>"

# Admin access (comma-separated emails). You can also set role: "admin"
# on a user document in MongoDB.
ADMIN_EMAILS="you@example.com"
```

### 4. Seed sample products (optional)

```bash
bun run seed
```

Only inserts when the products collection is empty. Uses Node (the Bun runtime
is incompatible with the `bson` package used by the MongoDB driver).

### 5. Run

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run build` | Production build |
| `bun run start` | Start the production server |
| `bun run lint` | Run ESLint |
| `bun run seed` | Seed sample products into MongoDB |

## Admin access

1. Sign up once with the email listed in `ADMIN_EMAILS` (or set `role: "admin"`
   on the user document in MongoDB).
2. Go to `/admin/login` and sign in.

Admins sign in without the customer email-verification step.

## Project structure

```
app/
  page.tsx              Home (hero, marquee, fresh drops)
  explore/              Product listing + filters
  product/[id]/         Product details
  cart/                 Cart
  checkout/             COD checkout
  login, signup         Accounts
  admin/                Admin panel (login + dashboard)
  api/                  Products, orders, upload, auth helpers
  components/           UI components (storefront + admin)
lib/
  products.ts           Product data access (Mongoose)
  orders.ts             Order data access (Mongoose)
  models/               Mongoose schemas
  cart.ts               Zustand cart store
  auth.ts               Better Auth server config
  admin.ts              Admin authorization
  mongoose.ts           Cached MongoDB connection
scripts/
  seed.mjs              Sample product seed script
```

## Notes

- **Carts are per browser.** The cart is stored in `localStorage`, so anonymous
  visitors are isolated from each other. Two people sharing the same browser
  profile share a cart — that's inherent to guest carts without a login.
- **Database.** Mongoose and Better Auth both target the `leftiees` database
  (override with `MONGO_DB_NAME`).
- **Checkout** is Cash on Delivery only — there is no online payment integration.
