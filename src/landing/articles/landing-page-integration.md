## The Problem That Started Everything

When a product grows by adding features, the codebase grows with it — sometimes in directions that made sense at the time but create structural problems later.

Inhaby's tenant application started as a dashboard. Then a landing page was added. Then both surfaces needed to share authentication, Supabase configuration, and component utilities. The simplest path was to put everything into one Vite project, mount all providers at the root, and handle both public and private routes in one router file.

This is how v1.7 was born. And this is exactly what created the problems v1.8 had to fix.

---

## The v1.7 Problem Diagnosis

### Problem 1: Providers Mounted Globally

In v1.7, the application structure at `main.tsx` looked like this:

```tsx
// v1.7 main.tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>        {/* ← mounted on the landing page */}
        <AppStateProvider>  {/* ← mounted on the landing page */}
          <App />
        </AppStateProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
```

Every time a guest visited the landing page at `/`, `AuthProvider` was initialising — running a Supabase session check, setting up an `onAuthStateChange` listener, and returning a React context that the landing page didn't use. `AppStateProvider` was spinning up hooks for notifications, wishlist, visits, bookings, and messages — all for an anonymous visitor.

This was wasteful and incorrect. The landing page is a public surface. It should have no authentication overhead.

### Problem 2: Stale Authenticated State After Logout

Every hook that fetched user data — `useNotifications`, `useWishlist`, `useVisits`, `useBookings`, `useMessages` — subscribed to the `user` object through a `useEffect`. When the user logged out, `signOut()` cleared the Supabase session and set `user = null` in the auth context.

But the hooks had a bug. Their `useEffect` looked like this:

```typescript
// v1.7 (buggy)
useEffect(() => {
  fetchNotifications();
}, [user]);
```

When `user` became `null`, the `useEffect` fired — but it just called `fetchNotifications()`, which would fail (no user to fetch for) and resolve with an empty result. Critically, **the existing state was never explicitly cleared**. Until the fetch resolved, the previous user's notifications, wishlist items, and visit requests remained visible in the UI.

In React DevTools after logout, you could still see the previous user's profile data in the context providers.

### Problem 3: The 1,114-Line Monolith

The router file — `src/router/AppRouter.tsx` — had grown to 1,114 lines. It handled:
- Public landing page routes
- Guest-only auth routes (login, signup, forgot password)
- Authenticated dashboard routes
- Property detail routes (both public and private variants)
- Auth guards with inconsistent implementation

There was no clean separation between what was public and what required authentication. This made maintenance difficult and made the auth guard logic hard to reason about.

### Problem 4: The Landing Page Header Used an External URL

The landing page navbar pointed to `https://inhaby.com/login` for the Login button — a hardcoded external URL rather than an internal React Router `<Link to="/login">`. This caused a full page reload on login navigation, losing any React state, and broke the single-page-application navigation model.

---

## The v1.8 Solution: Two Independent React Sub-Trees

The core insight behind v1.8 is simple:

> **A React context provider should only be mounted where its consumers live.**

If `AuthProvider` is only consumed by the authenticated tenant application, it should only be mounted inside the authenticated tenant application — not above the entire router.

### The New Architecture

```
main.tsx
  ThemeProvider            ← only truly global concern: theming
    BrowserRouter
      RootRouter
        "/" → LandingApp           ← no auth context
        "/login" → LoginPage       ← no auth context (checks session directly)
        "/app/*" → ProtectedRoute
                     TenantApp
                       AuthProvider     ← mounted only for /app
                         AppStateProvider ← mounted only for /app
                           AppRouter
                             AppShell
                               AppHeader
                               <Outlet />
```

The `RootRouter` splits all traffic into three zones:

| Zone | Path | Context providers | Who can access |
|---|---|---|---|
| Landing | `/`, `/demo`, `/pricing`, `/blog`, etc. | `ThemeProvider` only | Everyone |
| Auth | `/login`, `/signup`, `/forgot-password`, `/reset-password` | `ThemeProvider` only | Guests only (redirect if session exists) |
| App | `/app/*` | `ThemeProvider` + `AuthProvider` + `AppStateProvider` | Authenticated users only |

---

## The ProtectedRoute Problem: A Critical Ordering Bug

The most common mistake when implementing this pattern is writing a `ProtectedRoute` that calls `useAuth()`:

```tsx
// ❌ WRONG — will crash
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth(); // ← cannot work: AuthProvider is a child, not a parent
  // ...
};
```

