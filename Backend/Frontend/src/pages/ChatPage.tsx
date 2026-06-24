import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import Avatar from "../components/common/Avatar";
import {
  Conversation,
  ChatMessage,
  createConversation,
  getConversationMessages,
  getConversations,
  sendConversationMessage,
} from "../services/api";
import styles from "./ChatPage.module.css";

function formatMessageTime(value: string) {
  return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [participantUsername, setParticipantUsername] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getConversations()
      .then((data) => {
        setConversations(data);
        setActiveConversation(data[0] ?? null);
      })
      .catch(() => setError("No se pudieron cargar las conversaciones."))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!activeConversation) {
      setMessages([]);
      return;
    }

    getConversationMessages(activeConversation.id)
      .then(setMessages)
      .catch(() => setError("No se pudieron cargar los mensajes."));
  }, [activeConversation]);

  async function handleStartConversation() {
    const username = participantUsername.trim();
    if (!username) return;

    try {
      setError("");
      const conversation = await createConversation(username);
      setConversations((prev) => {
        const exists = prev.some((item) => item.id === conversation.id);
        return exists ? prev : [conversation, ...prev];
      });
      setActiveConversation(conversation);
      setParticipantUsername("");
    } catch (err: any) {
      setError(err.response?.data?.detail || "No se pudo crear la conversacion.");
    }
  }

  async function sendMessage() {
    if (!input.trim() || !activeConversation) return;

    try {
      setError("");
      const createdMessage = await sendConversationMessage(activeConversation.id, input.trim());
      setMessages((prev) => [...prev, createdMessage]);
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === activeConversation.id
            ? { ...conversation, last_message: createdMessage.body, updated_at: createdMessage.created_at }
            : conversation
        )
      );
      setInput("");
    } catch {
      setError("No se pudo enviar el mensaje.");
    }
  }

  return (
    <div className={styles.chat}>
      <aside className={styles.chat__sidebar}>
        <div className={styles.chat__header}>
          <h2 className={styles.chat__title}>Messages</h2>
          <div className={styles.chat__start}>
            <input
              value={participantUsername}
              onChange={(event) => setParticipantUsername(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleStartConversation();
              }}
              placeholder="Username"
              className={styles.chat__startInput}
            />
            <button onClick={handleStartConversation} className={styles.chat__startButton}>
              Start
            </button>
          </div>
        </div>

        <div className={styles.chat__list}>
          {isLoading && <p className={styles.chat__empty}>Loading conversations...</p>}

          {!isLoading && conversations.length === 0 && (
            <p className={styles.chat__empty}>Start a conversation with another username.</p>
          )}

          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setActiveConversation(conversation)}
              className={`${styles.chat__item} ${
                activeConversation?.id === conversation.id ? styles["chat__item--active"] : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar src={conversation.participant_avatar} size={10} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground">
                    {conversation.participant_username}
                  </span>
                  <p className="text-xs text-muted-foreground truncate">
                    {conversation.last_message || "No messages yet"}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <main className={styles.chat__main}>
        <div className="p-4 border-b border-border bg-card flex items-center justify-between">
          {activeConversation ? (
            <div className="flex items-center gap-3">
              <Avatar src={activeConversation.participant_avatar} size={10} />
              <p className="font-medium text-foreground">{activeConversation.participant_username}</p>
            </div>
          ) : (
            <p className="font-medium text-muted-foreground">Select or start a conversation</p>
          )}
        </div>

        {error && <div className={styles.chat__error}>{error}</div>}

        <div className={styles.chat__messages}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div>
                <div
                  className={`${styles.chat__bubble} ${
                    msg.sender === "me" ? styles["chat__bubble--me"] : styles["chat__bubble--them"]
                  }`}
                >
                  {msg.body}
                </div>
                <p className={styles.chat__time}>{formatMessageTime(msg.created_at)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles["chat__input-area"]}>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
              }
            }}
            disabled={!activeConversation}
            placeholder={activeConversation ? "Write a message..." : "Start a conversation first"}
            className="flex-1 px-4 py-2 rounded-xl bg-secondary border border-border text-sm resize-none"
          />
          <button
            disabled={!activeConversation}
            onClick={sendMessage}
            className="p-2.5 rounded-xl bg-primary text-white disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}