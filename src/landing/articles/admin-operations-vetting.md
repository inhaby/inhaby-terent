# The Role of Admin Operations Vetting in Reducing Rental Scams

*A look at Inhaby's internal moderation queue, admin role definitions, and workflow processes used to evaluate listings and verify hosts.*

---

## Article Metadata

| Field | Value |
|---|---|
| **SEO Title** | Moderation Workflows and Admin Role Vetting — Inhaby Case Study |
| **SEO Description** | Learn how Inhaby's operations team manages listing approvals, KYC documents, and admin role assignments to keep the rental platform secure. |
| **Canonical URL** | https://inhaby.com/blog/operations/admin-operations-vetting |
| **Slug** | admin-operations-vetting |
| **Focus Keywords** | rental listing moderation, admin dashboard KYC, role-based database access |
| **Reading Time** | 5 minutes |
| **Category** | Operations |
| **Author** | Inhaby Operations Team |
| **Published Date** | 2026-08-13 |
| **Updated Date** | 2026-08-13 |

---

## The Role of Moderation in Proptech Platforms

Unverified listing portals are vulnerable to spam and fake accounts. To maintain listing quality, platforms need a moderation system to review and approve listings before they go public.

Inhaby uses the **Admin Panel** to manage listing reviews, verify owner identities, and monitor platform activity.

---

## Inhaby's Role-Based Operational Setup

To manage operations securely, we set up role-based access permissions. Admin users are assigned specific roles with restricted access:
- **`super_admin`**: Full platform permissions, system configuration controls, and role assignment capabilities.
- **`admin`**: Handles general operations, dashboard audits, and payment reviews.
- **`moderator`**: Reviews listing descriptions, inspects photos, and checks content quality.
- **`verification_agent`**: Audits landlord KYC documents, checks land deeds, and verifies tax receipts.
- **`support_agent`**: Manages user help tickets and coordinates communications.

---

## The Listing Vetting Workflow

When a landlord uploads a listing, it is saved in a `Pending` state and added to the admin review queue. The approval process follows a step-by-step audit:

1. **Document Verification**: A verification agent audits the landlord's Aadhaar details and ownership documents (such as sale deeds or tax receipts).
2. **Media Vetting**: A moderator reviews the uploaded photos to flag CGI renders, wide-angle stretching, or stock images.
3. **Location Check**: The agent cross-checks geocoded map coordinates with the landlord's address line details.
4. **Approval Confirmation**: Once all checks pass, the listing status updates to `Approved`, making it visible to tenants.

Any changes to a listing's status or details are logged in our database audit trails for tracking.

---

## Lessons Learned

Using role-based access permissions keeps user data secure and helps team members focus on their tasks. Tracking moderation actions in audit logs also provides a clear history of listing approvals.

## Related Articles
- [Why Property Verification Matters: Aadhaar, Land Deeds, and Utility Audits](/blog/founder-journal/why-property-verification-matters)
- [Why Inhaby Split Owner and Tenant Experiences into Two Applications](/blog/founder-journal/role-separated-portals)
