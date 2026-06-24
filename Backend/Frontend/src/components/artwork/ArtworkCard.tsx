import { useState } from "react";
import { Heart, Eye, Bookmark } from "lucide-react";
import Avatar from "../common/Avatar";
import { fmtNum } from "../../utils/formatters";
import styles from "./ArtworkCard.module.css";
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

  const heights = {
    portrait: "h-72",
    landscape: "h-44",
    square: "h-56"
  };

  return (
    <div className={styles['artwork-card']}>
     
      <div className={styles['artwork-card__media']}>
        <img src={art.imageUrl} alt={art.title} className={styles['artwork-card__image']} />
      </div>
      
      
      <div className={styles.card__footer}>
        <button onClick={(e) => { e.stopPropagation(); onArtistClick(); }} className={styles.card__artist}>
          <Avatar src={art.artistAvatar} size={8} />
          <span>{art.artist}</span>
        </button>
        <div className={styles.card__stats}>
          <span className={styles.card__stat}>
            <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} color={liked ? "#ef4444" : undefined} />
            <span className="font-mono text-sm">{fmtNum(art.likes)}</span>
          </span>
          <span className={styles.card__stat}>
            <Eye className="w-4 h-4" />
            <span className="font-mono text-sm">{fmtNum(art.views)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
