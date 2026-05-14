import React, { useState } from 'react';
import { 
  ShieldAlert, Clock, CheckCircle, 
  Search, Filter, Plus, FileText, 
  User, ArrowUpRight, ChevronRight,
  Upload, MessageSquare, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const ClaimsSupport = () => {
  const [claims] = useState([
    { id: 'CLM-7821', customer: 'Sarah Jenkins', type: 'Health Claim', amount: 'Rs.45,000', status: 'In Review', date: '2024-05-12' },
    { id: 'CLM-7822', customer: 'Robert Fox', type: 'Motor Claim', amount: 'Rs.12,800', status: 'Pending Docs', date: '2024-05-13' },
    { id: 'CLM-7823', customer: 'Jane Cooper', type: 'Life Claim', amount: 'Rs.5,00,000', status: 'Processing', date: '2024-05-10' },
    { id: 'CLM-7824', customer: 'Michael Scott', type: 'Health Claim', amount: 'Rs.8,500', status: 'Completed', date: '2024-05-08' }
  ]);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Claims Support Terminal</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Assist customers with processing and status tracking</p>
        </div>
        <button className="flex items-center space-x-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20">
          <Plus className="w-5 h-5" />
          <span>New Claim Intake</span>
        </button>
      </div>

      {/* Claims Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending Review', value: '12', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Critical Claims', value: '04', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Settled Today', value: '08', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg. Cycle Time', value: '5.2d', icon: ShieldAlert, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center space-x-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-sm`}>
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

      {/* Claims Queue */}
      <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden">
        <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Claim ID or Customer..." 
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-600/5 transition-all font-bold text-slate-900 shadow-sm"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
              <Filter className="w-4 h-4 text-slate-400" />
              <span>Status</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Claim / Customer</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type & Amount</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Submitted Date</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-all">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">{claim.customer}</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{claim.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <p className="font-black text-slate-700 text-xs uppercase tracking-tight">{claim.type}</p>
                    <p className="text-sm font-black text-slate-900 mt-1">{claim.amount}</p>
                  </td>
                  <td className="px-10 py-8 text-center text-xs font-bold text-slate-500">{claim.date}</td>
                  <td className="px-10 py-8">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${claim.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : claim.status === 'In Review' ? 'bg-amber-50 text-amber-600' : claim.status === 'Processing' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600 animate-pulse'}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="p-3 hover:bg-emerald-50 text-emerald-600 rounded-xl transition-all border border-transparent hover:border-emerald-100 shadow-sm hover:shadow-emerald-100">
                        <Upload className="w-5 h-5" />
                      </button>
                      <button className="p-3 hover:bg-slate-900 text-white rounded-xl transition-all shadow-sm">
                        <ChevronRight className="w-5 h-5" />
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

export default ClaimsSupport;
