import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Package, Settings,
  ArrowUpRight, ArrowDownRight,
  MoreVertical, Trash2, CheckCircle, CheckCircle2, Search, Filter,
  Plus, X, Edit3, Eye, Shield, DollarSign, Activity, List, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../utils/api';
import { toast } from 'react-hot-toast';

const PolicyPlans = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterProvider, setFilterProvider] = useState('All');

  const providers = [
    'Care Health', 'Niva Bupa', 'Star Health', 'Aditya Birla',
    'HDFC Life', 'ICICI Prudential', 'LIC of India',
    'Digit Insurance', 'ICICI Lombard', 'TATA AIG', 'Bajaj Allianz'
  ];

  const [formData, setFormData] = useState({
    plan_id: '',
    name: '',
    category: 'Health',
    term: '1 Year',
    basePremium: '',
    benefits: '',
    coverage: '',
    provider: providers[0],
    status: 'Active',
    howToClaim: '',
    verdict: ''
  });

  const [stats, setStats] = useState([
    { label: 'Active Plans', value: '0', change: '+0', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg. Monthly Premium', value: '₹0', change: '+0%', icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Policy Categories', value: '4', change: 'Stable', icon: List, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const mockData = [
        { 
          id: 1, plan_id: 'PLAN-H1', name: 'CARE SUPREME DISCOUNTED', category: 'Health', term: '1 Year', basePremium: '615', 
          benefits: '• No room rent limit\n• Unlimited restoration\n• Global Treatment\n• OPD Consultations', 
          coverage: '5 Lakh', provider: 'Care Health', domain: 'careinsurance.com', status: 'Active',
          howToClaim: '1. Visit Network Hospital 2. Show Policy ID 3. Cashless approval in 2 hours.',
          verdict: 'Comprehensive health coverage designed for families with priority hospital networks.'
        },
        { 
          id: 2, plan_id: 'PLAN-H2', name: 'REASSURE 2.0 TITANIUM+', category: 'Health', term: '1 Year', basePremium: '628', 
          benefits: '• No room rent limit\n• 100% no claim bonus\n• Modern Treatment\n• Zero Room Limit', 
          coverage: '5 Lakh', provider: 'Niva Bupa', domain: 'nivabupa.com', status: 'Active',
          howToClaim: '1. Intimate via App 2. Upload Bills 3. Payout in 48 hours for non-network.',
          verdict: 'Elite medical protection with zero-deductibles and instant renewal discounts.'
        },
        { 
          id: 3, plan_id: 'PLAN-H3', name: 'COMPREHENSIVE INDIVIDUAL', category: 'Health', term: '1 Year', basePremium: '708', 
          benefits: '• Single Private A/C Room\n• 100% restoration\n• Air Ambulance\n• Second Opinion', 
          coverage: '5 Lakh', provider: 'Star Health', domain: 'starhealth.in', status: 'Active',
          howToClaim: '1. Call 24/7 Helpline 2. Pre-auth in 1 hour 3. Treatment starts.',
          verdict: 'Reliable individual health insurance with a vast network of 10,000+ hospitals.'
        },
        { 
          id: 4, plan_id: 'PLAN-H4', name: 'ACTIVE ONE MAX', category: 'Health', term: '1 Year', basePremium: '517', 
          benefits: '• No room rent limit\n• 100% no claim bonus\n• Health Returns\n• Chronic Care', 
          coverage: '5 Lakh', provider: 'Aditya Birla', domain: 'adityabirlacapital.com', status: 'Active',
          howToClaim: '1. Simple QR scan at hospital 2. Verified via App 3. Automated Payout.',
          verdict: 'Modern insurance for the active generation, rewarding a healthy lifestyle.'
        },
        { 
          id: 5, plan_id: 'PLAN-L1', name: 'TERM SMART GUARD', category: 'Life', term: 'Whole Life', basePremium: '1200', 
          benefits: '• Whole life cover\n• Terminal illness benefit\n• Level Premium\n• Rider Options', 
          coverage: '1 Crore', provider: 'HDFC Life', domain: 'hdfclife.com', status: 'Active',
          howToClaim: '1. Family notifies company 2. Documents via Email 3. Fast-track Payout.',
          verdict: 'Maximum security for your family with flexible payouts and critical illness protection.'
        },
        { 
          id: 6, plan_id: 'PLAN-L2', name: 'IPROTECT SMART', category: 'Life', term: 'Up to 85 yrs', basePremium: '1150', 
          benefits: '• Accidental death cover\n• Critical illness rider\n• Life Stage Upgrades\n• Cancer Cover', 
          coverage: '1 Crore', provider: 'ICICI Prudential', domain: 'iciciprulife.com', status: 'Active',
          howToClaim: '1. One-click Claim 2. Physical audit 3. Full settlement guaranteed.',
          verdict: 'Intelligent term insurance that adjusts its coverage based on your life stages.'
        },
        { 
          id: 7, plan_id: 'PLAN-L3', name: 'STANDARD TERM PLAN', category: 'Life', term: '35 Years', basePremium: '900', 
          benefits: '• Government backed\n• Tax savings U/S 80C\n• High Trust\n• Low Rejection', 
          coverage: '50 Lakh', provider: 'LIC of India', domain: 'licindia.in', status: 'Active',
          howToClaim: '1. Visit nearest branch 2. Submit form 3. Cheque delivery.',
          verdict: 'Trust-backed government term plan providing simple and reliable life cover.'
        },
        { 
          id: 8, plan_id: 'PLAN-C1', name: 'ECO DRIVE COMPREHENSIVE', category: 'Car', term: '1 Year', basePremium: '450', 
          benefits: '• Zero depreciation\n• 24/7 Roadside support\n• Self Inspection\n• Zero Paper', 
          coverage: 'IDV 8L', provider: 'Digit Insurance', domain: 'godigit.com', status: 'Active',
          howToClaim: '1. Upload Photo 2. Get Approval 3. Drive to Garage.',
          verdict: 'Paperless car insurance with 1-hour inspection and cashless repairs.'
        },
        { 
          id: 9, plan_id: 'PLAN-C2', name: 'MOTOR SECURE PLUS', category: 'Car', term: '1 Year', basePremium: '520', 
          benefits: '• Fast tag enabled\n• Cashless garage mesh\n• Key Replacement\n• Tyre Cover', 
          coverage: 'IDV 10L', provider: 'ICICI Lombard', domain: 'icicilombard.com', status: 'Active',
          howToClaim: '1. Call Towing 2. Workshop drop 3. Get Car back.',
          verdict: 'The standard for motor protection in India, offering comprehensive coverage.'
        },
        { 
          id: 10, plan_id: 'PLAN-B1', name: 'SMB LIABILITY PRO', category: 'Business', term: '1 Year', basePremium: '2500', 
          benefits: '• Professional indemnity\n• Cyber liability cover\n• Cyber Safe\n• Director Cover', 
          coverage: '50 Lakh', provider: 'TATA AIG', domain: 'tataaig.com', status: 'Active',
          howToClaim: '1. Case Notification 2. Advisor assigned 3. Legal assist.',
          verdict: 'Protect your professional venture from legal liabilities and cyber threats.'
        },
        { 
          id: 11, plan_id: 'PLAN-B2', name: 'ASSET PROTECTION ELITE', category: 'Business', term: '1 Year', basePremium: '4200', 
          benefits: '• Fire & burglary cover\n• Public liability\n• Theft Cover\n• Machinery Breakdown', 
          coverage: '1 Crore', provider: 'Bajaj Allianz', domain: 'bajajallianz.com', status: 'Active',
          howToClaim: '1. Loss assessment 2. Audit 3. Direct settlement.',
          verdict: 'Total management of your business risks, from fire to third-party liabilities.'
        }
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
      { label: 'Active Plans', value: active.toString(), change: '+7', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Avg. Monthly Premium', value: `₹${avg}`, change: '+12.4%', icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50' },
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
        plan_id: `PLAN-${Date.now().toString().slice(-4)}`,
        name: '',
        category: 'Health',
        term: '1 Year',
        basePremium: '',
        benefits: '',
        coverage: '',
        provider: providers[0],
        status: 'Active',
        howToClaim: '',
        verdict: ''
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

  const getProviderLogo = (provider, domain) => {
    return (
      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 p-1 flex items-center justify-center shadow-sm">
        <img 
          src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`} 
          alt={provider}
          className="w-7 h-7 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="hidden w-full h-full items-center justify-center font-black text-emerald-600 text-[10px] bg-emerald-50">
          {provider.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
      </div>
    );
  };

  const filteredData = data.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.plan_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    const matchesProvider = filterProvider === 'All' || p.provider === filterProvider;
    return matchesSearch && matchesCategory && matchesProvider;
  });

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
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-10 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Health">Health</option>
                <option value="Life">Life</option>
                <option value="Car">Car</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                value={filterProvider}
                onChange={(e) => setFilterProvider(e.target.value)}
                className="pl-10 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all cursor-pointer"
              >
                <option value="All">All Providers</option>
                {providers.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

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
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      {getProviderLogo(item.provider, item.domain)}
                      <span className="font-bold text-slate-600">{item.provider}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => navigate(`/super-admin/plans/${item.id}`)}
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
    </div>
  );
};

export default PolicyPlans;
