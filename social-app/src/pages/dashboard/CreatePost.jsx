import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import PostForm from '../../components/post/PostForm';

export default function CreatePost() {
  const { currentUser } = useAuth();
  const { createPost } = usePosts();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = (data, { isDraft }) => {
    setSubmitting(isDraft ? 'draft' : 'publish');
    createPost({
      authorId: currentUser.id,
      description: data.description,
      image: data.image,
      isPublic: data.isPublic,
      isDraft,
    });
    setSubmitting(null);

    if (isDraft) {
      setDraftSaved(true);
      setFormKey((k) => k + 1); // clears the form
      setTimeout(() => setDraftSaved(false), 3000);
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold font-display mb-4">Create Post</h1>

      {draftSaved && (
        <div className="mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm px-4 py-3">
          Post saved as draft
        </div>
      )}

      <div className="card p-5 sm:p-6">
        <PostForm key={formKey} onSubmit={handleSubmit} submitting={submitting} />
      </div>
    </div>
  );
}
