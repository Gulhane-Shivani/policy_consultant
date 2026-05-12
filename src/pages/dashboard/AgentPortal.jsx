import React, { useState } from 'react';
import { 
  Users, TrendingUp, Target, 
  Award, Briefcase, FileText,
  PieChart, Phone, Calendar,
  ArrowUpRight, ChevronRight,
  UserCheck, DollarSign
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const AgentPortal = () => {
  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : { full_name: 'Agent' };
  });

  const performanceData = [
    { name: 'Mon', sales: 4000, leads: 2400 },
    { name: 'Tue', sales: 3000, leads: 1398 },
    { name: 'Wed', sales: 2000, leads: 9800 },
    { name: 'Thu', sales: 2780, leads: 3908 },
    { name: 'Fri', sales: 1890, leads: 4800 },
    { name: 'Sat', sales: 2390, leads: 3800 },
    { name: 'Sun', sales: 3490, leads: 4300 },
  ];

  const recentLeads = [
    { id: 1, name: 'Robert Fox', type: 'Life Insurance', status: 'Follow-up', date: '2 hours ago' },
    { id: 2, name: 'Esther Howard', type: 'Health Elite', status: 'Hot Lead', date: '5 hours ago' },
    { id: 3, name: 'Jenny Wilson', type: 'Motor Policy', status: 'Qualified', date: '1 day ago' },
    { id: 4, name: 'Guy Hawkins', type: 'Home Guard', status: 'Closed', date: '2 days ago' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Agent Performance Hub</h1>
          <p className="text-slate-500 font-bold">Welcome back, {user.full_name.split(' ')[0]}. Here is your sales activity.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center space-x-4 shadow-sm">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Rank</p>
              <p className="text-sm font-black text-slate-900">#4 in Branch</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-black text-emerald-500 flex items-center">
              +12% <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Leads</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">24</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-xs font-black text-emerald-500 flex items-center">
              +5.4% <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Commission</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">₹48,250</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Target: 20</span>
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Policies Closed</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">14</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs font-black text-orange-500">Avg 82%</span>
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Conversion Rate</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">76%</h3>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Sales vs Leads</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekly Performance Overview</p>
            </div>
            <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-emerald-600/20">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="leads" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Hot Leads</h3>
            <button className="text-emerald-600 font-black text-xs uppercase tracking-tighter hover:underline">View All</button>
          </div>
          <div className="flex-grow divide-y divide-slate-100">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all group cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 group-hover:bg-white group-hover:border-emerald-200 transition-all">
                    <UserCheck className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{lead.name}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lead.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${lead.status === 'Hot Lead' ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-500'}`}>
                    {lead.status}
                  </span>
                  <p className="text-[10px] font-bold text-slate-300 mt-1">{lead.date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6">
            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-emerald-900/10 flex items-center justify-center space-x-2">
              <span>Add New Lead</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-emerald-600 rounded-3xl text-white flex items-center justify-between group cursor-pointer hover:bg-emerald-700 transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-black tracking-tight">Schedule Meeting</h4>
              <p className="text-xs text-emerald-100">Set follow-up reminders</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/50 group-hover:translate-x-1 transition-transform" />
        </div>

        <div className="p-6 bg-slate-900 rounded-3xl text-white flex items-center justify-between group cursor-pointer hover:bg-slate-800 transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-black tracking-tight">Call Center</h4>
              <p className="text-xs text-slate-400">Launch softphone dialer</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/50 group-hover:translate-x-1 transition-transform" />
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-3xl text-slate-900 flex items-center justify-between group cursor-pointer hover:border-emerald-600 transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
              <Briefcase className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <h4 className="font-black tracking-tight">Lead Resources</h4>
              <p className="text-xs text-slate-500">Sales decks & materials</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-600 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default AgentPortal;
