import React, { useState } from 'react';
import { 
  Folder, FileText, Download, Eye, 
  Search, Filter, Shield, Clock,
  MoreVertical, Trash2, Plus,
  FileCheck, FileClock, ShieldCheck, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const DocumentVault = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [viewingDoc, setViewingDoc] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleDownload = (doc) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Preparing ${doc.name}...`,
        success: `${doc.name} downloaded successfully!`,
        error: 'Failed to download file.',
      }
    );
  };

  const handleUpload = () => {
    setIsUploading(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Encrypting and uploading document...',
        success: () => {
          setIsUploading(false);
          return 'Document uploaded to secure vault!';
        },
        error: 'Upload failed.',
      }
    );
  };

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.policy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Document Vault</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">All your policy documents in one secure place</p>
        </div>
        <div />
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
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${categoryFilter !== 'All' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                <Filter className="w-4 h-4" />
                <span>{categoryFilter === 'All' ? 'Filter' : categoryFilter}</span>
              </button>

              <AnimatePresence>
                {showFilterDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
                  >
                    <div className="p-2 space-y-1">
                      {['All', 'Policy', 'Receipt', 'Identity', 'Claim', 'Tax'].map(cat => (
                        <button 
                          key={cat}
                          onClick={() => { setCategoryFilter(cat); setShowFilterDropdown(false); }}
                          className={`w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${categoryFilter === cat ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
                      <div 
                        onClick={() => setViewingDoc(doc)}
                        className="flex flex-col cursor-pointer hover:opacity-70 transition-opacity"
                      >
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
                        onClick={() => handleDownload(doc)}
                        className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
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
      
      {/* Document View Modal */}
      <AnimatePresence>
        {viewingDoc && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingDoc(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-900 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight">{viewingDoc.name}</h3>
                    <p className="text-[9px] font-bold uppercase opacity-60 tracking-widest">{viewingDoc.category} • {viewingDoc.size}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setViewingDoc(null)}
                  className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-5 bg-slate-50/50">
                <div className="aspect-[3/4] bg-white rounded-2xl border border-slate-200 shadow-inner overflow-hidden flex flex-col items-center justify-center relative group">
                  <div className="absolute inset-0 bg-slate-900/5 flex items-center justify-center">
                    <ShieldCheck className="w-20 h-20 text-slate-200 opacity-50" />
                  </div>
                  <div className="relative z-10 text-center space-y-3 p-8">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                      <FileCheck className="w-8 h-8" />
                    </div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Digital Copy Verified</p>
                    <p className="text-[10px] text-slate-400 font-bold max-w-[200px] mx-auto">This document is encrypted and protected by Policy Consultant Security Protocols.</p>
                  </div>
                </div>

                <div className="flex pt-2">
                  <button 
                    onClick={() => { handleDownload(viewingDoc); setViewingDoc(null); }}
                    className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Document</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentVault;
