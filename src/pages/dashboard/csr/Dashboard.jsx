import React, { useState } from 'react';
import { 
  Search, LifeBuoy, 
  UserCircle, Phone,
  Mail, Clock, 
  ChevronRight, ArrowRight
} from 'lucide-react';

const CSRDashboard = () => {
  const [tasks] = useState([
    { id: 1, title: 'Callback: Sarah Jenkins', priority: 'High', time: '10:30 AM', type: 'Claim Follow-up' },
    { id: 2, title: 'Review: Policy Renewal #4829', priority: 'Medium', time: '11:15 AM', type: 'Renewal' },
    { id: 3, title: 'Email: Michael Scott', priority: 'Low', time: '01:00 PM', type: 'Query' },
    { id: 4, title: 'Verify: New User Docs', priority: 'High', time: '02:30 PM', type: 'Verification' },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">CSR Agent Hub</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Policy Consultant • Support Terminal</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status</p>
          <div className="flex items-center space-x-2 text-emerald-500 font-black text-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Online & Ready</span>
          </div>
        </div>
      </div>

      {/* Quick Search Section */}
      <div className="bg-emerald-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-black mb-2 tracking-tight">Customer 360° Search</h2>
          <p className="text-emerald-100 font-bold mb-6">Instantly access any customer profile by name, policy number, or email.</p>
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-400" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full pl-14 pr-4 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl outline-none focus:ring-4 focus:ring-white/10 transition-all font-bold placeholder:text-emerald-300"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-white text-emerald-600 rounded-xl font-black text-xs uppercase tracking-tighter hover:bg-emerald-50 transition-all">
              Quick Find
            </button>
          </div>
        </div>
        <UserCircle className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Tasks */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Today's Schedule</h3>
            <button className="text-emerald-600 font-black text-xs uppercase tracking-tighter hover:underline">Manage All</button>
          </div>
          <div className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <div key={task.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${task.priority === 'High' ? 'bg-rose-50 text-rose-500' : task.priority === 'Medium' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-600'}`}>
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{task.title}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{task.type} • {task.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${task.priority === 'High' ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-500'}`}>
                    {task.priority}
                  </span>
                  <button className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-slate-50/50 text-center">
            <button className="flex items-center space-x-2 mx-auto font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px]">
              <span>Load More Tasks</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quick Actions / Internal Support */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-900/20">
            <div className="flex items-center space-x-3 mb-6">
              <LifeBuoy className="w-6 h-6 text-emerald-400" />
              <h3 className="font-black uppercase tracking-widest text-xs">Internal Support</h3>
            </div>
            <p className="text-slate-400 font-bold text-sm mb-6">Need help with a complex policy? Request internal assistance.</p>
            <button className="w-full py-4 bg-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20">
              Open Support Ticket
            </button>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
            <h3 className="font-black uppercase tracking-widest text-xs text-slate-400 mb-6">Emergency Contacts</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200">
                    <Phone className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase">Underwriting</p>
                    <p className="text-[10px] font-bold text-slate-400 tracking-tighter">Ext: 402</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-300 hover:text-emerald-500">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200">
                    <Mail className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase">Claims Dept</p>
                    <p className="text-[10px] font-bold text-slate-400 tracking-tighter">claims@policyconsultant.com</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-300 hover:text-emerald-500">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSRDashboard;
