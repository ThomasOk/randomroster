import { usePostsNavigation } from './use-posts-navigation';
import { type PostsSearchParams } from '@/routes/_protected/posts/-validations/posts-link-options';

export const usePostsSearch = (currentSearch: PostsSearchParams) => {
  const { updateSearch } = usePostsNavigation();

  const filterPosts = <T extends { title: string; createdAt: Date }>(
    posts: T[],
  ) => {
    if (!posts?.length) return [];

    const lowercaseSearch = currentSearch.searchString.toLowerCase();

    return posts
      .filter((post) => post.title.toLowerCase().includes(lowercaseSearch))
      .sort((a, b) => {
        const timeA = a.createdAt.getTime();
        const timeB = b.createdAt.getTime();
        return currentSearch.sortDirection === 'asc'
          ? timeA - timeB
          : timeB - timeA;
      });
  };

  return {
    updateSearch,
    filterPosts,
    currentSearch,
  };
};
