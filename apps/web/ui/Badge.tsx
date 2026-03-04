interface BadgeProps {
  children: React.ReactNode;
  variant?: 'organic' | 'sale' | 'new' | 'default';
  className?: string;
}

const variantClasses: Record<string, string> = {
  organic: 'bg-primary/90 text-white',
  sale: 'bg-accent text-white',
  new: 'bg-secondary text-white',
  default: 'bg-cream-dark text-text border border-border',
};

const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  return (
    <span
      className={`gc-display inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
