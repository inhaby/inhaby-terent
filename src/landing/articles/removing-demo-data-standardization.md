# Removing Demo Data from a Real Production Proptech Product

*The engineering rationale and implementation log behind purging Unsplash mock image fallbacks, clearing static property arrays, and establishing neutral placeholders across Inhaby.*

---

## Article Metadata

| Field | Value |
|---|---|
| **SEO Title** | Purging Mock Data & Unsplash Fallbacks in Proptech — Inhaby Case Study |
| **SEO Description** | How Inhaby cleaned up its codebase by replacing default Unsplash URLs and dummy data arrays with authentic Cloudinary media feeds. |
| **Canonical URL** | https://inhaby.com/blog/engineering/removing-demo-data-standardization |
| **Slug** | removing-demo-data-standardization |
| **Focus Keywords** | mock data removal React, Unsplash image fallbacks, clean UI placeholders |
| **Reading Time** | 5 minutes |
| **Category** | Engineering |
| **Author** | Inhaby Tech Division |
| **Published Date** | 2026-08-13 |
| **Updated Date** | 2026-08-13 |

---

## The Danger of Stale Mock Data in Production

During early sprints, developers regularly use placeholder assets to speed up interface design. At Inhaby, cards defaulted to Unsplash stock photos (`photo-1522708323590`) if a listing lacked uploaded photos. We also maintained hardcoded listing arrays like `SIZZLING_DEALS` and `TOP_SELECTIONS` in `data.ts` to populate landing page elements.

As the platform transitioned toward production builds, these mock placeholders became risky:
- **Misrepresentation**: Houses listed by real owners displayed stock images, confusing tenants.
- **Diverging State**: Booking cards, comparison feeds, and search map pins resolved listings through different pathways—some querying Supabase, others falling back to hardcoded Unsplash paths.
- **Resource Waste**: Loading large unused JSON objects bloated our React bundle sizes.

---

## The Purging Workflow

We audited and removed all demo data dependencies across our three applications:

### 1. Tenant Application (`inhaby-terent`)
- **API Services**: Updated `property.service.ts` to return `null` instead of stock URLs if no records exist in `property_media`.
- **Card Components**: Added a unified, lightweight `NoPhotoPlaceholder` component featuring a `CameraOff` icon. Applied it to all 9 card variations (`GridCard`, `ListCard`, `CarouselCard`, etc.).
- **Search Maps**: Adjusted the InfoWindows inside `PropertySearchMap.tsx` to handle empty media states gracefully.
- **Data Cleanup**: Purged all deprecated arrays from `src/data.ts`, keeping only dynamic category structures.

### 2. Owner Portal (`owner-portal`)
- **Listing Forms**: Initialized empty arrays `[]` instead of pre-populating with mock images.
- **Previews**: Verified `ListingPreviewModal.tsx` uses neutral placeholders to let owners see exactly how their listings appear when first uploaded.

### 3. Admin Panel (`admin-panel`)
- **Audit Tables**: Standardized card previews inside `PropertiesView.tsx` to prevent default fallbacks, making it easy for moderators to spot properties that require photos.

---

## Lessons Learned

Using mock data is helpful for initial design, but it should be separated from components early. Incorporating hardcoded fallbacks into UI cards creates maintenance debt. Clean, neutral placeholder components are safer and preserve the visual integrity of real data feeds.

## Related Articles
- [Moving Inhaby Property Media to Cloudinary](/blog/engineering/cloudinary-media-migration)
- [Why Property Verification Matters: Aadhaar, Land Deeds, and Utility Audits](/blog/founder-journal/why-property-verification-matters)
