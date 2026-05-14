import React, { useState } from 'react';
import { 
  FileText, User, MapPin, 
  Phone, Mail, Heart, 
  Settings, RefreshCw, Download, 
  CheckCircle, Search, ArrowRight,
  ShieldCheck, AlertCircle, Edit3
} from 'lucide-react';
import { motion } from 'framer-motion';

const PolicyServicing = () => {
  const [activeTab, setActiveTab] = useState('update');
  const [searchQuery, setSearchQuery] = useState('');

  const servicingOptions = [
    { id: 'address', name: 'Address Update', icon: MapPin, desc: 'Update residential or billing address' },
    { id: 'nominee', name: 'Nominee Correction', icon: Heart, desc: 'Modify beneficiary or nominee details' },
    { id: 'contact', name: 'Contact Info', icon: Phone, desc: 'Update phone number or email address' },
    { id: 'document', name: 'Issue Document', icon: FileText, desc: 'Re-issue policy bonds or ID cards' }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Policy Servicing</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Post-sale administration & document issuance</p>
        </div>
        <div className="flex items-center space-x-3 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-black text-slate-900 uppercase">Secure Modification Active</span>
        </div>
      </div>

      {/* Customer Lookup for Servicing */}
      <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8 px-2">1. Select Policy for Servicing</h3>
        <div className="relative max-w-3xl">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
          <input 
            type="text" 
            placeholder="Enter Policy Number or Mobile..." 
            className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-600/5 transition-all font-bold text-slate-900 text-lg"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all">
            Load Policy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Servicing Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Servicing Options</h3>
             <div className="space-y-4">
                {servicingOptions.map((opt) => (
                  <button 
                    key={opt.id}
                    onClick={() => setActiveTab(opt.id)}
                    className={`w-full flex items-center p-6 rounded-3xl border-2 transition-all text-left group ${activeTab === opt.id ? 'bg-slate-900 border-slate-900 text-white shadow-xl' : 'bg-slate-50 border-slate-50 hover:border-emerald-200 hover:bg-white'}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 transition-all ${activeTab === opt.id ? 'bg-white/10 text-emerald-400' : 'bg-white text-emerald-600 border border-slate-100 shadow-sm group-hover:scale-110'}`}>
                       <opt.icon className="w-6 h-6" />
                    </div>
                    <div>
                       <p className={`text-xs font-black uppercase tracking-tight ${activeTab === opt.id ? 'text-white' : 'text-slate-900'}`}>{opt.name}</p>
                       <p className={`text-[10px] font-bold leading-tight mt-1 ${activeTab === opt.id ? 'text-slate-400' : 'text-slate-400'}`}>{opt.desc}</p>
                    </div>
                  </button>
                ))}
             </div>
          </div>

          <div className="bg-amber-600 p-8 rounded-[3rem] text-white shadow-2xl shadow-amber-900/20 relative overflow-hidden group">
             <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                   <AlertCircle className="w-5 h-5" />
                   <h4 className="font-black uppercase tracking-widest text-xs">KYC Notice</h4>
                </div>
                <p className="text-sm font-bold text-amber-50 leading-relaxed mb-6">Ensure valid identity documents are uploaded before modifying nominee or contact details.</p>
                <button className="w-full py-4 bg-white/20 backdrop-blur-md rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/30 transition-all border border-white/30">
                   View Compliance Checklist
                </button>
             </div>
             <Settings className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </div>
        </div>

        {/* Right: Work Area */}
        <div className="lg:col-span-2">
           <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-2xl relative min-h-[600px] flex flex-col items-center justify-center text-center">
              <div className="max-w-md">
                 <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-slate-100 text-slate-300">
                    <Edit3 className="w-10 h-10" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-4">Service Request Editor</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                    Select a policy and servicing category from the left to start processing customer modifications. 
                    All changes will be logged in the interaction history.
                 </p>
                 
                 <div className="mt-12 grid grid-cols-2 gap-4">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center">
                       <Download className="w-6 h-6 text-emerald-500 mb-3" />
                       <span className="text-[10px] font-black text-slate-900 uppercase">Issue ID Card</span>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center">
                       <RefreshCw className="w-6 h-6 text-indigo-500 mb-3" />
                       <span className="text-[10px] font-black text-slate-900 uppercase">Policy Bond</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyServicing;
