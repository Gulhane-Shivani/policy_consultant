import React, { useState } from 'react';
import { 
  Users, TrendingUp, Target, 
  Award, Briefcase, FileText,
  PieChart, Phone, Calendar,
  ArrowUpRight, ChevronRight,
  UserCheck, DollarSign, Zap,
  Clock, Star, Shield
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';

const AgentDashboard = () => {
  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : { full_name: 'Agent' };
  });

  const performanceData = [
    { name: 'Mon', sales: 4, leads: 12 },
    { name: 'Tue', sales: 7, leads: 15 },
    { name: 'Wed', sales: 5, leads: 8 },
    { name: 'Thu', sales: 12, leads: 22 },
    { name: 'Fri', sales: 9, leads: 18 },
    { name: 'Sat', sales: 15, leads: 25 },
    { name: 'Sun', sales: 10, leads: 14 },
  ];

  const recentLeads = [
    { id: 1, name: 'Robert Fox', type: 'Life Insurance', status: 'Hot Lead', date: 'Just now' },
    { id: 2, name: 'Jane Cooper', type: 'Health Insurance', status: 'New', date: '25m ago' },
    { id: 3, name: 'Wade Warren', type: 'Car Insurance', status: 'Follow-up', date: '1h ago' },
    { id: 4, name: 'Guy Hawkins', type: 'Life Insurance', status: 'Hot Lead', date: '3h ago' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Advisor Portal</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Policy Consultant • Sales Performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="team" />
              </div>
            ))}
          </div>
          <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-black text-[10px] uppercase tracking-widest border border-emerald-100">
            Monthly Target: 75%
          </button>
        </div>
      </div>

      {/* Premium KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-emerald-500 flex items-center bg-emerald-50 px-2 py-1 rounded-lg">
                +12% <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active Leads</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tighter">24</h3>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
            <Target className="w-24 h-24 rotate-12" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-emerald-500 flex items-center bg-emerald-50 px-2 py-1 rounded-lg">
                +₹4k <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Commission</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tighter">₹48,250</h3>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
            <DollarSign className="w-24 h-24 rotate-12" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target: 20</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Policies Closed</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tighter">14</h3>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
            <Shield className="w-24 h-24 rotate-12" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">Avg 82%</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Conversion Rate</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tighter">76%</h3>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
            <TrendingUp className="w-24 h-24 rotate-12" />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Weekly Performance</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Sales vs Leads Overview</p>
            </div>
            <div className="flex space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-50 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">Sales</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-slate-400 rounded-full" />
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Leads</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#94A3B8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 900 }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', padding: '16px' }}
                  itemStyle={{ fontWeight: 900, fontSize: '12px', textTransform: 'uppercase' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="leads" stroke="#94A3B8" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hot Leads Summary */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <div>
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Hot Leads</h3>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Priority Follow-ups</p>
            </div>
            <Link to="/agent/leads" className="p-2 hover:bg-white rounded-xl transition-all shadow-sm">
              <ChevronRight className="w-5 h-5 text-emerald-600" />
            </Link>
          </div>
          <div className="flex-grow divide-y divide-slate-50">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all group cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 group-hover:bg-white group-hover:border-emerald-200 transition-all">
                    <UserCheck className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">{lead.name}</h4>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{lead.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${lead.status === 'Hot Lead' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-100 text-slate-500'}`}>
                    {lead.status}
                  </span>
                  <p className="text-[9px] font-bold text-slate-300 mt-1 flex items-center justify-end">
                    <Clock className="w-3 h-3 mr-1" />
                    {lead.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6">
            <Link to="/agent/leads" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-emerald-900/10 flex items-center justify-center space-x-2">
              <span>View Sales Pipeline</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Access & Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/agent/quotes" className="p-8 bg-emerald-600 rounded-[2.5rem] text-white flex flex-col justify-between group hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 overflow-hidden relative">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <h4 className="font-black text-lg tracking-tight">Quote Tool</h4>
            <p className="text-xs text-emerald-100 mt-1">Generate comparisons instantly</p>
          </div>
          <div className="mt-8 flex items-center text-[10px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform relative z-10">
            Open Tool <ArrowUpRight className="w-4 h-4 ml-2" />
          </div>
          <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
        </Link>

        <Link to="/agent/tasks" className="p-8 bg-slate-900 rounded-[2.5rem] text-white flex flex-col justify-between group hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 overflow-hidden relative">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/5">
              <Calendar className="w-6 h-6 text-emerald-400" />
            </div>
            <h4 className="font-black text-lg tracking-tight">Calendar</h4>
            <p className="text-xs text-slate-400 mt-1">Manage tasks & meetings</p>
          </div>
          <div className="mt-8 flex items-center text-[10px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform relative z-10">
            View Schedule <ArrowUpRight className="w-4 h-4 ml-2" />
          </div>
          <Calendar className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
        </Link>

        <Link to="/agent/activity" className="p-8 bg-white border border-slate-200 rounded-[2.5rem] text-slate-900 flex flex-col justify-between group hover:border-emerald-600 transition-all shadow-xl shadow-slate-200/50 overflow-hidden relative">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-emerald-50 transition-colors">
              <Clock className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
            </div>
            <h4 className="font-black text-lg tracking-tight">Activity Log</h4>
            <p className="text-xs text-slate-500 mt-1">Review interaction history</p>
          </div>
          <div className="mt-8 flex items-center text-[10px] font-black uppercase tracking-widest text-emerald-600 group-hover:translate-x-2 transition-transform relative z-10">
            Browse History <ArrowUpRight className="w-4 h-4 ml-2" />
          </div>
          <Clock className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-50 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
        </Link>
      </div>
    </div>
  );
};

export default AgentDashboard;