This crashes with: **`useAuth must be used within an AuthProvider`**

Why? Because `AuthProvider` lives **inside** `TenantApp`, which is the *child* that `ProtectedRoute` is guarding. The context doesn't exist above the guard — it exists inside the guarded content.

The correct implementation reads Supabase directly, the same way the `GuestRoute` (which guards the login/signup pages) works:

```tsx
// ✅ CORRECT
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Read Supabase directly — no React context required
    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(!!session);
      if (!session) setLoading(false);
    });

    return () => { subscription.unsubscribe(); };
  }, []);

  if (loading) return <Spinner />;
  
  if (!hasSession) {
    // Preserve intended destination for post-login redirect
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
```

The key: `ProtectedRoute` is a **pre-context** component. It runs before any auth context exists. It must use Supabase's SDK directly.

---

## The Logout Guarantee: Two Layers

Logout is one of the hardest things to get right in a React auth system. Inhaby v1.8 uses a two-layer approach.

### Layer 1: Architectural Guarantee (Primary)

Because `AuthProvider` and `AppStateProvider` are mounted **inside** `TenantApp`, and `TenantApp` is a child of `ProtectedRoute`, when logout navigates to `/`, React unmounts the entire `TenantApp` sub-tree.

When a component tree unmounts:
- All `useState` values are destroyed
- All `useEffect` cleanup functions run (unsubscribing from Supabase Realtime, clearing intervals, etc.)
- All context values are garbage collected
- All hook closures are released

No explicit cleanup code is needed. The architecture provides the guarantee automatically.

### Layer 2: Hook-Level Explicit Clearing (Defence in Depth)

There is a brief race window between `signOut()` resolving and React completing the unmount cycle. During this window, a stale render could serve old data. To prevent this, every hook explicitly clears its state when `user` becomes `null`:

```typescript
// useNotifications.ts
useEffect(() => {
  if (!user) {
    setNotifications([]); // ← explicit clear
    return;
  }
  fetchNotifications();
}, [user]);
```

All five data hooks received this treatment:

| Hook | State cleared on `user → null` |
|---|---|
| `useNotifications` | `setNotifications([])` |
| `useWishlist` | `setSavedIds(new Set())` |
| `useVisits` | `setVisitRequests([])` |
| `useBookings` | `setActiveTenancy(null)`, `setPendingBookings([])`, `setPastBookings([])` |
| `useMessages` | `setUnreadChatsCount(0)`, `setOpenMsgPropertyId(null)`, `setIsMobileChatActive(false)` |

`AppContext.tsx` also received a cleanup `useEffect` for non-hook state (location, booking modal, search query, and localStorage keys):

```typescript
useEffect(() => {
  if (!user) {
    setActiveLocation({ name: '', area: '', city: '', pincode: '' });
    setIsBookVisitModalOpen(false);
    setBookingPropertyId(null);
    setChosenBookingMsg('');
    setSearchQuery('');
    localStorage.removeItem('homstay-active-location');
    localStorage.removeItem('homstay-recent-viewed');
  }
}, [user]);
```

---

## The Logout Sequence (Complete)

When a user clicks Logout in the Inhaby tenant app, the following sequence occurs:

```
1. supabase.auth.signOut()
   → Invalidates session on Supabase server
   → Clears sb-* keys from localStorage

2. AuthContext sets user = null, profile = null

3. Hooks detect user → null (Layer 2)
   → useNotifications: setNotifications([])
   → useWishlist: setSavedIds(new Set())
   → useVisits: setVisitRequests([])
   → useBookings: clears tenancy and booking arrays
   → useMessages: clears chat count and active state

4. AppContext detects user → null (Layer 2)
   → Clears location, booking modal, search state
   → Removes localStorage keys

5. navigate('/') executes
   → React Router navigates to root

6. ProtectedRoute re-evaluates
   → supabase.auth.getSession() returns null
   → hasSession = false
   → Renders <Navigate to="/" replace />

7. React unmounts TenantApp tree (Layer 1)
   → AuthProvider unmounted
   → AppStateProvider unmounted
   → All hooks destroyed
   → All Supabase subscriptions unsubscribed
   → All memory freed

8. LandingApp mounts
   → No auth context
   → Guest experience
```

---

## Header Ownership: A Hard Architectural Contract

One of the less-obvious decisions in the refactor was formalising the header ownership contract. Two headers exist:

