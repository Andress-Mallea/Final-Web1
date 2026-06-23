import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { Filter, Sparkles } from "lucide-react";
import { ARTWORKS } from "../data/mockData";
import { getArtworks } from "../services/api";
import { normalizeArtwork } from "../utils/normalizeArtwork";
import ArtworkCard from "../components/artwork/ArtworkCard";
import TagPill from "../components/common/TagPill";
const PAGE_SIZE = 6;
function generatePage(base, pageIndex) {
  const aspects = ["portrait", "landscape", "square"];
  return base.map((art, i) => ({
    ...art,
    id: `${pageIndex}-${art.id}`,
    likes: art.likes + Math.floor(Math.random() * 500),
    views: art.views + Math.floor(Math.random() * 3e3),
    isLiked: false,
    isBookmarked: false,
    aspectRatio: aspects[(i + pageIndex) % 3]
  }));
}
function HubPage({
  feedMode,
  selectedTags,
  searchQuery,
  onArtistClick
}) {
  const [artworks, setArtworks] = useState(ARTWORKS);
  const [backendLoading, setBackendLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    getArtworks().then((data) => {
      if (!mounted || !Array.isArray(data) || data.length === 0) return;
      setArtworks(data.map(normalizeArtwork));
    }).catch((error) => {
      console.warn("No se pudieron cargar obras desde el backend. Se usan datos de ejemplo.", error);
    }).finally(() => {
      if (mounted) setBackendLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);
  const baseFiltered = artworks.filter((art) => {
    const matchQuery = !searchQuery || art.title.toLowerCase().includes(searchQuery.toLowerCase()) || art.artist.toLowerCase().includes(searchQuery.toLowerCase()) || art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchTags = selectedTags.length === 0 || selectedTags.some((t) => art.tags.includes(t));
    const matchFeed = feedMode === "hub" || ["NightPixel", "KiroSensei"].includes(art.artist);
    return matchQuery && matchTags && matchFeed;
  });
  const [visibleItems, setVisibleItems] = useState(() => baseFiltered.slice(0, PAGE_SIZE));
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);
  useEffect(() => {
    setVisibleItems(baseFiltered.slice(0, PAGE_SIZE));
    setPageIndex(1);
    setHasMore(baseFiltered.length > 0);
  }, [feedMode, selectedTags.join(","), searchQuery, artworks]);
  const loadMore = useCallback(() => {
    if (loading || !hasMore || baseFiltered.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      const nextPage = generatePage(baseFiltered, pageIndex);
      setVisibleItems((prev) => [...prev, ...nextPage]);
      setPageIndex((p) => p + 1);
      if (pageIndex >= 4) setHasMore(false);
      setLoading(false);
    }, 800);
  }, [loading, hasMore, baseFiltered, pageIndex]);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);
  return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h1", { style: { fontFamily: "'Playfair Display', serif" }, className: "text-2xl font-semibold text-foreground", children: feedMode === "hub" ? "Explore" : "Following" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: feedMode === "hub" ? "Discover artwork from the global community" : "Latest from artists you follow" })
    ] }),
    backendLoading && /* @__PURE__ */ jsx("p", { className: "mb-4 text-xs font-mono text-muted-foreground", children: "Conectando con la galeria..." }),
    selectedTags.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4 flex-wrap", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Filter, { className: "w-3 h-3" }),
        " Filtering:"
      ] }),
      selectedTags.map((tag) => /* @__PURE__ */ jsx(TagPill, { tag, active: true }, tag))
    ] }),
    visibleItems.length === 0 && !loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-center", children: [
      /* @__PURE__ */ jsx(Sparkles, { className: "w-10 h-10 text-muted-foreground mb-3 opacity-50" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No artworks match your search." })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "columns-2 lg:columns-3 gap-4", children: visibleItems.map((art) => /* @__PURE__ */ jsx("div", { className: "break-inside-avoid mb-4", children: /* @__PURE__ */ jsx(ArtworkCard, { art, onArtistClick }) }, art.id)) }),
      /* @__PURE__ */ jsxs("div", { ref: sentinelRef, className: "flex items-center justify-center py-10", children: [
        loading && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "w-2 h-2 rounded-full bg-primary/60 animate-bounce",
              style: { animationDelay: `${i * 0.15}s` }
            },
            i
          )) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-mono", children: "Loading more\u2026" })
        ] }),
        !hasMore && !loading && /* @__PURE__ */ jsx("p", { className: "text-xs font-mono text-muted-foreground", children: "\u2014 You've reached the end \u2014" })
      ] })
    ] })
  ] });
}
export {
  HubPage as default
};
