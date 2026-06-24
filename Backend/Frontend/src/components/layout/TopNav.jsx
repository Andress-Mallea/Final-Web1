import { Search, Plus, Bell, MessageSquare, User, Palette } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "../common/Avatar";

function TopNav({ searchQuery, setSearchQuery, currentUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/90 backdrop-blur-md flex items-center px-4 gap-4">
      <button onClick={() => navigate("/")} className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
          <Palette className="w-4 h-4 text-primary" />
        </div>
        <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-semibold text-foreground hidden sm:block">
          Arteria
        </span>
      </button>
      <div className="flex-1 max-w-lg relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search artworks, artists, tags…"
          className="w-full pl-9 pr-4 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
        />
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <button
          onClick={() => navigate("/publish")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:block">Publish</span>
        </button>

        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
        </button>
        <button
          onClick={() => navigate("/chat")}
          className={`p-2 rounded-lg transition-colors ${currentPath === "/chat" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
        >
          <MessageSquare className="w-4 h-4" />
        </button>
        {currentUser ? (
          <button onClick={() => navigate("/profile")} className="ml-1 hover:opacity-80 transition-opacity">
            <Avatar src={currentUser.avatar} size={8} />
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm text-foreground hover:bg-secondary transition-colors ml-1"
          >
            <User className="w-4 h-4" />
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

export default TopNav;
