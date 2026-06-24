import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { getArtworks } from "../services/api"; 
import { normalizeArtwork } from "../utils/normalizeArtwork";
import Avatar from "../components/common/Avatar";
import styles from "./ProfilePage.module.css";

export interface User {
  name: string;
  avatar: string;
}


interface ProfilePageProps {
  onBack: () => void;
  currentUser: User | null;
}

export default function ProfilePage({ onBack, currentUser }: ProfilePageProps) {

  const [myArtworks, setMyArtworks] = useState<any[]>([]);

  useEffect(() => {

    if (!currentUser) return;

    getArtworks().then((data: any[]) => {
      const filtered = data
        .map(normalizeArtwork)
        .filter((art: any) => {
         
          return art.artist?.toLowerCase() === currentUser.name?.toLowerCase();
        });
      setMyArtworks(filtered);
    }).catch((error) => {
      console.error("Error cargando el perfil:", error);
    });
  }, [currentUser]);

 
  if (!currentUser) {
    return null;
  }

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
          <Avatar src={currentUser.avatar} size={24} className="border-4 border-background" />
          <div className={styles['profile__user-details']}>
            <h2 className={styles.profile__name}>{currentUser.name}</h2>
            <p className={styles.profile__handle}>@{currentUser.name?.toLowerCase()}</p>
          </div>
        </div>

        <div className="pt-6">
          <div className={styles.profile__grid}>
            {myArtworks.map((art) => (
              <div key={art.id} className={styles['profile__art-card']}>
                <img src={art.imageUrl} className={styles['profile__art-image']} alt={art.title} />
                <div className={styles['profile__art-title']}>{art.title}</div>
              </div>
            ))}
          </div>
          {myArtworks.length === 0 && <p className="text-muted-foreground">Aún no has subido ninguna obra.</p>}
        </div>
      </div>
    </div>
  );
}