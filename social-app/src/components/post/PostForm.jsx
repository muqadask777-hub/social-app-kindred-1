import { useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import Button from '../ui/Button';
import { fileToBase64 } from '../../utils/helpers';

const MAX_CHARS = 500;

/**
 * Shared form for both Create Post and Edit Post.
 * `defaultValues` shape: { description, image, isPublic }
 * `onSubmit(data, { isDraft })` — data includes description, image, isPublic
 */
export default function PostForm({ defaultValues = {}, onSubmit, submitting }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: defaultValues.description || '',
    },
  });

  const [imagePreview, setImagePreview] = useState(defaultValues.image || null);
  const [isPublic, setIsPublic] = useState(defaultValues.isPublic ?? true);
  const description = watch('description') || '';
  const charCount = description.length;

  const charColor =
    charCount >= 480 ? 'text-rose-500' : charCount >= 400 ? 'text-amber-500' : 'text-slate-400';

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setImagePreview(base64);
  };

  const clearImage = () => {
    setImagePreview(null);
  };

  const submit = (data, isDraft) => {
    if (charCount > MAX_CHARS) return;
    onSubmit(
      {
        description: data.description,
        image: imagePreview,
        isPublic,
      },
      { isDraft }
    );
  };

  return (
    <form className="space-y-5">
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1.5">
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          placeholder="What's on your mind?"
          className={clsx(
            'w-full rounded-xl border bg-white dark:bg-white/5 px-3.5 py-2.5 text-sm resize-none',
            'text-slate-900 dark:text-slate-100 placeholder:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
            errors.description ? 'border-rose-400' : 'border-slate-300 dark:border-white/10'
          )}
          {...register('description', {
            required: 'Description is required',
            minLength: { value: 10, message: 'Description must be at least 10 characters' },
          })}
        />
        <div className="flex items-center justify-between mt-1.5">
          {errors.description ? (
            <p className="text-sm text-rose-600 dark:text-rose-400">{errors.description.message}</p>
          ) : (
            <span />
          )}
          <span className={clsx('text-xs tabular-nums', charColor)}>
            {charCount} / {MAX_CHARS} characters
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-50 file:text-brand-700 dark:file:bg-brand-500/15 dark:file:text-brand-300 file:text-sm file:font-medium hover:file:bg-brand-100"
        />
        {imagePreview && (
          <div className="relative mt-3 inline-block">
            <img
              src={imagePreview}
              alt="Selected preview"
              className="max-h-64 rounded-xl border border-slate-200 dark:border-white/10"
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-900 text-white text-sm flex items-center justify-center shadow"
              aria-label="Remove image"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-white/10 px-4 py-3">
        <div>
          <p className="text-sm font-medium">Visibility</p>
          <p className="text-xs text-slate-400">
            {isPublic ? 'Anyone can see this post' : 'Only you can see this post'}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={isPublic}
          onClick={() => setIsPublic((v) => !v)}
          className={clsx(
            'w-11 h-6 rounded-full transition-colors relative shrink-0',
            isPublic ? 'bg-brand-500' : 'bg-slate-300 dark:bg-white/20'
          )}
        >
          <span
            className={clsx(
              'absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow',
              isPublic ? 'translate-x-5' : 'translate-x-0.5'
            )}
          />
        </button>
      </div>

      <div className="flex gap-3 pt-1">
        <Button
          type="button"
          variant="secondary"
          isLoading={submitting === 'draft'}
          disabled={charCount > MAX_CHARS || !!submitting}
          onClick={handleSubmit((data) => submit(data, true))}
        >
          Save as Draft
        </Button>
        <Button
          type="button"
          variant="primary"
          isLoading={submitting === 'publish'}
          disabled={charCount > MAX_CHARS || !!submitting}
          onClick={handleSubmit((data) => submit(data, false))}
        >
          Publish
        </Button>
      </div>
    </form>
  );
}
