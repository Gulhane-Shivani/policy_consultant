import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, CreditCard, PieChart, 
  ChevronRight, Download, MessageSquare, 
  ShieldAlert, Zap, Bell, ShieldCheck, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomerOverview = () => {
  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : { full_name: 'User' };
  });

  const [showHealthScore, setShowHealthScore] = useState(false);

  // Status Validation Helper
  const getValidatedStatus = (p) => {
    const now = new Date();
    const end = new Date(p.end_date);
    const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays <= 30) return 'Renewal Due';
    return 'Active';
  };

  const initialPolicies = [
    { 
      id: 1, 
      client_name: 'Shivani Ashok Gulhane',
      name: 'Care Supreme Discounted', 
      provider: 'Care Health', 
      domain: 'careinsurance.com',
      type: 'Health Insurance', 
      premium: '615', 
      coverage: '5 Lakh',
      status: 'Active',
      end_date: '2025-05-20',
      color: 'emerald'
    },
    { 
      id: 2, 
      client_name: 'Shivani Ashok Gulhane',
      name: 'Term Smart Guard', 
      provider: 'HDFC Life', 
      domain: 'hdfclife.com',
      type: 'Life Insurance', 
      premium: '1200', 
      coverage: '1 Crore',
      status: 'Renewal Due',
      end_date: '2024-06-15',
      color: 'blue'
    },
  ];

  const [policies] = useState(() => {
    const bought = JSON.parse(localStorage.getItem('bought_policies') || '[]');
    // Transform bought policies to match dashboard format
    const formattedBought = bought.map(p => ({
      id: p.id,
      client_name: p.client_name,
      name: p.type.split(' Insurance')[0] + ' Protection',
      provider: p.provider,
      domain: p.domain,
      type: p.type,
      premium: p.premium,
      status: getValidatedStatus(p),
      end_date: p.end_date,
      color: p.type.includes('Health') ? 'emerald' : p.type.includes('Life') ? 'blue' : 'amber'
    }));
    
    const allPolicies = [...formattedBought, ...initialPolicies];
    
    // Strict filtering: Only show policies belonging to the logged-in user
    return allPolicies.filter(p => p.client_name === user.full_name);
  });

  const calculateSumAssured = (policyList) => {
    let total = 0;
    policyList.forEach(p => {
      const cov = p.coverage || '0';
      if (cov.includes('Lakh')) total += parseFloat(cov) * 100000;
      else if (cov.includes('Cr')) total += parseFloat(cov) * 10000000;
      else if (cov.includes('IDV')) total += parseFloat(cov.split(' ')[1]) * 100000;
    });
    if (total >= 10000000) return `₹${(total / 10000000).toFixed(1)} Cr`;
    if (total >= 100000) return `₹${(total / 100000).toFixed(1)} Lakh`;
    return `₹${total.toLocaleString()}`;
  };

  const stats = [
    { label: 'Total Policies', value: policies.length.toString(), icon: Shield, color: 'blue' },
    { label: 'Sum Assured', value: calculateSumAssured(policies), icon: PieChart, color: 'emerald' },
    { label: 'Next Premium', value: `₹${policies.reduce((acc, curr) => acc + parseInt(curr.premium || 0), 0).toLocaleString()}`, icon: CreditCard, color: 'amber' },
    { label: 'Pending Claims', value: '0', icon: ShieldAlert, color: 'rose' },
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all"
          >
            <div>
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-xl md:text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
            </div>
            <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-5 h-5 md:w-7 md:h-7" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Active Policies Preview */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Your Active Portfolio</h2>
            <Link to="/dashboard/policies" className="text-emerald-600 font-bold text-xs hover:underline uppercase tracking-widest">View All</Link>
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
                  <Link to={`/dashboard/policies/${policy.id}`} className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                    <ChevronRight className="w-6 h-6" />
                  </Link>
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
                { label: 'Pay Premium', icon: CreditCard, color: 'emerald', path: '/dashboard/payments' },
                { label: 'File Claim', icon: ShieldAlert, color: 'rose', path: '/dashboard/claims' },
                { label: 'Download ID', icon: Download, color: 'blue', path: '/dashboard/policies' },
                { label: 'Get Support', icon: MessageSquare, color: 'amber', path: '/dashboard/support' },
              ].map((action, i) => (
                <Link key={i} to={action.path} className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-slate-50 border border-transparent hover:border-emerald-200 hover:bg-white transition-all group">
                  <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-${action.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter text-center">{action.label}</span>
                </Link>
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
            <button 
              onClick={() => setShowHealthScore(true)}
              className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all relative z-10 shadow-xl shadow-emerald-900/40"
            >
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
      <AnimatePresence>
        {showHealthScore && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHealthScore(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-emerald-600 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight">Portfolio Health</h3>
                    <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest">Analysis Report</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowHealthScore(false)}
                  className="p-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-10 space-y-8">
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                      <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={351.8} strokeDashoffset={351.8 * 0.25} className="text-emerald-500" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-black text-slate-900">75%</span>
                    </div>
                  </div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Healthy Portfolio</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Coverage Gap Analysis</h4>
                  {[
                    { label: 'Health Insurance', status: 'Optimal', color: 'emerald' },
                    { label: 'Life Insurance', status: 'Critical', color: 'rose' },
                    { label: 'Vehicle Protection', status: 'Moderate', color: 'amber' },
                    { label: 'Critical Illness', status: 'Missing', color: 'slate' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-700">{item.label}</span>
                      <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md bg-${item.color}-50 text-${item.color}-600`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-2">Recommendation</p>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    Based on your profile, you are under-insured for Life Protection. Consider adding a ₹1 Cr Term Plan to secure your family's future.
                  </p>
                </div>

                <button 
                   onClick={() => setShowHealthScore(false)}
                   className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all"
                >
                  Get Detailed Audit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerOverview;
