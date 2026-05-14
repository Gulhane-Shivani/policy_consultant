import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Database,
  ArrowUpRight, ArrowDownRight,
  MoreVertical, Trash2, CheckCircle, Search, Filter,
  Eye, X, Mail, Phone as PhoneIcon, MapPin, User, Shield, Briefcase, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../utils/api';
import { toast } from 'react-hot-toast';

const AdminCustomerManagement = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [allPolicies, setAllPolicies] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [stats, setStats] = useState([
    { label: 'Total Clients', value: '0', change: 'Live', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Policies', value: '0', change: 'Total', icon: Shield, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      const customersOnly = (res.users || []).filter(u => u.role === 'user');
      const staffOnly = (res.users || []).filter(u => u.role !== 'user');
      setData(customersOnly);
      setAllStaff(staffOnly);
      
      // Fetch policies for stats
      const mockData = [
        { id: 1, policy_number: 'POL-8901', client_name: 'Shivani Ashok Gulhane', status: 'Active', end_date: '2026-06-10' },
        { id: 2, policy_number: 'POL-8902', client_name: 'Jane Smith', status: 'Renewal Due', end_date: '2024-05-20' },
      ];
      const bought = JSON.parse(localStorage.getItem('bought_policies') || '[]');
      const combinedPolicies = [...bought, ...mockData];
      setAllPolicies(combinedPolicies);

      setStats([
        { label: 'Total Clients', value: customersOnly.length.toString(), change: 'Live', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Active Policies', value: combinedPolicies.length.toString(), change: 'Total', icon: Shield, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      ]);

    } catch (error) {
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const getValidatedStatus = (p) => {
    const now = new Date();
    const end = new Date(p.end_date);
    const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Expired';
    return 'Active';
  };

  const getCustomerStats = (customer) => {
    const customerPolicies = allPolicies.filter(p => p.client_name === customer.full_name);
    const active = customerPolicies.filter(p => getValidatedStatus(p) === 'Active').length;
    const expired = customerPolicies.filter(p => getValidatedStatus(p) === 'Expired').length;
    
    const agent = allStaff.find(s => s.role === 'agent');

    return {
      total: customerPolicies.length,
      active,
      expired,
      agentName: customerPolicies.length > 0 ? (agent ? agent.full_name : 'No Agent Assigned') : 'N/A'
    };
  };

  const handleViewProfile = (customer) => {
    setSelectedCustomer(customer);
    setIsProfileOpen(true);
  };

  const filteredData = data.filter(u => 
    u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Client Directory</h1>
        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Unified view of all registered customers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center justify-between"
          >
            <div className="space-y-2">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
              <div className={`flex items-center space-x-1 text-xs font-black text-emerald-500`}>
                <ArrowUpRight className="w-4 h-4" />
                <span>{stat.change}</span>
              </div>
            </div>
            <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon className="w-8 h-8" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden">
        <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Registered Clients</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              {loading ? 'Fetching...' : `${data.length} Total Users`}
            </p>
          </div>
          <div className="relative min-w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Name</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policies</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="p-12 text-center font-bold text-slate-400 uppercase text-[10px] tracking-widest">Synchronizing customer data...</td></tr>
              ) : filteredData.length === 0 ? (
                <tr><td colSpan="5" className="p-12 text-center font-bold text-slate-400 uppercase text-[10px] tracking-widest">No matching records found</td></tr>
              ) : filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black text-xs">
                        {item.full_name.charAt(0)}
                      </div>
                      <span className="font-black text-slate-900">{item.full_name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="space-y-1">
                      <p className="font-bold text-slate-600 text-xs flex items-center">
                        <Mail className="w-3 h-3 mr-2 text-slate-400" />
                        {item.email}
                      </p>
                      <p className="font-bold text-slate-400 text-[10px] flex items-center uppercase tracking-tighter">
                        <PhoneIcon className="w-3 h-3 mr-2" />
                        {item.mobile || 'No Mobile'}
                      </p>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${item.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {item.is_active ? 'Verified' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center space-x-2">
                      <div className="px-2 py-1 bg-slate-100 rounded text-[10px] font-black text-slate-600">
                        {getCustomerStats(item).total}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Issued</span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleViewProfile(item)}
                        className="p-3 bg-slate-50 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all shadow-sm"
                        title="View Profile"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileOpen && selectedCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 pb-0 flex justify-between items-start">
                <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-indigo-600 shadow-inner">
                  <User className="w-12 h-12" />
                </div>
                <button onClick={() => setIsProfileOpen(false)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="p-10 space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{selectedCustomer.full_name}</h3>
                    <p className="text-indigo-600 font-black uppercase text-[10px] tracking-[0.2em] mt-2 bg-indigo-50 inline-block px-3 py-1 rounded-lg">Registered Member</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-5">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Channel</p>
                        <p className="font-bold text-slate-900 text-sm">{selectedCustomer.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-5">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm">
                        <PhoneIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mobile Contact</p>
                        <p className="font-bold text-slate-900 text-sm">{selectedCustomer.mobile || 'Not Linked'}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-5">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Residence</p>
                        <p className="font-bold text-slate-900 text-sm leading-relaxed">{selectedCustomer.address || 'Standard Registered Address On File'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-[3rem] p-8 space-y-8 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-emerald-400" />
                        Insurance Portfolio
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex justify-between items-center p-5 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                          <span className="text-xs font-bold text-slate-400">Policies</span>
                          <span className="text-2xl font-black text-white">{getCustomerStats(selectedCustomer).total}</span>
                        </div>
                        <div className="flex justify-between items-center p-5 bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
                          <span className="text-xs font-bold text-emerald-400">Active</span>
                          <span className="text-2xl font-black text-emerald-400">{getCustomerStats(selectedCustomer).active}</span>
                        </div>
                      </div>
                    </div>
                    <Shield className="absolute -right-8 -bottom-8 w-40 h-40 text-white/5 -rotate-12" />
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Member Reference</span>
                    <span className="font-black text-slate-900 tracking-widest">#CUST-{selectedCustomer.id}</span>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Assigned Support</p>
                     <p className="font-bold text-slate-900 text-sm">{getCustomerStats(selectedCustomer).agentName}</p>
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

export default AdminCustomerManagement;
