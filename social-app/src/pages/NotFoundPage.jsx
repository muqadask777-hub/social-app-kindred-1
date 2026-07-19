import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="page-shell py-24 text-center">
      <p className="text-6xl font-display font-bold text-brand-500">404</p>
      <h1 className="text-xl font-semibold mt-3">Page not found</h1>
      <p className="text-sm text-slate-400 mt-1">
        The page you&rsquo;re looking for doesn&rsquo;t exist or was moved.
      </p>
      <Link to="/" className="inline-block mt-6">
        <Button>Back to Feed</Button>
      </Link>
    </div>
  );
}
