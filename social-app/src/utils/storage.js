// All localStorage access goes through this file.
// Never call localStorage directly from components — always import `storage` from here.

const KEYS = {
  USERS: 'users',
  POSTS: 'posts',
  COMMENTS: 'comments',
  LIKES: 'likes',
  CURRENT_USER: 'currentUser',
  THEME: 'theme',
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`storage: failed to read "${key}"`, err);
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`storage: failed to write "${key}"`, err);
  }
}

export const storage = {
  // Users
  getUsers: () => read(KEYS.USERS, []),
  setUsers: (users) => write(KEYS.USERS, users),

  // Posts
  getPosts: () => read(KEYS.POSTS, []),
  setPosts: (posts) => write(KEYS.POSTS, posts),

  // Comments
  getComments: () => read(KEYS.COMMENTS, []),
  setComments: (comments) => write(KEYS.COMMENTS, comments),

  // Likes
  getLikes: () => read(KEYS.LIKES, []),
  setLikes: (likes) => write(KEYS.LIKES, likes),

  // Current session
  getCurrentUser: () => read(KEYS.CURRENT_USER, null),
  setCurrentUser: (user) => write(KEYS.CURRENT_USER, user),
  clearCurrentUser: () => localStorage.removeItem(KEYS.CURRENT_USER),

  // Theme (bonus: dark mode)
  getTheme: () => read(KEYS.THEME, 'light'),
  setTheme: (theme) => write(KEYS.THEME, theme),
};

/**
 * Generates a reasonably-unique id for a given entity prefix,
 * e.g. generateId('usr') -> 'usr_1703001234567_ab12cd'
 */
export function generateId(prefix) {
  const time = Date.now();
  const rand = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${time}_${rand}`;
}
