import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { useState } from 'react';

type PasswordInputProps = {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  error?: string;
  required?: boolean;
};

export const PasswordInput = ({
  id,
  name,
  label = 'Password',
  placeholder = 'Enter your password',
  value,
  onChange,
  onBlur,
  className,
  error,
  required = false,
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={className}>
      {label && (
        <Label htmlFor={id || name}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <div className="relative mt-1">
        <Input
          id={id || name}
          name={name}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`pr-10 ${error ? 'border-red-500' : ''}`}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full"
          onClick={toggleVisibility}
          tabIndex={-1}
        >
          {isVisible ? (
            <EyeOpenIcon className="h-4 w-4" />
          ) : (
            <EyeNoneIcon className="h-4 w-4" />
          )}
        </Button>
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
