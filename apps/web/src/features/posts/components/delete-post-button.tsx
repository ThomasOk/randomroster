// apps/web/src/features/posts/components/DeletePostButton.tsx (version simplifiée)
import { Button } from '@repo/ui/components/button';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/ui/components/tooltip';
import { cn } from '@repo/ui/lib/utils';
import type { ReactNode } from 'react';

import { usePostActions } from '../hooks/use-post-actions';
import { Spinner } from '@/components/ui/spinner';

interface DeletePostButtonProps {
  children: ReactNode;
  className?: string;
  postId: string;
}

export function DeletePostButton({
  children,
  className,
  postId,
}: DeletePostButtonProps) {
  const { deletePost, isDeletingPost } = usePostActions();

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={isDeletingPost}
            onClick={(e) => {
              e.preventDefault();
              deletePost({ id: postId });
            }}
            variant="destructive"
            className={cn('h-9 w-10', className)}
          >
            {isDeletingPost ? <Spinner /> : children}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          align="center"
          sideOffset={4}
          className="bg-neutral-500 fill-neutral-500 duration-0"
        >
          <span>Delete Post</span>
          <TooltipArrow width={15} height={10} className="duration-0" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
