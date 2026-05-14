import React, { useState } from 'react';
import { 
  Search, User, Shield, History, 
  FileText, MessageSquare, Phone, 
  Mail, MapPin, Calendar, ArrowUpRight, Plus,
  ShieldCheck, ArrowLeft, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const CustomerSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const mockCustomers = [
    { 
      id: 'CUST-001', 
      name: 'Sarah Jenkins', 
      email: 'sarah.j@example.com', 
      phone: '+91 98765 43210',
      address: 'Skyline Apts, Mumbai, India',
      status: 'Active',
      joinDate: '2023-05-12',
      policies: [
        { id: 'POL-8901', type: 'Life Insurance', provider: 'HDFC Life', amount: 'Rs.12,500', status: 'Active' },
        { id: 'POL-2231', type: 'Health Insurance', provider: 'Niva Bupa', amount: 'Rs.8,200', status: 'Grace Period' }
      ],
      history: [
        { date: '2024-05-10', action: 'Policy Renewal Payment', status: 'Completed' },
        { date: '2024-04-15', action: 'Address Update Request', status: 'Resolved' },
        { date: '2024-03-20', action: 'Claim Query', status: 'Resolved' }
      ]
    },
    { 
      id: 'CUST-002', 
      name: 'Robert Fox', 
      email: 'robert.f@example.com', 
      phone: '+91 91234 56789',
      address: 'Green Valley, Pune, India',
      status: 'Active',
      joinDate: '2022-11-20',
      policies: [
        { id: 'POL-5562', type: 'Motor Insurance', provider: 'ICICI Lombard', amount: 'Rs.4,500', status: 'Active' }
      ],
      history: [
        { date: '2024-05-12', action: 'Document Verification', status: 'Completed' }
      ]
    }
  ];

  const performSearch = (query) => {
    const searchTerm = (query || searchQuery).toLowerCase().trim();
    if (!searchTerm) return toast.error('Enter Name, ID or Mobile');
    
    setIsSearching(true);
    setTimeout(() => {
      const found = mockCustomers.find(c => 
        c.name.toLowerCase().includes(searchTerm) || 
        c.id.toLowerCase().includes(searchTerm) || 
        c.phone.replace(/\s+/g, '').includes(searchTerm.replace(/\s+/g, ''))
      );

      if (found) {
        setSelectedCustomer(found);
        toast.success(`Profile for ${found.name} loaded`);
      } else {
        toast.error('No customer record found');
        setSelectedCustomer(null);
      }
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 leading-none">Customer 360° View</h1>
          <p className="text-slate-500 font-bold text-[10px] mt-1">Unified intelligence & support terminal</p>
        </div>
        {selectedCustomer && (
           <button onClick={() => setSelectedCustomer(null)} className="flex items-center space-x-2 text-xs font-black text-slate-400 hover:text-slate-900 transition-all">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Search</span>
           </button>
        )}
      </div>

      {!selectedCustomer ? (
        <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-2xl shadow-slate-200/50 flex flex-col items-center justify-center text-center">
           <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner text-slate-300">
              <Search className="w-10 h-10" />
           </div>
           <h2 className="text-2xl font-black text-slate-900 mb-4">Unified Customer Lookup</h2>
           <p className="text-xs font-bold text-slate-400 max-w-sm mb-10">Access policy history, interaction logs, and profile details in one unified view.</p>
           
           <div className="relative w-full max-w-2xl">
              <input 
                type="text" 
                placeholder="Search by Name, Policy ID, or Mobile Number..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                className="w-full pl-8 pr-36 py-6 bg-slate-50 border border-slate-200 rounded-3xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-emerald-600/5 transition-all text-lg shadow-inner"
              />
              <button 
                onClick={() => performSearch()}
                disabled={isSearching}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-emerald-600 transition-all flex items-center space-x-2 shadow-xl"
              >
                {isSearching ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <Search className="w-4 h-4" />}
                <span>{isSearching ? 'Loading' : 'Search'}</span>
              </button>
           </div>

           <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Quick Access:</span>
              {['Sarah Jenkins', 'Robert Fox', '98765'].map((demo) => (
                <button
                  key={demo}
                  onClick={() => { setSearchQuery(demo); performSearch(demo); }}
                  className="px-4 py-2 bg-slate-50 hover:bg-white border border-slate-100 hover:border-emerald-200 rounded-xl text-[10px] font-black text-slate-600 hover:text-emerald-600 transition-all shadow-sm"
                >
                  {demo}
                </button>
              ))}
           </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 xl:grid-cols-3 gap-8"
        >
          {/* Profile Card */}
          <div className="xl:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 text-center">
                <div className="w-28 h-28 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-emerald-600 mx-auto mb-6 border border-emerald-100 shadow-inner group-hover:scale-105 transition-transform">
                  <User className="w-14 h-14" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{selectedCustomer.name}</h2>
                <div className="flex items-center justify-center space-x-3 mb-8">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black border border-emerald-100">
                    {selectedCustomer.status}
                  </span>
                  <span className="text-[10px] font-black text-slate-400">ID: {selectedCustomer.id}</span>
                </div>

                <div className="space-y-4 text-left px-2">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-4">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-[9px] font-black text-slate-400">Email</p>
                      <p className="text-xs font-bold text-slate-700">{selectedCustomer.email}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-4">
                    <Phone className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-[9px] font-black text-slate-400">Mobile</p>
                      <p className="text-xs font-bold text-slate-700">{selectedCustomer.phone}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-4">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-[9px] font-black text-slate-400">Address</p>
                      <p className="text-xs font-bold text-slate-700">{selectedCustomer.address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4">
                   <button onClick={() => toast.success('Connecting Call...')} className="py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] hover:bg-indigo-600 transition-all shadow-xl">Call Mobile</button>
                   <button onClick={() => toast.success('Email draft opened')} className="py-4 bg-slate-50 text-slate-600 border border-slate-100 rounded-2xl font-black text-[10px] hover:bg-slate-100 transition-all">Send Email</button>
                </div>
              </div>
              <ShieldCheck className="absolute -right-10 -bottom-10 w-40 h-40 text-slate-50 -rotate-12 pointer-events-none" />
            </div>
          </div>

          <div className="xl:col-span-2 space-y-8">
            {/* Policies */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black text-slate-900 flex items-center">
                     <Shield className="w-6 h-6 mr-3 text-emerald-500" />
                     Policy Portfolio
                  </h3>
                  <button className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">Issue New</button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCustomer.policies.map((p) => (
                    <div key={p.id} className="p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group">
                       <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                             <FileText className="w-6 h-6" />
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black ${p.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{p.status}</span>
                       </div>
                       <h4 className="text-lg font-black text-slate-900 mb-1">{p.type}</h4>
                       <p className="text-[10px] font-bold text-slate-400">{p.provider} • {p.id}</p>
                       <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100">
                          <span className="text-xl font-black text-slate-900">{p.amount}</span>
                          <button className="p-2 text-slate-300 hover:text-emerald-500 group-hover:translate-x-2 transition-all"><ChevronRight className="w-6 h-6" /></button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Logs */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black text-slate-900 flex items-center">
                     <Clock className="w-6 h-6 mr-3 text-emerald-500" />
                     Interaction Logs
                  </h3>
               </div>
               <div className="space-y-4">
                  {selectedCustomer.history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                       <div className="flex items-center space-x-6">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                          <div>
                             <p className="text-sm font-black text-slate-900">{h.action}</p>
                             <p className="text-[10px] font-bold text-slate-400">{h.date}</p>
                          </div>
                       </div>
                       <span className="text-[9px] font-black text-indigo-600 px-3 py-1 bg-indigo-50 rounded-lg">{h.status}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-8 py-5 border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-400 font-black text-[10px] hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Log New Interaction</span>
               </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CustomerSearch;
