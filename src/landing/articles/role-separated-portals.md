# Why Inhaby Split Owner and Tenant Experiences into Two Applications

*Genofogu discusses Inhaby's decision to build independent applications for tenants, owners, and administrators, and how we coordinate them with a shared core SDK.*

---

## Article Metadata

| Field | Value |
|---|---|
| **SEO Title** | Multi-Portal React Architecture Design — Inhaby Case Study |
| **SEO Description** | Learn why Inhaby uses separate tenant and owner apps, and how it coordinates them with a shared library and a unified database backend. |
| **Canonical URL** | https://inhaby.com/blog/founder-journal/role-separated-portals |
| **Slug** | role-separated-portals |
| **Focus Keywords** | multi-portal architecture, role-separated frontend apps, @inhaby/shared |
| **Reading Time** | 4 minutes |
| **Category** | Founder Journal |
| **Author** | Genofogu — Founder of Inhaby |
| **Published Date** | 2026-08-13 |
| **Updated Date** | 2026-08-13 |

---

## The Monolith vs Separate Portals Decision

When designing a platform that serves renters, property owners, and internal administrators, developers face a choice:
- **Unified Monolith**: Build a single frontend application where role checking guides users to different dashboards.
- **Role-Separated Applications**: Build independent frontends for tenants, owners, and administrators.

We chose to build separate applications to match the distinct needs of each user type.

---

## The Inhaby Portal Setup

We built three independent single-page applications (SPAs):
1. **Tenant App (`inhaby-terent`)**: Focuses on search, map discovery, wishlists, and scheduling visits.
2. **Owner Portal (`owner-portal`)**: Focuses on listing management, editing property details, and tracking rent ledgers.
3. **Admin Panel (`admin-panel`)**: Focuses on verifying listings, auditing payments, and moderating content.

### Why This Architecture Works

- **Smaller Bundle Sizes**: Tenants do not load heavy charting libraries (like Recharts) or management controls used only by owners. This helps keep pages fast on mobile networks.
- **Security Boundaries**: Admin tools and moderation layouts are completely isolated from client bundles, reducing the risk of exposing internal endpoints.
- **Independent Deployments**: Developers can deploy updates to the Owner Portal without affecting active searches in the Tenant App.

---

## How We Coordinate the Portals

To prevent code duplication, all three portals connect through a shared core layer:
- **Shared Backend**: A single Supabase instance handles database tables, storage, and authentication.
- **Centralized SDK (`@inhaby/shared`)**: Exports common type definitions, the Supabase client, geocoding helpers, and chat interfaces.

This architecture keeps our code modular and allows us to scale each application independently.

## Related Articles
- [Founder Journal: Transitioning to Feature-Module Teams for Interns](/blog/founder-journal/feature-module-teams)
- [How Inhaby Built a GitHub Shared Package to Unify Three React Applications](/blog/engineering/github-packages-inhaby-shared)
