import React, { useState } from 'react';
import { 
  FileText, Plus, Search, Filter, 
  MapPin, UserCheck, CreditCard, HelpCircle, 
  ChevronRight, Clock, CheckCircle2, AlertCircle,
  MoreVertical, ArrowRight, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ServiceRequests = () => {
  const [activeTab, setActiveTab] = useState('new'); // 'new' or 'history'
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedRequestType, setSelectedRequestType] = useState(null);

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
      id: 'contact', 
      title: 'Contact Details', 
      description: 'Update your mobile number or email address', 
      icon: FileText, 
      color: 'orange' 
    },
    { 
      id: 'other', 
      title: 'Other Requests', 
      description: 'Miscellaneous policy servicing requests', 
      icon: HelpCircle, 
      color: 'slate' 
    },
  ];

  const requestsHistory = [
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
      priority: 'High' 
    },
  ];

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

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Submitting request...',
        success: 'Service request raised successfully! ID: SR-' + Math.floor(10000 + Math.random() * 90000),
        error: 'Failed to submit. Please try again.',
      }
    );
    setShowRequestForm(false);
    setActiveTab('history');
  };

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
                    <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-bold text-slate-900 appearance-none">
                      <option>Health Elite Plus (HE-8829)</option>
                      <option>Term Life Cover (TL-4421)</option>
                      <option>Car Insurance (CI-9901)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Request Priority</label>
                    <div className="flex gap-2">
                      {['Low', 'Normal', 'High'].map(p => (
                        <button key={p} type="button" className={`flex-grow py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${p === 'Normal' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
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

                <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50 text-center space-y-2 group hover:border-emerald-200 transition-all cursor-pointer">
                  <Plus className="w-8 h-8 text-slate-300 mx-auto group-hover:text-emerald-600 transition-colors" />
                  <p className="text-xs font-black text-slate-600 uppercase tracking-widest">Attach Supporting Documents</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Upload PAN card, Aadhaar or relevant proofs (Max 5MB)</p>
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
            className="bg-white rounded-[3.5rem] border border-slate-100 shadow-xl overflow-hidden"
          >
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search requests..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-medium text-sm"
                />
              </div>
              <button className="flex items-center space-x-2 px-5 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>

            <div className="overflow-x-auto">
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
                  {requestsHistory.map((req) => (
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
                      <td className="px-8 py-6 text-right">
                        <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-slate-900 shadow-sm border border-transparent hover:border-slate-100">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-8 bg-slate-50/30 border-t border-slate-50 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing 3 of 12 requests</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceRequests;
