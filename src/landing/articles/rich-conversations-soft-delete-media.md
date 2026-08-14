# Soft Deletions, Emoji Pickers, and Multi-Image Sharing: Enhancing Rental Conversations

*How Inhaby integrated multi-image uploads, modal lightboxes, message soft deletions, and emoji input capabilities into its chat system.*

---

## Article Metadata

| Field | Value |
|---|---|
| **SEO Title** | Enhancing Chat Systems with Rich Media & Soft Deletions — Inhaby Case Study |
| **SEO Description** | How Inhaby implemented a rich chat interface featuring multi-image attachments, Cloudinary uploads, soft deletions, and an emoji picker. |
| **Canonical URL** | https://inhaby.com/blog/engineering/rich-conversations-soft-delete-media |
| **Focus Keywords** | React chat media upload, soft delete message, emoji picker integration |
| **Reading Time** | 5 minutes |
| **Category** | Engineering |
| **Author** | Inhaby Tech Division |
| **Published Date** | 2026-08-13 |
| **Updated Date** | 2026-08-13 |

---

## The Needs of Rental Conversations

Renting a home involves detailed coordination. Text messages are often not enough—landlords and tenants need to:
- Share pictures of rooms, rental documents, and utility bills.
- Correct typos or remove accidentally sent files.
- Use emojis to express themselves and keep conversations friendly.

---

## Implementing Chat System Features

We added several rich media features to the Inhaby chat system:

### 1. Multi-Image Pickers and Cloudinary Lightboxes
- **Input Guard**: The file picker handles up to 10 images at once. Selecting more displays a warning: `"Maximum 10 images can be attached at once."`
- **Preview Composer**: Displays thumbnails with individual remove buttons to let users adjust attachments before sending.
- **Upload Pipeline**: Uploads files directly to Cloudinary under the folder `inhaby/chat/{conversation_id}/`.
- **Responsive Grids**: Displays sent images in a clean grid (1 to 10 photos) with a preview lightbox modal on click.

### 2. Message Soft Deletion
To let users retract messages, we added a soft deletion workflow:
- Users can click a 3-dot action menu on their own sent messages.
- Selecting "Delete" updates the database text field to `"This message was deleted"` and hides any associated media.
- The action menu is hidden for received messages.

### 3. Emoji Input Integration
We integrated `emoji-picker-react` to support emojis alongside standard text inputs, organizing them by category.

---

## Lessons Learned

Using client-side image staging allows users to review attachments before uploading, saving network bandwidth. Standardizing soft-delete labels helps maintain historical order while letting users manage their data.

## Related Articles
- [Redesigning Inhaby Chat Architecture: Strictly Enforcing 1-to-1 User Conversations](/blog/engineering/one-to-one-chat-architecture)
- [Moving Inhaby Property Media to Cloudinary](/blog/engineering/cloudinary-media-migration)
