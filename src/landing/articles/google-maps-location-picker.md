# Google Maps Platform Integration: Owner Property Location & Address Verification

*How Inhaby built its Property Location Engine using Google Places Autocomplete and geocoding marker utilities to capture verified rental coordinates in India.*

---

## Article Metadata

| Field | Value |
|---|---|
| **SEO Title** | Google Maps Property Location Picker for Proptech — Inhaby Case Study |
| **SEO Description** | How Inhaby integrated Google Maps, Places Autocomplete, and geocoding markers into its owner portal to ensure verified property coordinates. |
| **Canonical URL** | https://inhaby.com/blog/engineering/google-maps-location-picker |
| **Slug** | google-maps-location-picker |
| **Focus Keywords** | Google Places Autocomplete, geocoding React, property location maps |
| **Reading Time** | 6 minutes |
| **Category** | Engineering |
| **Author** | Inhaby Tech Division |
| **Published Date** | 2026-08-13 |
| **Updated Date** | 2026-08-13 |

---

## The Verification Problem: Fake and Inaccurate Addresses

In traditional rental portals, landlords type their address as a flat text string. This leads to several issues:
- **Inaccurate Search Results**: Misspelled areas or generic locality tags make it difficult to filter properties by radius.
- **Wasted Visits**: Tenants travel to coordinates that do not match the actual building location.
- **Curbing Spammers**: Scammers can list fake locations since there are no verification checks.

---

## The Solution: Property Location Engine

We built the **Property Location Engine** (Phase 2) inside `@inhaby/shared` and integrated it with the listing wizard inside the Owner Portal.

### 1. Indian Scope Places Autocomplete
We configured the autocomplete query to target only Indian territories (`country: 'in'`) and prioritize results close to tech hubs like Bangalore and Pune.

### 2. Geocoding and Map Sync
When the owner selects an address suggestion:
- The system calls Google's Geocoding API.
- The map pans to the corresponding latitude and longitude coordinates.
- A marker is placed on the map.
- The owner can drag the marker to adjust and confirm the exact entrance gate coordinates.
- The system auto-fills fields like `locality`, `city`, `state`, and `pincode` in the form.

### 3. Database Schema
Confirmed coordinate values are written directly to `public.property_locations` table in Supabase:
- `property_id` (UUID references properties)
- `latitude` (NUMERIC)
- `longitude` (NUMERIC)
- `display_address` (TEXT)
- `locality` (TEXT)
- `pincode` (VARCHAR)

---

## Lessons Learned

Using autocomplete fields simplifies address input and helps prevent typing errors. Allowing owners to manually drag coordinates ensures accurate location data for visitor geofencing and travel calculations.

## Related Articles
- [Designing a Tenant Location Privacy Overlay on Inhaby](/blog/engineering/tenant-location-privacy)
- [Smart Location Caching: Building the Smart Location Intelligence Engine](/blog/engineering/smart-location-intelligence-caching)
