import { useState, useCallback } from 'react';

/**
 * Generic piece of state synced to a localStorage key.
 * Useful for small bonus features (e.g. dark mode preference) that don't
 * belong to the users/posts/comments/likes schema in utils/storage.js.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch (err) {
          console.error(`useLocalStorage: failed to write "${key}"`, err);
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, set];
}
