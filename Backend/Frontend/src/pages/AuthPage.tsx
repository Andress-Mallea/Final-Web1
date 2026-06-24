import { useState, FormEvent } from "react";
import api, { login } from "../services/api"; 
import styles from "./AuthPage.module.css";

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
        
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
        }
        
        if (onSuccess) onSuccess({ ...data, username }); 
      } else {
        // 1. Registramos al usuario usando 'api'
        await api.post("/api/v1/auth/register", {
          username,
          email,
          password
        });
        
        // 2. Si el registro es exitoso, iniciamos sesión automáticamente
        const data = await login(username, password);
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
        }
        if (onSuccess) onSuccess({ ...data, username }); 
      }
    } catch (err: any) { 
      console.error("Error de autenticación:", err);
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        setError("Faltan campos obligatorios o el formato es incorrecto.");
      } else {
        setError(detail || "Error al procesar la solicitud.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['auth-page']}>
      <div className={styles['auth-page__sidebar']}>
        <img src="https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=900&h=900&fit=crop&auto=format" className={styles['auth-page__image']} alt="Art" />
        <div className={styles['auth-page__overlay']} />
      </div>

      <div className={styles['auth-page__content']}>
        <div className={styles['auth-page__form-container']}>
          <div className={styles['auth-page__tabs']}>
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as "login" | "signup")}
                className={`${styles['auth-page__tab']} ${mode === m ? styles['auth-page__tab--active'] : ""}`}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles['auth-page__input-group']}>
              <label className={styles['auth-page__label']}>Username</label>
              <input className={styles['auth-page__input']} value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>

            {mode === "signup" && (
              <div className={styles['auth-page__input-group']}>
                <label className={styles['auth-page__label']}>Email</label>
                <input className={styles['auth-page__input']} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            )}

            <div className={styles['auth-page__input-group']}>
              <label className={styles['auth-page__label']}>Password</label>
              <input className={styles['auth-page__input']} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit" disabled={isLoading} className={styles['auth-page__btn']}>
              {isLoading ? "Conectando..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;