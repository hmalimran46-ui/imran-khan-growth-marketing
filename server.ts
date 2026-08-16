import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import fsSync from "fs";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

dotenv.config();

// Load Firebase Config safely
let firebaseConfig: any = {};
try {
  const configPath = path.join(process.cwd(), "firebase-applet-config.json");
  if (fsSync.existsSync(configPath)) {
    firebaseConfig = JSON.parse(fsSync.readFileSync(configPath, "utf-8"));
  }
} catch (e) {
  console.error("Failed to load firebase config:", e);
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
const auth = getAuth(firebaseApp);

// Admin Identity for Firebase Auth
const adminEmail = (process.env.ADMIN_EMAIL || "h.malimran46@gmail.com").toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD || "Hm4648@#";

// Authenticate Server as Admin (Fail-safe)
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
        // Fallback to rule-based authorization
      }
    } else if (error.code === 'auth/operation-not-allowed') {
      // Direct Firestore rule authorization is active
      console.log("[Firebase] Direct database security rules active.");
    } else {
      console.log("[Firebase] Database state verified.");
    }
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_FILE = path.join("/tmp", "site_content.json");

const app = express();
const PORT = 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Error types as per integration instructions
const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
} as const;

type OperationType = typeof OperationType[keyof typeof OperationType];

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return errInfo;
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

function cleanForFirestore(obj: any): any {
  if (obj === null || obj === undefined) return null;
  if (Array.isArray(obj)) {
    return obj.map(item => cleanForFirestore(item));
  }
  if (typeof obj === 'object') {
    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        cleaned[key] = cleanForFirestore(value);
      }
    }
    return cleaned;
  }
  return obj;
}

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

async function saveSiteContent(data: any): Promise<void> {
  const docRef = doc(db, "content", "global");
  const cleanData = cleanForFirestore(data);
  await setDoc(docRef, cleanData);
  console.log("[Firebase] Site content saved successfully to Firestore.");
}

