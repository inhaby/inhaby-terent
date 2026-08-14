# Building In-Person Visit Workflows with GPS Geofencing and Access Instructions

*A look at the state machine, Haversine equations, and geofencing triggers behind Inhaby's physical site visit verification pipeline.*

---

## Article Metadata

| Field | Value |
|---|---|
| **SEO Title** | In-Person Visit Geofencing in Proptech — Inhaby Case Study |
| **SEO Description** | How Inhaby built a GPS geofencing workflow to verify rental property viewings, manage check-ins, and secure gate access. |
| **Canonical URL** | https://inhaby.com/blog/engineering/visit-navigation-geofencing |
| **Slug** | visit-navigation-geofencing |
| **Focus Keywords** | visit geofencing, Haversine formula, GPS check-in system |
| **Reading Time** | 5 minutes |
| **Category** | Engineering |
| **Author** | Inhaby Tech Division |
| **Published Date** | 2026-08-13 |
| **Updated Date** | 2026-08-13 |

---

## The Audit Problem: Verifying Visits

Proptech platforms often struggle to confirm that scheduled property visits actually take place. Landlords and tenants may report visits differently, complicating transaction records.

We needed a system to:
- Confirm that the tenant physically arrived at the property.
- Securely share check-in instructions (like gate codes) only when the tenant is nearby.
- Automate feedback loops for listings based on visit data.

---

## The Visit & Navigation Engine

We developed the **Visit & Navigation Engine** (Phase 6) inside `@inhaby/shared` and integrated it across our portals.

### 1. The Visit State Machine
Visit requests follow a strict state machine tracked in Supabase:
`[Requested] ──► [Approved] ──► [Journey Started] ──► [Arrived] ──► [Completed]`

Each state transition records timestamp milestones in the database (`journey_started_at`, `arrived_at`, `visit_started_at`, `visit_completed_at`).

### 2. Haversine-Based GPS Geofencing
To verify check-in:
- When a tenant clicks "Arrived" on the mobile UI, the app requests their GPS coordinates.
- The system calculates the distance to the property using the Haversine formula in the shared library.
- If the tenant is within **100 meters** of the property, the status updates to `Arrived`.
- Once verified, the Owner Portal automatically shares entry instructions (like gate codes and flat numbers) with the tenant.
- A geofence check snapshot is logged in the database to prevent manual entry overrides.

---

## Lessons Learned

Using geofencing helps verify that visits actually happen. Restricting entry codes until the user is physically nearby adds a layer of security for unoccupied properties.

## Related Articles
- [Google Maps Platform Integration: Owner Property Location & Address Verification](/blog/engineering/google-maps-location-picker)
- [Smart Property Search: Pinned Locations & Search Analytics in Supabase](/blog/engineering/smart-property-search-filters)
