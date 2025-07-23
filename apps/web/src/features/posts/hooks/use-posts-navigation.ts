import { useNavigate } from '@tanstack/react-router';
import {
  postsSearchDefaults,
  type PostsSearchParams,
} from '@/routes/_protected/posts/-validations/posts-link-options';

export const usePostsNavigation = () => {
  const navigate = useNavigate();

  const goToPostsList = (searchParams?: Partial<PostsSearchParams>) => {
    navigate({
      to: '/posts',
      search: { ...postsSearchDefaults, ...searchParams },
    });
  };

  const updateSearch = (name: keyof PostsSearchParams, value: unknown) => {
    navigate({
      from: '/posts',
      search: (prev) => ({ ...prev, [name]: value }),
    });
  };

  return {
    goToPostsList,
    updateSearch,
    defaultSearch: postsSearchDefaults,
  };
};
