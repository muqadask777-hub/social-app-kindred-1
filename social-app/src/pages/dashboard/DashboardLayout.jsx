import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';

const LINKS = [
  { to: '/dashboard/posts', label: 'My Posts', icon: '📝' },
  { to: '/dashboard/create', label: 'Create Post', icon: '➕' },
  { to: '/dashboard/saved', label: 'Saved Posts', icon: '🔖' },
  { to: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
];

export default function DashboardLayout() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-6">
      <aside className="sm:sticky sm:top-20 h-fit">
        <nav className="card p-2 flex sm:flex-col gap-1 overflow-x-auto">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10'
                )
              }
            >
              <span aria-hidden="true">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
