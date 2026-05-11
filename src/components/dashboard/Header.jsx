import React, { useState } from 'react';
import { Search, Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Header = ({ role }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getRoleLabel = () => {
    switch (role) {
      case 'admin': return 'Operations Manager';
      case 'super-admin': return 'Super Administrator';
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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search for policies, customers, or transactions..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative p-2.5 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
        </button>

        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-3 p-1.5 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black">
              {user.full_name?.charAt(0) || 'U'}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-black text-slate-900 leading-tight">{user.full_name || 'User'}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{getRoleLabel()}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-indigo-900/10 p-2 z-50"
              >
                <div className="p-3 border-b border-slate-100 mb-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account Settings</p>
                </div>
                <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-bold text-sm">
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-bold text-sm">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <div className="my-2 border-t border-slate-100"></div>
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
