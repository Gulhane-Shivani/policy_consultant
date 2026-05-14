import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShieldCheck, DollarSign, Calendar, User, 
  MapPin, Activity, CreditCard, RefreshCw, X, Download,
  Printer, Share2, Mail, ExternalLink, Shield, Layers, Phone
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
        client_name: 'Shivani Ashok Gulhane', 
        type: 'Life Insurance', 
        premium: '1200', 
        status: 'Active',
        start_date: '2023-01-15',
        end_date: '2026-06-10', // Renewal Due (within 30 days of 2026-05-13)
        nominee_name: 'Mary Doe',
        nominee_relation: 'Spouse',
        benefits: 'Death cover, Critical illness',
        provider: 'HDFC Life',
        domain: 'hdfclife.com',
        payment_history: [
          { date: '2023-01-15', amount: '1200', status: 'Paid' },
          { date: '2024-01-15', amount: '1200', status: 'Paid' },
          { date: '2025-01-15', amount: '1200', status: 'Paid' }
        ],
        renewal_history: [
          { date: '2023-01-15', type: 'Initial' },
          { date: '2024-01-15', type: 'Renewal' },
          { date: '2025-01-15', type: 'Renewal' }
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

    const boughtPolicies = JSON.parse(localStorage.getItem('bought_policies') || '[]');
    const combinedData = [...mockData, ...boughtPolicies];

    const found = combinedData.find(p => p.id.toString() === id.toString());
    if (found) {
      setPolicy(found);
    } else {
      toast.error('Policy not found');
      navigate(-1);
    }
  }, [id, navigate]);

  // Status Validation Helper
  const getValidatedStatus = (p) => {
    const now = new Date();
    const end = new Date(p.end_date);
    const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays <= 30) return 'Renewal Due';
    return 'Active';
  };

  if (!policy) return null;

  const currentStatus = getValidatedStatus(policy);

  return (
    <div className="pb-20 space-y-8">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-slate-400 hover:text-emerald-600 font-bold transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-emerald-50 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="uppercase text-[9px] tracking-widest">
            {user?.role === 'user' ? 'Back to My Policies' : 'Back to Overview'}
          </span>
        </button>
      </div>

      {/* Main Premium Header */}
      <div className="bg-[#0f172a] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/10 shadow-inner overflow-hidden p-3">
              <img 
                src={`https://www.google.com/s2/favicons?sz=128&domain=${policy.domain}`} 
                alt={policy.provider}
                className="w-full h-full object-contain"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div className="hidden w-full h-full items-center justify-center font-black text-emerald-400 text-2xl">
                {policy.provider?.substring(0, 1)}
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-none mb-2 uppercase">{policy.type}</h1>
              <p className="text-slate-400 font-bold text-xs tracking-widest uppercase flex items-center">
                {policy.policy_number} • {policy.provider}
              </p>
              <div className="mt-4">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${currentStatus === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                  {currentStatus}
                </span>
              </div>
            </div>
          </div>

        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -mr-48 -mt-48 blur-3xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Customer Information Card - Hidden for customers to focus on policy details */}
          {user?.role !== 'user' && (
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <User className="w-24 h-24 text-slate-50 opacity-50 absolute -top-8 -right-8" />
              </div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase mb-8 flex items-center relative z-10">
                <User className="w-5 h-5 mr-3 text-emerald-600" />
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Full Name</p>
                    <p className="text-lg font-black text-slate-900">{policy.client_name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact Number</p>
                    <div className="flex items-center text-slate-700 font-bold">
                      <Phone className="w-4 h-4 mr-2 text-emerald-500" />
                      {policy.contact || '+91 98765 43210'}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Registered Address</p>
                    <div className="flex items-start text-slate-700 font-bold leading-relaxed">
                      <MapPin className="w-4 h-4 mr-2 mt-1 text-emerald-500 shrink-0" />
                      {policy.address || 'Plot No. 45, Sector 12, Gulhane Enclave, Amravati, Maharashtra - 444601'}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Policy Bond Period</p>
                    <p className="text-2xl font-black text-emerald-600 mb-2">
                      {(() => {
                        const start = new Date(policy.start_date);
                        const end = new Date(policy.end_date);
                        const years = end.getFullYear() - start.getFullYear();
                        return `${years} Years Bond`;
                      })()}
                    </p>
                    {(() => {
                      let min = '1 Year', max = 'Varies';
                      const t = policy.type.toLowerCase();
                      if (t.includes('term')) { min = '10 Years'; max = '40 Years'; }
                      else if (t.includes('whole life')) { min = 'Lifelong'; max = 'Age 99'; }
                      else if (t.includes('life')) { min = '5 Years'; max = 'Up to 99 Years'; }
                      else if (t.includes('health')) { min = '1 Year'; max = 'Lifetime Renewal'; }
                      else if (t.includes('car')) { min = '1 Year'; max = 'Up to 3 Years'; }
                      else if (t.includes('bike')) { min = '1 Year'; max = 'Up to 5 Years'; }
                      return (
                        <div className="flex items-center space-x-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 p-2 rounded-lg">
                          <span>Min: <span className="text-slate-700">{min}</span></span>
                          <span>•</span>
                          <span>Max: <span className="text-slate-700">{max}</span></span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Coverage Details */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase mb-8 flex items-center">
              <Layers className="w-5 h-5 mr-3 text-emerald-600" />
              Coverage Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, label: 'Death Benefit' },
                { icon: Activity, label: 'Terminal Illness' },
                { icon: ShieldCheck, label: 'Accidental Death Rider' },
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4 p-6 bg-slate-50 rounded-2xl border border-transparent hover:border-emerald-100 transition-all group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits & Features */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase mb-8 flex items-center">
              <Activity className="w-5 h-5 mr-3 text-emerald-600" />
              Benefits & Features
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              {[
                'High sum assured at low premium',
                'Tax benefits under 80C',
                'Pure risk cover',
                'Flexible premium payment terms'
              ].map((text, i) => (
                <li key={i} className="flex items-start space-x-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 group-hover:scale-150 transition-transform" />
                  <span className="text-sm font-bold text-slate-600">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Maturity & Loan Details */}
          <div className="bg-emerald-50/50 p-10 rounded-[2.5rem] border border-emerald-100 shadow-sm">
            <h2 className="text-lg font-black text-emerald-900 tracking-tight uppercase mb-8">Maturity & Loan Details</h2>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Cash Value', value: '₹0' },
                { label: 'Surrender Value', value: '₹0' },
                { label: 'Loan Eligibility', value: '₹0' },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-black text-emerald-900 tracking-widest">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Payment History */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase mb-8 flex items-center">
              <CreditCard className="w-5 h-5 mr-3 text-emerald-600" />
              Premium Payment History
            </h2>
            <div className="space-y-4">
              {policy.payment_history?.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div>
                    <p className="text-sm font-black text-slate-900">{h.date}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">UPI • TXN-88291</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-900">₹{h.amount}</p>
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md">Success</span>
                  </div>
                </div>
              ))}
              {!policy.payment_history?.length && (
                <div className="text-center py-10 text-slate-400 font-bold uppercase text-[10px] tracking-widest">No payment records found</div>
              )}
            </div>
          </div>

          {/* Renewal History */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase mb-8 flex items-center">
              <RefreshCw className="w-5 h-5 mr-3 text-amber-500" />
              Renewal Lifecycle History
            </h2>
            <div className="space-y-4">
              {policy.renewal_history?.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{r.type}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Processed on {r.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-md">Completed</span>
                  </div>
                </div>
              ))}
              {!policy.renewal_history?.length && (
                <div className="text-center py-10 text-slate-400 font-bold uppercase text-[10px] tracking-widest">No renewal records found</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebars */}
        <div className="space-y-8">
          {/* Policy Period */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Policy Period</h3>
            <div className="space-y-4">
              {[
                { label: 'Start Date', value: policy.start_date },
                { label: 'End Date', value: policy.end_date },
                { label: 'Premium', value: `₹${policy.premium}/yr` },
                { label: 'Due Date', value: policy.end_date },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{item.label}</span>
                  <span className="text-xs font-black text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nominee Card - Hidden for customers to keep focus on policy specs */}
          {user?.role !== 'user' && (
            <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Nominee</h3>
              </div>
              <div>
                <p className="text-lg font-black text-slate-900">{policy.nominee_name}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{policy.nominee_relation}</p>
              </div>
            </div>
          )}

          {/* Policy Documents */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Policy Documents</h3>
            <div className="space-y-4">
              {[
                'Policy Certificate',
                'Premium Receipt',
                'ID Card'
              ].map((doc, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-transparent hover:border-emerald-200 transition-all group">
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{doc}</span>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetailView;
