/**
 * Guest route wrapper.
 * Redirects authenticated users to the home page.
 */
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface GuestRouteProps {
  children: ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Navigate to="/channels/@me" replace />;
  }

  return <>{children}</>;
}
