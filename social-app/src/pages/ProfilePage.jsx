import { useParams, Navigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../hooks/usePosts';
import ProfileHeader from '../components/profile/ProfileHeader';
import PostCard from '../components/post/PostCard';

export default function ProfilePage() {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const { posts } = usePosts();

  const user = storage.getUsers().find((u) => u.id === userId);
  if (!user) return <Navigate to="/404" replace />;

  const isOwner = currentUser?.id === user.id;

  const userPosts = posts
    .filter((p) => p.authorId === user.id && p.isPublic && !p.isDraft)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="page-shell py-6 space-y-4">
      <ProfileHeader user={user} isOwner={isOwner} />

      <h2 className="text-lg font-semibold font-display pt-2">Posts</h2>

      {userPosts.length === 0 ? (
        <div className="card p-10 text-center text-slate-400">No public posts yet</div>
      ) : (
        <div className="space-y-4">
          {userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
