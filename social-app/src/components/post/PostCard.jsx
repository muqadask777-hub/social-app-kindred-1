import { useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';
import { formatDate } from '../../utils/helpers';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import Avatar from '../ui/Avatar';
import PostActions from './PostActions';

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, updateCurrentUser } = useAuth();
  const { getLikesForPost, getCommentsForPost, hasUserLiked, toggleLike } = usePosts();

  const author = storage.getUsers().find((u) => u.id === post.authorId);
  const likeCount = getLikesForPost(post.id).length;
  const commentCount = getCommentsForPost(post.id).length;
  const isLiked = hasUserLiked(post.id, currentUser?.id);

  const goToPost = () => navigate(`/posts/${post.id}`);
  const goToAuthor = (e) => {
    e.stopPropagation();
    if (author) navigate(`/profile/${author.id}`);
  };

  const bookmarks = currentUser?.bookmarks || [];
  const isBookmarked = bookmarks.includes(post.id);
  const toggleBookmark = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login', { state: { message: 'Please login to interact' } });
      return;
    }
    const next = isBookmarked
      ? bookmarks.filter((id) => id !== post.id)
      : [...bookmarks, post.id];
    updateCurrentUser({ bookmarks: next });
  };

  return (
    <article
      onClick={goToPost}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && goToPost()}
      className="card p-4 sm:p-5 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        <button onClick={goToAuthor} aria-label={`${author?.name || 'Unknown'}'s profile`}>
          <Avatar src={author?.avatar} name={author?.name} size="md" />
        </button>
        <div className="min-w-0">
          <button
            onClick={goToAuthor}
            className="font-semibold text-sm hover:text-brand-600 dark:hover:text-brand-400 truncate block text-left"
          >
            {author?.name || 'Unknown user'}
          </button>
          <p className="text-xs text-slate-400">{formatDate(post.createdAt)}</p>
        </div>
        <button
          onClick={toggleBookmark}
          aria-pressed={isBookmarked}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Save post'}
          className="ml-auto text-lg text-slate-300 hover:text-brand-500 dark:text-slate-500 dark:hover:text-brand-400 transition-colors"
        >
          {isBookmarked ? '🔖' : '📑'}
        </button>
      </div>

      {post.description && (
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap line-clamp-4">
          {post.description}
        </p>
      )}

      {post.image && (
        <img
          src={post.image}
          alt=""
          className="mt-3 w-full max-h-96 object-cover rounded-xl border border-slate-100 dark:border-white/10"
        />
      )}

      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/10">
        <PostActions
          likeCount={likeCount}
          commentCount={commentCount}
          isLiked={isLiked}
          isAuthenticated={isAuthenticated}
          onLike={() => toggleLike(post.id, currentUser.id)}
          onCommentClick={goToPost}
        />
      </div>
    </article>
  );
}
