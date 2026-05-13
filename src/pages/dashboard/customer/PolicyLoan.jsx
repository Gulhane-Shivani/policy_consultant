import React, { useState } from 'react';
import { 
  DollarSign, Calculator, History, CheckCircle2, 
  AlertCircle, ArrowRight, Info, ShieldCheck,
  TrendingUp, Wallet, Landmark, FileText, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const PolicyLoan = () => {
  const [activeTab, setActiveTab] = useState('eligibility');
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [loanAmount, setLoanAmount] = useState(50000);

  const eligiblePolicies = [
    { 
      id: 'TL-4421', 
      name: 'Term Life Cover', 
      sumAssured: 5000000, 
      paidPremiums: 240000, 
      surrenderValue: 180000, 
      maxLoan: 150000,
      interestRate: '9.5%'
    },
    { 
      id: 'HE-8829', 
      name: 'Health Elite Plus', 
      sumAssured: 1000000, 
      paidPremiums: 120000, 
      surrenderValue: 0, 
      maxLoan: 0,
      interestRate: 'N/A',
      reason: 'No surrender value for health insurance'
    }
  ];

  const [history, setHistory] = useState([
    { 
      id: 'LN-99201', 
      policy: 'Term Life Cover (TL-4421)', 
      amount: '₹50,000', 
      date: 'Jan 15, 2026', 
      status: 'Active', 
      nextEMI: '₹1,250 on June 01' 
    },
    { 
      id: 'LN-88120', 
      policy: 'Business Shield (BS-1102)', 
      amount: '₹2,00,000', 
      date: 'Aug 10, 2024', 
      status: 'Closed', 
      nextEMI: 'Fully Repaid' 
    }
  ]);

  const handleApply = (policy) => {
    setSelectedPolicy(policy);
    setActiveTab('apply');
  };

  const handleSubmitLoan = (e) => {
    e.preventDefault();
    const newId = 'LN-' + Math.floor(10000 + Math.random() * 90000);
    
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          const newLoan = {
            id: newId,
            policy: `${selectedPolicy.name} (${selectedPolicy.id})`,
            amount: `₹${loanAmount.toLocaleString()}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            status: 'Processing',
            nextEMI: 'Under Verification'
          };
          setHistory(prev => [newLoan, ...prev]);
          resolve();
        }, 2000);
      }),
      {
        loading: 'Processing loan application...',
        success: 'Loan application submitted successfully! Reference: ' + newId,
        error: 'Failed to process. Please try again.',
      }
    );
    setActiveTab('history');
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Policy Loan</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Avail low-interest loans against your life insurance</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('eligibility')}
            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-tighter transition-all ${activeTab === 'eligibility' || activeTab === 'apply' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Loan Application
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-tighter transition-all ${activeTab === 'history' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Loan History
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'eligibility' && (
          <motion.div 
            key="eligibility"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Interest Rate', value: 'Starting 9.5%', icon: TrendingUp, color: 'blue' },
                { label: 'Approval Time', value: 'Within 24 Hours', icon: Clock, color: 'emerald' },
                { label: 'Documentation', value: 'Zero Paperwork', icon: ShieldCheck, color: 'purple' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center space-x-5">
                  <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-lg font-black text-slate-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Check Loan Eligibility</h3>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center space-x-2">
                  <Calculator className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Instant Assessment</span>
                </div>
              </div>

              <div className="space-y-4">
                {eligiblePolicies.map((policy) => (
                  <div key={policy.id} className={`p-8 rounded-[2.5rem] border transition-all ${policy.maxLoan > 0 ? 'border-emerald-100 bg-emerald-50/20' : 'border-slate-100 bg-slate-50/50 grayscale'}`}>
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-4 flex-grow">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${policy.maxLoan > 0 ? 'bg-white text-emerald-600 shadow-sm' : 'bg-slate-200 text-slate-400'}`}>
                            <Landmark className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-slate-900">{policy.name}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Policy ID: {policy.id}</p>
                          </div>
                        </div>

                        {policy.maxLoan > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                            <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Paid Premiums</p>
                              <p className="text-sm font-black text-slate-900">₹{policy.paidPremiums.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Surrender Value</p>
                              <p className="text-sm font-black text-slate-900">₹{policy.surrenderValue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Max Loan</p>
                              <p className="text-sm font-black text-emerald-600">₹{policy.maxLoan.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Interest Rate</p>
                              <p className="text-sm font-black text-slate-900">{policy.interestRate}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-rose-500 pt-2">
                            <AlertCircle className="w-4 h-4" />
                            <p className="text-xs font-bold">{policy.reason}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        {policy.maxLoan > 0 ? (
                          <button 
                            onClick={() => handleApply(policy)}
                            className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 group"
                          >
                            <span>Apply Now</span>
                            <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                          </button>
                        ) : (
                          <button disabled className="w-full md:w-auto px-8 py-4 bg-slate-200 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest cursor-not-allowed">
                            Not Eligible
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start space-x-4">
                <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-700 font-medium leading-relaxed">
                  <strong>Note:</strong> Loan eligibility is typically available for Life Insurance policies that have completed at least 3 years and have acquired a surrender value. The maximum loan amount is usually 90% of the surrender value.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'apply' && (
          <motion.div 
            key="apply"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-2xl space-y-10">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setActiveTab('eligibility')}
                  className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Policy Loan Application</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Applying against: {selectedPolicy?.name}</p>
                </div>
              </div>

              <form onSubmit={handleSubmitLoan} className="space-y-8">
                <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Select Loan Amount</p>
                    <p className="text-2xl font-black text-white">₹{loanAmount.toLocaleString()}</p>
                  </div>
                  <input 
                    type="range" 
                    min="10000" 
                    max={selectedPolicy?.maxLoan || 100000} 
                    step="5000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Min: ₹10,000</span>
                    <span>Max: ₹{selectedPolicy?.maxLoan.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Estimated EMI</p>
                    <p className="text-2xl font-black text-slate-900">₹{Math.round(loanAmount * 0.025).toLocaleString()}</p>
                    <p className="text-[10px] text-slate-500 font-bold mt-1">Calculated at 9.5% p.a.</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Disbursement Bank</p>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
                      <p className="text-sm font-black text-slate-900">HDFC Bank **** 4242</p>
                    </div>
                    <p className="text-[10px] text-emerald-600 font-bold mt-1 uppercase">Verified A/C</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-200 text-emerald-600 focus:ring-emerald-500" required />
                    <p className="text-xs text-slate-500 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">
                      I understand that the loan is granted against the security of the policy and if not repaid, it will be deducted from the final claim amount.
                    </p>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-200 text-emerald-600 focus:ring-emerald-500" required />
                    <p className="text-xs text-slate-500 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">
                      I agree to the <span className="text-emerald-600 font-bold">Loan Terms & Conditions</span> and authorize Policy Consultant to process my application.
                    </p>
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setActiveTab('eligibility')}
                    className="flex-grow py-5 bg-slate-50 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="flex-grow-[2] py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 transition-all flex items-center justify-center space-x-3"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>Proceed for OTP</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div 
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Loan ID</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy Details</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Repayment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {history.map((loan) => (
                      <tr key={loan.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <span className="text-sm font-black text-slate-900 tracking-tight">{loan.id}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-bold text-slate-700">{loan.policy}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-black text-slate-900">{loan.amount}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{loan.date}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            loan.status === 'Active' ? 'text-blue-600 bg-blue-50' : 
                            loan.status === 'Processing' ? 'text-orange-600 bg-orange-50' : 
                            'text-emerald-600 bg-emerald-50'
                          }`}>
                            {loan.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-xs font-bold text-slate-900">{loan.nextEMI}</span>
                            {loan.status === 'Active' && (
                              <button className="mt-1 text-[9px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Pay Now</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-emerald-900 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-2xl font-black tracking-tight">Need a bigger loan?</h3>
                  <p className="text-slate-400 text-sm font-medium">Top-up your existing loan or apply against other policies.</p>
                </div>
                <button className="px-10 py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-900/40">
                  Speak to Advisor
                </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PolicyLoan;
