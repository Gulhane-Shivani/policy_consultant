import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, Plus, Search, Filter, 
  MapPin, UserCheck, CreditCard, HelpCircle, 
  ChevronRight, Clock, CheckCircle2, AlertCircle,
  MoreVertical, ArrowRight, Download, X, Eye, Trash2, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const ServiceRequests = () => {
  const location = useLocation();
  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('new'); // 'new' or 'history'
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [openActionId, setOpenActionId] = useState(null);
  const [viewingRequest, setViewingRequest] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const requestTypes = [
    { 
      id: 'address', 
      title: 'Address Change', 
      description: 'Update your residential or communication address', 
      icon: MapPin, 
      color: 'blue' 
    },
    { 
      id: 'nominee', 
      title: 'Nominee Change', 
      description: 'Add, remove or update your policy nominees', 
      icon: UserCheck, 
      color: 'emerald' 
    },
    { 
      id: 'duplicate_id', 
      title: 'Duplicate ID Card', 
      description: 'Request a new physical insurance ID card', 
      icon: CreditCard, 
      color: 'purple' 
    },
    { 
      id: 'bank', 
      title: 'Bank Details', 
      description: 'Update your bank account for disbursements', 
      icon: CreditCard, 
      color: 'purple' 
    },
    { 
      id: 'other', 
      title: 'Other Requests', 
      description: 'Miscellaneous policy servicing requests', 
      icon: HelpCircle, 
      color: 'slate' 
    },
  ];

  const [selectedRequestType, setSelectedRequestType] = useState(null);
  const [history, setHistory] = useState([
    { 
      id: 'SR-10293', 
      type: 'Address Change', 
      policy: 'Health Elite Plus (HE-8829)', 
      date: 'May 10, 2026', 
      status: 'In Progress', 
      priority: 'Normal' 
    },
    { 
      id: 'SR-10115', 
      type: 'Duplicate ID Card', 
      policy: 'Term Life Cover (TL-4421)', 
      date: 'April 25, 2026', 
      status: 'Completed', 
      priority: 'Low' 
    },
    { 
      id: 'SR-09882', 
      type: 'Nominee Change', 
      policy: 'Car Insurance (CI-9901)', 
      date: 'March 15, 2026', 
      status: 'Rejected', 
      priority: 'High',
      rejectionReason: 'Invalid document provided. The KYC document uploaded is expired. Please re-upload a valid proof.'
    },
  ]);

  useEffect(() => {
    if (location.state?.type) {
      const type = requestTypes.find(t => t.id === location.state.type);
      if (type) {
        setSelectedRequestType(type);
        setShowRequestForm(true);
      }
    }
  }, [location.state]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-emerald-600 bg-emerald-50';
      case 'In Progress': return 'text-blue-600 bg-blue-50';
      case 'Rejected': return 'text-rose-600 bg-rose-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const handleNewRequest = (type) => {
    setSelectedRequestType(type);
    setShowRequestForm(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size exceeds 5MB limit');
        return;
      }
      setAttachedFile(file);
      toast.success(`File attached: ${file.name}`);
    }
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const newId = 'SR-' + Math.floor(10000 + Math.random() * 90000);
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Submitting request...',
        success: () => {
          const newRequest = {
            id: newId,
            type: selectedRequestType.title,
            policy: e.target.policy.value,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'In Progress',
            priority: 'Normal'
          };
          setHistory(prev => [newRequest, ...prev]);
          setShowRequestForm(false);
          setActiveTab('history');
          setAttachedFile(null);
          return 'Service request raised successfully! ID: ' + newId;
        },
        error: 'Failed to submit. Please try again.',
      }
    );
  };

  const handleView = (req) => {
    setViewingRequest(req);
    setOpenActionId(null);
  };

  const handleDownloadAck = (req) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          // Creating a formatted text blob that browsers will open as a document
          const header = "====================================================\n";
          const title = "       POLICY CONSULTANT - ACKNOWLEDGMENT           \n";
          const subTitle = "          SERVICE REQUEST CONFIRMATION              \n";
          const footer = "====================================================\n";
          const body = `
Request ID:    ${req.id}
Request Type:  ${req.type}
Policy:        ${req.policy}
Date:          ${req.date}
Status:        ${req.status}
Priority:      ${req.priority}

Description:
This document serves as formal confirmation of your 
service request. Our team is currently processing 
your requirement. You can track real-time progress 
on your dashboard.

Thank you for choosing Policy Consultant.
Generated on: ${new Date().toLocaleString()}
`;
          const content = header + title + subTitle + header + body + footer;
          // Using application/octet-stream for forced download as .pdf
          const blob = new Blob([content], { type: 'application/octet-stream' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `Acknowledgment_${req.id}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          resolve();
        }, 1500);
      }),
      {
        loading: `Generating acknowledgment for ${req.id}...`,
        success: 'Acknowledgment PDF downloaded successfully!',
        error: 'Failed to generate document.',
      }
    );
    setOpenActionId(null);
  };

  const handleCancelRequest = (id) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      setHistory(prev => prev.filter(req => req.id !== id));
      toast.success('Request cancelled successfully');
      setOpenActionId(null);
    }
  };

  const filteredHistory = history.filter(req => {
    const matchesSearch = req.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         req.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Service Requests</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Raise and track policy servicing requests</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => { setActiveTab('new'); setShowRequestForm(false); }}
            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-tighter transition-all ${activeTab === 'new' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            New Request
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-tighter transition-all ${activeTab === 'history' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Request History
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'new' && !showRequestForm && (
          <motion.div 
            key="request-types"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {requestTypes.map((type) => (
              <motion.div
                key={type.id}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => handleNewRequest(type)}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 cursor-pointer group hover:border-emerald-200 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${type.color}-50 text-${type.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <type.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{type.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{type.description}</p>
                <div className="flex items-center text-emerald-600 font-black text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  <span>Raise Request</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'new' && showRequestForm && (
          <motion.div 
            key="request-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-2xl space-y-8">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowRequestForm(false)}
                  className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Raise {selectedRequestType?.title}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Please provide the necessary details</p>
                </div>
              </div>

              <form onSubmit={handleSubmitRequest} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Select Policy</label>
                    <select name="policy" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-bold text-slate-900 appearance-none">
                      <option>Health Elite Plus (HE-8829)</option>
                      <option>Term Life Cover (TL-4421)</option>
                      <option>Car Insurance (CI-9901)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Request Priority</label>
                    <div className="flex gap-2">
                      {['Low', 'Normal', 'High'].map(p => (
                        <button key={p} type="button" className={`flex-grow py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${p === 'Normal' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Requirement Details</label>
                  <textarea 
                    rows="4" 
                    placeholder={`Please describe your ${selectedRequestType?.title.toLowerCase()} requirement...`}
                    className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-emerald-600/20 font-medium text-slate-900"
                    required
                  ></textarea>
                </div>

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.zip"
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-8 border-2 border-dashed rounded-[2rem] text-center space-y-2 transition-all cursor-pointer ${attachedFile ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 bg-slate-50/50 hover:border-emerald-200 group'}`}
                >
                  {attachedFile ? (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-md mb-2">
                        <FileText className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{attachedFile.name}</p>
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setAttachedFile(null); }}
                        className="mt-2 text-[9px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                      >
                        Remove File
                      </button>
                    </div>
                  ) : (
                    <>
                      <Plus className="w-8 h-8 text-slate-300 mx-auto group-hover:text-emerald-600 transition-colors" />
                      <p className="text-xs font-black text-slate-600 uppercase tracking-widest">Attach Supporting Documents</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Upload PAN card, Aadhaar or relevant proofs (Max 5MB)</p>
                    </>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="flex-grow py-5 bg-slate-50 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-grow-[2] py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 transition-all"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div 
            key="history-table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[3.5rem] border border-slate-100 shadow-xl overflow-hidden min-h-[400px]"
          >
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by ID or Type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-medium text-sm"
                />
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <button 
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${statusFilter !== 'All' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    <Filter className="w-4 h-4" />
                    <span>{statusFilter === 'All' ? 'Filter' : statusFilter}</span>
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
                          {['All', 'In Progress', 'Completed', 'Rejected'].map(status => (
                            <button 
                              key={status}
                              onClick={() => { setStatusFilter(status); setShowFilterDropdown(false); }}
                              className={`w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${statusFilter === status ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto pb-48">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Request ID</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredHistory.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-slate-900 tracking-tight">{req.id}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <FileText className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-700">{req.type}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-bold text-slate-500">{req.policy}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{req.date}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right relative">
                        <button 
                          onClick={() => setOpenActionId(openActionId === req.id ? null : req.id)}
                          className={`p-2 rounded-lg transition-all shadow-sm border ${openActionId === req.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 hover:text-slate-900 border-slate-100'}`}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        
                        <AnimatePresence>
                          {openActionId === req.id && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: -10 }}
                              className="absolute right-8 top-16 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
                            >
                              <div className="p-2 space-y-1">
                                <button 
                                  onClick={() => handleView(req)}
                                  className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 rounded-xl transition-all"
                                >
                                  <Eye className="w-4 h-4" />
                                  <span>View Details</span>
                                </button>
                                <button 
                                  onClick={() => handleDownloadAck(req)}
                                  className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all"
                                >
                                  <Download className="w-4 h-4" />
                                  <span>Download Acknowledgment</span>
                                </button>
                                <button 
                                  onClick={() => handleCancelRequest(req.id)}
                                  className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>Cancel Request</span>
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-8 bg-slate-50/30 border-t border-slate-50 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {filteredHistory.length} requests</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Details Modal */}
      <AnimatePresence>
        {viewingRequest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingRequest(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Request Details</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {viewingRequest.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setViewingRequest(null)}
                  className="p-3 bg-white text-slate-400 rounded-2xl hover:text-rose-500 transition-all shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 max-h-[80vh] overflow-y-auto space-y-8 scrollbar-hide">
                {/* Status Tracker */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tracking Status</h4>
                  <div className="relative flex justify-between px-2">
                    <div className={`absolute top-5 left-10 right-10 h-0.5 z-0 ${viewingRequest.status === 'Rejected' ? 'bg-rose-100' : 'bg-slate-100'}`} />
                    {[
                      { label: 'Submitted', date: viewingRequest.date, icon: CheckCircle2, active: true, color: 'emerald' },
                      { 
                        label: viewingRequest.status === 'Rejected' ? 'Processing' : 'Processing', 
                        date: viewingRequest.status === 'Rejected' ? 'Halted' : 'In Progress', 
                        icon: Clock, 
                        active: viewingRequest.status !== 'Submitted',
                        color: viewingRequest.status === 'Rejected' ? 'rose' : 'emerald'
                      },
                      { 
                        label: viewingRequest.status === 'Rejected' ? 'Rejected' : 'Completed', 
                        date: viewingRequest.status === 'Rejected' ? 'Declined' : (viewingRequest.status === 'Completed' ? 'Just Now' : 'Pending'), 
                        icon: viewingRequest.status === 'Rejected' ? X : ShieldCheck, 
                        active: viewingRequest.status === 'Rejected' || viewingRequest.status === 'Completed',
                        color: viewingRequest.status === 'Rejected' ? 'rose' : 'emerald'
                      }
                    ].map((step, i) => (
                      <div key={i} className="flex flex-col items-center text-center space-y-3 relative z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-xl transition-all ${step.active ? `bg-${step.color}-600 text-white scale-110` : 'bg-slate-100 text-slate-300'}`}>
                          <step.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={`text-[10px] font-black uppercase tracking-tight ${step.active ? (step.color === 'rose' ? 'text-rose-600' : 'text-slate-900') : 'text-slate-400'}`}>{step.label}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Request Type</p>
                    <p className="text-sm font-black text-slate-900">{viewingRequest.type}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Priority Level</p>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                      {viewingRequest.priority}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Linked Policy</p>
                    <p className="text-sm font-black text-slate-900">{viewingRequest.policy}</p>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Description</p>
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                    User requested for {viewingRequest.type.toLowerCase()} update for the policy {viewingRequest.policy}. 
                    All supporting documents have been verified and the request is currently being processed by our administrative team.
                  </p>
                </div>

                {viewingRequest.status === 'Rejected' && viewingRequest.rejectionReason && (
                  <div className="p-5 bg-rose-50 rounded-2xl border border-rose-100 space-y-2">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-rose-500" />
                      <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest">Rejection Reason</p>
                    </div>
                    <p className="text-[10px] text-rose-700 font-bold leading-relaxed italic">
                      "{viewingRequest.rejectionReason}"
                    </p>
                  </div>
                )}

                <div className="flex gap-4 pt-2">
                  <button 
                    onClick={() => handleDownloadAck(viewingRequest)}
                    className="flex-grow py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center space-x-3"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Acknowledgment</span>
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

export default ServiceRequests;
