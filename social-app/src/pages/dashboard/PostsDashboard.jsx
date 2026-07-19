import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import { formatDate } from '../../utils/helpers';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

function statusOf(post) {
  if (post.isDraft) return 'draft';
  return post.isPublic ? 'public' : 'private';
}

export default function PostsDashboard() {
  const { currentUser } = useAuth();
  const { posts, deletePost, togglePublic, publishDraft, getLikesForPost, getCommentsForPost } =
    usePosts();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const myPosts = posts
    .filter((p) => p.authorId === currentUser.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const confirmDelete = () => {
    if (deleteTarget) deletePost(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold font-display">My Posts</h1>
        <Link to="/dashboard/create">
          <Button size="sm">Create Post</Button>
        </Link>
      </div>

      {myPosts.length === 0 ? (
        <div className="card p-10 text-center text-slate-400">
          You haven&rsquo;t created any posts yet. Create your first post!
        </div>
      ) : (
        <div className="space-y-3">
          {myPosts.map((post) => {
            const status = statusOf(post);
            const likeCount = getLikesForPost(post.id).length;
            const commentCount = getCommentsForPost(post.id).length;
            return (
              <div key={post.id} className="card p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={status} />
                    <span className="text-xs text-slate-400">{formatDate(post.createdAt)}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-200 truncate">
                    {post.description}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {likeCount} likes · {commentCount} comments
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {post.isDraft && (
                    <Button size="sm" variant="primary" onClick={() => publishDraft(post.id)}>
                      Publish
                    </Button>
                  )}
                  {!post.isDraft && (
                    <Button size="sm" variant="secondary" onClick={() => togglePublic(post.id)}>
                      Make {post.isPublic ? 'Private' : 'Public'}
                    </Button>
                  )}
                  <Link to={`/dashboard/edit/${post.id}`}>
                    <Button size="sm" variant="secondary">
                      Edit
                    </Button>
                  </Link>
                  <Button size="sm" variant="danger" onClick={() => setDeleteTarget(post)}>
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete this post?">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
          This will permanently remove the post along with its comments and likes. This can&rsquo;t
          be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
