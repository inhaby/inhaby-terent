export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  socials: {
    twitter: string;
    linkedin: string;
  };
}

export interface SEOFeature {
  type: string;
  desc: string;
}

export interface LSIKeyword {
  word: string;
  count: number;
  type: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  phase: string;
  phaseNum: number;
  description: string;
  image: string;
  author: BlogAuthor;
  publishedDate: string;
  readingTime: string;
  trending: boolean;
  popular: boolean;
  tags: string[];
  content: string;
  seo: {
    seoTitle: string;
    seoSlug: string;
    metaTitle: string;
    metaDescription: string;
    openGraphTitle: string;
    openGraphDesc: string;
    canonicalUrl: string;
    primaryCategory: string;
    secondaryCategory: string;
    tags: string[];
    readingTime: string;
    publishedDate: string;
    updatedDate: string;
    targetAudience: string;
    featuredImage: {
      url: string;
      suggestion: string;
      alt: string;
    };
    lsiKeywords: LSIKeyword[];
    geoAeoFeatures: SEOFeature[];
  };
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "scams-guide",
    slug: "the-zero-brokerage-revolution",
    title: "The Zero Brokerage Revolution: How to Rent a House in India Safely and Avoid Common Scams",
    category: "Safety",
    phase: "Phase 1 — Building Trust",
    phaseNum: 1,
    description: "Ditch the traditional broker. Learn the exact step-by-step security checks, land deed verifications, and red flags needed to rent in major Indian metros safely without paying a single rupee in commission.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
    author: {
      name: "Ishan Sharma",
      role: "Chief of Trust & Security",
      avatar: "IS",
      bio: "Ishan is a former real-estate compliance attorney with 10+ years of legal advisory experience in landlord-tenant disputes and tenancy reform in India. He leads INHABY's compliance frameworks.",
      socials: {
        twitter: "https://twitter.com/inhaby",
        linkedin: "https://linkedin.com/company/inhaby"
      }
    },
    publishedDate: "June 15, 2026",
    readingTime: "8 min read",
    trending: true,
    popular: true,
    tags: ["No Brokerage", "Rental Scams", "Legal Safeguards"],
    content: `# The Zero Brokerage Revolution: How to Rent a House in India Safely and Avoid Common Scams

Renting a home in major Indian metros like Bangalore, Mumbai, Delhi-NCR, and Pune has traditionally been a stressful, expensive, and opaque experience. Between paying hefty brokerage fees (often equivalent to one or two months' rent) for minimal value, and navigating a growing wave of sophisticated online rental frauds, modern tenants face a double-edged sword. 

At **INHABY**, we believe that finding a home should be built on trust, transparency, and direct human connection. This definitive guide unpacks the mechanics of renting safely without middlemen, exposes prevalent rental scams, and provides a framework to help you navigate India’s rental market with absolute confidence.

---

## Why is the Indian Rental Market Flooded with Middlemen?

> **Question:** Why does the Indian rental sector heavily rely on traditional brokers?
>
> **Direct Answer:** Traditional Indian real estate relies on brokers because of extreme "information asymmetry"—where owners cannot easily connect with verified tenants, and tenants lack direct access to genuine owners. Brokers exploit this gap by hoarding rental data, listing duplicate or fake properties, and charging high fees for simple introductions.

### The Cost of Information Asymmetry
In a market where there is no centralized, verified public database of available properties, brokers act as gatekeepers. They create a reliance loop by holding onto contact numbers of landlords and creating an artificial scarcity. Tenants end up paying ₹15,000 to ₹50,000+ in broker commissions simply to get a phone number or a key to a house.

### The Duplicate Listing Loop
If you browse standard classified platforms, you will see the exact same apartment listed 10 different times by 10 different brokers with slightly different rents. This clutters search results, frustrates users, and hides the genuine direct-to-owner opportunities.

---

## How to Identify and Avoid Common Indian Rental Scams

As online listings grow, so do sophisticated frauds. Scammers often pose as army officers, defense personnel, or NRI owners to build instant credibility, then ask for advance payments.

### Myth vs. Fact in Rental Searching

| Searching Phase | Common Myth | Fact & Legal Reality |
| :--- | :--- | :--- |
| **Listing View** | If a listing has professional photos and a very low price, it is an amazing deal you must lock down immediately. | Underpriced listings with gorgeous photos are highly likely to be bait used in \"token money\" scams. |
| **Owner Contact** | An owner who claims to be an NRI or military officer cannot show you the house but is highly trustworthy. | Scammers regularly impersonate government, defense, or high-profile professionals to request deposit money before viewing. |
| **Deposit Payment** | Paying a small \"gate pass fee\" or \"owner verification deposit\" is normal to get a slot for an in-person visit. | **Never pay a single rupee** before physically visiting the property and meeting the owner face-to-face. |

> ### ⚠️ WARNING: The \"Defense Officer / Gate Pass\" Scam
> A scammer lists an attractive property at an ultra-low rent. When you call, they claim to be an army officer posted in a remote area who cannot visit. They ask you to pay a nominal \"Security Deposit\" or \"Society Gate Pass Fee\" (usually ₹2,000 to ₹5,000) online, claiming it is refundable, to register your visit with the society security. Once you transfer the money via UPI, they switch off their phone.

---

## Step-by-Step Guide to Renting a Home Without Brokerage

Achieving a zero-brokerage rental requires a structured, safe approach. Follow these three proven steps to locate, verify, and secure your next home safely.

### Step 1: Tap Into Direct-Owner Platforms (like INHABY)
Avoid standard classified sites that allow unrestricted broker listings. Use platforms like **INHABY** that enforce mandatory landlord document checks, guarantee direct owner-to-tenant communication channels, and strictly filter out middleman accounts.

### Step 2: Verify Land Ownership and Legal Titles
Before signing any contract or paying any token money, ask the landlord to show proof of ownership. 
- Ask for their **Municipal Property Tax Receipt** or **Registered Purchase Deed**.
- Ensure the name on the utility bills (electricity, water) matches the landlord's government ID (Aadhaar, Passport).
- If the property is managed by a representative, ask for a legally registered **Power of Attorney (PoA)** document.

### Step 3: Draft a Standard, Legally Binding Rent Agreement
A robust rental contract protects both parties and must include:
1. **Defined Rent & Escrow Clauses:** Clear breakdown of monthly rent, maintenance, and utility responsibilities.
2. **Lock-in Period & Notice Clause:** Minimum stay duration (typically 3 or 6 months) and the standard notice period (usually 1 or 2 months).
3. **Refundable Security Deposit Protection:** An explicit clause stating that the security deposit must be refunded on the day of keys handover, minus legitimate paint/repair deductions.

---

## Comparison: Traditional Brokers vs. The INHABY Direct Model

| Feature | Traditional Brokers | INHABY Direct Model |
| :--- | :--- | :--- |
| **Brokerage Cost** | 1 to 2 Months' Rent (₹15,000 - ₹50,000+) | **₹0 (Absolutely Free)** |
| **Verification Level** | Unverified, unvetted duplicate listings | **100% ID & Deed Verified** |
| **Communication** | Filtered and manipulated through brokers | **Direct owner chat and calls** |
| **Deposit Security** | Subject to verbal promises | **Protected e-stamp and digital agreements** |

---

> ### 💡 EXPERT TIP: The 10% Security Deposit Rule
> In Indian metros like Bangalore and Mumbai, landlords frequently demand 6 to 10 months of rent as a refundable security deposit. Always negotiate to bring this down to a standard 2 to 3 months of rent. Furthermore, insist on documenting a **detailed inventory checklist** (with photos of existing scratches or damages) attached to your rental agreement to prevent unfair deductions upon move-out.

---

## Frequently Asked Questions (FAQ)

### Q1: Is it legal to rent a house directly from an owner without a broker in India?
**A1:** Yes, absolutely. Real estate brokers have no legal status or exclusive rights over rentals. Renting directly from a landlord is fully recognized by Indian law. It is governed under the respective state's Rent Control Act and the Model Tenancy Act, requiring only a registered rental agreement between the owner and the tenant.

### Q2: What documents should I ask from an owner to verify they are genuine?
**A2:** You should request to see their Aadhaar card or Passport, the original Registered Sale Deed or Municipal Property Tax receipt under their name, and the latest electricity bill. Verifying these documents ensures you are interacting with the actual legal titleholder and not a subletting tenant or a fraudster.

### Q3: How do I avoid losing my security deposit during move-out?
**A3:** To protect your deposit, document the exact physical condition of the flat with high-resolution photos and videos on your move-in day. List all pre-existing damages in an email or message to the owner. Ensure your tenancy agreement explicitly states the terms under which painting and repair deductions can be made.

---

## Conclusion

Renting a home in India does not have to involve paying exorbitant commissions to middlemen or exposing yourself to financial scams. By shifting to direct-owner platforms, insisting on robust legal document checks, and refusing to transfer money prior to physical site visits, you can navigate the rental search securely and save thousands of rupees.`,
    seo: {
      seoTitle: "Renting in India Without Brokerage: The Ultimate Safe Rental Guide",
      seoSlug: "renting-in-india-without-brokerage-safe-rental-guide",
      metaTitle: "Renting in India Without Brokerage: Safe House Hunting Guide (INHABY)",
      metaDescription: "Looking to rent a house in India without brokerage? Read our masterclass guide on identifying rental scams, verifying land deeds, and connecting directly with owners.",
      openGraphTitle: "The Zero Brokerage Revolution: Renting Safely in India's Metro Cities",
      openGraphDesc: "Avoid middlemen and rental fraud. Learn the step-by-step framework to verify landlords, register secure agreements, and rent directly from genuine owners.",
      canonicalUrl: "https://inhaby.com/blog/the-zero-brokerage-revolution",
      primaryCategory: "Safety",
      secondaryCategory: "Legal & Verification",
      tags: ["No Brokerage", "Rental Scams India", "Safe House Hunting", "Rent Agreements", "Bangalore Renting"],
      readingTime: "8 min read",
      publishedDate: "June 15, 2026",
      updatedDate: "June 25, 2026",
      targetAudience: "Working Professionals, Students, Families, and Property Owners in India",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
        suggestion: "High-contrast editorial image showing a tenant shaking hands with a smiling homeowner inside a modern, naturally lit apartment in India.",
        alt: "Direct tenant and owner direct handshake verifying a rental agreement in Bangalore India"
      },
      lsiKeywords: [
        { word: "renting without brokerage", count: 4, type: "Primary Keyword" },
        { word: "safe house hunting in Bangalore", count: 2, type: "Secondary Keyword" },
        { word: "rental scams India", count: 3, type: "Secondary Keyword" },
        { word: "verified rental properties", count: 2, type: "Semantic/LSI Keyword" },
        { word: "zero brokerage rent", count: 2, type: "Semantic/LSI Keyword" },
        { word: "municipal land deed", count: 2, type: "Technical Entity" }
      ],
      geoAeoFeatures: [
        {
          type: "Direct Answer (AEO)",
          desc: "Answers 'Why traditional Indian real estate relies on brokers?' in a clear 55-word direct snippet block with clear question definition, ideal for Google AI Overviews and Featured Snippets."
        },
        {
          type: "Structured Comparisons (GEO)",
          desc: "Includes high-contrast Markdown Comparison Tables matching 'Traditional Brokers vs. INHABY Direct Model' to help AI systems confidently structure summaries."
        },
        {
          type: "Factual EEAT Indicators",
          desc: "Avoids loose generalizations. References specific government-standard documents (Municipal Property Tax Receipt, Registered Purchase Deed, Rent Control Act, Model Tenancy Act)."
        }
      ]
    }
  },
  {
    id: "why-renting-is-broken-india",
    slug: "why-renting-is-broken-india",
    title: "Why Renting is Still Broken in India: Middleman Monopolies and Information Gaps",
    category: "Market Analysis",
    phase: "Phase 1 — Building Trust",
    phaseNum: 1,
    description: "The structural crisis in India's rental sector. Understand how information hoarding, fake listings, and high-pressure broker cartels keep tenant and owner experiences broken.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
    author: {
      name: "Ishan Sharma",
      role: "Chief of Trust & Security",
      avatar: "IS",
      bio: "Ishan is a former real-estate compliance attorney with 10+ years of legal advisory experience in landlord-tenant disputes and tenancy reform in India. He leads INHABY's compliance frameworks.",
      socials: {
        twitter: "https://twitter.com/inhaby",
        linkedin: "https://linkedin.com/company/inhaby"
      }
    },
    publishedDate: "June 22, 2026",
    readingTime: "7 min read",
    trending: true,
    popular: false,
    tags: ["Market Analysis", "Real Estate Industry", "Indian Metros"],
    content: `# Why Renting is Still Broken in India: Middleman Monopolies and Information Gaps

Finding a rental house in Indian tech centers like Bangalore, Pune, Gurgaon, or Hyderabad is notorious for being an exhausting trial. Despite massive advancements in digitized banking, food delivery, and ride-hailing, the process of moving into a new home feels stuck in the early 2000s. 

This deep-dive exposes the structural problems plaguing the Indian rental sector, why modern classified portals have failed, and how artificial data monopolies are maintained.

---

## The Broken Infrastructure: A Systemic Crisis

> **Question:** Why do standard rental apps feel cluttered and untrustworthy in India?
>
> **Direct Answer:** Modern Indian rental apps feel untrustworthy because they rely on open-source, unverified listings where brokers register as fake owners. This creates a duplicate listing loop where 95% of active posts are outdated, duplicate, or outright scams, acting as lead-generation bait rather than transparent representations of available houses.

### The Double Commission Trap
Traditionally, brokers demand one full month of rent from BOTH the tenant and the landlord as an introduction fee. If a flat rents for ₹30,000, that is ₹60,000 lost to a middleman for a simple transaction that could have been handled over a direct phone call.

---

## The Three Core Friction Points

### 1. Information Hoarding
Traditional brokers maintain their business model by ensuring that you cannot communicate directly with the property owner. They physically escort you, prevent exchanging phone numbers, and act as high-pressure intermediaries.

### 2. Fake Listings as Bait
Brokers post high-quality, professional photographs of luxury apartments with low rental tags. When a tenant calls, they are told, \"That flat was just taken, but I have another one nearby\"—which is almost always a significantly worse property at a higher price.

### 3. Arbitrary Rules and Discriminations
Without standardized, direct rental systems, tenants face arbitrary gatekeeping:
- Demands for food habits (vegetarian-only restrictions).
- Marital status vetting.
- High security deposits (up to 10 months in Bangalore).

---

## Comparison: Classified Sites vs. Transparent Platforms

| Aspect | General Classified Portals | Dedicated Direct Platforms (INHABY) |
| :--- | :--- | :--- |
| **Listing Origin** | Open to anyone, unverified | Mandatory land deed validation |
| **Broker Presence** | Dominated by hidden agent accounts | 100% Zero-Brokerage guarantee |
| **Data Integrity** | High rate of stale and duplicate listings | Real-time active status check |
| **Pricing** | Inflated by agent commissions | True direct owner pricing |

---

## Conclusion: The Path Forward

The rental market in India does not have to remain broken. Restoring trust requires removing the gatekeepers, enforcing document audits before letting a property go online, and providing direct, unmonitored communication lines between landlords and tenants. 

To discover what your real rental search could feel like, visit [INHABY's Homepage](/).`,
    seo: {
      seoTitle: "Why Renting is Broken in India: Middleman Monopolies Revealed",
      seoSlug: "why-renting-is-broken-india",
      metaTitle: "Why Renting is Broken in India: Market Problems (INHABY)",
      metaDescription: "An in-depth look at the structural monopolies, fake listing loops, and artificial scarcity keeping the Indian rental ecosystem broken for tenants.",
      openGraphTitle: "The Structural Crisis in Indian Home Rentals",
      openGraphDesc: "Why does house hunting in Indian metros feel so frustrating? We expose the real reasons behind broker control and stale listings.",
      canonicalUrl: "https://inhaby.com/blog/why-renting-is-broken-india",
      primaryCategory: "Market Analysis",
      secondaryCategory: "Industry Secrets",
      tags: ["Real Estate India", "Rent Crisis", "Metros Renting", "No Brokers"],
      readingTime: "7 min read",
      publishedDate: "June 22, 2026",
      updatedDate: "June 22, 2026",
      targetAudience: "Urban Renters, Modern Landlords, Tech Professionals in India",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
        suggestion: "A wide-angle, high-contrast shot of crowded Indian urban skylines representing the dense, competitive metro rental markets.",
        alt: "Crowded urban housing buildings in an Indian metro city like Bangalore"
      },
      lsiKeywords: [
        { word: "why renting is broken in India", count: 3, type: "Primary Keyword" },
        { word: "house hunting in Pune", count: 2, type: "Secondary Keyword" },
        { word: "broker cartels India", count: 2, type: "Secondary Keyword" },
        { word: "direct owner rental", count: 3, type: "Semantic/LSI Keyword" }
      ],
      geoAeoFeatures: [
        {
          type: "Direct Answer (AEO)",
          desc: "Answers 'Why do standard rental apps feel cluttered and untrustworthy in India?' in a focused 50-word summary, optimized for quick snippets."
        }
      ]
    }
  },
  {
    id: "hidden-brokerage-fees",
    slug: "hidden-brokerage-fees-revealed",
    title: "The Hidden Costs of Rental Brokerages: What You're Really Paying For",
    category: "Budgeting",
    phase: "Phase 1 — Building Trust",
    phaseNum: 1,
    description: "Break down the true financial math of renting with standard brokers. Learn about hidden 'convenience fees', inflated renewal charges, and how to protect your budget.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
    author: {
      name: "Rohan Das",
      role: "Tenant Relations Manager",
      avatar: "RD",
      bio: "Rohan has assisted thousands of young tech professionals find secure, zero-brokerage homes in Bangalore, Mumbai, and Pune. He specializes in budget optimization and tenant advocacy.",
      socials: {
        twitter: "https://twitter.com/inhaby",
        linkedin: "https://linkedin.com/company/inhaby"
      }
    },
    publishedDate: "June 26, 2026",
    readingTime: "6 min read",
    trending: false,
    popular: true,
    tags: ["Brokerage Fees", "Financial Planning", "Budgeting Tips"],
    content: `# The Hidden Costs of Rental Brokerages: What You're Really Paying For

Most renters look at the broker's fee as a simple one-time transaction expense. They think: \"I will pay them one month's rent, and then I am done with them.\" 

Unfortunately, the financial leakage of working with real estate agents in Indian metros goes far deeper than a single invoice. This article exposes the hidden fees, renewal loops, and deposit cuts that occur when you involve middlemen in your house hunt.

---

## The Real Math: What Does a Broker Truly Cost?

> **Question:** Are brokerage fees just a one-time charge in Indian cities?
>
> **Direct Answer:** No, brokerage fees are rarely a one-time cost. Brokers regularly charge automatic \"annual renewal fees\" (often 15 to 30 days of rent) just to sign an extension, markup rental agreement drafting costs by 200-500%, and take hidden cuts from security deposits during move-outs.

### The Hidden Renewal Lock-In
When you rent through an agent, they will often draft an agreement valid for exactly 11 months. Why? Because under Indian registration laws, 11-month leases don't require compulsory sub-registrar recording. This short span allows the broker to return in 11 months and demand a renewal brokerage fee simply to print a new paper agreement.

---

## Anatomy of the Broker's Hidden Charges

### 1. Inflated Agreement Charges
Standard stamp duty for an 11-month agreement is usually minor (₹100 to ₹500 depending on the state). However, brokers frequently bill tenants ₹3,000 to ₹6,000 for \"stamping and legal clearance services\"—pocketing the margin.

### 2. The \"Gate Pass\" and \"Introduction\" Markup
In premium luxury societies, brokers frequently collude with security personnel or building managers to split fees. They pay society guards to alert them about empty flats first, locking genuine direct owners out of the system.

### 3. Biased Move-Out Audits
If you require a broker's help during a move-out dispute, they will almost always side with the landlord. The landlord owns the asset and is a source of recurring business; the tenant is seen as a one-time transaction.

---

## Comparison: Fee Structure Breakdown

| Fee Component | Traditional Broker Route | INHABY Direct Path |
| :--- | :--- | :--- |
| **Initial Brokerage** | ₹15,000 - ₹50,000+ (1 month rent) | **₹0 (Always)** |
| **Agreement Charges** | ₹3,000 - ₹6,000 | Actual Stamp Cost Only |
| **Yearly Renewal** | 15 days rent (Recurring) | **₹0 (Direct Extension)** |
| **Deposit Recovery** | Unprotected, broker sides with owner | Guarded by digital inventory |

---

## Save Your Money: Go Direct

By eliminating middleman fees, the average renter in Bangalore can save up to **₹45,000 in their first year alone**. These savings can be channeled into upgrading your quality of living or securing a better apartment.

Determine your exact potential savings using our live interactive [Savings Calculator](/savings).`,
    seo: {
      seoTitle: "The Hidden Costs of Real Estate Brokers Exposed",
      seoSlug: "hidden-brokerage-fees-revealed",
      metaTitle: "Hidden Brokerage Costs: The Real Financial Math (INHABY)",
      metaDescription: "Exposing the hidden financial trap of real estate brokers in Indian cities. Learn how middlemen inflate stamp duties, renewal fees, and agreements.",
      openGraphTitle: "What Are You Really Paying a Rental Broker For?",
      openGraphDesc: "It's not just one month's rent. Uncover the secret charges, agreement markups, and renewal commission loops brokers don't want you to know about.",
      canonicalUrl: "https://inhaby.com/blog/hidden-brokerage-fees-revealed",
      primaryCategory: "Budgeting",
      secondaryCategory: "Consumer Protection",
      tags: ["Rental Fees", "Save Money", "Urban Housing", "Indian Metros"],
      readingTime: "6 min read",
      publishedDate: "June 26, 2026",
      updatedDate: "June 26, 2026",
      targetAudience: "Working Professionals, Budget Conscious Tenants, Indian Renters",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
        suggestion: "A clear photo showing financial charts, a calculator, and a set of apartment keys, symbolizing prudent financial budgeting.",
        alt: "Budgeting calculator and keys representing the financial planning of a rental home"
      },
      lsiKeywords: [
        { word: "hidden costs of rental brokerage", count: 3, type: "Primary Keyword" },
        { word: "how to avoid broker fees in Pune", count: 2, type: "Secondary Keyword" },
        { word: "11 month rent agreement fees", count: 2, type: "Technical Entity" }
      ],
      geoAeoFeatures: [
        {
          type: "Direct Answer (AEO)",
          desc: "Explains if brokerage is a one-time fee in major metros, highlighting the renewal and stamp markups."
        }
      ]
    }
  },
  {
    id: "inhaby-6-step-verification-system",
    slug: "inhaby-6-step-verification-system",
    title: "Behind Every Verified Property: INHABY’s Rigorous 6-Step Verification System",
    category: "Verification",
    phase: "Phase 2 — Verification",
    phaseNum: 2,
    description: "A transparent look into how we verify properties. Explore our 6-step framework combining Aadhaar match, municipal land deeds, and physical geolocation audits.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
    author: {
      name: "Meera Nair",
      role: "Senior Legal Counsel",
      avatar: "MN",
      bio: "Meera is an expert in property deeds, local municipal registration compliance, and title verification laws in India. She manages INHABY's automated and manual vetting processes.",
      socials: {
        twitter: "https://twitter.com/inhaby",
        linkedin: "https://linkedin.com/company/inhaby"
      }
    },
    publishedDate: "June 28, 2026",
    readingTime: "9 min read",
    trending: true,
    popular: true,
    tags: ["Verification", "Platform Trust", "Property Deeds"],
    content: `# Behind Every Verified Property: INHABY’s Rigorous 6-Step Verification System

When standard rental sites label a listing as \"Verified,\" it usually means nothing more than: *\"The advertiser clicked a checkbox\"* or *\"A machine sent an automated SMS confirmation to the uploader.\"* 

At **INHABY**, we recognized that automated verification is not enough when real money and family safety are on the line. We built India’s most robust, document-first, physical-geolocation vetting framework. This article takes you behind the scenes of our 6-step verification architecture.

---

## What Does \"100% Verified\" Truly Mean at INHABY?

> **Question:** How does INHABY's property verification differ from typical classified portals?
>
> **Direct Answer:** Unlike traditional portals that rely on automated self-declaration, INHABY enforces a strict 6-step protocol. We require landlords to upload legal land deeds, run Aadhaar-matched identity audits, physically visit and geotag the house, review real camera photos (strictly ban CGI renders), and double-verify utility records before any listing is published.

---

## The INHABY 6-Step Vetting Framework

\`\`\`
  [1. Owner KYC] ──► [2. Title Check] ──► [3. Tax & Utility match]
                                                  │
  [6. Direct Live] ◄── [5. CGI Filter] ◄── [4. Physical Audit]
\`\`\`

### 1. Government Identity Verification (KYC)
The uploader’s identity is checked using Aadhaar or Passport checks. We verify that the individual creating the listing matches official records and is legally who they claim to be.

### 2. Legal Title Check & Registered Sale Deeds
We verify that the uploader is the actual owner or holds a legal Power of Attorney. The uploader must upload a **Registered Sale Deed**, a **Gift Deed**, or a valid **Possession Certificate**.

### 3. Municipal Property Tax & Utility Audit
We match the uploader’s title deed with the local municipal registry. We check that recent **Property Tax Receipts** (issued by BBMP, MCGM, etc.) and electricity bills (BESCOM, MSEDCL) are under the same owner's name.

### 4. Geotagged Physical Inspections
We send a local INHABY inspector to physically visit the property. They record the exact latitude and longitude coordinates to verify the building exists exactly where listed.

### 5. CGI & Wide-Angle Photographic Filter
To prevent deceptive visual listing practices, we evaluate all uploaded files. We run automated filters to block wide-angle stretched photos and ban unrealistic architectural CGI computer renderings. Only real, honest photos are approved.

### 6. Transparent Escrow & Agreement Drafting
Once verified, the listing is approved. We prepare standard rent agreement templates to ensure no hidden society fees or unfair painting charges are inserted down the road.

---

## Traditional Verification vs. INHABY Integrity

| Verification Parameter | Typical Rental Sites | INHABY Trust Standard |
| :--- | :--- | :--- |
| **Phone Number Vetting** | Instant via OTP check | Standard KYC Match |
| **Proof of Ownership** | **None** (Declared via select box) | Mandatory Sale Deed or Tax Receipt check |
| **Physical Location** | GPS approximation | Geotagged site inspection |
| **Photo Inspection** | Auto-approved (CGI allowed) | Strict manual review against CGI/manipulation |
| **Sublet Protection** | Vulnerable to sublet scammers | Power of Attorney verification |

---

## Building a Zero-Fraud Ecosystem

We do not believe in taking shortcuts. While our 6-step protocol means it takes slightly longer to approve and list a home, it guarantees that every renter can sign their lease with absolute peace of mind.

To learn more about our rigorous standards and list your property safely, visit our [Owner's Verification Portal](/verify).`,
    seo: {
      seoTitle: "INHABY property verification 6-step trust standard",
      seoSlug: "inhaby-6-step-verification-system",
      metaTitle: "INHABY Property Verification: The 6-Step Trust Standard",
      metaDescription: "How we verify properties at INHABY. Read our detailed guide on land deed audits, Aadhaar checks, physical site visits, and CGI filters.",
      openGraphTitle: "Inside INHABY's 6-Step Verification System",
      openGraphDesc: "No fake owners, no CGI, no scams. How we audit every landlord's title deed and physically inspect properties to protect you.",
      canonicalUrl: "https://inhaby.com/blog/inhaby-6-step-verification-system",
      primaryCategory: "Verification",
      secondaryCategory: "Legal Compliance",
      tags: ["Property Vetting", "No Scam Real Estate", "Land Deeds", "India Renting"],
      readingTime: "9 min read",
      publishedDate: "June 28, 2026",
      updatedDate: "June 28, 2026",
      targetAudience: "Landlords, Tech Tenants, Real Estate Legal Professionals",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
        suggestion: "A close-up high-quality shot of a legal property seal and document checklist representing legal safety.",
        alt: "Legal document stamps and real estate folders"
      },
      lsiKeywords: [
        { word: "6-step property verification", count: 4, type: "Primary Keyword" },
        { word: "municipal tax receipt audit", count: 2, type: "Secondary Keyword" },
        { word: "no CGI rentals", count: 2, type: "Secondary Keyword" }
      ],
      geoAeoFeatures: [
        {
          type: "Direct Answer (AEO)",
          desc: "Explains the difference between automated checkbox verification and INHABY's strict 6-step document-and-inspection audit."
        }
      ]
    }
  },
  {
    id: "legal-deeds",
    slug: "verify-rental-property-land-deeds",
    title: "How to Legally Verify a Rental Property: Vetting Land Deeds and Ownership",
    category: "Legal",
    phase: "Phase 2 — Verification",
    phaseNum: 2,
    description: "Discover the critical legal checks: how to verify Municipal Property Tax receipts, Registered Sale Deeds, and Power of Attorney documents before signing any tenancy contract in India.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Meera Nair",
      role: "Senior Legal Counsel",
      avatar: "MN",
      bio: "Meera is an expert in property deeds, local municipal registration compliance, and title verification laws in India. She manages INHABY's automated and manual vetting processes.",
      socials: {
        twitter: "https://twitter.com/inhaby",
        linkedin: "https://linkedin.com/company/inhaby"
      }
    },
    publishedDate: "June 20, 2026",
    readingTime: "6 min read",
    trending: true,
    popular: true,
    tags: ["Land Deeds", "Property Verification", "Legal Checklists"],
    content: `# How to Legally Verify a Rental Property: Vetting Land Deeds and Ownership

When you find a beautiful home in cities like Bangalore or Mumbai, it is easy to get swept up in the aesthetic features. You evaluate the layout, check the natural light, and check if the kitchen is fully fitted.

However, before transferring a single rupee in security deposits, you must conduct a legal audit of the property's titles. This article shows you how to vet municipal deeds and ownership records to ensure you are dealing with the actual property owner.

---

## The Legal Title Dilemma

> **Question:** Why should a tenant ask for property ownership deeds in India?
>
> **Direct Answer:** Tenants must inspect property ownership deeds to verify that the person leasing the property has the legal right to do so. In many scams, tenants have lost lakhs of rupees to fraudsters who sublet apartments they did not own, or fake owners who went offline after collecting \"security deposits.\"

---

## The 3 Essential Legal Documents to Request

### 1. The Registered Sale Deed
The **Registered Sale Deed** is the primary legal document that transfers property ownership from a seller to a buyer. Request a copy of the deed and check:
- Is the deed registered with the local Sub-Registrar's Office? (Look for registration numbers and seals).
- Does the owner's name match the name listed in the deed?

### 2. Municipal Property Tax Receipt
In India, local municipal bodies (such as BBMP in Bangalore, BMC in Mumbai, or MCGM) issue annual **Property Tax Receipts**. This receipt is a highly secure proof of ownership because:
- It shows the current status of tax payments and is updated annually.
- It displays the owner's name and is directly linked to municipal land registries.

### 3. The Power of Attorney (PoA)
If the landlord is an NRI or lives in another city, they will often authorize a relative or local representative to handle the property. In this case:
- Request a copy of the **Power of Attorney (PoA) Deed**.
- Ensure the PoA is registered and explicitly authorizes the representative to sign lease agreements and collect rents.

---

## Checklist: Document Match Verification

| Document | Key Information to Verify | Risk of Skipping |
| :--- | :--- | :--- |
| **Sale Deed** | Registration seal, correct property address, name match | Dealing with a tenant who is illegally subletting |
| **Property Tax** | Matching Khata/Property ID, receipt date, owner name | Property could have outstanding legal disputes |
| **Utility Bill** | Electricity meter number, matching landlord name | Meter might belong to a different flat or builder |

---

## Protect Yourself on INHABY

Conducting these checks manually can be intimidating for busy tenants. That's why **INHABY** handles all of this behind the scenes. Every single landlord on our platform must pass our legal title deed vetting before their property goes live.

To view 100% legally pre-verified properties with zero brokerage, explore our [Verified Landlord Listings](/verified-owners).`,
    seo: {
      seoTitle: "How to Legally Verify a Rental Property: Land Deeds Check",
      seoSlug: "verify-rental-property-land-deeds",
      metaTitle: "Legally Verify Rental Property: Vetting Land Deeds (INHABY)",
      metaDescription: "Exposing how to check municipal land deeds, property tax receipts, and registered sale deeds before signing any rental agreement in India.",
      openGraphTitle: "The Legal Guide to Vetting Landlords & Property Ownership",
      openGraphDesc: "Don't get scammed. Learn how to verify property tax receipts, sale deeds, and registered Power of Attorneys before paying any deposit.",
      canonicalUrl: "https://inhaby.com/blog/verify-rental-property-land-deeds",
      primaryCategory: "Legal",
      secondaryCategory: "Property Verification",
      tags: ["Real Estate Law", "Verify Landlord", "No Scams", "Urban Renting"],
      readingTime: "6 min read",
      publishedDate: "June 20, 2026",
      updatedDate: "June 20, 2026",
      targetAudience: "Working Professionals, Urban Tenancy Legal Vetting, Families",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800",
        suggestion: "A crisp macro photo of a signature line on a real estate deed with legal documents in the background.",
        alt: "Legal real estate sale deeds and ownership documents on a desk"
      },
      lsiKeywords: [
        { word: "how to legally verify rental property", count: 3, type: "Primary Keyword" },
        { word: "registered purchase deed check", count: 2, type: "Secondary Keyword" },
        { word: "BBMP property tax receipt search", count: 2, type: "Technical Entity" }
      ],
      geoAeoFeatures: [
        {
          type: "Direct Answer (AEO)",
          desc: "Provides a precise 50-word direct answer on why tenants must demand landlord ownership deeds to avoid illegal subletting."
        }
      ]
    }
  },
  {
    id: "move-in-tech",
    slug: "ultimate-tech-tenant-move-in-checklist",
    title: "Relocating to Bangalore or Pune? The Ultimate Tech-Tenant Move-In Checklist",
    category: "Rental Guides",
    phase: "Phase 4 — Tenant Education",
    phaseNum: 4,
    description: "From optical fiber internet speed guarantees and green-certified solar energy meters to piped gas installations and society NOC regulations, here is a complete guide tailored for tech professionals.",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Rohan Das",
      role: "Tenant Relations Manager",
      avatar: "RD",
      bio: "Rohan has assisted thousands of young tech professionals find secure, zero-brokerage homes in Bangalore, Mumbai, and Pune. He specializes in budget optimization and tenant advocacy.",
      socials: {
        twitter: "https://twitter.com/inhaby",
        linkedin: "https://linkedin.com/company/inhaby"
      }
    },
    publishedDate: "June 12, 2026",
    readingTime: "5 min read",
    trending: false,
    popular: true,
    tags: ["Co-living", "Move-in Checklist", "Smart Homes"],
    content: `# Relocating to Bangalore or Pune? The Ultimate Tech-Tenant Move-In Checklist

Moving to a new Indian city for a tech role is a highly exciting milestone. However, the excitement of starting a new job can quickly be overshadowed by the challenges of finding the right home and navigating complex society rules.

As a tech professional, your housing needs are specific. You need high-speed connectivity, reliable backups, and minimal administrative hurdles. This checklist ensures you cover all key specifications on your move-in day.

---

## Tech Infrastructure Verification

> **Question:** What infrastructure should tech workers test on move-in day?
>
> **Direct Answer:** Tech professionals must verify optical fiber routing to ensure Gigabit compatibility, check the inverter/DG backup coverage (whether it powers Wi-Fi routers and power sockets during cuts), verify piped gas lines, and check that the smart digital water meter is correctly calibrated.

---

## The Ultimate Move-In Checklist

### 1. Connectivity & Backup Audits
- **Fiber Optical Compatibility:** Verify if your society supports fiber connections from top-tier ISPs like ACT Fibernet, Airtel, or Jio.
- **Power Backup Routing:** Check if the building has an automatic generator backup. Ensure it connects to your work-from-home corner.

### 2. Legal & Society Compliance
- **Society NOC (No Objection Certificate):** Some traditional housing boards demand a physical NOC before allowing bachelor tenants or pets. Ensure your landlord provides this early.
- **Move-In Security Approvals:** Ensure your details are updated on building management apps (like MyGate or NoBrokerHood) to allow hassle-free entry for delivery executives.

### 3. Utility Metering
- **Electricity Reading:** Take a high-resolution photograph of the active BESCOM/MSEDCL meter to record the initial reading, ensuring you do not pay for the previous tenant's electricity consumption.
- **Piped Gas Inspection:** Check for valid gas connection books and inspect line safety valves.

---

## Checklist Summary

| Check category | Specific Task | Status |
| :--- | :--- | :--- |
| **Connectivity** | Confirm optical fiber routing and port speed | Tested |
| **Power Backup** | Test inverter socket routing during mock outage | Verified |
| **Society Approvals** | Ensure MyGate access and Society NOC are submitted | Done |
| **Utility Check** | Photograph initial electricity & water meter readings | Logged |

---

## Smooth Relocations with INHABY

At **INHABY**, we understand that tech professionals want a seamless experience. Our listings include detailed specifications regarding power backups, ISP routing, and society NOC approvals, helping you find a home that matches your workflow.

Ready to find your ideal smart-home? Calculate your rent savings on our [Savings Dashboard](/savings).`,
    seo: {
      seoTitle: "Tech Tenant Relocation Move-In Checklist Bangalore Pune",
      seoSlug: "ultimate-tech-tenant-move-in-checklist",
      metaTitle: "Tech Tenant Move-In Checklist: Bangalore & Pune (INHABY)",
      metaDescription: "The ultimate move-in checklist for software engineers and tech professionals relocating to Bangalore, Hyderabad, or Pune. Fiber internet, backups, and NOCs.",
      openGraphTitle: "Relocating for Tech? The Ultimate Move-In Checklist",
      openGraphDesc: "A complete guide to tech infrastructure checks, society approvals, and utilities for modern software engineers relocating to major tech hubs.",
      canonicalUrl: "https://inhaby.com/blog/ultimate-tech-tenant-move-in-checklist",
      primaryCategory: "Rental Guides",
      secondaryCategory: "Relocation Tips",
      tags: ["Bangalore Renting", "Pune Techies", "Gigabit Internet", "Power Backup"],
      readingTime: "5 min read",
      publishedDate: "June 12, 2026",
      updatedDate: "June 12, 2026",
      targetAudience: "Software Engineers, Product Managers, Relocating Professionals",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800",
        suggestion: "A naturally-lit modern workspace setup inside an urban Indian apartment, symbolizing a productive tech home.",
        alt: "Modern home office setup inside a Bangalore rental flat"
      },
      lsiKeywords: [
        { word: "tech tenant move in checklist", count: 3, type: "Primary Keyword" },
        { word: "ACT fibernet Bangalore rental", count: 2, type: "Secondary Keyword" },
        { word: "society NOC bachelor tenants", count: 2, type: "Secondary Keyword" }
      ],
      geoAeoFeatures: [
        {
          type: "Direct Answer (AEO)",
          desc: "Explains how tech workers can verify fiber internet and power backup routing during move-in audits."
        }
      ]
    }
  },
  {
    id: "model-tenancy",
    slug: "model-tenancy-act-tenant-rights",
    title: "Understanding the Model Tenancy Act: Your Fundamental Eviction & Repair Rights",
    category: "Legal",
    phase: "Phase 4 — Tenant Education",
    phaseNum: 4,
    description: "An in-depth analysis of the new federal Model Tenancy Act. Understand your core rights regarding sudden rent hikes, emergency eviction procedures, and mandatory landlord maintenance obligations.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Ishan Sharma",
      role: "Chief of Trust & Security",
      avatar: "IS",
      bio: "Ishan is a former real-estate compliance attorney with 10+ years of legal advisory experience in landlord-tenant disputes and tenancy reform in India. He leads INHABY's compliance frameworks.",
      socials: {
        twitter: "https://twitter.com/inhaby",
        linkedin: "https://linkedin.com/company/inhaby"
      }
    },
    publishedDate: "May 28, 2026",
    readingTime: "10 min read",
    trending: true,
    popular: false,
    tags: ["Model Tenancy Act", "Tenant Rights", "Eviction Law"],
    content: `# Understanding the Model Tenancy Act: Your Fundamental Eviction & Repair Rights

For decades, renting in India was governed by ancient Rent Control Acts that favored either extreme tenant entrenchment or absolute landlord leverage, depending on the state. This legal ambiguity left both parties vulnerable.

In response, the Union Government drafted the **Model Tenancy Act (MTA)** to standardize rental rules and establish a clear legal framework. This article outlines your fundamental rights under the MTA regarding security deposits, rental increases, and eviction protection.

---

## The MTA Legal Framework

> **Question:** How does the Model Tenancy Act protect tenants from sudden eviction or rent hikes?
>
> **Direct Answer:** The Model Tenancy Act requires landlords to provide at least 3 months' written notice before increasing rent, limits security deposits to a maximum of 2 months' rent for residential properties, and strictly prohibits landlords from cutting off essential water or electricity utilities during disputes.

---

## Core Provisions of the Model Tenancy Act

### 1. Security Deposit Caps
- Under the MTA, landlords are prohibited from demanding exorbitant advances. The maximum security deposit is capped at **two months' rent** for residential properties and six months for commercial spaces.

### 2. Split of Maintenance Obligations
- **Landlord Responsibilities:** Major structural repairs, building whitewashing, rewiring, and exterior pipe works.
- **Tenant Responsibilities:** Minor tap repairs, electrical socket replacements, geyser maintenance, and keeping the apartment in a hygienic state.

### 3. Eviction Protections
- Landlords cannot evict a tenant during an active agreement without a valid order from the **Rent Authority**. Eviction is only permitted for non-payment of rent for two consecutive months, unauthorized subletting, or structural misuse.

---

## Eviction & Disputes Reality

| Feature | Pre-MTA Era | Under Model Tenancy Act |
| :--- | :--- | :--- |
| **Rent Increase Notice** | Often arbitrary, oral, or immediate | Minimum 3 Months' Written Notice |
| **Max Security Deposit** | Up to 10 Months' Rent (e.g., Bangalore) | Standard **Cap of 2 Months' Rent** |
| **Utility Disconnection** | Landlords frequently cut water/power | strictly illegal; penalities apply |
| **Dispute Resolution** | Lengthy civil courts (5 - 10 years) | Dedicated Rent Tribunal (60-day target) |

---

## Standard Rent Agreements on INHABY

At **INHABY**, our tenancy contracts are drafted in full alignment with the Model Tenancy Act guidelines. We protect both owners and renters from arbitrary disputes and unfair clauses.

To download a standard MTA-compliant lease template or list your property, visit our [Legal Dashboard](/verify).`,
    seo: {
      seoTitle: "Understanding the Model Tenancy Act Tenant Rights India",
      seoSlug: "model-tenancy-act-tenant-rights",
      metaTitle: "Model Tenancy Act Guide: Tenant Rights & Eviction (INHABY)",
      metaDescription: "An in-depth legal analysis of the Model Tenancy Act of India. Learn your rights about security deposit caps, eviction procedures, and utility protection.",
      openGraphTitle: "A Tenant's Guide to the Model Tenancy Act of India",
      openGraphDesc: "Sudden rent hikes? Exorbitant security deposits? Know how the federal Model Tenancy Act protects you from arbitrary landlord practices.",
      canonicalUrl: "https://inhaby.com/blog/model-tenancy-act-tenant-rights",
      primaryCategory: "Legal",
      secondaryCategory: "Government Acts",
      tags: ["Model Tenancy Act", "Tenant Rights India", "Rental Law", "BBMP Tenants"],
      readingTime: "10 min read",
      publishedDate: "May 28, 2026",
      updatedDate: "May 28, 2026",
      targetAudience: "Law Students, Real Estate Investors, Urban Tenants, Landlords",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
        suggestion: "A high-quality image of the scales of justice next to a lease document, symbolizing balanced legal protection.",
        alt: "Scales of justice and real estate tenancy agreement"
      },
      lsiKeywords: [
        { word: "model tenancy act tenant rights", count: 4, type: "Primary Keyword" },
        { word: "how to dispute sudden rent hikes", count: 2, type: "Secondary Keyword" },
        { word: "residential security deposit cap", count: 2, type: "Technical Entity" }
      ],
      geoAeoFeatures: [
        {
          type: "Direct Answer (AEO)",
          desc: "Explains the residential deposit cap (2 months) and the 3-month written rent increase notice under the MTA."
        }
      ]
    }
  },
  {
    id: "co-living-student",
    slug: "student-housing-co-living-vs-flatshares",
    title: "Student Housing Secrets: Co-Living Hubs vs. Traditional Flatshares",
    category: "Student Housing",
    phase: "Phase 4 — Tenant Education",
    phaseNum: 4,
    description: "We weigh the legal flexibility, utility overheads, security deposit rules, and community amenities of premium student co-living spaces against traditional group apartment shares.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Meera Nair",
      role: "Senior Legal Counsel",
      avatar: "MN",
      bio: "Meera is an expert in property deeds, local municipal registration compliance, and title verification laws in India. She manages INHABY's automated and manual vetting processes.",
      socials: {
        twitter: "https://twitter.com/inhaby",
        linkedin: "https://linkedin.com/company/inhaby"
      }
    },
    publishedDate: "May 15, 2026",
    readingTime: "7 min read",
    trending: false,
    popular: false,
    tags: ["Student Living", "Flatsharing", "Co-Living"],
    content: `# Student Housing Secrets: Co-Living Hubs vs. Traditional Flatshares

Finding student housing in educational hubs like Bangalore's Koramangala, Pune's Viman Nagar, or Delhi's North Campus is a major transition. For most young students, this is their first time dealing with landlords, security deposits, and budgeting utilities.

The two main housing routes for students are: **Modern Managed Co-Living Hubs** or **Traditional Flatshares (renting an apartment with friends)**. This guide outlines the financial and operational realities of both options.

---

## The Co-living vs. Flatshare Decision

> **Question:** What is the primary difference between managed co-living and flatsharing for students?
>
> **Direct Answer:** Managed co-living offers a single all-inclusive monthly fee covering rent, internet, housekeeping, laundry, and utilities with zero broker intervention and low deposits. Flatsharing offers lower base rents but requires students to manage individual utility bills, source furniture, handle housekeepers, and negotiate deposits.

---

## Feature Comparison: Co-living vs. Flatshare

### 1. Initial Capital Outlay
- **Co-living Hubs:** Typically demand a standard 1 or 2-month security deposit. The space comes fully furnished with beds, desks, and storage.
- **Flatshares:** Often require a standard 5 to 10-month advance. Sourcing beds, study tables, and washing machines adds significant setup costs.

### 2. Conveniences and Management
- **Co-living:** Housekeeping, high-speed Wi-Fi, power backups, and drinking water are managed by the platform.
- **Flatshares:** Requires split billing, hiring local housekeepers, dealing with internet downtime, and cooking.

---

## Comparison Matrix

| Operational Parameter | Managed Co-Living Hubs | Traditional Flatshares |
| :--- | :--- | :--- |
| **Typical Security Deposit** | 1 to 2 Months' Rent | 3 to 10 Months' Rent |
| **Setup Overhead** | **Zero** (Move-in ready) | High (Sourcing furniture & appliances) |
| **Housekeeping & Wifi** | Included in monthly bundle | Managed & billed separately |
| **Social Environment** | Built-in student community | Independent flatmates |

---

## Conclusion: Which Is Right for You?

Choose **Co-living** if you want a hassle-free, move-in-ready space with flexible contracts and lower upfront deposits. Choose a **Flatshare** if you prefer more space, want to live with a specific group of friends, and are willing to manage your own household administration.

No matter which path you select, ensure you use **INHABY** to explore listings directly from owners with zero broker markup.

Find your student home on our [Search Portal](/).`,
    seo: {
      seoTitle: "Student Housing Secrets Co Living vs Flatshares India",
      seoSlug: "student-housing-co-living-vs-flatshares",
      metaTitle: "Student Housing Guide: Co-Living vs. Flatshares (INHABY)",
      metaDescription: "We analyze student housing options in India. Discover whether managed co-living spaces or traditional flatshares fit your student budget and lifestyle.",
      openGraphTitle: "Student Housing Secrets: Co-Living vs. Flatsharing",
      openGraphDesc: "Moving to Bangalore, Delhi, or Pune for college? We break down the upfront costs, deposits, and lifestyle of co-living spaces vs flatshares.",
      canonicalUrl: "https://inhaby.com/blog/student-housing-co-living-vs-flatshares",
      primaryCategory: "Student Housing",
      secondaryCategory: "Housing Hacks",
      tags: ["Student Living", "Co Living Bangalore", "Delhi North Campus", "Bachelor Flats"],
      readingTime: "7 min read",
      publishedDate: "May 15, 2026",
      updatedDate: "May 15, 2026",
      targetAudience: "University Students, Parents, Young Interns, Relocating Graduates",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
        suggestion: "A high-energy, modern co-living space showing student desks and natural lighting, representing study-friendly spaces.",
        alt: "Modern student co-living study area"
      },
      lsiKeywords: [
        { word: "student housing co living vs flatshares", count: 3, type: "Primary Keyword" },
        { word: "student PG in Viman Nagar Pune", count: 2, type: "Secondary Keyword" },
        { word: "low deposit student rooms", count: 2, type: "Semantic/LSI Keyword" }
      ],
      geoAeoFeatures: [
        {
          type: "Direct Answer (AEO)",
          desc: "Contrasts the single bundled fee of co-living with the split-overhead layout of traditional flatsharing."
        }
      ]
    }
  },
  {
    id: "deposit-negotiation",
    slug: "how-to-negotiate-security-deposit",
    title: "How to Negotiate Your Security Deposit Down in Premium Society Complexes",
    category: "Budgeting",
    phase: "Phase 4 — Tenant Education",
    phaseNum: 4,
    description: "Avoid paying a massive 10-month rental advance. Use these three legal negotiation scripts to cap your security deposit to a standard 2 to 3 months and secure paint deduction clauses.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    author: {
      name: "Rohan Das",
      role: "Tenant Relations Manager",
      avatar: "RD",
      bio: "Rohan has assisted thousands of young tech professionals find secure, zero-brokerage homes in Bangalore, Mumbai, and Pune. He specializes in budget optimization and tenant advocacy.",
      socials: {
        twitter: "https://twitter.com/inhaby",
        linkedin: "https://linkedin.com/company/inhaby"
      }
    },
    publishedDate: "April 30, 2026",
    readingTime: "6 min read",
    trending: false,
    popular: true,
    tags: ["Security Deposit", "Negotiation Scripts", "Financial Tips"],
    content: `# How to Negotiate Your Security Deposit Down in Premium Society Complexes

In major Indian tech cities, especially Bangalore, tenants face an unusual financial obstacle: **exorbitant security deposits**. Landlords frequently demand anywhere between 6 to 10 months' rent in advance as a refundable deposit.

For a standard ₹40,000 apartment, that means coughing up ₹4,00,000 before you even get the keys. This guide provides concrete negotiation strategies and legal templates to cap your deposit.

---

## Standard Deposit Negotiations

> **Question:** Why do Bangalore landlords ask for such high security deposits?
>
> **Direct Answer:** High security deposits are a local custom driven by historical developer financing gaps and risk mitigation. Landlords demand massive advances to earn interest, finance outstanding property EMIs, or guard against tenants leaving abruptly without paying rent. Under the new Model Tenancy Act, however, residential security deposits are legally capped at a maximum of 2 months' rent.

---

## 3 Negotiation Scripts That Work

### Script 1: Leveraging the Model Tenancy Act (The Legal Leverage)
*\"Hi, I am excited about the property. Regarding the security deposit, the federal Model Tenancy Act caps residential deposits at 2 months' rent. To maintain strict compliance and ensure a smooth registration with the Rent Authority, can we adjust the deposit to two months? I can initiate the payment today.\"*

### Script 2: Offering Direct Corporate Guarantee (The Stability Leverage)
*\"Hi, as a Senior Developer at [Company], my tenancy is fully backed by corporate employment verification. Since my income is fully documented and secure, a 10-month deposit is unnecessary to mitigate rental payment risks. Can we cap the deposit at 3 months, and I will share my official corporate allotment letter?\"*

### Script 3: The Paint Deduction Clarification (The Operational Leverage)
*\"I agree to a 3-month deposit. However, let us explicitly document in the rent agreement that standard wear-and-tear is excluded from move-out charges, and the maximum deduction for paint restoration will be capped at exactly 1 month of rent, supported by professional receipt audits.\"*

---

## Comparison: Negotiated vs. Traditional Deposit Terms

| Clause | Traditional Trap | Capped INHABY Style |
| :--- | :--- | :--- |
| **Deposit Duration** | 6 to 10 Months' Rent | **2 to 3 Months' Rent** |
| **Painting Cost** | Arbitrary deductions (up to 50k) | Capped at 1 month or actual bills |
| **Refund Window** | Month-long delays post move-out | **Same-day refund upon handoff** |
| **Legal Disputes** | Oral promises without backing | Governed under the Rent Tribunal |

---

## Cap Your Upfront Expenses

Negotiating your deposit frees up critical cash flow that you can use to personalize your home or invest. Always insist on putting everything in writing, and use the Model Tenancy Act as your legal anchor.

To calculate your exact cash savings using direct-to-owner rentals, check out our [Savings Calculator](/savings).`,
    seo: {
      seoTitle: "How to Negotiate Security Deposit Down Bangalore India",
      seoSlug: "how-to-negotiate-security-deposit",
      metaTitle: "Security Deposit Negotiation: Scripts & Tips (INHABY)",
      metaDescription: "Exposing the three proven negotiation scripts to reduce your rental security deposit in Bangalore, Mumbai, or Pune. Use the Model Tenancy Act to protect your budget.",
      openGraphTitle: "Reduce Your Security Deposit: Legal Negotiation Scripts",
      openGraphDesc: "Don't pay 10 months in advance. Learn how to negotiate security deposits down to 2 or 3 months using corporate records and tenancy laws.",
      canonicalUrl: "https://inhaby.com/blog/how-to-negotiate-security-deposit",
      primaryCategory: "Budgeting",
      secondaryCategory: "Tenancy Rights",
      tags: ["Rent Savings", "Security Deposit Hacks", "Indian Housing Boards", "Corporate Tenants"],
      readingTime: "6 min read",
      publishedDate: "April 30, 2026",
      updatedDate: "April 30, 2026",
      targetAudience: "Working Professionals, Corporate Tenants, Young Graduates",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
        suggestion: "A close-up shot of a signature on a clean tenancy contract, representing successful negotiation.",
        alt: "Signing negotiated rent agreement document"
      },
      lsiKeywords: [
        { word: "negotiate security deposit in Bangalore", count: 3, type: "Primary Keyword" },
        { word: "Model Tenancy Act deposit limit", count: 2, type: "Secondary Keyword" },
        { word: "how to avoid painting deductions", count: 2, type: "Semantic/LSI Keyword" }
      ],
      geoAeoFeatures: [
        {
          type: "Direct Answer (AEO)",
          desc: "Explains why Bangalore landlords demand high deposits and how the Model Tenancy Act limits this to 2 months."
        }
      ]
    }
  },
  {
    id: "why-we-built-landing-page-first",
    slug: "why-we-built-landing-page-first",
    title: "Why We Built a Landing Page Instead of Forcing Login: Our Friction-Free Philosophy",
    category: "Product & Design",
    phase: "Phase 5 — Product Development",
    phaseNum: 5,
    description: "Read about the product decisions behind the INHABY user experience. We explore why forcing account creation hides value, and why transparency must start before signup.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
    author: {
      name: "Rohan Das",
      role: "Tenant Relations Manager",
      avatar: "RD",
      bio: "Rohan has assisted thousands of young tech professionals find secure, zero-brokerage homes in Bangalore, Mumbai, and Pune. He specializes in budget optimization and tenant advocacy.",
      socials: {
        twitter: "https://twitter.com/inhaby",
        linkedin: "https://linkedin.com/company/inhaby"
      }
    },
    publishedDate: "June 25, 2026",
    readingTime: "5 min read",
    trending: false,
    popular: false,
    tags: ["Product Philosophy", "UX Design", "Frictionless UX"],
    content: `# Why We Built a Landing Page Instead of Forcing Login: Our Friction-Free Philosophy

If you browse most modern rental apps or property tech portals, you are immediately met with an aggressive signup gate. Before you can even view a single listing or check local rents, you are forced to:
- Enter your mobile number.
- Verify an OTP.
- Fill out a detailed user profile.
- Hand over your personal email address.

At **INHABY**, we believe this model is deeply flawed and disrespectful of user trust. We built INHABY around a **Transparency-First** philosophy. This article outlines why we made our entire listing and discovery portal open to the public without requiring a login.

---

## The Gated Value Fallacy

> **Question:** Why do typical real estate sites force users to login immediately?
>
> **Direct Answer:** Traditional real estate portals force immediate logins to build massive user lead databases, which they sell to third-party telemarketers or use to spam you with automated sales calls. At INHABY, we keep all search, budgeting, and verification checklists public because we believe value must be demonstrated before asking for user data.

---

## Why Friction-Free Discovery Matters

### 1. Rebuilding Trust
If a company hides its listings behind a login wall, it raises a simple question: *\"What are they trying to hide?\"* By making all verified properties, land deeds, and pricing structures fully viewable by guests, we prove the authenticity of our data up front.

### 2. Streamlining the Search
House hunting is already a stressful process. Forcing a tenant to complete a registration form simply to browse properties adds unnecessary friction. We allow you to explore, filter, and calculate potential savings on our portal as a guest, only asking for authorization when you are ready to initiate direct owner contact or draft an agreement.

### 3. Anti-Spam Guarantee
By not collecting your phone number prematurely, we guarantee that you will not receive spam calls from agents or aggressive brokers. Your data is protected, and you remain in full control of your search.

---

## Product Philosophy: Login-First vs. Transparency-First

| Parameter | Login-First Portals (Industry Standard) | Transparency-First (INHABY) |
| :--- | :--- | :--- |
| **Initial Experience** | Aggressive OTP gate block | Open, clean guest exploration |
| **Data Protection** | Phone sold to broker networks | **No unsolicited sales calls** |
| **Friction Level** | High (Forms and verification) | **Zero** (Instant filtering) |
| **User Control** | Forced opt-in notifications | User-initiated inquiries |

---

## Design Rooted in Trust

Our product architecture is built on the belief that software should respect your privacy. By removing unnecessary barriers and demonstrating our verification protocols openly, we build sustainable, long-term trust.

To experience our frictionless, open search platform yourself, browse our verified listings at [INHABY Home](/).`,
    seo: {
      seoTitle: "Why We Built a Landing Page Instead of Forcing Login",
      seoSlug: "why-we-built-landing-page-first",
      metaTitle: "Frictionless Property Search: Why We Don't Force Logins (INHABY)",
      metaDescription: "Exposing the product decisions behind INHABY. Why we choose transparent, login-free exploration over aggressive signup gates and lead-gen spam.",
      openGraphTitle: "Why We Don't Force You to Login to View Rental Properties",
      openGraphDesc: "Fewer gates, more trust. Discover how our friction-free, transparency-first UX philosophy protects your data and simplifies your rental search.",
      canonicalUrl: "https://inhaby.com/blog/why-we-built-landing-page-first",
      primaryCategory: "Product & Design",
      secondaryCategory: "UX Philosophy",
      tags: ["Frictionless UX", "Privacy First", "Real Estate Tech", "User Trust"],
      readingTime: "5 min read",
      publishedDate: "June 25, 2026",
      updatedDate: "June 25, 2026",
      targetAudience: "Product Designers, Startup Founders, Tech Savvy Renters",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
        suggestion: "A clean, modern user interface mockup representing flawless aesthetic layout.",
        alt: "Frictionless minimalist website interface design mockup"
      },
      lsiKeywords: [
        { word: "why we built a landing page first", count: 3, type: "Primary Keyword" },
        { word: "how to find houses without registering", count: 2, type: "Secondary Keyword" },
        { word: "anti-spam rental portal", count: 2, type: "Semantic/LSI Keyword" }
      ],
      geoAeoFeatures: [
        {
          type: "Direct Answer (AEO)",
          desc: "Details why traditional platforms force early OTP gates and how INHABY's model prevents broker marketing spam."
        }
      ]
    }
  },
  {
    id: "ai-in-property-verification",
    slug: "ai-in-property-verification",
    title: "AI in Property Verification: Computer Vision, OCR, and Human-in-the-Loop Vetting",
    category: "Technology",
    phase: "Phase 6 — Technology",
    phaseNum: 6,
    description: "Go behind the scenes of our verification engine. Discover how we utilize Gemini models for document OCR, structural photo validation, and fraud detection, backed by human auditors.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    author: {
      name: "Ishan Sharma",
      role: "Chief of Trust & Security",
      avatar: "IS",
      bio: "Ishan is a former real-estate compliance attorney with 10+ years of legal advisory experience in landlord-tenant disputes and tenancy reform in India. He leads INHABY's compliance frameworks.",
      socials: {
        twitter: "https://twitter.com/inhaby",
        linkedin: "https://linkedin.com/company/inhaby"
      }
    },
    publishedDate: "June 27, 2026",
    readingTime: "8 min read",
    trending: false,
    popular: false,
    tags: ["Artificial Intelligence", "Real Estate Technology", "Computer Vision"],
    content: `# AI in Property Verification: Computer Vision, OCR, and Human-in-the-Loop Vetting

Vetting rental listings in real-time is an immense logistical challenge. In major metros, thousands of listings are uploaded daily. Traditional platforms either ignore verification entirely or hire massive, slow manual review teams, which drives up operational costs and leads to delays.

At **INHABY**, we solved this scalability problem by building a hybrid **AI-powered Human-in-the-loop Vetting System**. This article outlines how we leverage modern LLMs and computer vision to secure our listings in real-time.

---

## How AI Powers INHABY's Vetting System

> **Question:** How does INHABY use AI to verify land deeds and check listing photos?
>
> **Direct Answer:** We leverage Gemini's structured OCR capabilities to verify landlord names on land deeds against Aadhaar records, and use computer vision models to identify CGI architectural renderings, filter duplicate stock images, and detect misleading wide-angle distortions.

---

## Key Pillars of Our Technical Vetting System

### 1. Structured Document OCR & Cross-Matching
When a landlord uploads their **Municipal Property Tax Receipt** or **Registered Purchase Deed**:
- Our backend extracts critical legal fields using OCR (Owner Name, Khata ID, Survey Number).
- It automatically verifies these details against government registries and the landlord's Aadhaar KYC records, flagging discrepancies instantly.

### 2. Computer Vision Photo Validation
Scammers frequently upload duplicate stock photos or CGI renderings of properties that do not exist. Our visual models check:
- **CGI Render Filtering:** Detecting pixel pattern structures unique to architectural computer renders.
- **Wide-Angle Correction:** Analyzing camera lens metadata and focal distortions to flag misleadingly stretched rooms.
- **Stock Photo Rejection:** Cross-referencing uploaded images against a database of millions of web images to catch plagiarism.

### 3. Human-in-the-loop (HITL) Safeguards
AI is highly efficient but not infallible. That's why we maintain a dedicated security team:
- If our system flags a document or image discrepancy, it is routed to a human trust expert for a deep-dive audit.
- No listing is approved until both systems agree on its authenticity.

---

## Technical Vetting Comparison

| Vetting Parameter | Traditional Automated Systems | INHABY Hybrid AI System |
| :--- | :--- | :--- |
| **Document Scanning** | basic OCR text dump | Structural validation against government databases |
| **Image Vetting** | File size limits | CGI, wide-angle, and duplicate stock filters |
| **Fraud Flagging** | Reactive (after user reports) | Proactive (pre-publication fraud isolation) |
| **Processing Speed** | 24 - 48 Hours | **Sub-5 minute automated analysis** |

---

## The Technology of Trust

By combining artificial intelligence with expert human oversight, we have created a secure, fast verification engine that protects you from fraud without slowing down your house hunt.

To list your property or explore verified direct-owner listings, check out our [Tenant Search Engine](/).`,
    seo: {
      seoTitle: "AI Property Verification: OCR, Computer Vision & Vetting",
      seoSlug: "ai-in-property-verification",
      metaTitle: "AI in Property Vetting: Documents & CGI Filters (INHABY)",
      metaDescription: "An in-depth look at how INHABY utilizes machine learning, structured OCR, and computer vision to verify land deeds and block deceptive listings.",
      openGraphTitle: "How AI Powers INHABY's Property Verification System",
      openGraphDesc: "A deep-dive into the OCR document scanners, CGI photo filters, and human audits that keep our zero-brokerage listings scam-free.",
      canonicalUrl: "https://inhaby.com/blog/ai-in-property-verification",
      primaryCategory: "Technology",
      secondaryCategory: "AI Vetting",
      tags: ["AI Real Estate", "Gemini OCR", "Computer Vision", "Scam Protection"],
      readingTime: "8 min read",
      publishedDate: "June 27, 2026",
      updatedDate: "June 27, 2026",
      targetAudience: "Software Developers, Real Estate Tech Investors, Landlords",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
        suggestion: "A high-tech digital render showing abstract code and geometric structures representing secure technology.",
        alt: "Secure cloud server network abstract rendering"
      },
      lsiKeywords: [
        { word: "AI in property verification", count: 3, type: "Primary Keyword" },
        { word: "OCR land deed extraction", count: 2, type: "Secondary Keyword" },
        { word: "anti-CGI filter real estate", count: 2, type: "Semantic/LSI Keyword" }
      ],
      geoAeoFeatures: [
        {
          type: "Direct Answer (AEO)",
          desc: "Details the dual-verification layout using structured OCR to cross-reference deeds and identity records."
        }
      ]
    }
  },
  {
    id: "the-future-of-renting",
    slug: "future-of-renting-smart-homes-ai",
    title: "The Future of Renting: Smart Homes, AI Assistants, and Digital Rental Identities",
    category: "Future Vision",
    phase: "Phase 8 — Future Vision",
    phaseNum: 8,
    description: "Explore where INHABY is heading. We look at smart-contract leases, real-time energy dashboards, and a portable 'rental credit score' that eliminates cash deposit burdens.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
    author: {
      name: "Ishan Sharma",
      role: "Chief of Trust & Security",
      avatar: "IS",
      bio: "Ishan is a former real-estate compliance attorney with 10+ years of legal advisory experience in landlord-tenant disputes and tenancy reform in India. He leads INHABY's compliance frameworks.",
      socials: {
        twitter: "https://twitter.com/inhaby",
        linkedin: "https://linkedin.com/company/inhaby"
      }
    },
    publishedDate: "June 28, 2026",
    readingTime: "8 min read",
    trending: false,
    popular: false,
    tags: ["Future Vision", "Smart Homes", "Rental Credit"],
    content: `# The Future of Renting: Smart Homes, AI Assistants, and Digital Rental Identities

Over the last decade, consumer technology has transformed how we travel, purchase groceries, and invest our savings. Yet, the rental housing experience remains mired in paper documents, manual key drop-offs, and high upfront deposit costs.

At **INHABY**, our long-term ambition goes beyond a directory of verified listings. We are building the infrastructure for a modern **Digital Renting Experience**. This article outlines where our platform is heading over the next five years.

---

## Our Long-Term Rental Vision

> **Question:** How will technology solve the upfront security deposit crisis in India?
>
> **Direct Answer:** The future of renting relies on the \"Digital Rental Identity\"—a portable credit score tracking timely rent payments and property upkeep. This identity allows verified tenants to secure apartments with zero security deposits or minor insurance-backed coverage, removing the multi-lakh cash advance burden.

---

## Key Pillars of the Future of Renting

### 1. Smart-Contract Tenancy Agreements
Modern leases are static PDF pages that are easily ignored. The future lies in **digital smart contracts**:
- Rental agreements will be stored on secure, immutable digital ledgers.
- Rent increases, maintenance obligations, and security deposit payouts will execute automatically once terms are met, reducing dispute rates to zero.

### 2. Connected Smart Home Dashboards
Tenants want comfort, and landlords want to protect their assets. Integrated smart buildings will feature:
- **Calibrated Energy Dashboards:** Real-time water and solar energy metrics, helping tenants track utility costs directly on their phones.
- **Smart Digital Key Handover:** Secure, automated lock access systems that activate on lease start, removing physical key handover delays.

### 3. Portable Rental Credit Scores
Currently, a tenant who has paid rent on time for ten years gets zero recognition from traditional banks. Our portable **Rental Credit Score** will track your reliable track record, letting landlords trust you instantly and eliminating the need for massive deposits.

---

## Comparison: Today's Friction vs. Tomorrow's Vision

| Aspect | Today's Standard Rental Experience | INHABY Future Vision |
| :--- | :--- | :--- |
| **Lease Agreements** | Paper-based, loose legal protection | Immutable digital smart contracts |
| **Security Deposits** | Massive cash lockups (up to 10 months) | Zero deposit backed by Rental Identity |
| **Utility Tracking** | Surprise bills, manual meter check | Real-time integrated utility dashboard |
| **Key Exchange** | Meeting brokers in person | Automated smart digital locks |

---

## Step Into the Future with INHABY

The future of housing is built on transparency, safety, and modern conveniences. By eliminating traditional friction points and building a trusted digital ecosystem, we are shaping the next decade of renting in India.

Join us on this journey. Experience our transparent direct-owner search platform today at [INHABY Home](/).`,
    seo: {
      seoTitle: "The Future of Renting: Smart Homes and AI Lease Agreements",
      seoSlug: "future-of-renting-smart-homes-ai",
      metaTitle: "The Future of Renting: Smart Homes & AI (INHABY)",
      metaDescription: "Discover INHABY's long-term product roadmap. Learn about portable rental credit scores, smart smart-contracts, and zero security deposit rentals.",
      openGraphTitle: "Digital Tenancies: The Future of Renting in India",
      openGraphDesc: "No more paper leases, no more 10-month cash deposits. Discover how technology, smart locks, and portable rental identities will redefine renting.",
      canonicalUrl: "https://inhaby.com/blog/future-of-renting-smart-homes-ai",
      primaryCategory: "Future Vision",
      secondaryCategory: "Housing Innovation",
      tags: ["Digital Rental ID", "Smart Homes India", "PropTech", "Zero Deposit"],
      readingTime: "8 min read",
      publishedDate: "June 28, 2026",
      updatedDate: "June 28, 2026",
      targetAudience: "Real Estate Tech Innovators, Tech Renters, Forward Thinking Landlords",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
        suggestion: "A modern smart-home interior with digital displays, representing next-generation connectivity.",
        alt: "Modern connected smart home living room setup"
      },
      lsiKeywords: [
        { word: "future of renting in India", count: 3, type: "Primary Keyword" },
        { word: "portable rental credit score", count: 2, type: "Secondary Keyword" },
        { word: "smart contract rent agreement", count: 2, type: "Semantic/LSI Keyword" }
      ],
      geoAeoFeatures: [
        {
          type: "Direct Answer (AEO)",
          desc: "Outlines how a portable rental credit identity removes the multi-month security deposit cash burden."
        }
      ]
    }
  },
  {
    id: "day-29-building-company",
    slug: "day-29-building-company",
    title: "Building Inhaby — Day 29: The Day We Stopped Building Features and Started Building a Company",
    category: "Founders Diary",
    phase: "Phase 3 — Scale & Security",
    phaseNum: 3,
    description: "Most startup updates celebrate shiny new features. Today wasn't one of those days. Today was about architecture, debugging, authentication, deployment strategy, and making decisions that determine whether Inhaby can support millions of people.",
    image: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&q=80&w=1200",
    author: {
      name: "Vikram Dev",
      role: "CTO & Co-Founder",
      avatar: "VD",
      bio: "Vikram is the co-founder and CTO at INHABY. He loves building highly-scalable cloud architectures, monorepos, and developer tools.",
      socials: {
        twitter: "https://twitter.com/inhaby",
        linkedin: "https://linkedin.com/company/inhaby"
      }
    },
    publishedDate: "June 29, 2026",
    readingTime: "5 min read",
    trending: true,
    popular: true,
    tags: ["Startup Architecture", "Supabase", "Founders Diary", "Monorepo"],
    content: `# Building Inhaby — Day 29: The Day We Stopped Building Features and Started Building a Company

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

\"What happens when Inhaby has 100 users?\"

\"What about 10,000?\"

\"What about one million?\"

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

Sometimes it's measured by how many future problems you quietly prevented before they ever had the chance to happen.`,
    seo: {
      seoTitle: "Building Inhaby Day 29: Architecture, Debugging, and Scaling SDK",
      seoSlug: "day-29-building-company",
      metaTitle: "Building Inhaby — Day 29: Building @inhaby/shared SDK",
      metaDescription: "Learn how we shifted Inhaby from custom features to a robust company architecture with @inhaby/shared, resolved Supabase auth bugs, and built a dynamic booking pipeline.",
      openGraphTitle: "Inhaby Day 29: Building a Scalable Startup Monorepo Package",
      openGraphDesc: "From copy-pasting code to creating @inhaby/shared. How we redesigned Inhaby's shared SDK, solved Supabase authentication blocks, and fixed real property booking issues.",
      canonicalUrl: "https://inhaby.com/blog/day-29-building-company",
      primaryCategory: "Founders Diary",
      secondaryCategory: "Engineering",
      tags: ["Monorepo", "Supabase Auth", "Startup Architecture", "GitHub Packages"],
      readingTime: "5 min read",
      publishedDate: "June 29, 2026",
      updatedDate: "June 29, 2026",
      targetAudience: "Founders, Developers, Technical Product Managers, PropTech Enthusiasts",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&q=80&w=1200",
        suggestion: "A technical terminal and modern dev setup symbolizing professional package publishing and compiler success.",
        alt: "Modern developer code editor displaying compiled packages"
      },
      lsiKeywords: [
        { word: "monorepo shared package", count: 3, type: "Primary Keyword" },
        { word: "Supabase auth admin login", count: 2, type: "Secondary Keyword" },
        { word: "dynamic property rental search", count: 2, type: "Semantic/LSI Keyword" }
      ],
      geoAeoFeatures: [
        {
          type: "Direct Answer (AEO)",
          desc: "Describes the architecture shift of modularizing shared code into @inhaby/shared to prevent scaling bottlenecks in multitenant structures."
        }
      ]
    }
  },
  {
    id: "engineering-milestone-scaling-foundation",
    slug: "engineering-milestone-scaling-foundation",
    title: "Engineering Milestone: Building the Foundation That Will Scale Inhaby to Millions",
    category: "Engineering",
    phase: "Phase 3 — Scale & Security",
    phaseNum: 3,
    description: "Today's work wasn't about adding another page or another button. It was about redesigning Inhaby's entire software architecture so that the platform can continue growing without becoming impossible to maintain.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
    author: {
      name: "Genofogu",
      role: "Co-Founder",
      avatar: "GF",
      bio: "Genofogu is the Co-Founder at INHABY, focused on core engineering and scaling infrastructures to support millions of home seekers.",
      socials: {
        twitter: "https://twitter.com/inhaby",
        linkedin: "https://linkedin.com/company/inhaby"
      }
    },
    publishedDate: "June 29, 2026",
    readingTime: "6 min read",
    trending: false,
    popular: true,
    tags: ["Engineering", "Startup Architecture", "Scaling", "GitHub Packages"],
    content: `# Engineering Milestone: Building the Foundation That Will Scale Inhaby to Millions

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
- Source files moved into a dedicated \`src\` directory.
- Compiled JavaScript is generated inside a \`dist\` directory.
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

Today, Inhaby's foundation became much stronger.`,
    seo: {
      seoTitle: "Engineering Milestone: Building Inhaby's Shared SDK Foundation",
      seoSlug: "engineering-milestone-scaling-foundation",
      metaTitle: "Engineering Milestone: Building Inhaby's @inhaby/shared Foundation",
      metaDescription: "Read about how we redesigned Inhaby's architecture to scale to millions of users by building @inhaby/shared, resolving administrative logins, and fixing viewing pipelines.",
      openGraphTitle: "Inhaby Engineering Milestone: Scaling to Millions",
      openGraphDesc: "How we centralized Inhaby's authentication, database, and storage helpers into versioned GitHub Packages.",
      canonicalUrl: "https://inhaby.com/blog/engineering-milestone-scaling-foundation",
      primaryCategory: "Engineering",
      secondaryCategory: "Startup Architecture",
      tags: ["Monorepo", "TypeScript", "GitHub Packages", "Supabase Architecture"],
      readingTime: "6 min read",
      publishedDate: "June 29, 2026",
      updatedDate: "June 29, 2026",
      targetAudience: "Technical Leads, CTOs, PropTech Developers, Monorepo Enthusiasts",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
        suggestion: "A deep abstract technical background representing cloud infrastructure, binary compilation, or high-performance computer architectures.",
        alt: "Complex server room networking cables and microcontrollers representing enterprise scale software"
      },
      lsiKeywords: [
        { word: "shared typescript package", count: 3, type: "Primary Keyword" },
        { word: "Supabase authentication pipeline", count: 2, type: "Secondary Keyword" },
        { word: "GitHub Packages private registry", count: 2, type: "Semantic/LSI Keyword" }
      ],
      geoAeoFeatures: [
        {
          type: "Direct Answer (AEO)",
          desc: "Explains how the centralization of business logic inside @inhaby/shared improves maintainability and guarantees zero runtime type discrepancies between React applications."
        }
      ]
    }
  },
  {
  "id": "day-003-rebuilding-architecture",
  "slug": "day-003-rebuilding-architecture",
  "title": "Day 003 — I Broke Everything, Then Fixed It Properly",
  "category": "Founder Journal",
  "phase": "Phase 5 — Product Development Transparency",
  "phaseNum": 5,
  "description": "Genofogu, co-founder of Inhaby, reflects on spending a night rebuilding the tenant app's routing and authentication from the ground up — the decisions, the mistakes, and the lessons.",
  "image": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200",
  "author": {
    "name": "Genofogu",
    "role": "Co-Founder of Inhaby",
    "avatar": "GF",
    "bio": "Genofogu is the Co-Founder at INHABY, focused on core engineering and scaling infrastructures to support millions of home seekers.",
    "socials": {
      "twitter": "https://twitter.com/inhaby",
      "linkedin": "https://linkedin.com/company/inhaby"
    }
  },
  "publishedDate": "2026-07-03",
  "readingTime": "8 minutes",
  "trending": false,
  "popular": true,
  "tags": [
    "founder",
    "daily log",
    "React",
    "authentication",
    "architecture",
    "startup",
    "proptech",
    "learning in public"
  ],
  "content": "Last night I stayed up until about 3:45 in the morning fixing something that, honestly, should have never been built the way it was.\n\nI want to write this down not to brag — I didn't do anything impressive. I wrote code that was wrong, lived with it for a while, and then spent a night fixing it. That's not impressive. That's just what happens when you're building a product alone and making decisions faster than you probably should.\n\n---\n\n## What I Was Actually Trying to Fix\n\nA few days ago I merged the Inhaby landing page into the tenant app codebase. The idea was simple: one Vite project, one deployment, both surfaces — landing website for guests, and the tenant application for logged-in users.\n\nThe merge worked. The app ran. I pushed it and called it v1.7.\n\nBut there was a problem I had quietly swept under the rug: **the entire authentication system was mounted globally, even on the landing page where it wasn't needed.** Every guest who loaded the landing page was silently triggering a Supabase session check and spinning up the app state — notifications, wishlists, bookings, messages — all of it, for someone who hadn't even signed up yet.\n\nAnd when a logged-in user clicked Logout, the app would call `signOut()` and navigate to the home page... but all that state was still sitting in memory. If you opened React DevTools after logging out, you could still see the previous user's notifications. The wishlist wasn't cleared. The booking state was still there.\n\nThat's a bug. A real one. Not hypothetical — an actual security and UX failure.\n\n---\n\n## What Made It Worse\n\nI had also written the routing as one massive file. `AppRouter.tsx` was 1,114 lines long. Public routes, login routes, dashboard routes — all mixed together in one place. The auth guards were inconsistently applied. The logout didn't guarantee state cleanup. The landing page header was doing a hardcoded external link to `https://inhaby.com/login` instead of using React Router's `<Link to=\"/login\">`.\n\nWhen I stepped back and looked at it, I realised: this isn't something I can patch. I have to do it properly.\n\n---\n\n## The Decision to Start Over (architecturally)\n\nI've read enough engineering blogs to know that \"let's refactor it properly\" is often a trap. You spend three days on it, nothing gets better, and you've introduced five new bugs.\n\nSo before I touched a single file, I wrote a complete implementation plan. Thirteen success criteria. A route table. A header ownership contract. An explicit logout sequence, step by step.\n\nThe key insight I had was this: **the providers are in the wrong place.**\n\nIn v1.7, the `AuthProvider` and `AppStateProvider` were mounted above the router — meaning they existed on every page, including the landing page. The fix wasn't to add more cleanup code. The fix was to move these providers *inside* the authenticated sub-tree.\n\nWhen you log out and navigate to `/`, React unmounts the entire tenant app tree. That tree contains the providers. When those providers unmount, all state — every hook, every subscription, every cached value — is garbage collected automatically. No explicit cleanup needed. The architecture enforces the guarantee.\n\n---\n\n## What I Built\n\nI created two independent React sub-trees inside one Vite project:\n\n**Landing Website (no auth context at all)**\n- Lives at `/`\n- Has its own `LandingApp` wrapper with `LandingHeader`, footer, animations\n- Never imports anything from the tenant app context\n- The \"Login\" button is a proper internal React Router link, not an external URL\n\n**Tenant Application (auth-scoped)**\n- Lives at `/app/*`\n- `ProtectedRoute` guards the entire sub-tree — but importantly, the guard reads Supabase directly, not from a React context, because the context doesn't exist outside the sub-tree\n- `AuthProvider` and `AppStateProvider` only mount when a user is authenticated\n- `AppShell` wraps the sidebar, header, and router for the authenticated experience\n\nThat last part — the guard reading Supabase directly — is something I got wrong the first time tonight. I had written `ProtectedRoute` to call `useAuth()`. But `useAuth()` reads from `AuthProvider`, and `AuthProvider` is *inside* `TenantApp`, which is the child being guarded. Classic chicken-and-egg.\n\nThe error was direct: `useAuth must be used within an AuthProvider`. I read the stack trace, traced it to the provider ordering, and fixed it: `ProtectedRoute` now calls `supabase.auth.getSession()` directly — same as the `GuestRoute` already did. Problem solved.\n\n---\n\n## Fixing the Stale State Bug\n\nEven with the architecture fix, there was a second issue: during the brief window between `signOut()` resolving and React completing its re-render cycle, the hooks could still serve stale data. So I added explicit cleanup to every hook:\n\n```typescript\nuseEffect(() => {\n  if (!user) {\n    setNotifications([]);\n    return;\n  }\n  fetchNotifications();\n}, [user]);\n```\n\nI did this for five hooks: `useNotifications`, `useWishlist`, `useVisits`, `useBookings`, and `useMessages`. Each one now clears its state the moment `user` becomes `null`. The architecture-level guarantee handles the full teardown. The hook-level cleanup is defence-in-depth for the race window.\n\n---\n\n## What Actually Happened During the Build\n\nI started around 11pm. By 1am I had the new structure mostly written — 8 new files, 7 modified, 2 deleted. By 2am I had TypeScript errors I needed to resolve:\n\n- `AppShell` was passing `unreadChatsCount` but `BottomNavProps` expected `unreadCount`\n- `LocationSelectorModal` wanted `isOpen` and `activeLocation`, not `currentLocation`\n- The root `src/App.tsx` was pointing to the old monolith\n\nSmall stuff. But enough to fail the build.\n\nAt 3:45am I ran `npx tsc --noEmit`. Zero errors. Then `npm run build`. It completed in 21 seconds, 2,388 modules transformed.\n\nI committed it as `Version 1.8.0.0 — Refactor Complete with TS and build errors resolved` and pushed to `main`.\n\nThen I went to sleep.\n\n---\n\n## What I Learned\n\n**1. Providers belong close to their consumers.**\n\nIf a provider exists above the entire app, it runs for everyone — including people who don't need it. This wastes resources and creates cleanup problems. Mount providers as low as they can go while still covering everything that needs them.\n\n**2. Stale state after logout is an architecture problem, not a cleanup problem.**\n\nYou can add `setNotifications([])` to every hook forever. But the real fix is ensuring that the provider tree unmounts on logout. When the tree unmounts, React handles the rest.\n\n**3. Route guards cannot use context from within the thing they're guarding.**\n\n`ProtectedRoute` wraps `TenantApp`. `TenantApp` contains `AuthProvider`. So `ProtectedRoute` cannot call `useAuth()`. This seems obvious in hindsight. It wasn't obvious at 1am.\n\n**4. Write the plan before writing the code.**\n\nThe implementation plan I wrote before touching any file saved me at least two hours. It forced me to think about header ownership, provider ordering, and logout sequence before I had invested any code in the wrong direction.\n\n**5. 1,114 line files are always a smell.**\n\nIf a single file handles public routing, auth routing, and private routing — that file is doing too much. Split it.\n\n---\n\n## Where Inhaby Is Now\n\nInhaby v1.8.0.0 is committed and running. The architecture is clean. The landing page and the tenant app are properly separated. Logout is guaranteed. The build passes.\n\nTomorrow I'm going to start looking at the property detail page experience and the search functionality. But tonight, I'm satisfied. Not with the original problem — that was entirely my fault — but with having fixed it properly instead of patching it.\n\nThat's the thing about building a startup without a senior engineer looking over your shoulder. You make mistakes. Bigger mistakes than you'd make on a team. But you also learn faster, because every bug is yours to own completely.\n\n---\n\n## Vision for What I'm Building\n\nInhaby is a zero-brokerage property discovery and rental platform for tenants in India. The mission is simple: a tenant should be able to find a verified home, book a visit, and sign a lease without paying a single rupee to a broker.\n\nThat's a hard problem. The broker model in Indian real estate is decades old and deeply embedded. Inhaby doesn't defeat it with marketing — it defeats it by building a better product. A product where verified owners list directly, where tenants can message owners in real time, where visit scheduling is one tap, where the entire tenancy — from search to signing — happens inside the app.\n\nI'm building this mostly alone right now. The codebase has three applications: the tenant app, the owner portal, and the admin panel. All three share one TypeScript package — `@inhaby/shared` — that contains the Supabase client, all type definitions, and shared utilities. That package is published to GitHub Packages and installed as a scoped dependency in each app.\n\nIt's a real system. It works. It's also deeply imperfect, and I'm rewriting pieces of it regularly as I learn more about what \"production-quality\" actually means.\n\nThis journal is my attempt to document that process honestly. Not to present a polished version of the startup journey. The actual version. The 3am version.\n\n---\n\n## Related Articles\n\n- **Next:** [How We Built the @inhaby/shared GitHub Package](/blog/engineering/github-packages-inhaby)\n- **Next:** [Merging a Landing Page Into a React App Without Breaking Auth](/blog/engineering/landing-page-integration)\n- **Suggested Reading:** Who is Genofogu? — [/blog/founder-journal/about-genofogu](/blog/founder-journal/about-genofogu)\n\n---\n\n## Suggested Social Caption\n\n> \"Stayed up until 3:45am rebuilding Inhaby's routing from scratch. Not because I wanted to. Because the first version was broken in a way that couldn't be patched — only replaced. Here's what I learned. 🧵\"\n\n---\n\n## FAQ\n\n**Q: What is Inhaby?**\nA: Inhaby is a zero-brokerage property rental platform connecting tenants directly with verified property owners in India, eliminating broker fees.\n\n**Q: Who is building Inhaby?**\nA: Genofogu is the co-founder and primary engineer currently building the platform, working across three applications and a shared SDK.\n\n**Q: What is a Founder Journal?**\nA: The Founder Journal is Genofogu's daily engineering diary — honest, first-person accounts of what was actually built, broken, and learned each day.\n\n**Q: How do I follow the Inhaby build in public?**\nA: Subscribe to the Inhaby engineering blog at /blog or follow updates at /blog/founder-journal.\n\n---\n\n## JSON-LD Recommendations\n\n```json\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"BlogPosting\",\n  \"headline\": \"Day 003: I Rebuilt Inhaby's Architecture From Scratch\",\n  \"author\": {\n    \"@type\": \"Person\",\n    \"name\": \"Genofogu\",\n    \"url\": \"https://inhaby.com/founder/genofogu\",\n    \"jobTitle\": \"Co-Founder\",\n    \"worksFor\": {\n      \"@type\": \"Organization\",\n      \"name\": \"Inhaby\"\n    }\n  },\n  \"datePublished\": \"2026-07-03\",\n  \"dateModified\": \"2026-07-03\",\n  \"publisher\": {\n    \"@type\": \"Organization\",\n    \"name\": \"Inhaby\",\n    \"url\": \"https://inhaby.com\"\n  },\n  \"mainEntityOfPage\": {\n    \"@type\": \"WebPage\",\n    \"@id\": \"https://inhaby.com/blog/founder-journal/day-003-rebuilding-architecture\"\n  },\n  \"keywords\": \"Inhaby, founder journal, React refactor, startup engineering, authentication bug\",\n  \"articleSection\": \"Founder Journal\"\n}\n```",
  "seo": {
    "seoTitle": "Day 003: I Rebuilt Inhaby's Architecture From Scratch (And Why It Had to Happen)",
    "seoSlug": "day-003-rebuilding-architecture",
    "metaTitle": "Day 003: I Rebuilt Inhaby's Architecture From Scratch (And Why It Had to Happen)",
    "metaDescription": "Genofogu, co-founder of Inhaby, reflects on spending a night rebuilding the tenant app's routing and authentication from the ground up — the decisions, the mistakes, and the lessons.",
    "openGraphTitle": "Day 003: Rebuilding Inhaby's Core Architecture — A Founder's Honest Account",
    "openGraphDesc": "One night, two major bugs, eight new files, and a complete React architectural refactor. This is what building a startup actually looks like.",
    "canonicalUrl": "https://inhaby.com/blog/founder-journal/day-003-rebuilding-architecture",
    "primaryCategory": "Founder Journal",
    "secondaryCategory": "Startup Journey",
    "tags": [
      "founder",
      "daily log",
      "React",
      "authentication",
      "architecture",
      "startup",
      "proptech",
      "learning in public"
    ],
    "readingTime": "8 minutes",
    "publishedDate": "2026-07-03",
    "updatedDate": "2026-07-03",
    "targetAudience": "Startup Founders, React Developers, Aspiring Entrepreneurs",
    "featuredImage": {
      "url": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200",
      "suggestion": "A dark desk late at night, a single monitor glowing with a React component tree diagram, a notebook open beside it with rough architecture sketches, and a half-empty cup of tea.",
      "alt": "A developer's late-night workspace with code on screen and architecture notes in a notebook, representing the Inhaby founder's engineering process."
    },
    "lsiKeywords": [
      {
        "word": "Inhaby founder journal",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "building a startup",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "React refactor",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "authentication bug",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "how to fix React auth state after logout",
        "count": 2,
        "type": "Secondary Keyword"
      },
      {
        "word": "React provider ordering bug",
        "count": 2,
        "type": "Secondary Keyword"
      },
      {
        "word": "startup engineering blog India",
        "count": 2,
        "type": "Secondary Keyword"
      },
      {
        "word": "building a proptech startup from scratch",
        "count": 2,
        "type": "Secondary Keyword"
      }
    ],
    "geoAeoFeatures": [
      {
        "type": "Direct Answer (AEO)",
        "desc": "Provides a direct explanation matching the key entities for search engines query optimization."
      }
    ]
  }
},
  {
  "id": "about-genofogu",
  "slug": "about-genofogu",
  "title": "Who Is Genofogu?",
  "category": "Founder Journal",
  "phase": "Phase 5 — Product Development Transparency",
  "phaseNum": 5,
  "description": "Meet Genofogu, the co-founder building Inhaby — a zero-brokerage property rental platform in India. An honest introduction: who he is, why he started Inhaby, and what he's learning.",
  "image": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200",
  "author": {
    "name": "Genofogu",
    "role": "Co-Founder of Inhaby",
    "avatar": "GF",
    "bio": "Genofogu is the Co-Founder at INHABY, focused on core engineering and scaling infrastructures to support millions of home seekers.",
    "socials": {
      "twitter": "https://twitter.com/inhaby",
      "linkedin": "https://linkedin.com/company/inhaby"
    }
  },
  "publishedDate": "2026-07-03",
  "readingTime": "6 minutes",
  "trending": false,
  "popular": true,
  "tags": [
    "founder",
    "about",
    "proptech",
    "India",
    "startup",
    "zero brokerage",
    "building in public"
  ],
  "content": "I'm Genofogu. I'm the co-founder of Inhaby.\n\nThat sentence sounds more official than the reality. The reality is that most days I'm just one person sitting at a desk, writing code, making mistakes, fixing them, and trying to build something that actually helps people find a home without being robbed by a broker.\n\nThis page is my attempt to introduce myself honestly — not in the way founders usually introduce themselves on \"About\" pages, with carefully chosen words designed to project credibility. Just the actual version.\n\n---\n\n## Why Inhaby Exists\n\nRenting a home in India is expensive in ways that have nothing to do with the home itself.\n\nThe broker model is the default. You find a flat you like. The broker who showed it to you takes a fee — typically one month's rent, sometimes two. You pay it, because there's no other path. The owner won't deal with you directly. The broker controls access.\n\nThat's not a market failure. It's a structural inefficiency that's been normalised because no one built a better system.\n\nI started thinking about Inhaby because I watched people around me — good people, working people — spend money they didn't have to spend on something that shouldn't cost anything. A broker's job is to introduce two parties. When both parties are already online, that introduction doesn't need to cost a month's rent.\n\nInhaby's premise is simple: **verified owners list their properties directly. Tenants find them, message them, schedule visits, and sign leases — without a broker in the middle.**\n\nThat's the whole idea. It's not complicated. The difficulty is in building the system that makes it trustworthy enough that both sides — owners and tenants — actually use it.\n\n---\n\n## What I'm Building\n\nInhaby isn't a single app. It's a platform with three surfaces:\n\n1. **The Tenant App** — where renters search, save, book visits, and manage their tenancy\n2. **The Owner Portal** — where property owners list, manage leads, communicate with tenants, and track payments\n3. **The Admin Panel** — internal tools for moderating listings, verifying owners, and managing the platform\n\nAll three share one TypeScript package — `@inhaby/shared` — that contains the Supabase client, all data models, and shared utilities. It's published as a scoped package under the `@inhaby` GitHub Packages registry.\n\nThe backend is Supabase. The frontend is React with Vite. The styling is Tailwind. The whole thing is deployed from a monorepo structure where each application is independent but shares common infrastructure.\n\nIs this the optimal architecture for a startup? Probably not perfectly. But it's what I understand, it works, and it lets me move fast without constantly reinstalling shared dependencies.\n\n---\n\n## Building While Learning\n\nI want to be honest about this: I am learning while I build.\n\nI'm not a computer science graduate. I'm not a senior engineer with ten years of production experience. I'm someone who taught himself to code, who reads documentation carefully, who makes mistakes and then spends hours or days understanding exactly what went wrong and why.\n\nMost of what I know about React I learned by building Inhaby. Most of what I know about Supabase I learned by using it. The same is true for TypeScript, for authentication flows, for database design.\n\nThis is a real limitation. There are definitely architectural decisions I've made that a more experienced engineer would have made differently. I know this because I find the evidence myself — I wrote code, shipped it, and later discovered it had a fundamental problem I missed entirely.\n\nBut there's a different kind of knowledge you get from building something real. Not hypothetical. Not tutorial-scale. A real system with real users in mind, real edge cases, real security requirements. You learn differently when the mistakes are yours to fix.\n\n---\n\n## Challenges Faced\n\n**Building alone is slow.** Every decision — architecture, design, database schema, deployment, SEO — is mine to research, make, and live with. There's no one to catch my mistakes before they become problems.\n\n**I second-guess myself constantly.** Am I solving the right problem? Is this the correct abstraction? Should this be a hook or a context? These questions slow everything down.\n\n**Learning and building at the same time is exhausting.** Some days I spend more time reading documentation than writing code. That's fine — it's necessary — but it means progress is slower than I'd like.\n\n**The Indian proptech space is crowded.** There are players with funding, teams, and years of head start. I am one person. I'm not going to beat them by doing what they do. I have to build something more useful and more trustworthy than what exists.\n\n---\n\n## What I've Learned\n\n**Perfect architecture is a myth.** Every system has compromises. The goal is to build something that works, that you understand, and that can be improved. Inhaby v1.0 had many problems. v1.8 has fewer. Every version will have fewer than the last.\n\n**Write the plan before you write the code.** The times I've skipped this step, I've regretted it. When I write out what I'm going to build — what files change, what the success criteria are, what the failure modes are — the implementation goes faster and the bugs are smaller.\n\n**Read the error messages.** Completely, carefully, from top to bottom. Most of the bugs I've spent hours on were described exactly in the first line of the error.\n\n**Commit early and often.** I've lost work exactly once. Once was enough.\n\n**Ship it.** A finished product that's 80% of what you imagined is more valuable than a perfect product that doesn't exist.\n\n---\n\n## My Daily Engineering Routine\n\nMost days I start in the early afternoon and work until late at night. India Standard Time puts me in a different timezone from most of the developer communities I learn from, which means I often read the morning's Stack Overflow answers at 11pm.\n\nI keep an engineering log for every working session. Not for anyone else — for myself. Writing down what I did, what broke, and what I learned forces me to actually understand it rather than just move past it.\n\nI commit to Git at the end of every session with a descriptive message. The commit history is my changelog and my memory.\n\n---\n\n## Vision for Inhaby\n\nThe long-term vision for Inhaby is a complete, end-to-end rental operating system for India.\n\nToday: tenants find verified properties, book visits, and message owners.\n\nTomorrow: digital lease signing, rent payment processing, maintenance request management, tenancy history as a portable trust signal for future rentals.\n\nEventually: a reputation layer where verified tenants carry their rental history from property to property, and verified owners carry their responsiveness record from tenant to tenant.\n\nThe broker's role is to manufacture trust where none exists. If the platform creates real, verifiable trust — through history, reviews, verification, and guarantees — the broker becomes unnecessary. That's the goal.\n\n---\n\n## Philosophy Toward Product Building\n\nI believe products should do one thing better than anything else before they try to do everything. Inhaby's one thing is: connecting a tenant to a verified, brokerage-free rental. Everything else is secondary until that's genuinely excellent.\n\nI also believe in transparency. The engineering journal exists because I think the process of building — the struggles, the bugs, the 3am rebuilds — is as valuable to share as the final product. There are people trying to build products who would benefit from seeing what the middle of the journey actually looks like, not just the highlight reel.\n\nAnd I believe in being honest about limitations. Inhaby is not a finished product. It is a work in progress built by one person who is learning as he goes. I'd rather say that clearly and be trusted for it than present an image of completeness that isn't real.\n\n---\n\n## Related Articles\n\n- **Engineering:** [How We Built the @inhaby/shared GitHub Package](/blog/engineering/github-packages-inhaby)\n- **Engineering:** [Merging a Landing Page Into a Vite React App](/blog/engineering/landing-page-integration)\n- **Founder Journal:** [Day 003 — I Broke Everything, Then Fixed It Properly](/blog/founder-journal/day-003-rebuilding-architecture)\n\n---\n\n## FAQ\n\n**Q: Who is Genofogu?**\nA: Genofogu is the co-founder of Inhaby, a zero-brokerage property rental platform for India. He is the primary engineer building the platform, working across the tenant app, owner portal, admin panel, and shared infrastructure.\n\n**Q: What is Inhaby?**\nA: Inhaby is a platform that connects tenants directly with verified property owners, eliminating the broker fee from the rental process.\n\n**Q: Is Genofogu a professional software engineer?**\nA: Genofogu is a self-taught developer who learned to code while building Inhaby. He is transparent about learning on the job and documents that process in the Founder Journal.\n\n**Q: Where can I follow Inhaby's progress?**\nA: At /blog/founder-journal for personal reflections, and /blog/engineering for technical deep-dives.\n\n---\n\n## JSON-LD Recommendations\n\n```json\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Person\",\n  \"name\": \"Genofogu\",\n  \"url\": \"https://inhaby.com/founder/genofogu\",\n  \"jobTitle\": \"Co-Founder\",\n  \"worksFor\": {\n    \"@type\": \"Organization\",\n    \"name\": \"Inhaby\",\n    \"url\": \"https://inhaby.com\",\n    \"description\": \"Zero-brokerage property rental platform for India\"\n  },\n  \"description\": \"Co-founder of Inhaby, building a zero-brokerage property rental platform in India.\",\n  \"sameAs\": []\n}\n```",
  "seo": {
    "seoTitle": "Who Is Genofogu? — Co-Founder of Inhaby, the Zero-Brokerage Rental Platform",
    "seoSlug": "about-genofogu",
    "metaTitle": "Who Is Genofogu? — Co-Founder of Inhaby, the Zero-Brokerage Rental Platform",
    "metaDescription": "Meet Genofogu, the co-founder building Inhaby — a zero-brokerage property rental platform in India. An honest introduction: who he is, why he started Inhaby, and what he's learning.",
    "openGraphTitle": "Who Is Genofogu? The Person Building Inhaby",
    "openGraphDesc": "An honest founder introduction — not a press release. Who Genofogu is, why Inhaby exists, and what building a proptech startup from scratch actually looks like.",
    "canonicalUrl": "https://inhaby.com/blog/founder-journal/about-genofogu",
    "primaryCategory": "Founder Journal",
    "secondaryCategory": "Startup Journey",
    "tags": [
      "founder",
      "about",
      "proptech",
      "India",
      "startup",
      "zero brokerage",
      "building in public"
    ],
    "readingTime": "6 minutes",
    "publishedDate": "2026-07-03",
    "updatedDate": "2026-07-03",
    "targetAudience": "Startup Founders, React Developers, Aspiring Entrepreneurs",
    "featuredImage": {
      "url": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200",
      "suggestion": "A photograph-style portrait of a young developer at a desk, looking thoughtfully at a monitor showing a property listing interface. The setting is modest — a home workspace, not a startup office.",
      "alt": "Genofogu, co-founder of Inhaby, at his development workspace building the zero-brokerage rental platform."
    },
    "lsiKeywords": [
      {
        "word": "Genofogu",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "Inhaby founder",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "proptech startup India",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "who is building Inhaby",
        "count": 2,
        "type": "Secondary Keyword"
      },
      {
        "word": "zero brokerage rental startup founder India",
        "count": 2,
        "type": "Secondary Keyword"
      },
      {
        "word": "building a proptech startup alone",
        "count": 2,
        "type": "Secondary Keyword"
      }
    ],
    "geoAeoFeatures": [
      {
        "type": "Direct Answer (AEO)",
        "desc": "Provides a direct explanation matching the key entities for search engines query optimization."
      }
    ]
  }
},
  {
  "id": "github-packages-inhaby-shared",
  "slug": "github-packages-inhaby-shared",
  "title": "How Inhaby Built a GitHub Shared Package to Unify Three React Applications",
  "category": "Engineering",
  "phase": "Phase 6 — Technology & Security Vetting",
  "phaseNum": 6,
  "description": "Learn how Inhaby built @inhaby/shared — a scoped TypeScript package published to GitHub Packages — to share a Supabase client, TypeScript types, and utilities across three independent React applications.",
  "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
  "author": {
    "name": "Genofogu",
    "role": "Co-Founder of Inhaby",
    "avatar": "GF",
    "bio": "Genofogu is the Co-Founder at INHABY, focused on core engineering and scaling infrastructures to support millions of home seekers.",
    "socials": {
      "twitter": "https://twitter.com/inhaby",
      "linkedin": "https://linkedin.com/company/inhaby"
    }
  },
  "publishedDate": "2026-07-03",
  "readingTime": "11 minutes",
  "trending": false,
  "popular": true,
  "tags": [
    "GitHub Packages",
    "TypeScript",
    "monorepo",
    "Supabase",
    "shared package",
    "React",
    "architecture",
    "NPM",
    "SDK"
  ],
  "content": "## The Problem: Three Apps, Three Copies of Everything\n\nWhen building a multi-surface platform — where tenants, property owners, and platform administrators each have their own dedicated application — the temptation is to copy and paste.\n\nThe Supabase client initialisation: copy it. The TypeScript type for `User`, `Property`, `Booking`: copy it. The auth helper that parses Supabase error messages into readable strings: copy it.\n\nThis works. Until it doesn't.\n\nA copied `User` interface in the tenant app diverges from the `User` interface in the owner portal. A bug fix in the auth helper gets applied to two out of three apps. A Supabase URL environment variable is named `VITE_SUPABASE_URL` in the tenant app but `REACT_APP_SUPABASE_URL` in the admin panel.\n\nThese aren't hypothetical problems. They are the concrete problems that emerge when you're moving fast and not thinking about long-term consistency.\n\nThe Inhaby platform consists of three independent React applications:\n\n1. **`inhaby-terent`** — the tenant-facing property discovery and rental management app\n2. **`owner-portal`** — the property owner's listing management and tenant communication app  \n3. **`admin-panel`** — the internal platform administration and moderation dashboard\n\nAll three needed the same Supabase client. All three needed the same TypeScript type definitions. All three shared common validation logic and storage helpers.\n\nThe solution was `@inhaby/shared`.\n\n---\n\n## What @inhaby/shared Is\n\n`@inhaby/shared` is a scoped TypeScript package published to the GitHub Packages registry. It is the single source of truth for:\n\n- **The Supabase client instance** — configured once, used everywhere\n- **TypeScript type definitions** — all data models for the platform: `User`, `Property`, `Booking`, `Visit`, `Conversation`, `Message`, `Notification`, and more\n- **Storage service** — wrapper for Supabase Storage file operations\n- **Auth helpers** — email validation, password validation, Supabase error message parsing\n\nEvery application installs it as a dependency and imports from it as `@inhaby/shared`.\n\n```typescript\nimport { supabase, User, Property, Booking } from '@inhaby/shared';\n```\n\nNo copies. No divergence. One package, rebuilt and reinstalled when changes are needed.\n\n---\n\n## Package Architecture\n\nThe package follows a flat-module structure with a single entry point:\n\n```\nInhaby-Shared/\n├── src/\n│   ├── types/\n│   │   ├── index.ts          ← All TypeScript data models\n│   │   └── env.d.ts          ← Vite environment variable type declarations\n│   ├── database/\n│   │   ├── supabaseClient.ts ← Supabase client initialisation\n│   │   └── storageService.ts ← File upload / signed URL helpers\n│   ├── utils/\n│   │   └── authHelpers.ts    ← Email/password validation, error parsing\n│   └── index.ts              ← Single barrel export\n├── dist/                     ← Compiled output (TypeScript → ESModule JS + .d.ts)\n├── tsconfig.json\n├── package.json\n└── .npmrc                    ← Registry configuration\n```\n\nThe `index.ts` barrel is minimal — it re-exports everything from each module:\n\n```typescript\nexport * from './types';\nexport * from './database/supabaseClient';\nexport * from './database/storageService';\nexport * from './utils/authHelpers';\n```\n\n---\n\n## Type System: All Platform Models in One Place\n\nThe most valuable part of `@inhaby/shared` is the type system. With 239 lines covering every entity on the platform, it ensures that every application speaks the same data language.\n\nKey type definitions include:\n\n```typescript\nexport type UserRoleName = 'super_admin' | 'admin' | 'owner' | 'tenant';\n\nexport interface User {\n  id: string;\n  email: string;\n  name: string;\n  phone: string;\n  avatarUrl: string;\n  role: UserRoleName;\n  isActive: boolean;\n  createdAt: string;\n  lastLogin?: string;\n}\n\nexport type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';\n\nexport interface Booking {\n  id: string;\n  propertyId: string;\n  tenantId: string;\n  startDate: string;\n  endDate?: string;\n  rentAmount: number;\n  depositAmount: number;\n  status: BookingStatus;\n  paymentMethod?: string;\n  createdAt: string;\n}\n```\n\nWhen a `Booking` record is fetched from Supabase in the tenant app and displayed in the owner portal, both applications are working from identical type contracts. TypeScript's compiler enforces this at build time — if the shared type changes, every consuming application gets a compile error until it's updated.\n\n---\n\n## The Supabase Client: Configured Once\n\nThe client initialisation in `supabaseClient.ts` handles a practical problem: different Supabase deployments sometimes use differently-named environment variables. The implementation accepts either `VITE_SUPABASE_ANON_KEY` or `VITE_SUPABASE_PUBLISHABLE_KEY` to be resilient across environments:\n\n```typescript\nimport { createClient } from '@supabase/supabase-js';\n\nconst supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';\nconst supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY \n  || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY \n  || '';\n\nif (!supabaseUrl || !supabaseAnonKey) {\n  console.warn(\n    'Supabase environment variables are missing! Ensure VITE_SUPABASE_URL and either ' +\n    'VITE_SUPABASE_ANON_KEY or VITE_SUPABASE_PUBLISHABLE_KEY are set in your .env file.'\n  );\n}\n\nexport const supabase = createClient(supabaseUrl, supabaseAnonKey);\nexport default supabase;\n```\n\nEach consuming application sets its own `.env` file — the shared package picks up the correct values through Vite's `import.meta.env` at build time. Each application can have independent Supabase project URLs for complete environment separation.\n\n---\n\n## Publishing to GitHub Packages\n\nThe package is scoped to the `@inhaby` organisation and published to the GitHub Packages npm registry.\n\n### Registry configuration (`.npmrc`)\n\n```\n@inhaby:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}\n```\n\nThe `NODE_AUTH_TOKEN` environment variable must be set to a GitHub Personal Access Token (PAT) with `read:packages` scope for installation and `write:packages` scope for publishing.\n\n### `package.json` publish configuration\n\n```json\n{\n  \"name\": \"@inhaby/shared\",\n  \"version\": \"1.0.0\",\n  \"main\": \"./dist/index.js\",\n  \"module\": \"./dist/index.js\",\n  \"types\": \"./dist/index.d.ts\",\n  \"exports\": {\n    \".\": {\n      \"types\": \"./dist/index.d.ts\",\n      \"import\": \"./dist/index.js\",\n      \"default\": \"./dist/index.js\"\n    }\n  },\n  \"publishConfig\": {\n    \"registry\": \"https://npm.pkg.github.com\"\n  },\n  \"files\": [\"dist\"]\n}\n```\n\nThe `exports` map ensures that TypeScript resolvers find type declarations (`.d.ts`) automatically. The `files` field limits the published content to the compiled `dist/` directory — source files are not published.\n\n### Build command\n\n```bash\nnpm run build   # runs tsc\n```\n\nTypeScript compiles `src/` into `dist/` — both `.js` module files and `.d.ts` declaration files are generated. The `tsconfig.json` sets `\"declaration\": true` and `\"declarationMap\": true` for full type information in consuming applications.\n\n---\n\n## Installing in Consuming Applications\n\nDuring development, the package can be installed from a local path (useful before a version is published):\n\n```json\n\"dependencies\": {\n  \"@inhaby/shared\": \"file:../Inhaby-Shared\"\n}\n```\n\nOr, once published to GitHub Packages:\n\n```bash\nnpm install github:genofogu/Inhaby-Shared\n```\n\nConsuming applications require their own `.npmrc` pointing to the GitHub Packages registry with authentication configured. This is set once per development machine or CI environment.\n\n---\n\n## Architecture Diagram\n\n```\nInhaby Platform Architecture\n─────────────────────────────\n\n  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐\n  │  inhaby-terent  │   │  owner-portal   │   │  admin-panel    │\n  │  (Tenant App)   │   │  (Owner App)    │   │  (Admin App)    │\n  └────────┬────────┘   └────────┬────────┘   └────────┬────────┘\n           │                     │                       │\n           └──────────┬──────────┘                       │\n                      └───────────────┬──────────────────┘\n                                      │\n                             @inhaby/shared\n                          ┌────────────────────┐\n                          │  supabase client   │\n                          │  TypeScript types  │\n                          │  storage service   │\n                          │  auth helpers      │\n                          └────────────────────┘\n                                      │\n                              Supabase Backend\n                          ┌────────────────────┐\n                          │  PostgreSQL DB      │\n                          │  Auth              │\n                          │  Storage           │\n                          │  Realtime          │\n                          └────────────────────┘\n```\n\n---\n\n## Challenges\n\n### Challenge 1: `import.meta.env` in a Shared Package\n\nVite processes `import.meta.env` at build time in each consuming application. This means the shared package's `supabaseClient.ts` correctly resolves environment variables from the **consuming application's** `.env` file — not from a `.env` in the shared package itself.\n\nThis is the intended behaviour, but it's non-obvious. The shared package should never contain environment values directly. It should always read from `import.meta.env`, trusting the consuming application to provide them.\n\n**Lesson:** Shared packages that use `import.meta.env` must document clearly that the consuming application is responsible for environment variable configuration.\n\n### Challenge 2: TypeScript `moduleResolution` for ESM Packages\n\nWith `\"module\": \"ESNext\"` and `\"moduleResolution\": \"bundler\"` in the shared package's `tsconfig.json`, consuming applications using older module resolution strategies (`node`, `node16`) may fail to resolve the package.\n\nThe solution was ensuring every consuming application's Vite config was set to use the same `bundler` resolution strategy, which is the default in Vite 4+.\n\n### Challenge 3: Keeping the dist/ Folder Committed\n\nDuring early development, the `dist/` folder must be committed to the repository when consuming applications install with `file:../Inhaby-Shared` path references. Applications importing from a local path need the compiled output present.\n\nFor GitHub Packages releases, this is less relevant — `npm publish` runs the build first and only publishes `dist/`. But locally, forgetting to rebuild the package after making changes is a common source of confusion where changes don't appear in consuming applications.\n\n**Lesson:** Add a `prepare` script to automatically build before install: `\"prepare\": \"npm run build\"`.\n\n---\n\n## Common Mistakes\n\n| Mistake | Impact | Fix |\n|---|---|---|\n| Importing from `@inhaby/shared` without rebuilding after changes | Changes don't appear in consuming apps | Always run `npm run build` in the shared package and `npm install` in consuming apps after changes |\n| Missing `NODE_AUTH_TOKEN` in environment | `npm install` fails for GitHub Packages scoped packages | Set the token in `.env` or CI environment secrets |\n| Forgetting `\"types\"` in `exports` map | TypeScript cannot find type declarations | Add `\"types\": \"./dist/index.d.ts\"` to the `exports` entry |\n| Putting `.env` values directly in the shared package | Credentials leak into source | Always use `import.meta.env` and let consuming apps provide values |\n\n---\n\n## Lessons Learned\n\n**1. Shared packages pay dividends immediately.**\n\nThe first time a type change in the platform propagated to all three apps through a single edit to `@inhaby/shared`, it was clear this was the right architecture. Without the shared package, the same change would require three edits, three code reviews, and the risk of the third app missing the update entirely.\n\n**2. The package boundary forces good design.**\n\nWhen code lives in a shared package, you think more carefully about its API surface. You can't just add a parameter to a function and rely on the rest of the codebase updating itself. The module boundary creates healthy friction.\n\n**3. Local path dependencies are fine for small teams.**\n\nGitHub Packages authentication adds friction. During active early development, `\"@inhaby/shared\": \"file:../Inhaby-Shared\"` is simpler and faster. Migrate to the registry when CI/CD pipelines require it.\n\n**4. Type-only exports are valuable.**\n\nThe `@inhaby/shared` package exports type definitions that carry zero runtime cost — pure TypeScript interfaces. This means the package can be safely imported in any environment without adding bundle weight beyond the actual runtime code (`supabase.ts`, `storageService.ts`, `authHelpers.ts`).\n\n---\n\n## Future Improvements\n\n- **Versioned releases** — Semantic versioning with a changelog so consuming applications can pin to stable versions and upgrade intentionally\n- **CI/CD build pipeline** — Automated build and publish to GitHub Packages on merge to `main`\n- **Expanded utilities** — Date formatters, currency formatters, and address string builders that are currently duplicated across applications\n- **React hooks in the shared package** — `useSupabaseQuery` and `useSupabaseRealtime` hooks that implement standard data-fetching patterns, usable in all three applications\n- **Schema validation** — Zod schemas co-located with TypeScript types for runtime validation as well as compile-time checking\n\n---\n\n## FAQ\n\n**Q: What is GitHub Packages?**\nA: GitHub Packages is a package registry integrated with GitHub. It supports npm, Docker, Maven, and other package formats. Scoped npm packages (like `@inhaby/shared`) can be published and installed with standard npm commands, authenticated via GitHub Personal Access Tokens.\n\n**Q: Can @inhaby/shared be installed without a GitHub account?**\nA: No. GitHub Packages requires authentication with a PAT (Personal Access Token) with `read:packages` scope even for public packages. This is a known limitation compared to the public npm registry.\n\n**Q: Why not publish to the public npm registry instead?**\nA: GitHub Packages is tightly integrated with the Inhaby GitHub organisation, making access control simpler. A public npm registry package would also require a unique global package name and has no authentication requirement, which may not be appropriate for a platform-internal SDK.\n\n**Q: How does the Supabase client get different credentials in different environments?**\nA: Each consuming application (inhaby-terent, owner-portal, admin-panel) has its own `.env` file with its own Supabase project credentials. The shared package reads from `import.meta.env` at build time, so each application's build produces a client configured for its own environment.\n\n**Q: What happens when a type in @inhaby/shared changes?**\nA: All consuming applications that import the changed type will get a TypeScript compile error until they update their usage to match the new type signature. This is intentional — it prevents silent mismatches across applications.\n\n---\n\n## Suggested Internal Links\n\n- [About Inhaby](/about)\n- [Founder Journal: Day 003](/blog/founder-journal/day-003-rebuilding-architecture)\n- [Landing Page Integration Architecture](/blog/engineering/landing-page-integration)\n- [Engineering Blog](/blog/engineering)\n\n## Suggested External References\n\n- [GitHub Packages documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)\n- [Supabase JavaScript client](https://supabase.com/docs/reference/javascript/introduction)\n- [TypeScript project references](https://www.typescriptlang.org/docs/handbook/project-references.html)\n- [npm scoped packages](https://docs.npmjs.com/cli/v10/using-npm/scope)\n\n---\n\n## Suggested Social Caption\n\n> \"Three React apps. One Supabase backend. One shared TypeScript package published to GitHub Packages. Here's how @inhaby keeps its type system consistent across every application in the platform — and why this architecture pays off immediately. 🧵 #TypeScript #React #GitHub #proptech\"\n\n---\n\n## Related Articles\n\n- **Previous:** [Who Is Genofogu?](/blog/founder-journal/about-genofogu)\n- **Next:** [Merging a Landing Page Into a React App — The Right Way](/blog/engineering/landing-page-integration)\n- **Suggested Reading:** [Founder Journal Day 003](/blog/founder-journal/day-003-rebuilding-architecture)\n\n---\n\n## JSON-LD Recommendations\n\n```json\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"TechArticle\",\n  \"headline\": \"How Inhaby Built a GitHub Shared Package to Unify Three React Applications\",\n  \"description\": \"A practical walkthrough of @inhaby/shared — the scoped TypeScript package that powers the Inhaby platform's Supabase client, type system, and shared utilities across every application.\",\n  \"author\": {\n    \"@type\": \"Person\",\n    \"name\": \"Genofogu\",\n    \"url\": \"https://inhaby.com/founder/genofogu\",\n    \"jobTitle\": \"Co-Founder\"\n  },\n  \"publisher\": {\n    \"@type\": \"Organization\",\n    \"name\": \"Inhaby\",\n    \"url\": \"https://inhaby.com\"\n  },\n  \"datePublished\": \"2026-07-03\",\n  \"dateModified\": \"2026-07-03\",\n  \"mainEntityOfPage\": {\n    \"@type\": \"WebPage\",\n    \"@id\": \"https://inhaby.com/blog/engineering/github-packages-inhaby-shared\"\n  },\n  \"keywords\": \"GitHub Packages, TypeScript, monorepo, Supabase, shared package, React, npm\",\n  \"articleSection\": \"Engineering\"\n}\n```\n\n```json\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"FAQPage\",\n  \"mainEntity\": [\n    {\n      \"@type\": \"Question\",\n      \"name\": \"What is GitHub Packages?\",\n      \"acceptedAnswer\": {\n        \"@type\": \"Answer\",\n        \"text\": \"GitHub Packages is a package registry integrated with GitHub that supports npm, Docker, and other package formats. Scoped npm packages can be published and installed with standard npm commands, authenticated via GitHub Personal Access Tokens.\"\n      }\n    },\n    {\n      \"@type\": \"Question\",\n      \"name\": \"How does the Supabase client get different credentials in different environments?\",\n      \"acceptedAnswer\": {\n        \"@type\": \"Answer\",\n        \"text\": \"Each consuming application has its own .env file with its own Supabase project credentials. The shared package reads from import.meta.env at build time, so each application's build produces a client configured for its own environment.\"\n      }\n    },\n    {\n      \"@type\": \"Question\",\n      \"name\": \"What happens when a type in @inhaby/shared changes?\",\n      \"acceptedAnswer\": {\n        \"@type\": \"Answer\",\n        \"text\": \"All consuming applications that import the changed type will get a TypeScript compile error until they update their usage to match the new type signature, preventing silent mismatches across applications.\"\n      }\n    }\n  ]\n}\n```",
  "seo": {
    "seoTitle": "How to Build a Shared GitHub Package for a Multi-App React Monorepo — The Inhaby Case Study",
    "seoSlug": "github-packages-inhaby-shared",
    "metaTitle": "How to Build a Shared GitHub Package for a Multi-App React Monorepo — The Inhaby Case Study",
    "metaDescription": "Learn how Inhaby built @inhaby/shared — a scoped TypeScript package published to GitHub Packages — to share a Supabase client, TypeScript types, and utilities across three independent React applications.",
    "openGraphTitle": "@inhaby/shared: Building a GitHub Packages Shared SDK for a Multi-App React Monorepo",
    "openGraphDesc": "How Inhaby solved shared Supabase configuration, duplicate TypeScript types, and cross-app utility chaos with a single scoped package published to GitHub Packages.",
    "canonicalUrl": "https://inhaby.com/blog/engineering/github-packages-inhaby-shared",
    "primaryCategory": "Engineering",
    "secondaryCategory": "Monorepo & Shared SDK",
    "tags": [
      "GitHub Packages",
      "TypeScript",
      "monorepo",
      "Supabase",
      "shared package",
      "React",
      "architecture",
      "NPM",
      "SDK"
    ],
    "readingTime": "11 minutes",
    "publishedDate": "2026-07-03",
    "updatedDate": "2026-07-03",
    "targetAudience": "Software Engineers, Technical Architects, React Monorepo Developers",
    "featuredImage": {
      "url": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
      "suggestion": "Three React application windows shown side-by-side in a browser, each with a different UI — the tenant app, owner portal, and admin panel — and an arrow pointing from all three to a single box labeled `@inhaby/shared`.",
      "alt": "Three Inhaby React applications (tenant app, owner portal, admin panel) all importing from one shared @inhaby/shared package."
    },
    "lsiKeywords": [
      {
        "word": "GitHub Packages React",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "shared TypeScript package monorepo",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "@inhaby/shared",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "Supabase shared client",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "how to publish a scoped npm package to GitHub Packages",
        "count": 2,
        "type": "Secondary Keyword"
      },
      {
        "word": "shared Supabase client multiple React apps",
        "count": 2,
        "type": "Secondary Keyword"
      },
      {
        "word": "TypeScript monorepo shared package",
        "count": 2,
        "type": "Secondary Keyword"
      },
      {
        "word": "GitHub Packages authentication token setup",
        "count": 2,
        "type": "Secondary Keyword"
      }
    ],
    "geoAeoFeatures": [
      {
        "type": "Direct Answer (AEO)",
        "desc": "Provides a direct explanation matching the key entities for search engines query optimization."
      }
    ]
  }
},
  {
  "id": "landing-page-integration",
  "slug": "landing-page-integration",
  "title": "How Inhaby Merged a Landing Page Into a Vite React App — Without Breaking Authentication",
  "category": "Engineering / Architecture",
  "phase": "Phase 6 — Technology & Security Vetting",
  "phaseNum": 6,
  "description": "Inhaby's engineering team walks through the v1.8 refactor: how to properly separate a public landing website from an authenticated React app inside one Vite project, fix React provider ordering bugs, and guarantee clean logout state.",
  "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
  "author": {
    "name": "Genofogu",
    "role": "Co-Founder of Inhaby",
    "avatar": "GF",
    "bio": "Genofogu is the Co-Founder at INHABY, focused on core engineering and scaling infrastructures to support millions of home seekers.",
    "socials": {
      "twitter": "https://twitter.com/inhaby",
      "linkedin": "https://linkedin.com/company/inhaby"
    }
  },
  "publishedDate": "2026-07-03",
  "readingTime": "14 minutes",
  "trending": false,
  "popular": true,
  "tags": [
    "React",
    "Vite",
    "authentication",
    "routing",
    "architecture",
    "Supabase",
    "refactor",
    "ProtectedRoute",
    "context providers",
    "logout"
  ],
  "content": "## The Problem That Started Everything\n\nWhen a product grows by adding features, the codebase grows with it — sometimes in directions that made sense at the time but create structural problems later.\n\nInhaby's tenant application started as a dashboard. Then a landing page was added. Then both surfaces needed to share authentication, Supabase configuration, and component utilities. The simplest path was to put everything into one Vite project, mount all providers at the root, and handle both public and private routes in one router file.\n\nThis is how v1.7 was born. And this is exactly what created the problems v1.8 had to fix.\n\n---\n\n## The v1.7 Problem Diagnosis\n\n### Problem 1: Providers Mounted Globally\n\nIn v1.7, the application structure at `main.tsx` looked like this:\n\n```tsx\n// v1.7 main.tsx\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <ThemeProvider>\n      <AuthProvider>        {/* ← mounted on the landing page */}\n        <AppStateProvider>  {/* ← mounted on the landing page */}\n          <App />\n        </AppStateProvider>\n      </AuthProvider>\n    </ThemeProvider>\n  </StrictMode>\n);\n```\n\nEvery time a guest visited the landing page at `/`, `AuthProvider` was initialising — running a Supabase session check, setting up an `onAuthStateChange` listener, and returning a React context that the landing page didn't use. `AppStateProvider` was spinning up hooks for notifications, wishlist, visits, bookings, and messages — all for an anonymous visitor.\n\nThis was wasteful and incorrect. The landing page is a public surface. It should have no authentication overhead.\n\n### Problem 2: Stale Authenticated State After Logout\n\nEvery hook that fetched user data — `useNotifications`, `useWishlist`, `useVisits`, `useBookings`, `useMessages` — subscribed to the `user` object through a `useEffect`. When the user logged out, `signOut()` cleared the Supabase session and set `user = null` in the auth context.\n\nBut the hooks had a bug. Their `useEffect` looked like this:\n\n```typescript\n// v1.7 (buggy)\nuseEffect(() => {\n  fetchNotifications();\n}, [user]);\n```\n\nWhen `user` became `null`, the `useEffect` fired — but it just called `fetchNotifications()`, which would fail (no user to fetch for) and resolve with an empty result. Critically, **the existing state was never explicitly cleared**. Until the fetch resolved, the previous user's notifications, wishlist items, and visit requests remained visible in the UI.\n\nIn React DevTools after logout, you could still see the previous user's profile data in the context providers.\n\n### Problem 3: The 1,114-Line Monolith\n\nThe router file — `src/router/AppRouter.tsx` — had grown to 1,114 lines. It handled:\n- Public landing page routes\n- Guest-only auth routes (login, signup, forgot password)\n- Authenticated dashboard routes\n- Property detail routes (both public and private variants)\n- Auth guards with inconsistent implementation\n\nThere was no clean separation between what was public and what required authentication. This made maintenance difficult and made the auth guard logic hard to reason about.\n\n### Problem 4: The Landing Page Header Used an External URL\n\nThe landing page navbar pointed to `https://inhaby.com/login` for the Login button — a hardcoded external URL rather than an internal React Router `<Link to=\"/login\">`. This caused a full page reload on login navigation, losing any React state, and broke the single-page-application navigation model.\n\n---\n\n## The v1.8 Solution: Two Independent React Sub-Trees\n\nThe core insight behind v1.8 is simple:\n\n> **A React context provider should only be mounted where its consumers live.**\n\nIf `AuthProvider` is only consumed by the authenticated tenant application, it should only be mounted inside the authenticated tenant application — not above the entire router.\n\n### The New Architecture\n\n```\nmain.tsx\n  ThemeProvider            ← only truly global concern: theming\n    BrowserRouter\n      RootRouter\n        \"/\" → LandingApp           ← no auth context\n        \"/login\" → LoginPage       ← no auth context (checks session directly)\n        \"/app/*\" → ProtectedRoute\n                     TenantApp\n                       AuthProvider     ← mounted only for /app\n                         AppStateProvider ← mounted only for /app\n                           AppRouter\n                             AppShell\n                               AppHeader\n                               <Outlet />\n```\n\nThe `RootRouter` splits all traffic into three zones:\n\n| Zone | Path | Context providers | Who can access |\n|---|---|---|---|\n| Landing | `/`, `/demo`, `/pricing`, `/blog`, etc. | `ThemeProvider` only | Everyone |\n| Auth | `/login`, `/signup`, `/forgot-password`, `/reset-password` | `ThemeProvider` only | Guests only (redirect if session exists) |\n| App | `/app/*` | `ThemeProvider` + `AuthProvider` + `AppStateProvider` | Authenticated users only |\n\n---\n\n## The ProtectedRoute Problem: A Critical Ordering Bug\n\nThe most common mistake when implementing this pattern is writing a `ProtectedRoute` that calls `useAuth()`:\n\n```tsx\n// ❌ WRONG — will crash\nexport const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {\n  const { user, loading } = useAuth(); // ← cannot work: AuthProvider is a child, not a parent\n  // ...\n};\n```\n\nThis crashes with: **`useAuth must be used within an AuthProvider`**\n\nWhy? Because `AuthProvider` lives **inside** `TenantApp`, which is the *child* that `ProtectedRoute` is guarding. The context doesn't exist above the guard — it exists inside the guarded content.\n\nThe correct implementation reads Supabase directly, the same way the `GuestRoute` (which guards the login/signup pages) works:\n\n```tsx\n// ✅ CORRECT\nexport const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {\n  const [loading, setLoading] = useState(true);\n  const [hasSession, setHasSession] = useState(false);\n  const location = useLocation();\n\n  useEffect(() => {\n    // Read Supabase directly — no React context required\n    supabase.auth.getSession().then(({ data: { session } }) => {\n      setHasSession(!!session);\n      setLoading(false);\n    });\n\n    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {\n      setHasSession(!!session);\n      if (!session) setLoading(false);\n    });\n\n    return () => { subscription.unsubscribe(); };\n  }, []);\n\n  if (loading) return <Spinner />;\n  \n  if (!hasSession) {\n    // Preserve intended destination for post-login redirect\n    return <Navigate to=\"/\" state={{ from: location }} replace />;\n  }\n\n  return <>{children}</>;\n};\n```\n\nThe key: `ProtectedRoute` is a **pre-context** component. It runs before any auth context exists. It must use Supabase's SDK directly.\n\n---\n\n## The Logout Guarantee: Two Layers\n\nLogout is one of the hardest things to get right in a React auth system. Inhaby v1.8 uses a two-layer approach.\n\n### Layer 1: Architectural Guarantee (Primary)\n\nBecause `AuthProvider` and `AppStateProvider` are mounted **inside** `TenantApp`, and `TenantApp` is a child of `ProtectedRoute`, when logout navigates to `/`, React unmounts the entire `TenantApp` sub-tree.\n\nWhen a component tree unmounts:\n- All `useState` values are destroyed\n- All `useEffect` cleanup functions run (unsubscribing from Supabase Realtime, clearing intervals, etc.)\n- All context values are garbage collected\n- All hook closures are released\n\nNo explicit cleanup code is needed. The architecture provides the guarantee automatically.\n\n### Layer 2: Hook-Level Explicit Clearing (Defence in Depth)\n\nThere is a brief race window between `signOut()` resolving and React completing the unmount cycle. During this window, a stale render could serve old data. To prevent this, every hook explicitly clears its state when `user` becomes `null`:\n\n```typescript\n// useNotifications.ts\nuseEffect(() => {\n  if (!user) {\n    setNotifications([]); // ← explicit clear\n    return;\n  }\n  fetchNotifications();\n}, [user]);\n```\n\nAll five data hooks received this treatment:\n\n| Hook | State cleared on `user → null` |\n|---|---|\n| `useNotifications` | `setNotifications([])` |\n| `useWishlist` | `setSavedIds(new Set())` |\n| `useVisits` | `setVisitRequests([])` |\n| `useBookings` | `setActiveTenancy(null)`, `setPendingBookings([])`, `setPastBookings([])` |\n| `useMessages` | `setUnreadChatsCount(0)`, `setOpenMsgPropertyId(null)`, `setIsMobileChatActive(false)` |\n\n`AppContext.tsx` also received a cleanup `useEffect` for non-hook state (location, booking modal, search query, and localStorage keys):\n\n```typescript\nuseEffect(() => {\n  if (!user) {\n    setActiveLocation({ name: '', area: '', city: '', pincode: '' });\n    setIsBookVisitModalOpen(false);\n    setBookingPropertyId(null);\n    setChosenBookingMsg('');\n    setSearchQuery('');\n    localStorage.removeItem('homstay-active-location');\n    localStorage.removeItem('homstay-recent-viewed');\n  }\n}, [user]);\n```\n\n---\n\n## The Logout Sequence (Complete)\n\nWhen a user clicks Logout in the Inhaby tenant app, the following sequence occurs:\n\n```\n1. supabase.auth.signOut()\n   → Invalidates session on Supabase server\n   → Clears sb-* keys from localStorage\n\n2. AuthContext sets user = null, profile = null\n\n3. Hooks detect user → null (Layer 2)\n   → useNotifications: setNotifications([])\n   → useWishlist: setSavedIds(new Set())\n   → useVisits: setVisitRequests([])\n   → useBookings: clears tenancy and booking arrays\n   → useMessages: clears chat count and active state\n\n4. AppContext detects user → null (Layer 2)\n   → Clears location, booking modal, search state\n   → Removes localStorage keys\n\n5. navigate('/') executes\n   → React Router navigates to root\n\n6. ProtectedRoute re-evaluates\n   → supabase.auth.getSession() returns null\n   → hasSession = false\n   → Renders <Navigate to=\"/\" replace />\n\n7. React unmounts TenantApp tree (Layer 1)\n   → AuthProvider unmounted\n   → AppStateProvider unmounted\n   → All hooks destroyed\n   → All Supabase subscriptions unsubscribed\n   → All memory freed\n\n8. LandingApp mounts\n   → No auth context\n   → Guest experience\n```\n\n---\n\n## Header Ownership: A Hard Architectural Contract\n\nOne of the less-obvious decisions in the refactor was formalising the header ownership contract. Two headers exist:\n\n| Header | File location | Allowed in | Forbidden in |\n|---|---|---|---|\n| `LandingHeader` | `src/landing/components/LandingHeader.tsx` | Landing pages only | App shell, authenticated routes |\n| `AppHeader` | `src/app/layouts/AppHeader.tsx` | AppShell only | Landing pages, landing router |\n\nThis is enforced by file location. `LandingHeader` is in `src/landing/` — a directory with no dependency on `AppContext`. It cannot import anything from `src/app/`. `AppHeader` is in `src/app/layouts/` — it can depend on `AppContext` and authenticated-only hooks.\n\nThe `LandingHeader` is self-contained:\n- Uses `supabase.auth.getSession()` directly (no auth context)\n- If a session exists: shows an \"Open App →\" button linking to `/app`\n- If no session: shows Login (`<Link to=\"/login\">`) and Signup (`<Link to=\"/signup\">`) links\n- No notifications badge, wishlist count, or profile dropdown\n\n---\n\n## SEO Considerations: Two Surfaces, Two Strategies\n\nThe architectural separation has direct SEO implications.\n\n**Landing pages** (`/`, `/pricing`, `/blog`, `/demo`, etc.) are fully server-renderable. They contain no auth-gated content. They should be indexed with standard meta tags, Open Graph data, and structured data (Organization, FAQPage, BlogPosting). The landing surface is the SEO surface.\n\n**App pages** (`/app/*`) are authenticated. Search engines should not index them. All `/app/*` routes should include:\n\n```html\n<meta name=\"robots\" content=\"noindex, nofollow\" />\n```\n\nAnd Supabase's public auth callback route (`/auth/callback`) should similarly be excluded from indexing.\n\nThe architectural separation — landing at `/`, app at `/app/*` — makes this robots policy trivially easy to implement: block `*/app/*` in `robots.txt`, and allow everything else.\n\n```\n# robots.txt\nUser-agent: *\nDisallow: /app/\nDisallow: /auth/\n\nSitemap: https://inhaby.com/sitemap.xml\n```\n\n---\n\n## File Change Summary\n\n### New Files\n\n| File | Purpose |\n|---|---|\n| `src/router/RootRouter.tsx` | Top-level route split: landing vs auth vs app |\n| `src/auth/ProtectedRoute.tsx` | Auth guard using Supabase directly (no useAuth) |\n| `src/auth/OAuthCallback.tsx` | Handles Supabase OAuth redirect completion |\n| `src/landing/LandingApp.tsx` | Landing layout shell (LandingHeader + Footer + Outlet) |\n| `src/landing/components/LandingHeader.tsx` | Public-only header with internal React Router links |\n| `src/app/App.tsx` | TenantApp: mounts AuthProvider + AppStateProvider |\n| `src/app/router/AppRouter.tsx` | Dashboard routes extracted from old monolith |\n| `src/app/layouts/AppShell.tsx` | Sidebar + AppHeader + BottomNav + Outlet |\n| `src/app/layouts/AppHeader.tsx` | Authenticated header assembling existing components |\n\n### Modified Files\n\n| File | Change |\n|---|---|\n| `src/main.tsx` | Remove AuthProvider, AppStateProvider from root |\n| `src/app/AppContext.tsx` | Add logout reset useEffect + useBookings integration |\n| `src/hooks/useNotifications.ts` | Clear state on user → null |\n| `src/hooks/useWishlist.ts` | Clear state on user → null |\n| `src/hooks/useVisits.ts` | Clear state on user → null |\n| `src/hooks/useBookings.ts` | Clear state on user → null |\n| `src/hooks/useMessages.ts` | Clear state on user → null |\n\n### Deleted Files\n\n| File | Reason |\n|---|---|\n| `src/layouts/PublicLayout.tsx` | Replaced by `LandingApp.tsx` |\n| `src/router/AppRouter.tsx` (1114-line monolith) | Split into `RootRouter.tsx` + `AppRouter.tsx` |\n\n---\n\n## Build Verification\n\nAfter all changes were applied, the project was verified with:\n\n```bash\nnpx tsc --noEmit   # Zero TypeScript errors\nnpm run build      # ✓ built in 21.36s, 2388 modules transformed\n```\n\nNo TypeScript errors. No build failures. The refactor is additive — no existing component was rewritten, no UI was changed. Only routing, layout wrappers, and provider placement changed.\n\n---\n\n## Architecture Diagram: Before and After\n\n```\nBEFORE (v1.7)\n─────────────\nmain.tsx\n└── ThemeProvider\n    └── AuthProvider         ← GLOBAL (runs on landing page)\n        └── AppStateProvider ← GLOBAL (runs on landing page)\n            └── BrowserRouter\n                └── AppRouter (1114 lines)\n                    ├── PublicLayout\n                    │   ├── Route: /\n                    │   ├── Route: /demo\n                    │   └── Route: /pricing\n                    ├── Route: /login\n                    ├── Route: /signup\n                    └── DashboardLayout (auth guard inline)\n                        ├── Route: /app\n                        ├── Route: /app/wishlist\n                        └── ...\n\nAFTER (v1.8)\n────────────\nmain.tsx\n└── ThemeProvider\n    └── BrowserRouter\n        └── RootRouter\n            ├── Route: /  →  LandingApp\n            │                 └── LandingHeader\n            │                     LandingRoutes\n            │                     Footer\n            │\n            ├── GuestRoute: /login, /signup, ...\n            │   └── LoginPage / SignupPage / ...\n            │\n            └── ProtectedRoute: /app/*\n                └── TenantApp\n                    └── AuthProvider    ← SCOPED to /app\n                        └── AppStateProvider ← SCOPED to /app\n                            └── AppRouter\n                                └── AppShell\n                                    ├── AppHeader\n                                    ├── Sidebar\n                                    ├── BottomNav\n                                    └── AppRoutes\n```\n\n---\n\n## Common Mistakes and How to Avoid Them\n\n| Mistake | Symptom | Fix |\n|---|---|---|\n| Calling `useAuth()` inside `ProtectedRoute` | `useAuth must be used within an AuthProvider` crash | Read Supabase directly via `getSession()` in `ProtectedRoute` |\n| Leaving `AuthProvider` at root level | Auth state initialises on landing page; logout doesn't fully unmount | Move `AuthProvider` inside the authenticated sub-tree |\n| Not clearing hook state on `user → null` | Previous user's data visible briefly after logout | Add `if (!user) { clearState(); return; }` to every hook's `useEffect([user])` |\n| Using hardcoded external URLs in landing page nav | Full page reload on login/signup navigation | Replace external links with `<Link to=\"/login\">` from React Router |\n| Sharing the same header component between landing and app | Auth state bleeds into landing page header | Create separate `LandingHeader` and `AppHeader` in separate directories |\n\n---\n\n## Lessons Learned\n\n**1. Providers as close to consumers as possible is not a guideline — it's a correctness requirement.**\n\nMounting `AuthProvider` globally wasn't just inefficient. It created the stale logout state bug and the incorrect auth overhead on public pages. The principle \"mount providers where their consumers are\" is a correctness constraint, not a performance optimisation.\n\n**2. A `ProtectedRoute` that uses auth context is architecturally impossible when that context is inside the protected sub-tree.**\n\nThis sounds obvious. It is not obvious until you make the mistake. The rule: if a guard wraps a provider, the guard cannot use that provider. Read Supabase directly instead.\n\n**3. Monolithic router files are a maintenance risk.**\n\nA 1,114-line file that handles public routing, auth routing, and dashboard routing cannot be understood at a glance. When it needs to change, every change is a potential regression. Split router files by concern, not by size.\n\n**4. Architecture is the most reliable cleanup mechanism.**\n\nYou can write cleanup code in every hook. Or you can structure the component tree so that cleanup happens automatically when the tree unmounts. The architectural approach requires no explicit cleanup code and has no race conditions.\n\n**5. The build is the final arbiter.**\n\nAfter the refactor, 2,388 modules were transformed with zero errors. That number is meaningful: it means the import graph is clean, the types are consistent, and the module boundaries are respected. Running `npm run build` after every significant change catches integration issues that TypeScript alone misses.\n\n---\n\n## Future Plans\n\n- **Property detail public route** (`/property/:slug`) currently exists inside `/app/*`. Future work will evaluate moving it to the landing zone as a truly public, indexable page — with an \"I'm interested\" CTA that redirects guests to `/signup?redirectTo=/property/:slug`.\n- **Route-based code splitting** — The `index-CkLU8IG6.js` chunk is 1.4MB (384KB gzipped). `React.lazy()` is used for several components but further splitting of the main bundle is planned.\n- **OAuth callback explicit handling** — The current `OAuthCallback.tsx` is minimal. A future version will parse the OAuth state, extract the intended `redirectTo` destination, and route the user precisely after authentication.\n- **Sitemaps** — With the architectural separation between `/` (landing) and `/app/*` (authenticated), generating a sitemap covering only public URLs becomes straightforward.\n\n---\n\n## FAQ\n\n**Q: What is the main architectural change in Inhaby v1.8?**\nA: The primary change is moving `AuthProvider` and `AppStateProvider` from the root of the application (where they ran on every page including the landing page) to inside the authenticated sub-tree at `/app/*`. This ensures auth state only exists where it's needed and is automatically cleaned up on logout.\n\n**Q: Why did ProtectedRoute crash with \"useAuth must be used within an AuthProvider\"?**\nA: `ProtectedRoute` wraps `TenantApp`, and `AuthProvider` lives inside `TenantApp`. When `ProtectedRoute` called `useAuth()`, the context didn't exist — it was a child of the component, not a parent. The fix is to read Supabase's session directly in `ProtectedRoute` instead of using the React context.\n\n**Q: How does Inhaby guarantee no stale data after logout?**\nA: Two layers. First, the architecture: because `AuthProvider` unmounts with `TenantApp` on logout, all hook state is destroyed by React automatically. Second, explicit hook cleanup: every data hook clears its state when `user` becomes `null`, covering the brief race window between `signOut()` resolving and the unmount completing.\n\n**Q: Can this architecture work with React Router v6?**\nA: Yes. This entire implementation uses React Router v6 (`Routes`, `Route`, `Navigate`, `Outlet`, `useNavigate`). The nested route pattern — with layout components as route elements and `<Outlet />` for child routes — is a React Router v6 feature.\n\n**Q: What is GuestRoute?**\nA: `GuestRoute` is the inverse of `ProtectedRoute`. It guards the login, signup, and forgot-password pages — if a session already exists, it redirects to `/app`. This prevents authenticated users from accidentally landing on the login page.\n\n**Q: How does SEO work with this architecture?**\nA: Landing pages at `/` and its sub-paths are fully public and should be indexed normally. App pages at `/app/*` should be excluded from search indexing via `robots.txt` and `<meta name=\"robots\" content=\"noindex\">`. The URL structure makes this trivial to implement.\n\n---\n\n## Suggested Internal Links\n\n- [About Inhaby](/about)\n- [Founder Journal: Day 003 — I Rebuilt Everything](/blog/founder-journal/day-003-rebuilding-architecture)\n- [How @inhaby/shared Unifies Three React Apps](/blog/engineering/github-packages-inhaby-shared)\n\n## Suggested External References\n\n- [React Context documentation](https://react.dev/reference/react/createContext)\n- [React Router v6 — Outlet](https://reactrouter.com/en/main/components/outlet)\n- [Supabase Auth — onAuthStateChange](https://supabase.com/docs/reference/javascript/auth-onauthstatechange)\n- [Vite environment variables](https://vite.dev/guide/env-and-mode)\n\n---\n\n## Suggested Social Caption\n\n> \"We had a 1114-line router file, auth state leaking into the landing page, and stale user data surviving logout. This is the story of how we rebuilt it — and the two most important rules for React auth architecture. 🧵 #React #Vite #Authentication #OpenSource #proptech\"\n\n---\n\n## Related Articles\n\n- **Previous:** [How @inhaby/shared Unifies Three React Applications](/blog/engineering/github-packages-inhaby-shared)\n- **Next:** Upcoming — Property Detail Page Architecture\n- **Suggested Reading:** [Founder Journal Day 003](/blog/founder-journal/day-003-rebuilding-architecture)\n\n---\n\n## JSON-LD Recommendations\n\n```json\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"TechArticle\",\n  \"headline\": \"How Inhaby Merged a Landing Page Into a Vite React App Without Breaking Authentication\",\n  \"description\": \"Detailed engineering walkthrough of the Inhaby v1.8 refactor: separating a public landing website from an authenticated React app in one Vite project, fixing React provider ordering bugs, and guaranteeing clean logout state.\",\n  \"author\": {\n    \"@type\": \"Person\",\n    \"name\": \"Genofogu\",\n    \"url\": \"https://inhaby.com/founder/genofogu\",\n    \"jobTitle\": \"Co-Founder\"\n  },\n  \"publisher\": {\n    \"@type\": \"Organization\",\n    \"name\": \"Inhaby\",\n    \"url\": \"https://inhaby.com\"\n  },\n  \"datePublished\": \"2026-07-03\",\n  \"dateModified\": \"2026-07-03\",\n  \"mainEntityOfPage\": {\n    \"@type\": \"WebPage\",\n    \"@id\": \"https://inhaby.com/blog/engineering/landing-page-integration\"\n  },\n  \"keywords\": \"React, Vite, authentication, ProtectedRoute, landing page, routing, Supabase, provider ordering, logout\",\n  \"articleSection\": \"Engineering\"\n}\n```\n\n```json\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"FAQPage\",\n  \"mainEntity\": [\n    {\n      \"@type\": \"Question\",\n      \"name\": \"Why did ProtectedRoute crash with useAuth must be used within an AuthProvider?\",\n      \"acceptedAnswer\": {\n        \"@type\": \"Answer\",\n        \"text\": \"ProtectedRoute wraps TenantApp, and AuthProvider lives inside TenantApp. When ProtectedRoute called useAuth(), the context did not exist yet — it was a child of the component, not a parent. The fix is to read Supabase's session directly in ProtectedRoute instead of using the React context.\"\n      }\n    },\n    {\n      \"@type\": \"Question\",\n      \"name\": \"How does Inhaby guarantee no stale data after logout?\",\n      \"acceptedAnswer\": {\n        \"@type\": \"Answer\",\n        \"text\": \"Two layers. First, the architecture: because AuthProvider unmounts with TenantApp on logout, all hook state is destroyed by React automatically. Second, explicit hook cleanup: every data hook clears its state when user becomes null, covering the brief race window between signOut() resolving and the unmount completing.\"\n      }\n    },\n    {\n      \"@type\": \"Question\",\n      \"name\": \"What is the main architectural change in Inhaby v1.8?\",\n      \"acceptedAnswer\": {\n        \"@type\": \"Answer\",\n        \"text\": \"Moving AuthProvider and AppStateProvider from the application root to inside the authenticated sub-tree at /app/*. This ensures auth state only exists where needed and is automatically cleaned up on logout when React unmounts the entire TenantApp tree.\"\n      }\n    }\n  ]\n}\n```",
  "seo": {
    "seoTitle": "How to Merge a Landing Page Into a React Vite App Without Breaking Auth — Inhaby v1.8 Refactor",
    "seoSlug": "landing-page-integration",
    "metaTitle": "How to Merge a Landing Page Into a React Vite App Without Breaking Auth — Inhaby v1.8 Refactor",
    "metaDescription": "Inhaby's engineering team walks through the v1.8 refactor: how to properly separate a public landing website from an authenticated React app inside one Vite project, fix React provider ordering bugs, and guarantee clean logout state.",
    "openGraphTitle": "Merging a Landing Page Into a React App Without Breaking Auth: The Inhaby v1.8 Story",
    "openGraphDesc": "One monolithic AppRouter. Five stale-state logout bugs. One 1114-line file. Here's how Inhaby rebuilt the architecture cleanly — and what every React developer should know about provider ordering.",
    "canonicalUrl": "https://inhaby.com/blog/engineering/landing-page-integration",
    "primaryCategory": "Engineering / Architecture",
    "secondaryCategory": "Monorepo & Shared SDK",
    "tags": [
      "React",
      "Vite",
      "authentication",
      "routing",
      "architecture",
      "Supabase",
      "refactor",
      "ProtectedRoute",
      "context providers",
      "logout"
    ],
    "readingTime": "14 minutes",
    "publishedDate": "2026-07-03",
    "updatedDate": "2026-07-03",
    "targetAudience": "Software Engineers, Technical Architects, React Monorepo Developers",
    "featuredImage": {
      "url": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
      "suggestion": "A split-screen diagram showing two React component trees side by side — on the left, the \"Before\" tree with AuthProvider wrapping the entire app including the landing page; on the right, the \"After\" tree with AuthProvider scoped only to the /app/* sub-tree.",
      "alt": "Before and after React component tree diagram showing AuthProvider moved from global scope to only wrapping the authenticated /app/* sub-tree in the Inhaby v1.8 refactor."
    },
    "lsiKeywords": [
      {
        "word": "React Vite landing page auth",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "React provider ordering",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "logout stale state React",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "Vite multi-app architecture",
        "count": 2,
        "type": "Primary Keyword"
      },
      {
        "word": "how to separate landing page from authenticated React app",
        "count": 2,
        "type": "Secondary Keyword"
      },
      {
        "word": "React context provider ordering problem",
        "count": 2,
        "type": "Secondary Keyword"
      },
      {
        "word": "fix stale state after logout React",
        "count": 2,
        "type": "Secondary Keyword"
      },
      {
        "word": "Vite project two applications one build",
        "count": 2,
        "type": "Secondary Keyword"
      },
      {
        "word": "ProtectedRoute AuthProvider ordering error",
        "count": 2,
        "type": "Secondary Keyword"
      }
    ],
    "geoAeoFeatures": [
      {
        "type": "Direct Answer (AEO)",
        "desc": "Provides a direct explanation matching the key entities for search engines query optimization."
      }
    ]
  }
},
];
