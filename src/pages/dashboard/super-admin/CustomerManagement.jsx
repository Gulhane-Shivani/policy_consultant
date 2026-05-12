import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Database,
  ArrowUpRight, ArrowDownRight,
  MoreVertical, Trash2, CheckCircle, Search, Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../utils/api';
import { toast } from 'react-hot-toast';

const CustomerManagement = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
      setData(customersOnly);
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
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
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
    </div>
  );
};

export default CustomerManagement;
