import { createContext, useContext, useState, useCallback } from 'react';
import { storage, generateId } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => storage.getCurrentUser());

  const signup = useCallback(({ name, email, password }) => {
    const users = storage.getUsers();
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw new Error('Email already registered');
    }
    const newUser = {
      id: generateId('usr'),
      name,
      email,
      password,
      bio: '',
      location: '',
      avatar: null,
      coverImage: null,
      joinedAt: new Date().toISOString(),
    };
    storage.setUsers([...users, newUser]);
    return newUser;
  }, []);

  const login = useCallback(({ email, password }) => {
    const users = storage.getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      throw new Error('Invalid email or password');
    }
    // eslint-disable-next-line no-unused-vars
    const { password: _pw, ...safeUser } = found;
    storage.setCurrentUser(safeUser);
    setCurrentUser(safeUser);
    return safeUser;
  }, []);

  const logout = useCallback(() => {
    storage.clearCurrentUser();
    setCurrentUser(null);
  }, []);

  const updateCurrentUser = useCallback((updatedData) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;
      const merged = { ...prev, ...updatedData };
      storage.setCurrentUser(merged);

      const users = storage.getUsers();
      const nextUsers = users.map((u) => (u.id === merged.id ? { ...u, ...updatedData } : u));
      storage.setUsers(nextUsers);

      return merged;
    });
  }, []);

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    signup,
    login,
    logout,
    updateCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export { AuthContext };
