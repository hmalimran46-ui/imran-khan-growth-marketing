import React, { createContext, useContext, useState, useEffect } from 'react';

export type MessageStatus = 'pending' | 'approved' | 'in_progress' | 'delivered' | 'rejected';

export interface Message {
  id: string;
  orderId: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  status: MessageStatus;
  timestamp: string;
  service?: string;
  budget?: string;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

interface ContentState {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
  };
  about: {
    profileImage: string;
    name: string;
    role: string;
    bio: string;
    experienceYears: string;
  };
  coverBanner: {
    headline: string;
    subheadline: string;
    image: string;
  };
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  pricing: {
    basic: string;
    standard: string;
    premium: string;
  };
  contact: {
    email: string;
    whatsapp: string;
  };
  offers: {
    isActive: boolean;
    title: string;
    description: string;
    discountCode: string;
    badge: string;
  };
  messages: Message[];
}

const defaultContent: ContentState = {
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
  coverBanner: {
    headline: "Scale Your\nEmpire",
    subheadline: "\"We don't just run ads; we engineer market dominance through data-driven precision and aggressive scaling strategies.\"",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2400",
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

interface ContentContextType {
  content: ContentState;
  updateContent: (newContent: Partial<ContentState>) => Promise<void>;
  addMessage: (msg: Omit<Message, 'id' | 'timestamp' | 'status' | 'orderId'>) => Promise<string>;
  updateMessageStatus: (messageId: string, status: MessageStatus) => Promise<void>;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  isContactModalOpen: boolean;
  setContactModalOpen: (val: boolean) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentState>(defaultContent);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // 1. First, check localStorage for any "stale" but potentially newer local edits
      const localStored = localStorage.getItem('site_content_cache');
      if (localStored) {
         try {
           const parsed = JSON.parse(localStored);
           setContent(prev => ({ ...prev, ...parsed }));
         } catch (e) {
           console.warn("Local cache corrupted");
         }
      }

      try {
        const [contentRes, authRes] = await Promise.all([
          fetch('/api/content', { credentials: 'include' }),
          fetch('/api/auth-status', { credentials: 'include' })
        ]);
        
        if (contentRes.ok) {
          const data = await contentRes.json();
          // Ensure all required fields exist by merging with defaults
          const merged = {
            ...defaultContent,
            ...data,
            hero: { ...(defaultContent.hero), ...(data.hero || {}) },
            about: { ...(defaultContent.about), ...(data.about || {}) },
            pricing: { ...(defaultContent.pricing), ...(data.pricing || {}) },
            coverBanner: { ...(defaultContent.coverBanner), ...(data.coverBanner || {}) },
            contact: { ...(defaultContent.contact), ...(data.contact || {}) },
            offers: { ...(defaultContent.offers), ...(data.offers || {}) },
            services: data.services || defaultContent.services,
            portfolio: data.portfolio || defaultContent.portfolio,
            messages: data.messages || defaultContent.messages,
          };
          setContent(merged);
          // Sync local storage with latest server data
          localStorage.setItem('site_content_cache', JSON.stringify(merged));
        }
        
        if (authRes.ok) {
          const { isAdmin } = await authRes.json();
          setIsAdmin(isAdmin);
        }
      } catch (error) {
        console.error("Initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const updateContent = async (newContent: Partial<ContentState>): Promise<{ success: boolean; persistence?: string; data?: ContentState }> => {
    const finalUpdated: ContentState = {
      ...content,
      ...newContent,
      hero: { ...content.hero, ...(newContent.hero || {}) },
      about: { ...content.about, ...(newContent.about || {}) },
      pricing: { ...content.pricing, ...(newContent.pricing || {}) },
      coverBanner: { ...content.coverBanner, ...(newContent.coverBanner || {}) },
      contact: { ...content.contact, ...(newContent.contact || {}) },
      offers: { ...content.offers, ...(newContent.offers || {}) },
      services: newContent.services || content.services,
      portfolio: newContent.portfolio || content.portfolio,
      messages: newContent.messages || content.messages,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        signal: controller.signal,
        body: JSON.stringify(finalUpdated)
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: `Server error code ${res.status}` }));
        throw new Error(errorData.error || errorData.details || `Database persistence failed (${res.status})`);
      }

      const responseJson = await res.json();
      const verifiedContent = responseJson.data || finalUpdated;

      // Update state and cache with verified saved state
      setContent(verifiedContent);
      localStorage.setItem('site_content_cache', JSON.stringify(verifiedContent));

      return responseJson;
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error("[ContentContext] Save error:", error);
      if (error.name === 'AbortError') {
        throw new Error("Save request timed out. Please check your network connection and retry.");
      }
      throw error;
    }
  };
 
  const addMessage = async (msg: Omit<Message, 'id' | 'timestamp' | 'status' | 'orderId'>): Promise<string> => {
    const orderId = `IK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const newMessage: Message = {
      ...msg,
      id: Date.now().toString(),
      orderId,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    
    // Update local state
    const updatedMessages = [newMessage, ...content.messages];
    setContent(prev => ({ ...prev, messages: updatedMessages }));
 
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      });
      if (!res.ok) throw new Error("Failed to sync message with server.");
      return orderId;
    } catch (error) {
      console.error("Message sync error:", error);
      return orderId;
    }
  };

  const updateMessageStatus = async (messageId: string, status: MessageStatus) => {
    const updatedMessages = content.messages.map(m => 
      m.id === messageId ? { ...m, status } : m
    );
    await updateContent({ messages: updatedMessages });
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#00040a] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      addMessage, 
      updateMessageStatus,
      isAdmin, 
      setIsAdmin,
      isContactModalOpen,
      setContactModalOpen 
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
}
