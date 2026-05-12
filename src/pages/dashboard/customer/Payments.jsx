import React, { useState } from 'react';
import { 
  CreditCard, Calendar, Clock, CheckCircle, 
  ArrowUpRight, Wallet, Zap, Shield, 
  ChevronRight, Download, Plus, Smartphone,
  Globe, Landmark, IndianRupee
} from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerPayments = () => {
  const upcomingRenewals = [
    { id: 1, policy: 'Term Smart Guard', provider: 'HDFC Life', amount: '₹1,200', date: '2024-05-25', status: 'Due' },
    { id: 2, policy: 'Care Supreme Discounted', provider: 'Care Health', amount: '₹615', date: '2024-06-15', status: 'Upcoming' },
  ];

  const paymentHistory = [
    { id: 'TXN-9921', policy: 'Care Supreme', date: '2023-06-15', amount: '₹615', status: 'Successful', method: 'UPI' },
    { id: 'TXN-8810', policy: 'Motor Secure', date: '2023-08-10', amount: '₹520', status: 'Successful', method: 'Card' },
    { id: 'TXN-7705', policy: 'Term Smart', date: '2023-05-25', amount: '₹1,200', status: 'Successful', method: 'Net Banking' },
  ];

  const paymentMethods = [
    { name: 'UPI', desc: 'Google Pay, PhonePe, Paytm', icon: Smartphone, color: 'indigo' },
    { name: 'Cards', desc: 'Debit & Credit Cards', icon: CreditCard, color: 'blue' },
    { name: 'Net Banking', desc: 'All major Indian banks', icon: Landmark, color: 'emerald' },
    { name: 'Wallets', desc: 'Amazon Pay, Mobikwik', icon: Wallet, color: 'amber' },
  ];

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
          {/* Upcoming Renewals */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-slate-900 tracking-tight px-2">Pending Renewals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingRenewals.map((renewal) => (
                <motion.div
                  key={renewal.id}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group"
                >
                  <div className="flex justify-between items-start relative z-10 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <IndianRupee className="w-6 h-6" />
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
                    <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 transition-all">
                      Pay Now
                    </button>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Payment History */}
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

        {/* Sidebar: Payment Methods & Auto-Debit */}
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-10">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center px-2">
              <Shield className="w-5 h-5 mr-3 text-emerald-500" />
              Secure Pay
            </h4>
            <div className="space-y-6">
              {paymentMethods.map((method, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 rounded-3xl bg-slate-50 border border-transparent hover:border-emerald-200 hover:bg-white cursor-pointer transition-all group">
                  <div className={`w-12 h-12 rounded-2xl bg-${method.color}-50 flex items-center justify-center text-${method.color}-600 group-hover:scale-110 transition-transform`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{method.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 leading-tight mt-0.5">{method.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
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
        </div>
      </div>
    </div>
  );
};

export default CustomerPayments;
