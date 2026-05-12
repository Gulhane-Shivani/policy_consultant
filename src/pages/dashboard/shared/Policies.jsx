import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, FileText, Layers,
  ArrowUpRight, ArrowDownRight,
  MoreVertical, Trash2, CheckCircle, Search, Filter,
  Plus, X, Eye, Edit3, Calendar, DollarSign, User, MapPin, Activity,
  CreditCard, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../utils/api';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

const Policies = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
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
  });

  const [stats, setStats] = useState([
    { label: 'Active Policies', value: '0', change: '+0', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Renewal Due', value: '0', change: '+0', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Expired', value: '0', change: '+0', icon: Layers, color: 'text-rose-600', bg: 'bg-rose-50' },
  ]);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      // Simulate API call for now or use real endpoint if available
      // const res = await api.get('/policies');
      // setData(res);
      
      // Mock data for initial implementation as requested
      const mockData = [
        { 
          id: 1, 
          policy_number: 'POL-8901', 
          client_name: 'John Doe', 
          type: 'Life Insurance', 
          premium: '1200', 
          status: 'Active',
          start_date: '2023-01-15',
          end_date: '2024-01-15',
          nominee_name: 'Mary Doe',
          nominee_relation: 'Spouse',
          benefits: 'Death cover, Critical illness',
          provider: 'HDFC Life',
          domain: 'hdfclife.com',
          payment_history: [
            { date: '2023-01-15', amount: '1200', status: 'Paid' }
          ],
          renewal_history: [
            { date: '2023-01-15', type: 'Initial' }
          ]
        },
        { 
          id: 2, 
          policy_number: 'POL-8902', 
          client_name: 'Jane Smith', 
          type: 'Health Insurance', 
          premium: '850', 
          status: 'Renewal Due',
          start_date: '2023-05-20',
          end_date: '2024-05-20',
          nominee_name: 'Sarah Smith',
          nominee_relation: 'Daughter',
          benefits: 'In-patient, Out-patient coverage',
          provider: 'Niva Bupa',
          domain: 'nivabupa.com',
          payment_history: [],
          renewal_history: []
        },
        { 
          id: 3, 
          policy_number: 'POL-8903', 
          client_name: 'Robert Brown', 
          type: 'Car Insurance', 
          premium: '450', 
          status: 'Active',
          start_date: '2023-08-10',
          end_date: '2024-08-10',
          nominee_name: 'Linda Brown',
          nominee_relation: 'Wife',
          benefits: 'Collision, Comprehensive',
          provider: 'ICICI Lombard',
          domain: 'icicilombard.com',
          payment_history: [],
          renewal_history: []
        },
        { 
          id: 4, 
          policy_number: 'POL-8904', 
          client_name: 'Emily Davis', 
          type: 'Business Insurance', 
          premium: '2500', 
          status: 'Expired',
          start_date: '2022-01-01',
          end_date: '2023-01-01',
          nominee_name: 'Mark Davis',
          nominee_relation: 'Partner',
          benefits: 'Property, Liability',
          provider: 'TATA AIG',
          domain: 'tataaig.com',
          payment_history: [],
          renewal_history: []
        },
      ];
      setData(mockData);
      updateStats(mockData);
    } catch (error) {
      toast.error('Failed to load policies');
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (policies) => {
    const active = policies.filter(p => p.status === 'Active').length;
    const due = policies.filter(p => p.status === 'Renewal Due').length;
    const expired = policies.filter(p => p.status === 'Expired').length;
    setStats([
      { label: 'Active Policies', value: active.toString(), change: '+5.4%', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Renewal Due', value: due.toString(), change: '+12.5%', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
      { label: 'Expired', value: expired.toString(), change: '-2.1%', icon: Layers, color: 'text-rose-600', bg: 'bg-rose-50' },
    ]);
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleOpenModal = (policy = null) => {
    if (policy) {
      setFormData(policy);
      setIsEditing(true);
      setSelectedPolicy(policy);
    } else {
      setFormData({
        policy_number: `POL-${Math.floor(1000 + Math.random() * 9000)}`,
        client_name: '',
        type: 'Life Insurance',
        premium: '',
        status: 'Active',
        start_date: '',
        end_date: '',
        nominee_name: '',
        nominee_relation: '',
        benefits: '',
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

  const getProviderLogo = (provider, domain) => {
    return (
      <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 p-1 flex items-center justify-center shadow-sm">
        <img 
          src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`} 
          alt={provider}
          className="w-5 h-5 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="hidden w-full h-full items-center justify-center font-black text-emerald-600 text-[8px] bg-emerald-50 uppercase">
          {provider?.substring(0, 2)}
        </div>
      </div>
    );
  };

  const filteredData = data.filter(p => {
    const matchesSearch = p.client_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.policy_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Policy Management</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Policy Consultant • Lifecycle Oversight</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Policy</span>
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
              <div className={`flex items-center space-x-1 text-xs font-black ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.change.startsWith('+') ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{stat.change} vs last month</span>
              </div>
            </div>
            <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon className="w-8 h-8" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-emerald-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Policies Repository</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Filter and manage policy lifecycle</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all" 
              />
            </div>
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1">
              {['All', 'Active', 'Renewal Due', 'Expired'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-tighter rounded-lg transition-all ${filterStatus === status ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-slate-400 hover:text-emerald-600'}`}
                >
                  {status}
                </button>
              ))}
            </div>
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
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
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
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${item.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : item.status === 'Renewal Due' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => navigate(`${location.pathname}/${item.id}`)}
                        className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleOpenModal(item)}
                        className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-all"
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

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {isEditing ? 'Edit Policy' : 'Create New Policy'}
                  </h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Policy Consultant • Policy Entry Form</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-all">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Policy Number</label>
                    <input 
                      type="text" 
                      value={formData.policy_number}
                      disabled
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Client Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.client_name}
                      onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                      placeholder="Enter client's full name"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Policy Type</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                    >
                      <option>Life Insurance</option>
                      <option>Health Insurance</option>
                      <option>Car Insurance</option>
                      <option>Business Insurance</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Premium Amount (₹)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.premium}
                      onChange={(e) => setFormData({...formData, premium: e.target.value})}
                      placeholder="1200"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                    <input 
                      type="date" 
                      required
                      value={formData.start_date}
                      onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">End Date</label>
                    <input 
                      type="date" 
                      required
                      value={formData.end_date}
                      onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Nominee Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nominee Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.nominee_name}
                        onChange={(e) => setFormData({...formData, nominee_name: e.target.value})}
                        placeholder="Full name"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Relation</label>
                      <input 
                        type="text" 
                        required
                        value={formData.nominee_relation}
                        onChange={(e) => setFormData({...formData, nominee_relation: e.target.value})}
                        placeholder="e.g., Spouse, Daughter"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Benefits & Coverage</label>
                  <textarea 
                    rows="3"
                    value={formData.benefits}
                    onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                    placeholder="Enter key benefits..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                  />
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end space-x-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-10 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20"
                  >
                    {isEditing ? 'Save Changes' : 'Create Policy'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {isDetailModalOpen && selectedPolicy && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-50 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <div className="w-full md:w-1/3 bg-emerald-600 p-10 text-white flex flex-col justify-between overflow-hidden relative">
                <ShieldCheck className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter leading-tight mb-2">{selectedPolicy.policy_number}</h2>
                  <p className="text-emerald-100 font-bold uppercase text-xs tracking-widest">{selectedPolicy.type}</p>
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200 mb-1">Status</p>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${selectedPolicy.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`}></div>
                      <p className="text-xl font-black">{selectedPolicy.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Total Premium</p>
                      <p className="text-2xl font-black leading-none">₹{selectedPolicy.premium}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-2/3 bg-white p-10 max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Policy Details</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Full record for {selectedPolicy.client_name}</p>
                  </div>
                  <button onClick={() => setIsDetailModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-slate-400 mb-1">
                      <User className="w-3 h-3" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Client Name</span>
                    </div>
                    <p className="text-lg font-black text-slate-900">{selectedPolicy.client_name}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-slate-400 mb-1">
                      <Calendar className="w-3 h-3" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Period</span>
                    </div>
                    <p className="text-lg font-black text-slate-900">{selectedPolicy.start_date} → {selectedPolicy.end_date}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-slate-400 mb-1">
                      <User className="w-3 h-3" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Nominee</span>
                    </div>
                    <p className="text-lg font-black text-slate-900">{selectedPolicy.nominee_name} ({selectedPolicy.nominee_relation})</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-slate-400 mb-1">
                      <Activity className="w-3 h-3" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Benefits</span>
                    </div>
                    <p className="text-sm font-bold text-slate-700">{selectedPolicy.benefits}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center">
                      <CreditCard className="w-4 h-4 mr-2 text-emerald-500" />
                      Payment History
                    </h4>
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-100/50">
                            <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">Date</th>
                            <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">Amount</th>
                            <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedPolicy.payment_history?.length > 0 ? selectedPolicy.payment_history.map((h, i) => (
                            <tr key={i}>
                              <td className="px-6 py-4 text-xs font-bold text-slate-900">{h.date}</td>
                              <td className="px-6 py-4 text-xs font-black text-slate-900">₹{h.amount}</td>
                              <td className="px-6 py-4 text-right">
                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[9px] font-black uppercase tracking-widest">{h.status}</span>
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan="3" className="px-6 py-8 text-center text-[10px] font-bold text-slate-400">No payment history found.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center">
                      <RefreshCw className="w-4 h-4 mr-2 text-amber-500" />
                      Renewal History
                    </h4>
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-100/50">
                            <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">Date</th>
                            <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest text-right">Type</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedPolicy.renewal_history?.length > 0 ? selectedPolicy.renewal_history.map((h, i) => (
                            <tr key={i}>
                              <td className="px-6 py-4 text-xs font-bold text-slate-900">{h.date}</td>
                              <td className="px-6 py-4 text-right">
                                <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded-md text-[9px] font-black uppercase tracking-widest">{h.type}</span>
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan="2" className="px-6 py-8 text-center text-[10px] font-bold text-slate-400">No renewal history found.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Policies;
