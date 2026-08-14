## The Problem: Three Apps, Three Copies of Everything

When building a multi-surface platform — where tenants, property owners, and platform administrators each have their own dedicated application — the temptation is to copy and paste.

The Supabase client initialisation: copy it. The TypeScript type for `User`, `Property`, `Booking`: copy it. The auth helper that parses Supabase error messages into readable strings: copy it.

This works. Until it doesn't.

A copied `User` interface in the tenant app diverges from the `User` interface in the owner portal. A bug fix in the auth helper gets applied to two out of three apps. A Supabase URL environment variable is named `VITE_SUPABASE_URL` in the tenant app but `REACT_APP_SUPABASE_URL` in the admin panel.

These aren't hypothetical problems. They are the concrete problems that emerge when you're moving fast and not thinking about long-term consistency.

The Inhaby platform consists of three independent React applications:

1. **`inhaby-terent`** — the tenant-facing property discovery and rental management app
2. **`owner-portal`** — the property owner's listing management and tenant communication app  
3. **`admin-panel`** — the internal platform administration and moderation dashboard

All three needed the same Supabase client. All three needed the same TypeScript type definitions. All three shared common validation logic and storage helpers.

The solution was `@inhaby/shared`.

---

## What @inhaby/shared Is

`@inhaby/shared` is a scoped TypeScript package published to the GitHub Packages registry. It is the single source of truth for:

- **The Supabase client instance** — configured once, used everywhere
- **TypeScript type definitions** — all data models for the platform: `User`, `Property`, `Booking`, `Visit`, `Conversation`, `Message`, `Notification`, and more
- **Storage service** — wrapper for Supabase Storage file operations
- **Auth helpers** — email validation, password validation, Supabase error message parsing

Every application installs it as a dependency and imports from it as `@inhaby/shared`.

```typescript
import { supabase, User, Property, Booking } from '@inhaby/shared';
```

No copies. No divergence. One package, rebuilt and reinstalled when changes are needed.

---

## Package Architecture

The package follows a flat-module structure with a single entry point:

```
Inhaby-Shared/
├── src/
│   ├── types/
│   │   ├── index.ts          ← All TypeScript data models
│   │   └── env.d.ts          ← Vite environment variable type declarations
│   ├── database/
│   │   ├── supabaseClient.ts ← Supabase client initialisation
│   │   └── storageService.ts ← File upload / signed URL helpers
│   ├── utils/
│   │   └── authHelpers.ts    ← Email/password validation, error parsing
│   └── index.ts              ← Single barrel export
├── dist/                     ← Compiled output (TypeScript → ESModule JS + .d.ts)
├── tsconfig.json
├── package.json
└── .npmrc                    ← Registry configuration
```

The `index.ts` barrel is minimal — it re-exports everything from each module:

```typescript
export * from './types';
export * from './database/supabaseClient';
export * from './database/storageService';
export * from './utils/authHelpers';
```

---

## Type System: All Platform Models in One Place

The most valuable part of `@inhaby/shared` is the type system. With 239 lines covering every entity on the platform, it ensures that every application speaks the same data language.

Key type definitions include:

```typescript
export type UserRoleName = 'super_admin' | 'admin' | 'owner' | 'tenant';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatarUrl: string;
  role: UserRoleName;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: string;
  endDate?: string;
  rentAmount: number;
  depositAmount: number;
  status: BookingStatus;
  paymentMethod?: string;
  createdAt: string;
}
```

When a `Booking` record is fetched from Supabase in the tenant app and displayed in the owner portal, both applications are working from identical type contracts. TypeScript's compiler enforces this at build time — if the shared type changes, every consuming application gets a compile error until it's updated.

---

## The Supabase Client: Configured Once

The client initialisation in `supabaseClient.ts` handles a practical problem: different Supabase deployments sometimes use differently-named environment variables. The implementation accepts either `VITE_SUPABASE_ANON_KEY` or `VITE_SUPABASE_PUBLISHABLE_KEY` to be resilient across environments:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY 
  || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY 
  || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables are missing! Ensure VITE_SUPABASE_URL and either ' +
    'VITE_SUPABASE_ANON_KEY or VITE_SUPABASE_PUBLISHABLE_KEY are set in your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
```

Each consuming application sets its own `.env` file — the shared package picks up the correct values through Vite's `import.meta.env` at build time. Each application can have independent Supabase project URLs for complete environment separation.

---

## Publishing to GitHub Packages

The package is scoped to the `@inhaby` organisation and published to the GitHub Packages npm registry.

### Registry configuration (`.npmrc`)

```
@inhaby:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

The `NODE_AUTH_TOKEN` environment variable must be set to a GitHub Personal Access Token (PAT) with `read:packages` scope for installation and `write:packages` scope for publishing.

### `package.json` publish configuration

