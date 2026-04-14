import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Activity, Car, Briefcase, ChevronRight,
  Shield, CheckCircle2, Search, Filter, ArrowRight,
  TrendingUp, Star, Award, ChevronDown, CheckCircle, Info
} from 'lucide-react';

const Plans = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPlanId, setExpandedPlanId] = useState(null);

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
                          <button className="w-full btn-primary py-4 rounded-xl text-base font-bold shadow-2xl">Buy Now</button>
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
    </div>
  );
};

export default Plans;
