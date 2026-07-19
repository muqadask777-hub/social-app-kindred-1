import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import RequireAuth from './components/RequireAuth';

const FeedPage = lazy(() => import('./pages/FeedPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const PostDetailPage = lazy(() => import('./pages/PostDetailPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const DashboardLayout = lazy(() => import('./pages/dashboard/DashboardLayout'));
const PostsDashboard = lazy(() => import('./pages/dashboard/PostsDashboard'));
const CreatePost = lazy(() => import('./pages/dashboard/CreatePost'));
const EditPost = lazy(() => import('./pages/dashboard/EditPost'));
const ProfileSettings = lazy(() => import('./pages/dashboard/ProfileSettings'));
const SavedPosts = lazy(() => import('./pages/dashboard/SavedPosts'));

function PageSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <Suspense fallback={<PageSpinner />}>
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/posts/:postId" element={<PostDetailPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />

            <Route path="/dashboard" element={<RequireAuth />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<PostsDashboard />} />
                <Route path="posts" element={<PostsDashboard />} />
                <Route path="create" element={<CreatePost />} />
                <Route path="edit/:postId" element={<EditPost />} />
                <Route path="settings" element={<ProfileSettings />} />
                <Route path="saved" element={<SavedPosts />} />
              </Route>
            </Route>

            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