```json
{
  "name": "@inhaby/shared",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "default": "./dist/index.js"
    }
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "files": ["dist"]
}
```

The `exports` map ensures that TypeScript resolvers find type declarations (`.d.ts`) automatically. The `files` field limits the published content to the compiled `dist/` directory — source files are not published.

### Build command

```bash
npm run build   # runs tsc
```

TypeScript compiles `src/` into `dist/` — both `.js` module files and `.d.ts` declaration files are generated. The `tsconfig.json` sets `"declaration": true` and `"declarationMap": true` for full type information in consuming applications.

---

## Installing in Consuming Applications

During development, the package can be installed from a local path (useful before a version is published):

```json
"dependencies": {
  "@inhaby/shared": "file:../Inhaby-Shared"
}
```

Or, once published to GitHub Packages:

```bash
npm install github:genofogu/Inhaby-Shared
```

Consuming applications require their own `.npmrc` pointing to the GitHub Packages registry with authentication configured. This is set once per development machine or CI environment.

---

## Architecture Diagram

```
Inhaby Platform Architecture
─────────────────────────────

  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
  │  inhaby-terent  │   │  owner-portal   │   │  admin-panel    │
  │  (Tenant App)   │   │  (Owner App)    │   │  (Admin App)    │
  └────────┬────────┘   └────────┬────────┘   └────────┬────────┘
           │                     │                       │
           └──────────┬──────────┘                       │
                      └───────────────┬──────────────────┘
                                      │
                             @inhaby/shared
                          ┌────────────────────┐
                          │  supabase client   │
                          │  TypeScript types  │
                          │  storage service   │
                          │  auth helpers      │
                          └────────────────────┘
                                      │
                              Supabase Backend
                          ┌────────────────────┐
                          │  PostgreSQL DB      │
                          │  Auth              │
                          │  Storage           │
                          │  Realtime          │
                          └────────────────────┘
```

---

## Challenges

### Challenge 1: `import.meta.env` in a Shared Package

Vite processes `import.meta.env` at build time in each consuming application. This means the shared package's `supabaseClient.ts` correctly resolves environment variables from the **consuming application's** `.env` file — not from a `.env` in the shared package itself.

This is the intended behaviour, but it's non-obvious. The shared package should never contain environment values directly. It should always read from `import.meta.env`, trusting the consuming application to provide them.

**Lesson:** Shared packages that use `import.meta.env` must document clearly that the consuming application is responsible for environment variable configuration.

### Challenge 2: TypeScript `moduleResolution` for ESM Packages

With `"module": "ESNext"` and `"moduleResolution": "bundler"` in the shared package's `tsconfig.json`, consuming applications using older module resolution strategies (`node`, `node16`) may fail to resolve the package.

The solution was ensuring every consuming application's Vite config was set to use the same `bundler` resolution strategy, which is the default in Vite 4+.

### Challenge 3: Keeping the dist/ Folder Committed

During early development, the `dist/` folder must be committed to the repository when consuming applications install with `file:../Inhaby-Shared` path references. Applications importing from a local path need the compiled output present.

For GitHub Packages releases, this is less relevant — `npm publish` runs the build first and only publishes `dist/`. But locally, forgetting to rebuild the package after making changes is a common source of confusion where changes don't appear in consuming applications.

**Lesson:** Add a `prepare` script to automatically build before install: `"prepare": "npm run build"`.

---

## Common Mistakes

| Mistake | Impact | Fix |
|---|---|---|
| Importing from `@inhaby/shared` without rebuilding after changes | Changes don't appear in consuming apps | Always run `npm run build` in the shared package and `npm install` in consuming apps after changes |
| Missing `NODE_AUTH_TOKEN` in environment | `npm install` fails for GitHub Packages scoped packages | Set the token in `.env` or CI environment secrets |
| Forgetting `"types"` in `exports` map | TypeScript cannot find type declarations | Add `"types": "./dist/index.d.ts"` to the `exports` entry |
| Putting `.env` values directly in the shared package | Credentials leak into source | Always use `import.meta.env` and let consuming apps provide values |

---

## Lessons Learned

**1. Shared packages pay dividends immediately.**

The first time a type change in the platform propagated to all three apps through a single edit to `@inhaby/shared`, it was clear this was the right architecture. Without the shared package, the same change would require three edits, three code reviews, and the risk of the third app missing the update entirely.

**2. The package boundary forces good design.**

When code lives in a shared package, you think more carefully about its API surface. You can't just add a parameter to a function and rely on the rest of the codebase updating itself. The module boundary creates healthy friction.

**3. Local path dependencies are fine for small teams.**

GitHub Packages authentication adds friction. During active early development, `"@inhaby/shared": "file:../Inhaby-Shared"` is simpler and faster. Migrate to the registry when CI/CD pipelines require it.

**4. Type-only exports are valuable.**

