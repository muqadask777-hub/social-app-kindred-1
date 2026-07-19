import { useState, useMemo } from 'react';
import { usePosts } from '../hooks/usePosts';

import PostCard from '../components/post/PostCard';

export default function FeedPage() {
  const { posts } = usePosts();
  const [query, setQuery] = useState('');

  const visiblePosts = useMemo(
    () =>
      posts
        .filter((p) => p.isPublic && !p.isDraft)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return visiblePosts;
    const q = query.trim().toLowerCase();
    return visiblePosts.filter((p) => p.description.toLowerCase().includes(q));
  }, [visiblePosts, query]);

  return (
    <div className="page-shell py-6">
      <h1 className="text-2xl font-bold font-display mb-4">Feed</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2.5 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-brand-500"
      />

      {visiblePosts.length === 0 ? (
        <div className="card p-10 text-center text-slate-400">
          No posts yet — be the first to share!
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="card p-10 text-center text-slate-400">
          No results found for &ldquo;{query}&rdquo;
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
