import { TrashIcon } from '@radix-ui/react-icons';
import { Link } from '@tanstack/react-router';
import type { AppRouter } from '@repo/api/server';
import type { inferRouterOutputs } from '@trpc/server';

import { DeletePostButton } from './delete-post-button';

type Post = inferRouterOutputs<AppRouter>['posts']['all'][number];

interface PostCardProps {
  post: Post;
  disabled?: boolean;
}

export function PostCard({ post, disabled = false }: PostCardProps) {
  return (
    <Link
      to="/posts/$postid"
      params={{ postid: post.id }}
      className="border border-gray-500 bg-elevated p-4 w-full flex items-center justify-between gap-x-3 rounded-xl hover:brightness-90"
      disabled={disabled}
    >
      <div className="flex flex-col gap-y-1">
        <div className="text-lg font-bold line-clamp-3">
          {post.title} <span>{post.category}</span>
        </div>
        <div className="italic text-sm">{post.createdAt.toLocaleString()}</div>
      </div>

      <DeletePostButton postId={post.id}>
        <TrashIcon />
      </DeletePostButton>
    </Link>
  );
}
