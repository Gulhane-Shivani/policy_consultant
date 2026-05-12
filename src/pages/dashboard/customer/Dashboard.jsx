import { useState } from 'react';
import { 
  Shield, CreditCard, PieChart, 
  ChevronRight, Download, MessageSquare, 
  ShieldAlert, Zap, Bell
} from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerOverview = () => {
  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : { full_name: 'User' };
  });

  const stats = [
    { label: 'Total Policies', value: '3', icon: Shield, color: 'blue' },
    { label: 'Sum Assured', value: '₹1.5 Cr', icon: PieChart, color: 'emerald' },
    { label: 'Next Premium', value: '₹4,200', icon: CreditCard, color: 'amber' },
  ];

  const policies = [
    { 
      id: 1, 
      name: 'Care Supreme Discounted', 
      provider: 'Care Health', 
      domain: 'careinsurance.com',
      type: 'Health Insurance', 
      premium: '615', 
      status: 'Active',
      color: 'emerald'
    },
    { 
      id: 2, 
      name: 'Term Smart Guard', 
      provider: 'HDFC Life', 
      domain: 'hdfclife.com',
      type: 'Life Insurance', 
      premium: '1200', 
      status: 'Renewal Due',
      color: 'blue'
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">
          Welcome back, {user?.full_name?.split(' ')[0]}!
        </h1>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
          Your insurance portfolio is 75% optimized
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all"
          >
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
            </div>
            <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-7 h-7" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Active Policies Preview */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Your Active Portfolio</h2>
            <button className="text-emerald-600 font-bold text-xs hover:underline uppercase tracking-widest">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policies.map((policy) => (
              <motion.div
                key={policy.id}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 relative overflow-hidden group"
              >
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-50 p-2 flex items-center justify-center shadow-sm">
                    <img src={`https://www.google.com/s2/favicons?sz=64&domain=${policy.domain}`} alt="" className="w-10 h-10 object-contain" />
                  </div>
                  <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-lg ${policy.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {policy.status}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-black text-slate-900 leading-tight uppercase">{policy.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{policy.type}</p>
                </div>
                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Annual Premium</p>
                    <p className="text-2xl font-black text-slate-900">₹{policy.premium}</p>
                  </div>
                  <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${policy.color}-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform`} />
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8 px-2">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Pay Premium', icon: CreditCard, color: 'emerald' },
                { label: 'File Claim', icon: ShieldAlert, color: 'rose' },
                { label: 'Download ID', icon: Download, color: 'blue' },
                { label: 'Get Support', icon: MessageSquare, color: 'amber' },
              ].map((action, i) => (
                <button key={i} className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-slate-50 border border-transparent hover:border-emerald-200 hover:bg-white transition-all group">
                  <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-${action.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter text-center">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Alerts & Notifications */}
        <div className="space-y-8">
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-8 relative overflow-hidden shadow-2xl shadow-emerald-900/20">
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
              <Zap className="w-7 h-7 text-emerald-400" />
            </div>
            <div className="space-y-3 relative z-10">
              <h3 className="text-2xl font-black tracking-tight leading-tight">Policy Health</h3>
              <p className="text-slate-400 text-[10px] font-bold leading-relaxed uppercase tracking-widest">Score: 75% - Healthy</p>
            </div>
            <div className="relative z-10">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-emerald-500 w-[75%]" />
              </div>
              <p className="text-slate-400 text-[10px] font-bold leading-relaxed">Upgrade your health plan to include OPD for a 100% score.</p>
            </div>
            <button className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all relative z-10 shadow-xl shadow-emerald-900/40">
              Improve Score
            </button>
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full -mr-24 -mt-24 blur-3xl" />
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center space-x-2 px-2">
              <Bell className="w-5 h-5 text-emerald-600" />
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Notifications</h3>
            </div>
            <div className="space-y-6">
              {[
                { title: 'Payment Confirmed', time: '2h ago', text: 'Premium for POL-8901 was successfully paid.', icon: CreditCard, color: 'emerald' },
                { title: 'Claim Update', time: '1d ago', text: 'Your claim CLM-105 is now under review.', icon: ShieldAlert, color: 'amber' },
              ].map((notif, i) => (
                <div key={i} className="flex space-x-4 group cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl bg-${notif.color}-50 flex-shrink-0 flex items-center justify-center text-${notif.color}-600`}>
                    <notif.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs font-black text-slate-900 uppercase">{notif.title}</p>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">{notif.time}</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 leading-snug">{notif.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;
