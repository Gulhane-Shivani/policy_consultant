import React, { useState } from 'react';
import { 
  BarChart3, PieChart, TrendingUp, 
  Users, CheckCircle, Clock, 
  Calendar, Download, Filter, 
  ArrowUpRight, Target, Briefcase
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart as RechartsPie, Pie
} from 'recharts';
import { motion } from 'framer-motion';

const CSRReports = () => {
  const serviceStats = [
    { name: 'Resolved', value: 142, color: '#10B981' },
    { name: 'Pending', value: 28, color: '#F59E0B' },
    { name: 'Escalated', value: 8, color: '#EF4444' }
  ];

  const weeklyLoad = [
    { name: 'Mon', tasks: 45 },
    { name: 'Tue', tasks: 52 },
    { name: 'Wed', tasks: 48 },
    { name: 'Thu', tasks: 61 },
    { name: 'Fri', tasks: 55 },
    { name: 'Sat', tasks: 32 },
    { name: 'Sun', tasks: 12 },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Service Analytics</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Personal Performance & Task Insight</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/50">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>This Month</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Customers Served', value: '1.2k', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg. Resolution', value: '4.2h', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Target Met', value: '92%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Policies Updated', value: '456', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 group hover:border-emerald-600 transition-all">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                <Icon className="w-7 h-7" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task Volume Chart */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-xl">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Service Volume</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Daily interaction load across 7 days</p>
            </div>
            <TrendingUp className="w-6 h-6 text-emerald-500" />
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyLoad}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 900 }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#F8FAFC' }}
                />
                <Bar dataKey="tasks" fill="#10B981" radius={[12, 12, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resolution Pie */}
        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-xl">
          <div className="mb-10">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Resolution Mix</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Task status distribution</p>
          </div>
          <div className="h-64 relative">
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-slate-900">178</span>
                <span className="text-[10px] font-black text-slate-400 uppercase">Total</span>
             </div>
             <ResponsiveContainer width="100%" height="100%">
               <RechartsPie>
                 <Pie
                    data={serviceStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                 >
                    {serviceStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                 </Pie>
                 <Tooltip />
               </RechartsPie>
             </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-8">
            {serviceStats.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{item.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSRReports;
