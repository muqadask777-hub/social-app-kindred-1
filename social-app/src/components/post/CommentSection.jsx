import { useState } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '../../utils/storage';
import { formatDate } from '../../utils/helpers';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

export default function CommentSection({ postId }) {
  const { currentUser, isAuthenticated } = useAuth();
  const { getCommentsForPost, addComment, deleteComment } = usePosts();
  const [text, setText] = useState('');
  const [confirmingId, setConfirmingId] = useState(null);
  const [, forceRerender] = useState(0);

  const comments = getCommentsForPost(postId);
  const users = storage.getUsers();
  const authorOf = (authorId) => users.find((u) => u.id === authorId);

  const refresh = () => forceRerender((n) => n + 1);

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || !currentUser) return;
    addComment(postId, currentUser.id, trimmed);
    setText('');
    refresh();
  };

  const handleDelete = (commentId) => {
    deleteComment(commentId);
    setConfirmingId(null);
    refresh();
  };

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
      </h3>

      <div className="space-y-4">
        {comments.map((comment) => {
          const author = authorOf(comment.authorId);
          const isOwn = currentUser?.id === comment.authorId;
          return (
            <div key={comment.id} className="flex gap-3">
              <Link to={author ? `/profile/${author.id}` : '#'} className="shrink-0">
                <Avatar src={author?.avatar} name={author?.name} size="sm" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="bg-slate-100 dark:bg-white/5 rounded-2xl px-3.5 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={author ? `/profile/${author.id}` : '#'}
                      className="text-sm font-semibold hover:text-brand-600 dark:hover:text-brand-400"
                    >
                      {author?.name || 'Unknown user'}
                    </Link>
                    {isOwn && confirmingId !== comment.id && (
                      <button
                        onClick={() => setConfirmingId(comment.id)}
                        className="text-xs text-slate-400 hover:text-rose-500"
                        aria-label="Delete comment"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap mt-0.5">
                    {comment.text}
                  </p>
                </div>

                {isOwn && confirmingId === comment.id && (
                  <div className="flex items-center gap-2 mt-1.5 text-sm">
                    <span className="text-slate-500">Are you sure?</span>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="font-semibold text-rose-600 hover:underline"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmingId(null)}
                      className="font-semibold text-slate-500 hover:underline"
                    >
                      No
                    </button>
                  </div>
                )}

                <p className="text-xs text-slate-400 mt-1 ml-3.5">{formatDate(comment.createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleAdd} className="flex items-center gap-2 mt-5">
          <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 rounded-full border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <Button type="submit" size="sm" disabled={!text.trim()}>
            Post
          </Button>
        </form>
      ) : (
        <p className="mt-5 text-sm text-slate-400">
          <Link to="/login" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
            Login
          </Link>{' '}
          to comment
        </p>
      )}
    </div>
  );
}
