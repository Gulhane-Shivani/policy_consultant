import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, User, LogOut, Settings, ChevronDown, Bell } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Header = ({ role }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Premium Due', text: 'Renewal for Care Supreme is due in 15 days.', time: 'Just now', type: 'warning' },
    { id: 2, title: 'Claim Approved', text: 'Your claim CLM-105 for ₹45,000 was approved.', time: '2 hours ago', type: 'success' },
    { id: 3, title: 'System Update', text: 'New features added to your document vault.', time: '1 day ago', type: 'info' },
  ];

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
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`p-2.5 rounded-xl transition-all group relative ${isNotificationsOpen ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'}`}
          >
            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white shadow-sm"></span>
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute right-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50"
              >
                <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Notifications</h4>
                  <button className="text-[8px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Mark all read</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-1">
                        <p className={`text-[10px] font-black uppercase tracking-tight ${n.type === 'warning' ? 'text-amber-600' : n.type === 'success' ? 'text-emerald-600' : 'text-blue-600'}`}>{n.title}</p>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{n.time}</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 leading-snug group-hover:text-slate-900 transition-colors">{n.text}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-100 hover:text-slate-600 transition-all border-t border-slate-100">
                  View All Notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
