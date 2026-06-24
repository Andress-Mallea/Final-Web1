import { useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import TopNav from "./components/layout/TopNav";
import Sidebar from "./components/layout/Sidebar";
import HubPage from "./pages/HubPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import PublishPage from "./pages/PublishPage";

function App() {
  const [feedMode, setFeedMode] = useState("hub");
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("arteria_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const location = useLocation();
  const navigate = useNavigate();

  function toggleTag(tag) {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  }
  const showNav = location.pathname !== "/auth";
  const showSidebar = location.pathname === "/"; 

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {showNav && (
        <TopNav
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentUser={currentUser}
        />
      )}
      <div className={showNav ? "pt-14" : ""}>
        {showSidebar && (
          <Sidebar
            feedMode={feedMode}
            setFeedMode={setFeedMode}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
          />
        )}
        <main className={showSidebar ? "ml-56" : ""}>
          <Routes>
            <Route path="/" element={
              <HubPage
                feedMode={feedMode}
                selectedTags={selectedTags}
                searchQuery={searchQuery}
                onArtistClick={() => navigate("/profile")}
              />
            } />
            
            <Route path="/profile" element={
              <ProfilePage onBack={() => navigate("/")} currentUser={currentUser} />
            } />
            
            <Route path="/auth" element={
              <AuthPage
                onSuccess={(userData) => {
                  const user = {
                    name: userData.username,
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + userData.username
                  };
                  setCurrentUser(user);
                  localStorage.setItem("arteria_user", JSON.stringify(user));
                  navigate("/"); 
                }}
              />
            } />
            
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/publish" element={<PublishPage onDone={() => navigate("/")} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
