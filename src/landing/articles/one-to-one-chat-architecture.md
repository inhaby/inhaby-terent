# Redesigning Inhaby Chat Architecture: Strictly Enforcing 1-to-1 User Conversations

*A technical breakdown of Inhaby's transition from property-linked chat threads to a strict participant-pair messaging model, including database deduplication procedures and concurrency locks.*

---

## Article Metadata

| Field | Value |
|---|---|
| **SEO Title** | Redesigning Chat to a Strict 1-to-1 Architecture — Inhaby Case Study |
| **SEO Description** | How Inhaby overhauled its messaging system to merge property inquiries and visit requests into a single WhatsApp-style 1-to-1 chat thread. |
| **Canonical URL** | https://inhaby.com/blog/engineering/one-to-one-chat-architecture |
| **Slug** | one-to-one-chat-architecture |
| **Focus Keywords** | 1-to-1 chat database schema, Supabase unique constraint, React chat deduplication |
| **Reading Time** | 8 minutes |
| **Category** | Engineering |
| **Author** | Inhaby Tech Division |
| **Published Date** | 2026-08-13 |
| **Updated Date** | 2026-08-13 |

---

## The Monolith Problem: Property-Bound Threads

In early versions of Inhaby, chat threads were created dynamically for each individual property inquiry. If a tenant contacted a landlord about Property A, and later inquired about Property B, the system generated two separate conversation records in the database.

This created multiple issues:
- **Inbox Bloat**: A landlord's inbox listed the same tenant multiple times.
- **Fragmented History**: Conversations regarding visits, pricing negotiations, and bookings were scattered across different threads.
- **Double Inits**: Rapid double-clicking on the "Contact Owner" button generated duplicate empty threads under race conditions.

---

## The Solution: Strictly Participant-Pair Bound Conversations

We refactored Inhaby's messaging to a strict **One User ↔ One Other User = One Conversation** model (similar to WhatsApp or Instagram Direct).

### 1. Database Unique Constraint
To prevent duplicate records, we added a unique index on the `conversations` table. Since a conversation involves a `tenant_id` and an `owner_id`, we sort the IDs at database level using `LEAST` and `GREATEST` to ensure uniqueness regardless of who initiated the contact:

```sql
CREATE UNIQUE INDEX idx_conversations_unique_participants 
ON public.conversations (LEAST(tenant_id, owner_id), GREATEST(tenant_id, owner_id));
```

### 2. Contextual Message Payloads
Because the conversation is no longer tied to a specific `property_id`, we added a `message_type` field and a `payload` (`JSONB`) column to `public.messages`. 

When a tenant clicks "Schedule Visit" or "Contact Owner" for a new house:
- The system calls `getOrCreateConversation(tenantId, ownerId)`.
- An inline property card message (`message_type: 'property_context'`) is appended to the active 1-to-1 thread.
- Visit confirmations, acceptances, and booking requests are injected as interactive cards within the same timeline.

---

## deduplication Migration Procedure

To safely migrate existing records, we executed a multi-step migration script:
1. Grouped existing `conversations` by participant pairs `(tenant_id, owner_id)`.
2. Selected the oldest record per pair as the canonical conversation.
3. Updated the foreign keys of all historical messages belonging to duplicate threads to point to the canonical ID.
4. Updated references inside `visits` and `bookings` tables.
5. Deleted the duplicate conversation records.

## Related Articles
- [Soft Deletions, Emoji Pickers, and Multi-Image Sharing: Enhancing Rental Conversations](/blog/engineering/rich-conversations-soft-delete-media)
- [How Inhaby Built a GitHub Shared Package to Unify Three React Applications](/blog/engineering/github-packages-inhaby-shared)
