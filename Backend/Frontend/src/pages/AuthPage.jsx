import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
function AuthPage({ onSuccess }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  return /* @__PURE__ */ jsxs("div", { className: "min-h-[calc(100vh-56px)] flex", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex flex-col flex-1 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=900&h=900&fit=crop&auto=format",
          alt: "artwork",
          className: "absolute inset-0 w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 p-12 mt-auto mb-12", children: [
        /* @__PURE__ */ jsx("p", { style: { fontFamily: "'Playfair Display', serif" }, className: "text-4xl font-bold text-white leading-tight max-w-xs", children: "Where art finds its audience." }),
        /* @__PURE__ */ jsx("p", { className: "text-white/60 mt-3 text-sm max-w-xs", children: "Join 2 million artists and collectors on Arteria." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center flex-1 px-8 py-16 bg-background max-w-md w-full mx-auto lg:mx-0 lg:max-w-none lg:w-[460px] lg:flex-none", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex gap-1 p-1 bg-secondary rounded-xl w-fit mb-6", children: ["login", "signup"].map((m) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setMode(m),
            className: `px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
            children: m === "login" ? "Sign In" : "Create Account"
          },
          m
        )) }),
        /* @__PURE__ */ jsx("h2", { style: { fontFamily: "'Playfair Display', serif" }, className: "text-2xl font-bold text-foreground", children: mode === "login" ? "Welcome back." : "Start your gallery." }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: mode === "login" ? "Sign in to your Arteria account." : "Create your free account and start sharing." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        onSuccess();
      }, className: "space-y-4", children: [
        mode === "signup" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider", children: "Username" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: username,
              onChange: (e) => setUsername(e.target.value),
              placeholder: "your_artist_handle",
              className: "w-full mt-1.5 px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "you@example.com",
              className: "w-full mt-1.5 px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider", children: "Password" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
              className: "w-full mt-1.5 px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors text-sm"
            }
          )
        ] }),
        mode === "signup" && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 pt-1", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", id: "terms", className: "mt-0.5 accent-primary" }),
          /* @__PURE__ */ jsx("label", { htmlFor: "terms", className: "text-xs text-muted-foreground", children: "I agree to the Terms of Service and Privacy Policy." })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors mt-2",
            children: mode === "login" ? "Sign In" : "Create Account"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative my-6", children: [
        /* @__PURE__ */ jsx("div", { className: "h-px bg-border" }),
        /* @__PURE__ */ jsx("span", { className: "absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-3 text-xs text-muted-foreground", children: "or continue with" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: ["Google", "Discord"].map((provider) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onSuccess,
          className: "py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
          children: provider
        },
        provider
      )) }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-xs text-muted-foreground mt-6", children: [
        mode === "login" ? "Don't have an account? " : "Already have an account? ",
        /* @__PURE__ */ jsx("button", { onClick: () => setMode(mode === "login" ? "signup" : "login"), className: "text-primary hover:underline", children: mode === "login" ? "Sign up" : "Sign in" })
      ] })
    ] }) })
  ] });
}
export {
  AuthPage as default
};
