import { useMutation } from '@tanstack/react-query';
import { TRPCClientError } from '@trpc/client';
import { toast } from 'sonner';
import { usePostActions } from './use-post-actions';
import { trpc } from '@/router';

export const useCreatePost = () => {
  const { refetchPosts } = usePostActions();

  const createPostMutation = useMutation(
    trpc.posts.create.mutationOptions({
      onSuccess: async () => {
        await refetchPosts();
        toast.success('Your post has been created!');
      },
      onError: (error) => {
        if (error instanceof TRPCClientError) {
          toast.error(error.message);
        } else {
          toast.error('An unknown error has occurred. Please try again!');
        }
      },
    }),
  );

  return {
    createPost: createPostMutation.mutateAsync,
    isCreating: createPostMutation.isPending,
    error: createPostMutation.error,
  };
};
