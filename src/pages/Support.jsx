import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, RefreshCw, HelpCircle, Phone, Mail, 
  MessageSquare, Search, ChevronRight, ChevronDown, 
  Send, Shield, CheckCircle2, AlertCircle, Upload
} from 'lucide-react';
import toast from 'react-hot-toast';

const Support = () => {
  const [activeTab, setActiveTab] = useState('help');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showClaimForm, setShowClaimForm] = useState(false);
  
  const tabs = [
    { id: 'help', label: 'Help Center', icon: HelpCircle },
    { id: 'claims', label: 'Claims', icon: FileText },
    { id: 'renewals', label: 'Renewals', icon: RefreshCw },
  ];

  const categories = [
    { id: 'start', title: 'Getting Started', text: 'Account setup and basic features.', icon: FileText, color: 'blue' },
    { id: 'billing', title: 'Policy & Billing', text: 'Payments and active management.', icon: Shield, color: 'orange' },
    { id: 'security', title: 'Security', text: 'Data protection and privacy protocol.', icon: MessageSquare, color: 'purple' }
  ];

  const faq = [
    { id: 1, q: 'How do I start a claim?', a: 'You can start a claim by logging into your dashboard and selecting the policy you want to claim against. Alternatively, use the "Claims" tab on this page.' },
    { id: 2, q: 'Can I cancel my policy anytime?', a: 'Yes, most of our policies offer flexible cancellation within the first 30 days. After that, terms vary by provider.' },
    { id: 3, q: 'What determines my premium?', a: 'Premiums are based on risk factors like age, coverage amount, location, and specific lifestyle choices.' },
    { id: 4, q: 'How long does it take to process a claim?', a: 'Most simple claims are processed within 24-48 hours. Complex cases may take up to 7 business days.' }
  ];

  const filteredFaq = faq.filter(item => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Submitting your claim...',
        success: 'Claim submitted successfully! Check your email for tracking ID.',
        error: 'Failed to submit. Please try again.',
      }
    );
    setShowClaimForm(false);
  };

  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success(`Thanks ${contactData.name}, we've received your message!`);
    setContactData({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-20 pb-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">How can we help?</h1>
          <p className="text-slate-500 text-lg">Browse our resources or get in touch with our team 24/7.</p>
        </div>

        {/* Support Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100 scale-105' 
                  : 'bg-white text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="glass rounded-[3rem] p-8 lg:p-16 min-h-[600px] shadow-2xl border-white/40">
          <AnimatePresence mode="wait">
            {activeTab === 'help' && (
              <motion.div
                key="help"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-16"
              >
                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto">
                   <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
                   <input 
                    type="text" 
                    placeholder="Search for articles, topics, keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-8 py-6 rounded-[2rem] border border-slate-100 bg-slate-50/50 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-lg shadow-inner"
                   />
                   {searchQuery && (
                     <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <span className="text-xs font-bold text-emerald-600 animate-pulse">Filtering...</span>
                     </div>
                   )}
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {categories.map(cat => (
                    <motion.div 
                      key={cat.id}
                      whileHover={{ y: -5 }}
                      className="p-8 bg-white rounded-3xl border border-slate-50 space-y-4 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-${cat.color}-50 text-${cat.color}-600 flex items-center justify-center`}>
                        <cat.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold">{cat.title}</h3>
                      <p className="text-slate-500 text-sm">{cat.text}</p>
                      <div className="flex items-center text-emerald-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                        <span>Explore</span> <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-6 max-w-3xl mx-auto">
                    <h3 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                       {filteredFaq.length > 0 ? filteredFaq.map((item) => (
                          <div 
                            key={item.id} 
                            className={`rounded-2xl border transition-all ${expandedFaq === item.id ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100 bg-white'}`}
                          >
                             <button 
                                onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left"
                             >
                                <span className={`font-bold text-lg ${expandedFaq === item.id ? 'text-emerald-700' : 'text-slate-900'}`}>{item.q}</span>
                                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedFaq === item.id ? 'rotate-180 text-emerald-500' : ''}`} />
                             </button>
                             <AnimatePresence>
                                {expandedFaq === item.id && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-emerald-100/50 pt-4">
                                      {item.a}
                                    </div>
                                  </motion.div>
                                )}
                             </AnimatePresence>
                          </div>
                       )) : (
                         <div className="text-center py-10 space-y-4">
                            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto" />
                            <p className="text-slate-500">No results found for "{searchQuery}"</p>
                            <button onClick={() => setSearchQuery('')} className="text-emerald-600 font-bold hover:underline">Clear Search</button>
                         </div>
                       )}
                    </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'claims' && (
              <motion.div
                key="claims"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                {!showClaimForm ? (
                  <div className="flex flex-col items-center justify-center text-center space-y-10 py-10">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                      <FileText className="w-10 h-10" />
                    </div>
                    <div className="max-w-xl space-y-4">
                      <h2 className="text-4xl font-bold">Smart Claims Process</h2>
                      <p className="text-slate-500 text-lg">Submit your claim digitally in less than 5 minutes. Track progress every step of the way.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                      {[
                        { step: '01', title: 'Report', text: 'Quick details about incident' },
                        { step: '02', title: 'Review', text: 'AI & human verification' },
                        { step: '03', title: 'Payout', text: 'Direct bank transfer' }
                      ].map(s => (
                        <div key={s.step} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group overflow-hidden">
                          <div className="absolute -top-4 -right-4 text-7xl font-black text-emerald-600/5 group-hover:text-emerald-600/10 transition-colors">{s.step}</div>
                          <span className="text-xl font-bold text-emerald-600">{s.step}</span>
                          <h4 className="font-bold text-xl mt-4">{s.title}</h4>
                          <p className="text-sm text-slate-500 mt-2">{s.text}</p>
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => setShowClaimForm(true)}
                      className="btn-primary px-16 py-5 text-xl shadow-xl shadow-emerald-200"
                    >
                      Log a New Claim
                    </button>
                  </div>
                ) : (
                  <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="max-w-2xl mx-auto space-y-10">
                    <div className="flex items-center space-x-4 mb-10">
                       <button onClick={() => setShowClaimForm(false)} className="text-slate-400 hover:text-emerald-600 font-bold transition-colors flex items-center">
                          <ChevronRight className="w-5 h-5 rotate-180 mr-1" /> Back
                       </button>
                       <h2 className="text-3xl font-bold">New Insurance Claim</h2>
                    </div>

                    <form onSubmit={handleClaimSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Policy Number</label>
                          <input type="text" placeholder="PC-XXXXXX" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Incident Type</label>
                          <select className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500">
                             <option>Accident / Impact</option>
                             <option>Theft / Loss</option>
                             <option>Medical Emergency</option>
                             <option>Property Damage</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Detailed Description</label>
                        <textarea rows="4" placeholder="Explain what happened in detail..." className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
                      </div>
                      <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50/50 hover:bg-emerald-50/30 transition-colors cursor-pointer group">
                        <Upload className="w-10 h-10 text-slate-300 mx-auto group-hover:text-emerald-500 transition-colors mb-4" />
                        <p className="font-bold text-slate-700">Upload Evidence</p>
                        <p className="text-xs text-slate-400 mt-1">Photos, police reports, or medical bills (Max 10MB)</p>
                      </div>
                      <button type="submit" className="w-full btn-primary py-5 text-xl font-bold">Submit Claim Request</button>
                    </form>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'renewals' && (
              <motion.div
                key="renewals"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center space-y-12 py-10"
              >
                <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-lg relative">
                   <RefreshCw className="w-10 h-10 animate-spin-slow" />
                   <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">Pro</div>
                </div>
                <div className="max-w-xl space-y-4">
                  <h2 className="text-4xl font-bold">Hassle-free Renewals</h2>
                  <p className="text-slate-500 text-lg">Never let your protection lapse. Manage auto-renewals and payment cycles with ease.</p>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 w-full max-w-2xl shadow-xl space-y-8">
                   <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                      <div className="text-left">
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Upcoming Renewal</p>
                        <h4 className="text-2xl font-bold">Health Elite Plus</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-black text-slate-900">$85.00</p>
                        <p className="text-xs text-slate-400 font-bold uppercase">per month</p>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-1">
                         <p className="text-xs font-bold text-slate-400">Renewal Date</p>
                         <p className="font-bold text-slate-900">June 12, 2026</p>
                      </div>
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-1">
                         <p className="text-xs font-bold text-slate-400">Payment Mode</p>
                         <div className="flex items-center space-x-2">
                           <div className="w-8 h-5 bg-slate-800 rounded"></div>
                           <p className="font-bold text-slate-900 text-sm">Visa ending in 4242</p>
                         </div>
                      </div>
                   </div>

                   <label className="flex items-center justify-between p-6 bg-emerald-600/5 rounded-2xl border border-emerald-100 cursor-pointer group">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="text-left">
                           <p className="font-bold text-slate-900">Auto-Renewal Active</p>
                           <p className="text-xs text-slate-500">Your policy will automatically renew on June 12.</p>
                        </div>
                      </div>
                      <div className="w-14 h-8 bg-emerald-600 rounded-full flex items-center px-1">
                         <div className="w-6 h-6 bg-white rounded-full ml-auto"></div>
                      </div>
                   </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <button onClick={() => toast.success('Payment settings updated!')} className="btn-primary px-12 py-4">Manage Auto-Renewals</button>
                  <button className="btn-secondary px-12 py-4">View All Policies</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact Selection & Form */}
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-3 gap-16">
           <div className="lg:col-span-1 space-y-10">
              <div className="space-y-4">
                 <h2 className="text-4xl font-bold">Contact Our Experts</h2>
                 <p className="text-slate-500">Need specific help? Out team is ready to assist you via multiple channels.</p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Phone, title: 'Hotline', text: '+1 (800) 123-4567', sub: 'Available 24/7' },
                  { icon: Mail, title: 'Email', text: 'help@policy.com', sub: 'Reply within 2 hours' },
                  { icon: MessageSquare, title: 'Live Chat', text: 'Start Instant Chat', sub: '3 min wait time' }
                ].map(item => (
                  <div key={item.title} className="flex items-center space-x-6 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-emerald-600 font-bold text-sm">{item.text}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="lg:col-span-2">
              <div className="glass p-10 lg:p-12 rounded-[3.5rem] shadow-xl border-white/50">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Your Full Name</label>
                        <input 
                          type="text" 
                          placeholder="John Smith" 
                          value={contactData.name}
                          onChange={(e) => setContactData({...contactData, name: e.target.value})}
                          className="w-full p-4 bg-slate-50/50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="john@example.com" 
                          value={contactData.email}
                          onChange={(e) => setContactData({...contactData, email: e.target.value})}
                          className="w-full p-4 bg-slate-50/50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                          required 
                        />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">How can we help?</label>
                      <textarea 
                        rows="5" 
                        placeholder="Type your message here..." 
                        value={contactData.message}
                        onChange={(e) => setContactData({...contactData, message: e.target.value})}
                        className="w-full p-6 bg-slate-50/50 border border-slate-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                        required
                      ></textarea>
                   </div>
                   <button type="submit" className="w-full btn-primary py-5 rounded-[2rem] text-xl font-bold flex items-center justify-center space-x-3 group">
                      <span>Send Message</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   </button>
                </form>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
