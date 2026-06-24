import { Home, Users, X, User, MessageSquare, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ALL_TAGS } from "../../data/mockData";
import TagPill from "../common/TagPill";

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

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-56 border-r border-border bg-sidebar flex flex-col overflow-y-auto z-40">
      <div className="p-4 space-y-1">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">Browse</p>
        <button
          onClick={() => {
            setFeedMode("hub");
            navigate("/");
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${currentPath === "/" && feedMode === "hub" ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
        >
          <Home className="w-4 h-4 shrink-0" />
          Hub
        </button>
        <button
          onClick={() => {
            setFeedMode("following");
            navigate("/");
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${currentPath === "/" && feedMode === "following" ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
        >
          <Users className="w-4 h-4 shrink-0" />
          Following
        </button>
      </div>

      <div className="h-px bg-border mx-4"></div>

      <div className="p-4 flex-1">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">Filter by Tag</p>
        <div className="flex flex-wrap gap-1.5">
          {ALL_TAGS.map((tag) => (
            <TagPill key={tag} tag={tag} active={selectedTags.includes(tag)} onClick={() => toggleTag(tag)} />
          ))}
        </div>
        {selectedTags.length > 0 && (
          <button
            onClick={() => selectedTags.forEach(toggleTag)}
            className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>

      <div className="h-px bg-border mx-4"></div>

      <div className="p-4 space-y-1">
        <button
          onClick={() => navigate("/profile")}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${currentPath === "/profile" ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
        >
          <User className="w-4 h-4 shrink-0" />
          Profile
        </button>
        <button
          onClick={() => navigate("/chat")}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${currentPath === "/chat" ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          Commissions
        </button>
        <button 
          onClick={() => {
            localStorage.removeItem("arteria_user");
            window.location.reload();
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Settings className="w-4 h-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
