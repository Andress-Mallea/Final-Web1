import { jsx } from "react/jsx-runtime";
function Avatar({ src, size = 8, className = "" }) {
  return /* @__PURE__ */ jsx(
    "img",
    {
      src,
      alt: "avatar",
      className: `rounded-full object-cover bg-muted ring-1 ring-border ${className}`,
      style: { width: `${size * 4}px`, height: `${size * 4}px` }
    }
  );
}
export {
  Avatar as default
};
