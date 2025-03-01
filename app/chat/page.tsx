"use client";
import { useChat } from "@ai-sdk/react";
import { User, BotMessageSquare } from "lucide-react";
import { useEffect} from "react";
// import { useMessageStore } from "@/store/messageStore";
import { useAppContext } from "@/context/AppContext";

export default function Chat() {
  const { setMessages, messages, input, handleInputChange, handleSubmit } =
    useChat();
  
  // const { msgHistory, setMsgHistory } = useMessageStore();
  const {msgHistory, setMsgHistory} = useAppContext();

  useEffect(() => {
    setMessages([...msgHistory]);
  },[]);

  useEffect(() => {
    if(messages.length > 1){
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

      <form onSubmit={myHandleSubmit} className="flex">
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
