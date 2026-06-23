import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Hash, Upload, X } from "lucide-react";
import { ALL_TAGS } from "../data/mockData";
import TagPill from "../components/common/TagPill";
function PublishPage({ onDone }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileRef = useRef(null);
  function toggleTag(tag) {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  }
  function handleFile(e) {
    const file = e.target.files?.[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto p-6 pb-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { style: { fontFamily: "'Playfair Display', serif" }, className: "text-2xl font-bold text-foreground", children: "Publish Artwork" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Share your work with the Arteria community." })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onDone, className: "p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors", children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3", children: "Artwork File" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => fileRef.current?.click(),
            className: "border-2 border-dashed border-border hover:border-primary/60 rounded-xl transition-colors cursor-pointer group overflow-hidden",
            style: { minHeight: "320px" },
            children: previewUrl ? /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("img", { src: previewUrl, alt: "preview", className: "w-full object-cover rounded-xl" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "opacity-0 group-hover:opacity-100 text-white text-sm font-medium transition-opacity", children: "Change image" }) })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-80 gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center group-hover:border-primary/40 transition-colors", children: /* @__PURE__ */ jsx(Upload, { className: "w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" }) }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground font-medium", children: "Drop your artwork here" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "PNG, JPG, GIF, WebP \xB7 Max 50MB" })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx("input", { ref: fileRef, type: "file", accept: "image/*", className: "hidden", onChange: handleFile })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider", children: "Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: title,
              onChange: (e) => setTitle(e.target.value),
              placeholder: "Give your artwork a title\u2026",
              className: "w-full mt-1.5 px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider", children: "Description" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: description,
              onChange: (e) => setDescription(e.target.value),
              placeholder: "Describe your piece \u2014 medium, inspiration, process\u2026",
              rows: 4,
              className: "w-full mt-1.5 px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors text-sm resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Hash, { className: "w-3 h-3" }),
            " Tags",
            selectedTags.length > 0 && /* @__PURE__ */ jsxs("span", { className: "text-primary", children: [
              "\xB7 ",
              selectedTags.length,
              " selected"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 mt-2", children: ALL_TAGS.map((tag) => /* @__PURE__ */ jsx(TagPill, { tag, active: selectedTags.includes(tag), onClick: () => toggleTag(tag) }, tag)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider", children: "Mature Content" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", id: "mature", className: "accent-primary" }),
            /* @__PURE__ */ jsx("label", { htmlFor: "mature", className: "text-sm text-muted-foreground", children: "Mark as mature / 18+" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onDone,
              className: "flex-1 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-sm",
              children: "Save Draft"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: onDone,
              className: "flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Upload, { className: "w-4 h-4" }),
                "Publish"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  PublishPage as default
};
