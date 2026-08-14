# Moving Inhaby Property Media to Cloudinary

*A deep dive into Inhaby's transition from our custom canvas-based Media-Engine to a streamlined Cloudinary direct upload architecture, optimizing responsive asset loading across tenant, owner, and admin surfaces.*

---

## Article Metadata

| Field | Value |
|---|---|
| **SEO Title** | Moving Proptech Property Media to Cloudinary — Inhaby Case Study |
| **SEO Description** | How Inhaby migrated from a custom local canvas compression/AI quality verifier tool to Cloudinary direct upload pipelines, reducing database footprint. |
| **Canonical URL** | https://inhaby.com/blog/engineering/cloudinary-media-migration |
| **Slug** | cloudinary-media-migration |
| **Focus Keywords** | Cloudinary integration React, property image optimization, real estate media system |
| **Reading Time** | 7 minutes |
| **Category** | Engineering |
| **Author** | Inhaby Tech Division |
| **Published Date** | 2026-08-13 |
| **Updated Date** | 2026-08-13 |

---

## The Migration Context

Initially, Inhaby developed a custom local `/Media-Engine` tool to process rental listing photos. It used:
- Client-side HTML5 canvas compression pipelines.
- Local image quality scoring and computer-vision heuristics to flag dark or blurry listing photos.
- Version control tracking to match raw photos with resized thumbnails.
- Supabase storage buckets to save multiple resolution files (`thumbnail_url`, `medium_url`, etc.).

As transaction counts scaled, local canvas processing introduced client lag on mobile browsers, and maintaining multiple resized copies of every photo inflated database and file storage costs.

---

## The Cloudinary Architecture Shift

To simplify our layout, we migrated our applications directly to **Cloudinary**:

1. **Ingestion**: Property listing uploads route directly to Cloudinary via signed HTTP requests. Cloudinary handles server-side WebP/AVIF compression.
2. **Dynamic Delivery**: Rather than storing multiple files for various viewport sizes, the Tenant App and Owner Portal query a single Cloudinary source URL applying dynamic transformations:
   - `f_auto` for automated browser-based format selection (AVIF vs WebP).
   - `w_auto` / `c_limit` for dynamic responsive image boundaries.
3. **Database Footprint Reductions**: We purged several columns on our Supabase `property_media` table. Supabase no longer tracks resolutions, parent/child editing hierarchies, or quality ratings. It stores only the essential details:
   - `property_id`
   - `public_id` (representing the Cloudinary storage path)
   - `public_url` (mapped to `secure_url`)
   - `sort_order`
   - `category` (defaulting to `'Exterior'`)

---

## Code References & Future Switchbacks

The custom engine files were preserved under the standalone directory `/Media-Engine` in case we need local self-hosted fallbacks. Transitioning back simply requires copying files back to `@inhaby/shared` and updating the field renderer inside `DynamicFieldControl.tsx` on the Owner Portal to reference `MediaManager`.

## Related Articles
- [Enforcing Environment Variable Security: Removing Cloudinary Default Fallbacks](/blog/engineering/cloudinary-env-enforcement)
- [Removing Demo Data from a Real Production Proptech Product](/blog/engineering/removing-demo-data-standardization)
