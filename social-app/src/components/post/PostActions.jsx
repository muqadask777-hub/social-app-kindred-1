import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export default function PostActions({
  likeCount,
  commentCount,
  isLiked,
  isAuthenticated,
  onLike,
  onCommentClick,
}) {
  const navigate = useNavigate();

  const requireAuth = (action) => (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login', { state: { message: 'Please login to interact' } });
      return;
    }
    action();
  };

  return (
    <div className="flex items-center gap-4 pt-1">
      <button
        onClick={requireAuth(onLike)}
        className={clsx(
          'flex items-center gap-1.5 text-sm font-medium px-2 py-1 -ml-2 rounded-lg transition-colors',
          isLiked
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400'
        )}
        aria-pressed={isLiked}
      >
        <span aria-hidden="true">{isLiked ? '★' : '☆'}</span>
        {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
      </button>

      <button
        onClick={onCommentClick ? requireAuth(onCommentClick) : undefined}
        className="flex items-center gap-1.5 text-sm font-medium px-2 py-1 rounded-lg text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors"
      >
        <span aria-hidden="true">💬</span>
        {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
      </button>
    </div>
  );
}
