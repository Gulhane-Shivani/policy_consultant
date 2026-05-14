import React, { useState } from 'react';
import { 
  MessageSquare, Plus, Search, Filter, 
  Clock, CheckCircle, AlertCircle, 
  User, ChevronRight, MessageCircle,
  Tag, Flag, Send
} from 'lucide-react';
import { motion } from 'framer-motion';

const TicketsQueries = () => {
  const [tickets] = useState([
    { id: 'TKT-101', customer: 'Sarah Jenkins', subject: 'Address Update Failure', priority: 'High', status: 'Open', date: '2h ago' },
    { id: 'TKT-102', customer: 'Robert Fox', subject: 'Policy PDF not received', priority: 'Medium', status: 'In Progress', date: '5h ago' },
    { id: 'TKT-103', customer: 'Jane Cooper', subject: 'Nominee correction', priority: 'Low', status: 'Open', date: '1d ago' },
    { id: 'TKT-104', customer: 'Michael Scott', subject: 'Premium amount discrepancy', priority: 'High', status: 'Resolved', date: '2d ago' }
  ]);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Ticket Management</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Resolve customer service requests and complaints</p>
        </div>
        <button className="flex items-center space-x-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
          <Plus className="w-5 h-5 text-emerald-400" />
          <span>Log Service Request</span>
        </button>
      </div>

      {/* Ticket Pulse Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Unassigned', value: '08', icon: Flag, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Open Tickets', value: '24', icon: MessageCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Overdue SLA', value: '03', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Resolved Today', value: '15', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center space-x-4 group hover:border-emerald-600 transition-all">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tickets Interface */}
      <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Ticket ID, Customer, or Keyword..." 
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-600/5 transition-all font-bold text-slate-900 shadow-sm"
            />
          </div>
          <div className="flex items-center space-x-3">
             <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                <Tag className="w-4 h-4 text-slate-400" />
                <span>Categories</span>
             </button>
             <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                <Filter className="w-4 h-4 text-slate-400" />
                <span>Priority</span>
             </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-10 flex items-center justify-between hover:bg-slate-50/50 transition-all group cursor-pointer">
               <div className="flex items-center space-x-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${ticket.status === 'Open' ? 'bg-amber-50 border-amber-100 text-amber-600' : ticket.status === 'Resolved' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
                     <MessageSquare className="w-7 h-7" />
                  </div>
                  <div>
                     <div className="flex items-center space-x-4 mb-1">
                        <h4 className="font-black text-slate-900 uppercase tracking-tight text-lg">{ticket.subject}</h4>
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${ticket.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
                           {ticket.priority} Priority
                        </span>
                     </div>
                     <div className="flex items-center space-x-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center"><User className="w-3 h-3 mr-1.5" /> {ticket.customer}</span>
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1.5" /> Received {ticket.date}</span>
                        <span className="text-emerald-600 font-black">#{ticket.id}</span>
                     </div>
                  </div>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="text-right mr-6">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Status</p>
                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${ticket.status === 'Resolved' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'bg-slate-100 text-slate-600'}`}>
                        {ticket.status}
                     </span>
                  </div>
                  <button className="p-4 bg-slate-50 rounded-2xl text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
                     <ChevronRight className="w-6 h-6" />
                  </button>
               </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-slate-50/50 text-center border-t border-slate-100">
           <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-all flex items-center mx-auto space-x-2">
              <span>View Resolved Archive</span>
              <Send className="w-3 h-3" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default TicketsQueries;
