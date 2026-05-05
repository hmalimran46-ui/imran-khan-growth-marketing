import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_FILE = path.join(process.cwd(), "site_content.json");

async function startServer() {
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
    messages: []
  };

  // Initialize content file if not exists
  try {
    await fs.access(CONTENT_FILE);
    // Migration: ensure all fields exist if file already exists
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
      services: existing.services || defaultContent.services,
      portfolio: existing.portfolio || defaultContent.portfolio,
      messages: existing.messages || defaultContent.messages,
    };
    await fs.writeFile(CONTENT_FILE, JSON.stringify(merged, null, 2));
  } catch {
    await fs.writeFile(CONTENT_FILE, JSON.stringify(defaultContent, null, 2));
  }

  // --- API Routes ---

  // Auth Middleware
  const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const session = req.cookies.admin_session;
    if (session === "true") {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized access" });
    }
  };

  // Login
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    // Identity Verification Logic (Server-Side)
    const adminEmail = process.env.ADMIN_EMAIL || "h.malimran46@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Hm4648@#";

    if (email === adminEmail && password === adminPassword) {
      console.log(`[Auth] Secure session established for authorized user.`);
      res.cookie("admin_session", "true", { 
        httpOnly: true, 
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });
      res.json({ success: true });
    } else {
      console.warn(`[Auth] Failed login attempt for identity confirmation.`);
      res.status(401).json({ error: "Identity Rejected. Incorrect Credentials." });
    }
  });

  // Logout
  app.post("/api/logout", (req, res) => {
    res.clearCookie("admin_session", {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    res.json({ success: true });
  });

  // Check Auth Status
  app.get("/api/auth-status", (req, res) => {
    const session = req.cookies.admin_session;
    res.json({ isAdmin: session === "true" });
  });

  // Fetch Content
  app.get("/api/content", async (req, res) => {
    try {
      const data = await fs.readFile(CONTENT_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  // Update Content (Protected)
  app.post("/api/content", authMiddleware, async (req, res) => {
    try {
      const newContent = req.body;
      if (!newContent || typeof newContent !== 'object') {
        throw new Error("Invalid payload signature received.");
      }
      await fs.writeFile(CONTENT_FILE, JSON.stringify(newContent, null, 2));
      console.log(`[Strategic Sync] Content successfully written to disk. Payload size: ${(JSON.stringify(newContent).length / 1024).toFixed(2)} KB`);
      res.json({ success: true });
    } catch (error) {
      console.error("[Critical Error] Data Synchronization Failure:", error);
      res.status(500).json({ error: "Failed to persist operational data." });
    }
  });

  // Add Message (Public)
  app.post("/api/messages", async (req, res) => {
    try {
      const msg = req.body;
      const data = await fs.readFile(CONTENT_FILE, "utf-8");
      const content = JSON.parse(data);
      
      const newMessage = {
        ...msg,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now()
      };
      
      content.messages = [newMessage, ...content.messages];
      await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to transmit message" });
    }
  });

  // --- Vite / Production Serve ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
