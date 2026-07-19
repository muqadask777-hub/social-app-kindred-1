import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

export default function Navbar() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 dark:border-white/10 bg-paper/90 dark:bg-[#0F1512]/90 backdrop-blur">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-amber-400 font-display italic font-semibold text-base group-hover:bg-brand-600 transition-colors">
            K
          </span>
          <span className="font-display italic font-medium text-lg tracking-tight">Kindred</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDark((d) => !d)}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-full flex items-center justify-center text-brand-500 hover:bg-brand-50 dark:text-brand-200 dark:hover:bg-white/10 transition-colors"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard/posts"
                className="hidden sm:inline text-sm font-medium text-brand-600 dark:text-brand-200 hover:text-brand-700 dark:hover:text-amber-400 px-2"
              >
                Dashboard
              </Link>
              <Link to={`/profile/${currentUser.id}`} aria-label="My profile">
                <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
