'use client';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback, AvatarImage } from '@/presentation/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/presentation/components/ui/dropdown-menu';
import { useTheme } from '@/presentation/contexts/ThemeProvider';

export const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-30">
      <div className="flex justify-between items-center px-6 py-4">
        <button className="md:hidden text-gray-700 dark:text-gray-200" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>

        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {t('header.welcome')}
        </h1>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar>
                  <AvatarImage
                    src="/avatar.jpg"
                    alt={t('header.avatarAlt')}
                    className="border-2 border-gray-200 dark:border-gray-600 rounded-full"
                  />
                  <AvatarFallback className="border-2 border-gray-200 dark:border-gray-600 rounded-full">
                    J
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => console.log(t('header.profile'))}>
                {t('header.profile')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log(t('header.logout'))}>
                {t('header.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label={t('header.toggleTheme')}
          >
            {theme === 'dark' ? (
              <span className="text-yellow-400">🌙</span>
            ) : (
              <span className="text-blue-500">☀️</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
