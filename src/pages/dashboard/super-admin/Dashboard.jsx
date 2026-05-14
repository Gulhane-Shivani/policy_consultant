import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Users, Shield, 
  Settings, Database, Zap, 
  RefreshCw, ChevronRight, Activity,
  FileCheck, Clock, AlertCircle, DollarSign, ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const revenueData = [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 48000 },
    { name: 'Apr', revenue: 61000 },
    { name: 'May', revenue: 55000 },
    { name: 'Jun', revenue: 67000 },
  ];

  const policyGrowthData = [
    { name: 'Jan', policies: 120 },
    { name: 'Feb', policies: 180 },
    { name: 'Mar', policies: 250 },
    { name: 'Apr', policies: 310 },
    { name: 'May', policies: 380 },
    { name: 'Jun', policies: 450 },
  ];

  const renewalSuccessData = [
    { name: 'Success', value: 85, color: '#10B981' },
    { name: 'Failed', value: 15, color: '#EF4444' },
  ];

  const stats = [
    { label: 'Total Customer', value: '2,845', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Policies', value: '1,420', icon: FileCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Renewal Due', value: '156', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Expired Policies', value: '42', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Total Revenue', value: '₹42.8L', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Requests', value: '28', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Business Intelligence</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Policy Consultant • Executive Dashboard</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/super-admin/policies/new')}
            className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/50"
          >
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Add New Policy</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/50">
            <Database className="w-4 h-4 text-slate-400" />
            <span>Audit Logs</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20">
            <Zap className="w-4 h-4 text-white" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col justify-between"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1: Revenue & Policy Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Graph */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Monthly Revenue</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Financial Performance Overview</p>
            </div>
            <div className="flex items-center text-emerald-600 font-black text-sm bg-emerald-50 px-3 py-1 rounded-lg">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              12.4%
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Policy Growth Graph */}
        <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl shadow-emerald-900/10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black tracking-tight">Policy Growth</h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">New Policies Acquisition</p>
            </div>
            <div className="w-10 h-10 bg-emerald-600/20 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={policyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 700 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="policies" stroke="#10B981" strokeWidth={4} dot={{ fill: '#10B981', r: 6 }} activeDot={{ r: 8, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Renewal Success Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Renewal Success Rate</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Retention Performance</p>
          </div>
          <div className="h-64 flex items-center justify-center relative">
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black text-slate-900">85%</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Success</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={renewalSuccessData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {renewalSuccessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-500">Successful</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-500">Failed</span>
            </div>
          </div>
        </div>

        {/* Placeholder for additional content or shortcuts */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-600 p-8 rounded-[3rem] text-white relative overflow-hidden group flex flex-col justify-between shadow-2xl shadow-emerald-900/20">
             <Activity className="absolute -right-4 -bottom-4 w-40 h-40 text-white/10 group-hover:scale-110 transition-transform duration-700" />
             <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
             </div>
             <div>
                <p className="text-sm font-bold text-emerald-100 uppercase tracking-widest mb-1">System Health</p>
                <h3 className="text-4xl font-black">Stable</h3>
                <div className="flex items-center mt-4 space-x-2">
                   <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                   <span className="text-xs font-bold text-emerald-50">99.9% Uptime</span>
                </div>
             </div>
          </div>
          
          <div className="bg-white p-8 rounded-[3rem] border border-slate-200 flex flex-col justify-between shadow-xl shadow-slate-200/50">
             <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                   <Users className="w-7 h-7 text-emerald-600" />
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Staff</p>
                   <p className="text-3xl font-black text-slate-900">42</p>
                </div>
             </div>
             <div className="space-y-4">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
                </div>
                <p className="text-xs font-bold text-slate-500">Capacity utilization at 85%</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
