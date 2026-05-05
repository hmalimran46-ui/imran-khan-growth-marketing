import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_FILE = path.join(process.cwd(), "site_content.json");

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

const defaultContent = {
  hero: {
    badge: "GLOBAL GROWTH ARCHITECTURE",
    headline: "GROW YOUR BUSINESS WITH\nSMART DIGITAL\nMARKETING",
    subheadline: "Helping Brands Scale Traffic, Engagement & Revenue With Data-Driven Strategies Focused on Performance.",
  },
  about: {
    profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    name: "Imran Khan",
    role: "Marketing Expert",
    bio: "Visionary growth architect specializing in digital acquisition and conversion optimization.",
    experienceYears: "5+",
  },
  services: [
    { id: '1', title: 'SEO Optimization', description: 'Dominating search results with precision algorithms.' },
    { id: '2', title: 'Data Analytics', description: 'Turning raw data into profitable business decisions.' },
    { id: '3', title: 'PPC Management', description: 'High-converting ad campaigns that maximize ROI.' }
  ],
  portfolio: [
    { id: '1', title: 'E-commerce Scale', category: 'Growth Strategy', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80' },
    { id: '2', title: 'SaaS Acquisition', category: 'Digital Marketing', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80' }
  ],
  pricing: {
    basic: "30",
    standard: "55",
    premium: "110",
  },
  coverBanner: {
    headline: "Scale Your\nEmpire",
    subheadline: "\"We don't just run ads; we engineer market dominance through data-driven precision and aggressive scaling strategies.\"",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2400",
  },
  contact: {
    email: "h.malimran46@gmail.com",
    whatsapp: "01986620247",
  },
  offers: {
    isActive: true,
    title: "SPECIAL SERVICE DISCOUNT",
    description: "Get 20% off on all professional digital solutions for a limited time.",
    discountCode: "IMRAN20",
    badge: "Active Offer"
  },
  messages: []
};

// Initialize content file logic
async function initializeContent() {
  try {
    await fs.access(CONTENT_FILE);
    const data = await fs.readFile(CONTENT_FILE, "utf-8");
    const existing = JSON.parse(data);
    const merged = {
      ...defaultContent,
      ...existing,
      hero: { ...defaultContent.hero, ...existing.hero },
      about: { ...defaultContent.about, ...existing.about },
      pricing: { ...defaultContent.pricing, ...existing.pricing },
      coverBanner: { ...defaultContent.coverBanner, ...(existing.coverBanner || {}) },
      contact: { ...defaultContent.contact, ...existing.contact },
      offers: { ...defaultContent.offers, ...(existing.offers || {}) },
      services: existing.services || defaultContent.services,
      portfolio: existing.portfolio || defaultContent.portfolio,
      messages: existing.messages || defaultContent.messages,
    };
    await fs.writeFile(CONTENT_FILE, JSON.stringify(merged, null, 2));
  } catch {
    // For Vercel, we might not have writable disk, but we initialize if possible
    try {
      await fs.writeFile(CONTENT_FILE, JSON.stringify(defaultContent, null, 2));
    } catch (e) {
      console.warn("Content initialization failed (expected on some cloud environments)", e);
    }
  }
}

// Global initialization
initializeContent();

// --- API Routes ---
// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || "h.malimran46@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Hm4648@#";

  if (email === adminEmail && password === adminPassword) {
    res.cookie("admin_session", "true", { 
      httpOnly: true, 
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000 
    });
    res.json({ success: true });
  } else {
    res.status(401).json({ error: "Identity Rejected. Incorrect Credentials." });
  }
});

// Logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("admin_session", {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/'
  });
  res.json({ success: true });
});

// Fetch Content
app.get("/api/content", async (req, res) => {
  try {
    const data = await fs.readFile(CONTENT_FILE, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.json(defaultContent); // Fallback to memory on read error
  }
});

// Update Content (Mocking persistence for Vercel since disk is RO)
app.post("/api/content", async (req, res) => {
  const session = req.cookies.admin_session;
  if (session !== "true") return res.status(401).json({ error: "Unauthorized" });

  try {
    const newContent = req.body;
    await fs.writeFile(CONTENT_FILE, JSON.stringify(newContent, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Operation failed" });
  }
});

// --- Static / Development ---
const isVercel = process.env.VERCEL === "1";
if (process.env.NODE_ENV !== "production" && !isVercel) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.resolve(process.cwd(), "dist");
  console.log(`[Static] Serving deployment assets from: ${distPath}`);
  
  app.use(express.static(distPath, { index: false }));
  
  app.get("*", (req, res) => {
    const indexPath = path.join(distPath, "index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error(`[Static Error] Asset missing at ${indexPath}:`, err);
        res.status(500).send("Strategic Asset Load Failure. Re-deploying protocols...");
      }
    });
  });
}

// Only listen locally, Vercel handles serverless execution
if (!isVercel) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Status] Mission Control active on port ${PORT}`);
  });
}

export default app;
