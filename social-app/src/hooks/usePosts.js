import { useState, useCallback, useEffect } from 'react';
import { storage, generateId } from '../utils/storage';

/**
 * Central hook for reading and mutating posts (plus their likes/comments).
 * Components call the returned actions instead of touching storage.js directly.
 */
export function usePosts() {
  const [posts, setPosts] = useState(() => storage.getPosts());

  // Keep in sync if another tab/component wrote to localStorage.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'posts') setPosts(storage.getPosts());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const refresh = useCallback(() => setPosts(storage.getPosts()), []);

  const createPost = useCallback(({ authorId, description, image, isPublic, isDraft }) => {
    const all = storage.getPosts();
    const now = new Date().toISOString();
    const newPost = {
      id: generateId('post'),
      authorId,
      description,
      image: image || null,
      isPublic: !!isPublic,
      isDraft: !!isDraft,
      createdAt: now,
      updatedAt: now,
    };
    const next = [...all, newPost];
    storage.setPosts(next);
    setPosts(next);
    return newPost;
  }, []);

  const updatePost = useCallback((postId, updates) => {
    const all = storage.getPosts();
    const next = all.map((p) =>
      p.id === postId ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    storage.setPosts(next);
    setPosts(next);
  }, []);

  const deletePost = useCallback((postId) => {
    const all = storage.getPosts();
    const next = all.filter((p) => p.id !== postId);
    storage.setPosts(next);
    setPosts(next);

    // Cascade delete related comments/likes
    storage.setComments(storage.getComments().filter((c) => c.postId !== postId));
    storage.setLikes(storage.getLikes().filter((l) => l.postId !== postId));
  }, []);

  const togglePublic = useCallback(
    (postId) => {
      const post = storage.getPosts().find((p) => p.id === postId);
      if (!post) return;
      updatePost(postId, { isPublic: !post.isPublic });
    },
    [updatePost]
  );

  const publishDraft = useCallback(
    (postId) => {
      updatePost(postId, { isDraft: false, isPublic: true });
    },
    [updatePost]
  );

  // --- Likes ---
  const getLikesForPost = useCallback((postId) => {
    return storage.getLikes().filter((l) => l.postId === postId);
  }, []);

  const hasUserLiked = useCallback((postId, userId) => {
    if (!userId) return false;
    return storage.getLikes().some((l) => l.postId === postId && l.userId === userId);
  }, []);

  const toggleLike = useCallback((postId, userId) => {
    const likes = storage.getLikes();
    const existing = likes.find((l) => l.postId === postId && l.userId === userId);
    if (existing) {
      storage.setLikes(likes.filter((l) => l.id !== existing.id));
    } else {
      storage.setLikes([
        ...likes,
        { id: generateId('like'), postId, userId, createdAt: new Date().toISOString() },
      ]);
    }
  }, []);

  // --- Comments ---
  const getCommentsForPost = useCallback((postId) => {
    return storage
      .getComments()
      .filter((c) => c.postId === postId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }, []);

  const addComment = useCallback((postId, authorId, text) => {
    const comments = storage.getComments();
    const newComment = {
      id: generateId('cmt'),
      postId,
      authorId,
      text,
      createdAt: new Date().toISOString(),
    };
    storage.setComments([...comments, newComment]);
    return newComment;
  }, []);

  const deleteComment = useCallback((commentId) => {
    storage.setComments(storage.getComments().filter((c) => c.id !== commentId));
  }, []);

  return {
    posts,
    refresh,
    createPost,
    updatePost,
    deletePost,
    togglePublic,
    publishDraft,
    getLikesForPost,
    hasUserLiked,
    toggleLike,
    getCommentsForPost,
    addComment,
    deleteComment,
  };
}
