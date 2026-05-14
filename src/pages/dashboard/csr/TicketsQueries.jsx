import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Plus, Search, Filter, 
  Clock, CheckCircle, AlertCircle, 
  User, ChevronRight, MessageCircle,
  Tag, Flag, Send, X, ArrowLeft, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const TicketsQueries = () => {
  const [view, setView] = useState('list'); // 'list' or 'new'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Persistence Logic
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('csr_tickets');
    return saved ? JSON.parse(saved) : [
      { id: 'TKT-101', customer: 'Sarah Jenkins', subject: 'Address Update Failure', priority: 'High', status: 'Open', date: '2h ago', category: 'Policy Correction' },
      { id: 'TKT-102', customer: 'Robert Fox', subject: 'Policy PDF not received', priority: 'Medium', status: 'In Progress', date: '5h ago', category: 'Document Request' },
      { id: 'TKT-103', customer: 'Jane Cooper', subject: 'Nominee correction', priority: 'Low', status: 'Open', date: '1d ago', category: 'General Query' },
      { id: 'TKT-104', customer: 'Michael Scott', subject: 'Premium amount discrepancy', priority: 'High', status: 'Resolved', date: '2d ago', category: 'Payment Issue' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('csr_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Form State
  const [newTicket, setNewTicket] = useState({
    customer: '',
    subject: '',
    category: 'General Query',
    priority: 'Medium',
    description: ''
  });

  const [step, setStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleCreateTicket = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const ticketToAdd = {
        ...newTicket,
        id: `TKT-${Math.floor(100 + Math.random() * 900)}`,
        status: 'Open',
        date: 'Just now',
        history: [{ date: new Date().toLocaleDateString(), event: 'Ticket Logged', user: 'CSR-Admin' }]
      };
      setTickets([ticketToAdd, ...tickets]);
      setIsSubmitting(false);
      setView('list');
      setStep(1);
      toast.success('Service Request Logged');
      setNewTicket({ customer: '', subject: '', category: 'General Query', priority: 'Medium', description: '' });
    }, 1500);
  };

  const filteredTickets = tickets.filter(ticket => 
    ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (view === 'detail' && selectedTicket) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 pb-12"
      >
        <div className="flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <button onClick={() => setView('list')} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm transition-all">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-black text-slate-900 leading-none">{selectedTicket.id}</h1>
                <p className="text-slate-500 font-bold text-[10px] mt-1">{selectedTicket.customer} • {selectedTicket.category}</p>
              </div>
           </div>
           <div className={`px-6 py-3 rounded-2xl font-black text-xs shadow-xl ${selectedTicket.status === 'Resolved' ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'}`}>
              {selectedTicket.status}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 space-y-10">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Subject</p>
                       <h3 className="text-2xl font-black text-slate-900 tracking-tight">{selectedTicket.subject}</h3>
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${selectedTicket.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
                       {selectedTicket.priority} Priority
                    </div>
                 </div>
                 
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Request Description</p>
                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-slate-600 font-bold leading-relaxed">
                       {selectedTicket.description || 'The customer has requested technical assistance regarding their policy portal. Initial triage suggests a synchronization error between the CRM and the client-facing dashboard.'}
                    </div>
                 </div>

                 {/* Interaction Log */}
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Internal Interaction History</p>
                    <div className="space-y-6">
                       {(selectedTicket.history || [
                          { date: selectedTicket.date, event: 'Ticket Created', user: 'CSR-Admin' }
                       ]).map((log, i) => (
                          <div key={i} className="flex items-center space-x-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                             <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                                <MessageCircle className="w-5 h-5" />
                             </div>
                             <div>
                                <p className="text-xs font-black text-slate-900">{log.event}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{log.date} • {log.user}</p>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl">
                 <h4 className="font-black text-xs mb-6 text-emerald-400">Response Console</h4>
                 <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-bold outline-none focus:bg-white/10 transition-all mb-4"
                    rows="6"
                    placeholder="Type the internal resolution or response..."
                 ></textarea>
                 <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => toast.success('Internal note saved')} className="py-4 bg-white/10 rounded-xl font-black text-[9px] hover:bg-white/20 transition-all">
                       Internal Note
                    </button>
                    <button onClick={() => toast.success('Response sent to customer')} className="py-4 bg-emerald-600 rounded-xl font-black text-[9px] hover:bg-emerald-500 transition-all">
                       Send to Customer
                    </button>
                 </div>
              </div>

              <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl space-y-4">
                 <h4 className="font-black text-[10px] text-slate-400 mb-2 text-center">Ticket Controls</h4>
                 <button onClick={() => toast.success('Escalated to Technical Dept')} className="w-full py-4 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-[10px] hover:bg-indigo-100 transition-all flex items-center justify-center space-x-2">
                    <Flag className="w-4 h-4" />
                    <span>Escalate to Dept</span>
                 </button>
                 <button onClick={() => toast.error('Ticket marked as Duplicate')} className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] hover:bg-slate-100 transition-all flex items-center justify-center space-x-2">
                    <X className="w-4 h-4" />
                    <span>Mark as Duplicate</span>
                 </button>
              </div>
           </div>
        </div>
      </motion.div>
    );
  }

  if (view === 'new') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8 pb-12"
      >
        <div className="flex items-center space-x-4">
          <button onClick={() => { setView('list'); setStep(1); }} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Log Service Request</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Guided Ticket Configuration</p>
          </div>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-center space-x-12 mb-12">
           {[1, 2, 3].map((s) => (
             <div key={s} className="flex flex-col items-center space-y-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black transition-all ${step >= s ? 'bg-slate-900 text-white shadow-2xl scale-110' : 'bg-slate-100 text-slate-400'}`}>
                   {step > s ? <Check className="w-6 h-6" /> : s}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${step >= s ? 'text-slate-900' : 'text-slate-300'}`}>
                   {s === 1 ? 'Identity' : s === 2 ? 'Category' : 'Details'}
                </span>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
               <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="t-step1"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      className="space-y-8"
                    >
                       <div className="space-y-2">
                          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">1. Customer Discovery</h3>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verify the customer requesting assistance</p>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Customer Identifier</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                            <input 
                              type="text" 
                              placeholder="Sarah Jenkins, CLM-7821 or Mobile..."
                              value={newTicket.customer}
                              onChange={e => setNewTicket({...newTicket, customer: e.target.value})}
                              className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all"
                            />
                          </div>
                       </div>
                       <div className="flex justify-end">
                          <button 
                            onClick={() => {
                              if(!newTicket.customer) return toast.error('Identify the customer first');
                              setStep(2);
                            }}
                            className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl flex items-center space-x-2"
                          >
                             <span>Categorize Request</span>
                             <ChevronRight className="w-4 h-4" />
                          </button>
                       </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="t-step2"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      className="space-y-8"
                    >
                       <div className="space-y-2">
                          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">2. Categorization</h3>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Define the urgency and type of service</p>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                            <select 
                              value={newTicket.category}
                              onChange={e => setNewTicket({...newTicket, category: e.target.value})}
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900"
                            >
                              <option>Policy Correction</option>
                              <option>Document Request</option>
                              <option>Payment Issue</option>
                              <option>General Query</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Priority Level</label>
                            <select 
                              value={newTicket.priority}
                              onChange={e => setNewTicket({...newTicket, priority: e.target.value})}
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900"
                            >
                              <option>Low</option>
                              <option>Medium</option>
                              <option>High</option>
                              <option>Critical</option>
                            </select>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Short Subject</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Address Update Failure"
                            value={newTicket.subject}
                            onChange={e => setNewTicket({...newTicket, subject: e.target.value})}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900"
                          />
                       </div>
                       <div className="flex justify-between">
                          <button onClick={() => setStep(1)} className="px-10 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200">
                             Back
                          </button>
                          <button 
                            onClick={() => {
                              if(!newTicket.subject) return toast.error('Subject is required');
                              setStep(3);
                            }}
                            className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl flex items-center space-x-2"
                          >
                             <span>Detailed Logs</span>
                             <ChevronRight className="w-4 h-4" />
                          </button>
                       </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="t-step3"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      className="space-y-8"
                    >
                       <div className="space-y-2">
                          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">3. Description & Logging</h3>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Finalize the service request details</p>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Explanation</label>
                          <textarea 
                            rows="5"
                            value={newTicket.description}
                            onChange={e => setNewTicket({...newTicket, description: e.target.value})}
                            className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] font-bold text-slate-900 outline-none"
                            placeholder="Type full details here..."
                          ></textarea>
                       </div>
                       <div className="flex justify-between pt-4">
                          <button onClick={() => setStep(2)} className="px-10 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200">
                             Back
                          </button>
                          <button 
                            onClick={handleCreateTicket}
                            className="px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-2xl flex items-center space-x-3"
                          >
                                <CheckCircle className="w-5 h-5" />
                                <span>Log Ticket in Queue</span>
                          </button>
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
               <div className="relative z-10">
                  <h4 className="font-black uppercase tracking-widest text-xs mb-4">SLA Guidelines</h4>
                  <ul className="space-y-4">
                    {[
                      { level: 'Critical', time: '4 Hours' },
                      { level: 'High', time: '12 Hours' },
                      { level: 'Medium', time: '24 Hours' },
                      { level: 'Low', time: '48 Hours' }
                    ].map((item, i) => (
                      <li key={i} className="flex justify-between items-center text-[11px] font-bold">
                        <span className="opacity-70">{item.level}</span>
                        <span className="bg-white/20 px-3 py-1 rounded-lg">{item.time}</span>
                      </li>
                    ))}
                  </ul>
               </div>
               <AlertCircle className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 rotate-12" />
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
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Ticket Management</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Resolve customer service requests and complaints</p>
        </div>
        <button 
          onClick={() => setView('new')}
          className="flex items-center space-x-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
        >
          <Plus className="w-5 h-5 text-emerald-400" />
          <span>Log Service Request</span>
        </button>
      </div>

      {/* Ticket Pulse Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Unassigned', value: tickets.filter(t => t.status === 'Open').length, icon: Flag, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'In Progress', value: tickets.filter(t => t.status === 'In Progress').length, icon: MessageCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Overdue SLA', value: '03', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Resolved Today', value: tickets.filter(t => t.status === 'Resolved').length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center space-x-4 group hover:border-emerald-600 transition-all">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tickets Interface */}
      <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Ticket ID, Customer, or Keyword..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all font-bold text-slate-900 shadow-sm"
            />
          </div>
          <div className="flex items-center space-x-3">
             <button onClick={() => toast.success('Opening Categories...')} className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                <Tag className="w-4 h-4 text-slate-400" />
                <span>Categories</span>
             </button>
             <button onClick={() => toast.success('Filtering by Priority...')} className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                <Filter className="w-4 h-4 text-slate-400" />
                <span>Priority</span>
             </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="p-10 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
               <div className="flex items-center space-x-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${ticket.status === 'Open' ? 'bg-amber-50 border-amber-100 text-amber-600' : ticket.status === 'Resolved' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
                     <MessageSquare className="w-7 h-7" />
                  </div>
                  <div>
                     <div className="flex items-center space-x-4 mb-1">
                        <h4 className="font-black text-slate-900 uppercase tracking-tight text-lg">{ticket.subject}</h4>
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${ticket.priority === 'High' ? 'bg-rose-50 text-rose-600' : ticket.priority === 'Critical' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                           {ticket.priority} Priority
                        </span>
                     </div>
                     <div className="flex items-center space-x-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center"><User className="w-3 h-3 mr-1.5" /> {ticket.customer}</span>
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1.5" /> {ticket.date}</span>
                        <span className="text-indigo-600 font-black">#{ticket.id}</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">{ticket.category}</span>
                     </div>
                  </div>
               </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right mr-6">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Status</p>
                     <select 
                        value={ticket.status}
                        onChange={(e) => {
                          const nextStatus = e.target.value;
                          const updatedTickets = tickets.map(t => 
                            t.id === ticket.id ? { ...t, status: nextStatus } : t
                          );
                          setTickets(updatedTickets);
                          toast.success(`Ticket ${ticket.id} updated to ${nextStatus}`);
                        }}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest outline-none border-none cursor-pointer transition-all ${
                           ticket.status === 'Resolved' ? 'bg-emerald-600 text-white shadow-lg' : 
                           ticket.status === 'Open' ? 'bg-amber-50 text-amber-600' : 
                           'bg-indigo-600 text-white shadow-lg'
                        }`}
                     >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                     </select>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setView('detail');
                    }}
                    className="p-4 bg-slate-50 rounded-2xl text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm"
                  >
                     <ChevronRight className="w-6 h-6" />
                  </button>
               </div>
            </div>
          ))}
          {filteredTickets.length === 0 && (
             <div className="p-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">No tickets match your search.</div>
          )}
        </div>

        <div className="p-8 bg-slate-50/50 text-center border-t border-slate-100">
           <button onClick={() => toast.success('Accessing Ticket Archive...')} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-all flex items-center mx-auto space-x-2">
              <span>View Resolved Archive</span>
              <Send className="w-3 h-3" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default TicketsQueries;
