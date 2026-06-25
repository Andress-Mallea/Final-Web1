import { useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import TopNav from "./components/layout/TopNav";
import Sidebar from "./components/layout/Sidebar";
import HubPage from "./pages/HubPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import PublishPage from "./pages/PublishPage";
import styles from "./App.module.css";
interface User {
  name: string;
  avatar: string;
  token?: string;
}
function App() {
  const [feedMode, setFeedMode] = useState<string>("hub");
  const [selectedTags, setSelectedTags] = useState<string[]>([]); 
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("arteria_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const location = useLocation();
  const navigate = useNavigate();

  
  function toggleTag(tag: string) {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  }
  const showNav = location.pathname !== "/auth";
  const showSidebar = location.pathname === "/"; 
  const [profileUser, setProfileUser] = useState<User | null>(null);

  return (
    <div className={styles.app}>
      {showNav && (
        <TopNav
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentUser={currentUser}
        />
      )}
      
      <div className={showNav ? styles.app__wrapper : ""}>
        {showSidebar && (
          <Sidebar
            feedMode={feedMode}
            setFeedMode={setFeedMode}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            currentUser={currentUser}
          />
        )}
        
        <main className={showSidebar ? styles['app__main--with-sidebar'] : styles.app__main}>
          <Routes>
            <Route path="/" element={
              <HubPage
                feedMode={feedMode}
                selectedTags={selectedTags}
                searchQuery={searchQuery}
                onArtistClick={(artist) => {
                  setProfileUser(artist);
                  navigate("/profile");
                }}
              />
            } />
            
            <Route path="/profile" element={
              <ProfilePage onBack={() => navigate("/")} currentUser={currentUser} profileUser={profileUser ?? currentUser} />
            } />
            
            <Route path="/auth" element={
              <AuthPage
                onSuccess={(userData: { username: string; access_token?: string }) => {
                  const user: User = {
                    name: userData.username,
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + userData.username,
                    token: userData.access_token
                  };

                  setCurrentUser(user);
                  localStorage.setItem("arteria_user", JSON.stringify(user));

                  if (userData.access_token) {
                    localStorage.setItem("arteria_token", userData.access_token);
                  }

                  navigate("/");
                }}
              />
            } />
            
            <Route
              path="/chat"
              element={currentUser ? <ChatPage /> : <Navigate to="/auth" replace />}
            />
            <Route path="/publish" element={
                currentUser ? (
                  <PublishPage onDone={() => navigate("/")} />
                ) : (
                  <Navigate to="/auth" replace /> 
                )
              } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
