import { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import styles from "./PublishPage.module.css";

interface PublishPageProps {
  onDone: () => void;
}

export default function PublishPage({ onDone }: PublishPageProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Subiendo obra:", { title, description });
    
    
    onDone();
  };

  return (
    <div className={styles.publish}>
      <div className={styles.publish__header}>
        <button onClick={onDone} className={styles['publish__back-btn']}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className={styles.publish__title}>Publish Artwork</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles['publish__upload-zone']}>
          <Upload className="w-8 h-8 mb-4" />
          <p className="font-medium">Click to upload or drag and drop</p>
          <p className="text-xs mt-1">PNG, JPG or WEBP (Max 10MB)</p>
        </div>

        <div className={styles['publish__input-group']}>
          <label className={styles.publish__label}>Title</label>
          <input
            className={styles.publish__input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your artwork a name"
            required
          />
        </div>

        <div className={styles['publish__input-group']}>
          <label className={styles.publish__label}>Description</label>
          <textarea
            className={`${styles.publish__input} resize-none`}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about your process..."
          />
        </div>

        <button type="submit" className={styles['publish__submit-btn']}>
          Publish Now
        </button>
      </form>
    </div>
  );
}