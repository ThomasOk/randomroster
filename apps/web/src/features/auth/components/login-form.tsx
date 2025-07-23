import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { useForm } from '@tanstack/react-form';
import * as v from 'valibot';

import { useAuth } from '../hooks/use-auth';
import { PasswordInput } from './password-input';
import FormFieldInfo from '@/components/ui/form-field-info';
import Spinner from '@/components/ui/spinner';

const LoginFormSchema = v.object({
  email: v.pipe(v.string(), v.email('Please enter a valid email address')),
  password: v.pipe(
    v.string(),
    v.minLength(8, 'Password must be at least 8 characters'),
  ),
});

type LoginFormProps = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
};

export const LoginForm = ({
  onSuccess,
  onError,
  className,
}: LoginFormProps) => {
  const { login, isLoading } = useAuth();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: LoginFormSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await login({
        email: value.email,
        password: value.password,
      });

      if (result.success) {
        onSuccess?.();
      } else {
        onError?.(result.error || 'Login failed');
      }
    },
  });

  return (
    <form
      className={`flex flex-col gap-y-4 ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div>
        <form.Field
          name="email"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Email</Label>
              <Input
                className="mt-1"
                id={field.name}
                type="email"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your email"
              />
              <FormFieldInfo field={field} />
            </>
          )}
        />
      </div>

      <div>
        <form.Field
          name="password"
          children={(field) => (
            <>
              <PasswordInput
                id={field.name}
                name={field.name}
                label="Password"
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                placeholder="Enter your password"
                error={
                  field.state.meta.isTouched && field.state.meta.errors.length
                    ? field.state.meta.errors[0]?.message
                    : undefined
                }
              />
            </>
          )}
        />
      </div>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isLoading}
            className="h-12 mt-2"
          >
            {isSubmitting || isLoading ? <Spinner /> : 'Log in'}
          </Button>
        )}
      />
    </form>
  );
};
