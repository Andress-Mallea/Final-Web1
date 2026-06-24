import { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";
import api from "../services/api";
import styles from "./PublishPage.module.css";
interface Tag {
  id: string;
  name: string;
}
interface PublishPageProps {
  onDone: () => void;
}

export default function PublishPage({ onDone }: PublishPageProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<Tag[]>([]); 
  const [selectedTags, setSelectedTags] = useState<string[]>([]); 
  const [isPublishing, setIsPublishing] = useState(false);
  const [file, setFile] = useState<File | null>(null); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    api.get("/api/v1/tags") 
      .then((res) => {
        setTags(res.data); 
      })
      .catch((err) => {
        console.error("Error al cargar tags:", err);
      });
  }, []);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) => 
      prev.includes(tagId) 
        ? prev.filter((id) => id !== tagId) 
        : [...prev, tagId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor selecciona una imagen para publicar.");
      return;
    }
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("tags", JSON.stringify(selectedTags)); 
    
    setIsPublishing(true); 
      try {
        await api.post("/api/v1/artworks", formData); 
        alert("¡Obra publicada con éxito!");
        onDone();
      } catch (err) {
        console.error("Error al publicar la obra:", err);
        alert("Hubo un error al publicar.");
      } finally {
        setIsPublishing(false); 
      }
    };
  return (
    <div className={styles.publish}>
      <h1 className={styles.publish__title}>Publish Artwork</h1>
      <p>Share your work with the Arteria community.</p>

      <form onSubmit={handleSubmit} className={styles.publish__container}>
        
        <div 
          className={styles['publish__upload-zone']}
          onClick={() => fileInputRef.current?.click()} 
        >
          {file ? (
            <p className="font-medium text-blue-400">Seleccionado: {file.name}</p>
          ) : (
            <>
              <Upload className="w-8 h-8 mb-4" />
              <p className="font-medium">Click para subir tu obra</p>
              <p className="text-xs mt-1">PNG, JPG, GIF, WebP · Max 50MB</p>
            </>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
            accept="image/*" 
            style={{ display: "none" }} 
          />
        </div>

      
        <div className={styles.publish__form_group}>
          <div className={styles['publish__input-group']}>
            <label className={styles.publish__label}>TITLE</label>
            <input
              className={styles.publish__input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your artwork a title..."
            />
          </div>

          <div className={styles['publish__input-group']}>
            <label className={styles.publish__label}>DESCRIPTION</label>
            <textarea
              className={`${styles.publish__input} resize-none`}
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your piece — medium, inspiration, process..."
            />
          </div>
          <div className={styles['publish__input-group']}>
          <label className={styles.publish__label}># TAGS</label>
          <div className={styles.publish__tags_container}>
            {tags.map((tag) => (
              <span 
                key={tag.id} 
                className={`${styles.publish__tag} ${selectedTags.includes(tag.id) ? styles['publish__tag--active'] : ""}`}
                onClick={() => toggleTag(tag.id)}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
        <button 
          type="submit" 
          className={styles['publish__submit-btn']} 
          disabled={isPublishing}
          >
          {isPublishing ? "Publishing..." : "Publish"}
        </button>
        </div>
      </form>
    </div>
  );
}