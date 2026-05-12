import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Activity, Car, Briefcase, ChevronRight,
  Shield, CheckCircle2, Search, Filter, ArrowRight,
  TrendingUp, Star, Award, ChevronDown, CheckCircle, Info,
  X, FileText, CreditCard, Lock, Check, Zap, ArrowLeft
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Plans = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPlanId, setExpandedPlanId] = useState(null);
  
  // Purchase Flow State
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : null;
  });

  const plans = [
    {
      id: 1, type: 'Health', name: 'Care Supreme Discounted', provider: 'Care Health', domain: 'careinsurance.com', cover: '5 Lakh', price: 615,
      features: ['No room rent limit', 'Unlimited restoration'], color: 'blue',
      details: 'Comprehensive health coverage designed for families with priority hospital networks and AI-guided wellness programs.',
      howToClaim: '1. Visit Network Hospital 2. Show Policy ID 3. Cashless approval in 2 hours.',
      benefits: ['Global Treatment', 'OPD Consultations', 'Maternity Cover']
    },
    {
      id: 2, type: 'Health', name: 'Reassure 2.0 Titanium+', provider: 'Niva Bupa', domain: 'nivabupa.com', cover: '5 Lakh', price: 628,
      features: ['No room rent limit', '100% no claim bonus'], color: 'emerald',
      details: 'Elite medical protection with zero-deductibles and instant renewal discounts based on your step-count.',
      howToClaim: '1. Intimate via App 2. Upload Bills 3. Payout in 48 hours for non-network.',
      benefits: ['Zero Room Limit', 'Modern Treatment', 'No Claim Bonus']
    },
    {
      id: 3, type: 'Health', name: 'Comprehensive Individual', provider: 'Star Health', domain: 'starhealth.in', cover: '5 Lakh', price: 708,
      features: ['Single Private A/C Room', '100% restoration'], color: 'teal',
      details: 'Reliable individual health insurance with a vast network of 10,000+ hospitals across India.',
      howToClaim: '1. Call 24/7 Helpline 2. Pre-auth in 1 hour 3. Treatment starts.',
      benefits: ['Air Ambulance', 'Second Opinion', 'AYUSH Treatment']
    },
    {
      id: 4, type: 'Health', name: 'Active One Max', provider: 'Aditya Birla', domain: 'adityabirlacapital.com', cover: '5 Lakh', price: 517,
      features: ['No room rent limit', '100% no claim bonus'], color: 'rose',
      details: 'Modern insurance for the active generation, rewarding a healthy lifestyle with up to 50% health returns.',
      howToClaim: '1. Simple QR scan at hospital 2. Verified via App 3. Automated Payout.',
      benefits: ['Health Returns', 'Chronic Care', 'Mental Wellness']
    },
    {
      id: 5, type: 'Life', name: 'Term Smart Guard', provider: 'HDFC Life', domain: 'hdfclife.com', cover: '1 Crore', price: 1200,
      features: ['Whole life cover', 'Terminal illness benefit'], color: 'indigo',
      details: 'Maximum security for your family with flexible payouts and critical illness protection.',
      howToClaim: '1. Family notifies company 2. Documents via Email 3. Fast-track Payout.',
      benefits: ['Level Premium', 'Rider Options', 'Easy Onboarding']
    },
    {
      id: 6, type: 'Life', name: 'iProtect Smart', provider: 'ICICI Prudential', domain: 'iciciprulife.com', cover: '1 Crore', price: 1150,
      features: ['Accidental death cover', 'Critical illness rider'], color: 'violet',
      details: 'Intelligent term insurance that adjusts its coverage based on your life stages (marriage, kids).',
      howToClaim: '1. One-click Claim 2. Physical audit 3. Full settlement guaranteed.',
      benefits: ['Life Stage Upgrades', 'Cancer Cover', 'Simple Document']
    },
    {
      id: 7, type: 'Life', name: 'Standard Term Plan', provider: 'LIC of India', domain: 'licindia.in', cover: '50 Lakh', price: 900,
      features: ['Government backed', 'Tax savings U/S 80C'], color: 'orange',
      details: 'Trust-backed government term plan providing simple and reliable life cover for everyone.',
      howToClaim: '1. Visit nearest branch 2. Submit form 3. Cheque delivery.',
      benefits: ['High Trust', 'Low Rejection', 'Offline Network']
    },
    {
      id: 8, type: 'Car', name: 'Eco Drive Comprehensive', provider: 'Digit Insurance', domain: 'godigit.com', cover: 'IDV 8 Lakh', price: 450,
      features: ['Zero depreciation', '24/7 Roadside support'], color: 'amber',
      details: 'Paperless car insurance with 1-hour inspection and cashless repairs at any garage.',
      howToClaim: '1. Upload Photo 2. Get Approval 3. Drive to Garage.',
      benefits: ['Self Inspection', 'Zero Paper', 'Engine Protector']
    },
    {
      id: 9, type: 'Car', name: 'Motor Secure Plus', provider: 'ICICI Lombard', domain: 'icicilombard.com', cover: 'IDV 10 Lakh', price: 520,
      features: ['Fast tag enabled', 'Cashless garage mesh'], color: 'blue',
      details: 'The standard for motor protection in India, offering comprehensive coverage and roadside assistance.',
      howToClaim: '1. Call Towing 2. Workshop drop 3. Get Car back.',
      benefits: ['Key Replacement', 'Tyre Cover', 'Consumables Pay']
    },
    {
      id: 10, type: 'Business', name: 'SMB Liability Pro', provider: 'TATA AIG', domain: 'tataaig.com', cover: '50 Lakh', price: 2500,
      features: ['Professional indemnity', 'Cyber liability cover'], color: 'slate',
      details: 'Protect your professional venture from legal liabilities, cyber threats, and physical asset damage.',
      howToClaim: '1. Case Notification 2. Advisor assigned 3. Legal assist.',
      benefits: ['Cyber Safe', 'Director Cover', 'Employee Trust']
    },
    {
      id: 11, type: 'Business', name: 'Asset Protection Elite', provider: 'Bajaj Allianz', domain: 'bajajallianz.com', cover: '1 Crore', price: 4200,
      features: ['Fire & burglary cover', 'Public liability'], color: 'slate',
      details: 'Total management of your business risks, from fire accidents to third-party public liabilities.',
      howToClaim: '1. Loss assessment 2. Audit 3. Direct settlement.',
      benefits: ['Theft Cover', 'Machinery Breakdown', 'Stock Insure']
    },
  ];

  const categories = [
    { name: 'All', icon: Shield },
    { name: 'Health', icon: Activity },
    { name: 'Life', icon: Heart },
    { name: 'Car', icon: Car },
    { name: 'Business', icon: Briefcase },
  ];

  const filteredPlans = useMemo(() => {
    return plans.filter(plan => {
      const matchesFilter = filter === 'All' || plan.type === filter;
      const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.provider.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const toggleExpand = (id) => {
    setExpandedPlanId(expandedPlanId === id ? null : id);
  };

  const handleBuyNow = (plan) => {
    setSelectedPlan(plan);
    setPurchaseStep(1);
    setIsPurchaseModalOpen(true);
  };

  const handleCompletePurchase = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      const newPolicy = {
        id: Date.now(),
        policy_number: `POL-${Math.floor(1000 + Math.random() * 9000)}`,
        client_name: user?.full_name || 'Customer',
        type: selectedPlan.type + ' Insurance',
        premium: selectedPlan.price.toString(),
        status: 'Active',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        provider: selectedPlan.provider,
        domain: selectedPlan.domain,
        benefits: selectedPlan.benefits.join(', '),
        nominee_name: 'Not Assigned',
        nominee_relation: 'N/A',
        payment_history: [{ date: new Date().toISOString().split('T')[0], amount: selectedPlan.price.toString(), status: 'Paid' }],
        renewal_history: [{ date: new Date().toISOString().split('T')[0], type: 'Initial' }]
      };

      // Save to localStorage for persistence
      const savedPolicies = JSON.parse(localStorage.getItem('bought_policies') || '[]');
      localStorage.setItem('bought_policies', JSON.stringify([newPolicy, ...savedPolicies]));

      setIsProcessing(false);
      toast.success('Policy purchased successfully!');
      setIsPurchaseModalOpen(false);
      navigate('/dashboard/policies');
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Horizontal Filter Bar */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Best <span className="text-emerald-600">Insurance</span> Portfolios</h1>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Zero Commission • Direct Settlement</p>
            </div>

            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setFilter(cat.name)}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-xl font-bold transition-all ${filter === cat.name
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'bg-white text-slate-500 hover:bg-slate-50'
                      }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-tight">{cat.name}</span>
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search provider or plan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredPlans.map((plan) => (
              <motion.div
                key={plan.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${expandedPlanId === plan.id ? 'border-emerald-500 shadow-2xl ring-1 ring-emerald-500/20 scale-[1.01]' : 'border-slate-100 hover:border-emerald-200'
                  }`}
              >
                {/* Horizontal Card Main Row */}
                <div className="p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
                  {/* Provider & Logo */}
                  <div className="flex items-center space-x-4 shrink-0 md:w-1/4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 p-1.5 flex items-center justify-center shadow-sm">
                      <img
                        src={`https://www.google.com/s2/favicons?sz=64&domain=${plan.domain}`}
                        alt={plan.provider}
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                        className="w-8 h-8 object-contain"
                      />
                      <div className="hidden w-full h-full flex items-center justify-center font-bold text-emerald-600 text-[10px] bg-emerald-50">
                        {plan.provider.substring(0, 2).toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight uppercase">{plan.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{plan.provider}</p>
                    </div>
                  </div>

                  {/* Coverage & Price */}
                  <div className="flex-grow flex items-center justify-around w-full md:border-l md:border-r border-slate-50 px-4 gap-4">
                    <div className="text-center">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Coverage</p>
                      <p className="font-black text-slate-900 text-sm">{plan.cover}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Premium</p>
                      <p className="font-black text-emerald-600 text-sm">₹{plan.price}<span className="text-[9px] text-slate-400 font-medium">/mo</span></p>
                    </div>
                  </div>

                  {/* Top Features (Limited) */}
                  <div className="hidden lg:flex flex-wrap gap-2 w-1/4">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-center space-x-1 py-1 px-2 bg-slate-50 rounded-lg text-slate-600 text-[9px] font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="shrink-0 w-full md:w-auto">
                    <button
                      onClick={() => toggleExpand(plan.id)}
                      className={`w-full md:w-auto flex items-center justify-center space-x-2 px-8 py-3 rounded-xl font-bold text-sm transition-all ${expandedPlanId === plan.id
                          ? 'bg-slate-900 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-100'
                        }`}
                    >
                      <span>Explore Plan</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedPlanId === plan.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Expandable Details Section */}
                <AnimatePresence>
                  {expandedPlanId === plan.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-50 bg-slate-50/50 overflow-hidden"
                    >
                      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Column 1: Plan Details */}
                        <div className="space-y-4">
                          <h5 className="flex items-center space-x-2 text-xs font-black text-slate-900 uppercase">
                            <Info className="w-4 h-4 text-emerald-500" />
                            <span>Plan Details</span>
                          </h5>
                          <p className="text-sm text-slate-600 leading-relaxed font-medium">{plan.details}</p>
                          <div className="flex flex-wrap gap-2">
                            {plan.benefits.map(b => (
                              <span key={b} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500">{b}</span>
                            ))}
                          </div>
                        </div>

                        {/* Column 2: How to Claim */}
                        <div className="space-y-4">
                          <h5 className="flex items-center space-x-2 text-xs font-black text-slate-900 uppercase">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span>How to Claim</span>
                          </h5>
                          <p className="text-sm text-slate-600 leading-relaxed font-medium bg-white p-4 rounded-2xl border border-slate-100 italic shadow-sm">
                            {plan.howToClaim}
                          </p>
                        </div>

                        {/* Column 3: Action & Verdict */}
                        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 space-y-6 shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full -mr-8 -mt-8"></div>
                          <div className="space-y-2">
                            <p className="text-[10px] font-black text-emerald-600 uppercase">Final Verdict</p>
                            <h6 className="text-lg font-bold text-slate-900">Get covered in 5 mins.</h6>
                            <p className="text-xs text-slate-400">Includes all taxes and direct settlement benefits.</p>
                          </div>
                          <button 
                            onClick={() => handleBuyNow(plan)}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl text-base font-bold shadow-2xl transition-all"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Purchase Modal */}
      <AnimatePresence>
        {isPurchaseModalOpen && selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
              onClick={() => !isProcessing && setIsPurchaseModalOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]"
            >
              {/* Sidebar Info (Step Progress) */}
              <div className="w-full md:w-80 bg-slate-900 p-8 text-white flex flex-col justify-between">
                <div className="space-y-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg tracking-tighter uppercase leading-none">SafeGuard</h3>
                      <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Direct Purchase</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      { step: 1, label: 'Plan Summary', icon: Info },
                      { step: 2, label: 'Terms & Conditions', icon: FileText },
                      { step: 3, label: 'Payment Mode', icon: CreditCard }
                    ].map((s) => (
                      <div key={s.step} className={`flex items-center space-x-4 ${purchaseStep >= s.step ? 'opacity-100' : 'opacity-30'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${purchaseStep > s.step ? 'bg-emerald-500 border-emerald-500' : purchaseStep === s.step ? 'border-emerald-500 text-emerald-500' : 'border-slate-700 text-slate-500'}`}>
                          {purchaseStep > s.step ? <Check className="w-4 h-4 text-white" /> : <span className="text-xs font-black">{s.step}</span>}
                        </div>
                        <p className={`text-xs font-black uppercase tracking-widest ${purchaseStep === s.step ? 'text-emerald-500' : 'text-slate-400'}`}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Due Now</p>
                  <p className="text-3xl font-black text-white">₹{selectedPlan.price}<span className="text-xs font-bold text-slate-500 ml-1">/mo</span></p>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-grow flex flex-col bg-slate-50">
                <div className="p-4 flex justify-end">
                  <button onClick={() => setIsPurchaseModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-all">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <div className="flex-grow p-8 md:p-12 overflow-y-auto custom-scrollbar">
                  <AnimatePresence mode="wait">
                    {purchaseStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div>
                          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Review Your Plan</h2>
                          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">Step 1 of 3 • Coverage Summary</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Plan Name</p>
                            <p className="text-lg font-black text-slate-900">{selectedPlan.name}</p>
                          </div>
                          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Provider</p>
                            <p className="text-lg font-black text-slate-900">{selectedPlan.provider}</p>
                          </div>
                          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Coverage Amount</p>
                            <p className="text-lg font-black text-emerald-600">{selectedPlan.cover}</p>
                          </div>
                          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Policy Term</p>
                            <p className="text-lg font-black text-slate-900">1 Year (Renewable)</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Included Benefits</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedPlan.benefits.map(b => (
                              <div key={b} className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-100">
                                <CheckCircle className="w-4 h-4" />
                                <span>{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {purchaseStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div>
                          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Terms of Service</h2>
                          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">Step 2 of 3 • Legal Agreement</p>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-inner h-64 overflow-y-auto text-sm text-slate-500 leading-relaxed space-y-4">
                          <p className="font-bold text-slate-900">1. Acceptance of Terms</p>
                          <p>By purchasing this insurance plan, you agree to provide accurate medical and personal history. Any misinformation may lead to rejection of future claims.</p>
                          <p className="font-bold text-slate-900">2. Premium Payments</p>
                          <p>Monthly premiums are due on the 1st of every month. A grace period of 15 days is provided, after which the policy may lapse.</p>
                          <p className="font-bold text-slate-900">3. Waiting Period</p>
                          <p>Please note that specific illnesses may have a waiting period of up to 2 years as per the standard industry regulations.</p>
                          <p className="font-bold text-slate-900">4. Cancellation Policy</p>
                          <p>You can cancel the policy within the first 15 days (Free Look Period) for a full refund of the premium paid.</p>
                        </div>

                        <label className="flex items-start space-x-4 cursor-pointer group">
                          <div className={`shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isAgreed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 group-hover:border-emerald-500'}`} onClick={() => setIsAgreed(!isAgreed)}>
                            {isAgreed && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <span className="text-xs font-bold text-slate-600 leading-tight">
                            I have read and agree to the <span className="text-emerald-600 underline">Policy Terms</span>, <span className="text-emerald-600 underline">Privacy Policy</span> and confirm that all details provided are true to my knowledge.
                          </span>
                        </label>
                      </motion.div>
                    )}

                    {purchaseStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div>
                          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Payment Mode</h2>
                          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">Step 3 of 3 • Secure Checkout</p>
                        </div>

                        <div className="space-y-4">
                          {[
                            { id: 'upi', label: 'UPI (PhonePe, Google Pay)', desc: 'Instant & Secure' },
                            { id: 'card', label: 'Debit / Credit Card', desc: 'All major banks supported' },
                            { id: 'netbanking', label: 'Net Banking', desc: 'Direct from your bank' }
                          ].map((mode) => (
                            <div 
                              key={mode.id}
                              onClick={() => setPaymentMethod(mode.id)}
                              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === mode.id ? 'border-emerald-500 bg-white shadow-xl scale-[1.02]' : 'border-slate-200 hover:border-slate-300'}`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === mode.id ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                  {mode.id === 'card' ? <CreditCard className="w-6 h-6" /> : mode.id === 'upi' ? <Zap className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
                                </div>
                                <div>
                                  <p className="font-black text-slate-900 uppercase tracking-tight">{mode.label}</p>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{mode.desc}</p>
                                </div>
                              </div>
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === mode.id ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'}`}>
                                {paymentMethod === mode.id && <div className="w-2 h-2 bg-white rounded-full" />}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest justify-center">
                          <Lock className="w-3 h-3" />
                          <span>SSL Encrypted 256-bit Secure Transaction</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-8 border-t border-slate-200 bg-white flex justify-between items-center">
                  {purchaseStep > 1 ? (
                    <button 
                      onClick={() => setPurchaseStep(prev => prev - 1)}
                      className="flex items-center space-x-2 text-slate-400 hover:text-slate-900 transition-all font-black uppercase text-xs tracking-widest"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : <div></div>}

                  <button 
                    disabled={isProcessing || (purchaseStep === 2 && !isAgreed) || (purchaseStep === 3 && !paymentMethod)}
                    onClick={() => {
                      if (purchaseStep < 3) setPurchaseStep(prev => prev + 1);
                      else handleCompletePurchase();
                    }}
                    className={`px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center space-x-3 transition-all ${isProcessing || (purchaseStep === 2 && !isAgreed) || (purchaseStep === 3 && !paymentMethod) ? 'bg-slate-100 text-slate-300' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl shadow-emerald-900/20'}`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>{purchaseStep === 3 ? 'Confirm & Pay' : 'Continue'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
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

export default Plans;
