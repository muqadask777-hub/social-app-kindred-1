import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function SignupPage() {
  const { isAuthenticated, signup } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    document.title = 'Sign up · Kindred';
  }, []);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const password = watch('password');

  const onSubmit = async (data) => {
    setFormError('');
    try {
      signup({ name: data.name, email: data.email, password: data.password });
      navigate('/login');
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <div className="page-shell py-12 max-w-sm">
      <h1 className="text-2xl font-bold font-display mb-1">Create your account</h1>
      <p className="text-sm text-slate-400 mb-6">Join Kindred in a few seconds.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="Jane Doe"
          error={errors.name?.message}
          {...register('name', {
            required: 'Full name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
        />
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
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).+$/,
              message: 'Password needs an uppercase letter and a number',
            },
          })}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
        />

        {formError && <p className="text-sm text-rose-600 dark:text-rose-400">{formError}</p>}

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Sign up
        </Button>
      </form>

      <p className="text-sm text-slate-400 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
