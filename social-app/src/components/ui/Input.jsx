import { forwardRef } from 'react';
import clsx from 'clsx';

/**
 * Usage: <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
 */
const Input = forwardRef(function Input(
  { label, error, className, textarea = false, id, ...rest },
  ref
) {
  const inputId = id || rest.name;
  const Component = textarea ? 'textarea' : 'input';

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
          {label}
        </label>
      )}
      <Component
        id={inputId}
        ref={ref}
        className={clsx(
          'w-full rounded-xl border bg-white dark:bg-white/5 px-3.5 py-2.5 text-sm',
          'text-slate-900 dark:text-slate-100 placeholder:text-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
          'transition-colors',
          error
            ? 'border-rose-400 focus:ring-rose-400'
            : 'border-slate-300 dark:border-white/10',
          className
        )}
        {...rest}
      />
      {error && <p className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">{error}</p>}
    </div>
  );
});

export default Input;
