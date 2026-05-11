import React, { useState } from 'react';
import { 
  Cpu, HardDrive, Lock,
  ArrowUpRight, ArrowDownRight,
  MoreVertical, Trash2, CheckCircle, Search, Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const SystemConfig = () => {
  const [stats] = useState([
    { label: 'System Health', value: '99.9%', change: '+0.1%', icon: Cpu, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Storage Used', value: '1.2TB', change: '+12%', icon: HardDrive, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Security Alerts', value: '0', change: '0', icon: Lock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]);

  const [data] = useState([
    { id: 1, service: 'API Gateway', status: 'Operational', uptime: '100%', version: 'v2.4.1' },
    { id: 2, service: 'Database Cluster', status: 'Operational', uptime: '99.98%', version: 'v15.2' },
    { id: 3, service: 'Auth Service', status: 'Operational', uptime: '100%', version: 'v1.1.0' },
    { id: 4, service: 'Background Workers', status: 'Operational', uptime: '99.95%', version: 'v3.0.2' },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">System Configuration</h1>
        <p className="text-slate-500 font-bold">Low-level system parameters and technical configuration.</p>
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
              <div className={`flex items-center space-x-1 text-xs font-black text-emerald-500`}>
                <CheckCircle className="w-4 h-4" />
                <span>Healthy</span>
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
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Service Monitor</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Real-time status of backend services</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 transition-all">
              <span>Restart All</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Service</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Uptime</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Version</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 font-bold text-slate-900">{item.service}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-black uppercase tracking-tighter">{item.status}</span>
                  </td>
                  <td className="px-8 py-6 font-bold text-slate-900">{item.uptime}</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-400">{item.version}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg transition-all"><Cpu className="w-5 h-5" /></button>
                      <button className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg transition-all"><MoreVertical className="w-5 h-5" /></button>
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

export default SystemConfig;
