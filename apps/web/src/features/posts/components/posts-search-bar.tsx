import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Input } from '@repo/ui/components/input';
import type { PostsSearchParams } from '@/routes/_protected/posts/-validations/posts-link-options';
import { usePostsSearch } from '../hooks/use-posts-search';

type PostsSearchBarProps = {
  currentSearch: PostsSearchParams;
};

export const PostsSearchBar = ({ currentSearch }: PostsSearchBarProps) => {
  const { updateSearch } = usePostsSearch(currentSearch);

  return (
    <div className="relative sm:max-w-64 w-full">
      <Input
        value={currentSearch.searchString}
        onChange={(e) => updateSearch('searchString', e.target.value)}
        placeholder="Search by title..."
        className="w-full pr-10 placeholder:italic peer"
      />
      <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-input peer-focus:text-foreground transition-colors" />
    </div>
  );
};
