Last night I stayed up until about 3:45 in the morning fixing something that, honestly, should have never been built the way it was.

I want to write this down not to brag — I didn't do anything impressive. I wrote code that was wrong, lived with it for a while, and then spent a night fixing it. That's not impressive. That's just what happens when you're building a product alone and making decisions faster than you probably should.

---

## What I Was Actually Trying to Fix

A few days ago I merged the Inhaby landing page into the tenant app codebase. The idea was simple: one Vite project, one deployment, both surfaces — landing website for guests, and the tenant application for logged-in users.

The merge worked. The app ran. I pushed it and called it v1.7.

But there was a problem I had quietly swept under the rug: **the entire authentication system was mounted globally, even on the landing page where it wasn't needed.** Every guest who loaded the landing page was silently triggering a Supabase session check and spinning up the app state — notifications, wishlists, bookings, messages — all of it, for someone who hadn't even signed up yet.

And when a logged-in user clicked Logout, the app would call `signOut()` and navigate to the home page... but all that state was still sitting in memory. If you opened React DevTools after logging out, you could still see the previous user's notifications. The wishlist wasn't cleared. The booking state was still there.

That's a bug. A real one. Not hypothetical — an actual security and UX failure.

---

## What Made It Worse

I had also written the routing as one massive file. `AppRouter.tsx` was 1,114 lines long. Public routes, login routes, dashboard routes — all mixed together in one place. The auth guards were inconsistently applied. The logout didn't guarantee state cleanup. The landing page header was doing a hardcoded external link to `https://inhaby.com/login` instead of using React Router's `<Link to="/login">`.

When I stepped back and looked at it, I realised: this isn't something I can patch. I have to do it properly.

---

## The Decision to Start Over (architecturally)

I've read enough engineering blogs to know that "let's refactor it properly" is often a trap. You spend three days on it, nothing gets better, and you've introduced five new bugs.

So before I touched a single file, I wrote a complete implementation plan. Thirteen success criteria. A route table. A header ownership contract. An explicit logout sequence, step by step.

The key insight I had was this: **the providers are in the wrong place.**

In v1.7, the `AuthProvider` and `AppStateProvider` were mounted above the router — meaning they existed on every page, including the landing page. The fix wasn't to add more cleanup code. The fix was to move these providers *inside* the authenticated sub-tree.

When you log out and navigate to `/`, React unmounts the entire tenant app tree. That tree contains the providers. When those providers unmount, all state — every hook, every subscription, every cached value — is garbage collected automatically. No explicit cleanup needed. The architecture enforces the guarantee.

---

## What I Built

I created two independent React sub-trees inside one Vite project:

**Landing Website (no auth context at all)**
- Lives at `/`
- Has its own `LandingApp` wrapper with `LandingHeader`, footer, animations
- Never imports anything from the tenant app context
- The "Login" button is a proper internal React Router link, not an external URL

**Tenant Application (auth-scoped)**
- Lives at `/app/*`
- `ProtectedRoute` guards the entire sub-tree — but importantly, the guard reads Supabase directly, not from a React context, because the context doesn't exist outside the sub-tree
- `AuthProvider` and `AppStateProvider` only mount when a user is authenticated
- `AppShell` wraps the sidebar, header, and router for the authenticated experience

That last part — the guard reading Supabase directly — is something I got wrong the first time tonight. I had written `ProtectedRoute` to call `useAuth()`. But `useAuth()` reads from `AuthProvider`, and `AuthProvider` is *inside* `TenantApp`, which is the child being guarded. Classic chicken-and-egg.

The error was direct: `useAuth must be used within an AuthProvider`. I read the stack trace, traced it to the provider ordering, and fixed it: `ProtectedRoute` now calls `supabase.auth.getSession()` directly — same as the `GuestRoute` already did. Problem solved.

---

## Fixing the Stale State Bug

Even with the architecture fix, there was a second issue: during the brief window between `signOut()` resolving and React completing its re-render cycle, the hooks could still serve stale data. So I added explicit cleanup to every hook:

```typescript
useEffect(() => {
  if (!user) {
    setNotifications([]);
    return;
  }
  fetchNotifications();
}, [user]);
```

I did this for five hooks: `useNotifications`, `useWishlist`, `useVisits`, `useBookings`, and `useMessages`. Each one now clears its state the moment `user` becomes `null`. The architecture-level guarantee handles the full teardown. The hook-level cleanup is defence-in-depth for the race window.

---

## What Actually Happened During the Build

I started around 11pm. By 1am I had the new structure mostly written — 8 new files, 7 modified, 2 deleted. By 2am I had TypeScript errors I needed to resolve:

- `AppShell` was passing `unreadChatsCount` but `BottomNavProps` expected `unreadCount`
- `LocationSelectorModal` wanted `isOpen` and `activeLocation`, not `currentLocation`
- The root `src/App.tsx` was pointing to the old monolith

Small stuff. But enough to fail the build.

