import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import TopNav from "./components/layout/TopNav";
import Sidebar from "./components/layout/Sidebar";
import HubPage from "./pages/HubPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import PublishPage from "./pages/PublishPage";
function App() {
  const [page, setPage] = useState("hub");
  const [feedMode, setFeedMode] = useState("hub");
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  function toggleTag(tag) {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  }
  const showSidebar = page === "hub";
  const showNav = page !== "auth";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", style: { fontFamily: "'DM Sans', sans-serif" }, children: [
    showNav && /* @__PURE__ */ jsx(
      TopNav,
      {
        page,
        setPage,
        searchQuery,
        setSearchQuery,
        currentUser
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: showNav ? "pt-14" : "", children: [
      showSidebar && /* @__PURE__ */ jsx(
        Sidebar,
        {
          feedMode,
          setFeedMode,
          selectedTags,
          toggleTag,
          setPage,
          page
        }
      ),
      /* @__PURE__ */ jsxs("main", { className: showSidebar ? "ml-56" : "", children: [
        page === "hub" && /* @__PURE__ */ jsx(
          HubPage,
          {
            feedMode,
            selectedTags,
            searchQuery,
            onArtistClick: () => setPage("profile")
          }
        ),
        page === "profile" && /* @__PURE__ */ jsx(ProfilePage, { onBack: () => setPage("hub") }),
        page === "auth" && /* @__PURE__ */ jsx(
          AuthPage,
          {
            onSuccess: () => {
              setCurrentUser({
                name: "NightPixel",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
              });
              setPage("hub");
            }
          }
        ),
        page === "chat" && /* @__PURE__ */ jsx(ChatPage, {}),
        page === "publish" && /* @__PURE__ */ jsx(PublishPage, { onDone: () => setPage("hub") })
      ] })
    ] })
  ] });
}
export {
  App as default
};
