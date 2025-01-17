'use client';

import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { Header } from './header';
import { Sidebar } from './sidebar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar isSidebarOpen={isSidebarOpen} pathname={pathname} />

      {isSidebarOpen && (
        <div className="fixed inset-0 z-10 bg-black opacity-50 md:hidden" onClick={toggleSidebar} />
      )}

      <div className="flex-1 flex flex-col md:ml-64">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  );
};
