# Engineering Milestone: Building the Foundation That Will Scale Inhaby to Millions

When people think about startup progress, they usually imagine new features, beautiful UI updates, or exciting announcements. However, some of the most important milestones happen entirely behind the scenes.

Today's work wasn't about adding another page or another button. It was about redesigning Inhaby's entire software architecture so that the platform can continue growing without becoming impossible to maintain.

This engineering milestone represents one of the biggest structural improvements since the project began.

---

## The Challenge

Inhaby is no longer a single website.

It has evolved into multiple independent applications that work together as one ecosystem.

Current applications include:
- **Tenant Application** (inhaby.com)
- **Owner Portal** (owner.inhaby.com)
- **Internal Admin Panel** (admin.inhaby.com)

Although these applications look different, they all require many of the same components.

For example:
- Authentication logic
- Supabase database connection
- Storage services
- TypeScript interfaces
- Utility functions
- Common business logic
- Shared validation methods

Initially, every application referenced a common local folder called "shared".

While this approach works during early development, it creates several long-term problems.

Whenever a shared file changes:
- Every repository must be updated manually.
- Multiple versions of the same code appear.
- Bugs become inconsistent between applications.
- Developers accidentally overwrite each other's work.
- Future team collaboration becomes increasingly difficult.

As the platform grows, this architecture becomes expensive to maintain.

The solution was to redesign the shared code into an independent software package.

---

## Creating the Inhaby Shared SDK

Instead of treating the shared folder as just another directory, it was converted into its own standalone project.

The new package is called:

**@inhaby/shared**

Rather than copying code into multiple repositories, every application now installs this package as a dependency.

The package contains:

### Database Layer
A centralized Supabase client. Every application now communicates with the database through the same configuration, reducing inconsistencies and simplifying maintenance.

---

### Authentication Layer
All authentication helpers were moved into the package. Instead of three different implementations, every application now follows identical authentication behavior. Future improvements automatically benefit every platform.

---

### Storage Services
Image uploads, signed URLs, file management, and storage helpers now live in one place. When storage behavior changes, only the package needs to be updated.

---

### Shared Types
TypeScript models were centralized. This guarantees that Owner Portal, Tenant App, and Admin Panel all understand the same database structures:
- Property model
- User model
- Booking model
- Visit model
- Notification model

Type mismatches between applications are dramatically reduced.

---

### Utility Functions
Validation methods and reusable helper functions are now maintained once instead of being copied across projects.

---

## Building the Package

The shared module became a proper TypeScript package.
- A professional project structure was created.
- Source files moved into a dedicated `src` directory.
- Compiled JavaScript is generated inside a `dist` directory.
- Type definitions are generated automatically.

The package now exports only its public API through a single entry point. This makes the package easier to maintain while preventing applications from depending on internal implementation details.

---

## Publishing the Package

After building the package locally, the next goal was making it available through GitHub Packages.

This required significantly more work than expected. Several infrastructure problems appeared during publishing:
- Repository ownership changed after transferring the package repository to the official Inhaby GitHub account.
- Git remotes had to be updated.
- Authentication tokens had to be regenerated.
- Repository histories had to be merged.
- GitHub Package permissions rejected publishing requests multiple times.

Eventually, the package was successfully published. The result is an internal package registry that every Inhaby application can install directly.

---

## Why GitHub Packages?

Instead of copying folders between projects, every application now depends on a versioned package.

For example:
- **Tenant App** ──► @inhaby/shared
- **Owner Portal** ──► @inhaby/shared
- **Admin Panel** ──► @inhaby/shared

When improvements are made:
1. Update shared code.
2. Build the package.
3. Publish a new version.
4. Update applications.

No manual file copying. No duplicated code. No synchronization mistakes.

---

## Solving Authentication Problems

Today's work also included redesigning internal administrator authentication.

During testing, repeated HTTP 400 and HTTP 500 errors occurred. Investigation revealed that administrator accounts had been created incorrectly inside Supabase. Although database records existed, they were missing critical authentication information because they were inserted manually instead of using the official authentication API.

The administrator account was recreated correctly. Authentication now works as expected.

---

## Rethinking Internal Login

Another architectural decision was made regarding administrator access.

Instead of relying on personal email addresses for internal staff accounts, the future system will authenticate administrators using unique internal usernames and secure passwords. This approach provides greater flexibility while allowing email addresses to become profile information rather than login credentials.

---

## Debugging the Visit Booking Pipeline

One of today's largest debugging sessions focused on property viewing requests.

Seed properties worked correctly. Owner-created properties did not.

After tracing the execution pipeline, the issue became clear. The booking system still depended on hardcoded development data. Production properties loaded from Supabase could not be found inside the local mock dataset. The booking process silently stopped before sending requests to the database.

The property resolution system was redesigned to search dynamic production data first while keeping mock data only as a development fallback. This removed another dependency on temporary development data.

---

## Why These Changes Matter

None of today's improvements significantly changed what users see. Instead, they changed how engineers build the platform.

These improvements provide:
- Better maintainability
- Easier collaboration
- Safer deployments
- Faster feature development
- Consistent authentication
- Centralized business logic
- Reduced duplication
- Version-controlled shared code
- Production-ready architecture

Most importantly, these changes prepare Inhaby for future growth.

---

## The Road Ahead

With the architecture now significantly improved, future development becomes much faster.

Upcoming engineering priorities include:
- Live viewing request workflow
- Owner approval and rejection system
- Visit completion tracking
- Contact unlocking after successful visits
- Booking confirmation pipeline
- Real-time messaging
- Notification synchronization
- Production deployment across all platforms

Today's milestone was not about adding another feature. It was about building the infrastructure that every future feature will rely on.

Today, Inhaby's foundation became much stronger.
