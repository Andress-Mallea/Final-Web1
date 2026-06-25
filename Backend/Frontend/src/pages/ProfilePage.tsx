import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Avatar from "../components/common/Avatar";
import ArtworkCard, { Artwork } from "../components/artwork/ArtworkCard";
import api from "../services/api";
import styles from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";
export interface User {
  name: string;
  avatar: string;
}

interface ProfilePageProps {
  onBack: () => void;
  currentUser: User | null;
  profileUser: User | null;
}

export default function ProfilePage({ onBack, profileUser }: ProfilePageProps) {
  const [profile, setProfile] = useState<any>(null);
  const [myArtworks, setMyArtworks] = useState<Artwork[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      console.warn("Acceso denegado. Redirigiendo al login...");
      navigate("/auth"); 
    }
  }, [navigate]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/v1/auth/me");
        setProfile(response.data);
        
        
        const formattedArtworks = response.data.artworks.map((art: any) => ({
          id: String(art.id),
          title: art.title,
          imageUrl: art.image_url, 
          artist: response.data.username,
          artistAvatar: profileUser?.avatar || "",
          tags: [],
          // Leemos los datos reales del backend, y si por alguna razón no vienen, ponemos false por defecto
          likes: art.likes || 0,
          views: art.views_count || 0,
          isLiked: art.isLiked || false,
          isBookmarked: false,
          aspectRatio: "square" as const
        }));
        
        setMyArtworks(formattedArtworks);
      } catch (err) {
        console.error("Error cargando perfil:", err);
      }
    };
    fetchProfile();
  }, [profileUser]);

  if (!profileUser) return null;

  return (
    <div className={styles.profile}>
      <div className={styles.profile__header}>
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=300&fit=crop&auto=format" className={styles.profile__cover} alt="Profile cover" />
        <button onClick={onBack} className={styles['profile__back-btn']}>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
      
      <div className={styles.profile__content}>
        <div className={styles.profile__info}>
          <Avatar src={profileUser.avatar} size={24} className="border-4 border-background" />
          <div className={styles['profile__user-details']}>
            <h2 className={styles.profile__name}>{profile?.username || profileUser.name}</h2>
            <p className={styles.profile__handle}>@{profile?.username?.toLowerCase() || "usuario"}</p>
          </div>
        </div>

        <div className="pt-6">
          <div className={styles.profile__grid}>
            {myArtworks.map((art) => (
              <div key={art.id} className={styles['profile__art-card']}>
                <ArtworkCard 
                  art={art} 
                  onArtistClick={() => {}} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}