"use client";
import { useState } from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';

interface LayoutProps {
  children: React.ReactNode;
}


export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  return (
    <div className="h-screen flex bg-dark-5">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto bg-dark-5 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}