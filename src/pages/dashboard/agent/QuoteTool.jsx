import React, { useState } from 'react';
import { 
  Zap, Calculator, Shield, 
  ArrowRight, Check, Info,
  Search, Filter, Download,
  Share2, Save, RefreshCw,
  Plus, Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuoteTool = () => {
  const [step, setStep] = useState(1);
  const [quoteData, setQuoteData] = useState({
    type: 'life',
    sumInsured: 1000000,
    age: 30,
    tenure: 20,
    frequency: 'monthly'
  });

  const insurers = [
    { id: 1, name: 'HDFC ERGO', price: 850, rating: 4.8, features: ['Cashless Hospitalization', 'No Claim Bonus', 'Daily Cash'] },
    { id: 2, name: 'Star Health', price: 920, rating: 4.5, features: ['Free Health Checkup', 'Organ Donor Cover', 'AYUSH Treatment'] },
    { id: 3, name: 'ICICI Lombard', price: 890, rating: 4.7, features: ['OPD Cover', 'Maternity Cover', 'Global Cover'] },
    { id: 4, name: 'Niva Bupa', price: 810, rating: 4.6, features: ['No Age Limit', 'Refill Benefit', 'Pre-existing Disease Cover'] },
  ];

  const handleCalculate = () => {
    setStep(2);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Quote & Proposal</h1>
        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Generate comparisons across top insurers instantly</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-emerald-500" />
              Quote Parameters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Policy Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Life', 'Health', 'Car', 'Business'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setQuoteData({...quoteData, type: t.toLowerCase()})}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${quoteData.type === t.toLowerCase() ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-slate-200'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Sum Insured (₹)</label>
                <input 
                  type="number" 
                  value={quoteData.sumInsured}
                  onChange={(e) => setQuoteData({...quoteData, sumInsured: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Proposer Age</label>
                  <input 
                    type="number" 
                    value={quoteData.age}
                    onChange={(e) => setQuoteData({...quoteData, age: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Tenure (Yrs)</label>
                  <input 
                    type="number" 
                    value={quoteData.tenure}
                    onChange={(e) => setQuoteData({...quoteData, tenure: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Premium Frequency</label>
                <select 
                  value={quoteData.frequency}
                  onChange={(e) => setQuoteData({...quoteData, frequency: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-600/20"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>

              <button 
                onClick={handleCalculate}
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center space-x-2 mt-4"
              >
                <span>Generate Quotes</span>
                <Zap className="w-4 h-4 fill-current text-yellow-300" />
              </button>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
            <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-emerald-400">Quick Saved Proposals</h4>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center group cursor-pointer hover:bg-white/10 transition-all">
                  <div>
                    <p className="text-xs font-bold">Proposal #782{i}</p>
                    <p className="text-[10px] text-slate-500">For: Amit Sharma</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2 space-y-6">
          {step === 1 ? (
            <div className="h-[600px] bg-white rounded-[3rem] border border-dashed border-slate-300 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                <Calculator className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">Ready to Compare?</h3>
              <p className="text-slate-500 font-medium max-w-xs">Fill in the policy parameters and click "Generate Quotes" to see personalized results from 20+ insurers.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Comparison Results ({insurers.length} Options)</h3>
                <div className="flex space-x-2">
                  <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-emerald-600 transition-all shadow-sm">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-emerald-600 transition-all shadow-sm">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {insurers.map((insurer) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={insurer.id}
                  className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30 flex flex-col md:flex-row items-center gap-8 group hover:border-emerald-200 transition-all"
                >
                  <div className="w-full md:w-32 flex flex-col items-center justify-center border-r border-slate-50 pr-8">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-emerald-50 transition-all font-black text-slate-300 group-hover:text-emerald-600">
                      LOGO
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{insurer.name}</span>
                  </div>

                  <div className="flex-grow space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {insurer.features.map((f, i) => (
                        <span key={i} className="flex items-center text-[10px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full">
                          <Check className="w-3 h-3 mr-1 text-emerald-500" />
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-yellow-500">
                        <span className="text-xs font-black mr-1">{insurer.rating}</span>
                        <Zap className="w-3 h-3 fill-current" />
                      </div>
                      <span className="text-xs font-bold text-slate-400">Claims Settlement: 98.4%</span>
                    </div>
                  </div>

                  <div className="text-center md:text-right space-y-2 min-w-[120px]">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium</p>
                    <h4 className="text-2xl font-black text-slate-900">₹{insurer.price}</h4>
                    <p className="text-[9px] font-bold text-slate-400">per month</p>
                    <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all mt-2">
                      Select Plan
                    </button>
                  </div>
                </motion.div>
              ))}

              <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                    <Save className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-emerald-900 tracking-tight">Save as Proposal</h4>
                    <p className="text-xs text-emerald-700 font-medium">Save this comparison and share it with your lead.</p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                  Save Proposal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteTool;
