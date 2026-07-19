import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState('');
  const infoMessage = location.state?.message;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    document.title = 'Log in · Kindred';
  }, []);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const onSubmit = async (data) => {
    setFormError('');
    try {
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <div className="page-shell py-12 max-w-sm">
      <h1 className="text-2xl font-bold font-display mb-1">Welcome back</h1>
      <p className="text-sm text-slate-400 mb-6">Log in to continue to Kindred.</p>

      {infoMessage && (
        <div className="mb-4 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 text-sm px-4 py-3">
          {infoMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
          })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
          })}
        />

        {formError && <p className="text-sm text-rose-600 dark:text-rose-400">{formError}</p>}

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Log in
        </Button>
      </form>

      <p className="text-sm text-slate-400 mt-6">
        Don&rsquo;t have an account?{' '}
        <Link to="/signup" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
