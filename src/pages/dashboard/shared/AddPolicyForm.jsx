import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShieldCheck, User, Phone, Mail, MapPin, 
  Calendar, FileText, CheckCircle, ChevronRight, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const POLICY_CATALOG = [
  { id: 'PLAN-H1', name: 'CARE SUPREME DISCOUNTED', category: 'Health', provider: 'Care Health', domain: 'careinsurance.com', premium: '615', coverage: '5 Lakh', benefits: 'No room rent limit, Unlimited restoration, Global Treatment, OPD Consultations', term: '1 Year' },
  { id: 'PLAN-H2', name: 'REASSURE 2.0 TITANIUM+', category: 'Health', provider: 'Niva Bupa', domain: 'nivabupa.com', premium: '628', coverage: '5 Lakh', benefits: 'No room rent limit, 100% no claim bonus, Modern Treatment, Zero Room Limit', term: '1 Year' },
  { id: 'PLAN-H3', name: 'COMPREHENSIVE INDIVIDUAL', category: 'Health', provider: 'Star Health', domain: 'starhealth.in', premium: '708', coverage: '5 Lakh', benefits: 'Single Private A/C Room, 100% restoration, Air Ambulance, Second Opinion', term: '1 Year' },
  { id: 'PLAN-H4', name: 'ACTIVE ONE MAX', category: 'Health', provider: 'Aditya Birla', domain: 'adityabirlacapital.com', premium: '517', coverage: '5 Lakh', benefits: 'No room rent limit, 100% no claim bonus, Health Returns, Chronic Care', term: '1 Year' },
  { id: 'PLAN-L1', name: 'TERM SMART GUARD', category: 'Life', provider: 'HDFC Life', domain: 'hdfclife.com', premium: '1200', coverage: '1 Crore', benefits: 'Whole life cover, Terminal illness benefit, Level Premium, Rider Options', term: 'Whole Life' },
  { id: 'PLAN-L2', name: 'IPROTECT SMART', category: 'Life', provider: 'ICICI Prudential', domain: 'iciciprulife.com', premium: '1150', coverage: '1 Crore', benefits: 'Accidental death cover, Critical illness rider, Life Stage Upgrades, Cancer Cover', term: 'Up to 85 yrs' },
  { id: 'PLAN-L3', name: 'STANDARD TERM PLAN', category: 'Life', provider: 'LIC of India', domain: 'licindia.in', premium: '900', coverage: '50 Lakh', benefits: 'Government backed, Tax savings U/S 80C, High Trust, Low Rejection', term: '35 Years' },
  { id: 'PLAN-C1', name: 'ECO DRIVE COMPREHENSIVE', category: 'Car', provider: 'Digit Insurance', domain: 'godigit.com', premium: '450', coverage: 'IDV 8L', benefits: 'Zero depreciation, 24/7 Roadside support, Self Inspection, Zero Paper', term: '1 Year' },
  { id: 'PLAN-C2', name: 'MOTOR SECURE PLUS', category: 'Car', provider: 'ICICI Lombard', domain: 'icicilombard.com', premium: '520', coverage: 'IDV 10L', benefits: 'Fast tag enabled, Cashless garage mesh, Key Replacement, Tyre Cover', term: '1 Year' },
  { id: 'PLAN-B1', name: 'SMB LIABILITY PRO', category: 'Business', provider: 'TATA AIG', domain: 'tataaig.com', premium: '2500', coverage: '50 Lakh', benefits: 'Professional indemnity, Cyber liability cover, Cyber Safe, Director Cover', term: '1 Year' },
  { id: 'PLAN-B2', name: 'ASSET PROTECTION ELITE', category: 'Business', provider: 'Bajaj Allianz', domain: 'bajajallianz.com', premium: '4200', coverage: '1 Crore', benefits: 'Fire & burglary cover, Public liability, Theft Cover, Machinery Breakdown', term: '1 Year' },
];

