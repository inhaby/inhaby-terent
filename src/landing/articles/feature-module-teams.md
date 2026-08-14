# Founder Journal: Transitioning to Feature-Module Teams for Interns

*Genofogu reflects on moving from ad-hoc task assignments to a feature-team model to give full-stack interns end-to-end ownership of product flows.*

---

## Article Metadata

| Field | Value |
|---|---|
| **SEO Title** | Organizing Full-Stack Interns into Feature Teams — Inhaby Case Study |
| **SEO Description** | How Inhaby organized its full-stack developer team into vertical feature-module pairings to reduce merge conflicts and improve ownership. |
| **Canonical URL** | https://inhaby.com/blog/founder-journal/feature-module-teams |
| **Slug** | feature-module-teams |
| **Focus Keywords** | feature-module team design, full-stack intern workflow, Git monorepo branching |
| **Reading Time** | 5 minutes |
| **Category** | Founder Journal |
| **Author** | Genofogu — Founder of Inhaby |
| **Published Date** | 2026-08-13 |
| **Updated Date** | 2026-08-13 |

---

## The Challenge of Scaling Developer Teams

As Inhaby grew to a team of five (myself and four full-stack interns), we hit standard organization friction. Originally, we assigned tasks horizontally: one developer built the SQL migration, another worked on the API route, and a third built the React UI.

This led to several challenges:
- **Inbox conflicts**: Developers edited the same global files, causing Git merge issues.
- **Context gaps**: Front-end developers did not fully understand how the backend validated their payloads, leading to API mismatch bugs.
- **Onboarding bottlenecks**: Developers spent more time coordinating handoffs than coding.

---

## The Solution: Vertical Feature-Module Teams

We transitioned to a **Feature-Module Team** model to isolate contexts and give developers ownership of complete user journeys:

### 1. Functional vertical splits
We divided the interns into two pairings:
- **Feature Team A (Operations & Discovery)**: Owned property listings, search maps, location caching, and owner KYC verifications.
- **Feature Team B (Transactional & Engagement)**: Owned visit scheduling, lease bookings, messaging channels, and payment ledgers.

### 2. End-to-End Ownership
When a developer works on a feature like the "Visit Scheduler", they write the database migrations, update type definitions in `@inhaby/shared`, configure the APIs, and build the UI across the tenant, owner, and admin portals.

This model helps developers understand how data flows through the entire system and reduces coordination bottlenecks.

---

## Git Workflow Controls
To prevent conflicts across apps, we set up strict branch guidelines:
- Developers target the stable integration branch `develop`.
- Features are built in isolated `feature/*` branches.
- Merges to `main` are reserved for verified releases.
- Builds run automated TypeScript validation checks (`npx tsc --noEmit`) before approvals.

## Related Articles
- [Why Inhaby Split Owner and Tenant Experiences into Two Applications](/blog/founder-journal/role-separated-portals)
- [How Inhaby Built a GitHub Shared Package to Unify Three React Applications](/blog/engineering/github-packages-inhaby-shared)
