interface TagPillProps {
  tag: string;
  active?: boolean;
  onClick?: () => void;
}

export default function TagPill({ tag, active, onClick }: TagPillProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 border ${
        active
          ? "bg-primary/20 border-primary/60 text-primary"
          : "bg-secondary border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      #{tag}
    </button>
  );
}
