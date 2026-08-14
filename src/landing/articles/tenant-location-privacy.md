# Designing a Tenant Location Privacy Overlay on Inhaby

*How Inhaby built a privacy-first mapping layer using dynamic random GPS coordinate offsets to protect property owners while keeping search functional for guests.*

---

## Article Metadata

| Field | Value |
|---|---|
| **SEO Title** | Proptech Location Privacy Overlay Designs — Inhaby Case Study |
| **SEO Description** | Learn how Inhaby balances listing discovery with host security by serving randomized GPS offsets to guests and exact coordinates to verified tenants. |
| **Canonical URL** | https://inhaby.com/blog/engineering/tenant-location-privacy |
| **Slug** | tenant-location-privacy |
| **Focus Keywords** | real estate location privacy, coordinate obfuscation, maps random offset |
| **Reading Time** | 5 minutes |
| **Category** | Engineering |
| **Author** | Inhaby Tech Division |
| **Published Date** | 2026-08-13 |
| **Updated Date** | 2026-08-13 |

---

## The Privacy Challenge in Proptech

Publicly displaying the exact GPS coordinates and street address of a rental property before verification introduces risks:
- **Offline Scams**: Unvetted agents can locate vacant properties, bypass the platform, and contact landlords offline.
- **Harassment**: Bad actors can use the map to find exact buildings, compromising tenant safety.
- **Data Scraping**: Competitors can scrape the coordinates to build their own property listings.

However, hiding property locations entirely makes map search useless. Tenants want to see exactly how close a home is to their workplace or transit links.

---

## The Solution: Privacy Architecture & Offsets

We built the **Tenant Discovery Privacy Engine** (Phase 3) inside `@inhaby/shared` to enforce coordinate visibility based on user roles and booking status.

### 1. Randomized GPS Coordinate Offsets
For guests and unauthenticated search requests, the API applies a random offset to latitude and longitude:
- The coordinates are shifted by a random distance between **150 to 400 meters**.
- The shift is generated deterministically using the property's unique ID as a seed. This ensures that a listing does not jump around on the map when the user refreshes their search.

### 2. Role-Based Access Controls
The backend evaluates the user's role and verification state before returning coordinate details:

- **Guests & Unauthenticated Users**: See only randomized coordinates and general locality names (e.g. "Koramangala 4th Block").
- **Authenticated Tenants**: Can view the exact location only after completing profile verification.
- **Staged Access**: For unverified users, exact address lines and building names are unlocked only after a visit request is approved by the property owner.
- **Admin/Owners**: Have immediate access to exact coordinates for their own properties or platform moderation.

---

## Lessons Learned

Obfuscating listing coordinates protects user safety without compromising search. Masking exact addresses until trust is established helps reduce offline bypasses and keeps transactions secure.

## Related Articles
- [Google Maps Platform Integration: Owner Property Location & Address Verification](/blog/engineering/google-maps-location-picker)
- [Smart Property Search: Pinned Locations & Search Analytics in Supabase](/blog/engineering/smart-property-search-filters)
