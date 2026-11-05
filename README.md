# FlightOTA — Travel API Marketplace (Frontend)

Frontend for a B2B travel API marketplace and developer platform, built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, shadcn/ui (Radix), Redux Toolkit + RTK Query, React Hook Form + Zod, Framer Motion and Sonner.

> This repository is the **frontend only**. The NestJS gateway, database and supplier adapters are a separate application. Until that backend exists, a small mock API under `src/app/api/v1` answers the frontend's requests.

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (validates Cache Components rules)
npm run lint
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata, sitemap) |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL used by RTK Query. Defaults to the mock API at `/api/v1`. Point it at the NestJS gateway when that is ready. |
| `API_INTERNAL_URL` | Optional. When set, Server Components fetch catalog data from the backend instead of the bundled mock. |
| `NEXT_PUBLIC_GATEWAY_URL` | Public API gateway URL shown in docs and code samples |

## Status

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | Design system, marketing website, navigation, footer | ✅ |
| 2 | API marketplace, categories, API details, compare, pricing | ✅ |
| — | Documentation portal, integration guides, blog, about, contact, legal | ✅ |
| 3 | Auth (login/register…), organizations, developer dashboard | Next |
| 4–6 | API keys, usage, logs, webhooks, billing/wallet, admin | Planned |

`/login` and `/register` are linked from the header but will be built in Phase 3.

## Architecture

```
src/
  app/
    (marketing)/          public site: home, apis, apis/[slug], apis/compare, pricing,
                          documentation(+[slug], openapi.json), guides, blog, about, contact, terms, privacy
    api/v1/               mock API (catalog, contact, newsletter) — dev stand-in only
    sitemap.ts, robots.ts, not-found.tsx
  components/
    ui/                   shadcn/ui primitives (generated, themed by tokens)
    common/               Container, Section, PageHero, CodeBlock, states, Reveal, Logo…
    layout/               SiteHeader, SiteFooter, ThemeToggle
    marketplace/          ApiCard, CategoryCard, CompareToggle
    documentation/        CodeTabs, EndpointReference, ParamsTable
    marketing/            PricingCard, FaqList
  features/               feature modules (components + pure logic)
    marketing/  marketplace/  api-detail/  pricing/  documentation/
  redux/                  store (combineSlices), typed hooks, slices/
  services/
    api/                  RTK Query: base-api (auth header, re-auth on 401, error normalization) + injected endpoints
    server/               server-only repositories (catalog, content) for Server Components
  mocks/                  catalog data, content, mock HTTP helpers
  lib/                    utils, code-sample generator, OpenAPI builder, Zod schemas
  config/ constants/ types/ utils/
```

### Key decisions

- **Server Components by default.** Client components are used only for interactivity: filters, tabs, forms, menus, the compare tray.
- **Marketplace filters live in the URL.** Results are shareable and server-rendered on first load. After that, filtering runs instantly on the client, and `history.replaceState` keeps the URL in sync.
- **Redux holds only cross-page state.** That means the auth session (in memory only) and the API comparison tray. The access token is never written to localStorage. Refresh tokens are expected in an httpOnly cookie.
- **One catalog model drives everything.** It feeds the marketplace, API pages, comparison, docs, code samples (cURL, JS, TS, Python, PHP) and the OpenAPI 3.1 export at `/documentation/:slug/openapi.json`.
- **Supplier honesty.** Every booking or ordering endpoint is marked `supplierAction`, and its docs say it runs only with a connected supplier. The sandbox is described as simulated throughout.

### Design tokens

The palette comes from the flightota reference: brand red `#dc0e18`, sea teal `#00a99d` and navy `#29457e`, with light surfaces `#f5f7fa`, and the Outfit font for UI text. Tokens are defined in `src/app/globals.css` as semantic CSS variables (`primary`, `muted`, `border`…) with a `.dark` variant. Components only use the semantic names.

### Placeholders to replace before launch

Partner names, testimonials and headline stats (`src/constants/marketing.ts`), the office address (`src/config/site.ts`), SDK package names, blog and guide content (`src/mocks/content`), and the legal templates (`src/mocks/content/legal.ts`, which need legal review).
