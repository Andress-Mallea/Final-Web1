import styles from "./TagPill.module.css";


interface Tag {
  id: string;
  name: string;
}

interface TagPillProps {
  tag: string | { id: string; name: string }; 
  active?: boolean;
  onClick?: () => void;
}

export default function TagPill({ tag, active, onClick }: TagPillProps) {
  const tagName = typeof tag === 'string' ? tag : tag.name;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.pill} ${active ? styles['pill--active'] : ""}`}
    >
      #{tagName}
    </button>
  );
}