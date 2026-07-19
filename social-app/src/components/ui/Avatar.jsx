import clsx from 'clsx';
import { initial, avatarColor } from '../../utils/helpers';

const SIZES = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-base',
  lg: 'w-20 h-20 text-2xl',
};

export default function Avatar({ src, name = '', size = 'md', className }) {
  const sizeClass = SIZES[size] || SIZES.md;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={clsx('rounded-full object-cover shrink-0', sizeClass, className)}
      />
    );
  }

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center shrink-0 text-white font-semibold font-display',
        avatarColor(name),
        sizeClass,
        className
      )}
      aria-hidden="true"
    >
      {initial(name)}
    </div>
  );
}
