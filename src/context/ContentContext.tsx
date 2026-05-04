import React, { createContext, useContext, useState, useEffect } from 'react';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  timestamp: number;
}

interface ContentState {
  hero: {
    headline: string;
    subheadline: string;
  };
  pricing: {
    basic: string;
    standard: string;
    premium: string;
  };
  about: {
    profileImage: string;
    name: string;
    role: string;
  };
  messages: Message[];
}

const defaultContent: ContentState = {
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
          setContent(data);
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
