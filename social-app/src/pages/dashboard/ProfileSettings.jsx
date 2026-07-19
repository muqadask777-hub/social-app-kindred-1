import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { fileToBase64 } from '../../utils/helpers';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';

const BIO_MAX = 150;

export default function ProfileSettings() {
  const { currentUser, updateCurrentUser } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState(currentUser.avatar);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: currentUser.name,
      bio: currentUser.bio || '',
      location: currentUser.location || '',
    },
  });

  const bio = watch('bio') || '';

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setAvatarPreview(base64);
  };

  const onSubmit = (data) => {
    updateCurrentUser({
      name: data.name,
      bio: data.bio,
      location: data.location,
      avatar: avatarPreview,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="text-xl font-bold font-display mb-4">Profile Settings</h1>

      {saved && (
        <div className="mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm px-4 py-3">
          Profile updated successfully
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="card p-5 sm:p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Avatar</label>
          <div className="flex items-center gap-4">
            <Avatar src={avatarPreview} name={currentUser.name} size="lg" />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-50 file:text-brand-700 dark:file:bg-brand-500/15 dark:file:text-brand-300 file:text-sm file:font-medium hover:file:bg-brand-100"
            />
          </div>
        </div>

        <Input
          label="Full Name"
          error={errors.name?.message}
          {...register('name', { required: 'Full name is required' })}
        />

        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1.5">
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
            {...register('bio', { maxLength: BIO_MAX })}
          />
          <p
            className={`text-xs mt-1 text-right ${
              bio.length >= BIO_MAX ? 'text-rose-500' : 'text-slate-400'
            }`}
          >
            {bio.length} / {BIO_MAX} characters
          </p>
        </div>

        <Input label="Location" placeholder="City, Country" {...register('location')} />

        <Button type="submit" isLoading={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </div>
  );
}
