import { Fragment } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Filter, Sparkles } from "lucide-react";
import { getArtworks } from "../services/api";
import ArtworkCard from "../components/artwork/ArtworkCard";
import TagPill from "../components/common/TagPill";

const PAGE_SIZE = 6;
function generatePage(base, pageIndex) {
  const aspects = ["portrait", "landscape", "square"];
  return base.map((art, i) => ({
    ...art,
    id: `${pageIndex}-${art.id}`, 
    aspectRatio: art.aspectRatio || aspects[(i + pageIndex) % 3]
  }));
}

function HubPage({ feedMode, selectedTags = [], searchQuery = "", onArtistClick }) {
 
  const [artworks, setArtworks] = useState([]);
  const [backendLoading, setBackendLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getArtworks().then((data) => {
      if (!mounted) return;
      
      if (!Array.isArray(data)) {
        setArtworks([]);
        return;
      }
      const realArtworks = data.map((art) => ({
        id: art.id,
        title: art.title || "Sin título",
        imageUrl: art.image_url || art.imageUrl || "https://via.placeholder.com/400x500?text=No+Image", 
        artist: art.artist?.username || art.artist || "Artista Desconocido",
        artistAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (art.artist?.username || art.id),
        tags: art.tags || [],
        likes: art.likes_count || 0,
        views: art.views_count || art.views || 0,
        isLiked: false,
        isBookmarked: false,
        aspectRatio: "portrait" 
      }));

      setArtworks(realArtworks);
    }).catch((error) => {
      console.error("Error al cargar obras de la base de datos:", error);
      if (mounted) setArtworks([]);
    }).finally(() => {
      if (mounted) setBackendLoading(false);
    });

    return () => { mounted = false; };
  }, []);
  const baseFiltered = artworks.filter((art) => {
    const titleMatch = art.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const artistMatch = art.artist?.toLowerCase().includes(searchQuery.toLowerCase());
    const tagsMatch = art.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchQuery = !searchQuery || titleMatch || artistMatch || tagsMatch;
    const matchTags = selectedTags.length === 0 || selectedTags.some((t) => art.tags?.includes(t));
    const matchFeed = feedMode === "hub" || true; 
    
    return matchQuery && matchTags && matchFeed;
  });

  const [visibleItems, setVisibleItems] = useState(() => baseFiltered.slice(0, PAGE_SIZE));
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const resetTimer = setTimeout(() => {
      setVisibleItems(baseFiltered.slice(0, PAGE_SIZE));
      setPageIndex(1);
      setHasMore(baseFiltered.length > 0);
    }, 0);
    return () => clearTimeout(resetTimer);
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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-semibold text-foreground">
          {feedMode === "hub" ? "Explore" : "Following"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {feedMode === "hub" ? "Discover artwork from the global community" : "Latest from artists you follow"}
        </p>
      </div>

      {backendLoading && (
        <p className="mb-4 text-xs font-mono text-muted-foreground animate-pulse">
          Sincronizando con PostgreSQL...
        </p>
      )}

      {selectedTags.length > 0 && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filtering:
          </span>
          {selectedTags.map((tag) => (
            <TagPill key={tag} tag={tag} active={true} />
          ))}
        </div>
      )}
      {visibleItems.length === 0 && !backendLoading && !loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Sparkles className="w-10 h-10 text-muted-foreground mb-3 opacity-50" />
          <p className="text-muted-foreground">Tu galería está vacía. ¡Sube tu primera obra!</p>
        </div>
      ) : (
        <Fragment>
          <div className="columns-2 lg:columns-3 gap-4">
            {visibleItems.map((art) => (
              <div key={art.id} className="break-inside-avoid mb-4">
                <ArtworkCard art={art} onArtistClick={onArtistClick} />
              </div>
            ))}
          </div>

          <div ref={sentinelRef} className="flex items-center justify-center py-10">
            {loading && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <span className="text-sm font-mono">Cargando más...</span>
              </div>
            )}
            {!hasMore && !loading && visibleItems.length > 0 && (
              <p className="text-xs font-mono text-muted-foreground">— Has llegado al final —</p>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default HubPage;
