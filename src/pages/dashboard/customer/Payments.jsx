import React, { useState } from 'react';
import { 
  CreditCard, Calendar, Clock, CheckCircle, 
  ArrowUpRight, Wallet, Zap, Shield, 
  ChevronRight, Download, Plus, Smartphone,
  Landmark, CircleDollarSign, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomerPayments = () => {
  const [renewals, setRenewals] = useState([
    { id: 1, policy_number: 'POL-8901', policy: 'Life Insurance Elite', provider: 'HDFC Life', amount: 'Rs.1,200', date: '2026-06-10', status: 'Due' },
    { id: 2, policy_number: 'POL-8902', policy: 'Health Care Supreme', provider: 'Niva Bupa', amount: 'Rs.850', date: '2026-06-15', status: 'Upcoming' },
  ]);

  const [paymentHistory, setPaymentHistory] = useState([
    { id: 'TXN-9921', policy: 'Care Supreme', date: '2025-06-15', amount: 'Rs.615', status: 'Successful', method: 'UPI' },
    { id: 'TXN-8810', policy: 'Motor Secure', date: '2025-08-10', amount: 'Rs.520', status: 'Successful', method: 'Card' },
    { id: 'TXN-7705', policy: 'Term Smart', date: '2025-05-25', amount: 'Rs.1,200', status: 'Successful', method: 'Net Banking' },
  ]);

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState('list'); // 'list', 'details', 'processing', 'success'

  const paymentMethods = [
    { name: 'UPI', desc: 'Google Pay, PhonePe, Paytm', icon: Smartphone, color: 'indigo' },
    { name: 'Cards', desc: 'Debit & Credit Cards', icon: CreditCard, color: 'blue' },
    { name: 'Net Banking', desc: 'All major Indian banks', icon: Landmark, color: 'emerald' },
    { name: 'Wallets', desc: 'Amazon Pay, Mobikwik', icon: Wallet, color: 'amber' },
  ];

  const handlePayNow = (policy) => {
    setSelectedPolicy(policy);
    setPaymentStep('methods');
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setPaymentStep('details');
    setIsModalOpen(true);
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    setPaymentStep('processing');
    
    setTimeout(() => {
      setPaymentStep('success');
      
      const newTxn = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        policy: selectedPolicy.policy,
        date: new Date().toISOString().split('T')[0],
        amount: selectedPolicy.amount,
        status: 'Successful',
        method: selectedMethod.name
      };
      setPaymentHistory([newTxn, ...paymentHistory]);
      setRenewals(renewals.filter(r => r.id !== selectedPolicy.id));
    }, 2500);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPaymentStep('list');
    setSelectedPolicy(null);
    setSelectedMethod(null);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Payments & Renewals</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Manage premiums and payment methods</p>
        </div>
        <div className="flex items-center space-x-3 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
          <Zap className="w-5 h-5 text-emerald-600" />
          <div>
            <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest leading-none">Auto-Debit Status</p>
            <p className="text-xs font-black text-slate-900">Active (HDFC Bank)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <div className="space-y-6">
            <h2 className="text-xl font-black text-slate-900 tracking-tight px-2">Pending Renewals</h2>
            {renewals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renewals.map((renewal) => (
                  <motion.div
                    key={renewal.id}
                    whileHover={{ y: -5 }}
                    className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group"
                  >
                    <div className="flex justify-between items-start relative z-10 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <CircleDollarSign className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${renewal.status === 'Due' ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-amber-50 text-amber-600'}`}>
                        {renewal.status}
                      </span>
                    </div>
                    <div className="relative z-10 mb-8">
                      <h3 className="text-lg font-black text-slate-900 uppercase leading-tight">{renewal.policy}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Due Date: {renewal.date}</p>
                    </div>
                    <div className="flex justify-between items-end relative z-10">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Premium Amount</p>
                        <p className="text-2xl font-black text-slate-900">{renewal.amount}</p>
                      </div>
                      <button 
                        onClick={() => handlePayNow(renewal)}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 transition-all"
                      >
                        Pay Now
                      </button>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-20 text-center">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">No Pending Renewals</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">All your policies are up to date</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Premium History</h3>
              <button className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest hover:underline">Download Statement</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy & Method</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Amount</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paymentHistory.map((txn) => (
                    <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6 text-xs font-black text-slate-900">{txn.id}</td>
                      <td className="px-8 py-6">
                        <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{txn.policy}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{txn.date} • {txn.method}</p>
                      </td>
                      <td className="px-8 py-6 text-xs font-black text-slate-900 text-center">{txn.amount}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{txn.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-10 min-h-[500px] flex flex-col">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center px-2">
              <Shield className="w-5 h-5 mr-3 text-emerald-500" />
              Secure Pay
            </h4>

            {paymentStep === 'methods' && selectedPolicy ? (
              <div className="space-y-6 flex-grow animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-8">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Paying for</p>
                  <h5 className="font-black text-slate-900 uppercase tracking-tight">{selectedPolicy.policy}</h5>
                  <p className="text-2xl font-black text-emerald-600 mt-2">{selectedPolicy.amount}</p>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Choose Method</p>
                <div className="space-y-4">
                    {paymentMethods.map((method, i) => {
                      const Icon = method.icon;
                      return (
                        <div 
                          key={i} 
                          onClick={() => handleMethodSelect(method)}
                          className="flex items-center space-x-4 p-4 rounded-3xl bg-slate-50 border border-transparent hover:border-emerald-200 hover:bg-white cursor-pointer transition-all group"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{method.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 leading-tight mt-0.5">{method.desc}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover:translate-x-1 transition-transform" />
                        </div>
                      );
                    })}
                  </div>
                  <button 
                    onClick={() => setPaymentStep('list')}
                    className="w-full py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors mt-4"
                  >
                    Cancel Payment
                  </button>
                </div>
              ) : (
                <div className="space-y-6 flex-grow">
                  <div className="space-y-6">
                    {paymentMethods.map((method, i) => {
                      const Icon = method.icon;
                      return (
                        <div key={i} className="flex items-center space-x-4 p-4 rounded-3xl bg-slate-50 border border-transparent hover:border-emerald-200 hover:bg-white cursor-pointer transition-all group opacity-50 grayscale hover:grayscale-0 hover:opacity-100">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{method.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 leading-tight mt-0.5">{method.desc}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover:translate-x-1 transition-transform" />
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-8 border-t border-slate-100">
                    <div className="p-6 bg-slate-900 rounded-[2rem] text-white text-center space-y-4">
                      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">One-Tap Checkout</p>
                      <h5 className="text-xl font-black tracking-tight leading-tight">Setup Auto-Pay</h5>
                      <p className="text-[10px] font-bold text-slate-400 px-4">Never miss a renewal. Automatic payments for peace of mind.</p>
                      <button className="w-full py-4 bg-emerald-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-900/40 hover:bg-emerald-700 transition-all">
                        Enable Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
 
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={paymentStep === 'details' ? closeModal : null}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg bg-white rounded-[3.5rem] shadow-2xl overflow-hidden"
              >
                {paymentStep === 'details' && selectedMethod && (
                  <div className="p-10 space-y-8">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                          {selectedMethod.icon && (() => {
                            const MethodIcon = selectedMethod.icon;
                            return <MethodIcon className="w-6 h-6" />;
                          })()}
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-slate-900 tracking-tight">{selectedMethod.name} Verification</h3>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 2 of 3 • Secure Authentication</p>
                        </div>
                      </div>
                      <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                        <X className="w-6 h-6 text-slate-300" />
                      </button>
                    </div>

                  <form onSubmit={handleConfirmPayment} className="space-y-6">
                    {selectedMethod.name === 'UPI' ? (
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Enter 6-Digit UPI PIN</label>
                        <div className="flex justify-between gap-2">
                          {[1,2,3,4,5,6].map(i => (
                            <input 
                              key={i}
                              type="password"
                              maxLength="1"
                              className="w-full h-14 bg-slate-50 border border-slate-100 rounded-xl text-center text-xl font-black text-slate-900 focus:ring-2 focus:ring-emerald-600/20 outline-none transition-all"
                              required
                            />
                          ))}
                        </div>
                      </div>
                    ) : selectedMethod.name === 'Cards' ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Card Number</label>
                          <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-black text-slate-900 outline-none focus:ring-2 focus:ring-emerald-600/20" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Expiry</label>
                            <input type="text" placeholder="MM/YY" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-black text-slate-900 outline-none focus:ring-2 focus:ring-emerald-600/20" required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CVV</label>
                            <input type="password" placeholder="XXX" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-black text-slate-900 outline-none focus:ring-2 focus:ring-emerald-600/20" required />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 bg-slate-50 rounded-2xl text-center">
                        <p className="text-xs font-bold text-slate-400">Please complete authentication on your bank's secure page.</p>
                      </div>
                    )}

                    <div className="pt-4">
                      <button 
                        type="submit"
                        className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-emerald-600 transition-all flex items-center justify-center space-x-3"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Confirm Pay {selectedPolicy?.amount}</span>
                      </button>
                    </div>
                  </form>
                </div>
                )}

                {paymentStep === 'processing' && (
                  <div className="p-20 flex flex-col items-center justify-center space-y-8 text-center">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 border-8 border-emerald-50 rounded-full"></div>
                      <div className="absolute inset-0 border-8 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">Payment Processing</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Communicating with Banking Gateway...</p>
                      <p className="text-[10px] font-black text-emerald-600 mt-4 bg-emerald-50 px-4 py-1 rounded-full inline-block">SECURE TRANSACTION ACTIVE</p>
                    </div>
                  </div>
                )}

                {paymentStep === 'success' && (
                  <div className="p-20 flex flex-col items-center justify-center space-y-8 text-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-500/40"
                    >
                      <CheckCircle className="w-12 h-12" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-4 uppercase">Renewal Done!</h3>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Policy Updated Successfully</p>
                        <p className="text-sm font-black text-emerald-600 uppercase tracking-tighter">Receipt sent to shivani***@gmail.com</p>
                      </div>
                    </div>
                    <button 
                      onClick={closeModal}
                      className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
  );
};

export default CustomerPayments;

