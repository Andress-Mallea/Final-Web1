import { useState } from "react";
import { Heart, Eye, Bookmark } from "lucide-react";
import Avatar from "../common/Avatar";
import { fmtNum } from "../../utils/formatters";

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistAvatar: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
  aspectRatio: "portrait" | "landscape" | "square";
}

interface ArtworkCardProps {
  art: Artwork;
  onArtistClick: () => void;
}

export default function ArtworkCard({ art, onArtistClick }: ArtworkCardProps) {
  const [liked, setLiked] = useState<boolean>(art.isLiked);
  const [bookmarked, setBookmarked] = useState<boolean>(art.isBookmarked);
  const [hovered, setHovered] = useState<boolean>(false);

  const heights = {
    portrait: "h-72",
    landscape: "h-44",
    square: "h-56"
  };

  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative ${heights[art.aspectRatio]} bg-muted`}>
        <img
          src={art.imageUrl}
          alt={art.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`} />
        
        <div className={`absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <div>
            <p className="text-white font-semibold text-sm leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {art.title}
            </p>
            <div className="flex gap-1.5 mt-1 flex-wrap">
              {art.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] font-mono text-white/70 bg-white/10 px-1.5 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
              className={`p-1.5 rounded-lg backdrop-blur-sm transition-colors ${liked ? "bg-red-500/80 text-white" : "bg-white/10 text-white hover:bg-red-500/60"}`}
            >
              <Heart className="w-3.5 h-3.5" fill={liked ? "currentColor" : "none"} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setBookmarked(!bookmarked);
              }}
              className={`p-1.5 rounded-lg backdrop-blur-sm transition-colors ${bookmarked ? "bg-primary/80 text-white" : "bg-white/10 text-white hover:bg-primary/60"}`}
            >
              <Bookmark className="w-3.5 h-3.5" fill={bookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-3 flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onArtistClick();
          }}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Avatar src={art.artistAvatar} size={6} />
          <span className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">{art.artist}</span>
        </button>
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1 text-xs">
            <Heart className="w-3 h-3" fill={liked ? "currentColor" : "none"} color={liked ? "#ef4444" : undefined} />
            <span className="font-mono text-[11px]">{fmtNum(art.likes + (liked !== art.isLiked ? (liked ? 1 : -1) : 0))}</span>
          </span>
          <span className="flex items-center gap-1 text-xs">
            <Eye className="w-3 h-3" />
            <span className="font-mono text-[11px]">{fmtNum(art.views)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
