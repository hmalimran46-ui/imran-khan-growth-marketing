import React, { createContext, useContext, useState, useEffect } from 'react';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  timestamp: number;
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
  messages: []
};

interface ContentContextType {
  content: ContentState;
  updateContent: (newContent: Partial<ContentState>) => void;
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
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
      try {
        const [contentRes, authRes] = await Promise.all([
          fetch('/api/content'),
          fetch('/api/auth-status')
        ]);
        
        if (contentRes.ok) {
          const data = await contentRes.json();
          // Ensure all required fields exist by merging with defaults
          setContent(prev => ({
            ...prev,
            ...data,
            hero: { ...prev.hero, ...(data.hero || {}) },
            about: { ...prev.about, ...(data.about || {}) },
            pricing: { ...prev.pricing, ...(data.pricing || {}) },
            coverBanner: { ...prev.coverBanner, ...(data.coverBanner || {}) },
            contact: { ...prev.contact, ...(data.contact || {}) },
            services: data.services || prev.services || [],
            portfolio: data.portfolio || prev.portfolio || [],
            messages: data.messages || prev.messages || [],
          }));
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

  const updateContent = async (newContent: Partial<ContentState>) => {
    const updated = { ...content, ...newContent };
    
    // Update local state immediately for UX
    setContent(updated);

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (!res.ok) throw new Error("Failed to sync with server");
    } catch (error) {
      console.error(error);
      alert("Operational sync failed. Changes may not be persistent across sessions.");
    }
  };

  const addMessage = async (msg: Omit<Message, 'id' | 'timestamp'>) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      });
      if (res.ok) {
        // Refresh content to show new message in admin panel
        const contentRes = await fetch('/api/content');
        if (contentRes.ok) {
          setContent(await contentRes.json());
        }
      }
    } catch (error) {
      console.error("Failed to transmit message:", error);
    }
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
