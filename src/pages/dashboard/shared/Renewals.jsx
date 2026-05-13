import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, Calendar, Clock,
  ArrowUpRight, ArrowDownRight,
  MoreVertical, Trash2, CheckCircle, Search, Filter,
  Bell, CreditCard, Banknote, Smartphone, X, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Renewals = () => {
  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [receiptId, setReceiptId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');

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
    
    // Filter for policies that are Renewal Due or Expired
    const renewalsDue = combined.filter(p => {
      const status = getValidatedStatus(p);
      return status === 'Renewal Due' || status === 'Expired';
    });

    setPolicies(renewalsDue);
    setLoading(false);
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleSendReminder = (policy) => {
    toast.success(`Reminder sent to ${policy.client_name} for policy ${policy.policy_number}`);
  };

  const handleOpenRenewModal = (policy) => {
    setSelectedPolicy(policy);
    setIsModalOpen(true);
    setReceiptId('');
    setPaymentMethod('Cash');
  };

  const handleRenewPolicy = (e) => {
    e.preventDefault();
    if (!receiptId) {
      toast.error('Please enter Receipt ID');
      return;
    }

    // Update the policy
    const updatedPolicy = { ...selectedPolicy };
    const oldEndDate = new Date(updatedPolicy.end_date);
    const newEndDate = new Date(oldEndDate.setFullYear(oldEndDate.getFullYear() + 1));
    updatedPolicy.end_date = newEndDate.toISOString().split('T')[0];
    
    // Add to histories
    const now = new Date().toISOString().split('T')[0];
    updatedPolicy.payment_history = [
      ...(updatedPolicy.payment_history || []),
      { date: now, amount: updatedPolicy.premium, status: 'Paid', receipt_id: receiptId, method: paymentMethod }
    ];
    updatedPolicy.renewal_history = [
      ...(updatedPolicy.renewal_history || []),
      { date: now, type: 'Renewal' }
    ];

    // Save back to localStorage
    const bought = JSON.parse(localStorage.getItem('bought_policies') || '[]');
    const boughtIndex = bought.findIndex(p => p.id === selectedPolicy.id);
    
    if (boughtIndex !== -1) {
      const newBought = [...bought];
      newBought[boughtIndex] = updatedPolicy;
      localStorage.setItem('bought_policies', JSON.stringify(newBought));
    } else {
      // If it's one of the mock policies (ID 1 or 2), we simulate saving it by adding it to bought_policies
      // so it persists for the rest of the session as an "updated" policy
      localStorage.setItem('bought_policies', JSON.stringify([...bought, updatedPolicy]));
    }

    toast.success(`Policy ${selectedPolicy.policy_number} renewed successfully!`);
    setIsModalOpen(false);
    fetchPolicies();
  };

  const filteredPolicies = policies.filter(p => {
    const matchesSearch = p.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.policy_number.toLowerCase().includes(searchTerm.toLowerCase());
    const currentStatus = getValidatedStatus(p);
    return matchesSearch && (filterStatus === 'All' || currentStatus === filterStatus);
  });

  const stats = [
    { label: 'Upcoming Renewals', value: policies.filter(p => getValidatedStatus(p) === 'Renewal Due').length.toString(), icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Overdue Renewals', value: policies.filter(p => getValidatedStatus(p) === 'Expired').length.toString(), icon: Clock, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Action Required', value: policies.length.toString(), icon: RefreshCw, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Renewals Tracking</h1>
        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Lifecycle Management</p>
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
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Renewal Pipeline</h2>
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 mt-2">
              {['All', 'Renewal Due', 'Expired'].map((status) => (
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
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all" 
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPolicies.length > 0 ? filteredPolicies.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 font-bold text-slate-900">{item.client_name}</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-500">{item.policy_number}</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-900">{item.end_date}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${getValidatedStatus(item) === 'Renewal Due' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
                      {getValidatedStatus(item)}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleSendReminder(item)}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-indigo-100 transition-all"
                      >
                        <Bell className="w-3 h-3" />
                        <span>Remind</span>
                      </button>
                      <button 
                        onClick={() => handleOpenRenewModal(item)}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Renew</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-8 py-12 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                    No renewals due at this time
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedPolicy && (
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
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Process Renewal</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedPolicy.policy_number} • {selectedPolicy.client_name}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-all">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleRenewPolicy} className="p-8 space-y-6">
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Premium Due</span>
                    <Shield className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-3xl font-black text-emerald-900 tracking-tighter">₹{selectedPolicy.premium}</div>
                  <p className="text-[10px] font-bold text-emerald-600/70 uppercase tracking-widest mt-1">This will extend policy coverage by 1 year</p>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'Cash', icon: Banknote },
                      { id: 'UPI', icon: Smartphone },
                      { id: 'Card', icon: CreditCard },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${paymentMethod === method.id ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                      >
                        <method.icon className="w-6 h-6 mb-2" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{method.id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Receipt / Transaction ID</label>
                  <input 
                    type="text" 
                    required 
                    value={receiptId}
                    onChange={(e) => setReceiptId(e.target.value)}
                    placeholder="Enter reference number..."
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600/20 outline-none transition-all"
                  />
                </div>

                <div className="pt-4 flex flex-col space-y-3">
                  <button 
                    type="submit" 
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Confirm & Renew Policy</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    Cancel
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

export default Renewals;

