'use client';
import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react";
import { UIMessage } from "ai";
import { v4 as uuidv4 } from 'uuid';
import { sysInfo } from "./system.prompt";

// Define the context type
interface AppContextType {
  msgHistory: UIMessage[];
  setMsgHistory: (messages: UIMessage[]) => void;
  resetMsgHistory: () => void;
}

// Create the context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component with localStorage persistence
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const systemMessage = { id: uuidv4(), role: "system" as const, content: `
    You are a candidate for a job opening, try to answer questions about yourself based on the following background information.
    
    BEGIN OF BACKGROUND INFORMATION
    =====================
    ${sysInfo}
    =====================
    END OF BACKGROUND INFORMATION
    `, parts: [] };
  const initialMessage = { id : uuidv4(), role: "assistant" as const, content: "Hi, I'm Jian! Welcome to my portfolio webpage", parts: [] };
  
  // Initialize state from localStorage or use default
  const [msgHistory, setMsgHistoryState] = useState<UIMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('messageHistory');
      return saved ? JSON.parse(saved) : [initialMessage];
    }
    return [initialMessage];
  });

  // Custom setter that updates both state and localStorage
  const setMsgHistory = (messages: UIMessage[]) => {
    setMsgHistoryState(messages);
    if (typeof window !== 'undefined') {
      localStorage.setItem('messageHistory', JSON.stringify(messages));
    }
  };

  const resetMsgHistory = () => {
    setMsgHistory([systemMessage, initialMessage]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('messageHistory', JSON.stringify([systemMessage, initialMessage]));
    }
  };

  // Sync with localStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('messageHistory', JSON.stringify(msgHistory));
    }
  }, [msgHistory]);

  return (
    <AppContext.Provider value={{ msgHistory, setMsgHistory, resetMsgHistory }}>
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