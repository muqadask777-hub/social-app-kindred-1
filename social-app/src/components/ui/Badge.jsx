import clsx from 'clsx';

const VARIANTS = {
  draft: 'bg-brand-50 text-brand-600 dark:bg-white/10 dark:text-brand-200',
  public: 'bg-brand-500 text-white',
  private: 'bg-amber-500 text-brand-900',
};

const LABELS = {
  draft: 'Draft',
  public: 'Public',
  private: 'Private',
};

// Signature element: status reads like a torn ticket stub — small notches
// on each edge give every post an at-a-glance, tactile status marker.
export default function Badge({ variant = 'draft', className }) {
  return (
    <span
      className={clsx(
        'relative inline-flex items-center px-3 py-1 text-[11px] font-mono uppercase tracking-wide rounded-[3px]',
        VARIANTS[variant],
        className
      )}
      style={{ clipPath: 'polygon(6px 0, 100% 0, 100% 100%, 6px 100%, 0 50%)' }}
    >
      {LABELS[variant]}
    </span>
  );
}
