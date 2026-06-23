import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Image, Plus, Send } from "lucide-react";
import { CHAT_MESSAGES, COMMISSIONS } from "../data/mockData";
import Avatar from "../components/common/Avatar";
function ChatPage() {
  const [activeCommission, setActiveCommission] = useState(COMMISSIONS[0]);
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [input, setInput] = useState("");
  const statusColors = {
    open: "text-yellow-400 bg-yellow-400/10",
    in_progress: "text-blue-400 bg-blue-400/10",
    completed: "text-green-400 bg-green-400/10"
  };
  const statusLabels = {
    open: "Open",
    in_progress: "In Progress",
    completed: "Completed"
  };
  function sendMessage() {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), sender: "me", text: input.trim(), time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
    ]);
    setInput("");
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex h-[calc(100vh-56px)]", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-72 border-r border-border flex flex-col bg-card shrink-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-border", children: [
        /* @__PURE__ */ jsx("h2", { style: { fontFamily: "'Playfair Display', serif" }, className: "text-base font-semibold text-foreground", children: "Commissions" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Your active commission threads" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-y-auto flex-1", children: COMMISSIONS.map((c) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveCommission(c),
          className: `w-full p-4 text-left border-b border-border hover:bg-secondary/50 transition-colors ${activeCommission.id === c.id ? "bg-secondary" : ""}`,
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Avatar, { src: c.avatar, size: 10 }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: c.artist }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground font-mono", children: c.time })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: c.lastMessage }),
              /* @__PURE__ */ jsx("span", { className: `text-[10px] font-mono px-1.5 py-0.5 rounded mt-1.5 inline-block ${statusColors[c.status]}`, children: statusLabels[c.status] })
            ] }),
            c.unread > 0 && /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-mono shrink-0", children: c.unread })
          ] })
        },
        c.id
      )) }),
      /* @__PURE__ */ jsx("div", { className: "p-4 border-t border-border", children: /* @__PURE__ */ jsxs("button", { className: "w-full py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
        " New Commission"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-6 py-4 border-b border-border bg-card", children: [
        /* @__PURE__ */ jsx(Avatar, { src: activeCommission.avatar, size: 10 }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: activeCommission.artist }),
          /* @__PURE__ */ jsx("span", { className: `text-[10px] font-mono px-1.5 py-0.5 rounded ${statusColors[activeCommission.status]}`, children: statusLabels[activeCommission.status] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ml-auto flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { className: "p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors", children: /* @__PURE__ */ jsx(Image, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("button", { className: "px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors", children: "View Brief" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-6 space-y-4", children: messages.map((msg) => /* @__PURE__ */ jsxs("div", { className: `flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`, children: [
        msg.sender === "them" && /* @__PURE__ */ jsx(Avatar, { src: activeCommission.avatar, size: 8, className: "mr-2 mt-auto shrink-0" }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === "me" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-foreground rounded-bl-sm"}`,
            children: [
              msg.text,
              /* @__PURE__ */ jsx("p", { className: `text-[10px] font-mono mt-1 ${msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`, children: msg.time })
            ]
          }
        )
      ] }, msg.id)) }),
      /* @__PURE__ */ jsx("div", { className: "p-4 border-t border-border bg-card", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-end", children: [
        /* @__PURE__ */ jsx("button", { className: "p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0", children: /* @__PURE__ */ jsx(Image, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsx(
          "textarea",
          {
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            },
            placeholder: "Write a message\u2026",
            rows: 1,
            className: "w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors text-sm resize-none"
          }
        ) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: sendMessage,
            disabled: !input.trim(),
            className: "p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-all shrink-0",
            children: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" })
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  ChatPage as default
};
