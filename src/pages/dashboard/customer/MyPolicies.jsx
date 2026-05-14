import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, FileText, Layers, Search, 
  Calendar, Download, ChevronRight, Filter,
  ArrowRight, Shield, Activity, Heart, Car, Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MyPolicies = () => {
  const navigate = useNavigate();
  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : null;
  });

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Status Validation Helper
  const getValidatedStatus = (p) => {
    const now = new Date();
    const end = new Date(p.end_date);
    const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Expired';
    if (diffDays <= 30) return 'Renewal Due';
    return 'Active';
  };

  const fetchPolicies = () => {
    setLoading(true);
    // Standard mock policies for demonstration
    const mockData = [
      {
        id: 1, policy_number: 'POL-8901', client_name: 'Shivani Ashok Gulhane', type: 'Life Insurance', premium: '1200',
        start_date: '2023-01-15', end_date: '2026-06-10', provider: 'HDFC Life', domain: 'hdfclife.com',
      },
      {
        id: 2, policy_number: 'POL-8902', client_name: 'Shivani Ashok Gulhane', type: 'Health Insurance', premium: '850',
        start_date: '2023-05-20', end_date: '2024-05-20', provider: 'Niva Bupa', domain: 'nivabupa.com',
      }
    ];

    const bought = JSON.parse(localStorage.getItem('bought_policies') || '[]');
    const combined = [...bought, ...mockData];
    
    // Strict filtering for the current user
    const filtered = combined.filter(p => p.client_name === user?.full_name);
    setPolicies(filtered);
    setLoading(false);
  };

  useEffect(() => {
    fetchPolicies();
  }, [user]);

  const filteredData = policies.filter(p => {
    const matchesSearch = p.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.policy_number.toLowerCase().includes(searchTerm.toLowerCase());
    const currentStatus = getValidatedStatus(p);
    return matchesSearch && (filterStatus === 'All' || currentStatus === filterStatus);
  });

  const stats = [
    { label: 'Active Policies', value: policies.filter(p => getValidatedStatus(p) === 'Active').length, icon: ShieldCheck, color: 'emerald' },
    { label: 'Renewal Due', value: policies.filter(p => getValidatedStatus(p) === 'Renewal Due').length, icon: FileText, color: 'amber' },
    { label: 'Total Portfolio', value: `₹${policies.reduce((acc, curr) => acc + parseInt(curr.premium || 0), 0).toLocaleString()}`, icon: Activity, color: 'blue' },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
            My Policies
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">
            Secure & Managed Portfolio
          </p>
        </div>
        <button 
          onClick={() => navigate('/plans')}
          className="px-8 py-4 bg-emerald-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 transition-all flex items-center group"
        >
          Buy New Policy
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
            </div>
            <div className={`w-16 h-16 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center`}>
              <stat.icon className="w-8 h-8" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center gap-6 bg-slate-50/30">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Policies Repository</h2>
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 mt-3 w-fit shadow-sm">
              {['All', 'Active', 'Renewal Due', 'Expired'].map((status) => (
                <button 
                  key={status} 
                  onClick={() => setFilterStatus(status)} 
                  className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${filterStatus === status ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-emerald-600'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search policies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-600/5 transition-all" 
            />
          </div>
        </div>

        <div className="p-10">
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col group"
                >
                  {/* Card Top */}
                  <div className="p-8 pb-4 flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl p-2 flex items-center justify-center shadow-sm">
                        <img src={`https://www.google.com/s2/favicons?sz=64&domain=${item.domain}`} alt="" className="w-10 h-10 object-contain" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 tracking-tight uppercase">{item.provider}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.policy_number}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                      getValidatedStatus(item) === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                      getValidatedStatus(item) === 'Renewal Due' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {getValidatedStatus(item)}
                    </span>
                  </div>

                  {/* Card Center */}
                  <div className="px-8 py-4 space-y-6 flex-grow">
                    <div className="grid grid-cols-2 gap-4 p-5 bg-slate-50/80 rounded-3xl border border-slate-50">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Premium</p>
                        <h5 className="text-xl font-black text-slate-900">₹{item.premium}</h5>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Type</p>
                        <p className="text-xs font-black text-slate-600 uppercase tracking-tighter">{item.type?.split(' ')[0]}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-xs font-bold text-slate-500 bg-white p-3 rounded-2xl border border-slate-100">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      <span>Expires: {new Date(item.end_date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Card Bottom */}
                  <div className="p-8 pt-0 flex gap-3">
                    <button 
                      onClick={() => navigate(`/dashboard/policies/${item.id}`)}
                      className="flex-grow py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                    >
                      Manage Policy
                    </button>
                    
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">No Policies Found</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">You haven't purchased any policies yet</p>
              <button 
                onClick={() => navigate('/plans')}
                className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl"
              >
                Browse Plans
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPolicies;
