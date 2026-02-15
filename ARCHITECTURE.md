# Quietly Knocking (QKN) — Architecture Guide

> Last updated: 2026-02-15 by Claude (Session 84)
> For developers picking up this codebase. Start here.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite (SWC compiler)
- **UI Library:** shadcn/ui (Radix primitives + Tailwind CSS)
- **Routing:** react-router-dom v6
- **State:** React Query v5 (server state) + React Context (auth, tenant)
- **Backend:** Supabase (Postgres + Auth + RLS)
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts
- **Theme:** next-themes (dark mode default, `qkn-theme` localStorage key)
- **Hosting:** Lovable (build + deploy) → GitHub sync

## Application Structure

```
src/
├── App.tsx                    # Root: providers (Query, Auth, Tenant) + route definitions
├── main.tsx                   # Entry point: renders App into #root
├── contexts/
│   ├── AuthContext.tsx         # Supabase auth session + profile from DB
│   └── TenantContext.tsx       # Business/organization data, depends on AuthContext
├── hooks/
│   ├── useTheme.ts            # Dark/light mode toggle, persisted in localStorage
│   ├── useCampaignPurposes.ts # React Query: fetches campaign type options
│   └── use-mobile.tsx         # Mobile breakpoint detection (< 768px)
├── pages/                     # Route-level components (1:1 with App.tsx routes)
├── components/
│   ├── layout/                # AppLayout, AppSidebar, AppHeader, BottomNav
│   ├── auth/                  # AuthGuard, AuthRedirect, LoginForm, SignUpForm
│   ├── onboarding/            # 5-step wizard (StepBusiness → StepLaunch)
│   ├── dashboard/             # HeroMetrics, OnboardingTimeline, CampaignSummary, EcosystemCards
│   ├── landing/               # Public landing page sections
│   └── ui/                    # shadcn/ui primitives (don't modify directly)
├── lib/
│   ├── supabase.ts            # Supabase client singleton
│   ├── timezone.ts            # Pacific timezone utilities (prevents UTC date bugs)
│   └── utils.ts               # cn() classname merger (tailwind-merge + clsx)
```

## Route Map

| Route | Page | Auth Required | Purpose |
|-------|------|:---:|---------|
| `/` | Landing (or redirect) | No | Public landing page; redirects auth users to dashboard/onboarding |
| `/login` | LoginForm | No | Email/password login |
| `/signup` | SignUpForm | No | Account creation + profile record |
| `/forgot-password` | ForgotPassword | No | Password reset request |
| `/onboarding` | OnboardingWizard | Yes | 5-step setup: business → strategy → goals → audience → launch |
| `/dashboard` | Dashboard | Yes | Main hub: metrics, timeline, campaign summary, ecosystem integrations |
| `/campaigns` | Campaigns | Yes | Campaign management (placeholder) |
| `/leads` | Leads | Yes | Lead database & enrichment (placeholder) |
| `/sequences` | Sequences | Yes | Email sequence builder (placeholder) |
| `/landing-pages` | LandingPages | Yes | Landing page builder (placeholder) |
| `/infrastructure` | Infrastructure | Yes | Domain setup, DNS, warmup status (placeholder) |
| `/analytics` | Analytics | Yes | Campaign performance metrics (placeholder) |
| `/settings` | Settings | Yes | Account settings (placeholder) |

## Data Flow

```
User Action
    │
    ▼
Page Component (e.g., Dashboard.tsx)
    │
    ├──▶ AuthContext → profile (from Supabase Auth + profiles table)
    ├──▶ TenantContext → tenant (from tenants table, via profile.tenant_id)
    │
    ▼
Custom Hook (e.g., useCampaignPurposes.ts)
    │
    ▼
Supabase Client (src/lib/supabase.ts)
    │
    ▼
Supabase Postgres (with RLS — user sees only their data)
```

**Key pattern:** AuthContext provides the user identity, TenantContext provides the business context. Hooks use React Query for cacheable server data. Components never call Supabase directly.

## Authentication Flow

1. **Signup:** `supabase.auth.signUp()` → creates `profiles` record → redirects to `/onboarding`
2. **Login:** `supabase.auth.signInWithPassword()` → checks `tenants.onboarding_complete` → routes to `/dashboard` or `/onboarding`
3. **Session:** `AuthContext` listens to `onAuthStateChange`, provides `user` + `profile` + `loading`
4. **Protected routes:** `AuthGuard` wraps all post-login pages, redirects to `/login` if no session
5. **Home redirect:** `AuthRedirect` on `/` sends auth users to dashboard (if onboarded) or onboarding (if not)

