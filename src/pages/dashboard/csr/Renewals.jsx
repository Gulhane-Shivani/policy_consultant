import React, { useState } from 'react';
import { 
  RefreshCw, Calendar, Bell, 
  Send, Phone, User, 
  ChevronRight, ArrowUpRight, Clock,
  Filter, Download, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const Renewals = () => {
  const [renewals] = useState([
    { id: 1, customer: 'Sarah Jenkins', policy: 'Health Care Supreme', amount: 'Rs.8,500', dueDate: '2024-06-15', status: 'Due Soon', priority: 'High' },
    { id: 2, customer: 'Robert Fox', policy: 'Life Insurance Elite', amount: 'Rs.12,000', dueDate: '2024-06-20', status: 'Pending', priority: 'Medium' },
    { id: 3, customer: 'Jane Cooper', policy: 'Motor Secure', amount: 'Rs.5,200', dueDate: '2024-06-25', status: 'Pending', priority: 'Low' },
    { id: 4, customer: 'Guy Hawkins', type: 'Business Protect', amount: 'Rs.25,000', dueDate: '2024-07-02', status: 'Upcoming', priority: 'Low' }
  ]);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Renewal Management</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Retention Control & Follow-up Center</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/50">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
            <Send className="w-4 h-4 text-emerald-400" />
            <span>Bulk Reminders</span>
          </button>
        </div>
      </div>

      {/* Retention KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center justify-between overflow-hidden relative group">
          <div className="space-y-2 relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Renewal Rate</p>
            <h3 className="text-4xl font-black text-slate-900">88.5%</h3>
            <div className="flex items-center text-emerald-500 text-[10px] font-black uppercase">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +2.4% vs Last Month
            </div>
          </div>
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center relative z-10">
            <RefreshCw className="w-8 h-8 group-hover:rotate-180 transition-transform duration-700" />
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-50 rounded-full blur-2xl opacity-50" />
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center justify-between overflow-hidden relative group">
          <div className="space-y-2 relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Premiums</p>
            <h3 className="text-4xl font-black text-slate-900">156</h3>
            <div className="flex items-center text-rose-500 text-[10px] font-black uppercase">
              <Clock className="w-4 h-4 mr-1" />
              12 Overdue Items
            </div>
          </div>
          <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center relative z-10">
            <Calendar className="w-8 h-8" />
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-rose-50 rounded-full blur-2xl opacity-50" />
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center justify-between overflow-hidden relative group">
          <div className="space-y-2 relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reminders Sent</p>
            <h3 className="text-4xl font-black text-slate-900">1.2k</h3>
            <div className="flex items-center text-indigo-500 text-[10px] font-black uppercase">
              <Bell className="w-4 h-4 mr-1" />
              Automated Workflows
            </div>
          </div>
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center relative z-10">
            <Bell className="w-8 h-8" />
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50 rounded-full blur-2xl opacity-50" />
        </div>
      </div>

      {/* Renewal Queue */}
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:row justify-between items-center gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Active Renewal Queue</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Follow up with assigned customers to prevent lapses</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
              All Items
            </button>
            <button className="px-4 py-2 bg-white text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:bg-slate-50 transition-all">
              Assigned to Me
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Due Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {renewals.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-all">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors uppercase text-sm">{item.customer}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-700 text-xs uppercase tracking-tight">{item.policy}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-0.5">ID: #RE-{item.id}902</p>
                  </td>
                  <td className="px-8 py-6 font-black text-slate-900 text-sm">{item.amount}</td>
                  <td className="px-8 py-6 text-center">
                    <p className="font-bold text-slate-700 text-xs">{item.dueDate}</p>
                    <p className={`text-[9px] font-black uppercase mt-1 ${item.priority === 'High' ? 'text-rose-500' : 'text-slate-400'}`}>
                      {item.priority} Priority
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${item.status === 'Due Soon' ? 'bg-rose-50 text-rose-600' : item.status === 'Upcoming' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-xl transition-all border border-transparent hover:border-emerald-100">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-xl transition-all border border-transparent hover:border-indigo-100">
                        <Send className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200">
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                      </button>
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

export default Renewals;
