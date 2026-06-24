import { Home, Users, X, User, MessageSquare, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ALL_TAGS } from "../../data/mockData";
import TagPill from "../common/TagPill";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  feedMode: string;
  setFeedMode: (mode: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
}

export default function Sidebar({ feedMode, setFeedMode, selectedTags, toggleTag }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string, mode?: string) => 
    currentPath === path && (!mode || feedMode === mode);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__section}>
        <p className={styles.sidebar__title}>Browse</p>
        <button 
          onClick={() => { setFeedMode("hub"); navigate("/"); }}
          className={`${styles.sidebar__link} ${isActive("/", "hub") ? styles['sidebar__link--active'] : ""}`}
        >
          <Home className="w-4 h-4 shrink-0" /> Hub
        </button>
        <button 
          onClick={() => { setFeedMode("following"); navigate("/"); }}
          className={`${styles.sidebar__link} ${isActive("/", "following") ? styles['sidebar__link--active'] : ""}`}
        >
          <Users className="w-4 h-4 shrink-0" /> Following
        </button>
      </div>

      <div className={styles.sidebar__divider} />

      <div className="p-4 flex-1">
        <p className={styles.sidebar__title}>Filter by Tag</p>
        <div className={styles.sidebar__tags}>
          {ALL_TAGS.map((tag) => (
            <TagPill key={tag} tag={tag} active={selectedTags.includes(tag)} onClick={() => toggleTag(tag)} />
          ))}
        </div>
        {selectedTags.length > 0 && (
          <button onClick={() => selectedTags.forEach(toggleTag)}
                  className={styles['sidebar__clear-btn']}
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>

      <div className={styles.sidebar__divider} />

      <div className={styles.sidebar__section}>
        <button 
          onClick={() => navigate("/profile")}
          className={`${styles.sidebar__link} ${isActive("/profile") ? styles['sidebar__link--active'] : ""}`}
        >
          <User className="w-4 h-4 shrink-0" /> Profile
        </button>
        <button 
          onClick={() => navigate("/chat")}
          className={`${styles.sidebar__link} ${isActive("/chat") ? styles['sidebar__link--active'] : ""}`}
        >
          <MessageSquare className="w-4 h-4 shrink-0" /> Commissions
        </button>
        <button 
          onClick={() => { localStorage.removeItem("arteria_user"); window.location.reload(); }}
          className={`${styles.sidebar__link} ${styles.sidebar__signout}`}
        >
          <Settings className="w-4 h-4 shrink-0" /> Sign Out
        </button>
      </div>
    </aside>
  );
}