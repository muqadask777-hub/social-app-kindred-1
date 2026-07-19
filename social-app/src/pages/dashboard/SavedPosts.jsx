import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import PostCard from '../../components/post/PostCard';

export default function SavedPosts() {
  const { currentUser } = useAuth();
  const { posts } = usePosts();

  const bookmarks = currentUser.bookmarks || [];
  const savedPosts = posts.filter((p) => bookmarks.includes(p.id));

  return (
    <div>
      <h1 className="text-xl font-bold font-display mb-4">Saved Posts</h1>
      {savedPosts.length === 0 ? (
        <div className="card p-10 text-center text-slate-400">
          You haven&rsquo;t saved any posts yet.
        </div>
      ) : (
        <div className="space-y-4">
          {savedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
