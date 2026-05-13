import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, FileText, Layers,
  ArrowUpRight, ArrowDownRight,
  Trash2, Search, Filter,
  Eye, X, Mail, Phone as PhoneIcon, MapPin, User, Shield, Briefcase, FilePlus, Edit3, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Customers = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : null;
  });

  const getValidatedStatus = (p) => {
    const now = new Date();
    const end = new Date(p.end_date);
    const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Expired';
    if (diffDays <= 30) return 'Renewal Due';
    return 'Active';
  };

  const fetchAgentPolicies = () => {
    setLoading(true);
    const bought = JSON.parse(localStorage.getItem('bought_policies') || '[]');
    const combined = [...bought];
    
    // Filter by current agent
    const myPolicies = combined.filter(p => p.issued_by === user?.full_name);
    
    setPolicies(myPolicies);
    setLoading(false);
  };

  useEffect(() => {
    fetchAgentPolicies();
  }, [user]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      const bought = JSON.parse(localStorage.getItem('bought_policies') || '[]');
      const filtered = bought.filter(p => p.id !== id);
      localStorage.setItem('bought_policies', JSON.stringify(filtered));
      setPolicies(prev => prev.filter(p => p.id !== id));
      toast.success('Policy removed');
    }
  };

  const getProviderLogo = (domain) => (
    <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 p-1 flex items-center justify-center shadow-sm">
      <img src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`} alt="provider" className="w-5 h-5 object-contain" />
    </div>
  );

  const filteredPolicies = policies.filter(p => {
    const matchesSearch = p.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.policy_number.toLowerCase().includes(searchTerm.toLowerCase());
    const currentStatus = getValidatedStatus(p);
    return matchesSearch && (filterStatus === 'All' || currentStatus === filterStatus);
  });

  const stats = [
    { label: 'Active Policies', value: policies.filter(p => getValidatedStatus(p) === 'Active').length.toString(), icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Renewal Due', value: policies.filter(p => getValidatedStatus(p) === 'Renewal Due').length.toString(), icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Total Issued', value: policies.length.toString(), icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">My Policies</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Manage and track your issued policies</p>
        </div>
        <button 
          onClick={() => navigate('/agent/add-policy')}
          className="flex items-center space-x-2 px-8 py-4 bg-emerald-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200"
        >
          <FilePlus className="w-5 h-5" />
          <span>New Policy</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center justify-between"
          >
            <div className="space-y-2">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
            </div>
            <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon className="w-8 h-8" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Policy List</h2>
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 mt-2">
              {['All', 'Active', 'Renewal Due', 'Expired'].map((status) => (
                <button 
                  key={status} 
                  onClick={() => setFilterStatus(status)} 
                  className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-tighter rounded-lg transition-all ${filterStatus === status ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-indigo-600'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className="relative min-w-[280px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search policies or clients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Provider</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="6" className="p-12 text-center font-bold text-slate-400">Loading your policies...</td></tr>
              ) : filteredPolicies.length === 0 ? (
                <tr><td colSpan="6" className="p-12 text-center font-bold text-slate-400 uppercase text-xs tracking-widest">No policies found.</td></tr>
              ) : filteredPolicies.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 font-bold text-slate-900">{item.policy_number}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      {getProviderLogo(item.domain || 'google.com')}
                      <span className="font-bold text-slate-600 text-xs">{item.provider}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-bold text-slate-700">{item.client_name}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">{item.type}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      getValidatedStatus(item) === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                      getValidatedStatus(item) === 'Renewal Due' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                    }`}>{getValidatedStatus(item)}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => navigate(`/agent/policies/${item.id}`)}
                        className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-all"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => navigate(`/agent/policies/edit/${item.id}`, { state: { policy: item } })}
                        className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all"
                        title="Edit Policy"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-rose-50 text-rose-500 rounded-lg transition-all"
                        title="Delete Policy"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
