'use client';
import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react";
import { UIMessage } from "ai";
import { v4 as uuidv4 } from 'uuid';

// Define the context type
interface AppContextType {
  msgHistory: UIMessage[];
  setMsgHistory: (messages: UIMessage[]) => void;
}

// Create the context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component with localStorage persistence
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const id: string = uuidv4();
  const initialMessage = { id, role: "assistant" as const, content: "Hello, how can I help you?", parts: [] };
  
  // Initialize state from localStorage or use default
  const [msgHistory, setMsgHistoryState] = useState<UIMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('messageHistory');
      return saved ? JSON.parse(saved) : [initialMessage];
    }
    console.log('initial messages 26:', initialMessage)
    return [initialMessage];
  });

  // Custom setter that updates both state and localStorage
  const setMsgHistory = (messages: UIMessage[]) => {
    console.log('setMsgHistory touched:', messages)
    setMsgHistoryState(messages);
    if (typeof window !== 'undefined') {
      localStorage.setItem('messageHistory', JSON.stringify(messages));
    }
  };

  // Sync with localStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('messageHistory', JSON.stringify(msgHistory));
    }
    console.log('msgHistory changed:', msgHistory)
  }, [msgHistory]);

  const contextValue = useMemo(() => ({ 
    msgHistory, 
    setMsgHistory 
  }), [msgHistory, setMsgHistory]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};