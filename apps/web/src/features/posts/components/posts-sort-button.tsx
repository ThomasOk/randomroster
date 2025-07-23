import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
} from '@repo/ui/components/tooltip';
import type { PostsSearchParams } from '@/routes/_protected/posts/-validations/posts-link-options';
import { usePostsSearch } from '../hooks/use-posts-search';

type PostsSortButtonProps = {
  currentSearch: PostsSearchParams;
};

export const PostsSortButton = ({ currentSearch }: PostsSortButtonProps) => {
  const { updateSearch } = usePostsSearch(currentSearch);

  const toggleSort = () => {
    updateSearch(
      'sortDirection',
      currentSearch.sortDirection === 'asc' ? 'desc' : 'asc',
    );
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild onClick={(e) => e.preventDefault()}>
          <Button
            variant="link"
            className="w-12 border border-input hover:brightness-150"
            onClick={toggleSort}
          >
            {currentSearch.sortDirection === 'asc' ? (
              <ArrowUpIcon />
            ) : (
              <ArrowDownIcon />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          sideOffset={4}
          className="bg-neutral-500 fill-neutral-500 duration-0"
        >
          <span>Sort by created date ({currentSearch.sortDirection})</span>
          <TooltipArrow width={15} height={10} className="duration-0" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
