import { Navigate } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { useAuth } from '../hooks/use-auth';
import Spinner from '@/components/ui/spinner';

type PublicRouteProps = {
  children: ReactNode;
  redirectTo?: string;
  fallback?: ReactNode;
};

export const PublicRoute = ({
  children,
  redirectTo = '/',
  fallback,
}: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <>{fallback || <Spinner />}</>;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
};
