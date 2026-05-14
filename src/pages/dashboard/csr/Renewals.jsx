import React, { useState } from 'react';
import { 
  RefreshCw, Calendar, Bell, 
  Send, Phone, User, 
  ChevronRight, ArrowUpRight, Clock,
  Filter, Download, CheckCircle, X,
  ArrowLeft, MessageSquare, ShieldAlert,
  CalendarCheck, DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Renewals = () => {
  const [view, setView] = useState('list'); // 'list' or 'detail'
  const [selectedRenewal, setSelectedRenewal] = useState(null);
  const [filter, setFilter] = useState('All');

  const [renewals, setRenewals] = useState([
    { id: 1, customer: 'Sarah Jenkins', policy: 'Health Care Supreme', amount: 'Rs.8,500', dueDate: '2024-06-15', status: 'Due Soon', priority: 'High', mobile: '9876543210', email: 'sarah.j@example.com' },
    { id: 2, customer: 'Robert Fox', policy: 'Life Insurance Elite', amount: 'Rs.12,000', dueDate: '2024-06-20', status: 'Pending', priority: 'Medium', mobile: '8877665544', email: 'robert.fox@example.com' },
    { id: 3, customer: 'Jane Cooper', policy: 'Motor Secure', amount: 'Rs.5,200', dueDate: '2024-06-25', status: 'Pending', priority: 'Low', mobile: '9988776655', email: 'jane.c@example.com' },
    { id: 4, customer: 'Guy Hawkins', policy: 'Business Protect', amount: 'Rs.25,000', dueDate: '2024-07-02', status: 'Upcoming', priority: 'Low', mobile: '7766554433', email: 'guy.h@example.com' }
  ]);

  if (view === 'detail' && selectedRenewal) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8 pb-12"
      >
        <div className="flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <button onClick={() => setView('list')} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm transition-all">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-black text-slate-900 leading-none">Renewal Detail</h1>
                <p className="text-slate-500 font-bold text-[10px] mt-1">{selectedRenewal.customer} • {selectedRenewal.policy}</p>
              </div>
           </div>
           <div className={`px-6 py-3 rounded-2xl font-black text-xs shadow-xl ${selectedRenewal.status === 'Due Soon' ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white'}`}>
              {selectedRenewal.status}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 space-y-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 mb-2">Renewal Deadline</p>
                          <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <CalendarCheck className="w-6 h-6 text-rose-500" />
                             <span className="font-black text-slate-900">{selectedRenewal.dueDate}</span>
                          </div>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 mb-2">Renewal Premium</p>
                          <div className="flex items-center space-x-3 p-4 bg-slate-900 rounded-2xl text-white">
                             <DollarSign className="w-6 h-6 text-emerald-400" />
                             <span className="text-2xl font-black">{selectedRenewal.amount}</span>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 mb-2">Contact Information</p>
                          <div className="space-y-3">
                             <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <Phone className="w-4 h-4 text-slate-400" />
                                <span className="font-bold text-slate-700 text-sm">{selectedRenewal.mobile}</span>
                             </div>
                             <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <Mail className="w-4 h-4 text-slate-400" />
                                <span className="font-bold text-slate-700 text-sm">{selectedRenewal.email}</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Retention Actions */}
                 <div className="pt-6 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 mb-6">Retention Actions Log</p>
                    <div className="space-y-4">
                       {[
                         { date: '2024-05-10', action: 'Automated SMS Reminder Sent', status: 'Delivered' },
                         { date: '2024-05-12', action: 'CSR Outbound Call', status: 'No Answer' }
                       ].map((log, i) => (
                         <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center space-x-4">
                               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                                  <Clock className="w-5 h-5" />
                               </div>
                               <div>
                                  <p className="text-xs font-black text-slate-900">{log.action}</p>
                                  <p className="text-[9px] font-bold text-slate-400">{log.date}</p>
                               </div>
                            </div>
                            <span className="text-[9px] font-black text-slate-400">{log.status}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl">
                 <h4 className="font-black text-xs mb-6 text-emerald-400 flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Follow-up Note</span>
                 </h4>
                 <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-bold outline-none focus:bg-white/10 transition-all mb-4"
                    rows="5"
                    placeholder="Record the customer's response or commitment..."
                 ></textarea>
                 <button onClick={() => toast.success('Note saved to interaction log')} className="w-full py-4 bg-indigo-600 rounded-xl font-black text-[10px] hover:bg-indigo-500 transition-all">
                    Save Interaction
                 </button>
              </div>

              <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl space-y-4">
                 <h4 className="font-black text-[10px] text-slate-400 mb-2">Outreach Controls</h4>
                 <button onClick={() => toast.success('Connecting Outbound Call...')} className="w-full py-4 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-[10px] flex items-center justify-center space-x-2 hover:bg-emerald-100 transition-all">
                    <Phone className="w-4 h-4" />
                    <span>Trigger Outbound Call</span>
                 </button>
                 <button onClick={() => toast.success('WhatsApp reminder sent')} className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-[10px] flex items-center justify-center space-x-2 hover:bg-slate-100 transition-all">
                    <Send className="w-4 h-4" />
                    <span>Send SMS/WhatsApp</span>
                 </button>
              </div>
           </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 pb-12 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 leading-none">Renewal Management</h1>
          <p className="text-slate-500 font-bold text-[10px] mt-1">Retention Control & Follow-up Center</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => toast.success('Filtering renewal queue...')} className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-[10px] hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/50">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filter</span>
          </button>
          <button 
            onClick={() => toast.success('Processing bulk reminders...')}
            className="flex items-center space-x-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-slate-800 transition-all shadow-xl active:scale-95"
          >
            <Send className="w-4 h-4 text-emerald-400" />
            <span>Bulk Reminders</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Renewal Rate', value: '88.5%', change: '+2.4%', icon: RefreshCw, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: 'up' },
          { label: 'Pending Premiums', value: '156', change: '12 Overdue', icon: Calendar, color: 'text-rose-600', bg: 'bg-rose-50', trend: 'down' },
          { label: 'Reminders Sent', value: '1.2k', change: 'Automated', icon: Bell, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: 'neutral' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center justify-between overflow-hidden relative group">
              <div className="space-y-2 relative z-10">
                <p className="text-[10px] font-black text-slate-400 leading-none">{stat.label}</p>
                <h3 className="text-4xl font-black text-slate-900">{stat.value}</h3>
                <div className={`flex items-center text-[10px] font-black ${stat.trend === 'up' ? 'text-emerald-500' : stat.trend === 'down' ? 'text-rose-500' : 'text-indigo-500'}`}>
                  {stat.trend === 'up' && <ArrowUpRight className="w-4 h-4 mr-1" />}
                  {stat.trend === 'down' && <Clock className="w-4 h-4 mr-1" />}
                  {stat.trend === 'neutral' && <Bell className="w-4 h-4 mr-1" />}
                  {stat.change}
                </div>
              </div>
              <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-3xl flex items-center justify-center relative z-10 shadow-inner group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8" />
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50 rounded-full blur-2xl opacity-50" />
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Active Renewal Queue</h2>
            <p className="text-xs font-bold text-slate-400">Follow up with assigned customers to prevent lapses</p>
          </div>
          <div className="flex items-center space-x-2 bg-white p-1 rounded-2xl border border-slate-200">
            {['All', 'Assigned'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${filter === type ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {type === 'All' ? 'All Items' : 'Assigned to Me'}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400">Customer</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400">Policy Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400">Premium</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 text-center">Due Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {renewals.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-all">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors text-sm">{item.customer}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-700 text-xs">{item.policy}</p>
                    <p className="text-[10px] font-black text-slate-400 mt-0.5">ID: #RE-{item.id}902</p>
                  </td>
                  <td className="px-8 py-6 font-black text-slate-900 text-sm">{item.amount}</td>
                  <td className="px-8 py-6 text-center">
                    <p className="font-bold text-slate-700 text-xs">{item.dueDate}</p>
                    <p className={`text-[9px] font-black mt-1 ${item.priority === 'High' ? 'text-rose-500' : 'text-slate-400'}`}>
                      {item.priority} Priority
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black ${item.status === 'Due Soon' ? 'bg-rose-50 text-rose-600' : item.status === 'Upcoming' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => { setSelectedRenewal(item); setView('detail'); }} className="p-3 bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white rounded-xl transition-all active:scale-90 shadow-sm">
                        <ChevronRight className="w-5 h-5" />
                      </button>
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

export default Renewals;
