import styles from "./TagPill.module.css";

interface TagPillProps {
  tag: string;
  active?: boolean;
  onClick?: () => void;
}

export default function TagPill({ tag, active, onClick }: TagPillProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.pill} ${active ? styles['pill--active'] : ""}`}
    >
      #{tag}
    </button>
  );
}
