import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, User, LogOut, ShieldAlert, ChevronDown, LayoutDashboard, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    
    if (storedUser && storedUser !== 'undefined' && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    setIsProfileOpen(false);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'All Plans', path: '/plans' },
    { name: 'Life', path: '/life' },
    { name: 'Health', path: '/health' },
    { name: 'Car', path: '/car' },
    { name: 'Business', path: '/business' },
    { name: 'Support', path: '/support' },
  ];

  const getDashboardPath = (role) => {
    switch (role) {
      case 'super_admin': return '/super-admin';
      case 'admin': return '/admin';
      case 'agent': return '/agent';
      case 'csr': return '/csr';
      default: return '/dashboard';
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-emerald-600 p-2 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-800">
              Policy Consultant
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-emerald-600 whitespace-nowrap ${
                  location.pathname === link.path ? 'text-emerald-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-1.5 pr-3 rounded-full hover:bg-white/50 hover:shadow-sm transition-all border border-transparent hover:border-slate-200"
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-white overflow-hidden">
                    {user.profile_photo ? (
                      <img src={user.profile_photo} alt={user.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=059669&color=fff`} 
                        alt={user.full_name} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-bold text-slate-800 leading-tight">{user.full_name?.split(' ')[0]}</span>
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tight">{user.role?.replace('_', ' ')}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-50 overflow-hidden"
                      >
                        <div className="flex items-center space-x-4 p-2 mb-4">
                           <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 text-xl font-bold overflow-hidden">
                             {user.profile_photo ? (
                               <img src={user.profile_photo} alt={user.full_name} className="w-full h-full object-cover" />
                             ) : (
                               <img 
                                 src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=ecfdf5&color=059669&bold=true`} 
                                 alt={user.full_name} 
                                 className="w-full h-full object-cover"
                               />
                             )}
                           </div>
                           <div className="flex flex-col">
                             <span className="font-bold text-slate-900 line-clamp-1">{user.full_name}</span>
                             <span className="text-xs text-slate-500 line-clamp-1">{user.email}</span>
                           </div>
                        </div>
                        
                        <div className="h-px bg-slate-50 mb-2" />
                        
                        <div className="space-y-1">
                          <Link 
                            to={getDashboardPath(user.role)}
                            className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors group"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <LayoutDashboard className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
                            <span className="font-semibold text-sm">Dashboard</span>
                          </Link>
                          <Link 
                            to={user.role === 'user' ? '/dashboard/profile' : '#'}
                            className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors group"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <Settings className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
                            <span className="font-semibold text-sm">Profile Settings</span>
                          </Link>
                        </div>
                        
                        <div className="h-px bg-slate-50 my-2" />
                        
                        <button 
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full p-3 rounded-2xl hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors group"
                        >
                          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
                          <span className="font-semibold text-sm">Sign Out</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-emerald-600 px-4 py-2 whitespace-nowrap">Sign In</Link>
                <Link to="/register" className="btn-primary py-2 px-6 rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 whitespace-nowrap">Get Started</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white border-t border-slate-100 absolute w-full shadow-2xl z-40 overflow-hidden rounded-b-[2rem]"
          >
            <div className="flex flex-col p-6 space-y-4">
              {user && (
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-3xl mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-bold overflow-hidden">
                    {user.profile_photo ? (
                      <img src={user.profile_photo} alt={user.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=059669&color=fff`} 
                        alt={user.full_name} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{user.full_name}</span>
                    <span className="text-xs text-slate-500 uppercase font-semibold">{user.role?.replace('_', ' ')}</span>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-base font-bold px-4 py-2 rounded-xl transition-colors ${
                    location.pathname === link.path ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-50 space-y-3">
                {user ? (
                  <>
                    <Link
                      to={getDashboardPath(user.role)}
                      className="btn-primary flex items-center justify-center space-x-2 w-full py-4 rounded-2xl text-lg font-bold"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Workspace Dashboard</span>
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="flex items-center justify-center space-x-2 w-full py-4 text-lg text-red-500 font-bold border border-red-100 rounded-2xl hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      to="/login"
                      className="flex items-center justify-center py-4 text-lg font-bold text-slate-600 border border-slate-100 rounded-2xl hover:bg-slate-50"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="btn-primary flex items-center justify-center py-4 text-lg font-bold rounded-2xl"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

