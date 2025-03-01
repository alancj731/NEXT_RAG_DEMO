'use client';

import { UIMessage } from "ai";
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface MessageState {
  msgHistory: UIMessage[];
  setMsgHistory: (messages: UIMessage[]) => void;
  addMessage: (message: UIMessage) => void;
  clearMessages: () => void;
}

// Create the initial message
const createInitialMessage = () => {
  const id = uuidv4();
  return { 
    id, 
    role: "assistant" as const, 
    content: "Hello, how can I help you?", 
    parts: [] 
  };
};

// Create the store
// export const useMessageStore = create<MessageState>((set) => ({
//     msgHistory: [createInitialMessage()],
//   setMsgHistory: (messages) => set({ msgHistory: messages }),
//   addMessage: (message) => set((state) => ({ 
//     msgHistory: [...state.msgHistory, message] 
//   })),
//   clearMessages: () => set({ msgHistory: [createInitialMessage()] })
// }));
export const useMessageStore = create<MessageState>()(
  persist(
    (set) => ({
      msgHistory: [createInitialMessage()],
      setMsgHistory: (messages) => set({ msgHistory: [...messages] }),
      addMessage: (message) =>
        set((state) => ({
          msgHistory: [...state.msgHistory, message],
        })),
      clearMessages: () => set({ msgHistory: [createInitialMessage()] }),
    }),
    {
      name: 'message-storage', // Unique name for the storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  ));