| Header | File location | Allowed in | Forbidden in |
|---|---|---|---|
| `LandingHeader` | `src/landing/components/LandingHeader.tsx` | Landing pages only | App shell, authenticated routes |
| `AppHeader` | `src/app/layouts/AppHeader.tsx` | AppShell only | Landing pages, landing router |

This is enforced by file location. `LandingHeader` is in `src/landing/` — a directory with no dependency on `AppContext`. It cannot import anything from `src/app/`. `AppHeader` is in `src/app/layouts/` — it can depend on `AppContext` and authenticated-only hooks.

The `LandingHeader` is self-contained:
- Uses `supabase.auth.getSession()` directly (no auth context)
- If a session exists: shows an "Open App →" button linking to `/app`
- If no session: shows Login (`<Link to="/login">`) and Signup (`<Link to="/signup">`) links
- No notifications badge, wishlist count, or profile dropdown

---

## SEO Considerations: Two Surfaces, Two Strategies

The architectural separation has direct SEO implications.

**Landing pages** (`/`, `/pricing`, `/blog`, `/demo`, etc.) are fully server-renderable. They contain no auth-gated content. They should be indexed with standard meta tags, Open Graph data, and structured data (Organization, FAQPage, BlogPosting). The landing surface is the SEO surface.

**App pages** (`/app/*`) are authenticated. Search engines should not index them. All `/app/*` routes should include:

```html
<meta name="robots" content="noindex, nofollow" />
```

And Supabase's public auth callback route (`/auth/callback`) should similarly be excluded from indexing.

The architectural separation — landing at `/`, app at `/app/*` — makes this robots policy trivially easy to implement: block `*/app/*` in `robots.txt`, and allow everything else.

```
# robots.txt
User-agent: *
Disallow: /app/
Disallow: /auth/

Sitemap: https://inhaby.com/sitemap.xml
```

---

## File Change Summary

### New Files

| File | Purpose |
|---|---|
| `src/router/RootRouter.tsx` | Top-level route split: landing vs auth vs app |
| `src/auth/ProtectedRoute.tsx` | Auth guard using Supabase directly (no useAuth) |
| `src/auth/OAuthCallback.tsx` | Handles Supabase OAuth redirect completion |
| `src/landing/LandingApp.tsx` | Landing layout shell (LandingHeader + Footer + Outlet) |
| `src/landing/components/LandingHeader.tsx` | Public-only header with internal React Router links |
| `src/app/App.tsx` | TenantApp: mounts AuthProvider + AppStateProvider |
| `src/app/router/AppRouter.tsx` | Dashboard routes extracted from old monolith |
| `src/app/layouts/AppShell.tsx` | Sidebar + AppHeader + BottomNav + Outlet |
| `src/app/layouts/AppHeader.tsx` | Authenticated header assembling existing components |

### Modified Files

| File | Change |
|---|---|
| `src/main.tsx` | Remove AuthProvider, AppStateProvider from root |
| `src/app/AppContext.tsx` | Add logout reset useEffect + useBookings integration |
| `src/hooks/useNotifications.ts` | Clear state on user → null |
| `src/hooks/useWishlist.ts` | Clear state on user → null |
| `src/hooks/useVisits.ts` | Clear state on user → null |
| `src/hooks/useBookings.ts` | Clear state on user → null |
| `src/hooks/useMessages.ts` | Clear state on user → null |

### Deleted Files

| File | Reason |
|---|---|
| `src/layouts/PublicLayout.tsx` | Replaced by `LandingApp.tsx` |
| `src/router/AppRouter.tsx` (1114-line monolith) | Split into `RootRouter.tsx` + `AppRouter.tsx` |

---

## Build Verification

After all changes were applied, the project was verified with:

```bash
npx tsc --noEmit   # Zero TypeScript errors
npm run build      # ✓ built in 21.36s, 2388 modules transformed
```

No TypeScript errors. No build failures. The refactor is additive — no existing component was rewritten, no UI was changed. Only routing, layout wrappers, and provider placement changed.

---

## Architecture Diagram: Before and After

