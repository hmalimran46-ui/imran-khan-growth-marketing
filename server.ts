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

  // Initialize content file if not exists
  try {
    await fs.access(CONTENT_FILE);
  } catch {
    const defaultContent = {
      hero: {
        headline: "Grow Your Business With\nSmart Digital Marketing",
        subheadline: "Helping Brands Scale Traffic, Engagement & Revenue With Data-Driven Strategies Focused on Performance.",
      },
      pricing: {
        basic: "30",
        standard: "55",
        premium: "110",
      },
      about: {
        profileImage: "input_file_2.png",
        name: "Imran Khan",
        role: "Marketing Expert",
      },
      messages: []
    };
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
    const adminEmail = process.env.ADMIN_EMAIL || "h.malimran46@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (email === adminEmail && password === adminPassword) {
      res.cookie("admin_session", "true", { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000 // 1 day
      });
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Logout
  app.post("/api/logout", (req, res) => {
    res.clearCookie("admin_session");
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
      await fs.writeFile(CONTENT_FILE, JSON.stringify(newContent, null, 2));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update content" });
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