## Multi-Layer Auth State

| Layer | Source | What It Provides |
|-------|--------|-----------------|
| Session | Supabase Auth (JWT) | Authentication proof, user ID |
| Profile | `profiles` table | Role, tenant link, onboarding step |
| Tenant | `tenants` table | Business name, plan, onboarding_complete gate |

## Onboarding Flow

The 5-step wizard progressively creates business infrastructure:

| Step | Component | What It Does |
|------|-----------|-------------|
| 0 | StepBusiness | Collects business name, website, industry → **creates `tenants` record** |
| 1 | StepStrategy | Campaign purpose selection (from `campaign_purposes` table) |
| 2 | StepGoals | Monthly lead target → calculates required domains/accounts |
| 3 | StepAudience | Persona definition (name, job titles, industries, locations) |
| 4 | StepLaunch | Summary + timeline → sets `tenants.onboarding_complete = true` |

**Infrastructure calculation shown in StepLaunch:**
- Sending accounts needed: `ceil((target_leads × 5 × 3) / (20 × 22))` × 3
- E.g., 50 leads/month → 2 domains, 6 sending accounts, ~4 week warmup

## Supabase Tables

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `profiles` | User accounts + onboarding state | `id` (= auth user ID), `tenant_id` (FK), `email`, `full_name`, `role`, `is_super_admin`, `onboarding_step` |
| `tenants` | Business/organization data | `id`, `name`, `slug`, `website`, `industry`, `plan`, `onboarding_complete`, `target_leads_per_month`, `brand_colors`, `settings` |
| `campaign_purposes` | Campaign type options catalog | `id`, `name`, `slug`, `description`, `icon`, `color`, `is_active`, `sort_order` |

**Key relationships:**
- `profiles.tenant_id` → `tenants.id`
- All authenticated queries scoped by user ID or tenant ID via RLS

## Feature Status

| Feature | Status | Notes |
|---------|--------|-------|
| Landing page | Built | Full marketing page with hero, pricing, mission |
| Auth (login/signup/reset) | Built | Supabase email/password |
| Onboarding wizard | Built | 5-step flow, creates tenant + profile |
| Dashboard | Built | Metrics (zeros), timeline, ecosystem cards |
| Campaigns | Placeholder | EmptyState component |
| Leads | Placeholder | EmptyState component |
| Sequences | Placeholder | EmptyState component |
| Landing Pages | Placeholder | EmptyState component |
| Infrastructure | Placeholder | EmptyState component |
| Analytics | Placeholder | EmptyState component |
| Settings | Placeholder | EmptyState component |

## Ecosystem Integrations (Planned)

| Product | Integration Point | Purpose |
|---------|------------------|---------|
| Quietly Writing (QWR) | Email sequences | AI voice-matched email generation |
| Quietly Spotting (QSP) | Campaign results | Performance dashboards for campaigns |

## Key Architectural Decisions

1. **Tenant-first multi-tenancy.** Signup creates a profile; onboarding creates a tenant. This defers tenant creation until user provides business name, avoiding empty records.

2. **Single boolean gate.** Dashboard access is controlled by `tenants.onboarding_complete`. All feature access cascades from this single flag.

3. **Placeholder pattern.** Most routes beyond dashboard render `EmptyState` components. This decouples routing from feature implementation, allowing early navigation structure while features are built.

4. **Dark mode default.** `useTheme()` defaults to dark; light mode is opt-in via localStorage. CSS uses `:root` (dark) and `[data-theme="light"]` selectors per QWF accessibility standard.

5. **Context for identity, React Query for data.** Auth and tenant contexts handle "who am I?" state. React Query handles cacheable server data like campaign purposes.

6. **No RBAC yet.** `role` and `is_super_admin` fields exist in profiles but aren't enforced in UI. All authenticated users have equal access.

7. **Responsive three-tier layout.** Mobile (< 768px): bottom nav. Tablet (768–1024px): overlay sidebar. Desktop (> 1024px): persistent collapsible sidebar.

## Known Limitations

- **Most features are placeholders.** Only onboarding + dashboard are functional; campaigns, leads, sequences, landing pages, infrastructure, analytics, and settings are empty states.
- **No email infrastructure UI.** Onboarding calculates domain/account needs but there's no UI to actually configure DNS, SMTP, or warmup.
- **No RBAC enforcement.** Role field exists but isn't used for access control.
- **No real-time subscriptions.** All data fetching is request-response.
- **Single-tenant per user.** No UI for switching between tenants even though the schema supports it.
