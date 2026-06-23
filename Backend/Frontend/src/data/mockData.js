const ALL_TAGS = [
  "Fantasy",
  "Portrait",
  "Digital Art",
  "Landscape",
  "Abstract",
  "Sci-Fi",
  "Character",
  "Concept Art",
  "Anime",
  "Dark Art",
  "Illustration",
  "3D",
  "Watercolor",
  "Surreal",
  "Nature"
];
const ARTWORKS = [
  {
    id: "1",
    title: "Void Wanderer",
    artist: "NightPixel",
    artistAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=420&h=560&fit=crop&auto=format",
    tags: ["Fantasy", "Dark Art", "Character"],
    likes: 2847,
    views: 18903,
    bookmarks: 431,
    isLiked: true,
    isBookmarked: false,
    aspectRatio: "portrait"
  },
  {
    id: "2",
    title: "Neon Meridian",
    artist: "Axiom_V",
    artistAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=420&h=280&fit=crop&auto=format",
    tags: ["Sci-Fi", "Concept Art", "Digital Art"],
    likes: 1204,
    views: 9220,
    bookmarks: 188,
    isLiked: false,
    isBookmarked: true,
    aspectRatio: "landscape"
  },
  {
    id: "3",
    title: "Silhouette Study #7",
    artist: "LunaGraff",
    artistAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=420&h=420&fit=crop&auto=format",
    tags: ["Portrait", "Illustration", "Watercolor"],
    likes: 3412,
    views: 22100,
    bookmarks: 672,
    isLiked: false,
    isBookmarked: false,
    aspectRatio: "square"
  },
  {
    id: "4",
    title: "Fractal Dreams",
    artist: "OrbWeaver",
    artistAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=420&h=600&fit=crop&auto=format",
    tags: ["Abstract", "Digital Art", "Surreal"],
    likes: 891,
    views: 7443,
    bookmarks: 104,
    isLiked: true,
    isBookmarked: true,
    aspectRatio: "portrait"
  },
  {
    id: "5",
    title: "Last Light",
    artist: "TerraMoss",
    artistAvatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=40&h=40&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=420&h=280&fit=crop&auto=format",
    tags: ["Landscape", "Nature", "Watercolor"],
    likes: 5610,
    views: 41200,
    bookmarks: 1023,
    isLiked: false,
    isBookmarked: false,
    aspectRatio: "landscape"
  },
  {
    id: "6",
    title: "Cypher Angel",
    artist: "NightPixel",
    artistAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=420&h=560&fit=crop&auto=format",
    tags: ["Fantasy", "Character", "Concept Art"],
    likes: 4221,
    views: 31050,
    bookmarks: 788,
    isLiked: false,
    isBookmarked: false,
    aspectRatio: "portrait"
  },
  {
    id: "7",
    title: "Chromatic Rift",
    artist: "PixelSage",
    artistAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?w=420&h=420&fit=crop&auto=format",
    tags: ["Abstract", "3D", "Sci-Fi"],
    likes: 2003,
    views: 15870,
    bookmarks: 340,
    isLiked: true,
    isBookmarked: false,
    aspectRatio: "square"
  },
  {
    id: "8",
    title: "Ember Shrine",
    artist: "KiroSensei",
    artistAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=420&h=340&fit=crop&auto=format",
    tags: ["Anime", "Fantasy", "Illustration"],
    likes: 7824,
    views: 58300,
    bookmarks: 2100,
    isLiked: true,
    isBookmarked: true,
    aspectRatio: "landscape"
  },
  {
    id: "9",
    title: "Obsidian Court",
    artist: "VoidScribe",
    artistAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=40&h=40&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=420&h=560&fit=crop&auto=format",
    tags: ["Dark Art", "Concept Art", "Character"],
    likes: 1560,
    views: 12400,
    bookmarks: 295,
    isLiked: false,
    isBookmarked: false,
    aspectRatio: "portrait"
  }
];
const COMMISSIONS = [
  { id: "1", artist: "NightPixel", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop", lastMessage: "Sure, I can do that style. My rate for a full illustration is...", time: "2m ago", unread: 2, status: "open" },
  { id: "2", artist: "LunaGraff", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop", lastMessage: "The sketch is done! Let me know what you think.", time: "1h ago", unread: 0, status: "in_progress" },
  { id: "3", artist: "KiroSensei", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop", lastMessage: "Commission delivered. Thanks for working with me!", time: "3d ago", unread: 0, status: "completed" }
];
const CHAT_MESSAGES = [
  { id: "1", sender: "them", text: "Hey! I saw your commission request. I love the concept you described.", time: "10:31" },
  { id: "2", sender: "me", text: "Thanks! I was going for a dark fantasy feel, kind of like your Void Wanderer piece.", time: "10:33" },
  { id: "3", sender: "them", text: "Great reference. For that style, I usually work in 3 phases: rough sketch, refined lines, then full color. I can do a full illustration at 3000x4000px for $180.", time: "10:35" },
  { id: "4", sender: "me", text: "That sounds perfect. Can you do it with a violet/purple palette?", time: "10:40" },
  { id: "5", sender: "them", text: "Absolutely, violet is one of my favorites. I can start with a sketch by Thursday if you want to proceed.", time: "10:42" }
];
export {
  ALL_TAGS,
  ARTWORKS,
  CHAT_MESSAGES,
  COMMISSIONS
};
