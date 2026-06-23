import { jsx, jsxs } from "react/jsx-runtime";
import { Home, Users, X, User, MessageSquare, Settings } from "lucide-react";
import { ALL_TAGS } from "../../data/mockData";
import TagPill from "../common/TagPill";
function Sidebar({
  feedMode,
  setFeedMode,
  selectedTags,
  toggleTag,
  setPage,
  page
}) {
  return /* @__PURE__ */ jsxs("aside", { className: "fixed left-0 top-14 bottom-0 w-56 border-r border-border bg-sidebar flex flex-col overflow-y-auto z-40", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-1", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3", children: "Browse" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            setFeedMode("hub");
            setPage("hub");
          },
          className: `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${page === "hub" && feedMode === "hub" ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`,
          children: [
            /* @__PURE__ */ jsx(Home, { className: "w-4 h-4 shrink-0" }),
            "Hub"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            setFeedMode("following");
            setPage("hub");
          },
          className: `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${page === "hub" && feedMode === "following" ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`,
          children: [
            /* @__PURE__ */ jsx(Users, { className: "w-4 h-4 shrink-0" }),
            "Following"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-px bg-border mx-4" }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 flex-1", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3", children: "Filter by Tag" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: ALL_TAGS.map((tag) => /* @__PURE__ */ jsx(TagPill, { tag, active: selectedTags.includes(tag), onClick: () => toggleTag(tag) }, tag)) }),
      selectedTags.length > 0 && /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => selectedTags.forEach(toggleTag),
          className: "mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1",
          children: [
            /* @__PURE__ */ jsx(X, { className: "w-3 h-3" }),
            " Clear filters"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-px bg-border mx-4" }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-1", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setPage("profile"),
          className: `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${page === "profile" ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`,
          children: [
            /* @__PURE__ */ jsx(User, { className: "w-4 h-4 shrink-0" }),
            "Profile"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setPage("chat"),
          className: `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${page === "chat" ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`,
          children: [
            /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4 shrink-0" }),
            "Commissions"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("button", { className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors", children: [
        /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4 shrink-0" }),
        "Settings"
      ] })
    ] })
  ] });
}
export {
  Sidebar as default
};
