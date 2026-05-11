import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = () => {
  const location = useLocation();
  
  // Determine role from path
  const getRole = () => {
    if (location.pathname.startsWith('/admin')) return 'admin';
    if (location.pathname.startsWith('/super-admin')) return 'super-admin';
    if (location.pathname.startsWith('/staff')) return 'staff';
    if (location.pathname.startsWith('/csr')) return 'csr';
    return 'user'; // Default
  };

  const role = getRole();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar role={role} />
      
      <div className="flex-grow ml-64 min-h-screen flex flex-col">
        <Header role={role} />
        
        <main className="p-8 flex-grow">
          <div className="max-w-[1600px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
