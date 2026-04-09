import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../app/store/useAuthStore';
import { LayoutDashboard, Users, Briefcase, FileText, Layers, Send, Calendar, CheckCircle, BarChart3, Bell, Settings, ShieldCheck, Building2, Lock, Menu, ChevronLeft } from 'lucide-react';
import { cn } from '../utils/cn';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const user = useAuthStore(state => state.user);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Companies', icon: Building2, path: '/companies' },
    { name: 'Bench Resources', icon: Users, path: '/resources' },
    { name: 'Requirements', icon: Briefcase, path: '/requirements' },
    { name: 'Clients', icon: Building2, path: '/clients' },
    { name: 'Vendors', icon: Send, path: '/vendors' },
    { name: 'Matching', icon: Layers, path: '/matching' },
    { name: 'Submissions', icon: FileText, path: '/submissions' },
    { name: 'Interviews', icon: Calendar, path: '/interviews' },
    { name: 'Offers', icon: CheckCircle, path: '/offers' },
    { name: 'Placements', icon: Briefcase, path: '/placements' },
    { name: 'Reports', icon: BarChart3, path: '/reports' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
    { name: 'User Management', icon: ShieldCheck, path: '/users' },
    { name: 'Role Management', icon: Lock, path: '/roles' },
    { name: 'Audit Logs', icon: Settings, path: '/audit' },
  ];

  let allowedMenus = [];
  if (user?.role === 'super_admin') {
    allowedMenus = ['Dashboard', 'Companies',];
  } else if (user?.role === 'admin') {
    allowedMenus = ['Dashboard', 'Bench Resources', 'Requirements', 'Clients', 'Vendors', 'Matching', 'Submissions', 'Interviews', 'Offers', 'Placements', 'Notifications', 'User Management', 'Reports'];
  } else if (user?.role === 'hr_recruiter') {
    allowedMenus = ['Dashboard', 'Bench Resources', 'Requirements', 'Matching', 'Submissions', 'Interviews', 'Offers', 'Placements', 'Notifications'];
  } else if (user?.role === 'resource') {
    allowedMenus = ['Dashboard', 'Interviews', 'Submissions', 'Offers'];
  } else if (user?.role === 'vendor') {
    allowedMenus = ['Dashboard', 'Requirements', 'Bench Resources', 'Submissions'];
  } else if (user?.role === 'client') {
    allowedMenus = ['Dashboard', 'Requirements', 'Interviews', 'Offers'];
  }

  const filteredMenuItems = menuItems.filter(item => allowedMenus.includes(item.name));

  return (
    <aside className={cn(
      "relative h-screen bg-white transition-all duration-300 ease-in-out border-r border-slate-200 z-50 flex flex-col",
      isOpen ? "w-64" : "w-20"
    )}>
      {/* Sidebar Header */}
      <div className="flex flex-col px-6 py-4 mb-4 border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h1 className={cn("text-xl font-black text-primary-600 transition-opacity", !isOpen && "opacity-0 w-0 overflow-hidden")}>
            DISTROM
          </h1>
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-md bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
            <ChevronLeft className={cn("w-5 h-5 transition-transform duration-300", !isOpen && "rotate-180")} />
          </button>
        </div>

        {isOpen && user && (
          <div className="mt-4 animate-in fade-in duration-500">
            <span className="bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1 rounded-md inline-block max-w-full truncate">
              {user.company || 'DISTROM System'}
            </span>
          </div>
        )}
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex flex-col space-y-1 px-3 overflow-y-auto custom-scrollbar flex-grow pb-4">
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center px-3 py-2.5 rounded-lg transition-colors group relative",
              isActive
                ? "bg-primary-50 text-primary-600 shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            {(() => {
              const ItemIcon = item.icon;
              return <ItemIcon className={cn("w-5 h-5 min-w-[20px]")} />;
            })()}
            <span className={cn(
              "ml-3 font-medium transition-all duration-300",
              !isOpen && "opacity-0 w-0 overflow-hidden"
            )}>
              {item.name}
            </span>
            {!isOpen && (
              <div className="absolute left-14 bg-slate-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {item.name}
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
