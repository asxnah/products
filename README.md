# Products Dashboard

A React/Next.js application for managing and browsing products with features such as filtering, sorting, pagination, favorites, and editing. Built with **Zustand**, **Tailwind CSS**, and **React Hook Form**.

## Features

- **Fetch products** from a public API (`https://dummyjson.com/products`).
- **Favorites system**: mark/unmark products as favorite.
- **Filter & search**:
  - Filter by all or favorites.
  - Search by product title.
  - Filter by category.

- **Sorting**:
  - By price (ascending/descending).

- **Pagination**: displays products in pages with a configurable number of items per page.
- **CRUD operations**:
  - Add new product.
  - Edit product details.
  - Delete product.

- **Product details page** with full description, image, price, and rating.
- **Responsive UI** built with Tailwind CSS.

## Tech Stack

- **Next.js 16** (App Router / Client Components)
- **React 19**
- **TypeScript**
- **Zustand** for state management
- **React Hook Form** for forms
- **Tailwind CSS** for styling
- **Lucide React** icons

## Project Structure

```
/components    # Reusable UI components (ProductCard, EditProductForm, Navbar)
/hooks         # Custom hooks (useProductsFilters)
/store         # Zustand store for products
/shared-types  # TypeScript types
/pages         # Next.js pages (Products list, Product detail, Edit product)
/api           # API fetching utilities
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/asxnah/products.git
cd products-dashboard
```

2. Install dependencies:

```bash
npm i
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `dev` – start Next.js dev server
- `build` – build for production
- `start` – start production server
- `lint` – run linter
- `format` – format code (if Prettier is set up)

## State Management

All product-related state is managed with **Zustand**:

- `products`: list of products
- `favorites`: list of favorite product IDs
- Methods:
  - `fetchProducts()`
  - `toggleLike(id)`
  - `deleteProduct(id)`
  - `addProduct(product)`
  - `updateProduct(id, updated)`
  - `getProductById(id)`
