import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../pages/ProfilePage"; 

interface AuthContextType {
  currentUser: User | null;
  login: (userData: { username: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("arteria_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData: { username: string }) => {
    const user: User = {
      name: userData.username,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + userData.username,
    };
    setCurrentUser(user);
    localStorage.setItem("arteria_user", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("arteria_user");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}