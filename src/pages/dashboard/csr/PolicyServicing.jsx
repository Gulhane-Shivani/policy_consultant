import React, { useState, useEffect } from 'react';
import { 
  FileText, User, MapPin, 
  Phone, Mail, Heart, 
  Settings, RefreshCw, Download, 
  CheckCircle, Search, ArrowRight,
  ShieldCheck, AlertCircle, Edit3, X,
  ArrowLeft, ChevronRight, ShieldAlert,
  ArrowUpRight, Trash2, Zap, Layers,
  CheckCircle2, Clock, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const PolicyServicing = () => {
  const [view, setView] = useState('lookup'); // 'lookup', 'wizard'
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const [formData, setFormData] = useState({
    nomineeName: '',
    nomineeRelation: '',
    address: '',
    phone: '',
    email: '',
    selectedPlan: '',
    selectedRiders: [],
    cancellationReason: ''
  });

  const servicingCategories = [
    { id: 'nominee', name: 'Nominee Update', icon: Heart, desc: 'Modify beneficiary details' },
    { id: 'address', name: 'Address Change', icon: MapPin, desc: 'Update residential info' },
    { id: 'details', name: 'Profile Correction', icon: User, desc: 'Fix name or contact errors' },
    { id: 'upgrade', name: 'Plan Upgrade', icon: Zap, desc: 'Switch to a premium plan' },
    { id: 'riders', name: 'Add Riders', icon: Layers, desc: 'Enhance policy coverage' },
    { id: 'cancel', name: 'Cancellation', icon: Trash2, desc: 'Initiate policy termination', color: 'text-rose-600' }
  ];

  const handleSearch = () => {
    if (!searchQuery) return toast.error('Enter Policy ID or Mobile');
    setIsSearching(true);
    // Mock API Call
    setTimeout(() => {
      setSelectedPolicy({
        id: searchQuery.includes('POL') ? searchQuery : 'POL-8802',
        holder: 'Sarah Jenkins',
        mobile: '9876543210',
        plan: 'Star Health Optima',
        status: 'Active',
        expiry: '2025-12-14',
        premium: 'Rs.12,400/yr'
      });
      setIsSearching(false);
    }, 800);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setStep(1);
    setView('wizard');
  };

  const submitRequest = () => {
    toast.loading('Processing modification request...', { id: 'servicing' });
    setTimeout(() => {
      toast.success('Servicing Request Logged: Pending Underwriter Review', { id: 'servicing' });
      setView('lookup');
      setStep(1);
      setSelectedCategory(null);
    }, 2000);
  };

  if (view === 'wizard' && selectedPolicy) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 pb-12"
      >
        <div className="flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <button onClick={() => { setView('lookup'); setStep(1); }} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm transition-all">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-black text-slate-900 leading-none">{selectedCategory.name}</h1>
                <p className="text-slate-500 font-bold text-[10px] mt-1">Policy #{selectedPolicy.id} • Identity Verified</p>
              </div>
           </div>
           <div className="flex items-center space-x-3 bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span className="text-[10px] font-black text-slate-900">Step {step} of 3</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2">
              <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 min-h-[500px]">
                 <AnimatePresence mode="wait">
                    {step === 1 && (
                       <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                          <div className="flex items-center space-x-4 p-6 bg-slate-900 rounded-[2rem] text-white">
                             <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                             </div>
                             <div>
                                <h3 className="font-black text-sm">Identity Verification</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CSR must verify customer before modification</p>
                             </div>
                          </div>
                          <div className="space-y-6">
                             <div className="p-6 border-2 border-dashed border-slate-100 rounded-3xl space-y-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verification Checklist</p>
                                <div className="space-y-3">
                                   {['Confirm Policy Holder Name', 'Verify Registered Mobile Number', 'Confirm Last Premium Amount'].map((check, i) => (
                                      <label key={i} className="flex items-center space-x-3 group cursor-pointer">
                                         <div className="w-5 h-5 border-2 border-slate-200 rounded group-hover:border-indigo-500 transition-colors flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 bg-indigo-600 rounded-sm opacity-0 group-hover:opacity-10 transition-opacity" />
                                         </div>
                                         <span className="text-xs font-bold text-slate-600">{check}</span>
                                      </label>
                                   ))}
                                </div>
                             </div>
                          </div>
                          <div className="flex justify-end pt-8">
                             <button onClick={() => setStep(2)} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-indigo-600 transition-all shadow-xl flex items-center space-x-2">
                                <span>Verify & Continue</span>
                                <ArrowRight className="w-4 h-4" />
                             </button>
                          </div>
                       </motion.div>
                    )}

                    {step === 2 && (
                       <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                          <h3 className="text-xl font-black text-slate-900">Enter New Modification Data</h3>
                          
                          {selectedCategory.id === 'nominee' && (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                   <label className="text-[10px] font-black text-slate-400 ml-1">New Nominee Name</label>
                                   <input type="text" placeholder="Full Legal Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900" />
                                </div>
                                <div className="space-y-2">
                                   <label className="text-[10px] font-black text-slate-400 ml-1">Relationship</label>
                                   <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900">
                                      <option>Spouse</option>
                                      <option>Son</option>
                                      <option>Daughter</option>
                                      <option>Parent</option>
                                   </select>
                                </div>
                             </div>
                          )}

                          {selectedCategory.id === 'address' && (
                             <div className="space-y-6">
                                <div className="space-y-2">
                                   <label className="text-[10px] font-black text-slate-400 ml-1">New Residential Address</label>
                                   <textarea rows="4" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900" placeholder="Street, Building, City, State, Pincode"></textarea>
                                </div>
                             </div>
                          )}

                          {selectedCategory.id === 'upgrade' && (
                             <div className="space-y-6">
                                <label className="text-[10px] font-black text-slate-400 ml-1">Available Premium Plans</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   {['Gold Comprehensive (+Rs.2,400)', 'Platinum Global (+Rs.5,800)'].map((p, i) => (
                                      <div key={i} className="p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl hover:border-indigo-500 cursor-pointer transition-all">
                                         <p className="font-black text-slate-900 text-sm">{p}</p>
                                         <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Policy No Changes</p>
                                      </div>
                                   ))}
                                </div>
                             </div>
                          )}

                          {selectedCategory.id === 'cancel' && (
                             <div className="space-y-6">
                                <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl">
                                   <p className="text-[10px] font-black text-rose-600 mb-2">Warning: Irreversible Action</p>
                                   <p className="text-xs font-bold text-rose-500/80">Policy termination will result in loss of all accrued benefits and waiting periods. Pro-rata refund will be processed to the original payment source.</p>
                                </div>
                                <div className="space-y-2">
                                   <label className="text-[10px] font-black text-slate-400 ml-1">Reason for Cancellation</label>
                                   <textarea rows="3" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900" placeholder="Type customer justification..."></textarea>
                                </div>
                             </div>
                          )}

                          <div className="flex justify-between pt-8">
                             <button onClick={() => setStep(1)} className="px-10 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs hover:bg-slate-200 transition-all">
                                Back
                             </button>
                             <button onClick={() => setStep(3)} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-indigo-600 transition-all shadow-xl flex items-center space-x-2">
                                <span>Review Submission</span>
                                <ArrowRight className="w-4 h-4" />
                             </button>
                          </div>
                       </motion.div>
                    )}

                    {step === 3 && (
                       <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 text-center py-10">
                          <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                             <Edit3 className="w-10 h-10 text-indigo-600" />
                          </div>
                          <div>
                             <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Final Approval</h3>
                             <p className="text-xs font-bold text-slate-400 mt-2">Submit for Underwriter Review & Notification</p>
                          </div>
                          <div className="max-w-md mx-auto p-8 bg-slate-50 rounded-[3rem] border border-slate-100 text-left space-y-4">
                             <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-slate-400">Modification Type</span>
                                <span className="text-xs font-black text-slate-900">{selectedCategory.name}</span>
                             </div>
                             <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-slate-400">Processed By</span>
                                <span className="text-xs font-black text-indigo-600">CSR-RAVI</span>
                             </div>
                             <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-slate-400">SLA Deadline</span>
                                <span className="text-xs font-black text-slate-900">24 Hours</span>
                             </div>
                          </div>
                          <div className="flex justify-center space-x-4">
                             <button onClick={() => setStep(2)} className="px-10 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs hover:bg-slate-200 transition-all">
                                Adjust
                             </button>
                             <button onClick={submitRequest} className="px-12 py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-xs hover:bg-emerald-500 transition-all shadow-2xl flex items-center space-x-3">
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Submit Modification</span>
                             </button>
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                 <h4 className="font-black text-[10px] text-emerald-400 mb-4">Original Policy Context</h4>
                 <div className="space-y-4 relative z-10">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Current Plan</p>
                       <p className="text-sm font-black text-white mt-1">{selectedPolicy.plan}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Premium Load</p>
                       <p className="text-sm font-black text-white mt-1">{selectedPolicy.premium}</p>
                    </div>
                 </div>
                 <ShieldAlert className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              </div>

              <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl space-y-4">
                 <button onClick={() => toast.success('Original Policy Document Generated')} className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-[10px] hover:bg-slate-100 transition-all flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download Current Bond</span>
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
          <h1 className="text-3xl font-black text-slate-900 leading-none">Policy Servicing Terminal</h1>
          <p className="text-slate-500 font-bold text-[10px] mt-1">Manage existing policies and handle service requests</p>
        </div>
        <div className="flex items-center space-x-4 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
           <ShieldCheck className="w-5 h-5 text-emerald-600" />
           <span className="text-[10px] font-black text-slate-900">Secure Modification Channel</span>
        </div>
      </div>

      {!selectedPolicy ? (
        <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-2xl shadow-slate-200/50 flex flex-col items-center justify-center text-center">
           <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner text-slate-300">
              <Search className="w-10 h-10" />
           </div>
           <h2 className="text-2xl font-black text-slate-900 mb-4">Select Policy to Service</h2>
           <p className="text-xs font-bold text-slate-400 max-w-sm mb-10">Enter a valid Policy ID or registered mobile number to load the servicing terminal.</p>
           
           <div className="relative w-full max-w-lg">
              <input 
                type="text" 
                placeholder="Enter Policy ID or Mobile..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-32 py-6 bg-slate-50 border border-slate-200 rounded-3xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-emerald-600/5 transition-all text-lg"
              />
              <button 
                onClick={handleSearch}
                disabled={isSearching}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-emerald-600 transition-all flex items-center space-x-2"
              >
                {isSearching ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <ArrowRight className="w-4 h-4" />}
                <span>{isSearching ? 'Loading' : 'Load Terminal'}</span>
              </button>
           </div>
        </div>
      ) : (
        <div className="space-y-8">
           {/* Loaded Policy Header */}
           <div className="bg-slate-900 p-8 rounded-[3.5rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 flex items-center space-x-6">
                 <div className="w-20 h-20 rounded-[2rem] bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-emerald-600 transition-colors duration-500">
                    <User className="w-10 h-10 text-white" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black">{selectedPolicy.holder}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                       <span className="text-[10px] font-black text-emerald-400">ID: {selectedPolicy.id}</span>
                       <span className="w-1 h-1 bg-white/20 rounded-full" />
                       <span className="text-[10px] font-black text-slate-400">Plan: {selectedPolicy.plan}</span>
                    </div>
                 </div>
              </div>
              <div className="relative z-10 flex items-center space-x-4">
                 <div className="text-right mr-4">
                    <p className="text-[9px] font-black text-slate-400 mb-1">Policy Status</p>
                    <span className="px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black border border-emerald-500/30">Active</span>
                 </div>
                 <button onClick={() => setSelectedPolicy(null)} className="p-4 bg-white/10 hover:bg-rose-600 rounded-2xl transition-all">
                    <X className="w-6 h-6" />
                 </button>
              </div>
              <ShieldCheck className="absolute -left-6 -bottom-6 w-48 h-48 text-white/5 -rotate-12" />
           </div>

           {/* Servicing Categories */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicingCategories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat)}
                  className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50 text-left hover:border-indigo-500 hover:shadow-indigo-900/5 transition-all group flex flex-col justify-between h-[220px]"
                >
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${cat.color ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 shadow-sm'}`}>
                      <cat.icon className="w-8 h-8" />
                   </div>
                   <div>
                      <h4 className="text-lg font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{cat.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 leading-relaxed">{cat.desc}</p>
                   </div>
                </button>
              ))}
           </div>

           {/* Recent Interaction Status (Mock for the flow) */}
           <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="text-xs font-black text-slate-900 mb-8">Pending Servicing Requests for this Policy</h3>
              <div className="space-y-4">
                 {[
                   { type: 'Nominee Update', date: '2024-05-12', status: 'Approved', color: 'bg-emerald-50 text-emerald-600' },
                   { type: 'Address Change', date: '2024-05-14', status: 'Pending Review', color: 'bg-amber-50 text-amber-600' }
                 ].map((req, i) => (
                   <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center space-x-4">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                            <Clock className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-xs font-black text-slate-900">{req.type}</p>
                            <p className="text-[9px] font-bold text-slate-400 mt-0.5">{req.date}</p>
                         </div>
                      </div>
                      <div className="flex items-center space-x-4">
                         <span className={`px-4 py-1.5 rounded-full text-[9px] font-black ${req.color}`}>
                            {req.status}
                         </span>
                         <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><Eye className="w-5 h-5" /></button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default PolicyServicing;
