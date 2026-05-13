import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, Calendar, ArrowUpRight, 
  ArrowDownRight, Search, Filter, Download, 
  CheckCircle2, Clock, AlertCircle, Landmark, Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';

const CommissionFinance = () => {
  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : null;
  });

  const [stats] = useState([
    { label: 'Total Earnings', value: '₹1,24,500', change: '+12.5%', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Payout', value: '₹12,800', change: 'Current Month', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Last Payout', value: '₹18,400', change: '15 May 2026', icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ]);

  const [commissions] = useState([
    { id: 'COM-8821', policy: 'POL-8901', client: 'Shivani Gulhane', amount: '₹1,200', rate: '10%', status: 'Paid', date: '2026-05-10' },
    { id: 'COM-8822', policy: 'POL-8905', client: 'Rahul Sharma', amount: '₹2,400', rate: '15%', status: 'Pending', date: '2026-05-12' },
    { id: 'COM-8823', policy: 'POL-8910', client: 'Amit Patel', amount: '₹950', rate: '10%', status: 'Paid', date: '2026-05-08' },
    { id: 'COM-8824', policy: 'POL-8915', client: 'Priya Singh', amount: '₹3,100', rate: '12%', status: 'Processing', date: '2026-05-13' },
  ]);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
            {user?.role === 'agent' ? 'My Commissions' : 'Commission & Finance'}
          </h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Earnings & Payout Oversight</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
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
              <div className={`flex items-center space-x-1 text-xs font-black ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'}`}>
                {stat.change.startsWith('+') && <ArrowUpRight className="w-4 h-4" />}
                <span>{stat.change}</span>
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
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Commission Reports</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Detailed breakdown of policy-based earnings</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search ID or Policy..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Commission ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy No.</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {commissions.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 font-bold text-slate-900">{item.id}</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-500">{item.policy}</td>
                  <td className="px-8 py-6 font-bold text-slate-700">{item.client}</td>
                  <td className="px-8 py-6">
                    <div>
                      <p className="font-black text-slate-900">{item.amount}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.rate} Commission</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                      item.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 
                      item.status === 'Processing' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right font-bold text-slate-500 text-sm">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-black tracking-tight mb-2">Payout Method</h3>
            <p className="text-slate-400 font-bold text-xs tracking-widest uppercase mb-8">Where you receive your funds</p>
            
            <div className="flex items-center space-x-6 bg-white/5 border border-white/10 p-6 rounded-3xl">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
                <Landmark className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">Primary Bank Account</p>
                <p className="text-lg font-black mt-1">HDFC BANK **** 8829</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Verified on 12 Jan 2024</p>
              </div>
            </div>

            <button className="mt-8 text-xs font-black text-emerald-400 uppercase tracking-widest hover:underline flex items-center">
              Update Payout Information
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        </div>

        <div className="bg-emerald-600 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-900/20 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black tracking-tight mb-2">Next Scheduled Payout</h3>
            <p className="text-emerald-100 font-bold text-xs tracking-widest uppercase mb-8">Automatic Monthly Settlement</p>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-black">20 May 2026</p>
              <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest mt-2">Expected Arrival: 2-3 Business Days</p>
            </div>
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center">
              <Calendar className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionFinance;
