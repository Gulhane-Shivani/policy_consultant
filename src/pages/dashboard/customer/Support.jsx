import React, { useState } from 'react';
import { 
  MessageSquare, Phone, Mail, HelpCircle, 
  Search, ChevronRight, ChevronDown, Send,
  Globe, Clock, ArrowRight, Zap, Ticket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const CustomerSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    { 
      q: "How do I update my profile details?", 
      a: "Go to the Profile section from the sidebar. You can update your contact information, nominee details, and communication preferences there." 
    },
    { 
      q: "When will my claim be processed?", 
      a: "Standard claims are processed within 24-48 hours. You can track the real-time status in the 'Claims' section of your dashboard." 
    },
    { 
      q: "Can I get a loan against any policy?", 
      a: "Loans are primarily available for Life Insurance policies that have been active for at least 3 years and have acquired a surrender value." 
    },
    { 
      q: "How do I download my policy certificate?", 
      a: "Visit the 'Document Vault' section. All your policy schedules, premium receipts, and certificates are available there for instant download." 
    },
  ];

  const handleLiveChat = () => {
    toast.success("Connecting to a Live Expert...");
  };

  const handleRaiseTicket = (e) => {
    e.preventDefault();
    toast.success("Support Ticket Raised! Reference: TK-99021");
  };

  return (
    <div className="space-y-12 pb-12">
      <div className="px-4">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Support Center</h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">We're here to help you 24/7</p>
      </div>

      {/* Primary Support Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Help Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              onClick={handleLiveChat}
              className="bg-emerald-600 p-10 rounded-[3.5rem] text-white shadow-2xl shadow-emerald-900/20 cursor-pointer group"
            >
              <div className="w-16 h-16 bg-white/10 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-2">Live Chat</h3>
              <p className="text-emerald-100 text-sm font-medium leading-relaxed mb-8">Instant assistance from our insurance experts. Average wait time: <span className="text-white font-black underline">2 mins</span></p>
              <div className="flex items-center text-xs font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                <span>Start Chatting</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl shadow-slate-900/20 cursor-pointer group"
            >
              <div className="w-16 h-16 bg-white/10 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-2">Voice Support</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">Call our toll-free priority line for immediate help. <span className="text-white font-black underline">1800-420-6000</span></p>
              <div className="flex items-center text-xs font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform text-emerald-400">
                <span>Call Now</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>
          </div>

          {/* Raise Ticket Form */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Raise a Support Ticket</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">For complex queries or detailed assistance</p>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl flex items-center space-x-2">
                <Ticket className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Formal Request</span>
              </div>
            </div>

            <form onSubmit={handleRaiseTicket} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Issue Category</label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-bold text-slate-900 appearance-none">
                    <option>Policy Related</option>
                    <option>Payment Issue</option>
                    <option>Claim Dispute</option>
                    <option>Technical Glitch</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Related Policy</label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-bold text-slate-900 appearance-none">
                    <option>General Query (No Policy)</option>
                    <option>Health Elite Plus (HE-8829)</option>
                    <option>Term Life Cover (TL-4421)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Describe your issue</label>
                <textarea 
                  rows="4" 
                  placeholder="Please provide as much detail as possible..."
                  className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-emerald-600/20 font-medium text-slate-900"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center space-x-3"
              >
                <Send className="w-4 h-4" />
                <span>Submit Ticket</span>
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar Help */}
        <div className="space-y-8">
          {/* FAQ Accordion */}
          <div className="bg-white p-8 rounded-[3.5rem] border border-slate-100 shadow-xl">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8 px-2">Common Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                  <button 
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className={`text-sm font-black transition-colors ${expandedFaq === i ? 'text-emerald-600' : 'text-slate-700 group-hover:text-slate-900'}`}>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedFaq === i ? 'rotate-180 text-emerald-600' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-slate-500 font-medium leading-relaxed mt-3">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Social / WhatsApp */}
          <div className="bg-emerald-50 p-8 rounded-[3.5rem] border border-emerald-100 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">WhatsApp Chat</h4>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">Available 24/7</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">Prefer messaging? Chat with us on WhatsApp for quick updates and policy details.</p>
            <button className="w-full py-4 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 transition-all">
              Launch WhatsApp
            </button>
          </div>

          {/* Business Hours */}
          <div className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-100 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">Branch Office</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Physical Support</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-slate-600 font-medium">9:00 AM - 6:00 PM (Mon-Sat)</p>
              <p className="text-xs text-slate-900 font-black">7th Floor, Policy Tower, Mumbai</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase underline cursor-pointer">View on Map</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
