const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop";
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=420&h=560&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=420&h=280&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=420&h=420&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=420&h=280&fit=crop&auto=format"
];
function normalizeArtwork(art, index) {
  const tags = art.tags || art.categories || art.mediums || [];
  const artistName = art.artist?.username || art.artist?.name || art.author?.username || "Artista desconocido";
  const views = art.views_count ?? art.views ?? 0;
  return {
    id: String(art.id ?? index),
    title: art.title || "Obra sin titulo",
    artist: artistName,
    artistAvatar: art.artist?.avatar || art.artist_avatar || FALLBACK_AVATAR,
    imageUrl: art.image_url || art.imageUrl || art.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
    tags: Array.isArray(tags) && tags.length > 0 ? tags.map(String) : ["Digital Art"],
    likes: art.likes_count ?? art.likes ?? 0,
    views,
    bookmarks: art.bookmarks_count ?? art.bookmarks ?? 0,
    isLiked: Boolean(art.is_liked ?? art.isLiked),
    isBookmarked: Boolean(art.is_bookmarked ?? art.isBookmarked),
    aspectRatio: ["portrait", "landscape", "square"][index % 3]
  };
}
export {
  normalizeArtwork
};
