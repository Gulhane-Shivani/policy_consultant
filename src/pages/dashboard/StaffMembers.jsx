import React, { useState, useEffect } from 'react';
import { 
  UserCog, Users, Shield,
  ArrowUpRight, ArrowDownRight,
  MoreVertical, Trash2, CheckCircle, Search, Filter,
  Plus, X, Mail, Phone as PhoneIcon, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../utils/api';
import { toast } from 'react-hot-toast';

const StaffMembers = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'agent',
    mobile: ''
  });

  const [stats, setStats] = useState([
    { label: 'Total Staff', value: '0', change: 'Live', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Advisors', value: '0', change: 'Live', icon: UserCog, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Admins', value: '0', change: 'Live', icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]);

  useEffect(() => {
    // Update stats whenever data changes
    const advisorCount = data.filter(u => u.role === 'agent').length;
    const adminCount = data.filter(u => u.role === 'admin' || u.role === 'super_admin').length;
    
    setStats([
      { label: 'Total Staff', value: data.length.toString(), change: 'Live', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Advisors', value: advisorCount.toString(), change: 'Live', icon: UserCog, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { label: 'Admins', value: adminCount.toString(), change: 'Live', icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50' },
    ]);
  }, [data]);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      const staffOnly = (res.users || []).filter(u => u.role !== 'user');
      setData(staffOnly);
    } catch (error) {
      toast.error('Failed to load staff members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleAddStaff = async (e) => {
    e.preventDefault();
    if (newStaff.mobile.length !== 10) {
      toast.error('Mobile number must be exactly 10 digits');
      return;
    }
    try {
      await api.post('/admin/users', newStaff);
      toast.success('Staff member added successfully');
      setIsModalOpen(false);
      setNewStaff({ full_name: '', email: '', password: '', role: 'agent', mobile: '' });
      fetchStaff();
    } catch (error) {
      toast.error(error.message || 'Failed to add staff member');
    }
  };

  const handleDeleteStaff = async (id) => {
    if (!window.confirm('Are you sure you want to remove this staff member?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success('Staff member removed');
      fetchStaff();
    } catch (error) {
      toast.error('Failed to remove staff member');
    }
  };

  const toggleStatus = async (user) => {
    try {
      const newStatus = user.is_active ? 0 : 1;
      await api.patch(`/admin/users/${user.id}`, { is_active: newStatus });
      toast.success(`User ${newStatus ? 'activated' : 'deactivated'}`);
      fetchStaff();
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Staff Management</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Policy Consultant • Team Directory</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Staff</span>
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
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Staff Directory</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
              {loading ? 'Updating...' : `Managing ${data.length} staff members`}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search staff..." 
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
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="p-12 text-center font-bold text-slate-400">Loading staff data...</td></tr>
              ) : filteredData.length === 0 ? (
                <tr><td colSpan="5" className="p-12 text-center font-bold text-slate-400">No staff members found.</td></tr>
              ) : filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 font-bold text-slate-900">
                    <div>
                      <p>{item.full_name}</p>
                      <p className="text-[10px] text-slate-400 font-normal uppercase tracking-wider">{item.email}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      item.role === 'super_admin' ? 'bg-emerald-50 text-emerald-600' :
                      item.role === 'admin' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {item.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => toggleStatus(item)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${item.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}
                    >
                      {item.is_active ? 'Active' : 'Deactivated'}
                    </button>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-400">{item.mobile || 'N/A'}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => handleDeleteStaff(item.id)}
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

      {/* Add Staff Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden p-10"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Add Team Member</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleAddStaff} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      placeholder="Full Name" 
                      value={newStaff.full_name}
                      onChange={(e) => setNewStaff({...newStaff, full_name: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-bold text-slate-900"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="email" 
                      placeholder="Email Address" 
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-bold text-slate-900"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="password" 
                      placeholder="Temporary Password" 
                      value={newStaff.password}
                      onChange={(e) => setNewStaff({...newStaff, password: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-bold text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Mobile" 
                        value={newStaff.mobile}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, ''); // Only digits
                          if (val.startsWith('0')) return; // Cannot start with 0
                          if (val.length <= 10) {
                            setNewStaff({...newStaff, mobile: val});
                          }
                        }}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-bold text-slate-900"
                      />
                    </div>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <select 
                        value={newStaff.role}
                        onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-bold text-slate-900 appearance-none"
                      >
                        <option value="admin">Admin</option>
                        <option value="agent">Agent</option>
                        <option value="csr">CSR</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button className="w-full py-5 bg-emerald-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-900/20 mt-4">
                  Confirm Staff Registration
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StaffMembers;
