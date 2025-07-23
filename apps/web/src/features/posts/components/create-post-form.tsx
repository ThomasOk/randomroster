import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { Textarea } from '@repo/ui/components/textarea';
import { useForm } from '@tanstack/react-form';
import * as v from 'valibot';

import { useCreatePost } from '../hooks/use-create-post';
import FormFieldInfo from '@/components/ui/form-field-info';
import Spinner from '@/components/ui/spinner';

const FormSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(3, 'Please enter at least 3 characters'),
  ),
  content: v.pipe(
    v.string(),
    v.minLength(5, 'Please enter at least 5 characters'),
  ),
  category: v.pipe(
    v.string(),
    v.minLength(3, 'Please enter at least 3 characters'),
  ),
});

type CreatePostFormProps = {
  onSuccess?: () => void;
};

export const CreatePostForm = ({ onSuccess }: CreatePostFormProps) => {
  const { createPost, isCreating } = useCreatePost();

  const form = useForm({
    defaultValues: {
      title: '',
      content: '',
      category: '',
    },
    validators: {
      onChange: FormSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await createPost({
          title: value.title,
          content: value.content,
          category: value.category,
        });
        formApi.reset();
        onSuccess?.();
      } catch (error) {
        // error handled with hook
        console.error('Error creating post:', error);
      }
    },
  });
  return (
    <form
      className="flex flex-col gap-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div>
        <form.Field
          name="title"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                className="mt-2"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FormFieldInfo field={field} />
            </>
          )}
        />
      </div>

      <div>
        <form.Field
          name="content"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Content</Label>
              <Textarea
                className="mt-2"
                rows={8}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FormFieldInfo field={field} />
            </>
          )}
        />
      </div>

      <div>
        <form.Field
          name="category"
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name}>Category</Label>
                <Input
                  className="mt-2"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FormFieldInfo field={field} />
              </>
            );
          }}
        />
      </div>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isCreating}
            className="mt-3 h-10 w-24"
          >
            {isSubmitting || isCreating ? <Spinner /> : 'Create'}
          </Button>
        )}
      />
    </form>
  );
};
