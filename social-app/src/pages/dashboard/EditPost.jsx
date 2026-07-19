import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import PostForm from '../../components/post/PostForm';

export default function EditPost() {
  const { postId } = useParams();
  const { currentUser } = useAuth();
  const { posts, updatePost } = usePosts();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(null);

  const post = posts.find((p) => p.id === postId);

  // Not found, or belongs to someone else — bounce back to the dashboard.
  if (!post || post.authorId !== currentUser.id) {
    return <Navigate to="/dashboard/posts" replace />;
  }

  const handleSubmit = (data, { isDraft }) => {
    setSubmitting(isDraft ? 'draft' : 'publish');
    updatePost(post.id, {
      description: data.description,
      image: data.image,
      isPublic: data.isPublic,
      isDraft,
    });
    setSubmitting(null);
    navigate('/dashboard/posts');
  };

  return (
    <div>
      <h1 className="text-xl font-bold font-display mb-4">Edit Post</h1>
      <div className="card p-5 sm:p-6">
        <PostForm
          defaultValues={{
            description: post.description,
            image: post.image,
            isPublic: post.isPublic,
          }}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </div>
    </div>
  );
}
