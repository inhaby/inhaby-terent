# Smart Location Caching: Building the Smart Location Intelligence Engine

*How Inhaby built a local database caching layer to compute transit, school, and utility scores while reducing external Google API expenses.*

---

## Article Metadata

| Field | Value |
|---|---|
| **SEO Title** | Proptech Location Intelligence & API Caching — Inhaby Case Study |
| **SEO Description** | How Inhaby built a PostgreSQL caching system to store nearby places, travel distances, and location scores, reducing Google Maps API bills. |
| **Canonical URL** | https://inhaby.com/blog/engineering/smart-location-intelligence-caching |
| **Slug** | smart-location-intelligence-caching |
| **Focus Keywords** | Google Maps API caching, PostgreSQL JSONB cache, location intelligence scoring |
| **Reading Time** | 7 minutes |
| **Category** | Engineering |
| **Author** | Inhaby Tech Division |
| **Published Date** | 2026-08-13 |
| **Updated Date** | 2026-08-13 |

---

## The Problem: High Latency and API Bills

To help tenants evaluate a property, Inhaby displays a location scorecard showing nearby places (metro stations, schools, supermarkets) and commute travel times.

Querying this data from Google Places and Distance Matrix APIs on every page load introduced challenges:
- **API Costs**: Google Maps charges per API request. Millions of searches could lead to high expenses.
- **Latency**: Direct API queries added 1.2 to 2.5 seconds of load time to the property details view.
- **Redundancy**: Properties in the same building or locality fetched duplicate nearby places repeatedly.

---

## The Solution: Local Cache & Scoring Engine

We implemented the **Smart Location Intelligence Engine** (Phase 4), caching Maps query results in our PostgreSQL database.

### 1. Database Schema
We created caching tables in Supabase to decouple frontend views from external APIs:
- `property_location_cache`: Stores the area metadata JSON profile (city, locality, pincode, district).
- `property_nearby_places`: Caches lists of nearby schools, transit links, and hospitals.
- `property_location_scores`: Stores normalized scores (e.g. "Transit: 85", "Groceries: 90").
- `property_location_tags`: Caches smart classification tags like `"Metro Connect"`, `"Quiet Area"`, or `"Tech Commuter Hub"`.

### 2. Intelligent Scoring Logic
When an owner lists a property, the system triggers an asynchronous background worker to fetch nearby locations once:
- The worker queries Google Places within a **1.5km radius**.
- It normalizes the distance of essential locations to calculate a rating from 0 to 100.
- The results are cached in the database.
- Consuming apps query the database cache instead of the live Google API.

This reduced page load times for listing scorecards to less than **50ms**.

---

## Lessons Learned

Caching external API responses reduces costs and speeds up applications. Storing raw API responses in JSONB columns allows adjusting scoring algorithms later without re-querying the Google Maps API.

## Related Articles
- [Google Maps Platform Integration: Owner Property Location & Address Verification](/blog/engineering/google-maps-location-picker)
- [Smart Property Search: Pinned Locations & Search Analytics in Supabase](/blog/engineering/smart-property-search-filters)
