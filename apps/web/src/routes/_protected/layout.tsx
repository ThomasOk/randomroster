import { Outlet, createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/features/auth/guards/protected-route';

export const Route = createFileRoute('/_protected')({
  component: Layout,
});

function Layout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}
