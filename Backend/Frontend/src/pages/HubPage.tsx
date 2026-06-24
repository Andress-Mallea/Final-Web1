import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Filter, Sparkles } from "lucide-react";
import { getArtworks } from "../services/api";
import ArtworkCard, { Artwork } from "../components/artwork/ArtworkCard";
import TagPill from "../components/common/TagPill";
import styles from "./HubPage.module.css";
const PAGE_SIZE = 6;


interface HubPageProps {
  feedMode: string;
  selectedTags?: string[];
  searchQuery?: string;
  onArtistClick: () => void;
}

export default function HubPage({ 
  feedMode, 
  selectedTags = [], 
  searchQuery = "", 
  onArtistClick 
}: HubPageProps) {
  
  
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [backendLoading, setBackendLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    
   
    getArtworks().then((data: any) => {
      if (!mounted) return;
      
      if (!Array.isArray(data)) {
        setArtworks([]);
        return;
      }
      
      
      const realArtworks: Artwork[] = data.map((art: any) => ({
        id: String(art.id),
        title: art.title || "Sin título",
        imageUrl: art.image_url || art.imageUrl || "https://via.placeholder.com/400x500?text=No+Image", 
        artist: art.artist?.username || art.artist || "Artista Desconocido",
        artistAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (art.artist?.username || art.id),
        tags: art.tags || [],
        likes: art.likes || 0,
        views: art.views_count || 0,
        isLiked: art.isLiked || false,
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

  const [visibleItems, setVisibleItems] = useState<Artwork[]>(() => baseFiltered.slice(0, PAGE_SIZE));
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  
 
  const sentinelRef = useRef<HTMLDivElement | null>(null);

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
      const nextPageIndex = pageIndex + 1;
      const nextLimit = nextPageIndex * PAGE_SIZE;
      setVisibleItems(baseFiltered.slice(0, nextLimit));
      setPageIndex(nextPageIndex);
      if (nextLimit >= baseFiltered.length) {
        setHasMore(false);
      }
      setLoading(false);
    }, 500);
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
    <div className={styles.hub}>
      <header className={styles.hub__header}>
        <h1 className={styles.hub__title}>{feedMode === "hub" ? "Explore" : "Following"}</h1>
        <p className={styles.hub__subtitle}>{feedMode === "hub" ? "Discover artwork" : "Latest from artists"}</p>
      </header>

      {backendLoading && <p className={styles.hub__loader}>Sincronizando con PostgreSQL...</p>}

      {selectedTags.length > 0 && (
        <div className={styles.hub__filters}>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filtering:
          </span>
          {selectedTags.map((tag) => <TagPill key={tag} tag={tag} active={true} />)}
        </div>
      )}

      {visibleItems.length === 0 && !backendLoading ? (
        <div className={styles.hub__empty}>
          <Sparkles className="w-10 h-10 text-muted-foreground mb-3 opacity-50" />
          <p className="text-muted-foreground">Tu galería está vacía.</p>
        </div>
      ) : (
        <Fragment>
          <div className={styles.hub__grid}>
            {visibleItems.map((art) => (
              <div key={art.id} className={styles['hub__card-wrapper']}>
                <ArtworkCard art={art} onArtistClick={onArtistClick} />
              </div>
            ))}
          </div>
          <div ref={sentinelRef} className={styles.hub__sentinel}>
            {loading && <span className="font-mono text-sm">Cargando...</span>}
          </div>
        </Fragment>
      )}
    </div>
  );
}
