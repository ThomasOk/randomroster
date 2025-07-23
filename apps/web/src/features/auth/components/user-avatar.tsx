import { ExitIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { useTheme } from 'next-themes';
import { useAuth } from '../hooks/use-auth';

type UserAvatarProps = {
  className?: string;
  showDropdown?: boolean;
  onLogout?: () => void;
};

export const UserAvatar = ({
  className = 'cursor-pointer w-8.5 h-8.5',
  showDropdown = true,
  onLogout,
}: UserAvatarProps) => {
  const { user, logout } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    onLogout?.();
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const avatarContent = (
    <Avatar className={className}>
      <AvatarImage referrerPolicy="no-referrer" src={user.image ?? ''} />
      <AvatarFallback className="text-sm">
        {(user.name?.split(' ')[0]?.[0] || '') +
          (user.name?.split(' ')[1]?.[0] || '')}
      </AvatarFallback>
    </Avatar>
  );

  if (!showDropdown) {
    return avatarContent;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{avatarContent}</DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <div className="flex flex-col p-2 max-w-full break-words whitespace-break-spaces">
          <span className="text-sm font-bold line-clamp-2">{user.name}</span>
          <span className="text-xs italic mt-1 line-clamp-2">{user.email}</span>
        </div>

        <hr className="mb-2" />

        <DropdownMenuItem className="cursor-pointer" onClick={toggleTheme}>
          {resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
          <span className="ml-[5px] capitalize">Theme</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <ExitIcon className="mr-[5px] w-5 ml-[0.5px]" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
