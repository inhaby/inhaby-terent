# Enforcing Environment Variable Security: Removing Cloudinary Default Fallbacks

*How Inhaby secured its upload pipelines by removing default fallbacks, verifying environment variables at runtime, and rendering premium warning banners.*

---

## Article Metadata

| Field | Value |
|---|---|
| **SEO Title** | Enforcing Cloudinary Environment Security in React — Inhaby Case Study |
| **SEO Description** | Learn how Inhaby eliminated fallback credentials and added runtime config warnings for Cloudinary uploads. |
| **Canonical URL** | https://inhaby.com/blog/engineering/cloudinary-env-enforcement |
| **Slug** | cloudinary-env-enforcement |
| **Focus Keywords** | React environment variables, Cloudinary security, config warning banners |
| **Reading Time** | 4 minutes |
| **Category** | Engineering |
| **Author** | Inhaby Tech Division |
| **Published Date** | 2026-08-13 |
| **Updated Date** | 2026-08-13 |

---

## The Danger of Credentials Fallbacks

In early stages of development, engineers often leave placeholder values in configuration files to bypass setup steps during onboarding. At Inhaby, our Cloudinary client in `@inhaby/shared` used default strings like `'inhaby'` and `'inhaby_premium_prod'` if the environment variables `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET` were not defined.

While this seemed convenient, it introduced risks:
- **Accidental Production Writes**: Developers running local tests wrote assets to production Cloudinary folders.
- **Silent Failures**: If `.env` files were missing on target build servers, the build compiled successfully but failed during runtime uploads, making troubleshooting difficult.
- **Security Risks**: Leaving fallback keys in client packages increases the risk of exposing staging folders in production bundles.

---

## The Security Enforcement Update

We implemented a strict configuration verification flow:

### 1. SDK-Level Exceptions
We updated `Inhaby-Shared/src/media/cloudinary.ts` to inspect the configuration at runtime. If either `VITE_CLOUDINARY_CLOUD_NAME` or `VITE_CLOUDINARY_UPLOAD_PRESET` is empty, the utility throws an explicit error immediately.

### 2. User-Friendly UI Warning Panels
Rather than letting the application crash or fail silently when variables are missing, we updated `CloudinaryMediaManager.tsx` in the Owner Portal to display a warning alert.

When the component mounts, it checks for the variables:
- If keys are missing, the file-selection inputs are disabled.
- A premium, styled alert box is displayed with clear setup instructions:

> **Missing Cloudinary Configurations**:
> Please check that `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET` are configured in your local `.env` file and restart your Vite development server.

---

## Lessons Learned

Default fallbacks hide configuration problems. Enforcing strict checks early helps keep dev and prod environments separated and ensures configuration issues are flagged immediately.

## Related Articles
- [Moving Inhaby Property Media to Cloudinary](/blog/engineering/cloudinary-media-migration)
- [How Inhaby Built a GitHub Shared Package to Unify Three React Applications](/blog/engineering/github-packages-inhaby-shared)
