import React, { useState } from 'react';
import { 
  Users, UserPlus, Search, Filter, 
  MoreVertical, Mail, Phone, Calendar,
  ArrowUpRight, Clock, Target, CheckCircle2,
  AlertCircle, Star, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Leads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);

  const leadsData = [
    { id: 1, name: 'Robert Fox', email: 'robert.fox@example.com', phone: '+91 98765 43210', type: 'Life Insurance', status: 'Hot', lastContact: '2h ago', priority: 'High', source: 'Website' },
    { id: 2, name: 'Jane Cooper', email: 'jane.c@gmail.com', phone: '+91 91234 56789', type: 'Health Insurance', status: 'Warm', lastContact: '1d ago', priority: 'Medium', source: 'Referral' },
    { id: 3, name: 'Wade Warren', email: 'wade.w@outlook.com', phone: '+91 88888 77777', type: 'Car Insurance', status: 'Cold', lastContact: '3d ago', priority: 'Low', source: 'Cold Call' },
    { id: 4, name: 'Guy Hawkins', email: 'guy.h@yahoo.com', phone: '+91 77777 66666', type: 'Business Insurance', status: 'Hot', lastContact: 'Just now', priority: 'High', source: 'Direct' },
    { id: 5, name: 'Esther Howard', email: 'esther.h@example.com', phone: '+91 99999 00000', type: 'Life Insurance', status: 'New', lastContact: '5h ago', priority: 'Medium', source: 'Website' },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'hot': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'warm': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'cold': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'new': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const filteredLeads = leadsData.filter(lead => 
    (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     lead.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || lead.status.toLowerCase() === filterStatus.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">My Leads</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Manage and Track Your Sales Pipeline</p>
        </div>
        <button className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center space-x-2">
          <UserPlus className="w-4 h-4" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Stats Mini Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Hot Leads', value: '12', icon: Star, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Follow-ups Today', value: '8', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'New This Week', value: '24', icon: ArrowUpRight, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Conv. Rate', value: '18%', icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-xl font-black text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search leads by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
          />
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          {['All', 'Hot', 'Warm', 'Cold', 'New'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status.toLowerCase())}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${filterStatus === status.toLowerCase() ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Insurance Type</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Activity</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedLead(lead)}>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 group-hover:bg-white transition-all">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{lead.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">{lead.type}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{lead.lastContact}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all"><Phone className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-all"><Mail className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg transition-all"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Reminder Modal/Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black uppercase tracking-widest text-xs">Follow-up Reminders</h3>
            <button className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:underline">View Calendar</button>
          </div>
          <div className="space-y-4">
            {[
              { time: '10:30 AM', name: 'Robert Fox', task: 'Policy Document Review' },
              { time: '02:15 PM', name: 'Jane Cooper', task: 'Health Plan Comparison' },
            ].map((rem, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm">{rem.name}</h4>
                    <span className="text-[9px] font-black text-slate-500 uppercase">{rem.time}</span>
                  </div>
                  <p className="text-xs text-slate-400">{rem.task}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black uppercase tracking-widest text-xs text-slate-900">Lead Conversion Tips</h3>
            <AlertCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              Research shows that responding to new leads within <span className="text-emerald-600 font-bold">5 minutes</span> increases conversion rates by up to <span className="text-emerald-600 font-bold">9x</span>.
            </p>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">Top Performer Hack</h4>
              <p className="text-xs text-emerald-800 font-medium">Use the "Quote Comparison" tool to show value across multiple insurers during your first call.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
