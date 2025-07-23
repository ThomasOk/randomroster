import { Outlet, createFileRoute } from '@tanstack/react-router';
import { PublicRoute } from '@/features/auth/guards/public-route';

export const Route = createFileRoute('/_public')({
  component: Layout,
});

function Layout() {
  return (
    <PublicRoute>
      <Outlet />
    </PublicRoute>
  );
}
