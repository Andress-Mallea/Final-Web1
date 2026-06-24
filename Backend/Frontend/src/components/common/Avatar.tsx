import styles from "./Avatar.module.css";

interface AvatarProps {
  src: string;
  size?: number;
  className?: string;
}

export default function Avatar({ src, size = 8, className = "" }: AvatarProps) {
  return (
    <img
      src={src}
      alt="avatar"
      className={`${styles.avatar} ${className}`}
      style={{ 
        width: `${size * 4}px`, 
        height: `${size * 4}px` 
      }}
    />
  );
}
