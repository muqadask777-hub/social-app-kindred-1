/**
 * Formats an ISO timestamp into a short, human-friendly relative time
 * (e.g. "3m ago", "5h ago", "2d ago"), falling back to a date for older posts.
 */
export function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHr = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHr / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

/** Formats an ISO timestamp as a full date, e.g. "Joined January 2025" */
export function formatJoinDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

/** Reads a File object and resolves to a base64 data URL. */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

/** Returns the first letter of a name, uppercased, for avatar fallbacks. */
export function initial(name = '') {
  return name.trim().charAt(0).toUpperCase() || '?';
}

/** Deterministic-ish background color for an avatar initial, based on the name. */
const AVATAR_COLORS = [
  'bg-brand-500', 'bg-amber-500', 'bg-emerald-500',
  'bg-rose-500', 'bg-sky-500', 'bg-violet-500', 'bg-teal-500',
];
export function avatarColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
