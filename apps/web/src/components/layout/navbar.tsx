import { Link } from '@tanstack/react-router';
import type { AuthSession } from '@/clients/authClient';
import { UserAvatar } from '@/features/auth/components/user-avatar';
import NavContainer from '@/components/layout/nav-container';
import { postsLinkOptions } from '@/routes/_protected/posts/-validations/posts-link-options';

const activeClassName = 'underline decoration-2 opacity-70';

export function Navbar({ session }: Readonly<{ session: AuthSession }>) {
  return (
    <NavContainer>
      <div className="flex gap-x-4">
        <Link
          to="/"
          activeProps={{ className: activeClassName }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        {session?.user ? <Link {...postsLinkOptions}>Posts</Link> : null}
      </div>
      {session?.user ? (
        <UserAvatar />
      ) : (
        <div className="flex gap-x-2 justify-between">
          <Link
            to="/login"
            activeProps={{ className: activeClassName }}
            activeOptions={{ exact: true }}
          >
            Login
          </Link>
          <span>|</span>
          <Link
            to="/register"
            activeProps={{ className: activeClassName }}
            activeOptions={{ exact: true }}
          >
            Register
          </Link>
        </div>
      )}
    </NavContainer>
  );
}