const AddPolicyForm = () => {
  const navigate = useNavigate();
  const [user] = useState(() => {
    const s = localStorage.getItem('user');
    return s && s !== 'undefined' ? JSON.parse(s) : null;
  });

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  const [form, setForm] = useState({
    client_name: '', email: '', contact: '', address: '',
    nominee_name: '', nominee_relation: '', nominee_contact: '',
    policy_type: '',
    plan_id: '',
    start_date: '', end_date: '', policy_period: ''
  });

  const backPath = user?.role === 'super_admin' ? '/super-admin/policies'
    : user?.role === 'admin' ? '/admin/policies' : '/dashboard/policies';

  const selectedPlan = POLICY_CATALOG.find(p => p.id === form.plan_id) || null;

  const handleNext = () => {
    if (step === 1) {
      if (!form.client_name || !form.contact) {
        toast.error('Name and Contact are required.');
        return;
      }
    } else if (step === 2) {
      if (!form.policy_type) {
        toast.error('Please select a policy type.');
        return;
      }
    } else if (step === 3) {
      if (!form.plan_id) {
        toast.error('Please select a policy plan.');
        return;
      }
    }
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.start_date || !form.end_date) {
      toast.error('Start Date and End Date are required.');
      return;
    }

    const newPolicy = {
      id: Date.now(),
      policy_number: `POL-${Math.floor(1000 + Math.random() * 9000)}`,
      client_name: form.client_name,
      email: form.email,
      contact: form.contact,
      address: form.address,
      type: selectedPlan.category + ' Insurance',
      provider: selectedPlan.provider,
      domain: selectedPlan.domain,
      premium: selectedPlan.premium,
      coverage: selectedPlan.coverage,
      benefits: selectedPlan.benefits,
      start_date: form.start_date,
      end_date: form.end_date,
      nominee_name: form.nominee_name,
      nominee_relation: form.nominee_relation,
      plan_name: selectedPlan.name,
      plan_id: selectedPlan.id,
      payment_history: [],
      renewal_history: []
    };
    
    const existing = JSON.parse(localStorage.getItem('bought_policies') || '[]');
    localStorage.setItem('bought_policies', JSON.stringify([newPolicy, ...existing]));
    setSubmitted(true);
    toast.success('Policy created successfully!');
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-16 rounded-[3rem] shadow-2xl text-center max-w-md">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Policy Issued!</h2>
          <p className="text-slate-500 font-bold text-sm mb-8">The policy has been successfully created and assigned to the customer.</p>
          <button onClick={() => navigate(backPath)} className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg">
            Back to Policies
          </button>
        </motion.div>
      </div>
    );
  }

  const steps = [
    { num: 1, title: 'Customer Details' },
    { num: 2, title: 'Policy Type' },
    { num: 3, title: 'Policy Plan' },
    { num: 4, title: 'Duration & Issue' },
  ];

  return (
    <div className="space-y-8 pb-16">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate(backPath)} className="flex items-center space-x-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-sm">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Policies</span>
        </button>
      </div>

      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Issue New Policy</h1>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Multi-step Issuance Process</p>
      </div>

      {/* Stepper */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between relative">
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-100 -z-0 -translate-y-1/2 rounded-full"></div>
        <div className="absolute top-1/2 left-8 h-1 bg-emerald-500 -z-0 -translate-y-1/2 rounded-full transition-all duration-300" style={{ width: `calc(${((step - 1) / 3) * 100}% - 4rem)` }}></div>
        
        {steps.map((s, i) => (
          <div key={s.num} className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-colors ${
              step > s.num ? 'bg-emerald-500 text-white' : step === s.num ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-400'
            }`}>
              {step > s.num ? <Check className="w-5 h-5" /> : s.num}
            </div>
            <p className={`mt-2 text-[10px] uppercase tracking-widest font-bold ${step >= s.num ? 'text-slate-900' : 'text-slate-400'}`}>
              {s.title}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-10">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Customer Details */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center"><User className="w-6 h-6 mr-3 text-emerald-600" /> Customer Information</h2>
                  <p className="text-slate-500 font-bold text-sm mt-1">Provide the policyholder's details.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name <span className="text-rose-500">*</span></label>
                    <input type="text" placeholder="e.g. Shivani Gulhane" value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:border-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Number <span className="text-rose-500">*</span></label>
                    <input type="tel" placeholder="+91 98765 43210" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:border-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" placeholder="example@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:border-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registered Address</label>
                    <input type="text" placeholder="Plot 42, Sector 5..." value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:border-emerald-500" />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Nominee Details <span className="text-slate-400 font-bold normal-case">(Optional)</span></h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nominee Name</label>
                      <input type="text" placeholder="Full name" value={form.nominee_name} onChange={e => setForm({...form, nominee_name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:border-emerald-500" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Relation</label>
                      <select value={form.nominee_relation} onChange={e => setForm({...form, nominee_relation: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:border-emerald-500">
                        <option value="">Select</option>
                        {['Spouse', 'Parent', 'Child', 'Sibling', 'Other'].map(r => <option key={r}>{r}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</label>
                      <input type="tel" placeholder="+91 ..." value={form.nominee_contact} onChange={e => setForm({...form, nominee_contact: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:border-emerald-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Policy Type */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center"><ShieldCheck className="w-6 h-6 mr-3 text-emerald-600" /> Policy Category</h2>
                  <p className="text-slate-500 font-bold text-sm mt-1">Select the broad category of insurance.</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Health', 'Life', 'Car', 'Business'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setForm({...form, policy_type: type, plan_id: ''})} // Reset plan if type changes
                      className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-3 ${
                        form.policy_type === type ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-white hover:border-emerald-200 text-slate-600'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${form.policy_type === type ? 'bg-emerald-200/50' : 'bg-slate-100'}`}>
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <span className="font-black tracking-tight">{type}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Policy Plan */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center"><FileText className="w-6 h-6 mr-3 text-emerald-600" /> Select Plan</h2>
                  <p className="text-slate-500 font-bold text-sm mt-1">Choose a specific plan under {form.policy_type} Insurance.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto custom-scrollbar p-1">
                  {POLICY_CATALOG.filter(p => p.category === form.policy_type).map(plan => (
                    <button 
                      key={plan.id}
                      onClick={() => setForm({...form, plan_id: plan.id})}
                      className={`text-left p-6 rounded-2xl border-2 transition-all ${
                        form.plan_id === plan.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-white hover:border-emerald-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <img src={`https://www.google.com/s2/favicons?sz=64&domain=${plan.domain}`} alt={plan.provider} className="w-8 h-8 rounded-lg" />
                        <div>
                          <p className="text-xs font-black text-slate-900 line-clamp-1">{plan.name}</p>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{plan.provider}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Premium</span>
                          <span className="text-xs font-black text-slate-900">₹{plan.premium}/yr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Coverage</span>
                          <span className="text-xs font-black text-slate-900">{plan.coverage}</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-600 font-medium leading-relaxed line-clamp-2">
                        {plan.benefits}
                      </div>
                    </button>
                  ))}
                  {POLICY_CATALOG.filter(p => p.category === form.policy_type).length === 0 && (
                    <p className="text-slate-500 italic col-span-full">No plans available for this category.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 4: Duration & Issuance */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center"><Calendar className="w-6 h-6 mr-3 text-emerald-600" /> Policy Duration</h2>
                  <p className="text-slate-500 font-bold text-sm mt-1">Set the validity period for this policy.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Start Date <span className="text-rose-500">*</span></label>
                      <input type="date" value={form.start_date} onChange={e => {
                        const sd = e.target.value;
                        let ed = form.end_date;
                        let period = form.policy_period;
                        if(sd && ed) {
                           period = new Date(ed).getFullYear() - new Date(sd).getFullYear();
                        }
                        setForm({...form, start_date: sd, policy_period: period});
                      }} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:border-emerald-500" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End Date <span className="text-rose-500">*</span></label>
                      <input type="date" value={form.end_date} onChange={e => {
                        const ed = e.target.value;
                        let sd = form.start_date;
                        let period = form.policy_period;
                        if(sd && ed) {
                           period = new Date(ed).getFullYear() - new Date(sd).getFullYear();
                        }
                        setForm({...form, end_date: ed, policy_period: period});
                      }} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:border-emerald-500" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy Period (Years)</label>
                      <div className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-2xl font-bold text-slate-600 flex items-center justify-between">
                        <span>{form.policy_period || 0}</span>
                        <span className="text-[10px] uppercase tracking-widest">Years Bond</span>
                      </div>
                    </div>
                  </div>

                  {/* Final Review Summary */}
                  <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-xl space-y-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Final Review</h3>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase">Customer</p>
                      <p className="font-bold">{form.client_name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase">Plan Selected</p>
                      <p className="font-bold text-emerald-400">{selectedPlan?.name}</p>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-4 mt-4">
                      <p className="text-sm font-black text-slate-400">Total Premium</p>
                      <p className="text-lg font-black text-white">₹{selectedPlan?.premium}/yr</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <button 
            onClick={handleBack} 
            disabled={step === 1}
            className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200 shadow-sm'}`}
          >
            Back
          </button>
          
          {step < 4 ? (
            <button 
              onClick={handleNext}
              className="flex items-center px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
            >
              Continue <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="flex items-center px-10 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20"
            >
              Issue Policy <CheckCircle className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPolicyForm;
