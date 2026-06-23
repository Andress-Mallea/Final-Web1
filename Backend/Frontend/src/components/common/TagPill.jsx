import { jsxs } from "react/jsx-runtime";
function TagPill({ tag, active, onClick }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      className: `px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 border ${active ? "bg-primary/20 border-primary/60 text-primary" : "bg-secondary border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`,
      children: [
        "#",
        tag
      ]
    }
  );
}
export {
  TagPill as default
};
