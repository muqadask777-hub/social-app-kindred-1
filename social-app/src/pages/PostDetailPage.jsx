import { useParams, Link, Navigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { formatDate } from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../hooks/usePosts';
import Avatar from '../components/ui/Avatar';
import PostActions from '../components/post/PostActions';
import CommentSection from '../components/post/CommentSection';

export default function PostDetailPage() {
  const { postId } = useParams();
  const { currentUser, isAuthenticated } = useAuth();
  const { posts, getLikesForPost, getCommentsForPost, hasUserLiked, toggleLike } = usePosts();

  const post = posts.find((p) => p.id === postId);

  if (!post) return <Navigate to="/404" replace />;

  const author = storage.getUsers().find((u) => u.id === post.authorId);
  const likeCount = getLikesForPost(post.id).length;
  const commentCount = getCommentsForPost(post.id).length;
  const isLiked = hasUserLiked(post.id, currentUser?.id);

  return (
    <div className="page-shell py-6">
      <div className="card p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Link to={author ? `/profile/${author.id}` : '#'}>
            <Avatar src={author?.avatar} name={author?.name} size="md" />
          </Link>
          <div>
            <Link
              to={author ? `/profile/${author.id}` : '#'}
              className="font-semibold hover:text-brand-600 dark:hover:text-brand-400"
            >
              {author?.name || 'Unknown user'}
            </Link>
            <p className="text-xs text-slate-400">{formatDate(post.createdAt)}</p>
          </div>
        </div>

        {post.description && (
          <p className="mt-4 text-[15px] leading-relaxed text-slate-800 dark:text-slate-100 whitespace-pre-wrap">
            {post.description}
          </p>
        )}

        {post.image && (
          <img
            src={post.image}
            alt=""
            className="mt-4 w-full rounded-xl border border-slate-100 dark:border-white/10"
          />
        )}

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
          <PostActions
            likeCount={likeCount}
            commentCount={commentCount}
            isLiked={isLiked}
            isAuthenticated={isAuthenticated}
            onLike={() => toggleLike(post.id, currentUser.id)}
          />
        </div>

        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}
