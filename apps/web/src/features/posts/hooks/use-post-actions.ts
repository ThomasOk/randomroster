import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { trpc } from '@/router';

export function usePostActions() {
  const getAllPostsQuery = useQuery(trpc.posts.all.queryOptions());

  const deletePostMutation = useMutation(
    trpc.posts.delete.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await getAllPostsQuery.refetch();
        toast.info('Post deleted successfully.');
      },
    }),
  );

  const createPostMutation = useMutation(
    trpc.posts.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await getAllPostsQuery.refetch();
        toast.success('Your post has been created!');
      },
    }),
  );

  return {
    posts: getAllPostsQuery.data,
    isLoadingPosts: getAllPostsQuery.isPending,

    refetchPosts: getAllPostsQuery.refetch,

    deletePost: deletePostMutation.mutate,
    isDeletingPost: deletePostMutation.isPending,

    createPost: createPostMutation.mutateAsync,
    isCreatingPost: createPostMutation.isPending,
  };
}
