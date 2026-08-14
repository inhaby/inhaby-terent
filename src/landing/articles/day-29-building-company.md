# Building Inhaby — Day 29: The Day We Stopped Building Features and Started Building a Company

Most startup updates celebrate shiny new features.

Today wasn't one of those days.

Today was about architecture, debugging, authentication, deployment strategy, and making decisions that most users will never notice—but that will determine whether Inhaby can support thousands, or even millions, of people in the future.

---

## Three Platforms, One Vision

By this point, Inhaby had already evolved into three independent applications:

* **inhaby.com** — Tenant Platform
* **owner.inhaby.com** — Owner Portal
* **admin.inhaby.com** — Internal Admin Dashboard

Each application was working independently, but they all relied on the same authentication logic, Supabase client, shared types, utility functions, and storage services.

Initially, these files lived inside a shared folder that every application referenced locally.

It worked.

Until we realized it wouldn't scale.

---

## The First Major Architecture Decision

The question became:

Should we keep copying shared files into every repository?

Or should we build something reusable?

We chose the second option.

Instead of duplicating code, we converted our shared folder into a standalone TypeScript package called:

**@inhaby/shared**

This package now contains:
- **Shared Supabase Client:** Centralized initialization logic for database, real-time channels, and storage buckets.
- **Authentication Helpers:** Uniform handlers for session states, token refreshes, and route guards.
- **Storage Utilities:** Reusable helper functions for securely uploading and retrieving property assets.
- **Global TypeScript Models:** Unified type definitions for properties, bookings, and users.
- **Common Interfaces:** Reusable UI payload structures.
- **Shared Business Logic:** Pricing formulas and date math calculations.

This means every Inhaby application now depends on a single source of truth.

One bug fix.

Three applications updated.

No duplicated code.

---

## When Things Broke...

Of course, nothing worked immediately.

Imports failed.

TypeScript complained.

Path aliases stopped resolving.

Applications couldn't find shared modules.

Every repository had to be updated carefully.

Package exports had to be redesigned.

Build outputs had to be generated correctly.

Eventually, after several iterations...

The package finally compiled successfully.

---

## The Admin Login Problem

Another challenge appeared inside our Admin Portal.

The authentication system kept throwing mysterious errors:
- **HTTP 400** (Bad Request) on token exchange.
- **HTTP 500** (Internal Server Error) during credential validation.
- **Invalid credentials** prompts on valid logins.
- **Missing identity records** in user profiles.
- **Supabase authentication failures**.

At first, it looked like a password issue.

Then an email issue.

Then a database issue.

After tracing the authentication flow, we discovered the real cause.

The administrator account had been inserted manually into database tables instead of being created through the official Supabase Authentication API.

That meant critical authentication records were missing.

The user existed...

But couldn't actually log in.

Once we recreated the admin account properly using the official authentication flow, everything finally started working.

The Admin Dashboard became accessible again.

---

## Rethinking Admin Authentication

While fixing authentication, another design question came up.

Should administrators log in using personal email addresses?

For an internal operations panel, the answer was no.

Instead, we designed a future system where administrators authenticate using:
1. **A unique internal username** instead of public email domains.
2. **A secure password** enforced with strict complexity checks.

Email becomes optional profile information after login rather than the primary login identifier.

This provides more flexibility for internal staff while keeping authentication independent from personal email ownership.

---

## The Visit Request Mystery

Next came a frustrating bug.

Owner-created properties appeared correctly inside the Tenant application.

Everything looked perfect.

Except one button.

**"Request Viewing Tour"**

Nothing happened.

No errors.

No loading state.

No request.

Seed data worked perfectly.

Real properties didn't.

The bug turned out to be surprisingly simple.

The booking flow was still searching inside the hardcoded development property array.

Owner-created properties came from the database.

Because they weren't part of the mock dataset, the lookup silently returned nothing.

The booking pipeline stopped before making any database request.

Replacing every hardcoded lookup with dynamic property resolution solved the architectural issue.

The lesson wasn't just to fix one button.

It was to remove every remaining dependency on fake data.

---

## Local Development Challenges

Running three separate applications simultaneously also introduced development issues.

Ports collided.

WebSocket servers competed for the same development port.

Multiple Vite servers were running together.

These weren't product problems.

They were engineering workflow problems.

Solving them now saves countless hours later.

---

## Preparing for Scale

One question stayed in our minds throughout the day:

"What happens when Inhaby has 100 users?"

"What about 10,000?"

"What about one million?"

We realized our architecture had to grow before our user base did.

That led to one of today's biggest milestones.

---

## Publishing Our First Internal Package

After converting our shared code into a package, we decided not to keep it local forever.

Instead, we published it as an internal GitHub Package.

The journey wasn't easy.

Repository ownership changed.

Git remotes had to be updated.

Authentication tokens were regenerated.

GitHub Package permissions rejected our requests.

Repository history had to be merged after transferring ownership.

Several publishing attempts failed with permission errors.

Eventually...

Everything aligned.

The package finally published successfully.

Our first internal SDK was officially live.

---

## Why This Matters

Most users will never know this package exists.

They won't see it.

They won't click it.

They won't interact with it.

But every future feature inside Inhaby will depend on it.

Whenever we improve authentication...

Fix storage...

Update shared types...

Improve security...

Every application benefits instantly.

This single package will save hundreds of development hours over the lifetime of the company.

---

## Looking Ahead

Today wasn't about adding visible features.

It was about building foundations.

The next milestones are now clear:
- Complete the live visit request workflow
- Owner approval and rejection flow
- Viewing completion system
- Contact unlocking
- Real-time messaging
- Booking confirmations
- Full production deployment

The architecture is becoming stable.

The foundations are becoming stronger.

And with every obstacle solved, Inhaby becomes a little more ready for the future we imagine.

---

**Progress isn't always measured by what users can see.**

Sometimes it's measured by how many future problems you quietly prevented before they ever had the chance to happen.
