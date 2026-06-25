import { useState } from "react";
import { Heart, Eye, Bookmark } from "lucide-react";
import Avatar from "../common/Avatar";
import { fmtNum } from "../../utils/formatters";
import api from "../../services/api"; 
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
  onArtistClick: (artist: { name: string; avatar: string}) => void;
}

export default function ArtworkCard({ art, onArtistClick }: ArtworkCardProps) {
 
  const [liked, setLiked] = useState<boolean>(art.isLiked);
  const [likeCount, setLikeCount] = useState<number>(art.likes);
  const [bookmarked, setBookmarked] = useState<boolean>(art.isBookmarked);

 
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    
    const previousLiked = liked;
    const previousCount = likeCount;

  
    setLiked(!previousLiked);
    setLikeCount(prev => previousLiked ? prev - 1 : prev + 1);

    try {
    
      await api.post("/api/v1/interactions/like", { artwork_id: art.id });
    } catch (error) {
      console.error("Error al dar like:", error);
     
      setLiked(previousLiked);
      setLikeCount(previousCount);
    }
  };

  const heights = {
    portrait: "h-72",
    landscape: "h-44",
    square: "h-56"
  };
  
  let imageSource = art.imageUrl;
  if (!imageSource.startsWith("http")) {
    const cleanPath = imageSource.startsWith("/") ? imageSource : `/${imageSource}`;
    imageSource = `http://localhost:8080${cleanPath}`;
  }

  return (
    <div className={styles['artwork-card']}>
      <div className={styles['artwork-card__media']}>
        <img 
          src={imageSource} 
          alt={art.title} 
          className={styles['artwork-card__image']}
        />
      </div>
      
      <div className={styles.card__footer}>
        <button onClick={(e) => { e.stopPropagation(); onArtistClick({ name: art.artist, avatar: art.artistAvatar}); }} className={styles.card__artist}>
          <Avatar src={art.artistAvatar} size={8} />
          <span>{art.artist}</span>
        </button>
        <div className={styles.card__stats}>
          
         
          <button 
            onClick={handleLike} 
            className={`${styles['card__like-btn']} hover:scale-110 transition-transform`}
          >
            <Heart 
              className="w-4 h-4" 
              fill={liked ? "currentColor" : "none"} 
              color={liked ? "#ef4444" : "currentColor"} 
            />
            <span className="font-mono text-sm">{fmtNum(likeCount)}</span>
          </button>

          <span className={styles.card__stat}>
            <Eye className="w-4 h-4" />
            <span className="font-mono text-sm">{fmtNum(art.views)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
