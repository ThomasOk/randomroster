import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import { useState } from 'react';

import { CreatePostForm } from './create-post-form';

export const CreatePostDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Create
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[90vw] xl:max-w-screen-lg data-[state=open]:slide-in-from-right-1/3 data-[state=closed]:slide-out-to-right-1/3">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Write about an interesting topic!
          </DialogDescription>
        </DialogHeader>

        <CreatePostForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
