import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Heart, Eye, Bookmark } from "lucide-react";
import Avatar from "../common/Avatar";
import { fmtNum } from "../../utils/formatters";
function ArtworkCard({
  art,
  onArtistClick
}) {
  const [liked, setLiked] = useState(art.isLiked);
  const [bookmarked, setBookmarked] = useState(art.isBookmarked);
  const [hovered, setHovered] = useState(false);
  const heights = {
    portrait: "h-72",
    landscape: "h-44",
    square: "h-56"
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer",
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      children: [
        /* @__PURE__ */ jsxs("div", { className: `relative ${heights[art.aspectRatio]} bg-muted`, children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: art.imageUrl,
              alt: art.title,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}` }),
          /* @__PURE__ */ jsxs("div", { className: `absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-white font-semibold text-sm leading-tight", style: { fontFamily: "'Playfair Display', serif" }, children: art.title }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-1.5 mt-1 flex-wrap", children: art.tags.slice(0, 2).map((tag) => /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-mono text-white/70 bg-white/10 px-1.5 py-0.5 rounded", children: [
                "#",
                tag
              ] }, tag)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    setLiked(!liked);
                  },
                  className: `p-1.5 rounded-lg backdrop-blur-sm transition-colors ${liked ? "bg-red-500/80 text-white" : "bg-white/10 text-white hover:bg-red-500/60"}`,
                  children: /* @__PURE__ */ jsx(Heart, { className: "w-3.5 h-3.5", fill: liked ? "currentColor" : "none" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    setBookmarked(!bookmarked);
                  },
                  className: `p-1.5 rounded-lg backdrop-blur-sm transition-colors ${bookmarked ? "bg-primary/80 text-white" : "bg-white/10 text-white hover:bg-primary/60"}`,
                  children: /* @__PURE__ */ jsx(Bookmark, { className: "w-3.5 h-3.5", fill: bookmarked ? "currentColor" : "none" })
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                onArtistClick();
              },
              className: "flex items-center gap-2 hover:opacity-80 transition-opacity",
              children: [
                /* @__PURE__ */ jsx(Avatar, { src: art.artistAvatar, size: 6 }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-muted-foreground hover:text-foreground transition-colors", children: art.artist })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs", children: [
              /* @__PURE__ */ jsx(Heart, { className: "w-3 h-3", fill: liked ? "currentColor" : "none", color: liked ? "#ef4444" : void 0 }),
              /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px]", children: fmtNum(art.likes + (liked !== art.isLiked ? liked ? 1 : -1 : 0)) })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs", children: [
              /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px]", children: fmtNum(art.views) })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  ArtworkCard as default
};
