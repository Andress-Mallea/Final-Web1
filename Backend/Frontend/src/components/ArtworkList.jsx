import { useEffect, useState } from 'react';
import { getArtworks } from '../services/api';

const ArtworkList = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArtworks();
        console.log("Datos recibidos:", data);
        setArtworks(data);
      } catch (error) {
        console.error("Error al traer las obras:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="artwork-grid">
      {artworks.map((art) => (
        <div key={art.id} className="artwork-card">
            <h3>{art.title}</h3>
            <p>Artista: {art.artist ? art.artist.username : "Artista desconocido"}</p>
        </div>
        ))}
    </div>
  );
};

export default ArtworkList;