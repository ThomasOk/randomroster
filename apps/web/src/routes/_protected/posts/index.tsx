import { createFileRoute } from '@tanstack/react-router';

import { postsSearchSchema } from './-validations/posts-link-options';
import { CreatePostDialog } from '@/features/posts/components/create-post-dialog';
import { PostCard } from '@/features/posts/components/post-card';
import { PostsSearchBar } from '@/features/posts/components/posts-search-bar';
import { PostsSortButton } from '@/features/posts/components/posts-sort-button';
import { usePostActions } from '@/features/posts/hooks/use-post-actions';
import { usePostsSearch } from '@/features/posts/hooks/use-posts-search';

export const Route = createFileRoute('/_protected/posts/')({
  validateSearch: postsSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { posts, isLoadingPosts } = usePostActions();
  const search = Route.useSearch();
  const { filterPosts } = usePostsSearch(search);

  const filteredPosts = filterPosts(posts || []);

  return (
    <div className="flex flex-col md:p-4 w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Posts</h1>
        <CreatePostDialog />
      </div>

      <div className="mt-4 flex justify-end items-center gap-x-2">
        <PostsSortButton currentSearch={search} />
        <PostsSearchBar currentSearch={search} />
      </div>

      <div className="flex gap-3 flex-wrap mt-6">
        {filteredPosts.length
          ? filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} disabled={isLoadingPosts} />
            ))
          : 'No posts found.'}
      </div>
    </div>
  );
}
