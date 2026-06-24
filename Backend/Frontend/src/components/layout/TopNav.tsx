import { Search, Plus, Bell, MessageSquare, User, Palette } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "../common/Avatar";
import styles from "./TopNav.module.css";

interface TopNavProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentUser: { name: string; avatar: string } | null;
}

export default function TopNav({ searchQuery, setSearchQuery, currentUser }: TopNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

 return (
    <header className={styles.nav}>
      <button onClick={() => navigate("/")} className={styles.nav__brand}>
        <div className={styles['nav__logo-box']}>
          <Palette className="w-4 h-4 text-primary" />
        </div>
        <span className={styles.nav__title}>Arteria</span>
      </button>

      <div className={styles['nav__search-container']}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search artworks..."
          className={styles['nav__search-input']}
        />
      </div>

      <div className={styles.nav__actions}>
        <button onClick={() => navigate("/publish")} className={`${styles.nav__btn} ${styles['nav__btn--primary']}`}>
          <Plus className="w-4 h-4" />
          <span className="hidden sm:block">Publish</span>
        </button>

        <button className={styles.nav__btn}>
          <Bell className="w-4 h-4" />
        </button>
        
        <button onClick={() => navigate("/chat")} className={styles.nav__btn}>
          <MessageSquare className="w-4 h-4" />
        </button>

        {currentUser ? (
          <button onClick={() => navigate("/profile")} className="ml-1">
            <Avatar src={currentUser.avatar} size={8} />
          </button>
        ) : (
          <button onClick={() => navigate("/auth")} className={`${styles.nav__btn} border border-border`}>
            <User className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
}