At 3:45am I ran `npx tsc --noEmit`. Zero errors. Then `npm run build`. It completed in 21 seconds, 2,388 modules transformed.

I committed it as `Version 1.8.0.0 — Refactor Complete with TS and build errors resolved` and pushed to `main`.

Then I went to sleep.

---

## What I Learned

**1. Providers belong close to their consumers.**

If a provider exists above the entire app, it runs for everyone — including people who don't need it. This wastes resources and creates cleanup problems. Mount providers as low as they can go while still covering everything that needs them.

**2. Stale state after logout is an architecture problem, not a cleanup problem.**

You can add `setNotifications([])` to every hook forever. But the real fix is ensuring that the provider tree unmounts on logout. When the tree unmounts, React handles the rest.

**3. Route guards cannot use context from within the thing they're guarding.**

`ProtectedRoute` wraps `TenantApp`. `TenantApp` contains `AuthProvider`. So `ProtectedRoute` cannot call `useAuth()`. This seems obvious in hindsight. It wasn't obvious at 1am.

**4. Write the plan before writing the code.**

The implementation plan I wrote before touching any file saved me at least two hours. It forced me to think about header ownership, provider ordering, and logout sequence before I had invested any code in the wrong direction.

**5. 1,114 line files are always a smell.**

If a single file handles public routing, auth routing, and private routing — that file is doing too much. Split it.

---

## Where Inhaby Is Now

Inhaby v1.8.0.0 is committed and running. The architecture is clean. The landing page and the tenant app are properly separated. Logout is guaranteed. The build passes.

Tomorrow I'm going to start looking at the property detail page experience and the search functionality. But tonight, I'm satisfied. Not with the original problem — that was entirely my fault — but with having fixed it properly instead of patching it.

That's the thing about building a startup without a senior engineer looking over your shoulder. You make mistakes. Bigger mistakes than you'd make on a team. But you also learn faster, because every bug is yours to own completely.

---

## Vision for What I'm Building

Inhaby is a zero-brokerage property discovery and rental platform for tenants in India. The mission is simple: a tenant should be able to find a verified home, book a visit, and sign a lease without paying a single rupee to a broker.

That's a hard problem. The broker model in Indian real estate is decades old and deeply embedded. Inhaby doesn't defeat it with marketing — it defeats it by building a better product. A product where verified owners list directly, where tenants can message owners in real time, where visit scheduling is one tap, where the entire tenancy — from search to signing — happens inside the app.

I'm building this mostly alone right now. The codebase has three applications: the tenant app, the owner portal, and the admin panel. All three share one TypeScript package — `@inhaby/shared` — that contains the Supabase client, all type definitions, and shared utilities. That package is published to GitHub Packages and installed as a scoped dependency in each app.

It's a real system. It works. It's also deeply imperfect, and I'm rewriting pieces of it regularly as I learn more about what "production-quality" actually means.

This journal is my attempt to document that process honestly. Not to present a polished version of the startup journey. The actual version. The 3am version.

---

## Related Articles

- **Next:** [How We Built the @inhaby/shared GitHub Package](/blog/engineering/github-packages-inhaby)
- **Next:** [Merging a Landing Page Into a React App Without Breaking Auth](/blog/engineering/landing-page-integration)
- **Suggested Reading:** Who is Genofogu? — [/blog/founder-journal/about-genofogu](/blog/founder-journal/about-genofogu)

---

## Suggested Social Caption

> "Stayed up until 3:45am rebuilding Inhaby's routing from scratch. Not because I wanted to. Because the first version was broken in a way that couldn't be patched — only replaced. Here's what I learned. 🧵"

---

## FAQ

**Q: What is Inhaby?**
A: Inhaby is a zero-brokerage property rental platform connecting tenants directly with verified property owners in India, eliminating broker fees.

**Q: Who is building Inhaby?**
A: Genofogu is the co-founder and primary engineer currently building the platform, working across three applications and a shared SDK.

**Q: What is a Founder Journal?**
A: The Founder Journal is Genofogu's daily engineering diary — honest, first-person accounts of what was actually built, broken, and learned each day.

**Q: How do I follow the Inhaby build in public?**
A: Subscribe to the Inhaby engineering blog at /blog or follow updates at /blog/founder-journal.

---

## JSON-LD Recommendations

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Day 003: I Rebuilt Inhaby's Architecture From Scratch",
  "author": {
    "@type": "Person",
    "name": "Genofogu",
    "url": "https://inhaby.com/founder/genofogu",
    "jobTitle": "Co-Founder",
    "worksFor": {
      "@type": "Organization",
      "name": "Inhaby"
    }
  },
  "datePublished": "2026-07-03",
  "dateModified": "2026-07-03",
  "publisher": {
    "@type": "Organization",
    "name": "Inhaby",
    "url": "https://inhaby.com"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://inhaby.com/blog/founder-journal/day-003-rebuilding-architecture"
  },
  "keywords": "Inhaby, founder journal, React refactor, startup engineering, authentication bug",
  "articleSection": "Founder Journal"
}
```
