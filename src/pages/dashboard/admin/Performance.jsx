import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Target,
  ArrowUpRight, ArrowDownRight,
  MoreVertical, Trash2, CheckCircle, Search, Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const Performance = () => {
  const [stats] = useState([
    { label: 'Overall Target', value: '82%', change: '+5.4%', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Sales Growth', value: '12.5%', change: '+2.1%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg. Response', value: '4.2h', change: '-0.5h', icon: BarChart3, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]);

  const [data] = useState([
    { id: 1, member: 'John Smith', role: 'Senior Advisor', leads: '45', conversion: '12%', status: 'On Track' },
    { id: 2, member: 'Sarah Wilson', role: 'Advisor', leads: '38', conversion: '15%', status: 'Exceeding' },
    { id: 3, member: 'Mike Johnson', role: 'CSR', leads: '52', conversion: '8%', status: 'Below Target' },
    { id: 4, member: 'Emma Brown', role: 'Senior Advisor', leads: '41', conversion: '14%', status: 'On Track' },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Team Performance</h1>
        <p className="text-slate-500 font-bold">Analyze advisor and staff productivity and targets.</p>
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

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Staff Metrics</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Detailed performance breakdown by team member</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all" />
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
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Member</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Leads</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Conversion</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 font-bold text-slate-900">{item.member}</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-500">{item.role}</td>
                  <td className="px-8 py-6 font-bold text-slate-900">{item.leads}</td>
                  <td className="px-8 py-6 font-bold text-slate-900">{item.conversion}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tighter ${item.status === 'Exceeding' ? 'bg-emerald-50 text-emerald-600' : item.status === 'On Track' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all"><CheckCircle className="w-5 h-5" /></button>
                      <button className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-all"><Trash2 className="w-5 h-5" /></button>
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

export default Performance;
