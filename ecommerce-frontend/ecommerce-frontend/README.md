# ShopFront — Frontend (React + Vite)

## Setup

```bash
npm install
cp .env.example .env   # edit VITE_API_BASE_URL if your backend isn't on localhost:8080
npm run dev
```

## Expected backend endpoints

This frontend assumes the Spring Boot backend exposes:

| Method | Endpoint              | Body                              | Notes                              |
|--------|------------------------|------------------------------------|-------------------------------------|
| POST   | `/api/auth/login`      | `{ email, password }`             | Returns `{ token, user }`           |
| POST   | `/api/auth/register`   | `{ name, email, password }`       | Returns `{ token, user }`           |
| GET    | `/api/products`        | —                                  | Returns array of products           |
| POST   | `/api/orders`          | `{ productId, quantity }` (JWT)   | Backend computes `total` and `status` |
| GET    | `/api/orders/my`       | — (JWT)                           | Optional, not used in UI yet        |

JWT is read from `localStorage` and attached as `Authorization: Bearer <token>` on every request via the axios interceptor in `src/services/api.js`.

## Notes on design choices

- Since the `orders` table stores one `product_id` per row, the cart can hold multiple distinct products, but **checkout sends one `POST /api/orders` call per cart line** (so a cart with 2 different products creates 2 order rows).
- Auth state and cart state are kept in React Context (`AuthContext`, `CartContext`) and persisted only for auth (via `localStorage`); cart is in-memory only and resets on refresh — swap in `localStorage`/backend persistence if you want it to survive reloads.
- `ProtectedRoute` in `App.jsx` guards `/checkout`; `/cart` is viewable while logged out, but checkout redirects to `/login`.
