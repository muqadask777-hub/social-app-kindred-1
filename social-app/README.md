# Kindred

A Facebook-inspired social media platform, built with React only — no backend, everything persisted in `localStorage`.

## Live Demo

🔗 **[Add your deployed Vercel/Netlify link here]**

> Replace this with your live URL after deploying (e.g. `npm run build`, then deploy to Vercel or Netlify).
>##  loom video :
>                https://www.veed.io/view/95beafa8-fd5b-43e7-852d-913f0e3c4942?source=editor&panel=referrals
> 

## Screenshots

> Add at least 4 screenshots here after running the app locally:

| Feed | Create Post | Profile | Dashboard |
<img width="886" height="465" alt="Screenshot 2026-07-19 160548" src="https://github.com/user-attachments/assets/a01b5cd3-212f-4af7-b910-727082ee8369" />
<img width="859" height="385" alt="Screenshot 2026-07-19 150913" src="https://github.com/user-attachments/assets/6f24382b-654f-4862-85a6-45824763622f" />
<img width="837" height="320" alt="Screenshot 2026-07-19 150524" src="https://github.com/user-attachments/assets/31c6244a-a086-4c4d-954f-5367914bdb72" />
<img width="845" height="466" alt="Screenshot 2026-07-19 145510" src="https://github.com/user-attachments/assets/d34dcd13-7b06-43a0-8dc0-677e194a7e24" />


## Tech Stack

- **React (Vite)** — frontend framework and project foundation
- **React Router v6** — multi-page navigation, dynamic routes, protected routes
- **Tailwind CSS** — utility-first styling, responsive design, dark mode
- **React Hook Form** — login, signup, post creation, profile settings forms
- **Context API** — global auth state (`AuthContext`)
- **localStorage** — all data storage (users, posts, comments, likes)
- **clsx** — conditional className composition
- **React.lazy + Suspense** — route-level code splitting

## Features

- Email/password signup and login with full validation, session persists across refresh
- Public feed of all published posts, newest first, with live search
- Guests can browse the feed and open posts, but liking/commenting redirects them to `/login`
- Create posts with description, image upload (with live preview), and Public/Private visibility
- Save posts as drafts or publish immediately; publish drafts later from the dashboard
- Full post CRUD: edit, delete (custom confirm modal), toggle public/private, publish drafts
- Post detail page with like/unlike and a full comment thread
- Add and delete your own comments, with inline "Are you sure? Yes / No" confirmation
- Public profile pages with cover image, avatar, bio, location, join date, and public posts
- Profile settings: update name, bio (150-char counter), location, and avatar — reflected instantly in the navbar
- Protected `/dashboard/*` routes that redirect unauthenticated users to `/login`
- **Bonus:** live post search, bookmarking/saved posts, dark mode toggle, live character counter on posts, image preview before upload, inline comment-delete confirmation

## How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/social-app-<your-name>.git
cd social-app-<your-name>

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# Opens at http://localhost:5173

# 4. Build for production
npm run build
npm run preview
```

## Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── post/
│   │   ├── PostCard.jsx
│   │   ├── PostForm.jsx
│   │   ├── PostActions.jsx
│   │   └── CommentSection.jsx
│   ├── profile/
│   │   └── ProfileHeader.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Avatar.jsx
│   │   └── Badge.jsx
│   └── RequireAuth.jsx
├── context/
│   └── AuthContext.jsx
├── hooks/
│   ├── useLocalStorage.js
│   ├── usePosts.js
│   └── useAuth.js
├── pages/
│   ├── FeedPage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── PostDetailPage.jsx
│   ├── ProfilePage.jsx
│   ├── NotFoundPage.jsx
│   └── dashboard/
│       ├── DashboardLayout.jsx
│       ├── PostsDashboard.jsx
│       ├── CreatePost.jsx
│       ├── EditPost.jsx
│       ├── ProfileSettings.jsx
│       └── SavedPosts.jsx
├── utils/
│   ├── storage.js
│   └── helpers.js
├── App.jsx
└── main.jsx
```

## localStorage Data Structure

**`users`** — array of registered users

```json
[
  {
    "id": "usr_1703001234_abc",
    "name": "Asad Khan",
    "email": "asad@test.com",
    "password": "Password123",
    "bio": "React developer from Lahore",
    "location": "Lahore, Pakistan",
    "avatar": "data:image/jpeg;base64,...",
    "coverImage": null,
    "bookmarks": ["post_1703001234_xyz"],
    "joinedAt": "2025-01-15T10:00:00Z"
  }
]
```

**`posts`** — array of all posts

```json
[
  {
    "id": "post_1703001234_xyz",
    "authorId": "usr_1703001234_abc",
    "description": "Hello everyone! This is my first post.",
    "image": "data:image/jpeg;base64,...",
    "isPublic": true,
    "isDraft": false,
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
]
```

**`comments`**

```json
[
  {
    "id": "cmt_1703001234",
    "postId": "post_1703001234_xyz",
    "authorId": "usr_1703001234_abc",
    "text": "Great post!",
    "createdAt": "2025-01-15T10:05:00Z"
  }
]
```

**`likes`**

```json
[
  {
    "id": "like_1703001234",
    "postId": "post_1703001234_xyz",
    "userId": "usr_1703001234_abc",
    "createdAt": "2025-01-15T10:03:00Z"
  }
]
```

`currentUser` holds the logged-in user's session (password stripped), and `theme` stores the dark-mode preference.

## What I Learned

> Replace this with your own honest reflection (minimum 5 sentences) before submitting — this needs to be in your own words for the Q&A.

Building Kindred forced me to think carefully about data modeling before writing any UI, since every component depends on the shape of the `users`, `posts`, `comments`, and `likes` arrays in `storage.js`. Working with Context API for auth state taught me how to avoid prop drilling while keeping the current user in sync across the navbar, dashboard, and profile pages. React Hook Form's `watch()` and validation rules made it much easier to build consistent, accessible forms across login, signup, post creation, and profile settings. Implementing protected routes with a `RequireAuth` wrapper clarified how nested routes and `<Outlet />` work together in React Router v6. Finally, simulating a backend entirely in `localStorage` highlighted both how convenient it is for prototyping and how much validation, cascading deletes, and data consistency a real backend normally handles for you.

## Known Limitations

- All data lives in the browser's `localStorage`, so it doesn't sync across devices and is wiped if the user clears site data.
- Passwords are stored in plain text in `localStorage` — a real backend would hash and salt them and never expose them client-side.
- Images are stored as base64 strings, which is inefficient for large files and bloats `localStorage`'s ~5–10MB limit; a real backend would use object storage (S3, Cloudinary, etc.) and store URLs instead.
- There's no real-time sync between browser tabs/users — a real backend with WebSockets or polling would be needed for live updates.
- No pagination — the feed loads all public posts at once, which wouldn't scale with a real user base.
- No server-side validation, rate limiting, or spam protection — anyone with dev tools can edit `localStorage` directly.