```
BEFORE (v1.7)
─────────────
main.tsx
└── ThemeProvider
    └── AuthProvider         ← GLOBAL (runs on landing page)
        └── AppStateProvider ← GLOBAL (runs on landing page)
            └── BrowserRouter
                └── AppRouter (1114 lines)
                    ├── PublicLayout
                    │   ├── Route: /
                    │   ├── Route: /demo
                    │   └── Route: /pricing
                    ├── Route: /login
                    ├── Route: /signup
                    └── DashboardLayout (auth guard inline)
                        ├── Route: /app
                        ├── Route: /app/wishlist
                        └── ...

AFTER (v1.8)
────────────
main.tsx
└── ThemeProvider
    └── BrowserRouter
        └── RootRouter
            ├── Route: /  →  LandingApp
            │                 └── LandingHeader
            │                     LandingRoutes
            │                     Footer
            │
            ├── GuestRoute: /login, /signup, ...
            │   └── LoginPage / SignupPage / ...
            │
            └── ProtectedRoute: /app/*
                └── TenantApp
                    └── AuthProvider    ← SCOPED to /app
                        └── AppStateProvider ← SCOPED to /app
                            └── AppRouter
                                └── AppShell
                                    ├── AppHeader
                                    ├── Sidebar
                                    ├── BottomNav
                                    └── AppRoutes
```

---

## Common Mistakes and How to Avoid Them

| Mistake | Symptom | Fix |
|---|---|---|
| Calling `useAuth()` inside `ProtectedRoute` | `useAuth must be used within an AuthProvider` crash | Read Supabase directly via `getSession()` in `ProtectedRoute` |
| Leaving `AuthProvider` at root level | Auth state initialises on landing page; logout doesn't fully unmount | Move `AuthProvider` inside the authenticated sub-tree |
| Not clearing hook state on `user → null` | Previous user's data visible briefly after logout | Add `if (!user) { clearState(); return; }` to every hook's `useEffect([user])` |
| Using hardcoded external URLs in landing page nav | Full page reload on login/signup navigation | Replace external links with `<Link to="/login">` from React Router |
| Sharing the same header component between landing and app | Auth state bleeds into landing page header | Create separate `LandingHeader` and `AppHeader` in separate directories |

---

## Lessons Learned

**1. Providers as close to consumers as possible is not a guideline — it's a correctness requirement.**

Mounting `AuthProvider` globally wasn't just inefficient. It created the stale logout state bug and the incorrect auth overhead on public pages. The principle "mount providers where their consumers are" is a correctness constraint, not a performance optimisation.

**2. A `ProtectedRoute` that uses auth context is architecturally impossible when that context is inside the protected sub-tree.**

This sounds obvious. It is not obvious until you make the mistake. The rule: if a guard wraps a provider, the guard cannot use that provider. Read Supabase directly instead.

**3. Monolithic router files are a maintenance risk.**

A 1,114-line file that handles public routing, auth routing, and dashboard routing cannot be understood at a glance. When it needs to change, every change is a potential regression. Split router files by concern, not by size.

**4. Architecture is the most reliable cleanup mechanism.**

You can write cleanup code in every hook. Or you can structure the component tree so that cleanup happens automatically when the tree unmounts. The architectural approach requires no explicit cleanup code and has no race conditions.

**5. The build is the final arbiter.**

After the refactor, 2,388 modules were transformed with zero errors. That number is meaningful: it means the import graph is clean, the types are consistent, and the module boundaries are respected. Running `npm run build` after every significant change catches integration issues that TypeScript alone misses.

---

## Future Plans

- **Property detail public route** (`/property/:slug`) currently exists inside `/app/*`. Future work will evaluate moving it to the landing zone as a truly public, indexable page — with an "I'm interested" CTA that redirects guests to `/signup?redirectTo=/property/:slug`.
- **Route-based code splitting** — The `index-CkLU8IG6.js` chunk is 1.4MB (384KB gzipped). `React.lazy()` is used for several components but further splitting of the main bundle is planned.
- **OAuth callback explicit handling** — The current `OAuthCallback.tsx` is minimal. A future version will parse the OAuth state, extract the intended `redirectTo` destination, and route the user precisely after authentication.
- **Sitemaps** — With the architectural separation between `/` (landing) and `/app/*` (authenticated), generating a sitemap covering only public URLs becomes straightforward.

---

## FAQ

**Q: What is the main architectural change in Inhaby v1.8?**
A: The primary change is moving `AuthProvider` and `AppStateProvider` from the root of the application (where they ran on every page including the landing page) to inside the authenticated sub-tree at `/app/*`. This ensures auth state only exists where it's needed and is automatically cleaned up on logout.

**Q: Why did ProtectedRoute crash with "useAuth must be used within an AuthProvider"?**
A: `ProtectedRoute` wraps `TenantApp`, and `AuthProvider` lives inside `TenantApp`. When `ProtectedRoute` called `useAuth()`, the context didn't exist — it was a child of the component, not a parent. The fix is to read Supabase's session directly in `ProtectedRoute` instead of using the React context.

