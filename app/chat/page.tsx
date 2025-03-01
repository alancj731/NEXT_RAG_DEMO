"use client";
import { useChat } from "@ai-sdk/react";
import { Message } from "ai";
import { User, BotMessageSquare } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useRef, useEffect} from "react";

export default function Chat() {
  const { append, setMessages, messages, input, handleInputChange, handleSubmit } =
    useChat();
  const { msgHistory, setMsgHistory } = useAppContext();

  useEffect(() => {
    setMessages(msgHistory);
  }, []);

  useEffect(() => {
    setMsgHistory(messages);
    }, [messages]);

  const myHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(messages);
    handleInputChange(e);
  };
  return (
    <div className="flex flex-col w-full max-w-md py-24 space-y-4 px-2 stretch">
      {messages.map((m) => (
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
          <div className="w-full ">
          {m.content}
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex">
        <input
          className="fixed dark:bg-zinc-900 bottom-8 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Ask me..."
          onChange={myHandleInputChange}
        />
      </form>
    </div>
  );
}
