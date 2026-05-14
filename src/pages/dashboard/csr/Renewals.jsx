import React, { useState } from 'react';
import { 
  RefreshCw, Calendar, Bell, 
  Send, Phone, User, 
  ChevronRight, ArrowUpRight, Clock, Search,
  Filter, Download, CheckCircle, X,
  ArrowLeft, MessageSquare, ShieldAlert,
  CalendarCheck, DollarSign, CreditCard,
  Zap, AlertCircle, History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Renewals = () => {
  const [view, setView] = useState('list'); // 'list' or 'detail'
  const [selectedRenewal, setSelectedRenewal] = useState(null);
  const [filter, setFilter] = useState('All');
  const [isProcessing, setIsProcessing] = useState(false);

  const getRelativeDate = (daysOffset) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toISOString().split('T')[0];
  };

  const [renewals, setRenewals] = useState([
    { 
      id: 1, 
      customer: 'Sarah Jenkins', 
      policy: 'Health Care Supreme', 
      amount: '8,500', 
      dueDate: getRelativeDate(-5), 
      status: 'Expired', 
      priority: 'High', 
      mobile: '9876543210', 
      email: 'sarah.j@example.com',
      paymentStatus: 'Pending',
      interactionHistory: [
        { date: getRelativeDate(-10), action: 'System Reminder Sent', status: 'Delivered' },
        { date: getRelativeDate(-5), action: 'CSR Initial Call', status: 'No Answer' }
      ]
    },
    { 
      id: 2, 
      customer: 'Robert Fox', 
      policy: 'Life Insurance Elite', 
      amount: '12,000', 
      dueDate: getRelativeDate(3), 
      status: 'Due Soon', 
      priority: 'High', 
      mobile: '8877665544', 
      email: 'robert.fox@example.com',
      paymentStatus: 'Pending',
      interactionHistory: []
    },
    { 
      id: 3, 
      customer: 'Jane Cooper', 
      policy: 'Motor Secure', 
      amount: '5,200', 
      dueDate: getRelativeDate(15), 
      status: 'Pending', 
      priority: 'Medium', 
      mobile: '9988776655', 
      email: 'jane.c@example.com',
      paymentStatus: 'Awaiting Verification',
      interactionHistory: [
        { date: getRelativeDate(-1), action: 'Customer Confirmed Renewal', status: 'Payment Link Sent' }
      ]
    },
    { 
      id: 4, 
      customer: 'Guy Hawkins', 
      policy: 'Business Protect', 
      amount: '25,000', 
      dueDate: getRelativeDate(45), 
      status: 'Upcoming', 
      priority: 'Low', 
      mobile: '7766554433', 
      email: 'guy.h@example.com',
      paymentStatus: 'Pending',
      interactionHistory: []
    }
  ]);

  const calculateDaysLeft = (date) => {
    const diff = new Date(date) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const getNewExpiryDate = (currentDueDate) => {
    const date = new Date(currentDueDate);
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split('T')[0];
  };

  const handleCompleteRenewal = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const updatedRenewals = renewals.map(r => 
        r.id === selectedRenewal.id 
          ? { ...r, status: 'Renewed', paymentStatus: 'Paid', dueDate: getNewExpiryDate(r.dueDate) } 
          : r
      );
      setRenewals(updatedRenewals);
      setIsProcessing(false);
      setView('list');
      toast.success(`Policy for ${selectedRenewal.customer} successfully renewed for 1 year!`);
    }, 2000);
  };

  const addInteraction = (action) => {
    const log = { date: new Date().toLocaleDateString(), action, status: 'Completed' };
    const updated = renewals.map(r => 
      r.id === selectedRenewal.id 
        ? { ...r, interactionHistory: [log, ...r.interactionHistory] } 
        : r
    );
    setRenewals(updated);
    setSelectedRenewal({ ...selectedRenewal, interactionHistory: [log, ...selectedRenewal.interactionHistory] });
    toast.success(`Action logged: ${action}`);
  };

  if (view === 'detail' && selectedRenewal) {
    const daysLeft = calculateDaysLeft(selectedRenewal.dueDate);
    
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
                <h1 className="text-3xl font-black text-slate-900 leading-none">Renewal Center</h1>
                <p className="text-slate-500 font-bold text-[10px] mt-1">{selectedRenewal.customer} • ID: #RE-{selectedRenewal.id}902</p>
              </div>
           </div>
           <div className={`px-6 py-3 rounded-2xl font-black text-xs shadow-xl flex items-center space-x-2 ${daysLeft < 0 ? 'bg-rose-900 text-white' : daysLeft < 7 ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white'}`}>
              <Clock className="w-4 h-4" />
              <span>{daysLeft < 0 ? `Expired ${Math.abs(daysLeft)} Days Ago` : `${daysLeft} Days Remaining`}</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Core Renewal Progress */}
              <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
                 <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-black text-slate-900 flex items-center">
                       <Zap className="w-6 h-6 mr-3 text-emerald-500" />
                       Renewal Workflow
                    </h3>
                    <div className="flex items-center space-x-2">
                       <span className={`w-3 h-3 rounded-full ${selectedRenewal.paymentStatus === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment: {selectedRenewal.paymentStatus}</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Renewal Terms</p>
                       <div className="space-y-4">
                          <div className="flex justify-between items-end">
                             <span className="text-xs font-bold text-slate-500">Current Expiry</span>
                             <span className="font-black text-slate-900">{selectedRenewal.dueDate}</span>
                          </div>
                          <div className="flex justify-between items-end">
                             <span className="text-xs font-bold text-slate-500">Premium Due</span>
                             <span className="text-2xl font-black text-slate-900">₹{selectedRenewal.amount}</span>
                          </div>
                          <div className="flex justify-between items-end pt-4 border-t border-slate-200">
                             <span className="text-xs font-bold text-emerald-600">New Expiry (Est.)</span>
                             <span className="font-black text-emerald-600">{getNewExpiryDate(selectedRenewal.dueDate)}</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <button 
                        onClick={() => addInteraction('Customer Identity Verified')}
                        className="w-full p-5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between group hover:border-emerald-500 transition-all"
                       >
                          <div className="flex items-center space-x-4">
                             <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                                <User className="w-5 h-5" />
                             </div>
                             <span className="text-xs font-black text-slate-700">Verify Identity</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-slate-200 group-hover:text-emerald-500" />
                       </button>
                       <button 
                        onClick={() => addInteraction('Renewal Confirmed by Client')}
                        className="w-full p-5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between group hover:border-indigo-500 transition-all"
                       >
                          <div className="flex items-center space-x-4">
                             <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <ShieldAlert className="w-5 h-5" />
                             </div>
                             <span className="text-xs font-black text-slate-700">Confirm Renewal</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-slate-200 group-hover:text-indigo-500" />
                       </button>
                       <button 
                        onClick={() => addInteraction('Payment Verification Complete')}
                        className="w-full p-5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between group hover:border-amber-500 transition-all"
                       >
                          <div className="flex items-center space-x-4">
                             <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                                <CreditCard className="w-5 h-5" />
                             </div>
                             <span className="text-xs font-black text-slate-700">Verify Payment</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-slate-200 group-hover:text-amber-500" />
                       </button>
                    </div>
                 </div>

                 <div className="mt-10">
                    <button 
                      onClick={handleCompleteRenewal}
                      disabled={isProcessing}
                      className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-50"
                    >
                       {isProcessing ? (
                         <RefreshCw className="w-6 h-6 animate-spin" />
                       ) : (
                         <>
                           <RefreshCw className="w-6 h-6" />
                           <span>Complete Renewal & Update Expiry</span>
                         </>
                       )}
                    </button>
                 </div>
              </div>

              {/* Interaction History */}
              <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
                 <div className="flex justify-between items-center mb-10">
                    <h3 className="text-sm font-black text-slate-900 flex items-center">
                       <History className="w-5 h-5 mr-3 text-slate-400" />
                       Reminder & Outreach History
                    </h3>
                 </div>
                 <div className="space-y-4">
                    {selectedRenewal.interactionHistory.map((log, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                         <div className="flex items-center space-x-6">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                               <Clock className="w-5 h-5" />
                            </div>
                            <div>
                               <p className="text-sm font-black text-slate-900">{log.action}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.date} • CSR-Admin</p>
                            </div>
                         </div>
                         <span className="text-[10px] font-black text-emerald-600 px-3 py-1 bg-emerald-50 rounded-lg">{log.status}</span>
                      </div>
                    ))}
                    {selectedRenewal.interactionHistory.length === 0 && (
                      <div className="p-10 text-center border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-400 font-bold text-xs">No prior outreach recorded.</div>
                    )}
                 </div>
              </div>
           </div>

           {/* Right: Contact & Notes */}
           <div className="space-y-8">
              <div className="bg-slate-900 p-8 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                 <h4 className="font-black text-xs mb-8 text-emerald-400 uppercase tracking-widest">Outreach Terminal</h4>
                 <div className="space-y-4 relative z-10">
                    <button onClick={() => { toast.success('Connecting Outbound Line...'); addInteraction('CSR Call - Connected'); }} className="w-full py-5 bg-white/10 hover:bg-emerald-600 border border-white/10 rounded-2xl font-black text-xs flex items-center justify-center space-x-3 transition-all">
                       <Phone className="w-5 h-5" />
                       <span>Direct Call: {selectedRenewal.mobile}</span>
                    </button>
                    <button onClick={() => { toast.success('WhatsApp Reminder Sent'); addInteraction('Sent WhatsApp Reminder'); }} className="w-full py-5 bg-white/10 hover:bg-indigo-600 border border-white/10 rounded-2xl font-black text-xs flex items-center justify-center space-x-3 transition-all">
                       <Send className="w-5 h-5" />
                       <span>Send WhatsApp Link</span>
                    </button>
                 </div>
                 <AlertCircle className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              </div>

              <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-xl">
                 <h4 className="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-6">Interaction Notes</h4>
                 <textarea 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition-all mb-4"
                    rows="6"
                    placeholder="Capture customer concerns, payment dates, or commitment to renew..."
                 ></textarea>
                 <button onClick={() => toast.success('Note attached to renewal file')} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] hover:bg-emerald-600 transition-all">
                    Save Internal Note
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
          <h1 className="text-3xl font-black text-slate-900 leading-none uppercase tracking-tighter">Renewal Management</h1>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1">Expiring Policy Retention Terminal</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => toast.success('Opening Advanced Filters...')} className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-[10px] hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/50">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filter List</span>
          </button>
          <button 
            onClick={() => toast.success('Processing Automated Reminders...')}
            className="flex items-center space-x-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
          >
            <Send className="w-4 h-4 text-emerald-400" />
            <span>Bulk Outreach</span>
          </button>
        </div>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Retention Target', value: '92%', change: '+1.5%', icon: RefreshCw, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Critically Overdue', value: '14', change: 'Immediate Action', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Pending Payments', value: '28', change: 'Verification Req.', icon: CreditCard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center justify-between group hover:border-emerald-500 transition-all">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
                <span className={`text-[9px] font-black ${stat.color} uppercase mt-1 inline-block`}>{stat.change}</span>
              </div>
              <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Queue */}
      <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Expiring Policies Queue</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Policies with less than 60 days of coverage</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search customer or policy..." className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-slate-900/5 font-bold text-xs" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase">Customer / Policy</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase text-center">Countdown</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase text-right">Premium Due</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase">Payment Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {renewals.map((item) => {
                const days = calculateDaysLeft(item.dueDate);
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-sm">{item.customer}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{item.policy}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <div className={`inline-flex flex-col items-center px-4 py-2 rounded-2xl border ${days < 0 ? 'bg-rose-900 border-rose-950 text-white' : days < 7 ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-slate-50 border-slate-100 text-slate-900'}`}>
                        <span className="text-lg font-black">{days < 0 ? 'EXP' : days}</span>
                        <span className="text-[8px] font-black uppercase tracking-widest">{days < 0 ? `${Math.abs(days)}d Over` : 'Days Left'}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right font-black text-slate-900 text-sm">₹{item.amount}</td>
                    <td className="px-10 py-8">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        item.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 
                        item.paymentStatus === 'Awaiting Verification' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {item.paymentStatus}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button 
                        onClick={() => { setSelectedRenewal(item); setView('detail'); }}
                        className="p-4 bg-slate-50 text-slate-300 hover:bg-slate-900 hover:text-white rounded-2xl transition-all shadow-sm active:scale-95"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Renewals;
