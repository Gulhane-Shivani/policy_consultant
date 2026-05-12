import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Header = ({ role }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getRoleLabel = () => {
    switch (role) {
      case 'admin': return 'Operations Manager';
      case 'super_admin': return 'Super Administrator';
      case 'staff':
      case 'csr': return 'Customer Service Representative';
      case 'agent': return 'Insurance Agent';
      default: return 'User';
    }
  };

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { full_name: 'User', role: 'user' };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex-grow max-w-2xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
          <input 
            type="text" 
            placeholder={role === 'user' ? "Search for policies or support..." : "Search for policies, customers, or transactions..."}
            className="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-medium text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <Link 
          to="/"
          className="p-2.5 bg-slate-100 rounded-xl text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all group"
          title="Back to Website"
        >
          <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </Link>

        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-3 p-1.5 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all"
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black">
              {user.full_name?.charAt(0) || 'U'}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-black text-slate-900 leading-tight">{user.full_name || 'User'}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{getRoleLabel()}</p>
            </div>
           
          </button>

        
        </div>
      </div>
    </header>
  );
};

export default Header;
