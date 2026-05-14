import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, FileText, Layers,
  ArrowUpRight, ArrowDownRight,
  Trash2, Search, Filter,
  Plus, X, Eye, Edit3, Calendar, DollarSign, User,
  CreditCard, RefreshCw, Download, Phone, MapPin, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Policies = () => {
  const navigate = useNavigate();
  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    policy_number: '',
    client_name: '',
    type: 'Life Insurance',
    premium: '',
    status: 'Active',
    start_date: '',
    end_date: '',
    nominee_name: '',
    nominee_relation: '',
    benefits: '',
    contact: '',
    address: ''
  });

  const getValidatedStatus = (p) => {
    const now = new Date();
    const end = new Date(p.end_date);
    const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Expired';
    if (diffDays <= 30) return 'Renewal Due';
    return 'Active';
  };

  const [stats, setStats] = useState([
    { label: 'Active Policies', value: '0', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Renewal Due', value: '0', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Expired', value: '0', icon: Layers, color: 'text-rose-600', bg: 'bg-rose-50' },
  ]);

  const fetchPolicies = () => {
    setLoading(true);
    const mockData = [
      {
        id: 1, policy_number: 'POL-8901', client_name: 'Shivani Ashok Gulhane', type: 'Life Insurance', premium: '1200',
        start_date: '2023-01-15', end_date: '2026-06-10', nominee_name: 'Mary Doe', nominee_relation: 'Spouse',
        benefits: 'Death cover, Critical illness', provider: 'HDFC Life', domain: 'hdfclife.com',
        contact: '+91 98765 43210', address: 'Plot 42, Sector 5, Mumbai, MH',
        payment_history: [{ date: '2023-01-15', amount: '1200', status: 'Paid' }],
        renewal_history: [{ date: '2023-01-15', type: 'Initial' }]
      },
      {
        id: 2, policy_number: 'POL-8902', client_name: 'Shivani Ashok Gulhane', type: 'Health Insurance', premium: '850',
        start_date: '2023-05-20', end_date: '2024-05-20', nominee_name: 'Sarah Smith', nominee_relation: 'Daughter',
        benefits: 'In-patient coverage', provider: 'Niva Bupa', domain: 'nivabupa.com',
        contact: '+91 98765 43210', address: 'Plot 42, Sector 5, Mumbai, MH',
        payment_history: [], renewal_history: []
      }
    ];
    const bought = JSON.parse(localStorage.getItem('bought_policies') || '[]');
    const combined = [...bought, ...mockData];
    let display = combined;
    if (user?.role === 'user') {
      display = combined.filter(p => p.client_name === user.full_name || p.client_name === 'Shivani Ashok Gulhane');
    }
    setData(display);
    updateStats(display);
    setLoading(false);
  };

  const updateStats = (policies) => {
    const active = policies.filter(p => getValidatedStatus(p) === 'Active').length;
    const due = policies.filter(p => getValidatedStatus(p) === 'Renewal Due').length;
    const expired = policies.filter(p => getValidatedStatus(p) === 'Expired').length;
    setStats([
      { label: 'Active Policies', value: active.toString(), icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Renewal Due', value: due.toString(), icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
      { label: 'Expired', value: expired.toString(), icon: Layers, color: 'text-rose-600', bg: 'bg-rose-50' },
    ]);
  };

  useEffect(() => { fetchPolicies(); }, [user]);

  const handleOpenModal = (policy = null) => {
    if (policy) {
      setFormData(policy);
      setIsEditing(true);
      setSelectedPolicy(policy);
    } else {
      setFormData({
        policy_number: `POL-${Math.floor(1000 + Math.random() * 9000)}`,
        client_name: user?.role === 'user' ? user.full_name : '',
        type: 'Life Insurance', premium: '', status: 'Active',
        start_date: '', end_date: '', nominee_name: '', nominee_relation: '',
        benefits: '', contact: '', address: ''
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setData(data.map(p => p.id === selectedPolicy.id ? { ...formData, id: p.id } : p));
      toast.success('Policy updated successfully');
    } else {
      const newPolicy = { ...formData, id: Date.now() };
      setData([newPolicy, ...data]);
      toast.success('Policy added successfully');
    }
    setIsModalOpen(false);
    updateStats(data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      const newData = data.filter(p => p.id !== id);
      setData(newData);
      updateStats(newData);
      toast.success('Policy deleted');
    }
  };

  const getProviderLogo = (provider, domain) => (
    <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 p-1 flex items-center justify-center shadow-sm">
      <img src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`} alt={provider} className="w-5 h-5 object-contain" />
    </div>
  );

  const filteredData = data.filter(p => {
    const matchesSearch = p.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.policy_number.toLowerCase().includes(searchTerm.toLowerCase());
    const currentStatus = getValidatedStatus(p);
    return matchesSearch && (filterStatus === 'All' || currentStatus === filterStatus);
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
            {user?.role === 'user' ? 'My Policies' : 'Policy Management'}
          </h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Lifecycle Oversight</p>
        </div>
        <button
          onClick={() => {
            if (user?.role === 'user') {
              navigate('/plans');
            } else {
              const rolePrefix = user?.role === 'super_admin' ? '/super-admin' : user?.role === 'admin' ? '/admin' : '/dashboard';
              navigate(`${rolePrefix}/policies/new`);
            }
          }}
          className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          {user?.role === 'user' ? 'Buy New Policy' : 'Add New Policy'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
              </div>
              <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <Icon className="w-8 h-8" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-emerald-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Policies Repository</h2>
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 mt-2">
              {['All', 'Active', 'Renewal Due', 'Expired'].map((status) => (
                <button key={status} onClick={() => setFilterStatus(status)} className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-tighter rounded-lg transition-all ${filterStatus === status ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-slate-400 hover:text-emerald-600'}`}>
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className="relative min-w-[240px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all" />
          </div>
        </div>

        {user?.role === 'user' ? (
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group relative"
              >
                {/* Card Header with Provider and Status */}
                <div className="p-6 pb-0 flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    {getProviderLogo(item.provider, item.domain)}
                    <div>
                      <h4 className="font-black text-slate-900 text-sm tracking-tight">{item.provider}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.policy_number}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                    getValidatedStatus(item) === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                    getValidatedStatus(item) === 'Renewal Due' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                  }`}>
                    {getValidatedStatus(item)}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Premium</p>
                      <h3 className="text-xl font-black text-slate-900">₹{item.premium}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Type</p>
                      <span className="text-xs font-bold text-slate-600">{item.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center text-slate-500 font-medium">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      Ends: {new Date(item.end_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 pb-6 pt-0 flex gap-2">
                  <button 
                    onClick={() => navigate(`/dashboard/policies/${item.id}`)}
                    className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                  >
                    Manage Policy
                  </button>
                  <button 
                    onClick={() => navigate(`/dashboard/policies/${item.id}`)}
                    className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy ID</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Provider</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6 font-bold text-slate-900">{item.policy_number}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        {getProviderLogo(item.provider, item.domain)}
                        <span className="font-bold text-slate-600 text-xs">{item.provider}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-bold text-slate-700">{item.client_name}</td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">{item.type}</span>
                    </td>
                    <td className="px-8 py-6 font-bold text-slate-900">₹{item.premium}</td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        getValidatedStatus(item) === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                        getValidatedStatus(item) === 'Renewal Due' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                      }`}>{getValidatedStatus(item)}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => navigate(`${user?.role === 'super_admin' ? '/super-admin' : user?.role === 'admin' ? '/admin' : '/dashboard'}/policies/${item.id}`)} className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all" title="View Details"><Eye className="w-5 h-5" /></button>
                        <button onClick={() => { const base = user?.role === 'super_admin' ? '/super-admin' : user?.role === 'admin' ? '/admin' : '/dashboard'; navigate(`${base}/policies/edit/${item.id}`, { state: { policy: item } }); }} className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all"><Edit3 className="w-5 h-5" /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-all"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div><h2 className="text-2xl font-black text-slate-900 tracking-tight">{isEditing ? 'Edit Policy' : 'Create New Policy'}</h2></div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-all"><X className="w-6 h-6 text-slate-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Name</label><input type="text" required value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold" /></div>
                  <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</label><select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold"><option>Life Insurance</option><option>Health Insurance</option><option>Car Insurance</option></select></div>
                  <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium (₹)</label><input type="number" required value={formData.premium} onChange={(e) => setFormData({ ...formData, premium: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold" /></div>
                  <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End Date</label><input type="date" required value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold" /></div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex justify-end space-x-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-tighter">Cancel</button>
                  <button type="submit" className="px-10 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-tighter shadow-xl shadow-emerald-900/20">{isEditing ? 'Save Changes' : 'Create Policy'}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Policies;
