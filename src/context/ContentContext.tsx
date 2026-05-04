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
  const [content, setContent] = useState<ContentState>(() => {
    const saved = localStorage.getItem('site_content');
    return saved ? JSON.parse(saved) : defaultContent;
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('site_content', JSON.stringify(content));
  }, [content]);

  const updateContent = (newContent: Partial<ContentState>) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  const addMessage = (msg: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage = {
      ...msg,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setContent(prev => ({
      ...prev,
      messages: [newMessage, ...prev.messages]
    }));
  };

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
