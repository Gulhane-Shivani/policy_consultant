import React, { useState } from 'react';
import { 
  Users, MessageSquare, FileCheck, 
  ArrowUpRight, ArrowDownRight,
  MoreVertical, Trash2, CheckCircle, Search, Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminOverview = () => {
  const [stats] = useState([
    { label: 'Total Applications', value: '1,284', change: '+12.5%', icon: FileCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Users', value: '8,432', change: '+8.2%', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'New Messages', value: '156', change: '-3.1%', icon: MessageSquare, color: 'text-orange-600', bg: 'bg-orange-50' },
  ]);

  const [recentMessages] = useState([
    { id: 1, sender: 'Alex Johnson', type: 'Life Insurance', status: 'Pending', date: '2 mins ago' },
    { id: 2, sender: 'Sarah Williams', type: 'Car Insurance', status: 'Resolved', date: '1 hour ago' },
    { id: 3, sender: 'Michael Brown', type: 'Health Insurance', status: 'Pending', date: '3 hours ago' },
    { id: 4, sender: 'Emma Davis', type: 'Business Insurance', status: 'Pending', date: '5 hours ago' },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Operations Overview</h1>
        <p className="text-slate-500 font-bold">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
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

      {/* Main Content Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Inquiries</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Manage incoming customer requests</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sender</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Insurance Type</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Received</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentMessages.map((msg) => (
                <tr key={msg.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 font-black text-sm">
                        {msg.sender.charAt(0)}
                      </div>
                      <p className="font-bold text-slate-900">{msg.sender}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-black uppercase tracking-tighter">
                      {msg.type}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-500">
                    {msg.date}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tighter ${msg.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all" title="Resolve">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-all" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg transition-all">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex justify-center">
          <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">
            View All Inquiries
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
