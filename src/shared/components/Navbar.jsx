import React from 'react';
import { Bell, Search, User, LogOut, Settings, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../app/store/useAuthStore';
import { toast } from 'react-hot-toast';
import { cn } from '../utils/cn';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    toast.success('Logged out securely', {
      style: { borderRadius: '12px', background: '#333', color: '#fff' }
    });
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200 h-16 flex items-center px-6 justify-between">
      {/* Left side: Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full bg-slate-50 border-0 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-500/10 focus:bg-white transition-all outline-none text-slate-600"
          />
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors group">
          <Bell className="w-5 h-5 group-hover:text-primary-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative group/user">
          <button className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 font-bold uppercase">
              {user?.name ? user.name.substring(0, 2) : 'JS'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-slate-700 leading-tight">{user?.name || 'John Smith'}</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{user?.role || 'Super Administrator'}</p>
            </div>
          </button>
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-200 transform origin-top-right z-50">
            <div className="px-4 py-2 border-b border-slate-50 mb-1">
              <p className="text-sm font-semibold text-slate-800">{user?.name || 'John Smith'}</p>
              <p className="text-xs text-slate-500">{user?.email || 'john.smith@distrom.com'}</p>
            </div>
            <button onClick={() => navigate('/profile')} className="w-full flex items-center px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-colors">
              <User className="w-4 h-4 mr-3" /> Profile
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-colors">
              <Settings className="w-4 h-4 mr-3" /> Settings
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-colors">
              <HelpCircle className="w-4 h-4 mr-3" /> Support
            </button>
            <div className="border-t border-slate-50 my-1"></div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" /> Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
