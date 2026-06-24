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
const handlePublishClick = () => {
    if (!currentUser) {
      const confirmLogin = window.confirm("Necesitas iniciar sesión para publicar. ¿Quieres ir a la página de login?");
      if (confirmLogin) {
        navigate("/auth");
      }
      return;
    }
    navigate("/publish");
  };
 return (
    <header className={styles.nav}>
      <button onClick={() => navigate("/")} className={styles.nav__brand}>
        <div className={styles['nav__logo-box']}>
          <Palette className="w-5 h-5 text-primary" />
        </div>
        <span className={styles.nav__title}>Arteria</span>
      </button>

      <div className={styles['nav__search-container']}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search artworks, artists, tags..."
          className={styles['nav__search-input']}
        />
      </div>

      <div className={styles.nav__actions}>
        <button onClick={handlePublishClick} className={styles['nav__btn--primary']}>
          <Plus className="w-4 h-4" />
          <span>Publish</span>
        </button>
        {currentUser && (
          <>
            <Bell className="w-5 h-5 text-muted-foreground cursor-pointer" />
            <MessageSquare
              onClick={() => navigate("/chat")}
              className="w-5 h-5 text-muted-foreground cursor-pointer"
            />
          </>
        )}
        {currentUser ? (
          <button onClick={() => navigate("/profile")} className="cursor-pointer">
            <Avatar src={currentUser.avatar} size={8} />
          </button>
        ) : (
          <button onClick={() => navigate("/auth")} className={styles['nav__btn--signin']}>
            <User className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}