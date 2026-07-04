# Bandar Pelumas Web Services

**Bandar Pelumas Web Services** is a full-stack web platform for PT. Bandar Pelumas Sejahtera Abadi — a company specializing in automotive lubricants, spare parts, and related services. The platform serves a dual purpose: it acts as a **company profiling site** that broadcasts and promotes the brand, and as an **online marketplace** where customers can browse and purchase lubricants, filters, spare parts, and batteries. Built on a modern React + Vite frontend and an Express + TypeScript backend, the system is designed to deliver a fast, mobile-friendly experience while laying a scalable foundation for future features such as authentication, inventory management, and order processing.

---

## Table of Contents

### Frontend Pages

| Route         | Page                           | Description                                                             |
| ------------- | ------------------------------ | ----------------------------------------------------------------------- |
| `/`           | [Home](#home-page)             | Landing page — hero, statistics, services, features, testimonials, blog |
| `/about`      | [About](#about-page)           | Company profile — vision, mission, highlights, FAQs                     |
| `/spareparts` | [Spareparts](#spareparts-page) | Product catalog and marketplace — browse, search, filter, and order     |
| `/contact`    | [Contact](#contact-page)       | Contact form, location map, business hours, WhatsApp integration        |

### Backend API Endpoints

| Method | Endpoint | Description                                                             |
| ------ | -------- | ----------------------------------------------------------------------- |
| `GET`  | `/`      | Health check — returns server status and client device/browser info     |
| `POST` | `/`      | Submit a message — validates and acknowledges incoming message payloads |
| `PUT`  | `/`      | Update a message record — validates and processes update payloads       |
| `POST` | `/users` | Create a user — validates user data and returns a generated user record |

#### Data Models

**Message Payload** — used by `POST /` and `PUT /`

```ts
{
  message:   string,   // message body text
  requestId: string,   // unique identifier for the request
  source:    string,   // origin or client identifier
  timestamp: string    // ISO 8601 datetime string
}
```

**User Payload** — used by `POST /users`

```ts
{
  name:  string,   // full name of the user
  email: string,   // valid email address
  age:   number    // age (positive integer)
}
```

**User Response** — returned by `POST /users`

```ts
{
  id:    string,   // auto-generated unique user ID
  name:  string,
  email: string,
  age:   number
}
```

---

## Contents

### 1. Getting Started

#### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A modern web browser (Chrome, Firefox, Safari, Edge)

#### Installation

Clone the repository and install dependencies for both the frontend and backend:

```bash
git clone https://github.com/msultont/bandarpelumas-webservices.git
cd bandarpelumas-webservices
```

**Install frontend dependencies:**

```bash
cd frontend
npm install
```

**Install backend dependencies:**

```bash
cd ../backend
npm install
```

#### Running in Development

Open two terminal sessions — one for each service.

**Terminal 1 — Backend (port 3000):**

```bash
cd backend
npm run dev
```

> If a `dev` script is not defined, compile and run manually:
>
> ```bash
> npm run build && npm start
> ```

**Terminal 2 — Frontend (port 5173):**

```bash
cd frontend
npm run dev
```

The frontend dev server will open automatically at `http://localhost:5173`. All requests to `/api/*` are proxied to the backend at `http://127.0.0.1:3000`.

#### Building for Production

**Build the backend:**

```bash
cd backend
npm run build
npm start
```

**Build the frontend:**

```bash
cd frontend
npm run build
```

The compiled frontend output will be placed in `frontend/dist/`. This folder is ready to be deployed to any static hosting service (e.g., GitHub Pages, Netlify, Vercel).

#### Running Tests (Backend)

```bash
cd backend
npm test
```

Jest and Supertest are used for API integration tests.

#### CI/CD — Automatic Deployment

The GitHub Actions workflow at `.github/workflows/deploy.yml` automatically builds and deploys the frontend to **GitHub Pages** on every push to the `master` branch that includes changes inside the `frontend/` directory.

Live URL: `https://msultont.github.io/bandarpelumas-webservices/`

---

### 2. Platform User Flow

#### Home Page

The Home page (`/`) is the entry point of the platform. It introduces visitors to Bandar Pelumas through several sections presented in sequence:

1. **Hero** — A full-width banner with a compelling headline, a brief tagline about the company's offerings, and a primary call-to-action (CTA) button that directs users to the Spareparts catalog.
2. **Stats** — Key figures highlighting the company's scale (e.g., number of products, years of operation, customers served).
3. **Services** — Cards summarizing the three core service categories: lubricants, spare parts, and automotive services.
4. **Features** — A "Why Choose Us" section covering competitive advantages such as product authenticity, competitive pricing, and fast delivery.
5. **Testimonials** — Real customer reviews to build trust with new visitors.
6. **Blog** — A preview of recent articles covering automotive tips and product guides.

#### About Page

Navigating to `/about` provides deeper company context:

- **Vision & Mission** — The company's long-term goals and operating principles.
- **Highlights** — Milestones, certifications, and key achievements.
- **FAQs** — Answers to common customer questions about products, ordering, and services.

#### Spareparts Page (Marketplace)

The Spareparts page (`/spareparts`) is the core marketplace experience:

1. **Browse the catalog** — Products are displayed as cards in a responsive grid. Each card shows the product image, name, SKU, price, star rating, and status badges (Sale, New, Hot).
2. **Search** — Use the search bar at the top of the catalog to filter products by keyword.
3. **Filter by category** — Select from four product categories:
    - **Pelumas** — Engine oils and lubricants
    - **Filter** — Oil, air, and fuel filters
    - **Sparepart** — General automotive spare parts
    - **Aki** — Car and motorcycle batteries
4. **Browse subcategories** — The category panel also exposes subcategories for more granular navigation.
5. **New Arrivals** — A dedicated section highlights the latest products added to the catalog.
6. **Brand Showcase** — Displays carried brands for quick brand-based discovery.
7. **Making a Purchase** — To order a product, customers click the **Order / Add to Cart** button on a product card. The purchase flow currently routes the customer to the Contact page or a WhatsApp chat to complete the transaction with a sales agent. This keeps the ordering process simple and personalized while a full cart and checkout system is under development.

#### Contact Page

The Contact page (`/contact`) provides all the means for customers to reach the company:

- **Contact Form** — Submit a name, email, and message directly to the business.
- **Location Map** — An embedded map showing the physical store location.
- **Business Hours** — Operating hours displayed clearly for in-person visits.
- **WhatsApp Chat** — A direct link that opens a pre-filled WhatsApp conversation with the sales team for fast responses.
- **Social Media Links** — Quick links to Bandar Pelumas' social media profiles.

---

### 3. Project Structure

```
bandarpelumas-webservices/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions: auto-deploy frontend to GitHub Pages
├── .vscode/
│   └── settings.json               # VS Code workspace settings
├── archive/
│   └── styles/                     # Archived CSS files (not in active use)
├── backend/                        # Express + TypeScript API server
│   ├── src/
│   │   ├── server.ts               # Entry point — routes, middleware, Zod validation
│   │   └── server.test.ts          # Jest + Supertest API integration tests
│   ├── dist/                       # Compiled JavaScript output (generated by build)
│   ├── public/                     # Static files served by Express
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   └── eslint.config.js
├── frontend/                       # React + Vite SPA
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Route: /
│   │   │   ├── About.jsx           # Route: /about
│   │   │   ├── Spareparts.jsx      # Route: /spareparts
│   │   │   └── Contact.jsx         # Route: /contact
│   │   ├── components/
│   │   │   ├── Header.jsx          # Site navigation
│   │   │   ├── Hero.jsx            # Hero banner with CTA
│   │   │   ├── Stats.jsx           # Key statistics
│   │   │   ├── Services.jsx        # Service category cards
│   │   │   ├── Features.jsx        # Competitive advantage section
│   │   │   ├── Testimonials.jsx    # Customer reviews
│   │   │   ├── Blog.jsx            # Article previews
│   │   │   ├── Footer.jsx          # Site footer
│   │   │   └── ScrollToTop.jsx     # Scroll restoration utility
│   │   ├── lib/
│   │   │   └── api.js              # Axios instance (base URL: /api, proxied to backend)
│   │   ├── styles/
│   │   │   └── index.css           # Global stylesheet
│   │   ├── App.jsx                 # Root component with React Router route definitions
│   │   └── main.jsx                # Application entry point
│   ├── public/                     # Static assets (images, icons, fonts)
│   ├── index.html                  # HTML shell
│   ├── vite.config.js              # Vite config — base URL, dev proxy, port
│   └── package.json
├── bandarpelumas.code-workspace    # VS Code multi-root workspace config
└── README.md
```

---

## Tech Stack

| Layer                | Technology              | Version      |
| -------------------- | ----------------------- | ------------ |
| Frontend framework   | React                   | 18.2.0       |
| Frontend routing     | React Router DOM        | 6.14.0       |
| Frontend build tool  | Vite                    | 4.4.5        |
| Frontend HTTP client | Axios                   | 1.18.1       |
| Backend framework    | Express                 | 5.2.1        |
| Backend language     | TypeScript              | 6.0.3        |
| Schema validation    | Zod                     | 4.4.3        |
| Testing              | Jest + Supertest        | 30.4.2 / 7.x |
| CI/CD                | GitHub Actions          | —            |
| Deployment           | GitHub Pages (frontend) | —            |

---

## Author

| Field         | Details                                          |
| ------------- | ------------------------------------------------ |
| **Name**      | Muhammad Sulthon Tauhid                          |
| **Company**   | PT. Bandar Pelumas Sejahtera Abadi               |
| **Position**  | Operational Development                          |
| **GitHub**    | [msultont.github.io](https://msultont.github.io) |
| **Instagram** | [@msultont](https://instagram.com/msultont)      |
| **Phone**     | +62 8 111 09 0770                                |
| **Email**     | msultont55@gmail.com                             |
