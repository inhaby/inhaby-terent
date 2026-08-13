import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";
import nodemailer from "nodemailer";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://yycdwqnncsixbkcjyiji.supabase.co";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Import static blog data for SEO lookups
let BLOG_POSTS: any[] = [];
try {
  // Read BLOG_POSTS from src/data.ts dynamically if possible
  const dataPath = path.resolve(process.cwd(), "src/data.ts");
  if (fs.existsSync(dataPath)) {
    const dataContent = fs.readFileSync(dataPath, "utf-8");
    // Extract titles and slugs using regex to avoid ts-node import issues in vanilla node
    const postMatches = dataContent.matchAll(/id:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*excerpt:\s*['"]([^'"]+)['"],\s*slug:\s*['"]([^'"]+)['"]/g);
    for (const match of postMatches) {
      BLOG_POSTS.push({
        id: match[1],
        title: match[2],
        description: match[3],
        slug: match[4]
      });
    }
  }
} catch (e) {
  console.warn("Could not parse static blog posts for SEO:", e);
}

function injectSEO(html: string, seo: { title: string; description: string; url: string; image: string; schemaJson?: string }) {
  let modified = html;
  
  // Replace title
  modified = modified.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);
  
  // Replace description meta
  modified = modified.replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="description" content="${seo.description}">`);
  
  // Replace Open Graph Url, Title, Description, Image
  modified = modified.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:url" content="${seo.url}">`);
  modified = modified.replace(/<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:title" content="${seo.title}">`);
  modified = modified.replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:description" content="${seo.description}">`);
  modified = modified.replace(/<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:image" content="${seo.image}">`);

  // Replace Twitter Title, Description, Image
  modified = modified.replace(/<meta\s+property="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="twitter:title" content="${seo.title}">`);
  modified = modified.replace(/<meta\s+property="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="twitter:description" content="${seo.description}">`);
  modified = modified.replace(/<meta\s+property="twitter:image"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="twitter:image" content="${seo.image}">`);

  // Replace Canonical Link
  modified = modified.replace(/<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i, `<link rel="canonical" href="${seo.url}">`);

  // Inject Schema JSON-LD if provided
  if (seo.schemaJson) {
    modified = modified.replace('</head>', `${seo.schemaJson}\n</head>`);
  }
  
  return modified;
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  const isProd = process.env.NODE_ENV === "production";

  app.use(express.json());

  // 1. Robots.txt
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *\nAllow: /\n\nSitemap: https://inhaby.com/sitemap.xml`);
  });

  // 2. Sitemap.xml (Dynamic SEO mapping)
  app.get("/sitemap.xml", async (req, res) => {
    try {
      res.type("application/xml");
      
      // Fetch property slugs from Supabase
      const { data: properties, error } = await supabase
        .from("properties")
        .select("slug, updated_at");

      const staticPages = [
        "",
        "/pricing",
        "/savings",
        "/verify",
        "/verified-owners",
        "/blog",
        "/demo"
      ];

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

      // Static URLs
      staticPages.forEach(p => {
        xml += `  <url>\n`;
        xml += `    <loc>https://inhaby.com${p}</loc>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>${p === "" ? "1.0" : "0.8"}</priority>\n`;
        xml += `  </url>\n`;
      });

      // Dynamic Property URLs
      if (properties && !error) {
        properties.forEach(prop => {
          if (prop.slug) {
            xml += `  <url>\n`;
            xml += `    <loc>https://inhaby.com/property/${prop.slug}</loc>\n`;
            xml += `    <lastmod>${prop.updated_at ? new Date(prop.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>\n`;
            xml += `    <changefreq>daily</changefreq>\n`;
            xml += `    <priority>0.9</priority>\n`;
            xml += `  </url>\n`;
          }
        });
      }

      xml += `</urlset>`;
      res.send(xml);
    } catch (e) {
      res.status(500).send("Error generating sitemap");
    }
  });

  // Configure Multer for PDF upload in memory, with 5 MB file size limit
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
  });

  // Handle preflight requests for careers application endpoint
  app.options("/api/careers/apply", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.sendStatus(200);
  });

  // Careers application submission endpoint
  app.post(
    "/api/careers/apply",
    (req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");

      upload.single("resume")(req, res, (err: any) => {
        if (err) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              success: false,
              message: "File is too large. Maximum size allowed is 5 MB."
            });
          }
          return res.status(400).json({
            success: false,
            message: err.message || "Failed to parse file upload."
          });
        }
        next();
      });
    },
    async (req, res) => {
      try {
        const {
          firstName,
          lastName,
          email,
          phone,
          city,
          state,
          college,
          degree,
          graduationYear,
          position,
          coverLetter
        } = req.body;

        // Validation of required fields
        if (
          !firstName?.trim() ||
          !lastName?.trim() ||
          !email?.trim() ||
          !phone?.trim() ||
          !city?.trim() ||
          !state?.trim() ||
          !college?.trim() ||
          !degree?.trim() ||
          !graduationYear?.trim() ||
          !coverLetter?.trim() ||
          !req.file
        ) {
          return res.status(400).json({
            success: false,
            message: "All fields are required, including your PDF resume."
          });
        }

        // Validate file type
        if (req.file.mimetype !== "application/pdf" && !req.file.originalname.toLowerCase().endsWith(".pdf")) {
          return res.status(400).json({
            success: false,
            message: "Only PDF files are allowed."
          });
        }

        // Validate email address format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
          return res.status(400).json({
            success: false,
            message: "Please enter a valid email address."
          });
        }

        const applicantName = `${firstName} ${lastName}`.trim();
        const resolvedPosition = position || "Full Stack Developer";
        const subject = `New Application | ${resolvedPosition} | ${applicantName}`;

        const bodyText = `New Job Application

Position:
${resolvedPosition}

Name:
${applicantName}

Email:
${email}

Phone:
${phone}

City:
${city}

State:
${state}

College:
${college}

Degree:
${degree}

Graduation Year:
${graduationYear}

Portfolio / Online Profiles:
${req.body.portfolio || "None provided"}

Current Semester:
${req.body.currentSemester || "N/A"}

Cover Letter:
${coverLetter}
`;

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.zoho.com",
          port: Number(process.env.SMTP_PORT) || 465,
          secure: Number(process.env.SMTP_PORT) !== 587, // secure: true for port 465
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER || "hr@inhaby.com",
          to: "hr@inhaby.com",
          replyTo: email,
          subject: subject,
          text: bodyText,
          attachments: [
            {
              filename: req.file.originalname || "resume.pdf",
              content: req.file.buffer,
              contentType: "application/pdf"
            }
          ]
        });

        return res.status(200).json({
          success: true
        });
      } catch (err: any) {
        console.error("Application email sending failed:", err);
        return res.status(500).json({
          success: false,
          message: "Unable to send application."
        });
      }
    }
  );

  // Setup Vite in Dev or serve Static files in Prod
  let vite: any;
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Custom router for SEO head injection
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));
  }

  // Unified Request Interceptor for Dynamic SEO tags injection
  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;
    
    // Skip static assets
    if (url.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|json)$/)) {
      return next();
    }

    try {
      let template: string;
      if (!isProd) {
        template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.join(process.cwd(), 'dist', 'index.html'), "utf-8");
      }

      // Default SEO info
      let seo = {
        title: "Inhaby | Verified Rental Homes, Flats & PGs Near You",
        description: "Find verified rentals, PG accommodations, apartments, flats, and rooms for rent near you. Browse owner-listed stays with zero brokerage and secure booking.",
        url: `https://inhaby.com${url}`,
        image: "https://inhaby.com/og-image.jpg",
        schemaJson: ""
      };

      // 1. Check for Property details page
      const propertyMatch = url.match(/^\/property\/([a-zA-Z0-9_-]+)/);
      if (propertyMatch) {
        const slug = propertyMatch[1];
        const { data: property } = await supabase
          .from("properties")
          .select("*")
          .eq("slug", slug)
          .single();

        if (property) {
          const typeLabel = property.category === "pg" ? "Verified PG" : "Boutique Apartment";
          seo.title = `${property.title} for Rent in ${property.area}, ${property.city} | Inhaby`;
          seo.description = `Rent this ${typeLabel} at ${property.price}/month on Inhaby. Zero brokerage, verified owner list, fully ${property.furnishing || 'semi'} furnished stays in ${property.area}.`;
          seo.image = property.image_url || "https://inhaby.com/og-image.jpg";
          
          seo.schemaJson = `
          <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "Accommodation",
            "name": "${property.title}",
            "description": "${property.description || 'Verified zero-brokerage rental stay on Inhaby.'}",
            "image": "${property.image_url || 'https://inhaby.com/og-image.jpg'}",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "${property.city}",
              "addressRegion": "${property.area || ''}",
              "addressCountry": "IN"
            },
            "offers": {
              "@type": "Offer",
              "price": "${property.price}",
              "priceCurrency": "INR",
              "valueAddedService": {
                "@type": "Service",
                "name": "Zero Brokerage Assured"
              }
            }
          }
          </script>`;
        }
      }
      
      // 2. Check for Blog page
      const blogMatch = url.match(/^\/blog\/([a-zA-Z0-9_-]+)/);
      if (blogMatch) {
        const slug = blogMatch[1];
        const post = BLOG_POSTS.find(p => p.slug === slug);
        if (post) {
          seo.title = `${post.title} | Inhaby Co-living Blog`;
          seo.description = post.description || seo.description;
        }
      }

      // 3. Check for Static pages
      if (url.startsWith("/pricing")) {
        seo.title = "Inhaby Pricing | Professional Stays, Zero Brokerage";
        seo.description = "Compare plans for premium co-living, PG, and long-term stays with Inhaby. Zero brokerage fee, verified properties, secure deposits.";
      } else if (url.startsWith("/savings")) {
        seo.title = "Rental Savings Calculator | Zero Brokerage rentals India";
        seo.description = "Calculate how much brokerage you save by booking through Inhaby. Eliminate broker commission, search free verified listings.";
      } else if (url.startsWith("/verify")) {
        seo.title = "Tenant Verification | Secured Rentals on Inhaby";
        seo.description = "Verify your tenant profile instantly to book viewing slots and close agreements directly with verified property owners.";
      } else if (url.startsWith("/verified-owners")) {
        seo.title = "Host Listings | List Verified Properties on Inhaby";
        seo.description = "List your pg, apartments or flats directly to verified tenants. Zero commission, rapid tenant matching and background checks.";
      }

      // 4. Check for Category Pages e.g. /pg/noida, /apartments/bengaluru
      const categoryMatch = url.match(/^\/(pg|apartments|flats|studio)\/([a-zA-Z0-9_-]+)/);
      if (categoryMatch) {
        const category = categoryMatch[1].toUpperCase();
        const cityRaw = categoryMatch[2];
        const city = cityRaw.charAt(0).toUpperCase() + cityRaw.slice(1);
        seo.title = `Verified ${category} for Rent in ${city} | Zero Brokerage Stays`;
        seo.description = `Browse owner-listed verified ${category} rentals in ${city} on Inhaby. Zero broker commission, secure deposits, immediate visits booking.`;
      }

      const html = injectSEO(template, seo);
      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (e: any) {
      if (!isProd) vite.handleStartError(e);
      res.status(500).send(e.message);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
