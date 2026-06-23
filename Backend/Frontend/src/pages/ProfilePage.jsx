import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowLeft, MessageSquare, Heart } from "lucide-react";
import { ARTWORKS } from "../data/mockData";
function ProfilePage({ onBack }) {
  const [tab, setTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const userPosts = ARTWORKS.filter((a) => a.artist === "NightPixel");
  const favPosts = ARTWORKS.filter((a) => a.isBookmarked);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "relative h-52 bg-muted overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=300&fit=crop&auto=format",
          alt: "cover",
          className: "w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent to-background/80" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onBack,
          className: "absolute top-4 left-4 p-2 rounded-lg bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors",
          children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "px-6 -mt-12 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-4", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop",
              alt: "avatar",
              className: "w-24 h-24 rounded-2xl object-cover border-4 border-background ring-2 ring-primary/30"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
            /* @__PURE__ */ jsx("h2", { style: { fontFamily: "'Playfair Display', serif" }, className: "text-xl font-bold text-foreground", children: "NightPixel" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground font-mono", children: "@nightpixel \xB7 Digital Artist" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-2", children: [
          /* @__PURE__ */ jsx("button", { className: "p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors", children: /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsFollowing(!isFollowing),
              className: `px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${isFollowing ? "bg-secondary border border-primary/40 text-primary" : "bg-primary text-primary-foreground hover:bg-primary/90"}`,
              children: isFollowing ? "Following" : "Follow"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-muted-foreground leading-relaxed max-w-lg", children: "Dark fantasy illustrator & concept artist. I paint the things that live at the edge of sleep. Open for commissions \u2726 Ships illustrations in 7\u201310 days." }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-6 mt-5", children: [
        { label: "Posts", value: "214" },
        { label: "Followers", value: "18.4k" },
        { label: "Following", value: "302" }
      ].map(({ label, value }) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg font-bold font-mono text-foreground", children: value }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: label })
      ] }, label)) }),
      /* @__PURE__ */ jsx("div", { className: "flex border-b border-border mt-6 gap-1", children: ["posts", "favorites"].map((t) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setTab(t),
          className: `px-4 pb-3 text-sm font-medium capitalize transition-colors relative ${tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
          children: [
            t,
            tab === t && /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" })
          ]
        },
        t
      )) }),
      /* @__PURE__ */ jsx("div", { className: "pt-6 pb-8", children: /* @__PURE__ */ jsxs("div", { className: "columns-2 lg:columns-3 gap-4", children: [
        (tab === "posts" ? userPosts : favPosts).map((art) => /* @__PURE__ */ jsx("div", { className: "break-inside-avoid mb-4 rounded-xl overflow-hidden group cursor-pointer", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-muted", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: art.imageUrl,
              alt: art.title,
              className: "w-full object-cover group-hover:scale-105 transition-transform duration-500",
              style: { maxHeight: "280px" }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "opacity-0 group-hover:opacity-100 transition-opacity flex gap-3 text-white text-sm", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Heart, { className: "w-4 h-4" }),
              " ",
              fmtNum(art.likes)
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }),
              " ",
              fmtNum(art.views)
            ] })
          ] }) })
        ] }) }, art.id)),
        (tab === "posts" ? userPosts : favPosts).length === 0 && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm col-span-3", children: "Nothing here yet." })
      ] }) })
    ] })
  ] });
}
export {
  ProfilePage as default
};
