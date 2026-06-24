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
    <div className={styles.card}>
      <div className={`${styles.card__media} ${heights[art.aspectRatio]}`}>
        <img src={art.imageUrl} alt={art.title} className={styles.card__image} />
        <div className={styles.card__overlay} />
        
        <div className={styles.card__content}>
          <div>
            <p className={styles.card__title}>{art.title}</p>
            <div className={styles.card__tags}>
              {art.tags.slice(0, 2).map((tag) => (
                <span key={tag} className={styles.card__tag}>#{tag}</span>
              ))}
            </div>
          </div>
          <div className={styles.card__actions}>
            <button
              onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
              className={`${styles.card__btn} ${liked ? styles['card__btn--liked'] : ""}`}
            >
              <Heart className="w-3.5 h-3.5" fill={liked ? "currentColor" : "none"} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }}
              className={styles.card__btn}
            >
              <Bookmark className="w-3.5 h-3.5" fill={bookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
      
      <div className={styles.card__footer}>
        <button onClick={(e) => { e.stopPropagation(); onArtistClick(); }} className={styles.card__artist}>
          <Avatar src={art.artistAvatar} size={6} />
          <span className="text-xs font-medium text-muted-foreground">{art.artist}</span>
        </button>
        <div className={styles.card__stats}>
          <span className={styles.card__stat}>
            <Heart className="w-3 h-3" fill={liked ? "currentColor" : "none"} color={liked ? "#ef4444" : undefined} />
            <span className="font-mono text-[11px]">{fmtNum(art.likes)}</span>
          </span>
          <span className={styles.card__stat}>
            <Eye className="w-3 h-3" />
            <span className="font-mono text-[11px]">{fmtNum(art.views)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
