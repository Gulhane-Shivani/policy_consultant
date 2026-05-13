import React, { useState } from 'react';
import { 
  Folder, FileText, Download, Eye, 
  Search, Filter, Shield, Clock,
  MoreVertical, Share2, Trash2, Plus,
  FileCheck, FileClock, ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const DocumentVault = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const documents = [
    { 
      id: 1, 
      name: 'Policy_Schedule_HE8829.pdf', 
      type: 'Policy Document', 
      policy: 'Health Elite Plus', 
      date: 'May 10, 2026', 
      size: '1.2 MB',
      category: 'Policy'
    },
    { 
      id: 2, 
      name: 'Premium_Receipt_Q1_2026.pdf', 
      type: 'Receipt', 
      policy: 'Term Life Cover', 
      date: 'Apr 15, 2026', 
      size: '450 KB',
      category: 'Receipt'
    },
    { 
      id: 3, 
      name: 'Kyc_Verification_Docs.zip', 
      type: 'KYC', 
      policy: 'Account Level', 
      date: 'Mar 12, 2026', 
      size: '5.8 MB',
      category: 'Identity'
    },
    { 
      id: 4, 
      name: 'Claim_Approval_Letter.pdf', 
      type: 'Claim', 
      policy: 'Car Insurance', 
      date: 'Feb 28, 2026', 
      size: '890 KB',
      category: 'Claim'
    },
    { 
      id: 5, 
      name: 'Tax_Benefit_Certificate_2025.pdf', 
      type: 'Tax Certificate', 
      policy: 'Consolidated', 
      date: 'Jan 20, 2026', 
      size: '1.1 MB',
      category: 'Tax'
    },
  ];

  const handleDownload = (docName) => {
    toast.success(`Downloading ${docName}...`);
  };

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.policy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Document Vault</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">All your policy documents in one secure place</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 transition-all">
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Files', value: '12', icon: Folder, color: 'blue' },
          { label: 'Policy Docs', value: '04', icon: ShieldCheck, color: 'emerald' },
          { label: 'Receipts', value: '06', icon: FileClock, color: 'purple' },
          { label: 'Storage Used', value: '18 MB', icon: Clock, color: 'orange' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center space-x-5">
            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-lg font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-medium text-sm"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-5 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
              <Download className="w-4 h-4" />
              <span>Download All</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Document Name</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Linked Policy</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Uploaded</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Size</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-600 group-hover:shadow-sm transition-all">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{doc.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{doc.type}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-500">{doc.policy}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{doc.date}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-900">{doc.size}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleDownload(doc.name)}
                        className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <div className="relative group/menu">
                        <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-900 hover:bg-white transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {/* Simple Tooltip-like menu on hover if needed, but keeping it simple for now */}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocs.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-[2.5rem] flex items-center justify-center mx-auto">
              <Search className="w-10 h-10" />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">No documents found</p>
              <p className="text-sm text-slate-400 font-medium">Try searching with a different term or upload a new file.</p>
            </div>
          </div>
        )}
      </div>

      {/* Security Banner */}
      <div className="bg-slate-900 p-8 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center shrink-0">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-xl font-black tracking-tight">Enterprise-Grade Security</h4>
            <p className="text-slate-400 text-xs font-medium">Your documents are encrypted with AES-256 and stored in secure regional data centers.</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 flex items-center space-x-3">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">ISO 27001 Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVault;
