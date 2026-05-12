import React, { useState } from 'react';
import { 
  ShieldAlert, Plus, Search, Filter, 
  ChevronRight, Clock, CheckCircle, XCircle,
  FileText, Upload, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerClaims = () => {
  const claims = [
    { id: 'CLM-102', policy: 'Care Supreme Discounted', date: '2024-02-10', amount: '₹45,000', status: 'Settled', type: 'Medical' },
    { id: 'CLM-105', policy: 'Motor Secure Plus', date: '2024-05-01', amount: '₹12,000', status: 'Under Review', type: 'Accident' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Claim Center</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Track and file your insurance claims</p>
        </div>
        <button className="flex items-center space-x-2 px-8 py-4 bg-rose-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-tighter shadow-xl shadow-rose-900/20 hover:bg-rose-700 transition-all">
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
                  <input type="text" placeholder="Search claims..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold outline-none focus:ring-2 focus:ring-rose-600/20" />
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {claims.map((claim) => (
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
              <FileText className="w-5 h-5 mr-3 text-rose-500" />
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
    </div>
  );
};

export default CustomerClaims;
