I'm Genofogu. I'm the co-founder of Inhaby.

That sentence sounds more official than the reality. The reality is that most days I'm just one person sitting at a desk, writing code, making mistakes, fixing them, and trying to build something that actually helps people find a home without being robbed by a broker.

This page is my attempt to introduce myself honestly — not in the way founders usually introduce themselves on "About" pages, with carefully chosen words designed to project credibility. Just the actual version.

---

## Why Inhaby Exists

Renting a home in India is expensive in ways that have nothing to do with the home itself.

The broker model is the default. You find a flat you like. The broker who showed it to you takes a fee — typically one month's rent, sometimes two. You pay it, because there's no other path. The owner won't deal with you directly. The broker controls access.

That's not a market failure. It's a structural inefficiency that's been normalised because no one built a better system.

I started thinking about Inhaby because I watched people around me — good people, working people — spend money they didn't have to spend on something that shouldn't cost anything. A broker's job is to introduce two parties. When both parties are already online, that introduction doesn't need to cost a month's rent.

Inhaby's premise is simple: **verified owners list their properties directly. Tenants find them, message them, schedule visits, and sign leases — without a broker in the middle.**

That's the whole idea. It's not complicated. The difficulty is in building the system that makes it trustworthy enough that both sides — owners and tenants — actually use it.

---

## What I'm Building

Inhaby isn't a single app. It's a platform with three surfaces:

1. **The Tenant App** — where renters search, save, book visits, and manage their tenancy
2. **The Owner Portal** — where property owners list, manage leads, communicate with tenants, and track payments
3. **The Admin Panel** — internal tools for moderating listings, verifying owners, and managing the platform

All three share one TypeScript package — `@inhaby/shared` — that contains the Supabase client, all data models, and shared utilities. It's published as a scoped package under the `@inhaby` GitHub Packages registry.

The backend is Supabase. The frontend is React with Vite. The styling is Tailwind. The whole thing is deployed from a monorepo structure where each application is independent but shares common infrastructure.

Is this the optimal architecture for a startup? Probably not perfectly. But it's what I understand, it works, and it lets me move fast without constantly reinstalling shared dependencies.

---

## Building While Learning

I want to be honest about this: I am learning while I build.

I'm not a computer science graduate. I'm not a senior engineer with ten years of production experience. I'm someone who taught himself to code, who reads documentation carefully, who makes mistakes and then spends hours or days understanding exactly what went wrong and why.

Most of what I know about React I learned by building Inhaby. Most of what I know about Supabase I learned by using it. The same is true for TypeScript, for authentication flows, for database design.

This is a real limitation. There are definitely architectural decisions I've made that a more experienced engineer would have made differently. I know this because I find the evidence myself — I wrote code, shipped it, and later discovered it had a fundamental problem I missed entirely.

But there's a different kind of knowledge you get from building something real. Not hypothetical. Not tutorial-scale. A real system with real users in mind, real edge cases, real security requirements. You learn differently when the mistakes are yours to fix.

---

## Challenges Faced

**Building alone is slow.** Every decision — architecture, design, database schema, deployment, SEO — is mine to research, make, and live with. There's no one to catch my mistakes before they become problems.

**I second-guess myself constantly.** Am I solving the right problem? Is this the correct abstraction? Should this be a hook or a context? These questions slow everything down.

**Learning and building at the same time is exhausting.** Some days I spend more time reading documentation than writing code. That's fine — it's necessary — but it means progress is slower than I'd like.

**The Indian proptech space is crowded.** There are players with funding, teams, and years of head start. I am one person. I'm not going to beat them by doing what they do. I have to build something more useful and more trustworthy than what exists.

---

## What I've Learned

**Perfect architecture is a myth.** Every system has compromises. The goal is to build something that works, that you understand, and that can be improved. Inhaby v1.0 had many problems. v1.8 has fewer. Every version will have fewer than the last.

**Write the plan before you write the code.** The times I've skipped this step, I've regretted it. When I write out what I'm going to build — what files change, what the success criteria are, what the failure modes are — the implementation goes faster and the bugs are smaller.

**Read the error messages.** Completely, carefully, from top to bottom. Most of the bugs I've spent hours on were described exactly in the first line of the error.

**Commit early and often.** I've lost work exactly once. Once was enough.

**Ship it.** A finished product that's 80% of what you imagined is more valuable than a perfect product that doesn't exist.

---

## My Daily Engineering Routine

Most days I start in the early afternoon and work until late at night. India Standard Time puts me in a different timezone from most of the developer communities I learn from, which means I often read the morning's Stack Overflow answers at 11pm.

I keep an engineering log for every working session. Not for anyone else — for myself. Writing down what I did, what broke, and what I learned forces me to actually understand it rather than just move past it.

I commit to Git at the end of every session with a descriptive message. The commit history is my changelog and my memory.

---

## Vision for Inhaby

The long-term vision for Inhaby is a complete, end-to-end rental operating system for India.

Today: tenants find verified properties, book visits, and message owners.

Tomorrow: digital lease signing, rent payment processing, maintenance request management, tenancy history as a portable trust signal for future rentals.

Eventually: a reputation layer where verified tenants carry their rental history from property to property, and verified owners carry their responsiveness record from tenant to tenant.

The broker's role is to manufacture trust where none exists. If the platform creates real, verifiable trust — through history, reviews, verification, and guarantees — the broker becomes unnecessary. That's the goal.

---

## Philosophy Toward Product Building

I believe products should do one thing better than anything else before they try to do everything. Inhaby's one thing is: connecting a tenant to a verified, brokerage-free rental. Everything else is secondary until that's genuinely excellent.

I also believe in transparency. The engineering journal exists because I think the process of building — the struggles, the bugs, the 3am rebuilds — is as valuable to share as the final product. There are people trying to build products who would benefit from seeing what the middle of the journey actually looks like, not just the highlight reel.

And I believe in being honest about limitations. Inhaby is not a finished product. It is a work in progress built by one person who is learning as he goes. I'd rather say that clearly and be trusted for it than present an image of completeness that isn't real.

---

## Related Articles

- **Engineering:** [How We Built the @inhaby/shared GitHub Package](/blog/engineering/github-packages-inhaby)
- **Engineering:** [Merging a Landing Page Into a Vite React App](/blog/engineering/landing-page-integration)
- **Founder Journal:** [Day 003 — I Broke Everything, Then Fixed It Properly](/blog/founder-journal/day-003-rebuilding-architecture)

---

## FAQ

**Q: Who is Genofogu?**
A: Genofogu is the co-founder of Inhaby, a zero-brokerage property rental platform for India. He is the primary engineer building the platform, working across the tenant app, owner portal, admin panel, and shared infrastructure.

**Q: What is Inhaby?**
A: Inhaby is a platform that connects tenants directly with verified property owners, eliminating the broker fee from the rental process.

**Q: Is Genofogu a professional software engineer?**
A: Genofogu is a self-taught developer who learned to code while building Inhaby. He is transparent about learning on the job and documents that process in the Founder Journal.

**Q: Where can I follow Inhaby's progress?**
A: At /blog/founder-journal for personal reflections, and /blog/engineering for technical deep-dives.

---

## JSON-LD Recommendations

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Genofogu",
  "url": "https://inhaby.com/founder/genofogu",
  "jobTitle": "Co-Founder",
  "worksFor": {
    "@type": "Organization",
    "name": "Inhaby",
    "url": "https://inhaby.com",
    "description": "Zero-brokerage property rental platform for India"
  },
  "description": "Co-founder of Inhaby, building a zero-brokerage property rental platform in India.",
  "sameAs": []
}
```
