# FlightOTA — Travel API Marketplace (Frontend)

Frontend for a B2B travel API marketplace and developer platform, built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, shadcn/ui (Radix), Redux Toolkit + RTK Query, React Hook Form + Zod, Framer Motion and Sonner.

> This repository is the **frontend only**. The admin backend (catalog, editable content, leads, media) is the separate `flightotaBackend` repository. Without a backend configured, the bundled data under `src/mocks/catalog` and `src/content` answers every request, so the site builds and runs on its own.

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
| `NEXT_PUBLIC_API_BASE_URL` | Base URL used by RTK Query. Defaults to `/api/v1`, which the web server routes to the admin backend. |
| `API_INTERNAL_URL` | Optional. When set, Server Components fetch the catalog and all editable content from the admin backend instead of the bundled data. |
| `REVALIDATE_SECRET` | Shared with the admin backend; `POST /api/revalidate` refreshes cached content after an edit. |
| `NEXT_PUBLIC_GATEWAY_URL` | Public API gateway URL shown in docs and code samples |

## Editable content (CMS)

Everything editorial on the site is data: page copy, navigation, SEO cards, blog posts, guides, legal documents, solutions, the airline directory and the partner API guides. The shapes live in `src/types/pages.ts`, `src/types/content.ts`, `src/types/solutions.ts` and `src/types/airlines.ts`; `src/types/cms.ts` lists every type.

- `src/content/**` holds the bundled data: the fallback when `API_INTERNAL_URL` is unset, and the seed source for the admin database.
- `src/services/server/cms-repository.ts` exposes `getSingleton(type)`, `listEntries(type)` and `getEntry(type, slug)`. Every read is cached (`"use cache"`) under the tags `cms`, `cms:<type>` and `cms:<type>:<slug>`; the admin panel revalidates those tags after a save (`src/app/api/revalidate/route.ts`).
- Icons are referenced by key (`src/lib/icon-keys.ts`, resolved in `src/components/common/icon-map.tsx`); colour tones by name (`src/lib/tones.ts`). Images are paths under `/images` or, for admin uploads, `/uploads`.
- `npm run cms:seed` exports the bundled data as JSON for the backend (`cms-seed/`); `API_INTERNAL_URL=… npm run cms:parity` checks that a backend serves exactly the bundled data.
- `draftSlugs` in `src/content/index.ts` lists entries that are drafts: the seed marks them unpublished, bundled reads hide them and the parity check skips them. Remove a slug once the entry is published in the admin panel.

- The header phone, footer address and WhatsApp number follow the visitor's country. nginx looks the country up (GeoIP) and passes it as `X-Country-Code`; `src/services/server/visitor-region.ts` picks the office from Site settings → Regional contact details, and the components in `src/components/layout/regional-contact.tsx` render inside their own `<Suspense>` so the rest of the page stays static. Without the header (local development) the fallback office is shown; `/api/geo?set=AE` previews another office for an hour.

Pages read their content once at the top (server components) and pass it down; client components receive plain JSON props.


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
    (marketing)/          public site: home, apis, apis/[slug], apis/compare, pricing, solutions(+[slug]), airlines,
                          documentation(+[slug], openapi.json), guides, blog, about, contact, terms, privacy
    api/v1/               mock API (catalog, contact, newsletter) — dev stand-in only; api/revalidate refreshes caches
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
    server/               server-only repositories (catalog-repository, cms-repository, seo) for Server Components
  content/                bundled editable content (fallback + seed source), see "Editable content"
  mocks/                  catalog data, partner API helpers, mock HTTP helpers
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

Partner names, testimonials and headline stats (home page), the office phone numbers, addresses and WhatsApp number (site settings → regional contact details; the Dubai and USA numbers are zeros), SDK package names, blog and guide content, and the legal templates (which need legal review) are all editable in the admin panel; their bundled defaults live under `src/content`.
