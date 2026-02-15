/**
 * Application router configuration.
 * Defines all routes and their corresponding components.
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestRoute } from './GuestRoute';

function HomePage() {
  return <Navigate to="/channels/@me" replace />;
}

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Login</h1>
        <p className="mt-2 text-text-muted">Login page - to be implemented in Phase 2</p>
      </div>
    </div>
  );
}

function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Register</h1>
        <p className="mt-2 text-text-muted">Register page - to be implemented in Phase 2</p>
      </div>
    </div>
  );
}

function ChannelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-normal">Channel</h1>
        <p className="mt-2 text-text-muted">Channel view - to be implemented in Phase 4</p>
      </div>
    </div>
  );
}

function DMPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-normal">Direct Messages</h1>
        <p className="mt-2 text-text-muted">DM view - to be implemented in Phase 5</p>
      </div>
    </div>
  );
}

function InvitePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-normal">Invite</h1>
        <p className="mt-2 text-text-muted">Invite page - to be implemented in Phase 6</p>
      </div>
    </div>
  );
}

function DiscoveryPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-normal">Discovery</h1>
        <p className="mt-2 text-text-muted">Server discovery - to be implemented in Phase 7</p>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-text-normal">404</h1>
        <p className="mt-2 text-text-muted">Page not found</p>
      </div>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route
          path="/channels/:serverId/:channelId"
          element={
            <ProtectedRoute>
              <ChannelPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/channels/@me"
          element={
            <ProtectedRoute>
              <DMPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/channels/@me/:dmId"
          element={
            <ProtectedRoute>
              <DMPage />
            </ProtectedRoute>
          }
        />
        <Route path="/invite/:code" element={<InvitePage />} />
        <Route
          path="/discovery"
          element={
            <ProtectedRoute>
              <DiscoveryPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