The `@inhaby/shared` package exports type definitions that carry zero runtime cost — pure TypeScript interfaces. This means the package can be safely imported in any environment without adding bundle weight beyond the actual runtime code (`supabase.ts`, `storageService.ts`, `authHelpers.ts`).

---

## Future Improvements

- **Versioned releases** — Semantic versioning with a changelog so consuming applications can pin to stable versions and upgrade intentionally
- **CI/CD build pipeline** — Automated build and publish to GitHub Packages on merge to `main`
- **Expanded utilities** — Date formatters, currency formatters, and address string builders that are currently duplicated across applications
- **React hooks in the shared package** — `useSupabaseQuery` and `useSupabaseRealtime` hooks that implement standard data-fetching patterns, usable in all three applications
- **Schema validation** — Zod schemas co-located with TypeScript types for runtime validation as well as compile-time checking

---

## FAQ

**Q: What is GitHub Packages?**
A: GitHub Packages is a package registry integrated with GitHub. It supports npm, Docker, Maven, and other package formats. Scoped npm packages (like `@inhaby/shared`) can be published and installed with standard npm commands, authenticated via GitHub Personal Access Tokens.

**Q: Can @inhaby/shared be installed without a GitHub account?**
A: No. GitHub Packages requires authentication with a PAT (Personal Access Token) with `read:packages` scope even for public packages. This is a known limitation compared to the public npm registry.

**Q: Why not publish to the public npm registry instead?**
A: GitHub Packages is tightly integrated with the Inhaby GitHub organisation, making access control simpler. A public npm registry package would also require a unique global package name and has no authentication requirement, which may not be appropriate for a platform-internal SDK.

**Q: How does the Supabase client get different credentials in different environments?**
A: Each consuming application (inhaby-terent, owner-portal, admin-panel) has its own `.env` file with its own Supabase project credentials. The shared package reads from `import.meta.env` at build time, so each application's build produces a client configured for its own environment.

**Q: What happens when a type in @inhaby/shared changes?**
A: All consuming applications that import the changed type will get a TypeScript compile error until they update their usage to match the new type signature. This is intentional — it prevents silent mismatches across applications.

---

## Suggested Internal Links

- [About Inhaby](/about)
- [Founder Journal: Day 003](/blog/founder-journal/day-003-rebuilding-architecture)
- [Landing Page Integration Architecture](/blog/engineering/landing-page-integration)
- [Engineering Blog](/blog/engineering)

## Suggested External References

- [GitHub Packages documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)
- [Supabase JavaScript client](https://supabase.com/docs/reference/javascript/introduction)
- [TypeScript project references](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [npm scoped packages](https://docs.npmjs.com/cli/v10/using-npm/scope)

---

## Suggested Social Caption

> "Three React apps. One Supabase backend. One shared TypeScript package published to GitHub Packages. Here's how @inhaby keeps its type system consistent across every application in the platform — and why this architecture pays off immediately. 🧵 #TypeScript #React #GitHub #proptech"

---

## Related Articles

- **Previous:** [Who Is Genofogu?](/blog/founder-journal/about-genofogu)
- **Next:** [Merging a Landing Page Into a React App — The Right Way](/blog/engineering/landing-page-integration)
- **Suggested Reading:** [Founder Journal Day 003](/blog/founder-journal/day-003-rebuilding-architecture)

---

## JSON-LD Recommendations

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "How Inhaby Built a GitHub Shared Package to Unify Three React Applications",
  "description": "A practical walkthrough of @inhaby/shared — the scoped TypeScript package that powers the Inhaby platform's Supabase client, type system, and shared utilities across every application.",
  "author": {
    "@type": "Person",
    "name": "Genofogu",
    "url": "https://inhaby.com/founder/genofogu",
    "jobTitle": "Co-Founder"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Inhaby",
    "url": "https://inhaby.com"
  },
  "datePublished": "2026-07-03",
  "dateModified": "2026-07-03",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://inhaby.com/blog/engineering/github-packages-inhaby-shared"
  },
  "keywords": "GitHub Packages, TypeScript, monorepo, Supabase, shared package, React, npm",
  "articleSection": "Engineering"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is GitHub Packages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GitHub Packages is a package registry integrated with GitHub that supports npm, Docker, and other package formats. Scoped npm packages can be published and installed with standard npm commands, authenticated via GitHub Personal Access Tokens."
      }
    },
    {
      "@type": "Question",
      "name": "How does the Supabase client get different credentials in different environments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each consuming application has its own .env file with its own Supabase project credentials. The shared package reads from import.meta.env at build time, so each application's build produces a client configured for its own environment."
      }
    },
    {
      "@type": "Question",
      "name": "What happens when a type in @inhaby/shared changes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All consuming applications that import the changed type will get a TypeScript compile error until they update their usage to match the new type signature, preventing silent mismatches across applications."
      }
    }
  ]
}
```
