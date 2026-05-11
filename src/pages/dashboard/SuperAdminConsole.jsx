import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Users, Shield, 
  Settings, Database, Zap, 
  RefreshCw, ChevronRight, Activity
} from 'lucide-react';

const SuperAdminConsole = () => {
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
  ];

  const renewalData = [
    { name: 'Renewed', value: 75, color: '#4F46E5' },
    { name: 'Pending', value: 15, color: '#10B981' },
    { name: 'Expired', value: 10, color: '#F59E0B' },
  ];

  const growthData = [
    { name: 'Week 1', users: 120, agents: 40 },
    { name: 'Week 2', users: 150, agents: 45 },
    { name: 'Week 3', users: 180, agents: 50 },
    { name: 'Week 4', users: 240, agents: 60 },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Business Intelligence</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Master Console • Real-time Monitoring</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/50">
            <Database className="w-4 h-4 text-slate-400" />
            <span>System Audit</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-slate-800 transition-all shadow-xl shadow-indigo-900/20">
            <Zap className="w-4 h-4 text-indigo-400 fill-indigo-400" />
            <span>Live Reports</span>
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Revenue Stream</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Growth Performance</p>
            </div>
            <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black">+18.4%</div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 800, color: '#4F46E5' }}
                />
                <Area type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Renewal Pie Chart */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50 flex flex-col">
          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Renewal Rate</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Policy Lifecycle Status</p>
          </div>
          <div className="flex-grow flex items-center justify-center relative">
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black text-slate-900">84%</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Retention</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={renewalData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {renewalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {renewalData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs font-bold text-slate-500">{item.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Growth Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl shadow-indigo-900/20">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black tracking-tight">System Growth</h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Weekly User & Agent Onboarding</p>
            </div>
            <button className="p-3 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all">
              <RefreshCw className="w-5 h-5 text-indigo-400" />
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                   cursor={{ fill: '#1E293B', radius: 8 }}
                   contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '12px' }}
                />
                <Bar dataKey="users" fill="#6366F1" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="agents" fill="#10B981" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-indigo-600 p-8 rounded-[3rem] text-white flex flex-col justify-between relative overflow-hidden group">
            <Activity className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-500" />
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-indigo-100 uppercase tracking-widest mb-1">Security Score</p>
              <h3 className="text-4xl font-black">98.2%</h3>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[3rem] border border-slate-200 flex flex-col justify-between shadow-xl shadow-slate-200/50">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Staff Members</p>
              <h3 className="text-4xl font-black text-slate-900">42</h3>
            </div>
          </div>
          <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200 col-span-2 flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <Settings className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h4 className="font-black text-slate-900">System Configuration</h4>
                <p className="text-sm font-bold text-slate-500">Manage global app variables and API keys</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-600 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminConsole;
