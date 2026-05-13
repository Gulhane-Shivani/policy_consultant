import React, { useState } from 'react';
import { 
  ShieldAlert, Plus, Search, Filter, 
  ChevronRight, Clock, CheckCircle, XCircle,
  FileText, Upload, AlertCircle, X, Send,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const CustomerClaims = () => {
  const [claimsList, setClaimsList] = useState([
    { id: 'CLM-102', policy: 'Care Supreme Discounted', date: '2024-02-10', amount: '₹45,000', status: 'Settled', type: 'Medical' },
    { id: 'CLM-105', policy: 'Motor Secure Plus', date: '2024-05-01', amount: '₹12,000', status: 'Under Review', type: 'Accident' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    policy: 'Care Supreme Discounted',
    type: 'Medical',
    amount: '',
    description: '',
  });

  const handleTrack = (claim) => {
    setSelectedClaim(claim);
    setIsTrackModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newClaim = {
        id: `CLM-${Math.floor(100 + Math.random() * 900)}`,
        policy: formData.policy,
        date: new Date().toISOString().split('T')[0],
        amount: `₹${Number(formData.amount).toLocaleString()}`,
        status: 'Under Review',
        type: formData.type
      };
      
      setClaimsList([newClaim, ...claimsList]);
      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({ policy: 'Care Supreme Discounted', type: 'Medical', amount: '', description: '' });
      toast.success('Claim Filed Successfully!');
    }, 2000);
  };

  const getTrackingSteps = (status) => {
    if (status === 'Settled') {
      return [
        { label: 'Claim Submitted', date: 'Feb 10, 2024', done: true },
        { label: 'Documents Verified', date: 'Feb 12, 2024', done: true },
        { label: 'Under Investigation', date: 'Feb 15, 2024', done: true },
        { label: 'Final Decision', date: 'Settled on Feb 20', done: true },
      ];
    }
    return [
      { label: 'Claim Submitted', date: 'May 01, 2026', done: true },
      { label: 'Documents Verified', date: 'May 03, 2026', done: true },
      { label: 'Under Investigation', date: 'In Progress', done: false },
      { label: 'Final Decision', date: 'Awaiting Outcome', done: false },
    ];
  };

  const currentSteps = selectedClaim ? getTrackingSteps(selectedClaim.status) : [];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Claim Center</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Track and file your insurance claims</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-8 py-4 bg-emerald-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-tighter shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 transition-all"
        >
          <ShieldAlert className="w-5 h-5" />
          <span>File New Claim</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">My Claims List</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input type="text" placeholder="Search claims..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold outline-none focus:ring-2 focus:ring-emerald-600/20" />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Claim ID</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type & Policy</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Amount</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {claimsList.map((claim) => (
                    <tr key={claim.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6 text-xs font-black text-slate-900">{claim.id}</td>
                      <td className="px-8 py-6">
                        <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{claim.type} • {claim.policy}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Submitted on {claim.date}</p>
                      </td>
                      <td className="px-8 py-6 text-xs font-black text-slate-900 text-center">{claim.amount}</td>
                      <td className="px-8 py-6 text-right">
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                          claim.status === 'Settled' ? 'bg-emerald-50 text-emerald-600' : 
                          claim.status === 'Under Review' ? 'bg-amber-50 text-amber-600' : 
                          'bg-rose-50 text-rose-600'
                        }`}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => handleTrack(claim)}
                          className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all"
                          title="Track Status"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-8">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center">
              <FileText className="w-5 h-5 mr-3 text-emerald-600" />
              Claim Guide
            </h4>
            <div className="space-y-8 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-100">
              {[
                { step: 1, title: 'Intimate Insurer', desc: 'Notify us within 24 hours of the incident.', icon: AlertCircle, color: 'rose' },
                { step: 2, title: 'Gather Documents', desc: 'Keep medical reports or FIR copies ready.', icon: Upload, color: 'blue' },
                { step: 3, title: 'Submit Claim', desc: 'Upload digital copies for faster processing.', icon: CheckCircle, color: 'emerald' },
                { step: 4, title: 'Settlement', desc: 'Direct bank payout after verification.', icon: Clock, color: 'amber' },
              ].map((s, i) => (
                <div key={i} className="flex space-x-6 relative z-10">
                  <div className={`w-9 h-9 rounded-2xl bg-${s.color}-600 text-white flex-shrink-0 flex items-center justify-center shadow-lg shadow-${s.color}-900/20`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{s.title}</p>
                    <p className="text-[11px] font-bold text-slate-400 leading-relaxed mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-slate-100">
              <button className="w-full py-4 bg-slate-50 border border-slate-200 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">
                Download Claim Form
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Initiate New Claim</h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Please provide accurate incident details</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm"
                >
                  <X className="w-6 h-6 text-slate-300" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Policy</label>
                    <select 
                      value={formData.policy}
                      onChange={(e) => setFormData({...formData, policy: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-900 outline-none focus:ring-2 focus:ring-emerald-600/20"
                      required
                    >
                      <option>Care Supreme Discounted</option>
                      <option>Motor Secure Plus</option>
                      <option>Term Smart Guard</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Claim Type</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-900 outline-none focus:ring-2 focus:ring-emerald-600/20"
                      required
                    >
                      <option>Medical</option>
                      <option>Accident</option>
                      <option>Theft</option>
                      <option>Natural Calamity</option>
                      <option>Death Benefit</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Claim Amount (₹)</label>
                    <input 
                      type="number" 
                      placeholder="Enter amount"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-900 outline-none focus:ring-2 focus:ring-emerald-600/20"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Incident Date</label>
                    <input type="date" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-900 outline-none focus:ring-2 focus:ring-emerald-600/20" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description of Incident</label>
                  <textarea 
                    rows="3" 
                    placeholder="Briefly describe what happened..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] font-medium text-slate-900 outline-none focus:ring-2 focus:ring-emerald-600/20"
                    required
                  ></textarea>
                </div>

                <div className="pt-6 flex flex-col md:flex-row gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 transition-all flex items-center justify-center space-x-3"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>File Claim Now</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Track Status Modal */}
      <AnimatePresence>
        {isTrackModalOpen && selectedClaim && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTrackModalOpen(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Track Claim</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{selectedClaim.id} • {selectedClaim.type}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsTrackModalOpen(false)} 
                  className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm"
                >
                  <X className="w-6 h-6 text-slate-300" />
                </button>
              </div>

              <div className="p-10 space-y-10">
                <div className="space-y-10 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-1 before:bg-slate-100">
                  {currentSteps.map((step, i) => (
                    <div key={i} className="flex space-x-6 relative z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
                        step.done ? 'bg-emerald-600 text-white shadow-emerald-900/20' : 'bg-white border-4 border-slate-100 text-slate-200'
                      }`}>
                        {step.done ? <CheckCircle className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                      </div>
                      <div>
                        <p className={`text-sm font-black uppercase tracking-tight ${step.done ? 'text-slate-900' : 'text-slate-300'}`}>
                          {step.label}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedClaim.status !== 'Settled' && (
                  <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Next Milestone</p>
                        <p className="text-xs font-black text-slate-900">Verification Outcome (Exp. 48h)</p>
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => setIsTrackModalOpen(false)}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all"
                >
                  Close Tracker
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerClaims;
