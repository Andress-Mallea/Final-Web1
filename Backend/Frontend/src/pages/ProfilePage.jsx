
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { getArtworks } from "../services/api"; 
import { normalizeArtwork } from "../utils/normalizeArtwork";

import Avatar from "../components/common/Avatar";

function ProfilePage({ onBack, currentUser }) {
 
  const [myArtworks, setMyArtworks] = useState([]);

  useEffect(() => {
    getArtworks().then((data) => {
      const filtered = data
        .map(normalizeArtwork)
        .filter((art) => {
          return art.artist.toLowerCase() === currentUser.name.toLowerCase();
        });
      setMyArtworks(filtered);
    });
  }, [currentUser]);

  return (
    <div className="pb-12">
      <div className="relative h-52 bg-muted overflow-hidden">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=300&fit=crop&auto=format" className="w-full h-full object-cover" />
        <button onClick={onBack} className="absolute top-4 left-4 p-2 rounded-lg bg-black/40 backdrop-blur-sm text-white">
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
      <div className="px-6 -mt-12 relative">
        <div className="flex items-end gap-4">
          <Avatar src={currentUser.avatar} size={24} className="border-4 border-background" />
          <div className="mb-2">
            <h2 className="text-xl font-bold text-foreground">{currentUser.name}</h2>
            <p className="text-sm text-muted-foreground font-mono">@{currentUser.name.toLowerCase()}</p>
          </div>
        </div>
        <div className="pt-6">
          <div className="columns-2 lg:columns-3 gap-4">
            {myArtworks.map((art) => (
              <div key={art.id} className="break-inside-avoid mb-4 rounded-xl overflow-hidden bg-card border border-border">
                <img src={art.imageUrl} className="w-full object-cover" />
                <div className="p-3">
                  <p className="text-sm font-semibold">{art.title}</p>
                </div>
              </div>
            ))}
          </div>
          {myArtworks.length === 0 && <p className="text-muted-foreground">Aún no has subido ninguna obra.</p>}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;