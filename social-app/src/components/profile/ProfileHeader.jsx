import { Link } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { formatJoinDate } from '../../utils/helpers';

export default function ProfileHeader({ user, isOwner }) {
  return (
    <div className="card overflow-hidden">
      <div
        className="h-40 sm:h-52 w-full bg-gradient-to-br from-brand-500 to-brand-700"
        style={
          user.coverImage
            ? { backgroundImage: `url(${user.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : undefined
        }
      />
      <div className="px-5 sm:px-6 pb-6">
        <div className="flex items-end justify-between -mt-10">
          <Avatar
            src={user.avatar}
            name={user.name}
            size="lg"
            className="ring-4 ring-white dark:ring-[#181B20]"
          />
          {isOwner && (
            <Link to="/dashboard/settings" className="mb-1">
              <Button variant="secondary" size="sm">
                Edit Profile
              </Button>
            </Link>
          )}
        </div>

        <h1 className="text-xl font-bold font-display mt-3">{user.name}</h1>
        {user.bio && <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{user.bio}</p>}

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-slate-400">
          {user.location && (
            <span className="flex items-center gap-1">
              <span aria-hidden="true">📍</span> {user.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <span aria-hidden="true">📅</span> Joined {formatJoinDate(user.joinedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
