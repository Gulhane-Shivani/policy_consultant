import React, { useState } from 'react';
import { 
  Activity, Phone, Mail, 
  MessageSquare, Users, FileText,
  Calendar, Clock, Search, Filter,
  ArrowUpRight, ChevronRight, MoreVertical,
  CheckCircle2, AlertCircle, RefreshCw
} from 'lucide-react';

const ActivityLog = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    { id: 1, type: 'call', customer: 'Robert Fox', detail: 'Outbound call - Policy discussion', duration: '5m 24s', time: '10:30 AM', status: 'completed' },
    { id: 2, type: 'email', customer: 'Jane Cooper', detail: 'Sent Health Insurance Quote #892', time: '09:15 AM', status: 'delivered' },
    { id: 3, type: 'meeting', customer: 'Wade Warren', detail: 'Proposal presentation at customer site', time: 'Yesterday', status: 'completed' },
    { id: 4, type: 'system', customer: 'Guy Hawkins', detail: 'Policy POL-7728 issued successfully', time: 'Yesterday', status: 'success' },
    { id: 5, type: 'message', customer: 'Esther Howard', detail: 'WhatsApp inquiry about claim process', time: '2 days ago', status: 'read' },
    { id: 6, type: 'call', customer: 'Jenny Wilson', detail: 'Follow-up call missed', time: '3 days ago', status: 'missed' },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
      case 'system': return <RefreshCw className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'success':
      case 'delivered': return 'text-emerald-600 bg-emerald-50';
      case 'missed': return 'text-rose-600 bg-rose-50';
      case 'read': return 'text-blue-600 bg-blue-50';
      default: return 'text-slate-500 bg-slate-50';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Activity Log</h1>
        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Timeline of your customer interactions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Summary Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Weekly Summary</h3>
            <div className="space-y-6">
              {[
                { label: 'Total Calls', value: '48', icon: Phone, color: 'text-blue-600' },
                { label: 'Emails Sent', value: '124', icon: Mail, color: 'text-emerald-600' },
                { label: 'Meetings', value: '12', icon: Calendar, color: 'text-orange-600' },
                { label: 'WhatsApp', value: '86', icon: MessageSquare, color: 'text-emerald-500' },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`${stat.color} p-2 rounded-lg bg-opacity-10`}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{stat.label}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{stat.value}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
              Download Full Report
            </button>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h4 className="font-black tracking-tight">Active Pulse</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your interaction volume is <span className="text-emerald-400 font-bold">15% higher</span> than last week. Great momentum!
            </p>
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search activity..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
            <div className="flex space-x-2">
              {['All', 'Calls', 'Emails', 'Meetings'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat.toLowerCase())}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat.toLowerCase() ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="divide-y divide-slate-50">
              {activities.map((act) => (
                <div key={act.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                  <div className="flex items-center space-x-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm transition-all group-hover:scale-110 ${getStatusColor(act.status)}`}>
                      {getIcon(act.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-black text-slate-900 tracking-tight">{act.customer}</h4>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{act.time}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">{act.detail}</p>
                      {act.duration && (
                        <div className="flex items-center space-x-1 mt-1 text-[9px] font-black text-slate-400 uppercase">
                          <Clock className="w-3 h-3" />
                          <span>Duration: {act.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getStatusColor(act.status)}`}>
                      {act.status}
                    </span>
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-all"><ChevronRight className="w-4 h-4 text-slate-300" /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-8 border-t border-slate-50 text-center">
              <button className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline flex items-center justify-center mx-auto space-x-2">
                <span>View Older Activity</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
