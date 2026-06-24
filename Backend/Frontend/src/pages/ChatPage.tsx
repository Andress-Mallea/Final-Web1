import { useState, KeyboardEvent } from "react";
import { Image, Plus, Send } from "lucide-react";
import { CHAT_MESSAGES, COMMISSIONS } from "../data/mockData";
import Avatar from "../components/common/Avatar";

// 1. Definimos las estructuras de datos
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
  // 2. Tipamos los estados estrictamente (forzamos los tipos del mockData por ahora)
  const [activeCommission, setActiveCommission] = useState<Commission>(COMMISSIONS[0] as Commission);
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_MESSAGES as ChatMessage[]);
  const [input, setInput] = useState<string>("");

  // 3. Tipamos los objetos de mapeo para evitar errores de índice
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
    <div className="flex h-[calc(100vh-56px)]">
      <div className="w-72 border-r border-border flex flex-col bg-card shrink-0">
        <div className="p-4 border-b border-border">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-base font-semibold text-foreground">
            Commissions
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Your active commission threads</p>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {COMMISSIONS.map((c: any) => {
            const comm = c as Commission;
            return (
              <button
                key={comm.id}
                onClick={() => setActiveCommission(comm)}
                className={`w-full p-4 text-left border-b border-border hover:bg-secondary/50 transition-colors ${activeCommission.id === comm.id ? "bg-secondary" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <Avatar src={comm.avatar} size={10} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{comm.artist}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">{comm.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{comm.lastMessage}</p>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded mt-1.5 inline-block ${statusColors[comm.status]}`}>
                      {statusLabels[comm.status]}
                    </span>
                  </div>
                  {comm.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-mono shrink-0">
                      {comm.unread}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-border">
          <button className="w-full py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> New Commission
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-card">
          <Avatar src={activeCommission.avatar} size={10} />
          <div>
            <p className="font-medium text-foreground">{activeCommission.artist}</p>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${statusColors[activeCommission.status]}`}>
              {statusLabels[activeCommission.status]}
            </span>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Image className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
              View Brief
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "them" && (
                <Avatar src={activeCommission.avatar} size={8} className="mr-2 mt-auto shrink-0" />
              )}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === "me" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-foreground rounded-bl-sm"}`}
              >
                {msg.text}
                <p className={`text-[10px] font-mono mt-1 ${msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-3 items-end">
            <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0">
              <Image className="w-4 h-4" />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Write a message…"
                rows={1}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors text-sm resize-none"
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}