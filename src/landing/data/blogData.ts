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
  content?: string; // Loaded dynamically
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

// Lightweight registry with metadata (no content bodies)
export const BLOG_ARTICLES: Omit<BlogArticle, 'content'>[] = [
  {
    "id": "scams-guide",
    "slug": "the-zero-brokerage-revolution",
    "title": "The Zero Brokerage Revolution: How to Rent a House in India Safely and Avoid Common Scams",
    "category": "Safety",
    "phase": "Phase 1 — Building Trust",
    "phaseNum": 1,
    "description": "Ditch the traditional broker. Learn the exact step-by-step security checks, land deed verifications, and red flags needed to rent in major Indian metros safely without paying a single rupee in commission.",
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Ishan Sharma",
      "role": "Chief of Trust & Security",
      "avatar": "IS",
      "bio": "Ishan is a former real-estate compliance attorney with 10+ years of legal advisory experience in landlord-tenant disputes and tenancy reform in India. He leads INHABY's compliance frameworks.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "June 15, 2026",
    "readingTime": "8 min read",
    "trending": true,
    "popular": true,
    "tags": [
      "No Brokerage",
      "Rental Scams",
      "Legal Safeguards"
    ],
    "seo": {
      "seoTitle": "Renting in India Without Brokerage: The Ultimate Safe Rental Guide",
      "seoSlug": "renting-in-india-without-brokerage-safe-rental-guide",
      "metaTitle": "Renting in India Without Brokerage: Safe House Hunting Guide (INHABY)",
      "metaDescription": "Looking to rent a house in India without brokerage? Read our masterclass guide on identifying rental scams, verifying land deeds, and connecting directly with owners.",
      "openGraphTitle": "The Zero Brokerage Revolution: Renting Safely in India's Metro Cities",
      "openGraphDesc": "Avoid middlemen and rental fraud. Learn the step-by-step framework to verify landlords, register secure agreements, and rent directly from genuine owners.",
      "canonicalUrl": "https://inhaby.com/blog/the-zero-brokerage-revolution",
      "primaryCategory": "Safety",
      "secondaryCategory": "Legal & Verification",
      "tags": [
        "No Brokerage",
        "Rental Scams India",
        "Safe House Hunting",
        "Rent Agreements",
        "Bangalore Renting"
      ],
      "readingTime": "8 min read",
      "publishedDate": "June 15, 2026",
      "updatedDate": "June 25, 2026",
      "targetAudience": "Working Professionals, Students, Families, and Property Owners in India",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "High-contrast editorial image showing a tenant shaking hands with a smiling homeowner inside a modern, naturally lit apartment in India.",
        "alt": "Direct tenant and owner direct handshake verifying a rental agreement in Bangalore India"
      },
      "lsiKeywords": [
        {
          "word": "renting without brokerage",
          "count": 4,
          "type": "Primary Keyword"
        },
        {
          "word": "safe house hunting in Bangalore",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "rental scams India",
          "count": 3,
          "type": "Secondary Keyword"
        },
        {
          "word": "verified rental properties",
          "count": 2,
          "type": "Semantic/LSI Keyword"
        },
        {
          "word": "zero brokerage rent",
          "count": 2,
          "type": "Semantic/LSI Keyword"
        },
        {
          "word": "municipal land deed",
          "count": 2,
          "type": "Technical Entity"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Answers 'Why traditional Indian real estate relies on brokers?' in a clear 55-word direct snippet block with clear question definition, ideal for Google AI Overviews and Featured Snippets."
        },
        {
          "type": "Structured Comparisons (GEO)",
          "desc": "Includes high-contrast Markdown Comparison Tables matching 'Traditional Brokers vs. INHABY Direct Model' to help AI systems confidently structure summaries."
        },
        {
          "type": "Factual EEAT Indicators",
          "desc": "Avoids loose generalizations. References specific government-standard documents (Municipal Property Tax Receipt, Registered Purchase Deed, Rent Control Act, Model Tenancy Act)."
        }
      ]
    }
  },
  {
    "id": "why-renting-is-broken-india",
    "slug": "why-renting-is-broken-india",
    "title": "Why Renting is Still Broken in India: Middleman Monopolies and Information Gaps",
    "category": "Market Analysis",
    "phase": "Phase 1 — Building Trust",
    "phaseNum": 1,
    "description": "The structural crisis in India's rental sector. Understand how information hoarding, fake listings, and high-pressure broker cartels keep tenant and owner experiences broken.",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Ishan Sharma",
      "role": "Chief of Trust & Security",
      "avatar": "IS",
      "bio": "Ishan is a former real-estate compliance attorney with 10+ years of legal advisory experience in landlord-tenant disputes and tenancy reform in India. He leads INHABY's compliance frameworks.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "June 22, 2026",
    "readingTime": "7 min read",
    "trending": true,
    "popular": false,
    "tags": [
      "Market Analysis",
      "Real Estate Industry",
      "Indian Metros"
    ],
    "seo": {
      "seoTitle": "Why Renting is Broken in India: Middleman Monopolies Revealed",
      "seoSlug": "why-renting-is-broken-india",
      "metaTitle": "Why Renting is Broken in India: Market Problems (INHABY)",
      "metaDescription": "An in-depth look at the structural monopolies, fake listing loops, and artificial scarcity keeping the Indian rental ecosystem broken for tenants.",
      "openGraphTitle": "The Structural Crisis in Indian Home Rentals",
      "openGraphDesc": "Why does house hunting in Indian metros feel so frustrating? We expose the real reasons behind broker control and stale listings.",
      "canonicalUrl": "https://inhaby.com/blog/why-renting-is-broken-india",
      "primaryCategory": "Market Analysis",
      "secondaryCategory": "Industry Secrets",
      "tags": [
        "Real Estate India",
        "Rent Crisis",
        "Metros Renting",
        "No Brokers"
      ],
      "readingTime": "7 min read",
      "publishedDate": "June 22, 2026",
      "updatedDate": "June 22, 2026",
      "targetAudience": "Urban Renters, Modern Landlords, Tech Professionals in India",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "A wide-angle, high-contrast shot of crowded Indian urban skylines representing the dense, competitive metro rental markets.",
        "alt": "Crowded urban housing buildings in an Indian metro city like Bangalore"
      },
      "lsiKeywords": [
        {
          "word": "why renting is broken in India",
          "count": 3,
          "type": "Primary Keyword"
        },
        {
          "word": "house hunting in Pune",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "broker cartels India",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "direct owner rental",
          "count": 3,
          "type": "Semantic/LSI Keyword"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Answers 'Why do standard rental apps feel cluttered and untrustworthy in India?' in a focused 50-word summary, optimized for quick snippets."
        }
      ]
    }
  },
  {
    "id": "hidden-brokerage-fees",
    "slug": "hidden-brokerage-fees-revealed",
    "title": "The Hidden Costs of Rental Brokerages: What You're Really Paying For",
    "category": "Budgeting",
    "phase": "Phase 1 — Building Trust",
    "phaseNum": 1,
    "description": "Break down the true financial math of renting with standard brokers. Learn about hidden 'convenience fees', inflated renewal charges, and how to protect your budget.",
    "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Rohan Das",
      "role": "Tenant Relations Manager",
      "avatar": "RD",
      "bio": "Rohan has assisted thousands of young tech professionals find secure, zero-brokerage homes in Bangalore, Mumbai, and Pune. He specializes in budget optimization and tenant advocacy.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "June 26, 2026",
    "readingTime": "6 min read",
    "trending": false,
    "popular": true,
    "tags": [
      "Brokerage Fees",
      "Financial Planning",
      "Budgeting Tips"
    ],
    "seo": {
      "seoTitle": "The Hidden Costs of Real Estate Brokers Exposed",
      "seoSlug": "hidden-brokerage-fees-revealed",
      "metaTitle": "Hidden Brokerage Costs: The Real Financial Math (INHABY)",
      "metaDescription": "Exposing the hidden financial trap of real estate brokers in Indian cities. Learn how middlemen inflate stamp duties, renewal fees, and agreements.",
      "openGraphTitle": "What Are You Really Paying a Rental Broker For?",
      "openGraphDesc": "It's not just one month's rent. Uncover the secret charges, agreement markups, and renewal commission loops brokers don't want you to know about.",
      "canonicalUrl": "https://inhaby.com/blog/hidden-brokerage-fees-revealed",
      "primaryCategory": "Budgeting",
      "secondaryCategory": "Consumer Protection",
      "tags": [
        "Rental Fees",
        "Save Money",
        "Urban Housing",
        "Indian Metros"
      ],
      "readingTime": "6 min read",
      "publishedDate": "June 26, 2026",
      "updatedDate": "June 26, 2026",
      "targetAudience": "Working Professionals, Budget Conscious Tenants, Indian Renters",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "A clear photo showing financial charts, a calculator, and a set of apartment keys, symbolizing prudent financial budgeting.",
        "alt": "Budgeting calculator and keys representing the financial planning of a rental home"
      },
      "lsiKeywords": [
        {
          "word": "hidden costs of rental brokerage",
          "count": 3,
          "type": "Primary Keyword"
        },
        {
          "word": "how to avoid broker fees in Pune",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "11 month rent agreement fees",
          "count": 2,
          "type": "Technical Entity"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Explains if brokerage is a one-time fee in major metros, highlighting the renewal and stamp markups."
        }
      ]
    }
  },
  {
    "id": "inhaby-6-step-verification-system",
    "slug": "inhaby-6-step-verification-system",
    "title": "Behind Every Verified Property: INHABY’s Rigorous 6-Step Verification System",
    "category": "Verification",
    "phase": "Phase 2 — Verification",
    "phaseNum": 2,
    "description": "A transparent look into how we verify properties. Explore our 6-step framework combining Aadhaar match, municipal land deeds, and physical geolocation audits.",
    "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Meera Nair",
      "role": "Senior Legal Counsel",
      "avatar": "MN",
      "bio": "Meera is an expert in property deeds, local municipal registration compliance, and title verification laws in India. She manages INHABY's automated and manual vetting processes.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "June 28, 2026",
    "readingTime": "9 min read",
    "trending": true,
    "popular": true,
    "tags": [
      "Verification",
      "Platform Trust",
      "Property Deeds"
    ],
    "seo": {
      "seoTitle": "INHABY property verification 6-step trust standard",
      "seoSlug": "inhaby-6-step-verification-system",
      "metaTitle": "INHABY Property Verification: The 6-Step Trust Standard",
      "metaDescription": "How we verify properties at INHABY. Read our detailed guide on land deed audits, Aadhaar checks, physical site visits, and CGI filters.",
      "openGraphTitle": "Inside INHABY's 6-Step Verification System",
      "openGraphDesc": "No fake owners, no CGI, no scams. How we audit every landlord's title deed and physically inspect properties to protect you.",
      "canonicalUrl": "https://inhaby.com/blog/inhaby-6-step-verification-system",
      "primaryCategory": "Verification",
      "secondaryCategory": "Legal Compliance",
      "tags": [
        "Property Vetting",
        "No Scam Real Estate",
        "Land Deeds",
        "India Renting"
      ],
      "readingTime": "9 min read",
      "publishedDate": "June 28, 2026",
      "updatedDate": "June 28, 2026",
      "targetAudience": "Landlords, Tech Tenants, Real Estate Legal Professionals",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "A close-up high-quality shot of a legal property seal and document checklist representing legal safety.",
        "alt": "Legal document stamps and real estate folders"
      },
      "lsiKeywords": [
        {
          "word": "6-step property verification",
          "count": 4,
          "type": "Primary Keyword"
        },
        {
          "word": "municipal tax receipt audit",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "no CGI rentals",
          "count": 2,
          "type": "Secondary Keyword"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Explains the difference between automated checkbox verification and INHABY's strict 6-step document-and-inspection audit."
        }
      ]
    }
  },
  {
    "id": "legal-deeds",
    "slug": "verify-rental-property-land-deeds",
    "title": "How to Legally Verify a Rental Property: Vetting Land Deeds and Ownership",
    "category": "Legal",
    "phase": "Phase 2 — Verification",
    "phaseNum": 2,
    "description": "Discover the critical legal checks: how to verify Municipal Property Tax receipts, Registered Sale Deeds, and Power of Attorney documents before signing any tenancy contract in India.",
    "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800",
    "author": {
      "name": "Meera Nair",
      "role": "Senior Legal Counsel",
      "avatar": "MN",
      "bio": "Meera is an expert in property deeds, local municipal registration compliance, and title verification laws in India. She manages INHABY's automated and manual vetting processes.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "June 20, 2026",
    "readingTime": "6 min read",
    "trending": true,
    "popular": true,
    "tags": [
      "Land Deeds",
      "Property Verification",
      "Legal Checklists"
    ],
    "seo": {
      "seoTitle": "How to Legally Verify a Rental Property: Land Deeds Check",
      "seoSlug": "verify-rental-property-land-deeds",
      "metaTitle": "Legally Verify Rental Property: Vetting Land Deeds (INHABY)",
      "metaDescription": "Exposing how to check municipal land deeds, property tax receipts, and registered sale deeds before signing any rental agreement in India.",
      "openGraphTitle": "The Legal Guide to Vetting Landlords & Property Ownership",
      "openGraphDesc": "Don't get scammed. Learn how to verify property tax receipts, sale deeds, and registered Power of Attorneys before paying any deposit.",
      "canonicalUrl": "https://inhaby.com/blog/verify-rental-property-land-deeds",
      "primaryCategory": "Legal",
      "secondaryCategory": "Property Verification",
      "tags": [
        "Real Estate Law",
        "Verify Landlord",
        "No Scams",
        "Urban Renting"
      ],
      "readingTime": "6 min read",
      "publishedDate": "June 20, 2026",
      "updatedDate": "June 20, 2026",
      "targetAudience": "Working Professionals, Urban Tenancy Legal Vetting, Families",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800",
        "suggestion": "A crisp macro photo of a signature line on a real estate deed with legal documents in the background.",
        "alt": "Legal real estate sale deeds and ownership documents on a desk"
      },
      "lsiKeywords": [
        {
          "word": "how to legally verify rental property",
          "count": 3,
          "type": "Primary Keyword"
        },
        {
          "word": "registered purchase deed check",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "BBMP property tax receipt search",
          "count": 2,
          "type": "Technical Entity"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Provides a precise 50-word direct answer on why tenants must demand landlord ownership deeds to avoid illegal subletting."
        }
      ]
    }
  },
  {
    "id": "move-in-tech",
    "slug": "ultimate-tech-tenant-move-in-checklist",
    "title": "Relocating to Bangalore or Pune? The Ultimate Tech-Tenant Move-In Checklist",
    "category": "Rental Guides",
    "phase": "Phase 4 — Tenant Education",
    "phaseNum": 4,
    "description": "From optical fiber internet speed guarantees and green-certified solar energy meters to piped gas installations and society NOC regulations, here is a complete guide tailored for tech professionals.",
    "image": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800",
    "author": {
      "name": "Rohan Das",
      "role": "Tenant Relations Manager",
      "avatar": "RD",
      "bio": "Rohan has assisted thousands of young tech professionals find secure, zero-brokerage homes in Bangalore, Mumbai, and Pune. He specializes in budget optimization and tenant advocacy.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "June 12, 2026",
    "readingTime": "5 min read",
    "trending": false,
    "popular": true,
    "tags": [
      "Co-living",
      "Move-in Checklist",
      "Smart Homes"
    ],
    "seo": {
      "seoTitle": "Tech Tenant Relocation Move-In Checklist Bangalore Pune",
      "seoSlug": "ultimate-tech-tenant-move-in-checklist",
      "metaTitle": "Tech Tenant Move-In Checklist: Bangalore & Pune (INHABY)",
      "metaDescription": "The ultimate move-in checklist for software engineers and tech professionals relocating to Bangalore, Hyderabad, or Pune. Fiber internet, backups, and NOCs.",
      "openGraphTitle": "Relocating for Tech? The Ultimate Move-In Checklist",
      "openGraphDesc": "A complete guide to tech infrastructure checks, society approvals, and utilities for modern software engineers relocating to major tech hubs.",
      "canonicalUrl": "https://inhaby.com/blog/ultimate-tech-tenant-move-in-checklist",
      "primaryCategory": "Rental Guides",
      "secondaryCategory": "Relocation Tips",
      "tags": [
        "Bangalore Renting",
        "Pune Techies",
        "Gigabit Internet",
        "Power Backup"
      ],
      "readingTime": "5 min read",
      "publishedDate": "June 12, 2026",
      "updatedDate": "June 12, 2026",
      "targetAudience": "Software Engineers, Product Managers, Relocating Professionals",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800",
        "suggestion": "A naturally-lit modern workspace setup inside an urban Indian apartment, symbolizing a productive tech home.",
        "alt": "Modern home office setup inside a Bangalore rental flat"
      },
      "lsiKeywords": [
        {
          "word": "tech tenant move in checklist",
          "count": 3,
          "type": "Primary Keyword"
        },
        {
          "word": "ACT fibernet Bangalore rental",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "society NOC bachelor tenants",
          "count": 2,
          "type": "Secondary Keyword"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Explains how tech workers can verify fiber internet and power backup routing during move-in audits."
        }
      ]
    }
  },
  {
    "id": "model-tenancy",
    "slug": "model-tenancy-act-tenant-rights",
    "title": "Understanding the Model Tenancy Act: Your Fundamental Eviction & Repair Rights",
    "category": "Legal",
    "phase": "Phase 4 — Tenant Education",
    "phaseNum": 4,
    "description": "An in-depth analysis of the new federal Model Tenancy Act. Understand your core rights regarding sudden rent hikes, emergency eviction procedures, and mandatory landlord maintenance obligations.",
    "image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
    "author": {
      "name": "Ishan Sharma",
      "role": "Chief of Trust & Security",
      "avatar": "IS",
      "bio": "Ishan is a former real-estate compliance attorney with 10+ years of legal advisory experience in landlord-tenant disputes and tenancy reform in India. He leads INHABY's compliance frameworks.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "May 28, 2026",
    "readingTime": "10 min read",
    "trending": true,
    "popular": false,
    "tags": [
      "Model Tenancy Act",
      "Tenant Rights",
      "Eviction Law"
    ],
    "seo": {
      "seoTitle": "Understanding the Model Tenancy Act Tenant Rights India",
      "seoSlug": "model-tenancy-act-tenant-rights",
      "metaTitle": "Model Tenancy Act Guide: Tenant Rights & Eviction (INHABY)",
      "metaDescription": "An in-depth legal analysis of the Model Tenancy Act of India. Learn your rights about security deposit caps, eviction procedures, and utility protection.",
      "openGraphTitle": "A Tenant's Guide to the Model Tenancy Act of India",
      "openGraphDesc": "Sudden rent hikes? Exorbitant security deposits? Know how the federal Model Tenancy Act protects you from arbitrary landlord practices.",
      "canonicalUrl": "https://inhaby.com/blog/model-tenancy-act-tenant-rights",
      "primaryCategory": "Legal",
      "secondaryCategory": "Government Acts",
      "tags": [
        "Model Tenancy Act",
        "Tenant Rights India",
        "Rental Law",
        "BBMP Tenants"
      ],
      "readingTime": "10 min read",
      "publishedDate": "May 28, 2026",
      "updatedDate": "May 28, 2026",
      "targetAudience": "Law Students, Real Estate Investors, Urban Tenants, Landlords",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
        "suggestion": "A high-quality image of the scales of justice next to a lease document, symbolizing balanced legal protection.",
        "alt": "Scales of justice and real estate tenancy agreement"
      },
      "lsiKeywords": [
        {
          "word": "model tenancy act tenant rights",
          "count": 4,
          "type": "Primary Keyword"
        },
        {
          "word": "how to dispute sudden rent hikes",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "residential security deposit cap",
          "count": 2,
          "type": "Technical Entity"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Explains the residential deposit cap (2 months) and the 3-month written rent increase notice under the MTA."
        }
      ]
    }
  },
  {
    "id": "co-living-student",
    "slug": "student-housing-co-living-vs-flatshares",
    "title": "Student Housing Secrets: Co-Living Hubs vs. Traditional Flatshares",
    "category": "Student Housing",
    "phase": "Phase 4 — Tenant Education",
    "phaseNum": 4,
    "description": "We weigh the legal flexibility, utility overheads, security deposit rules, and community amenities of premium student co-living spaces against traditional group apartment shares.",
    "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    "author": {
      "name": "Meera Nair",
      "role": "Senior Legal Counsel",
      "avatar": "MN",
      "bio": "Meera is an expert in property deeds, local municipal registration compliance, and title verification laws in India. She manages INHABY's automated and manual vetting processes.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "May 15, 2026",
    "readingTime": "7 min read",
    "trending": false,
    "popular": false,
    "tags": [
      "Student Living",
      "Flatsharing",
      "Co-Living"
    ],
    "seo": {
      "seoTitle": "Student Housing Secrets Co Living vs Flatshares India",
      "seoSlug": "student-housing-co-living-vs-flatshares",
      "metaTitle": "Student Housing Guide: Co-Living vs. Flatshares (INHABY)",
      "metaDescription": "We analyze student housing options in India. Discover whether managed co-living spaces or traditional flatshares fit your student budget and lifestyle.",
      "openGraphTitle": "Student Housing Secrets: Co-Living vs. Flatsharing",
      "openGraphDesc": "Moving to Bangalore, Delhi, or Pune for college? We break down the upfront costs, deposits, and lifestyle of co-living spaces vs flatshares.",
      "canonicalUrl": "https://inhaby.com/blog/student-housing-co-living-vs-flatshares",
      "primaryCategory": "Student Housing",
      "secondaryCategory": "Housing Hacks",
      "tags": [
        "Student Living",
        "Co Living Bangalore",
        "Delhi North Campus",
        "Bachelor Flats"
      ],
      "readingTime": "7 min read",
      "publishedDate": "May 15, 2026",
      "updatedDate": "May 15, 2026",
      "targetAudience": "University Students, Parents, Young Interns, Relocating Graduates",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
        "suggestion": "A high-energy, modern co-living space showing student desks and natural lighting, representing study-friendly spaces.",
        "alt": "Modern student co-living study area"
      },
      "lsiKeywords": [
        {
          "word": "student housing co living vs flatshares",
          "count": 3,
          "type": "Primary Keyword"
        },
        {
          "word": "student PG in Viman Nagar Pune",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "low deposit student rooms",
          "count": 2,
          "type": "Semantic/LSI Keyword"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Contrasts the single bundled fee of co-living with the split-overhead layout of traditional flatsharing."
        }
      ]
    }
  },
  {
    "id": "deposit-negotiation",
    "slug": "how-to-negotiate-security-deposit",
    "title": "How to Negotiate Your Security Deposit Down in Premium Society Complexes",
    "category": "Budgeting",
    "phase": "Phase 4 — Tenant Education",
    "phaseNum": 4,
    "description": "Avoid paying a massive 10-month rental advance. Use these three legal negotiation scripts to cap your security deposit to a standard 2 to 3 months and secure paint deduction clauses.",
    "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    "author": {
      "name": "Rohan Das",
      "role": "Tenant Relations Manager",
      "avatar": "RD",
      "bio": "Rohan has assisted thousands of young tech professionals find secure, zero-brokerage homes in Bangalore, Mumbai, and Pune. He specializes in budget optimization and tenant advocacy.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "April 30, 2026",
    "readingTime": "6 min read",
    "trending": false,
    "popular": true,
    "tags": [
      "Security Deposit",
      "Negotiation Scripts",
      "Financial Tips"
    ],
    "seo": {
      "seoTitle": "How to Negotiate Security Deposit Down Bangalore India",
      "seoSlug": "how-to-negotiate-security-deposit",
      "metaTitle": "Security Deposit Negotiation: Scripts & Tips (INHABY)",
      "metaDescription": "Exposing the three proven negotiation scripts to reduce your rental security deposit in Bangalore, Mumbai, or Pune. Use the Model Tenancy Act to protect your budget.",
      "openGraphTitle": "Reduce Your Security Deposit: Legal Negotiation Scripts",
      "openGraphDesc": "Don't pay 10 months in advance. Learn how to negotiate security deposits down to 2 or 3 months using corporate records and tenancy laws.",
      "canonicalUrl": "https://inhaby.com/blog/how-to-negotiate-security-deposit",
      "primaryCategory": "Budgeting",
      "secondaryCategory": "Tenancy Rights",
      "tags": [
        "Rent Savings",
        "Security Deposit Hacks",
        "Indian Housing Boards",
        "Corporate Tenants"
      ],
      "readingTime": "6 min read",
      "publishedDate": "April 30, 2026",
      "updatedDate": "April 30, 2026",
      "targetAudience": "Working Professionals, Corporate Tenants, Young Graduates",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
        "suggestion": "A close-up shot of a signature on a clean tenancy contract, representing successful negotiation.",
        "alt": "Signing negotiated rent agreement document"
      },
      "lsiKeywords": [
        {
          "word": "negotiate security deposit in Bangalore",
          "count": 3,
          "type": "Primary Keyword"
        },
        {
          "word": "Model Tenancy Act deposit limit",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "how to avoid painting deductions",
          "count": 2,
          "type": "Semantic/LSI Keyword"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Explains why Bangalore landlords demand high deposits and how the Model Tenancy Act limits this to 2 months."
        }
      ]
    }
  },
  {
    "id": "why-we-built-landing-page-first",
    "slug": "why-we-built-landing-page-first",
    "title": "Why We Built a Landing Page Instead of Forcing Login: Our Friction-Free Philosophy",
    "category": "Product & Design",
    "phase": "Phase 5 — Product Development",
    "phaseNum": 5,
    "description": "Read about the product decisions behind the INHABY user experience. We explore why forcing account creation hides value, and why transparency must start before signup.",
    "image": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Rohan Das",
      "role": "Tenant Relations Manager",
      "avatar": "RD",
      "bio": "Rohan has assisted thousands of young tech professionals find secure, zero-brokerage homes in Bangalore, Mumbai, and Pune. He specializes in budget optimization and tenant advocacy.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "June 25, 2026",
    "readingTime": "5 min read",
    "trending": false,
    "popular": false,
    "tags": [
      "Product Philosophy",
      "UX Design",
      "Frictionless UX"
    ],
    "seo": {
      "seoTitle": "Why We Built a Landing Page Instead of Forcing Login",
      "seoSlug": "why-we-built-landing-page-first",
      "metaTitle": "Frictionless Property Search: Why We Don't Force Logins (INHABY)",
      "metaDescription": "Exposing the product decisions behind INHABY. Why we choose transparent, login-free exploration over aggressive signup gates and lead-gen spam.",
      "openGraphTitle": "Why We Don't Force You to Login to View Rental Properties",
      "openGraphDesc": "Fewer gates, more trust. Discover how our friction-free, transparency-first UX philosophy protects your data and simplifies your rental search.",
      "canonicalUrl": "https://inhaby.com/blog/why-we-built-landing-page-first",
      "primaryCategory": "Product & Design",
      "secondaryCategory": "UX Philosophy",
      "tags": [
        "Frictionless UX",
        "Privacy First",
        "Real Estate Tech",
        "User Trust"
      ],
      "readingTime": "5 min read",
      "publishedDate": "June 25, 2026",
      "updatedDate": "June 25, 2026",
      "targetAudience": "Product Designers, Startup Founders, Tech Savvy Renters",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "A clean, modern user interface mockup representing flawless aesthetic layout.",
        "alt": "Frictionless minimalist website interface design mockup"
      },
      "lsiKeywords": [
        {
          "word": "why we built a landing page first",
          "count": 3,
          "type": "Primary Keyword"
        },
        {
          "word": "how to find houses without registering",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "anti-spam rental portal",
          "count": 2,
          "type": "Semantic/LSI Keyword"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Details why traditional platforms force early OTP gates and how INHABY's model prevents broker marketing spam."
        }
      ]
    }
  },
  {
    "id": "ai-in-property-verification",
    "slug": "ai-in-property-verification",
    "title": "AI in Property Verification: Computer Vision, OCR, and Human-in-the-Loop Vetting",
    "category": "Technology",
    "phase": "Phase 6 — Technology",
    "phaseNum": 6,
    "description": "Go behind the scenes of our verification engine. Discover how we utilize Gemini models for document OCR, structural photo validation, and fraud detection, backed by human auditors.",
    "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Ishan Sharma",
      "role": "Chief of Trust & Security",
      "avatar": "IS",
      "bio": "Ishan is a former real-estate compliance attorney with 10+ years of legal advisory experience in landlord-tenant disputes and tenancy reform in India. He leads INHABY's compliance frameworks.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "June 27, 2026",
    "readingTime": "8 min read",
    "trending": false,
    "popular": false,
    "tags": [
      "Artificial Intelligence",
      "Real Estate Technology",
      "Computer Vision"
    ],
    "seo": {
      "seoTitle": "AI Property Verification: OCR, Computer Vision & Vetting",
      "seoSlug": "ai-in-property-verification",
      "metaTitle": "AI in Property Vetting: Documents & CGI Filters (INHABY)",
      "metaDescription": "An in-depth look at how INHABY utilizes machine learning, structured OCR, and computer vision to verify land deeds and block deceptive listings.",
      "openGraphTitle": "How AI Powers INHABY's Property Verification System",
      "openGraphDesc": "A deep-dive into the OCR document scanners, CGI photo filters, and human audits that keep our zero-brokerage listings scam-free.",
      "canonicalUrl": "https://inhaby.com/blog/ai-in-property-verification",
      "primaryCategory": "Technology",
      "secondaryCategory": "AI Vetting",
      "tags": [
        "AI Real Estate",
        "Gemini OCR",
        "Computer Vision",
        "Scam Protection"
      ],
      "readingTime": "8 min read",
      "publishedDate": "June 27, 2026",
      "updatedDate": "June 27, 2026",
      "targetAudience": "Software Developers, Real Estate Tech Investors, Landlords",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "A high-tech digital render showing abstract code and geometric structures representing secure technology.",
        "alt": "Secure cloud server network abstract rendering"
      },
      "lsiKeywords": [
        {
          "word": "AI in property verification",
          "count": 3,
          "type": "Primary Keyword"
        },
        {
          "word": "OCR land deed extraction",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "anti-CGI filter real estate",
          "count": 2,
          "type": "Semantic/LSI Keyword"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Details the dual-verification layout using structured OCR to cross-reference deeds and identity records."
        }
      ]
    }
  },
  {
    "id": "the-future-of-renting",
    "slug": "future-of-renting-smart-homes-ai",
    "title": "The Future of Renting: Smart Homes, AI Assistants, and Digital Rental Identities",
    "category": "Future Vision",
    "phase": "Phase 8 — Future Vision",
    "phaseNum": 8,
    "description": "Explore where INHABY is heading. We look at smart-contract leases, real-time energy dashboards, and a portable 'rental credit score' that eliminates cash deposit burdens.",
    "image": "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Ishan Sharma",
      "role": "Chief of Trust & Security",
      "avatar": "IS",
      "bio": "Ishan is a former real-estate compliance attorney with 10+ years of legal advisory experience in landlord-tenant disputes and tenancy reform in India. He leads INHABY's compliance frameworks.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "June 28, 2026",
    "readingTime": "8 min read",
    "trending": false,
    "popular": false,
    "tags": [
      "Future Vision",
      "Smart Homes",
      "Rental Credit"
    ],
    "seo": {
      "seoTitle": "The Future of Renting: Smart Homes and AI Lease Agreements",
      "seoSlug": "future-of-renting-smart-homes-ai",
      "metaTitle": "The Future of Renting: Smart Homes & AI (INHABY)",
      "metaDescription": "Discover INHABY's long-term product roadmap. Learn about portable rental credit scores, smart smart-contracts, and zero security deposit rentals.",
      "openGraphTitle": "Digital Tenancies: The Future of Renting in India",
      "openGraphDesc": "No more paper leases, no more 10-month cash deposits. Discover how technology, smart locks, and portable rental identities will redefine renting.",
      "canonicalUrl": "https://inhaby.com/blog/future-of-renting-smart-homes-ai",
      "primaryCategory": "Future Vision",
      "secondaryCategory": "Housing Innovation",
      "tags": [
        "Digital Rental ID",
        "Smart Homes India",
        "PropTech",
        "Zero Deposit"
      ],
      "readingTime": "8 min read",
      "publishedDate": "June 28, 2026",
      "updatedDate": "June 28, 2026",
      "targetAudience": "Real Estate Tech Innovators, Tech Renters, Forward Thinking Landlords",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "A modern smart-home interior with digital displays, representing next-generation connectivity.",
        "alt": "Modern connected smart home living room setup"
      },
      "lsiKeywords": [
        {
          "word": "future of renting in India",
          "count": 3,
          "type": "Primary Keyword"
        },
        {
          "word": "portable rental credit score",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "smart contract rent agreement",
          "count": 2,
          "type": "Semantic/LSI Keyword"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Outlines how a portable rental credit identity removes the multi-month security deposit cash burden."
        }
      ]
    }
  },
  {
    "id": "day-29-building-company",
    "slug": "day-29-building-company",
    "title": "Building Inhaby — Day 29: The Day We Stopped Building Features and Started Building a Company",
    "category": "Founders Diary",
    "phase": "Phase 3 — Scale & Security",
    "phaseNum": 3,
    "description": "Most startup updates celebrate shiny new features. Today wasn't one of those days. Today was about architecture, debugging, authentication, deployment strategy, and making decisions that determine whether Inhaby can support millions of people.",
    "image": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Vikram Dev",
      "role": "CTO & Co-Founder",
      "avatar": "VD",
      "bio": "Vikram is the co-founder and CTO at INHABY. He loves building highly-scalable cloud architectures, monorepos, and developer tools.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "June 29, 2026",
    "readingTime": "5 min read",
    "trending": true,
    "popular": true,
    "tags": [
      "Startup Architecture",
      "Supabase",
      "Founders Diary",
      "Monorepo"
    ],
    "seo": {
      "seoTitle": "Building Inhaby Day 29: Architecture, Debugging, and Scaling SDK",
      "seoSlug": "day-29-building-company",
      "metaTitle": "Building Inhaby — Day 29: Building @inhaby/shared SDK",
      "metaDescription": "Learn how we shifted Inhaby from custom features to a robust company architecture with @inhaby/shared, resolved Supabase auth bugs, and built a dynamic booking pipeline.",
      "openGraphTitle": "Inhaby Day 29: Building a Scalable Startup Monorepo Package",
      "openGraphDesc": "From copy-pasting code to creating @inhaby/shared. How we redesigned Inhaby's shared SDK, solved Supabase authentication blocks, and fixed real property booking issues.",
      "canonicalUrl": "https://inhaby.com/blog/day-29-building-company",
      "primaryCategory": "Founders Diary",
      "secondaryCategory": "Engineering",
      "tags": [
        "Monorepo",
        "Supabase Auth",
        "Startup Architecture",
        "GitHub Packages"
      ],
      "readingTime": "5 min read",
      "publishedDate": "June 29, 2026",
      "updatedDate": "June 29, 2026",
      "targetAudience": "Founders, Developers, Technical Product Managers, PropTech Enthusiasts",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "A technical terminal and modern dev setup symbolizing professional package publishing and compiler success.",
        "alt": "Modern developer code editor displaying compiled packages"
      },
      "lsiKeywords": [
        {
          "word": "monorepo shared package",
          "count": 3,
          "type": "Primary Keyword"
        },
        {
          "word": "Supabase auth admin login",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "dynamic property rental search",
          "count": 2,
          "type": "Semantic/LSI Keyword"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Describes the architecture shift of modularizing shared code into @inhaby/shared to prevent scaling bottlenecks in multitenant structures."
        }
      ]
    }
  },
  {
    "id": "engineering-milestone-scaling-foundation",
    "slug": "engineering-milestone-scaling-foundation",
    "title": "Engineering Milestone: Building the Foundation That Will Scale Inhaby to Millions",
    "category": "Engineering",
    "phase": "Phase 3 — Scale & Security",
    "phaseNum": 3,
    "description": "Today's work wasn't about adding another page or another button. It was about redesigning Inhaby's entire software architecture so that the platform can continue growing without becoming impossible to maintain.",
    "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Genofogu",
      "role": "Co-Founder",
      "avatar": "GF",
      "bio": "Genofogu is the Co-Founder at INHABY, focused on core engineering and scaling infrastructures to support millions of home seekers.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "June 29, 2026",
    "readingTime": "6 min read",
    "trending": false,
    "popular": true,
    "tags": [
      "Engineering",
      "Startup Architecture",
      "Scaling",
      "GitHub Packages"
    ],
    "seo": {
      "seoTitle": "Engineering Milestone: Building Inhaby's Shared SDK Foundation",
      "seoSlug": "engineering-milestone-scaling-foundation",
      "metaTitle": "Engineering Milestone: Building Inhaby's @inhaby/shared Foundation",
      "metaDescription": "Read about how we redesigned Inhaby's architecture to scale to millions of users by building @inhaby/shared, resolving administrative logins, and fixing viewing pipelines.",
      "openGraphTitle": "Inhaby Engineering Milestone: Scaling to Millions",
      "openGraphDesc": "How we centralized Inhaby's authentication, database, and storage helpers into versioned GitHub Packages.",
      "canonicalUrl": "https://inhaby.com/blog/engineering-milestone-scaling-foundation",
      "primaryCategory": "Engineering",
      "secondaryCategory": "Startup Architecture",
      "tags": [
        "Monorepo",
        "TypeScript",
        "GitHub Packages",
        "Supabase Architecture"
      ],
      "readingTime": "6 min read",
      "publishedDate": "June 29, 2026",
      "updatedDate": "June 29, 2026",
      "targetAudience": "Technical Leads, CTOs, PropTech Developers, Monorepo Enthusiasts",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "A deep abstract technical background representing cloud infrastructure, binary compilation, or high-performance computer architectures.",
        "alt": "Complex server room networking cables and microcontrollers representing enterprise scale software"
      },
      "lsiKeywords": [
        {
          "word": "shared typescript package",
          "count": 3,
          "type": "Primary Keyword"
        },
        {
          "word": "Supabase authentication pipeline",
          "count": 2,
          "type": "Secondary Keyword"
        },
        {
          "word": "GitHub Packages private registry",
          "count": 2,
          "type": "Semantic/LSI Keyword"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Explains how the centralization of business logic inside @inhaby/shared improves maintainability and guarantees zero runtime type discrepancies between React applications."
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
  {
    "id": "cloudinary-media-migration",
    "slug": "cloudinary-media-migration",
    "title": "Moving Inhaby Property Media to Cloudinary",
    "category": "Engineering",
    "phase": "Phase 5 — Performance Tuning",
    "phaseNum": 5,
    "description": "A deep dive into Inhaby's transition from our custom canvas-based Media-Engine to a streamlined Cloudinary direct upload architecture, optimizing responsive asset loading across tenant, owner, and admin surfaces.",
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Inhaby Tech Division",
      "role": "Engineering & Core Infrastructure",
      "avatar": "ITD",
      "bio": "The core engineering team behind Inhaby's shared SDK, database tuning, and API platforms.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "August 13, 2026",
    "readingTime": "7 min read",
    "trending": true,
    "popular": true,
    "tags": [
      "Cloudinary",
      "Image Optimization",
      "React",
      "Supabase"
    ],
    "seo": {
      "seoTitle": "Moving Proptech Property Media to Cloudinary — Inhaby Case Study",
      "seoSlug": "cloudinary-media-migration",
      "metaTitle": "Moving Proptech Property Media to Cloudinary — Inhaby Case Study",
      "metaDescription": "How Inhaby migrated from a custom local canvas compression/AI quality verifier tool to Cloudinary direct upload pipelines, reducing database footprint.",
      "openGraphTitle": "Moving Proptech Property Media to Cloudinary — Inhaby Case Study",
      "openGraphDesc": "How Inhaby migrated from a custom local canvas compression/AI quality verifier tool to Cloudinary direct upload pipelines, reducing database footprint.",
      "canonicalUrl": "https://inhaby.com/blog/engineering/cloudinary-media-migration",
      "primaryCategory": "Engineering",
      "secondaryCategory": "Image Optimization",
      "tags": [
        "Cloudinary",
        "Image Optimization",
        "React",
        "Supabase"
      ],
      "readingTime": "7 min read",
      "publishedDate": "2026-08-13",
      "updatedDate": "2026-08-13",
      "targetAudience": "Software Engineers, React Developers, Proptech Builders",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "Cloudinary dashboard showing media uploads.",
        "alt": "Cloudinary asset dashboard representation"
      },
      "lsiKeywords": [
        {
          "word": "property image upload Cloudinary",
          "count": 3,
          "type": "Primary"
        },
        {
          "word": "real estate image optimization",
          "count": 2,
          "type": "Secondary"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Explains how Inhaby migrated custom local media checks to a direct Cloudinary pipeline."
        }
      ]
    }
  },
  {
    "id": "one-to-one-chat-architecture",
    "slug": "one-to-one-chat-architecture",
    "title": "Redesigning Inhaby Chat Architecture: Strictly Enforcing 1-to-1 User Conversations",
    "category": "Engineering",
    "phase": "Phase 4 — Transactional & Engagement",
    "phaseNum": 4,
    "description": "A technical breakdown of Inhaby's transition from property-linked chat threads to a strict participant-pair messaging model, including database deduplication procedures and concurrency locks.",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Inhaby Tech Division",
      "role": "Engineering & Core Infrastructure",
      "avatar": "ITD",
      "bio": "The core engineering team behind Inhaby's shared SDK, database tuning, and API platforms.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "August 13, 2026",
    "readingTime": "8 min read",
    "trending": true,
    "popular": true,
    "tags": [
      "Chat Redesign",
      "Supabase",
      "1-to-1 Messaging",
      "Database Constraint"
    ],
    "seo": {
      "seoTitle": "Redesigning Chat to a Strict 1-to-1 Architecture — Inhaby Case Study",
      "seoSlug": "one-to-one-chat-architecture",
      "metaTitle": "Redesigning Chat to a Strict 1-to-1 Architecture — Inhaby Case Study",
      "metaDescription": "How Inhaby overhauled its messaging system to merge property inquiries and visit requests into a single WhatsApp-style 1-to-1 chat thread.",
      "openGraphTitle": "Redesigning Chat to a Strict 1-to-1 Architecture — Inhaby Case Study",
      "openGraphDesc": "How Inhaby overhauled its messaging system to merge property inquiries and visit requests into a single WhatsApp-style 1-to-1 chat thread.",
      "canonicalUrl": "https://inhaby.com/blog/engineering/one-to-one-chat-architecture",
      "primaryCategory": "Engineering",
      "secondaryCategory": "Messaging Systems",
      "tags": [
        "Chat Redesign",
        "Supabase",
        "1-to-1 Messaging",
        "Database Constraint"
      ],
      "readingTime": "8 min read",
      "publishedDate": "2026-08-13",
      "updatedDate": "2026-08-13",
      "targetAudience": "Database Administrators, Full-stack Developers, React Engineers",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "Inbox interface showing users list.",
        "alt": "Inbox user list representation"
      },
      "lsiKeywords": [
        {
          "word": "rental chat 1-to-1 architecture",
          "count": 3,
          "type": "Primary"
        },
        {
          "word": "Supabase unique constraint",
          "count": 2,
          "type": "Secondary"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Explains how the unique constraint forces a single chat thread per tenant/owner pair."
        }
      ]
    }
  },
  {
    "id": "removing-demo-data-standardization",
    "slug": "removing-demo-data-standardization",
    "title": "Removing Demo Data from a Real Production Proptech Product",
    "category": "Engineering",
    "phase": "Phase 1 — Building Trust",
    "phaseNum": 1,
    "description": "The engineering rationale and implementation log behind purging Unsplash mock image fallbacks, clearing static property arrays, and establishing neutral placeholders across Inhaby.",
    "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Inhaby Tech Division",
      "role": "Engineering & Core Infrastructure",
      "avatar": "ITD",
      "bio": "The core engineering team behind Inhaby's shared SDK, database tuning, and API platforms.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "August 13, 2026",
    "readingTime": "5 min read",
    "trending": false,
    "popular": true,
    "tags": [
      "Clean Code",
      "React",
      "Production Readiness",
      "Mock Data"
    ],
    "seo": {
      "seoTitle": "Purging Mock Data & Unsplash Fallbacks in Proptech — Inhaby Case Study",
      "seoSlug": "removing-demo-data-standardization",
      "metaTitle": "Purging Mock Data & Unsplash Fallbacks in Proptech — Inhaby Case Study",
      "metaDescription": "How Inhaby cleaned up its codebase by replacing default Unsplash URLs and dummy data arrays with authentic Cloudinary media feeds.",
      "openGraphTitle": "Purging Mock Data & Unsplash Fallbacks in Proptech — Inhaby Case Study",
      "openGraphDesc": "How Inhaby cleaned up its codebase by replacing default Unsplash URLs and dummy data arrays with authentic Cloudinary media feeds.",
      "canonicalUrl": "https://inhaby.com/blog/engineering/removing-demo-data-standardization",
      "primaryCategory": "Engineering",
      "secondaryCategory": "Clean Code",
      "tags": [
        "Clean Code",
        "React",
        "Production Readiness",
        "Mock Data"
      ],
      "readingTime": "5 min read",
      "publishedDate": "2026-08-13",
      "updatedDate": "2026-08-13",
      "targetAudience": "Front-end Engineers, React Developers",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "Clean property cards showing no photos placeholder.",
        "alt": "Clean UI card placeholder representation"
      },
      "lsiKeywords": [
        {
          "word": "remove demo property data",
          "count": 3,
          "type": "Primary"
        },
        {
          "word": "mock data removal React",
          "count": 2,
          "type": "Secondary"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Discusses purging of static Unsplash images and dummy collections."
        }
      ]
    }
  },
  {
    "id": "cloudinary-env-enforcement",
    "slug": "cloudinary-env-enforcement",
    "title": "Enforcing Environment Variable Security: Removing Cloudinary Default Fallbacks",
    "category": "Engineering",
    "phase": "Phase 5 — Technology & Security Vetting",
    "phaseNum": 5,
    "description": "How Inhaby secured its upload pipelines by removing default fallbacks, verifying environment variables at runtime, and rendering premium warning banners.",
    "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Inhaby Tech Division",
      "role": "Engineering & Core Infrastructure",
      "avatar": "ITD",
      "bio": "The core engineering team behind Inhaby's shared SDK, database tuning, and API platforms.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "August 13, 2026",
    "readingTime": "4 min read",
    "trending": false,
    "popular": false,
    "tags": [
      "Security",
      "Environment Variables",
      "Vite",
      "Cloudinary"
    ],
    "seo": {
      "seoTitle": "Enforcing Cloudinary Environment Security in React — Inhaby Case Study",
      "seoSlug": "cloudinary-env-enforcement",
      "metaTitle": "Enforcing Cloudinary Environment Security in React — Inhaby Case Study",
      "metaDescription": "Learn how Inhaby eliminated fallback credentials and added runtime config warnings for Cloudinary uploads.",
      "openGraphTitle": "Enforcing Cloudinary Environment Security in React — Inhaby Case Study",
      "openGraphDesc": "Learn how Inhaby eliminated fallback credentials and added runtime config warnings for Cloudinary uploads.",
      "canonicalUrl": "https://inhaby.com/blog/engineering/cloudinary-env-enforcement",
      "primaryCategory": "Engineering",
      "secondaryCategory": "Security",
      "tags": [
        "Security",
        "Environment Variables",
        "Vite",
        "Cloudinary"
      ],
      "readingTime": "4 min read",
      "publishedDate": "2026-08-13",
      "updatedDate": "2026-08-13",
      "targetAudience": "DevOps Engineers, Frontend Architects",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "Config dashboard with key symbols.",
        "alt": "Security keys representation"
      },
      "lsiKeywords": [
        {
          "word": "Cloudinary env configuration",
          "count": 3,
          "type": "Primary"
        },
        {
          "word": "React environment variables",
          "count": 2,
          "type": "Secondary"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Explains how the app throws errors instead of using default credentials."
        }
      ]
    }
  },
  {
    "id": "google-maps-location-picker",
    "slug": "google-maps-location-picker",
    "title": "Google Maps Platform Integration: Owner Property Location & Address Verification",
    "category": "Engineering",
    "phase": "Phase 2 — Property Search, Map Bounds & Media",
    "phaseNum": 2,
    "description": "How Inhaby built its Property Location Engine using Google Places Autocomplete and geocoding marker utilities to capture verified rental coordinates in India.",
    "image": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Inhaby Tech Division",
      "role": "Engineering & Core Infrastructure",
      "avatar": "ITD",
      "bio": "The core engineering team behind Inhaby's shared SDK, database tuning, and API platforms.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "August 13, 2026",
    "readingTime": "6 min read",
    "trending": true,
    "popular": true,
    "tags": [
      "Google Maps",
      "Geocoding",
      "Address Verification",
      "Owner Portal"
    ],
    "seo": {
      "seoTitle": "Google Maps Property Location Picker for Proptech — Inhaby Case Study",
      "seoSlug": "google-maps-location-picker",
      "metaTitle": "Google Maps Property Location Picker for Proptech — Inhaby Case Study",
      "metaDescription": "How Inhaby integrated Google Maps, Places Autocomplete, and geocoding markers into its owner portal to ensure verified property coordinates.",
      "openGraphTitle": "Google Maps Property Location Picker for Proptech — Inhaby Case Study",
      "openGraphDesc": "How Inhaby integrated Google Maps, Places Autocomplete, and geocoding markers into its owner portal to ensure verified property coordinates.",
      "canonicalUrl": "https://inhaby.com/blog/engineering/google-maps-location-picker",
      "primaryCategory": "Engineering",
      "secondaryCategory": "Google Maps",
      "tags": [
        "Google Maps",
        "Geocoding",
        "Address Verification",
        "Owner Portal"
      ],
      "readingTime": "6 min read",
      "publishedDate": "2026-08-13",
      "updatedDate": "2026-08-13",
      "targetAudience": "Proptech Developers, Map Integrators",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "Interactive map with a coordinate picker marker.",
        "alt": "Google Maps coordinate picker marker"
      },
      "lsiKeywords": [
        {
          "word": "property location geocoding maps",
          "count": 3,
          "type": "Primary"
        },
        {
          "word": "Google Places Autocomplete",
          "count": 2,
          "type": "Secondary"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Details owner geocoding verification steps using Places Autocomplete."
        }
      ]
    }
  },
  {
    "id": "tenant-location-privacy",
    "slug": "tenant-location-privacy",
    "title": "Designing a Tenant Location Privacy Overlay on Inhaby",
    "category": "Engineering",
    "phase": "Phase 2 — Property Search, Map Bounds & Media",
    "phaseNum": 2,
    "description": "How Inhaby built a privacy-first mapping layer using dynamic random GPS coordinate offsets to protect property owners while keeping search functional for guests.",
    "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Inhaby Tech Division",
      "role": "Engineering & Core Infrastructure",
      "avatar": "ITD",
      "bio": "The core engineering team behind Inhaby's shared SDK, database tuning, and API platforms.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "August 13, 2026",
    "readingTime": "5 min read",
    "trending": false,
    "popular": true,
    "tags": [
      "Privacy",
      "Security",
      "Google Maps",
      "Coordinate Obfuscation"
    ],
    "seo": {
      "seoTitle": "Proptech Location Privacy Overlay Designs — Inhaby Case Study",
      "seoSlug": "tenant-location-privacy",
      "metaTitle": "Proptech Location Privacy Overlay Designs — Inhaby Case Study",
      "metaDescription": "Learn how Inhaby balances listing discovery with host security by serving randomized GPS offsets to guests and exact coordinates to verified tenants.",
      "openGraphTitle": "Proptech Location Privacy Overlay Designs — Inhaby Case Study",
      "openGraphDesc": "Learn how Inhaby balances listing discovery with host security by serving randomized GPS offsets to guests and exact coordinates to verified tenants.",
      "canonicalUrl": "https://inhaby.com/blog/engineering/tenant-location-privacy",
      "primaryCategory": "Engineering",
      "secondaryCategory": "Privacy",
      "tags": [
        "Privacy",
        "Security",
        "Google Maps",
        "Coordinate Obfuscation"
      ],
      "readingTime": "5 min read",
      "publishedDate": "2026-08-13",
      "updatedDate": "2026-08-13",
      "targetAudience": "Product Managers, Cybersecurity Engineers, Web Developers",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "Map pins showing offset circles.",
        "alt": "Offset map pin illustration"
      },
      "lsiKeywords": [
        {
          "word": "listing coordinates random offset",
          "count": 3,
          "type": "Primary"
        },
        {
          "word": "real estate location privacy",
          "count": 2,
          "type": "Secondary"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Explains role-based staging checks unlocking exact addresses."
        }
      ]
    }
  },
  {
    "id": "smart-location-intelligence-caching",
    "slug": "smart-location-intelligence-caching",
    "title": "Smart Location Caching: Building the Smart Location Intelligence Engine",
    "category": "Engineering",
    "phase": "Phase 2 — Property Search, Map Bounds & Media",
    "phaseNum": 2,
    "description": "How Inhaby built a local database caching layer to compute transit, school, and utility scores while reducing external Google API expenses.",
    "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Inhaby Tech Division",
      "role": "Engineering & Core Infrastructure",
      "avatar": "ITD",
      "bio": "The core engineering team behind Inhaby's shared SDK, database tuning, and API platforms.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "August 13, 2026",
    "readingTime": "7 min read",
    "trending": true,
    "popular": true,
    "tags": [
      "Caching",
      "Google Maps API",
      "PostgreSQL",
      "Location Intelligence"
    ],
    "seo": {
      "seoTitle": "Proptech Location Intelligence & API Caching — Inhaby Case Study",
      "seoSlug": "smart-location-intelligence-caching",
      "metaTitle": "Proptech Location Intelligence & API Caching — Inhaby Case Study",
      "metaDescription": "How Inhaby built a PostgreSQL caching system to store nearby places, travel distances, and location scores, reducing Google Maps API bills.",
      "openGraphTitle": "Proptech Location Intelligence & API Caching — Inhaby Case Study",
      "openGraphDesc": "How Inhaby built a PostgreSQL caching system to store nearby places, travel distances, and location scores, reducing Google Maps API bills.",
      "canonicalUrl": "https://inhaby.com/blog/engineering/smart-location-intelligence-caching",
      "primaryCategory": "Engineering",
      "secondaryCategory": "Caching",
      "tags": [
        "Caching",
        "Google Maps API",
        "PostgreSQL",
        "Location Intelligence"
      ],
      "readingTime": "7 min read",
      "publishedDate": "2026-08-13",
      "updatedDate": "2026-08-13",
      "targetAudience": "Back-end Engineers, System Architects",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "Database schema diagrams representing cache tables.",
        "alt": "Database cache tables representation"
      },
      "lsiKeywords": [
        {
          "word": "property location intelligence score",
          "count": 3,
          "type": "Primary"
        },
        {
          "word": "Google Maps API caching",
          "count": 2,
          "type": "Secondary"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Calculates Transit and Schools scores using PostgreSQL local data cache."
        }
      ]
    }
  },
  {
    "id": "smart-property-search-filters",
    "slug": "smart-property-search-filters",
    "title": "Smart Property Search: Pinned Locations & Search Analytics in Supabase",
    "category": "Engineering",
    "phase": "Phase 2 — Property Search, Map Bounds & Media",
    "phaseNum": 2,
    "description": "How Inhaby built a proximity search filter and search analytics pipeline using PostgreSQL indexes and coordinate radius formulas.",
    "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Inhaby Tech Division",
      "role": "Engineering & Core Infrastructure",
      "avatar": "ITD",
      "bio": "The core engineering team behind Inhaby's shared SDK, database tuning, and API platforms.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "August 13, 2026",
    "readingTime": "6 min read",
    "trending": false,
    "popular": true,
    "tags": [
      "Search Index",
      "Supabase",
      "Proximity Search",
      "Analytics"
    ],
    "seo": {
      "seoTitle": "High-Performance Proximity Search in Supabase — Inhaby Case Study",
      "seoSlug": "smart-property-search-filters",
      "metaTitle": "High-Performance Proximity Search in Supabase — Inhaby Case Study",
      "metaDescription": "How Inhaby optimized map searches using coordinate indexes, pinned locations, and radius query algorithms on PostgreSQL.",
      "openGraphTitle": "High-Performance Proximity Search in Supabase — Inhaby Case Study",
      "openGraphDesc": "How Inhaby optimized map searches using coordinate indexes, pinned locations, and radius query algorithms on PostgreSQL.",
      "canonicalUrl": "https://inhaby.com/blog/engineering/smart-property-search-filters",
      "primaryCategory": "Engineering",
      "secondaryCategory": "Search Optimization",
      "tags": [
        "Search Index",
        "Supabase",
        "Proximity Search",
        "Analytics"
      ],
      "readingTime": "6 min read",
      "publishedDate": "2026-08-13",
      "updatedDate": "2026-08-13",
      "targetAudience": "Database Engineers, Search Specialists",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "Visual graph of search volume index.",
        "alt": "Search analytics volume index representation"
      },
      "lsiKeywords": [
        {
          "word": "rent property search filters",
          "count": 3,
          "type": "Primary"
        },
        {
          "word": "proximity search PostgreSQL",
          "count": 2,
          "type": "Secondary"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Calculates radius proximity filters using coordinate bounding boxes."
        }
      ]
    }
  },
  {
    "id": "visit-navigation-geofencing",
    "slug": "visit-navigation-geofencing",
    "title": "Building In-Person Visit Workflows with GPS Geofencing and Access Instructions",
    "category": "Engineering",
    "phase": "Phase 3 — Visit Scheduler & Navigation",
    "phaseNum": 3,
    "description": "A look at the state machine, Haversine equations, and geofencing triggers behind Inhaby's physical site visit verification pipeline.",
    "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Inhaby Tech Division",
      "role": "Engineering & Core Infrastructure",
      "avatar": "ITD",
      "bio": "The core engineering team behind Inhaby's shared SDK, database tuning, and API platforms.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "August 13, 2026",
    "readingTime": "5 min read",
    "trending": true,
    "popular": true,
    "tags": [
      "Geofencing",
      "Visit Engine",
      "Haversine Formula",
      "Access Security"
    ],
    "seo": {
      "seoTitle": "In-Person Visit Geofencing in Proptech — Inhaby Case Study",
      "seoSlug": "visit-navigation-geofencing",
      "metaTitle": "In-Person Visit Geofencing in Proptech — Inhaby Case Study",
      "metaDescription": "How Inhaby built a GPS geofencing workflow to verify rental property viewings, manage check-ins, and secure gate access.",
      "openGraphTitle": "In-Person Visit Geofencing in Proptech — Inhaby Case Study",
      "openGraphDesc": "How Inhaby built a GPS geofencing workflow to verify rental property viewings, manage check-ins, and secure gate access.",
      "canonicalUrl": "https://inhaby.com/blog/engineering/visit-navigation-geofencing",
      "primaryCategory": "Engineering",
      "secondaryCategory": "Visit Operations",
      "tags": [
        "Geofencing",
        "Visit Engine",
        "Haversine Formula",
        "Access Security"
      ],
      "readingTime": "5 min read",
      "publishedDate": "2026-08-13",
      "updatedDate": "2026-08-13",
      "targetAudience": "Mobile Developers, Proptech Operations",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "Lockbox showing entry credentials.",
        "alt": "Secure entrance gate credentials representation"
      },
      "lsiKeywords": [
        {
          "word": "visit geofence entry instructions",
          "count": 3,
          "type": "Primary"
        },
        {
          "word": "Haversine check-in logic",
          "count": 2,
          "type": "Secondary"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Explains how the app unlocks gate access code when user is within 100 meters."
        }
      ]
    }
  },
  {
    "id": "rich-conversations-soft-delete-media",
    "slug": "rich-conversations-soft-delete-media",
    "title": "Soft Deletions, Emoji Pickers, and Multi-Image Sharing: Enhancing Rental Conversations",
    "category": "Engineering",
    "phase": "Phase 4 — Transactional & Engagement",
    "phaseNum": 4,
    "description": "How Inhaby integrated multi-image uploads, modal lightboxes, message soft deletions, and emoji input capabilities into its chat system.",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Inhaby Tech Division",
      "role": "Engineering & Core Infrastructure",
      "avatar": "ITD",
      "bio": "The core engineering team behind Inhaby's shared SDK, database tuning, and API platforms.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "August 13, 2026",
    "readingTime": "5 min read",
    "trending": false,
    "popular": true,
    "tags": [
      "Messaging",
      "Emoji Input",
      "Image Sharing",
      "Soft Deletion"
    ],
    "seo": {
      "seoTitle": "Enhancing Chat Systems with Rich Media & Soft Deletions — Inhaby Case Study",
      "seoSlug": "rich-conversations-soft-delete-media",
      "metaTitle": "Enhancing Chat Systems with Rich Media & Soft Deletions — Inhaby Case Study",
      "metaDescription": "How Inhaby implemented a rich chat interface featuring multi-image attachments, Cloudinary uploads, soft deletions, and an emoji picker.",
      "openGraphTitle": "Enhancing Chat Systems with Rich Media & Soft Deletions — Inhaby Case Study",
      "openGraphDesc": "How Inhaby implemented a rich chat interface featuring multi-image attachments, Cloudinary uploads, soft deletions, and an emoji picker.",
      "canonicalUrl": "https://inhaby.com/blog/engineering/rich-conversations-soft-delete-media",
      "primaryCategory": "Engineering",
      "secondaryCategory": "User Engagement",
      "tags": [
        "Messaging",
        "Emoji Input",
        "Image Sharing",
        "Soft Deletion"
      ],
      "readingTime": "5 min read",
      "publishedDate": "2026-08-13",
      "updatedDate": "2026-08-13",
      "targetAudience": "Product Engineers, Front-end UI Developers",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "Chat window displaying image previews.",
        "alt": "Chat interface attachments preview representation"
      },
      "lsiKeywords": [
        {
          "word": "rental messaging media upload",
          "count": 3,
          "type": "Primary"
        },
        {
          "word": "soft delete message React",
          "count": 2,
          "type": "Secondary"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Restricts soft-deleting actions to original messages authors only."
        }
      ]
    }
  },
  {
    "id": "feature-module-teams",
    "slug": "feature-module-teams",
    "title": "Founder Journal: Transitioning to Feature-Module Teams for Interns",
    "category": "Founder Journal",
    "phase": "Phase 1 — Team Onboarding & Playbooks",
    "phaseNum": 1,
    "description": "Genofogu reflects on moving from ad-hoc task assignments to a feature-team model to give full-stack interns end-to-end ownership of product flows.",
    "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Genofogu",
      "role": "Founder, Inhaby",
      "avatar": "GF",
      "bio": "Genofogu is the founder and technical lead of Inhaby, building a zero-brokerage proptech ecosystem in India.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "August 13, 2026",
    "readingTime": "5 min read",
    "trending": true,
    "popular": true,
    "tags": [
      "Founder Journal",
      "Team Management",
      "Internships",
      "Workflow"
    ],
    "seo": {
      "seoTitle": "Organizing Full-Stack Interns into Feature Teams — Inhaby Case Study",
      "seoSlug": "feature-module-teams",
      "metaTitle": "Organizing Full-Stack Interns into Feature Teams — Inhaby Case Study",
      "metaDescription": "How Inhaby organized its full-stack developer team into vertical feature-module pairings to reduce merge conflicts and improve ownership.",
      "openGraphTitle": "Organizing Full-Stack Interns into Feature Teams — Inhaby Case Study",
      "openGraphDesc": "How Inhaby organized its full-stack developer team into vertical feature-module pairings to reduce merge conflicts and improve ownership.",
      "canonicalUrl": "https://inhaby.com/blog/founder-journal/feature-module-teams",
      "primaryCategory": "Founder Journal",
      "secondaryCategory": "Team Leadership",
      "tags": [
        "Founder Journal",
        "Team Management",
        "Internships",
        "Workflow"
      ],
      "readingTime": "5 min read",
      "publishedDate": "2026-08-13",
      "updatedDate": "2026-08-13",
      "targetAudience": "Tech Startup Founders, Dev Managers, Intern Mentors",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "Teams coordinating roadmap items.",
        "alt": "Feature module teams diagram"
      },
      "lsiKeywords": [
        {
          "word": "full-stack intern workflow",
          "count": 3,
          "type": "Primary"
        },
        {
          "word": "feature-module team design",
          "count": 2,
          "type": "Secondary"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Aligns developers by horizontal journeys rather than database vs UI stacks."
        }
      ]
    }
  },
  {
    "id": "role-separated-portals",
    "slug": "role-separated-portals",
    "title": "Why Inhaby Split Owner and Tenant Experiences into Two Applications",
    "category": "Founder Journal",
    "phase": "Phase 1 — Platform Foundation",
    "phaseNum": 1,
    "description": "Genofogu discusses Inhaby's decision to build independent applications for tenants, owners, and administrators, and how we coordinate them with a shared core SDK.",
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Genofogu",
      "role": "Founder, Inhaby",
      "avatar": "GF",
      "bio": "Genofogu is the founder and technical lead of Inhaby, building a zero-brokerage proptech ecosystem in India.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "August 13, 2026",
    "readingTime": "4 min read",
    "trending": false,
    "popular": true,
    "tags": [
      "Founder Journal",
      "Architecture Decisions",
      "Multi-Portal",
      "SaaS Setup"
    ],
    "seo": {
      "seoTitle": "Multi-Portal React Architecture Design — Inhaby Case Study",
      "seoSlug": "role-separated-portals",
      "metaTitle": "Multi-Portal React Architecture Design — Inhaby Case Study",
      "metaDescription": "Learn why Inhaby uses separate tenant and owner apps, and how it coordinates them with a shared library and a unified database backend.",
      "openGraphTitle": "Multi-Portal React Architecture Design — Inhaby Case Study",
      "openGraphDesc": "Learn why Inhaby uses separate tenant and owner apps, and how it coordinates them with a shared library and a unified database backend.",
      "canonicalUrl": "https://inhaby.com/blog/founder-journal/role-separated-portals",
      "primaryCategory": "Founder Journal",
      "secondaryCategory": "Product Architecture",
      "tags": [
        "Founder Journal",
        "Architecture Decisions",
        "Multi-Portal",
        "SaaS Setup"
      ],
      "readingTime": "4 min read",
      "publishedDate": "2026-08-13",
      "updatedDate": "2026-08-13",
      "targetAudience": "SaaS Architects, Startup Engineers",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "Role-separated application panels diagram.",
        "alt": "Role separated portal tabs"
      },
      "lsiKeywords": [
        {
          "word": "multi-portal SaaS architecture",
          "count": 3,
          "type": "Primary"
        },
        {
          "word": "role-separated frontend apps",
          "count": 2,
          "type": "Secondary"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Explains why separate SPAs avoid shipping admin screens codes to public tenants."
        }
      ]
    }
  },
  {
    "id": "why-property-verification-matters",
    "slug": "why-property-verification-matters",
    "title": "Why Property Verification Matters: Aadhaar, Land Deeds, and Utility Audits",
    "category": "Founder Journal",
    "phase": "Phase 2 — Verification & Identity Check",
    "phaseNum": 2,
    "description": "Genofogu explains Inhaby's document verification process and why verifying property deeds is essential to reducing rental scams in Indian tech hubs.",
    "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Genofogu",
      "role": "Founder, Inhaby",
      "avatar": "GF",
      "bio": "Genofogu is the founder and technical lead of Inhaby, building a zero-brokerage proptech ecosystem in India.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "August 13, 2026",
    "readingTime": "5 min read",
    "trending": true,
    "popular": true,
    "tags": [
      "Founder Journal",
      "Vetting Deeds",
      "Aadhaar KYC",
      "Scam Prevention"
    ],
    "seo": {
      "seoTitle": "Verification Standards in Rental Markets — Inhaby Case Study",
      "seoSlug": "why-property-verification-matters",
      "metaTitle": "Verification Standards in Rental Markets — Inhaby Case Study",
      "metaDescription": "Learn why Inhaby verifies landlord Aadhaar details, registered sale deeds, and municipal tax records to protect tenants from scams.",
      "openGraphTitle": "Verification Standards in Rental Markets — Inhaby Case Study",
      "openGraphDesc": "Learn why Inhaby verifies landlord Aadhaar details, registered sale deeds, and municipal tax records to protect tenants from scams.",
      "canonicalUrl": "https://inhaby.com/blog/founder-journal/why-property-verification-matters",
      "primaryCategory": "Founder Journal",
      "secondaryCategory": "Trust Vetting",
      "tags": [
        "Founder Journal",
        "Vetting Deeds",
        "Aadhaar KYC",
        "Scam Prevention"
      ],
      "readingTime": "5 min read",
      "publishedDate": "2026-08-13",
      "updatedDate": "2026-08-13",
      "targetAudience": "House Hunters, Real Estate Legal Inspectors",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "Land records stamped registry seal.",
        "alt": "Official stamped registry seal details"
      },
      "lsiKeywords": [
        {
          "word": "rental property document verification",
          "count": 3,
          "type": "Primary"
        },
        {
          "word": "land deed title verification",
          "count": 2,
          "type": "Secondary"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Audits ownership credentials matching registered sale deeds with property tax records."
        }
      ]
    }
  },
  {
    "id": "admin-operations-vetting",
    "slug": "admin-operations-vetting",
    "title": "The Role of Admin Operations Vetting in Reducing Rental Scams",
    "category": "Operations",
    "phase": "Phase 2 — Verification & Trust Pipeline",
    "phaseNum": 2,
    "description": "A look at Inhaby's internal moderation queue, admin role definitions, and workflow processes used to evaluate listings and verify hosts.",
    "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
    "author": {
      "name": "Inhaby Operations Team",
      "role": "Compliance & Security Audits",
      "avatar": "IOT",
      "bio": "Operations team overseeing Inhaby platform security, KYC validations, and scam mitigations.",
      "socials": {
        "twitter": "https://twitter.com/inhaby",
        "linkedin": "https://linkedin.com/company/inhaby"
      }
    },
    "publishedDate": "August 13, 2026",
    "readingTime": "5 min read",
    "trending": false,
    "popular": false,
    "tags": [
      "Operations",
      "Moderation Queue",
      "Role Setup",
      "Vetting Workflow"
    ],
    "seo": {
      "seoTitle": "Moderation Workflows and Admin Role Vetting — Inhaby Case Study",
      "seoSlug": "admin-operations-vetting",
      "metaTitle": "Moderation Workflows and Admin Role Vetting — Inhaby Case Study",
      "metaDescription": "Learn how Inhaby's operations team manages listing approvals, KYC documents, and admin role assignments to keep the rental platform secure.",
      "openGraphTitle": "Moderation Workflows and Admin Role Vetting — Inhaby Case Study",
      "openGraphDesc": "Learn how Inhaby's operations team manages listing approvals, KYC documents, and admin role assignments to keep the rental platform secure.",
      "canonicalUrl": "https://inhaby.com/blog/operations/admin-operations-vetting",
      "primaryCategory": "Operations",
      "secondaryCategory": "Vetting & Moderation",
      "tags": [
        "Operations",
        "Moderation Queue",
        "Role Setup",
        "Vetting Workflow"
      ],
      "readingTime": "5 min read",
      "publishedDate": "2026-08-13",
      "updatedDate": "2026-08-13",
      "targetAudience": "Operations Leads, Security Compliance Audits Officers",
      "featuredImage": {
        "url": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
        "suggestion": "Moderation checklist screen interface.",
        "alt": "Moderation console audit screen representation"
      },
      "lsiKeywords": [
        {
          "word": "real estate listing moderation",
          "count": 3,
          "type": "Primary"
        },
        {
          "word": "admin dashboard KYC",
          "count": 2,
          "type": "Secondary"
        }
      ],
      "geoAeoFeatures": [
        {
          "type": "Direct Answer (AEO)",
          "desc": "Distributes review queues to verification agents and content moderators."
        }
      ]
    }
  }
];
