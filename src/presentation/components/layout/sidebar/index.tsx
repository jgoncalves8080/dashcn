'use client'

import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export const Sidebar = ({
  isSidebarOpen,
  pathname
}: {
  isSidebarOpen: boolean
  pathname: string
}) => {
  const t = useTranslations() 

  const menuItems = [
    { name: 'Página Inicial', path: '/' },
    { name: 'Projetos', path: '/projects' }
  ]

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-20 w-64 bg-white dark:bg-gray-800 shadow-md transform',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 transition-transform duration-200 ease-in-out'
      )}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          {t('sidebar.manager')}
        </h2>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={cn(
                  'block py-2.5 px-4 rounded transition duration-200',
                  pathname === item.path ||
                    (item.path === '/projects' && pathname.startsWith('/projects'))
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 text-gray-700 dark:text-gray-200'
                )}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
