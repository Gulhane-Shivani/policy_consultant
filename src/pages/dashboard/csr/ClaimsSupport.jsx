import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Clock, CheckCircle, 
  Search, Filter, Plus, FileText, 
  User, ArrowUpRight, ChevronRight,
  Upload, MessageSquare, AlertCircle, ArrowLeft,
  DollarSign, MapPin, Calendar, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const ClaimsSupport = () => {
  const [view, setView] = useState('list'); // 'list', 'new', 'detail'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Persistence Logic
  const [claims, setClaims] = useState(() => {
    const saved = localStorage.getItem('csr_claims');
    return saved ? JSON.parse(saved) : [
      { id: 'CLM-7821', customer: 'Sarah Jenkins', type: 'Health Claim', amount: 'Rs.45,000', status: 'In Review', date: '2024-05-12', policyId: 'POL-8901' },
      { id: 'CLM-7822', customer: 'Robert Fox', type: 'Motor Claim', amount: 'Rs.12,800', status: 'Processing', date: '2024-05-13', policyId: 'POL-5562' },
      { id: 'CLM-7823', customer: 'Jane Cooper', type: 'Life Claim', amount: 'Rs.5,00,000', status: 'Processing', date: '2024-05-10', policyId: 'POL-1104' },
      { id: 'CLM-7824', customer: 'Michael Scott', type: 'Health Claim', amount: 'Rs.8,500', status: 'Completed', date: '2024-05-08', policyId: 'POL-4421' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('csr_claims', JSON.stringify(claims));
  }, [claims]);

  // Form State for New Claim
  const [newClaim, setNewClaim] = useState({
    customer: '',
    policyId: '',
    type: 'Health Claim',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleCreateClaim = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const claimToAdd = {
        ...newClaim,
        id: `CLM-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'In Review',
        amount: `Rs.${Number(newClaim.amount).toLocaleString()}`,
        history: [{ date: new Date().toLocaleDateString(), event: 'Claim Intake Created', user: 'System' }]
      };
      setClaims([claimToAdd, ...claims]);
      setIsSubmitting(false);
      setView('list');
      setStep(1);
      toast.success('Claim Intake Successful');
      setNewClaim({ customer: '', policyId: '', type: 'Health Claim', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
    }, 1500);
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         claim.policyId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (view === 'detail' && selectedClaim) {
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
                <h1 className="text-3xl font-black text-slate-900 leading-none">{selectedClaim.id}</h1>
                <p className="text-slate-500 font-bold text-[10px] mt-1">{selectedClaim.customer} • {selectedClaim.type}</p>
              </div>
           </div>
           <div className={`px-6 py-3 rounded-2xl font-black text-xs shadow-xl ${selectedClaim.status === 'Completed' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'}`}>
              {selectedClaim.status}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Left: Summary Cards */}
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-6">
                    <div>
                       <p className="text-[10px] font-black text-slate-400 mb-2">Policy Association</p>
                       <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <ShieldAlert className="w-6 h-6 text-indigo-600" />
                          <span className="font-black text-slate-900">{selectedClaim.policyId}</span>
                       </div>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 mb-2">Incident Date</p>
                       <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <Calendar className="w-6 h-6 text-slate-400" />
                          <span className="font-black text-slate-900">{selectedClaim.date}</span>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div>
                       <p className="text-[10px] font-black text-slate-400 mb-2">Claim Estimate</p>
                       <div className="p-6 bg-slate-900 rounded-3xl text-white">
                          <p className="text-[10px] font-black text-emerald-400 mb-1">Total Amount</p>
                          <h4 className="text-3xl font-black">{selectedClaim.amount}</h4>
                       </div>
                    </div>
                 </div>
                 <div className="md:col-span-2">
                    <p className="text-[10px] font-black text-slate-400 mb-4">Internal Narrative</p>
                    <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-sm font-bold text-slate-600 leading-relaxed">
                       {selectedClaim.description || 'No detailed description provided during intake. Investigation pending additional documentation from the policyholder.'}
                    </div>
                 </div>
              </div>

              {/* Interaction Timeline */}
              <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
                 <h3 className="text-sm font-black text-slate-900 mb-10">Claim Lifecycle Timeline</h3>
                 <div className="space-y-8 relative">
                    <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-slate-100" />
                    {(selectedClaim.history || [
                       { date: selectedClaim.date, event: 'Claim Submitted', user: 'Customer Portal' },
                       { date: '2024-05-14', event: 'Initial Documentation Review', user: 'CSR-Admin' }
                    ]).map((log, i) => (
                       <div key={i} className="flex items-start space-x-6 relative z-10">
                          <div className="w-12 h-12 rounded-2xl bg-white border-4 border-slate-50 flex items-center justify-center text-indigo-600 shadow-sm">
                             <Clock className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-xs font-black text-slate-900">{log.event}</p>
                             <p className="text-[10px] font-bold text-slate-400 mt-0.5">{log.date} • Handled by {log.user}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl">
                 <h4 className="font-black text-xs mb-6 flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    <span>Internal Note</span>
                 </h4>
                 <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-bold outline-none focus:bg-white/10 transition-all mb-4"
                    rows="4"
                    placeholder="Add an internal investigation note..."
                 ></textarea>
                 <button onClick={() => toast.success('Internal note saved to ledger')} className="w-full py-4 bg-emerald-600 rounded-xl font-black text-[10px] hover:bg-emerald-500 transition-all">
                    Save to Ledger
                 </button>
              </div>

              <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl">
                 <h4 className="font-black text-[10px] text-slate-400 mb-6">Critical Actions</h4>
                 <div className="space-y-3">
                    <button onClick={() => toast.error('Initiating Legal Investigation...')} className="w-full py-4 bg-rose-50 text-rose-600 rounded-2xl font-black text-[10px] hover:bg-rose-100 transition-all">
                       Flag for Fraud
                    </button>
                    <button onClick={() => toast.success('Approval request sent to Underwriter')} className="w-full py-4 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-[10px] hover:bg-indigo-100 transition-all">
                       Request Underwriter Approval
                    </button>
                 </div>
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
            <h1 className="text-3xl font-black text-slate-900 leading-none">New Claim Intake</h1>
            <p className="text-slate-500 font-bold text-[10px] mt-1">Guided Step-by-Step Processing</p>
          </div>
        </div>

        <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${step >= s ? 'bg-slate-900 text-white shadow-xl scale-110' : 'bg-slate-100 text-slate-400'}`}>
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`flex-1 h-1 mx-4 rounded-full transition-all ${step > s ? 'bg-slate-900' : 'bg-slate-100'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-slate-900">1. Customer Verification</h3>
                      <p className="text-xs font-bold text-slate-400">Identify the policyholder and active coverage</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 ml-1">Customer Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input 
                            type="text" 
                            placeholder="Sarah Jenkins"
                            value={newClaim.customer}
                            onChange={e => setNewClaim({...newClaim, customer: e.target.value})}
                            className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 ml-1">Policy Number</label>
                        <div className="relative">
                          <ShieldAlert className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input 
                            type="text" 
                            placeholder="POL-8901"
                            value={newClaim.policyId}
                            onChange={e => setNewClaim({...newClaim, policyId: e.target.value})}
                            className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end pt-4">
                      <button 
                        onClick={() => {
                          if(!newClaim.customer || !newClaim.policyId) return toast.error('Fill customer details');
                          setStep(2);
                        }}
                        className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-emerald-600 transition-all shadow-xl flex items-center space-x-2"
                      >
                        <span>Incident Details</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-slate-900">2. Incident Details</h3>
                      <p className="text-xs font-bold text-slate-400">Describe the nature and type of the claim</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 ml-1">Claim Type</label>
                        <select 
                          value={newClaim.type}
                          onChange={e => setNewClaim({...newClaim, type: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none appearance-none"
                        >
                          <option>Health Claim</option>
                          <option>Motor Claim</option>
                          <option>Life Claim</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 ml-1">Date of Incident</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input 
                            type="date" 
                            value={newClaim.date}
                            onChange={e => setNewClaim({...newClaim, date: e.target.value})}
                            className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 ml-1">Description</label>
                      <textarea 
                        rows="3"
                        value={newClaim.description}
                        onChange={e => setNewClaim({...newClaim, description: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none"
                        placeholder="Explain the incident..."
                      ></textarea>
                    </div>
                    <div className="flex justify-between pt-4">
                      <button onClick={() => setStep(1)} className="px-10 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs hover:bg-slate-200 transition-all">
                        Back
                      </button>
                      <button 
                        onClick={() => setStep(3)}
                        className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-emerald-600 transition-all shadow-xl flex items-center space-x-2"
                      >
                        <span>Financial Review</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4 text-center">
                      <h3 className="text-xl font-black text-slate-900">3. Financial Assessment</h3>
                      <p className="text-xs font-bold text-slate-400">Confirm claim amount and finalize intake</p>
                    </div>
                    
                    <div className="max-w-md mx-auto p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6 shadow-2xl">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-emerald-400">Estimate Amount (INR)</label>
                          <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-500" />
                            <input 
                              type="number" 
                              placeholder="45000"
                              value={newClaim.amount}
                              onChange={e => setNewClaim({...newClaim, amount: e.target.value})}
                              className="w-full pl-12 pr-6 py-6 bg-white/10 border border-white/10 rounded-3xl font-black text-white outline-none focus:bg-white/20 text-2xl transition-all"
                            />
                          </div>
                       </div>
                       <div className="pt-4 border-t border-white/10">
                          <div className="flex justify-between text-[10px] font-black text-slate-400">
                             <span>Final Settlement Mode</span>
                             <span className="text-white">Bank Transfer</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex justify-between pt-8">
                      <button onClick={() => setStep(2)} className="px-10 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs hover:bg-slate-200 transition-all">
                        Back
                      </button>
                      <button 
                        onClick={handleCreateClaim}
                        disabled={isSubmitting}
                        className="px-12 py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-xs hover:bg-emerald-500 transition-all shadow-2xl flex items-center space-x-3 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            <span>Confirm & Open Claim</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
               <div className="relative z-10">
                  <h4 className="font-black uppercase tracking-widest text-xs mb-4 text-emerald-400">Intake Guidelines</h4>
                  <p className="text-[11px] font-bold text-slate-400 leading-relaxed">Ensure all data matches the master policy record to prevent automatic rejection by the underwriting engine.</p>
               </div>
               <ShieldAlert className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
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
          <h1 className="text-3xl font-black text-slate-900 leading-none">Claims Support Terminal</h1>
          <p className="text-slate-500 font-bold text-[10px] mt-1">Assist customers with processing and status tracking</p>
        </div>
        <button 
          onClick={() => setView('new')}
          className="flex items-center space-x-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-emerald-600 transition-all shadow-xl active:scale-95"
        >
          <Plus className="w-5 h-5 text-emerald-400" />
          <span>New Claim Intake</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending Review', value: claims.filter(c => c.status === 'In Review').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Critical Claims', value: '04', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Settled Today', value: claims.filter(c => c.status === 'Completed').length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg. Cycle Time', value: '5.2d', icon: ShieldAlert, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center space-x-4 hover:border-emerald-500 transition-colors cursor-default">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 leading-none">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden">
        <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Claim ID, Customer, or Policy..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-600/5 transition-all font-bold text-slate-900 shadow-sm"
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-white p-1 rounded-2xl border border-slate-200 flex items-center space-x-1">
              {['All', 'In Review', 'Completed', 'Processing'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${statusFilter === status ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                >
                  {status}
                </button>
              ))}
            </div>
            <button className="flex items-center justify-center w-12 h-12 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400">Claim / Customer</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400">Type & Policy</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 text-right">Amount</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400">Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-all shadow-sm">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm">{claim.customer}</h4>
                        <p className="text-[10px] font-black text-slate-400 mt-0.5">{claim.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <p className="font-black text-slate-700 text-xs">{claim.type}</p>
                    <p className="text-[10px] font-black text-slate-400 mt-1">Policy: {claim.policyId || 'N/A'}</p>
                  </td>
                  <td className="px-10 py-8 text-right font-black text-slate-900 text-sm">{claim.amount}</td>
                  <td className="px-10 py-8">
                    <select 
                      value={claim.status}
                      onChange={(e) => {
                        const nextStatus = e.target.value;
                        const updatedClaims = claims.map(c => 
                          c.id === claim.id ? { ...c, status: nextStatus } : c
                        );
                        setClaims(updatedClaims);
                        toast.success(`Claim ${claim.id} updated to ${nextStatus}`);
                      }}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black outline-none border-none cursor-pointer transition-all ${
                        claim.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                        claim.status === 'In Review' ? 'bg-amber-50 text-amber-600' : 
                        claim.status === 'Processing' ? 'bg-indigo-50 text-indigo-600' : 
                        'bg-rose-50 text-rose-600'
                      }`}
                    >
                      <option value="In Review">In Review</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => {
                          setSelectedClaim(claim);
                          setView('detail');
                        }}
                        className="p-3 bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white rounded-xl transition-all shadow-sm active:scale-90"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClaims.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-10 py-20 text-center text-slate-400 font-bold text-xs">
                    No claims match your search or filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClaimsSupport;
