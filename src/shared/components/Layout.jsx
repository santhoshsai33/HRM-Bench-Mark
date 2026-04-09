import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { cn } from '../utils/cn';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className={cn("flex-grow p-4 md:p-6 lg:p-8")}>
          <div className="w-full h-full space-y-6">
            <Outlet />
          </div>
        </main>
        
        <footer className="p-4 text-center text-slate-400 text-sm border-t border-slate-200">
          © {new Date().getFullYear()} DISTROM HRM. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Layout;
