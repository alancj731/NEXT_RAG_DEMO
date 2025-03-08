"use client";
import { useChat } from "@ai-sdk/react";
import { User, BotMessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
// import { useMessageStore } from "@/store/messageStore";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { Trash2 } from "lucide-react";

export default function Chat() {
  const {
    setMessages,
    messages,
    input,
    status,
    handleInputChange,
    handleSubmit,
  } = useChat();

  // const { msgHistory, setMsgHistory } = useMessageStore();
  const { msgHistory, setMsgHistory } = useAppContext();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setMessages([...msgHistory]);
  }, [refresh]);

  useEffect(() => {
    if (messages.length > 1) {
      setMsgHistory([...messages]);
    }
  }, [messages]);

  const myHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
  };

  const myHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setMsgHistory([...messages]);
    e.preventDefault();
    handleSubmit(e);
  };

  const resetMsgHistory = () => {
    const initHistory = [
      {
        id: uuidv4(),
        role: "assistant" as const,
        content: "Hello, how can I help you?",
        parts: [],
      },
    ];
    setMsgHistory(initHistory);
    setRefresh(!refresh); // force refresh
  };

  return (
    <div className="flex flex-col w-full max-w-md py-8 px-2 stretch">
      <div className="max-h-164 overflow-y-auto">
        {messages.map((m, index) => (
          <div
            key={m.id}
            className={`flex 
          ${m.role === "user" ? "justify-start" : "justify-end"} 
          items-start gap-2 p-2`}
          >
            {m.role === "user" ? (
              <User size={24} />
            ) : (
              <BotMessageSquare size={24} />
            )}
            <p>:</p>
            <div className="w-full ">{m.content}</div>
          </div>
        ))}
      </div>
      {status === "submitted" && (
        <div className="flex justify-start items-center gap-2 px-2 py-2">
          <BotMessageSquare size={24} />
          <p className="ml-1 loading font-bold inline-block font-mono text-2xl">
            ...
          </p>
        </div>
      )}

      <Button
        variant="ghost"
        className="fixed bottom-13 left-176 p-0"
        onClick={resetMsgHistory}
      >
        <Trash2 size={24} />
      </Button>

      <form onSubmit={myHandleSubmit} className="flex">
        <input
          className="fixed w-[430px] dark:bg-zinc-900 bottom-4 max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Ask me..."
          onChange={myHandleInputChange}
        />
      </form>
    </div>
  );
}
