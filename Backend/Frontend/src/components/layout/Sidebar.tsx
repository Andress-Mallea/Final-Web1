import { Home, Users, X, User, MessageSquare, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TagPill from "../common/TagPill";
import styles from "./Sidebar.module.css";
import { getTags } from "../../services/api";
interface SidebarProps {
  feedMode: string;
  setFeedMode: (mode: string) => void;
  selectedTags: string[]; 
  toggleTag: (tagId: string) => void; 
  currentUser: { name: string; avatar: string } | null;
}
interface Tag {
  id: string;
  name: string;
}
export default function Sidebar({ feedMode, setFeedMode, selectedTags, toggleTag,currentUser }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    getTags()
      .then((data) => setTags(data))
      .catch((err) => console.error("Error cargando tags:", err));
  }, []);
  const isActive = (path: string, mode?: string) => 
    currentPath === path && (!mode || feedMode === mode);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };
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
        {currentUser && (
          <button 
            onClick={() => { setFeedMode("following"); navigate("/"); }}
            className={`${styles.sidebar__link} ${isActive("/", "following") ? styles['sidebar__link--active'] : ""}`}
          >
            <Users className="w-4 h-4 shrink-0" /> Following
          </button>
        )}
      </div>

      <div className={styles.sidebar__divider} />

      <div className="p-4 flex-1">
        <p className={styles.sidebar__title}>Filter by Tag</p>
        <div className={styles.sidebar__tags}>
          {tags.map((tag) => (
            <TagPill 
              key={tag.id} 
              tag={tag}  
              active={selectedTags.includes(tag.id)} 
              onClick={() => toggleTag(tag.id)} 
            />
          ))}
        </div>
        {selectedTags.length > 0 && (
          <button 
            onClick={() => {
                selectedTags.forEach((id) => toggleTag(id));
            }}
            className={styles['sidebar__clear-btn']}
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>

      {currentUser && (
        <>
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
              onClick={handleLogout}
              className={`${styles.sidebar__link} ${styles.sidebar__signout}`}
            >
              <Settings className="w-4 h-4 shrink-0" /> Sign Out
            </button>
          </div>
        </>
      )}
    </aside>
  );
}