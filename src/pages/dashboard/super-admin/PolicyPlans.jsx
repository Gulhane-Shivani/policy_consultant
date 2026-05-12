import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Package, Settings,
  ArrowUpRight, ArrowDownRight,
  MoreVertical, Trash2, CheckCircle, Search, Filter,
  Plus, X, Edit3, Eye, Shield, DollarSign, Activity, List, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../utils/api';
import { toast } from 'react-hot-toast';

const PolicyPlans = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const providers = ['LIC', 'HDFC ERGO', 'ICICI Lombard', 'Star Health', 'Bajaj Allianz'];

  const [formData, setFormData] = useState({
    plan_id: '',
    name: '',
    category: 'Life',
    term: '10 Years',
    basePremium: '',
    benefits: '',
    coverage: '',
    provider: providers[0],
    status: 'Active',
  });

  const [stats, setStats] = useState([
    { label: 'Active Plans', value: '0', change: '+0', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg. Premium', value: '₹0', change: '+0%', icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Policy Categories', value: '4', change: 'Stable', icon: List, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      // Mock data for initial implementation
      const mockData = [
        { id: 1, plan_id: 'PLAN-01', name: 'Elite Life Plus', category: 'Life', term: '20 Years', basePremium: '12000', benefits: 'High coverage, Low premium', coverage: '₹50L - ₹1Cr', provider: 'LIC', status: 'Active' },
        { id: 2, plan_id: 'PLAN-02', name: 'Health Secure', category: 'Health', term: '1 Year', basePremium: '4500', benefits: 'Cashless hospitalisation', coverage: '₹5L - ₹10L', provider: 'HDFC ERGO', status: 'Active' },
        { id: 3, plan_id: 'PLAN-03', name: 'Auto Guard', category: 'Car', term: '1 Year', basePremium: '3000', benefits: 'Zero Dep, Engine cover', coverage: 'IDV based', provider: 'ICICI Lombard', status: 'Draft' },
        { id: 4, plan_id: 'PLAN-04', name: 'Business Pro', category: 'Business', term: '5 Years', basePremium: '25000', benefits: 'Comprehensive liability', coverage: '₹2Cr - ₹5Cr', provider: 'Bajaj Allianz', status: 'Active' },
      ];
      setData(mockData);
      updateStats(mockData);
    } catch (error) {
      toast.error('Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (plans) => {
    const active = plans.filter(p => p.status === 'Active').length;
    const avg = plans.length > 0 ? Math.round(plans.reduce((acc, p) => acc + parseInt(p.basePremium), 0) / plans.length) : 0;
    setStats([
      { label: 'Active Plans', value: active.toString(), change: '+2', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Avg. Premium', value: `₹${avg}`, change: '+5.4%', icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Policy Categories', value: '4', change: 'Stable', icon: List, color: 'text-amber-600', bg: 'bg-amber-50' },
    ]);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleOpenModal = (plan = null) => {
    if (plan) {
      setFormData(plan);
      setIsEditing(true);
      setSelectedPlan(plan);
    } else {
      setFormData({
        plan_id: `PLAN-0${data.length + 1}`,
        name: '',
        category: 'Life',
        term: '10 Years',
        basePremium: '',
        benefits: '',
        coverage: '',
        provider: providers[0],
        status: 'Active',
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Unique name validation
    const nameExists = data.some(p => p.name.toLowerCase() === formData.name.toLowerCase() && p.id !== (selectedPlan?.id || null));
    if (nameExists) {
      toast.error('A plan with this name already exists. Please choose a unique name.');
      return;
    }

    if (isEditing) {
      const newData = data.map(p => p.id === selectedPlan.id ? { ...formData, id: p.id } : p);
      setData(newData);
      updateStats(newData);
      toast.success('Plan updated successfully');
    } else {
      const newPlan = { ...formData, id: Date.now() };
      const newData = [newPlan, ...data];
      setData(newData);
      updateStats(newData);
      toast.success('New plan created');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this policy plan? This action cannot be undone.')) {
      const newData = data.filter(p => p.id !== id);
      setData(newData);
      updateStats(newData);
      toast.success('Plan removed');
    }
  };

  const filteredData = data.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.plan_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Policy Product Hub</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Policy Consultant • Plan Configuration</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20"
        >
          <Plus className="w-4 h-4" />
          <span>Design New Plan</span>
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
              <div className={`flex items-center space-x-1 text-xs font-black ${stat.change.startsWith('+') ? 'text-emerald-500' : stat.change === 'Stable' ? 'text-slate-400' : 'text-red-500'}`}>
                {stat.change.startsWith('+') ? <ArrowUpRight className="w-4 h-4" /> : stat.change === 'Stable' ? null : <ArrowDownRight className="w-4 h-4" />}
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
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Active Plan Catalog</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Configure product specifications</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search plans..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all" 
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Provider</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 font-bold text-slate-900">{item.plan_id}</td>
                  <td className="px-8 py-6 font-bold text-slate-700">{item.name}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">{item.category}</span>
                  </td>
                  <td className="px-8 py-6 font-bold text-slate-500">{item.provider}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => {
                          setSelectedPlan(item);
                          setIsDetailModalOpen(true);
                        }}
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
                    {isEditing ? 'Modify Plan' : 'Design Plan'}
                  </h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Product Engine • Specification Form</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-all">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Plan ID</label>
                    <input type="text" value={formData.plan_id} disabled className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Plan Name (Unique)</label>
                    <input 
                      type="text" required value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., Elite Life Plus"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Plan Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                    >
                      <option>Life</option>
                      <option>Health</option>
                      <option>Car</option>
                      <option>Business</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Policy Provider</label>
                    <select 
                      value={formData.provider}
                      onChange={(e) => setFormData({...formData, provider: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                    >
                      {providers.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Standard Term</label>
                    <input 
                      type="text" required value={formData.term}
                      onChange={(e) => setFormData({...formData, term: e.target.value})}
                      placeholder="e.g., 20 Years"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Base Premium (₹)</label>
                    <input 
                      type="number" required value={formData.basePremium}
                      onChange={(e) => setFormData({...formData, basePremium: e.target.value})}
                      placeholder="12000"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Coverage Scope</label>
                  <input 
                    type="text" required value={formData.coverage}
                    onChange={(e) => setFormData({...formData, coverage: e.target.value})}
                    placeholder="e.g., ₹50L - ₹1Cr"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Plan Benefits & USPs</label>
                  <textarea 
                    rows="4" value={formData.benefits}
                    onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                    placeholder="List core benefits..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all font-bold"
                  />
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end space-x-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-slate-200 transition-all">Cancel</button>
                  <button type="submit" className="px-10 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20">
                    {isEditing ? 'Save Design' : 'Launch Plan'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detail View Modal */}
      <AnimatePresence>
        {isDetailModalOpen && selectedPlan && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDetailModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden p-10">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">
                    {selectedPlan.category.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{selectedPlan.name}</h2>
                    <p className="text-emerald-600 font-bold uppercase text-[10px] tracking-widest">{selectedPlan.provider} • {selectedPlan.category} Plan</p>
                  </div>
                </div>
                <button onClick={() => setIsDetailModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Base Premium</p>
                  <p className="text-2xl font-black text-slate-900">₹{selectedPlan.basePremium}</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Standard Term</p>
                  <p className="text-2xl font-black text-slate-900">{selectedPlan.term}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-emerald-500" />
                    Coverage Summary
                  </h4>
                  <p className="text-slate-900 font-black text-lg">{selectedPlan.coverage}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                    <Activity className="w-4 h-4 mr-2 text-emerald-500" />
                    Plan Benefits
                  </h4>
                  <p className="text-slate-600 font-bold text-sm leading-relaxed whitespace-pre-line">{selectedPlan.benefits}</p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200" />)}
                  <div className="w-10 h-10 rounded-full border-4 border-white bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-black">+42</div>
                </div>
                <p className="text-xs font-bold text-slate-400">45 active policies under this plan</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PolicyPlans;
