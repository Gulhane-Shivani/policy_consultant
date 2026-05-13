import React, { useState } from 'react';
import { 
  MessageSquare, Phone, Send, Mail, Globe, Layout, Plus,
  ArrowUpRight, ArrowDownRight,
  MoreVertical, Trash2, CheckCircle, Search, Filter, ExternalLink, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const Communication = () => {
  const [stats] = useState([
    { label: 'Active Chats', value: '56', change: '+12.5%', icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Avg. Call Time', value: '5.2m', change: '-1.2m', icon: Phone, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Sent Messages', value: '1,284', change: '+8.1%', icon: Send, color: 'text-blue-600', bg: 'bg-blue-50' },
  ]);

  const [data] = useState([
    { id: 1, contact: 'John Doe', subject: 'Policy Query', lastMessage: 'Thanks for the help!', time: '2 mins ago' },
    { id: 2, contact: 'Jane Smith', subject: 'Claim Update', lastMessage: 'When will it be processed?', time: '1 hour ago' },
    { id: 3, contact: 'Robert Brown', subject: 'General Inquiry', lastMessage: 'I have a question about...', time: '3 hours ago' },
    { id: 4, contact: 'Emily Davis', subject: 'Feedback', lastMessage: 'Great service!', time: '5 hours ago' },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Communication Hub</h1>
        <p className="text-slate-500 font-bold">Manage internal and external communications.</p>
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
              <div className={`flex items-center space-x-1 text-xs font-black ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.change.startsWith('+') ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{stat.change} vs last month</span>
              </div>
            </div>
            <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon className="w-8 h-8" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Marketing & Website Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Email & SMS Campaigns */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Campaign Manager</h2>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Execute Email & SMS strategies</p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="p-6 bg-slate-50 border border-slate-100 rounded-3xl text-left hover:border-indigo-200 transition-all group">
              <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-black text-slate-900 text-sm">Email Campaign</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Design & Blast</p>
            </button>
            <button className="p-6 bg-slate-50 border border-slate-100 rounded-3xl text-left hover:border-emerald-200 transition-all group">
              <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-black text-slate-900 text-sm">SMS Campaign</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Direct Outreach</p>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Active Sequences</p>
            <div className="space-y-3">
              {[
                { name: 'Renewal Reminder Wave 2', reach: '450 users', performance: '18% CTR' },
                { name: 'New Year Health Promo', reach: '1.2k users', performance: '12% CTR' }
              ].map((c, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-700">{c.name}</span>
                  <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{c.performance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Website Updates */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Website Control</h2>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Manage site content & announcements</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center">
                  <Layout className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">Hero Banner Update</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Change homepage visuals</p>
                </div>
              </div>
              <button className="p-2 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-all">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">Quick News/Alerts</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Manage scroll news ticker</p>
                </div>
              </div>
              <button className="p-2 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-all">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Live Preview</p>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-xs font-medium text-slate-300">"Exclusive 15% discount on Car Insurance for existing members. Limited time offer!"</p>
              </div>
              <button className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all">
                Publish Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Conversations</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Monitor real-time communication activity</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search conversations..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all" />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Message</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 font-bold text-slate-900">{item.contact}</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-700">{item.subject}</td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-500 truncate max-w-[200px]">{item.lastMessage}</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-400">{item.time}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-all"><Send className="w-5 h-5" /></button>
                      <button className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-all"><Trash2 className="w-5 h-5" /></button>
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

export default Communication;
