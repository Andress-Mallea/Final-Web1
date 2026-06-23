import { jsx, jsxs } from "react/jsx-runtime";
import { Search, Plus, Bell, MessageSquare, User, Palette } from "lucide-react";
import Avatar from "../common/Avatar";
function TopNav({
  page,
  setPage,
  searchQuery,
  setSearchQuery,
  currentUser
}) {
  return /* @__PURE__ */ jsxs("header", { className: "fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/90 backdrop-blur-md flex items-center px-4 gap-4", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setPage("hub"),
        className: "flex items-center gap-2 shrink-0",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center", children: /* @__PURE__ */ jsx(Palette, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsx("span", { style: { fontFamily: "'Playfair Display', serif" }, className: "text-lg font-semibold text-foreground hidden sm:block", children: "Arteria" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 max-w-lg relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          placeholder: "Search artworks, artists, tags\u2026",
          className: "w-full pl-9 pr-4 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 ml-auto", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setPage("publish"),
          className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: "Publish" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("button", { className: "p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors relative", children: [
        /* @__PURE__ */ jsx(Bell, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx("span", { className: "absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setPage("chat"),
          className: `p-2 rounded-lg transition-colors ${page === "chat" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`,
          children: /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4" })
        }
      ),
      currentUser ? /* @__PURE__ */ jsx("button", { onClick: () => setPage("profile"), className: "ml-1", children: /* @__PURE__ */ jsx(Avatar, { src: currentUser.avatar, size: 8, className: "hover:ring-2 hover:ring-primary transition-all" }) }) : /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setPage("auth"),
          className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm text-foreground hover:bg-secondary transition-colors ml-1",
          children: [
            /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }),
            "Sign In"
          ]
        }
      )
    ] })
  ] });
}
export {
  TopNav as default
};
