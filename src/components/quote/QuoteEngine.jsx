import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Car, Briefcase, ChevronRight, Calculator } from 'lucide-react';

const insuranceTypes = [
  { id: 'life', label: 'Life', icon: <Heart className="w-5 h-5" />, color: 'emerald' },
  { id: 'health', label: 'Health', icon: <Activity className="w-5 h-5" />, color: 'emerald' },
  { id: 'car', label: 'Car', icon: <Car className="w-5 h-5" />, color: 'emerald' },
  { id: 'business', label: 'Business', icon: <Briefcase className="w-5 h-5" />, color: 'emerald' },
];

const QuoteEngine = () => {
  const [activeTab, setActiveTab] = useState('life');
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);

  const handleGetQuote = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setQuote({
        premium: activeTab === 'life' ? '8,550' : activeTab === 'health' ? '12,000' : activeTab === 'car' ? '4,575' : '25,000',
        coverage: activeTab === 'life' ? '₹50,00,000' : activeTab === 'health' ? '₹1,00,00,000' : activeTab === 'car' ? '₹5,00,000' : '₹2,00,00,000',
        plan: 'Premium Pro'
      });
    }, 1500);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[450px]">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-1/3 bg-slate-50 p-5 space-y-3 border-r border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 mb-6 p-2">Insurance Types</h3>
        {insuranceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => {setActiveTab(type.id); setQuote(null);}}
            className={`w-full p-3 rounded-xl flex items-center space-x-3 transition-all duration-300 ${
              activeTab === type.id 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105' 
                : 'bg-transparent text-slate-500 hover:bg-white hover:text-emerald-600'
            }`}
          >
            <div className={`p-1.5 rounded-lg ${activeTab === type.id ? 'bg-white/20' : 'bg-slate-200'}`}>
              {type.icon}
            </div>
            <span className="font-bold text-sm">{type.label} Insurance</span>
          </button>
        ))}
      </div>

      {/* Main Form Area */}
      <div className="flex-grow p-10 relative">
        <AnimatePresence mode="wait">
          {!quote ? (
            <motion.form
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
              onSubmit={handleGetQuote}
            >
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-900 capitalize">{activeTab} Insurance Quote</h2>
                <p className="text-slate-500 text-sm">Provide a few details to get your personalized estimate.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Full Name</label>
                  <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <input type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <input type="tel" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Location (Zip Code)</label>
                  <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="10001" required />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full py-5 text-lg flex items-center justify-center space-x-3 group shadow-xl shadow-emerald-200/50"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Calculator className="w-6 h-6" />
                    <span>Get Instant Quote</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col justify-center items-center text-center space-y-8"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <Calculator className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-900">Your Estimated Quote</h3>
                <p className="text-slate-500 text-xs italic">This is an instant estimate based on current market rates.</p>
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 w-full max-w-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-slate-400 border-b border-slate-200 pb-4">
                    <span>Monthly Premium</span>
                    <span className="text-emerald-600 text-2xl">₹{quote.premium}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600 font-medium">Coverage Limit</span>
                    <span className="text-slate-900 font-bold">{quote.coverage}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600 font-medium">Policy Variant</span>
                    <span className="text-slate-900 font-bold">{quote.plan}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button className="btn-primary px-12">Confirm Policy</button>
                <button onClick={() => setQuote(null)} className="btn-secondary">Recalculate</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuoteEngine;