**Q: How does Inhaby guarantee no stale data after logout?**
A: Two layers. First, the architecture: because `AuthProvider` unmounts with `TenantApp` on logout, all hook state is destroyed by React automatically. Second, explicit hook cleanup: every data hook clears its state when `user` becomes `null`, covering the brief race window between `signOut()` resolving and the unmount completing.

**Q: Can this architecture work with React Router v6?**
A: Yes. This entire implementation uses React Router v6 (`Routes`, `Route`, `Navigate`, `Outlet`, `useNavigate`). The nested route pattern — with layout components as route elements and `<Outlet />` for child routes — is a React Router v6 feature.

**Q: What is GuestRoute?**
A: `GuestRoute` is the inverse of `ProtectedRoute`. It guards the login, signup, and forgot-password pages — if a session already exists, it redirects to `/app`. This prevents authenticated users from accidentally landing on the login page.

**Q: How does SEO work with this architecture?**
A: Landing pages at `/` and its sub-paths are fully public and should be indexed normally. App pages at `/app/*` should be excluded from search indexing via `robots.txt` and `<meta name="robots" content="noindex">`. The URL structure makes this trivial to implement.

---

## Suggested Internal Links

- [About Inhaby](/about)
- [Founder Journal: Day 003 — I Rebuilt Everything](/blog/founder-journal/day-003-rebuilding-architecture)
- [How @inhaby/shared Unifies Three React Apps](/blog/engineering/github-packages-inhaby-shared)

## Suggested External References

- [React Context documentation](https://react.dev/reference/react/createContext)
- [React Router v6 — Outlet](https://reactrouter.com/en/main/components/outlet)
- [Supabase Auth — onAuthStateChange](https://supabase.com/docs/reference/javascript/auth-onauthstatechange)
- [Vite environment variables](https://vite.dev/guide/env-and-mode)

---

## Suggested Social Caption

> "We had a 1114-line router file, auth state leaking into the landing page, and stale user data surviving logout. This is the story of how we rebuilt it — and the two most important rules for React auth architecture. 🧵 #React #Vite #Authentication #OpenSource #proptech"

---

## Related Articles

- **Previous:** [How @inhaby/shared Unifies Three React Applications](/blog/engineering/github-packages-inhaby-shared)
- **Next:** Upcoming — Property Detail Page Architecture
- **Suggested Reading:** [Founder Journal Day 003](/blog/founder-journal/day-003-rebuilding-architecture)

---

## JSON-LD Recommendations

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "How Inhaby Merged a Landing Page Into a Vite React App Without Breaking Authentication",
  "description": "Detailed engineering walkthrough of the Inhaby v1.8 refactor: separating a public landing website from an authenticated React app in one Vite project, fixing React provider ordering bugs, and guaranteeing clean logout state.",
  "author": {
    "@type": "Person",
    "name": "Genofogu",
    "url": "https://inhaby.com/founder/genofogu",
    "jobTitle": "Co-Founder"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Inhaby",
    "url": "https://inhaby.com"
  },
  "datePublished": "2026-07-03",
  "dateModified": "2026-07-03",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://inhaby.com/blog/engineering/landing-page-integration"
  },
  "keywords": "React, Vite, authentication, ProtectedRoute, landing page, routing, Supabase, provider ordering, logout",
  "articleSection": "Engineering"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why did ProtectedRoute crash with useAuth must be used within an AuthProvider?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ProtectedRoute wraps TenantApp, and AuthProvider lives inside TenantApp. When ProtectedRoute called useAuth(), the context did not exist yet — it was a child of the component, not a parent. The fix is to read Supabase's session directly in ProtectedRoute instead of using the React context."
      }
    },
    {
      "@type": "Question",
      "name": "How does Inhaby guarantee no stale data after logout?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Two layers. First, the architecture: because AuthProvider unmounts with TenantApp on logout, all hook state is destroyed by React automatically. Second, explicit hook cleanup: every data hook clears its state when user becomes null, covering the brief race window between signOut() resolving and the unmount completing."
      }
    },
    {
      "@type": "Question",
      "name": "What is the main architectural change in Inhaby v1.8?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Moving AuthProvider and AppStateProvider from the application root to inside the authenticated sub-tree at /app/*. This ensures auth state only exists where needed and is automatically cleaned up on logout when React unmounts the entire TenantApp tree."
      }
    }
  ]
}
```
