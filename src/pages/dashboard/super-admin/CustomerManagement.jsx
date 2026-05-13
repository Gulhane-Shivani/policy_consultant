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

const CustomerManagement = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [allPolicies, setAllPolicies] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [stats, setStats] = useState([
    { label: 'Platform Users', value: '0', change: 'Live', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Clients', value: '0', change: 'Live', icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]);

  useEffect(() => {
    setStats([
      { label: 'Platform Users', value: data.length.toString(), change: 'Live', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Active Clients', value: data.filter(u => u.is_active).length.toString(), change: 'Live', icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ]);
  }, [data]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      // The backend returns { users: [...], total: X }
      const customersOnly = (res.users || []).filter(u => u.role === 'user');
      const staffOnly = (res.users || []).filter(u => u.role !== 'user');
      setData(customersOnly);
      setAllStaff(staffOnly);
      
      // Also fetch policies for stats
      const mockData = [
        { id: 1, policy_number: 'POL-8901', client_name: 'Shivani Ashok Gulhane', status: 'Active', end_date: '2026-06-10' },
        { id: 2, policy_number: 'POL-8902', client_name: 'Jane Smith', status: 'Renewal Due', end_date: '2024-05-20' },
      ];
      const bought = JSON.parse(localStorage.getItem('bought_policies') || '[]');
      setAllPolicies([...bought, ...mockData]);

    } catch (error) {
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer account?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success('Customer removed');
      fetchCustomers();
    } catch (error) {
      toast.error('Failed to remove customer');
    }
  };

  const toggleStatus = async (user) => {
    try {
      const newStatus = user.is_active ? 0 : 1;
      await api.patch(`/admin/users/${user.id}`, { is_active: newStatus });
      toast.success(`User ${newStatus ? 'activated' : 'deactivated'}`);
      fetchCustomers();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

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
    
    // Find assigned agent (mocking this as the first agent for now if they have policies)
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
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Client Management</h1>
        <p className="text-slate-500 font-bold">Super admin level customer oversight and control.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center justify-between"
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

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-emerald-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Global Client Base</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
              {loading ? 'Refreshing...' : `Managing ${data.length} registered customers`}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search accounts..." 
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
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="p-12 text-center font-bold text-slate-400">Loading customers...</td></tr>
              ) : filteredData.length === 0 ? (
                <tr><td colSpan="5" className="p-12 text-center font-bold text-slate-400">No customers found.</td></tr>
              ) : filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 font-bold text-slate-900">{item.full_name}</td>
                  <td className="px-8 py-6 font-bold text-slate-500">{item.email}</td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => toggleStatus(item)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${item.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}
                    >
                      {item.is_active ? 'Verified' : 'Deactivated'}
                    </button>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-400">{item.mobile || 'N/A'}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleViewProfile(item)}
                        className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all"
                        title="View Profile"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg transition-all"><MoreVertical className="w-5 h-5" /></button>
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
              className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 pb-0 flex justify-between items-start">
                <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600">
                  <User className="w-12 h-12" />
                </div>
                <button onClick={() => setIsProfileOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="p-10 space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{selectedCustomer.full_name}</h3>
                    <p className="text-emerald-600 font-black uppercase text-[10px] tracking-[0.2em] mt-1">Valued Customer</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Agent</p>
                    <p className="font-bold text-slate-900 flex items-center justify-end">
                      <Briefcase className="w-4 h-4 mr-2 text-emerald-500" />
                      {getCustomerStats(selectedCustomer).agentName}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                        <p className="font-bold text-slate-900">{selectedCustomer.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                        <PhoneIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Number</p>
                        <p className="font-bold text-slate-900">{selectedCustomer.mobile || 'Not Provided'}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Address</p>
                        <p className="font-bold text-slate-900 text-sm">{selectedCustomer.address || 'Plot 42, Sector 5, Mumbai, Maharashtra'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-[2.5rem] p-8 space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-emerald-500" />
                      Policy Statistics
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <span className="text-xs font-bold text-slate-500">Total Policies</span>
                        <span className="text-lg font-black text-slate-900">{getCustomerStats(selectedCustomer).total}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm">
                        <span className="text-xs font-bold text-emerald-600">Active</span>
                        <span className="text-lg font-black text-emerald-600">{getCustomerStats(selectedCustomer).active}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-rose-100 shadow-sm">
                        <span className="text-xs font-bold text-rose-500">Expired</span>
                        <span className="text-lg font-black text-rose-500">{getCustomerStats(selectedCustomer).expired}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer ID</span>
                    <span className="font-bold text-slate-900">#CUST-{selectedCustomer.id}</span>
                  </div>
                  <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${selectedCustomer.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {selectedCustomer.is_active ? 'Verified Account' : 'Deactivated'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerManagement;

