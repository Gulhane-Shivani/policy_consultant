import React, { useState } from 'react';
import { 
  Search, User, Shield, History, 
  FileText, MessageSquare, Phone, 
  Mail, MapPin, Calendar, ArrowUpRight, Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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
    },
    { 
      id: 'CUST-003', 
      name: 'Jane Cooper', 
      email: 'jane.c@example.com', 
      phone: '+91 99887 76655',
      address: 'Indira Nagar, Bangalore, India',
      status: 'Terminated',
      joinDate: '2021-02-15',
      policies: [
        { id: 'POL-1104', type: 'Term Life', provider: 'LIC', amount: 'Rs.15,000', status: 'Lapsed' }
      ],
      history: [
        { date: '2023-12-01', action: 'Policy Lapse Warning', status: 'Sent' }
      ]
    }
  ];

  const performSearch = (query) => {
    const searchTerm = query.toLowerCase().trim();
    console.log('Searching for:', searchTerm);

    if (!searchTerm) {
      setSelectedCustomer(null);
      return;
    }

    const found = mockCustomers.find(c => 
      c.name.toLowerCase().includes(searchTerm) || 
      c.id.toLowerCase().includes(searchTerm) || 
      c.phone.replace(/\s+/g, '').includes(searchTerm.replace(/\s+/g, '')) ||
      c.policies.some(p => p.id.toLowerCase().includes(searchTerm))
    );

    if (found) {
      console.log('Customer found:', found.name);
      setSelectedCustomer(found);
    } else {
      console.warn('No customer found for query:', searchTerm);
      alert('No customer found with that Name, ID, or Policy Number.');
      setSelectedCustomer(null);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Customer 360° View</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Unified Intelligence & Support Terminal</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50">
        <form onSubmit={onFormSubmit} className="relative max-w-3xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Name, Policy ID, or Mobile Number..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-32 py-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-600/5 focus:bg-white transition-all font-bold text-slate-900"
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg"
          >
            SEARCH
          </button>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Try Demo:</span>
          {[
            { label: 'Sarah Jenkins', query: 'Sarah' },
            { label: 'Policy #POL-5562', query: 'POL-5562' },
            { label: 'Jane Cooper', query: 'Jane' },
            { label: 'Mobile: 98765', query: '98765' }
          ].map((demo, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchQuery(demo.query);
                performSearch(demo.query);
              }}
              className="px-4 py-2 bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-xl text-[10px] font-black text-slate-600 hover:text-emerald-600 transition-all uppercase tracking-tight"
            >
              {demo.label}
            </button>
          ))}
        </div>
      </div>

      {selectedCustomer ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 xl:grid-cols-3 gap-8"
        >
          {/* Left Column: Profile Card */}
          <div className="xl:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 mb-6 border border-emerald-100 shadow-inner">
                  <User className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">{selectedCustomer.name}</h2>
                <div className="flex items-center space-x-2 mb-8">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    {selectedCustomer.status}
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Since {selectedCustomer.joinDate}</span>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-slate-50 rounded-xl"><Mail className="w-5 h-5 text-slate-400" /></div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Email Address</p>
                      <p className="text-sm font-bold text-slate-700 mt-1">{selectedCustomer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-slate-50 rounded-xl"><Phone className="w-5 h-5 text-slate-400" /></div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Phone Number</p>
                      <p className="text-sm font-bold text-slate-700 mt-1">{selectedCustomer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-slate-50 rounded-xl"><MapPin className="w-5 h-5 text-slate-400" /></div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Location</p>
                      <p className="text-sm font-bold text-slate-700 mt-1">{selectedCustomer.address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-slate-100 flex gap-4">
                  <button className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20">
                    Call Customer
                  </button>
                  <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg">
                    Email
                  </button>
                </div>
              </div>
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Right Column: Policies & History */}
          <div className="xl:col-span-2 space-y-8">
            {/* Active Policies */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-emerald-500" />
                  Policy Portfolio
                </h3>
                <button className="p-3 hover:bg-slate-50 rounded-2xl transition-all border border-slate-100">
                  <Plus className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedCustomer.policies.map((policy) => (
                  <div key={policy.id} className="p-6 rounded-3xl border border-slate-100 bg-slate-50/30 hover:border-emerald-200 hover:bg-white transition-all group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-white rounded-xl border border-slate-100 text-emerald-600 shadow-sm">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${policy.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {policy.status}
                      </span>
                    </div>
                    <h4 className="font-black text-slate-900 uppercase tracking-tight">{policy.type}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{policy.provider} • {policy.id}</p>
                    <div className="mt-6 flex justify-between items-end">
                      <p className="text-xl font-black text-slate-900">{policy.amount}</p>
                      <button className="flex items-center space-x-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                        <span>Details</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interaction History */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center">
                  <History className="w-6 h-6 mr-3 text-emerald-500" />
                  Interaction Logs
                </h3>
                <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors">
                  View Full History
                </button>
              </div>
              <div className="space-y-4">
                {selectedCustomer.history.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-6 rounded-3xl border border-slate-50 bg-slate-50/50">
                    <div className="flex items-center space-x-6">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.action}</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.date}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{item.status}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-5 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-black text-[10px] uppercase tracking-widest hover:border-emerald-600 hover:text-emerald-600 transition-all">
                Add New Interaction Note
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[4rem] p-32 text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl text-slate-200">
            <Search className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2 uppercase">Ready for Lookup</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest max-w-md mx-auto">
            Search for a customer to view their full 360° profile, policy portfolio, and interaction history.
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerSearch;