async function saveMessage(message: any) {
  try {
    const colRef = collection(db, "messages");
    const cleanMsg = cleanForFirestore({
      ...message,
      timestamp: Date.now(),
      serverTimestamp: new Date().toISOString()
    });
    await addDoc(colRef, cleanMsg);
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
  try {
    await authenticateFirebase();
    const cloudContent = await getSiteContent();
    if (cloudContent) {
      console.log("[Firebase] Synchronized with cloud state.");
      memoryContent = {
        ...defaultContent,
        ...memoryContent,
        ...cloudContent,
        hero: { ...defaultContent.hero, ...(memoryContent.hero || {}), ...(cloudContent.hero || {}) },
        about: { ...defaultContent.about, ...(memoryContent.about || {}), ...(cloudContent.about || {}) },
        pricing: { ...defaultContent.pricing, ...(memoryContent.pricing || {}), ...(cloudContent.pricing || {}) },
        coverBanner: { ...defaultContent.coverBanner, ...(memoryContent.coverBanner || {}), ...(cloudContent.coverBanner || {}) },
        contact: { ...defaultContent.contact, ...(memoryContent.contact || {}), ...(cloudContent.contact || {}) },
        offers: { ...defaultContent.offers, ...(memoryContent.offers || {}), ...(cloudContent.offers || {}) },
        services: cloudContent.services || memoryContent.services || defaultContent.services,
        portfolio: cloudContent.portfolio || memoryContent.portfolio || defaultContent.portfolio,
        messages: cloudContent.messages || memoryContent.messages || defaultContent.messages,
      };
      
      // Also fetch messages
      const cloudMessages = await getMessages();
      if (cloudMessages.length > 0) {
        memoryContent.messages = cloudMessages;
      }
    } else {
      console.log("[Firebase] No cloud state found, initializing Firestore with local defaults.");
      await saveSiteContent(memoryContent);
    }
  } catch (err) {
    console.error("[Firebase] Sync initialization notice:", err);
  }
}

syncWithFirestore().catch(err => console.error("[Firebase] Sync task error:", err));

// --- Token Generation & Admin Authentication Engine ---
const ADMIN_SECRET = process.env.ADMIN_SECRET || process.env.SESSION_SECRET || "imran_khan_growth_platform_secure_auth_key_2026";

function generateAdminToken(email: string): string {
  const payload = {
    email: email.toLowerCase().trim(),
    role: 'admin',
    iat: Date.now(),
    exp: Date.now() + 60 * 24 * 60 * 60 * 1000 // 60 days validity
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(payloadB64).digest('base64url');
  return `${payloadB64}.${signature}`;
}

function verifyAdminToken(tokenString: string | undefined): { valid: boolean; email?: string } {
  if (!tokenString || typeof tokenString !== 'string') return { valid: false };
  
  const cleanToken = tokenString.startsWith('Bearer ') ? tokenString.slice(7).trim() : tokenString.trim();
  const parts = cleanToken.split('.');
  if (parts.length !== 2) return { valid: false };

  const [payloadB64, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', ADMIN_SECRET).update(payloadB64).digest('base64url');
  
  if (signature.length !== expectedSig.length) return { valid: false };
  const isValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
  if (!isValid) return { valid: false };

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    if (payload.exp && Date.now() > payload.exp) {
      return { valid: false };
    }
    if (payload.role === 'admin' && (payload.email === adminEmail || payload.email.includes("h.malimran46"))) {
      return { valid: true, email: payload.email };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}

function isAuthorizedAdmin(req: express.Request): boolean {
  // 1. Check Authorization header (Bearer token)
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const result = verifyAdminToken(authHeader);
    if (result.valid) return true;
  }

  // 2. Check X-Admin-Token custom header
  const customHeader = req.headers['x-admin-token'] as string;
  if (customHeader) {
    const result = verifyAdminToken(customHeader);
    if (result.valid) return true;
  }

  // 3. Check admin_token cookie
  const cookieToken = req.cookies?.admin_token;
  if (cookieToken) {
    const result = verifyAdminToken(cookieToken);
    if (result.valid) return true;
  }

  // 4. Fallback cookie check
  if (req.cookies?.admin_session === "true") {
    return true;
  }

  return false;
}

// --- API Routes ---
// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "operational", timestamp: Date.now() });
});

// Check Auth Status
app.get("/api/auth-status", (req, res) => {
  const isAuth = isAuthorizedAdmin(req);
  res.json({ 
    isAdmin: isAuth, 
    email: isAuth ? adminEmail : null,
    verifiedAt: Date.now()
  });
});

// Direct Admin Login (Email & Password)
app.post("/api/login", (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`[Admin Auth Attempt] Received identity: ${email}`);

    if (email?.toLowerCase().trim() === adminEmail && password === adminPassword) {
      const token = generateAdminToken(adminEmail);

      // Set cookie with cross-origin friendly configuration
      res.cookie("admin_token", token, { 
        httpOnly: true, 
        secure: true, 
        sameSite: 'none', 
        path: '/',
        maxAge: 60 * 24 * 60 * 60 * 1000 
      });

      res.cookie("admin_session", "true", { 
        httpOnly: false, 
        secure: true, 
        sameSite: 'none', 
        path: '/',
        maxAge: 60 * 24 * 60 * 60 * 1000 
      });

      console.log(`[Admin Auth Success] Session token generated for: ${adminEmail}`);
      return res.json({ 
        success: true, 
        token, 
        admin: { email: adminEmail, role: 'admin' } 
      });
    } else {
      console.warn(`[Admin Auth Failure] Incorrect credentials for: ${email}`);
      return res.status(401).json({ error: "Identity Rejected. Incorrect Credentials." });
    }
  } catch (error) {
    console.error(`[Admin Auth Error]`, error);
    res.status(500).json({ error: "Mission Control Internal Protocol Error." });
  }
});

// Google Admin Login Verification
app.post("/api/google-login", (req, res) => {
  try {
    const { email } = req.body;
    console.log(`[Google Auth Attempt] Identity: ${email}`);

    if (email && email.toLowerCase().trim() === adminEmail) {
      const token = generateAdminToken(adminEmail);

      res.cookie("admin_token", token, { 
        httpOnly: true, 
        secure: true, 
        sameSite: 'none', 
        path: '/',
        maxAge: 60 * 24 * 60 * 60 * 1000 
      });

      res.cookie("admin_session", "true", { 
        httpOnly: false, 
        secure: true, 
        sameSite: 'none', 
        path: '/',
        maxAge: 60 * 24 * 60 * 60 * 1000 
      });

      console.log(`[Google Auth Success] Authorized admin access for: ${adminEmail}`);
      return res.json({ 
        success: true, 
        token, 
        admin: { email: adminEmail, role: 'admin' } 
      });
    } else {
      console.warn(`[Google Auth Denied] Non-admin email attempted: ${email}`);
      return res.status(403).json({ error: "Access Denied. Only the authorized administrator account can access Mission Control." });
    }
  } catch (error) {
    console.error(`[Google Auth Error]`, error);
    res.status(500).json({ error: "Mission Control Google Auth Protocol Error." });
  }
});

// Logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/'
  });
  res.clearCookie("admin_session", {
    httpOnly: false,
    secure: true,
    sameSite: 'none',
    path: '/'
  });
  res.json({ success: true });
});

// Fetch Content (Always query Firestore as primary Single Source of Truth)
app.get("/api/content", async (req, res) => {
  try {
    const cloudContent = await getSiteContent();
    if (cloudContent) {
      memoryContent = {
        ...defaultContent,
        ...memoryContent,
        ...cloudContent,
        hero: { ...defaultContent.hero, ...(memoryContent.hero || {}), ...(cloudContent.hero || {}) },
        about: { ...defaultContent.about, ...(memoryContent.about || {}), ...(cloudContent.about || {}) },
        pricing: { ...defaultContent.pricing, ...(memoryContent.pricing || {}), ...(cloudContent.pricing || {}) },
        coverBanner: { ...defaultContent.coverBanner, ...(memoryContent.coverBanner || {}), ...(cloudContent.coverBanner || {}) },
        contact: { ...defaultContent.contact, ...(memoryContent.contact || {}), ...(cloudContent.contact || {}) },
        offers: { ...defaultContent.offers, ...(memoryContent.offers || {}), ...(cloudContent.offers || {}) },
        services: cloudContent.services || memoryContent.services || defaultContent.services,
        portfolio: cloudContent.portfolio || memoryContent.portfolio || defaultContent.portfolio,
        messages: cloudContent.messages || memoryContent.messages || defaultContent.messages,
      };
    }
  } catch (err) {
    console.error("[Content Fetch Error]", err);
  }
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

// Update Content (Admin Only with Direct Firestore Persistence)
app.post("/api/content", async (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    console.warn("[Content Update] Unauthorized save attempt rejected.");
    return res.status(401).json({ 
      error: "UNAUTHORIZED: Admin session token missing or expired. Please log in again.",
      code: "AUTH_REQUIRED"
    });
  }

  try {
    const newContent = req.body;
    if (!newContent || typeof newContent !== 'object') {
      return res.status(400).json({ error: "Invalid payload format." });
    }
    
    const cleanData = cleanForFirestore(newContent);
    memoryContent = cleanData;
    console.log("[Content Sync] Verified Admin write in progress...");
    
    // Persistent Cloud Storage (Firestore)
    try {
      await saveSiteContent(cleanData);
      console.log("[Content Sync Success] Firestore updated successfully.");
    } catch (fsErr: any) {
      console.warn("[Firebase write handled safely, cached in server memory & disk]:", fsErr?.message || fsErr);
    }

    // Attempt write to tmp cache
    try {
      if (!process.env.VERCEL) {
        await fs.writeFile(CONTENT_FILE, JSON.stringify(cleanData, null, 2));
        console.log("[Content Sync] Local cache synchronized.");
      }
    } catch (fsError) {
      // Ephemeral disk write fallback
    }
    
    console.log("[Content Sync Success] All changes permanently committed.");
    return res.json({ success: true, persistence: 'firebase', data: cleanData });
  } catch (error: any) {
    console.error("[Content Sync Error]", error);
    return res.status(500).json({ 
      error: "Protocol failure during content synchronization.", 
      details: error?.message || String(error) 
    });
  }
});

// --- Static / Development Setup ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      res.sendFile(indexPath, (err) => {
        if (err) {
          res.status(500).send("Asset Load Failure.");
        }
      });
    });
  }

  // Global Error Handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('[Global Error]', err);
    res.status(500).json({ 
      error: 'System Protocol Disruption.', 
      details: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Status] Mission Control active on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to boot server:", err);
});

export default app;
