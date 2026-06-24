import { useState, KeyboardEvent } from "react";
import { Image, Plus, Send } from "lucide-react";
import { CHAT_MESSAGES, COMMISSIONS } from "../data/mockData";
import Avatar from "../components/common/Avatar";
import styles from "./ChatPage.module.css";

export interface Commission {
  id: string | number;
  artist: string;
  avatar: string;
  time: string;
  lastMessage: string;
  status: "open" | "in_progress" | "completed";
  unread: number;
}

export interface ChatMessage {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
}

export default function ChatPage() {
 
  const [activeCommission, setActiveCommission] = useState<Commission>(COMMISSIONS[0] as Commission);
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_MESSAGES as ChatMessage[]);
  const [input, setInput] = useState<string>("");

  
  const statusColors: Record<Commission["status"], string> = {
    open: "text-yellow-400 bg-yellow-400/10",
    in_progress: "text-blue-400 bg-blue-400/10",
    completed: "text-green-400 bg-green-400/10"
  };

  const statusLabels: Record<Commission["status"], string> = {
    open: "Open",
    in_progress: "In Progress",
    completed: "Completed"
  };

  function sendMessage() {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { 
        id: String(Date.now()), 
        sender: "me", 
        text: input.trim(), 
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) 
      }
    ]);
    setInput("");
  }

  return (
    <div className={styles.chat}>
      <aside className={styles.chat__sidebar}>
        <div className={styles.chat__header}>
          <h2 className={styles.chat__title}>Commissions</h2>
        </div>
        <div className={styles.chat__list}>
          {COMMISSIONS.map((c: any) => {
            const comm = c as Commission;
            return (
              <button
                key={comm.id}
                onClick={() => setActiveCommission(comm)}
                className={`${styles.chat__item} ${activeCommission.id === comm.id ? styles['chat__item--active'] : ""}`}
              >
                <div className="flex items-center gap-3">
                  <Avatar src={comm.avatar} size={10} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground">{comm.artist}</span>
                    <p className="text-xs text-muted-foreground truncate">{comm.lastMessage}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      <main className={styles.chat__main}>
        <div className="p-4 border-b border-border bg-card flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Avatar src={activeCommission.avatar} size={10} />
                <p className="font-medium text-foreground">{activeCommission.artist}</p>
            </div>
        </div>

        <div className={styles.chat__messages}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`${styles.chat__bubble} ${msg.sender === "me" ? styles['chat__bubble--me'] : styles['chat__bubble--them']}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className={styles['chat__input-area']}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Write a message…"
            className="flex-1 px-4 py-2 rounded-xl bg-secondary border border-border text-sm resize-none"
          />
          <button onClick={sendMessage} className="p-2.5 rounded-xl bg-primary text-white">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}