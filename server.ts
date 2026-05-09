import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

dotenv.config();

// Load Firebase Config
const firebaseConfig = JSON.parse(await fs.readFile(path.join(process.cwd(), "firebase-applet-config.json"), "utf-8"));
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// Admin Identity for Firebase Auth
const adminEmail = (process.env.ADMIN_EMAIL || "h.malimran46@gmail.com").toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD || "Hm4648@#";

// Authenticate Server as Admin
async function authenticateFirebase() {
  try {
    await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
    console.log("[Firebase] Server authenticated as Admin.");
  } catch (error: any) {
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      try {
        await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
        console.log("[Firebase] Admin user created and authenticated.");
      } catch (createError) {
        console.error("[Firebase] Failed to create admin user:", createError);
      }
    } else {
      console.error("[Firebase] Authentication failed:", error);
    }
  }
}

authenticateFirebase();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_FILE = path.join("/tmp", "site_content.json");

const app = express();
const PORT = 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Error types as per integration instructions
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const defaultContent = {
// ... (rest remains same)
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

let memoryContent = { ...defaultContent };

// Initialize content file logic - made non-blocking for Vercel
function initializeContent() {
  fs.access(CONTENT_FILE)
    .then(async () => {
      try {
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
        memoryContent = merged;
        // Only attempt write if environment might allow it
        if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
          await fs.writeFile(CONTENT_FILE, JSON.stringify(merged, null, 2));
        }
      } catch (e) {
        console.warn("[Content] Parse error, skipping sync.");
      }
    })
    .catch(() => {
      console.log("[Content] Initializing with defaults (Read-only mode detected or file missing).");
    });
}

// Global initialization
initializeContent();

async function getSiteContent() {
  try {
    const docRef = doc(db, "content", "global");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    console.error("[Firebase] Error fetching site content:", error);
  }
  return null;
}

async function saveSiteContent(data: any) {
  try {
    const docRef = doc(db, "content", "global");
    await setDoc(docRef, data);
    console.log("[Firebase] Site content saved successfully.");
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, "content/global");
  }
}

async function saveMessage(message: any) {
  try {
    const colRef = collection(db, "messages");
    await addDoc(colRef, {
      ...message,
      timestamp: Date.now(),
      serverTimestamp: new Date().toISOString()
    });
    console.log("[Firebase] Message saved successfully.");
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, "messages");
  }
}

async function getMessages() {
  try {
    const colRef = collection(db, "messages");
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("[Firebase] Error fetching messages:", error);
    return [];
  }
}

// Initial content sync with Firestore
async function syncWithFirestore() {
  const cloudContent = await getSiteContent();
  if (cloudContent) {
    console.log("[Firebase] Synchronized with cloud state.");
    memoryContent = { ...memoryContent, ...cloudContent };
    
    // Also fetch messages
    const cloudMessages = await getMessages();
    if (cloudMessages.length > 0) {
      memoryContent.messages = cloudMessages;
    }
  } else {
    console.log("[Firebase] No cloud state found, initializing Firestore with local defaults.");
    await saveSiteContent(memoryContent);
  }
}

syncWithFirestore();

// --- API Routes ---
// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "operational", timestamp: Date.now() });
});

// Check Auth Status
app.get("/api/auth-status", (req, res) => {
  const session = req.cookies.admin_session;
  res.json({ isAdmin: session === "true" });
});

// Login
app.post("/api/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = (process.env.ADMIN_EMAIL || "h.malimran46@gmail.com").toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "Hm4648@#";

    console.log(`[Login Attempt] Identity: ${email}`);

    if (email?.toLowerCase() === adminEmail && password === adminPassword) {
      // Setting set-cookie header with 30 days expiration
      res.cookie("admin_session", "true", { 
        httpOnly: true, 
        secure: true, 
        sameSite: 'lax', 
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000 
      });
      console.log(`[Login Success] Credentials verified.`);
      return res.json({ success: true });
    } else {
      console.warn(`[Login Failed] Invalid credentials for: ${email}`);
      return res.status(401).json({ error: "Identity Rejected. Incorrect Credentials." });
    }
  } catch (error) {
    console.error(`[Login Crash]`, error);
    res.status(500).json({ error: "Mission Control Internal Protocol Error." });
  }
});

// Logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("admin_session", {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
  });
  res.json({ success: true });
});

// Fetch Content
app.get("/api/content", (req, res) => {
  res.json(memoryContent);
});

// Contact Message Submission (Public)
app.post("/api/contact", async (req, res) => {
  try {
    const newMessage = req.body;
    // Save to memory and local for fallback
    memoryContent.messages = [newMessage, ...memoryContent.messages];
    
    // Persistent Cloud Storage
    await saveMessage(newMessage);

    if (!process.env.VERCEL) {
      await fs.writeFile(CONTENT_FILE, JSON.stringify(memoryContent, null, 2));
    }
    res.json({ success: true, orderId: newMessage.orderId });
  } catch (error) {
    console.error("[Contact Error]", error);
    res.status(500).json({ error: "Failed to process mission request." });
  }
});

// Update Content (Admin Only)
app.post("/api/content", async (req, res) => {
  const session = req.cookies.admin_session;
  if (session !== "true") {
    console.warn("[Content Update] Unauthorized attempt blocked.");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const newContent = req.body;
    if (!newContent || typeof newContent !== 'object') {
      throw new Error("Invalid payload format.");
    }
    
    memoryContent = newContent;
    console.log("[Content Sync] Memory state updated.");
    
    // Persistent Cloud Storage
    await saveSiteContent(newContent);

    // Attempt write only, don't crash if it fails (ephemeral storage)
    try {
      if (!process.env.VERCEL) {
        await fs.writeFile(CONTENT_FILE, JSON.stringify(newContent, null, 2));
        console.log("[Content Sync] Local storage synchronized.");
      }
    } catch (fsError) {
      console.warn("[Content Sync] Local storage write failed.", fsError);
    }
    
    res.json({ success: true, persistence: 'firebase' });
  } catch (error: any) {
    console.error("[Content Sync Error]", error);
    res.status(500).json({ error: "Strategic protocol failure during sync.", details: error.message });
  }
});

// --- Static / Development ---
const isVercel = process.env.VERCEL === "1";
// Only serve static files if NOT on Vercel
// Vercel handles static files via vercel.json rewrites and direct serving
if (!isVercel) {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      res.sendFile(indexPath, (err) => {
        if (err) {
          res.status(500).send("Strategic Asset Load Failure.");
        }
      });
    });
  }
}

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Global Error]', err);
  res.status(500).json({ error: 'System Protocol Disruption.', details: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

// Only listen locally, Vercel handles serverless execution
if (!isVercel) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Status] Mission Control active on port ${PORT}`);
  });
}

export default app;
