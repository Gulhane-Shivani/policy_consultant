import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Shield, CheckCircle2, Activity, 
  DollarSign, Clock, List, Award, TrendingUp,
  ChevronRight, Building, MapPin, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const PlanDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);

  // Helper to get provider branding
  const getProviderBrand = (provider) => {
    const brands = {
      'Care Health': { color: 'amber', icon: Building, tag: 'Health Specialist' },
      'Niva Bupa': { color: 'emerald', icon: Shield, tag: 'Elite Protection' },
      'Star Health': { color: 'teal', icon: Award, tag: 'Trust Leader' },
      'Aditya Birla': { color: 'rose', icon: Activity, tag: 'Active Life' },
      'HDFC Life': { color: 'indigo', icon: Shield, tag: 'Family Secure' },
      'ICICI Prudential': { color: 'violet', icon: TrendingUp, tag: 'Smart Growth' },
      'LIC of India': { color: 'orange', icon: Building, tag: 'Govt. Backed' },
      'Digit Insurance': { color: 'amber', icon: Globe, tag: 'Go Digital' },
      'ICICI Lombard': { color: 'blue', icon: Building, tag: 'Multi-Product' },
      'TATA AIG': { color: 'slate', icon: Shield, tag: 'Reliable Care' },
      'Bajaj Allianz': { color: 'slate', icon: Building, tag: 'Global Trust' }
    };
    return brands[provider] || { color: 'slate', icon: Building, tag: 'Insurance Provider' };
  };

  useEffect(() => {
    // In a real app, fetch from API. Here we use the same mock logic.
    const mockData = [
      { 
        id: 1, plan_id: 'PLAN-H1', name: 'CARE SUPREME DISCOUNTED', category: 'Health', term: '1 Year', basePremium: '615', 
        benefits: '• No room rent limit\n• Unlimited restoration\n• Global Treatment\n• OPD Consultations', 
        coverage: '5 Lakh', provider: 'Care Health', status: 'Active',
        howToClaim: '1. Visit Network Hospital\n2. Show Policy ID\n3. Cashless approval in 2 hours.',
        verdict: 'Comprehensive health coverage designed for families with priority hospital networks.'
      },
      { 
        id: 2, plan_id: 'PLAN-H2', name: 'REASSURE 2.0 TITANIUM+', category: 'Health', term: '1 Year', basePremium: '628', 
        benefits: '• No room rent limit\n• 100% no claim bonus\n• Modern Treatment\n• Zero Room Limit', 
        coverage: '5 Lakh', provider: 'Niva Bupa', status: 'Active',
        howToClaim: '1. Intimate via App\n2. Upload Bills\n3. Payout in 48 hours for non-network.',
        verdict: 'Elite medical protection with zero-deductibles and instant renewal discounts.'
      },
      { 
        id: 3, plan_id: 'PLAN-H3', name: 'COMPREHENSIVE INDIVIDUAL', category: 'Health', term: '1 Year', basePremium: '708', 
        benefits: '• Single Private A/C Room\n• 100% restoration\n• Air Ambulance\n• Second Opinion', 
        coverage: '5 Lakh', provider: 'Star Health', status: 'Active',
        howToClaim: '1. Call 24/7 Helpline\n2. Pre-auth in 1 hour\n3. Treatment starts.',
        verdict: 'Reliable individual health insurance with a vast network of 10,000+ hospitals.'
      },
      { 
        id: 4, plan_id: 'PLAN-H4', name: 'ACTIVE ONE MAX', category: 'Health', term: '1 Year', basePremium: '517', 
        benefits: '• No room rent limit\n• 100% no claim bonus\n• Health Returns\n• Chronic Care', 
        coverage: '5 Lakh', provider: 'Aditya Birla', status: 'Active',
        howToClaim: '1. Simple QR scan at hospital\n2. Verified via App\n3. Automated Payout.',
        verdict: 'Modern insurance for the active generation, rewarding a healthy lifestyle.'
      },
      { 
        id: 5, plan_id: 'PLAN-L1', name: 'TERM SMART GUARD', category: 'Life', term: 'Whole Life', basePremium: '1200', 
        benefits: '• Whole life cover\n• Terminal illness benefit\n• Level Premium\n• Rider Options', 
        coverage: '1 Crore', provider: 'HDFC Life', status: 'Active',
        howToClaim: '1. Family notifies company\n2. Documents via Email\n3. Fast-track Payout.',
        verdict: 'Maximum security for your family with flexible payouts and critical illness protection.'
      },
      { 
        id: 6, plan_id: 'PLAN-L2', name: 'IPROTECT SMART', category: 'Life', term: 'Up to 85 yrs', basePremium: '1150', 
        benefits: '• Accidental death cover\n• Critical illness rider\n• Life Stage Upgrades\n• Cancer Cover', 
        coverage: '1 Crore', provider: 'ICICI Prudential', status: 'Active',
        howToClaim: '1. One-click Claim\n2. Physical audit\n3. Full settlement guaranteed.',
        verdict: 'Intelligent term insurance that adjusts its coverage based on your life stages.'
      },
      { 
        id: 7, plan_id: 'PLAN-L3', name: 'STANDARD TERM PLAN', category: 'Life', term: '35 Years', basePremium: '900', 
        benefits: '• Government backed\n• Tax savings U/S 80C\n• High Trust\n• Low Rejection', 
        coverage: '50 Lakh', provider: 'LIC of India', status: 'Active',
        howToClaim: '1. Visit nearest branch\n2. Submit form\n3. Cheque delivery.',
        verdict: 'Trust-backed government term plan providing simple and reliable life cover.'
      },
      { 
        id: 8, plan_id: 'PLAN-C1', name: 'ECO DRIVE COMPREHENSIVE', category: 'Car', term: '1 Year', basePremium: '450', 
        benefits: '• Zero depreciation\n• 24/7 Roadside support\n• Self Inspection\n• Zero Paper', 
        coverage: 'IDV 8L', provider: 'Digit Insurance', status: 'Active',
        howToClaim: '1. Upload Photo\n2. Get Approval\n3. Drive to Garage.',
        verdict: 'Paperless car insurance with 1-hour inspection and cashless repairs.'
      },
      { 
        id: 9, plan_id: 'PLAN-C2', name: 'MOTOR SECURE PLUS', category: 'Car', term: '1 Year', basePremium: '520', 
        benefits: '• Fast tag enabled\n• Cashless garage mesh\n• Key Replacement\n• Tyre Cover', 
        coverage: 'IDV 10L', provider: 'ICICI Lombard', status: 'Active',
        howToClaim: '1. Call Towing\n2. Workshop drop\n3. Get Car back.',
        verdict: 'The standard for motor protection in India, offering comprehensive coverage.'
      },
      { 
        id: 10, plan_id: 'PLAN-B1', name: 'SMB LIABILITY PRO', category: 'Business', term: '1 Year', basePremium: '2500', 
        benefits: '• Professional indemnity\n• Cyber liability cover\n• Cyber Safe\n• Director Cover', 
        coverage: '50 Lakh', provider: 'TATA AIG', status: 'Active',
        howToClaim: '1. Case Notification\n2. Advisor assigned\n3. Legal assist.',
        verdict: 'Protect your professional venture from legal liabilities and cyber threats.'
      },
      { 
        id: 11, plan_id: 'PLAN-B2', name: 'ASSET PROTECTION ELITE', category: 'Business', term: '1 Year', basePremium: '4200', 
        benefits: '• Fire & burglary cover\n• Public liability\n• Theft Cover\n• Machinery Breakdown', 
        coverage: '1 Crore', provider: 'Bajaj Allianz', status: 'Active',
        howToClaim: '1. Loss assessment\n2. Audit\n3. Direct settlement.',
        verdict: 'Total management of your business risks, from fire to third-party liabilities.'
      }
    ];

    const foundPlan = mockData.find(p => p.id === parseInt(id));
    if (foundPlan) {
      setPlan(foundPlan);
    } else {
      toast.error('Plan not found');
      navigate('/super-admin/plans');
    }
  }, [id, navigate]);

  if (!plan) return null;

  const brand = getProviderBrand(plan.provider);

  return (
    <div className="pb-20">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/super-admin/plans')}
          className="flex items-center space-x-2 text-slate-400 hover:text-emerald-600 font-bold transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-emerald-50 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="uppercase text-[10px] tracking-widest">Back to Plans</span>
        </button>

        <div className="flex items-center space-x-4">
          <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter ${plan.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
            Status: {plan.status}
          </span>
          <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-tighter shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 transition-all">
            Edit Configuration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Brand & Core Info */}
        <div className="lg:col-span-1 space-y-8">
          {/* Logo & Identity Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50 text-center"
          >
            <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-${brand.color}-100 flex items-center justify-center relative overflow-hidden group`}>
              <div className={`absolute inset-0 bg-${brand.color}-600 opacity-0 group-hover:opacity-10 transition-opacity`} />
              <brand.icon className={`w-12 h-12 text-${brand.color}-600`} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tighter">{plan.name}</h1>
            <p className={`text-[10px] font-black uppercase tracking-widest mt-2 text-${brand.color}-600`}>{plan.provider}</p>
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center space-x-2 text-slate-400">
              <Building className="w-4 h-4" />
              <span className="text-xs font-bold">Official Provider Badge</span>
            </div>
          </motion.div>

          {/* Quick Specs Cards */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: 'Coverage', value: plan.coverage, icon: Shield, color: 'emerald' },
              { label: 'Base Premium', value: `₹${plan.basePremium}`, icon: DollarSign, color: 'emerald', sub: '/ month' },
              { label: 'Provider ID', value: plan.plan_id, icon: Award, color: 'slate' }
            ].map((spec, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg shadow-slate-200/40 flex items-center justify-between group hover:border-emerald-200 transition-all cursor-default"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl bg-${spec.color}-50 flex items-center justify-center text-${spec.color}-600`}>
                    <spec.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{spec.label}</p>
                    <p className="text-xl font-black text-slate-900">{spec.value} <span className="text-xs opacity-40">{spec.sub}</span></p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-emerald-400 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Benefits & Claims */}
        <div className="lg:col-span-2 space-y-8">
          {/* Analysis & Benefits */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-emerald-900/10"
          >
            <div className="flex items-center space-x-2 mb-6 text-emerald-400">
              <Activity className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Product Analysis</span>
            </div>
            <h2 className="text-3xl font-black mb-6 tracking-tight">Why choose this plan?</h2>
            <p className="text-slate-400 font-bold text-lg leading-relaxed mb-10">
              {plan.verdict}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Core Benefits</h4>
                <div className="space-y-4">
                  {plan.benefits.split('\n').map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="font-bold text-slate-200">{benefit.replace('• ', '')}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">Expert Rating</h4>
                <div className="flex items-end space-x-2">
                  <span className="text-5xl font-black">4.8</span>
                  <span className="text-xl font-bold text-slate-500 mb-2">/ 5.0</span>
                </div>
                <div className="mt-6 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[96%]" />
                </div>
                <p className="text-xs font-bold text-slate-500 mt-4 uppercase">Top rated by customers in 2024</p>
              </div>
            </div>
          </motion.div>

          {/* How It Works - Vertical List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50"
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">How It Works</h3>
              <span className="px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase">Claim Process</span>
            </div>

            <div className="space-y-12 relative">
              {/* Connecting Line */}
              <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-slate-100" />
              
              {plan.howToClaim.split('\n').map((step, i) => (
                <div key={i} className="relative flex items-start space-x-8">
                  <div className="relative z-10 w-11 h-11 rounded-2xl bg-white border-4 border-slate-50 shadow-md flex items-center justify-center font-black text-emerald-600">
                    {i + 1}
                  </div>
                  <div className="flex-grow pt-2">
                    <p className="text-lg font-black text-slate-800 leading-tight">
                      {step.substring(step.indexOf('.') + 1).trim()}
                    </p>
                    <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                      Step {i + 1} • Instant Execution
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailView;
