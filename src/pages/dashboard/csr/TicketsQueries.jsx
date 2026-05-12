import React, { useState } from 'react';
import { 
  HelpCircle, MessagesSquare, LifeBuoy,
  ArrowUpRight, ArrowDownRight,
  MoreVertical, Trash2, CheckCircle, Search, Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const TicketsQueries = () => {
  const [stats] = useState([
    { label: 'Open Tickets', value: '42', change: '+12.5%', icon: HelpCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Resolved Today', value: '18', change: '+5.2%', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg. Wait Time', value: '14m', change: '-2m', icon: MessagesSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
  ]);

  const [data] = useState([
    { id: 'TKT-101', client: 'Alice Freeman', subject: 'Login Issue', priority: 'High', status: 'Open' },
    { id: 'TKT-102', client: 'Bob Wilson', subject: 'Policy Update', priority: 'Medium', status: 'In Progress' },
    { id: 'TKT-103', client: 'Charlie Davis', subject: 'Payment Error', priority: 'Critical', status: 'Open' },
    { id: 'TKT-104', client: 'Diana Prince', subject: 'General Query', priority: 'Low', status: 'Resolved' },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Tickets & Queries</h1>
        <p className="text-slate-500 font-bold">Handle customer support tickets and general inquiries.</p>
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
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Support Queue</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Manage and resolve customer support requests</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search tickets..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all" />
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
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 font-bold text-slate-900">{item.id}</td>
                  <td className="px-8 py-6 font-bold text-slate-700">{item.client}</td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-900">{item.subject}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tighter ${item.priority === 'Critical' ? 'bg-rose-50 text-rose-600' : item.priority === 'High' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tighter ${item.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all"><CheckCircle className="w-5 h-5" /></button>
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

export default TicketsQueries;
