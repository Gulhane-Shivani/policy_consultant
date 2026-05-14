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

        {/* Premium Operations Modules */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* System Status Card - Dark Glass Aesthetic */}
          <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white relative overflow-hidden group flex flex-col justify-between shadow-2xl shadow-emerald-900/20">
            <div className="absolute top-0 right-0 p-10 opacity-20 group-hover:opacity-40 transition-opacity">
              <Shield className="w-32 h-32 rotate-12" />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-3xl flex items-center justify-center backdrop-blur-md">
                  <Activity className="w-8 h-8 text-emerald-400 animate-pulse" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    All Systems Live
                  </span>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-4xl font-black tracking-tight">System Health</h3>
                <div className="flex items-center mt-2 space-x-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]"></div>
                  <p className="text-xl font-bold text-slate-300">Stable & Secure</p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Uptime</p>
                <p className="text-lg font-black text-white">99.98%</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Latency</p>
                <p className="text-lg font-black text-white">24ms</p>
              </div>
            </div>
          </div>
          
          {/* Active Staff Card - Modern Workforce View */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                <Users className="w-8 h-8" />
              </div>
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${i+20}`} alt="staff" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-white bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white shadow-sm">
                  +38
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Staff</p>
              <div className="flex items-baseline space-x-3">
                <h3 className="text-5xl font-black text-slate-900 tracking-tighter">42</h3>
                <span className="text-sm font-black text-emerald-500">8 Online Now</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">In-Field Efficiency</p>
                <p className="text-xs font-black text-slate-900">85%</p>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-50">
                <div className="h-full bg-indigo-600 w-[85%] rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"></div>
              </div>
              <p className="text-[9px] font-bold text-slate-400 text-center uppercase tracking-tighter">High capacity utilization detected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
