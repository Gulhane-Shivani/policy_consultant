import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShieldCheck, DollarSign, Calendar, User, 
  MapPin, Activity, CreditCard, RefreshCw, X, Download,
  Printer, Share2, Mail, ExternalLink, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const PolicyDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : null;
  });
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    // In a real app, fetch from API. Mock data for now.
    const mockData = [
      { 
        id: 1, 
        policy_number: 'POL-8901', 
        client_name: 'John Doe', 
        type: 'Life Insurance', 
        premium: '1200', 
        status: 'Active',
        start_date: '2023-01-15',
        end_date: '2024-01-15',
        nominee_name: 'Mary Doe',
        nominee_relation: 'Spouse',
        benefits: 'Death cover, Critical illness',
        provider: 'HDFC Life',
        domain: 'hdfclife.com',
        payment_history: [
          { date: '2023-01-15', amount: '1200', status: 'Paid' }
        ],
        renewal_history: [
          { date: '2023-01-15', type: 'Initial' }
        ]
      },
      { 
        id: 2, 
        policy_number: 'POL-8902', 
        client_name: 'Jane Smith', 
        type: 'Health Insurance', 
        premium: '850', 
        status: 'Renewal Due',
        start_date: '2023-05-20',
        end_date: '2024-05-20',
        nominee_name: 'Sarah Smith',
        nominee_relation: 'Daughter',
        benefits: 'In-patient, Out-patient coverage',
        provider: 'Niva Bupa',
        domain: 'nivabupa.com',
        payment_history: [],
        renewal_history: []
      },
      { 
        id: 3, 
        policy_number: 'POL-8903', 
        client_name: 'Robert Brown', 
        type: 'Car Insurance', 
        premium: '450', 
        status: 'Active',
        start_date: '2023-08-10',
        end_date: '2024-08-10',
        nominee_name: 'Linda Brown',
        nominee_relation: 'Wife',
        benefits: 'Collision, Comprehensive',
        provider: 'ICICI Lombard',
        domain: 'icicilombard.com',
        payment_history: [],
        renewal_history: []
      },
      { 
        id: 4, 
        policy_number: 'POL-8904', 
        client_name: 'Emily Davis', 
        type: 'Business Insurance', 
        premium: '2500', 
        status: 'Expired',
        start_date: '2022-01-01',
        end_date: '2023-01-01',
        nominee_name: 'Mark Davis',
        nominee_relation: 'Partner',
        benefits: 'Property, Liability',
        provider: 'TATA AIG',
        domain: 'tataaig.com',
        payment_history: [],
        renewal_history: []
      },
    ];

    const found = mockData.find(p => p.id === parseInt(id));
    if (found) {
      setPolicy(found);
    } else {
      toast.error('Policy not found');
      navigate(-1);
    }
  }, [id, navigate]);

  if (!policy) return null;

  return (
    <div className="pb-20">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-slate-400 hover:text-emerald-600 font-bold transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-emerald-50 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="uppercase text-[10px] tracking-widest">Back to Policies</span>
        </button>

        <div className="flex items-center space-x-4">
          {user?.role !== 'user' && (
            <>
              <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-emerald-600 transition-all shadow-sm">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-emerald-600 transition-all shadow-sm">
                <Printer className="w-5 h-5" />
              </button>
              <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-tighter shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 transition-all">
                Edit Policy
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Card: Summary & Visuals */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/3 space-y-8"
        >
          <div className="bg-emerald-600 p-10 rounded-[3rem] text-white overflow-hidden relative shadow-2xl shadow-emerald-900/20">
            <ShieldCheck className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-xl">
                <img 
                  src={`https://www.google.com/s2/favicons?sz=128&domain=${policy.domain}`} 
                  alt={policy.provider}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <p className="text-emerald-200 font-black uppercase text-[10px] tracking-widest mb-2">{policy.type}</p>
              <h1 className="text-4xl font-black tracking-tighter mb-10 leading-none">{policy.policy_number}</h1>
              
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200 mb-1">Current Status</p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${policy.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`}></div>
                    <p className="text-2xl font-black">{policy.status}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 px-2">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-lg">
                    <DollarSign className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Annual Premium</p>
                    <p className="text-3xl font-black tracking-tight">₹{policy.premium}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg shadow-slate-200/50">
              <Calendar className="w-6 h-6 text-emerald-500 mb-3" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Valid From</p>
              <p className="text-sm font-black text-slate-900">{policy.start_date}</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg shadow-slate-200/50">
              <RefreshCw className="w-6 h-6 text-amber-500 mb-3" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Expires On</p>
              <p className="text-sm font-black text-slate-900">{policy.end_date}</p>
            </div>
          </div>
        </motion.div>

        {/* Right Section: Details & History */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:w-2/3 space-y-8"
        >
          {/* Detailed Info Card */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Policy Information</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Provider: {policy.provider}</p>
              </div>
              <div className="flex space-x-2">
                <span className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase">Policy ID: {policy.id}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-slate-400 mb-2">
                    <User className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Primary Client</span>
                  </div>
                  <p className="text-xl font-black text-slate-900">{policy.client_name}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-slate-400 mb-2">
                    <User className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Nominee Details</span>
                  </div>
                  <p className="text-xl font-black text-slate-900">{policy.nominee_name}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Relationship: {policy.nominee_relation}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-slate-400 mb-2">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Core Benefits</span>
                  </div>
                  <p className="text-sm font-bold text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">
                    "{policy.benefits}"
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="mt-12 pt-12 border-t border-slate-100 flex flex-wrap gap-4">
              <button className="flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all">
                <Mail className="w-4 h-4" />
                <span>Email Policy</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                <Share2 className="w-4 h-4" />
                <span>Share Access</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all ml-auto">
                <ExternalLink className="w-4 h-4" />
                <span>Carrier Portal</span>
              </button>
            </div>
          </div>

          {/* History Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-3 text-emerald-500" />
                Payment Log
              </h4>
              <div className="space-y-4">
                {policy.payment_history?.length > 0 ? policy.payment_history.map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <p className="text-xs font-black text-slate-900">{h.date}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Premium Installment</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-900">₹{h.amount}</p>
                      <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Confirmed</span>
                    </div>
                  </div>
                )) : (
                  <div className="py-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">No records found</div>
                )}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center">
                <RefreshCw className="w-5 h-5 mr-3 text-amber-500" />
                Renewal Log
              </h4>
              <div className="space-y-4">
                {policy.renewal_history?.length > 0 ? policy.renewal_history.map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <p className="text-xs font-black text-slate-900">{h.date}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{h.type} Lifecycle Event</p>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300">
                      <Shield className="w-5 h-5" />
                    </div>
                  </div>
                )) : (
                  <div className="py-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">No records found</div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PolicyDetailView;
