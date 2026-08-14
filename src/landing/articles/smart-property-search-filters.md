# Smart Property Search: Pinned Locations & Search Analytics in Supabase

*How Inhaby built a proximity search filter and search analytics pipeline using PostgreSQL indexes and coordinate radius formulas.*

---

## Article Metadata

| Field | Value |
|---|---|
| **SEO Title** | High-Performance Proximity Search in Supabase — Inhaby Case Study |
| **SEO Description** | How Inhaby optimized map searches using coordinate indexes, pinned locations, and radius query algorithms on PostgreSQL. |
| **Canonical URL** | https://inhaby.com/blog/engineering/smart-property-search-filters |
| **Slug** | smart-property-search-filters |
| **Focus Keywords** | proximity search PostgreSQL, coordinate index Supabase, search analytics real estate |
| **Reading Time** | 6 minutes |
| **Category** | Engineering |
| **Author** | Inhaby Tech Division |
| **Published Date** | 2026-08-13 |
| **Updated Date** | 2026-08-13 |

---

## The Proximity Search Challenge

In a proptech search page, simple text filters for localities (like "Indiranagar") are often too restrictive. Tenants want to search for homes within a specific radius of a focal point, such as their office building or university campus.

To make radius searches fast on a standard PostgreSQL database without a complex PostGIS installation, we needed:
- Fast query times for latitude/longitude boundaries.
- Support for users to save their favorite search pins.
- Telemetry to monitor search query success rates and find underserved rental areas.

---

## The Proximity Search Architecture

We built the **Smart Search Engine** (Phase 5) to handle location searches.

### 1. Database Indexing
We added composite indexes on `public.property_locations` to speed up coordinate checks:
```sql
CREATE INDEX idx_locations_coordinates ON public.property_locations (latitude, longitude);
CREATE INDEX idx_locations_locality_pincode ON public.property_locations (locality, pincode);
```
These indexes help the database quickly filter rows by coordinate boundaries before calculating exact distances.

### 2. Radius Filtering Algorithm
To find properties within a radius, the application calculates a latitude/longitude bounding box based on the target coordinates:
- The system filters rows using the fast coordinate index.
- It then calculates exact distances on the remaining properties using the Haversine formula.

### 3. Pinned search centers and telemetry
- **Pinned Locations**: Added a table to let tenants pin locations on the map (like `"My Office"` or `"Gym"`) and quickly run proximity searches.
- **Search Analytics**: Added telemetry to log search queries, tracking which locations are popular and where search results are low to help expand inventory.

---

## Lessons Learned

Using coordinate indexes to pre-filter rows before calculating distances helps keep search queries fast without requiring a full PostGIS installation. Logging search queries also helps identify where users are looking for housing.

## Related Articles
- [Designing a Tenant Location Privacy Overlay on Inhaby](/blog/engineering/tenant-location-privacy)
- [Building In-Person Visit Workflows with GPS Geofencing and Access Instructions](/blog/engineering/visit-navigation-geofencing)
