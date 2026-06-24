import { useState, FormEvent } from "react";
import { login } from "../services/api";


interface AuthPageProps {
  onSuccess?: (userData: { username: string; [key: string]: any }) => void;
}

function AuthPage({ onSuccess }: AuthPageProps) {
  
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); 
    setIsLoading(true);

    try {
      if (mode === "login") {
        const data = await login(username, password);
        console.log("¡Login exitoso!", data);
        
        if (onSuccess) onSuccess({ ...data, username }); 
      } else {
        console.log("El registro se implementará en el próximo paso.");
        setError("El registro aún no está conectado. Usa 'Sign In'.");
      }
    } catch (err: any) { 
      console.error("Error de autenticación:", err);
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        setError("Faltan campos obligatorios o el formato es incorrecto.");
      } else {
        setError(detail || "Usuario o contraseña incorrectos.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex">
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=900&h=900&fit=crop&auto=format"
          alt="artwork"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="relative z-10 p-12 mt-auto mb-12">
          <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl font-bold text-white leading-tight max-w-xs">
            Where art finds its audience.
          </p>
          <p className="text-white/60 mt-3 text-sm max-w-xs">
            Join 2 million artists and collectors on Arteria.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 px-8 py-16 bg-background max-w-md w-full mx-auto lg:mx-0 lg:max-w-none lg:w-[460px] lg:flex-none">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="flex gap-1 p-1 bg-secondary rounded-xl w-fit mb-6">
              {["login", "signup"].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => { setMode(m as "login" | "signup"); setError(""); }}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                    mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-foreground">
              {mode === "login" ? "Welcome back." : "Start your gallery."}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "login" ? "Sign in to your Arteria account." : "Create your free account and start sharing."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ej: NightPixel o admin"
                required
                className="w-full mt-1.5 px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors text-sm"
              />
            </div>
            {mode === "signup" && (
              <div>
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required={mode === "signup"}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors text-sm"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full mt-1.5 px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors text-sm"
              />
            </div>
            {error && (
              <p className="text-xs text-red-500 font-medium bg-red-500/10 p-2 rounded border border-red-500/20">
                {error}
              </p>
            )}

            {mode === "signup" && (
              <div className="flex items-start gap-2 pt-1">
                <input type="checkbox" id="terms" required className="mt-0.5 accent-primary" />
                <label htmlFor="terms" className="text-xs text-muted-foreground">
                  I agree to the Terms of Service and Privacy Policy.
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors mt-2 disabled:opacity-50"
            >
              {isLoading ? "Conectando..." : (mode === "login" ? "Sign In" : "Create Account")}
            </button>
          </form>

          <div className="relative my-6">
            <div className="h-px bg-border" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-3 text-xs text-muted-foreground">
              or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "Discord"].map((provider) => (
              <button
                key={provider}
                type="button"
                className="py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {provider}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;