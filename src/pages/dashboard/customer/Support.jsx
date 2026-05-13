import React, { useState } from 'react';
import { 
  MessageSquare, Phone, Mail, HelpCircle, 
  Search, ChevronRight, ChevronDown, Send,
  Globe, Clock, ArrowRight, Zap, Ticket, X, User,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const CustomerSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [viewMode, setViewMode] = useState('form'); // 'form' or 'history'
  const [tickets, setTickets] = useState([
    { id: 'TK-88102', category: 'Policy Related', policy: 'Health Elite Plus', date: 'May 05, 2026', status: 'Resolved', description: 'Request for premium receipt.' }
  ]);
  const [ticketForm, setTicketForm] = useState({ category: 'Policy Related', policy: 'General Query (No Policy)', description: '' });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Sarah from Policy Consultant. How can I help you today?", sender: 'agent', time: '10:00 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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
    setIsChatOpen(true);
    toast.success("Connecting to a Live Expert...");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setNewMessage('');
    setIsTyping(true);

    // Mock response
    setTimeout(() => {
      const agentMsg = {
        id: Date.now() + 1,
        text: "Thanks for your message! I'm looking into your account details now. Could you please provide your policy number if available?",
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 2000);
  };

  const handleRaiseTicket = (e) => {
    e.preventDefault();
    const newId = 'TK-' + Math.floor(10000 + Math.random() * 90000);
    
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          const newTicket = {
            id: newId,
            category: ticketForm.category,
            policy: ticketForm.policy,
            description: ticketForm.description,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            status: 'Open'
          };
          setTickets(prev => [newTicket, ...prev]);
          setTicketForm({ ...ticketForm, description: '' });
          resolve();
        }, 1500);
      }),
      {
        loading: 'Generating support ticket...',
        success: 'Support Ticket Raised! Reference: ' + newId,
        error: 'Failed to raise ticket.',
      }
    );
  };

  const SupportSidebar = () => (
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

      {/* WhatsApp Support */}
      <div className="bg-emerald-600 p-8 rounded-[3.5rem] text-white shadow-2xl shadow-emerald-900/20 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-tight">WhatsApp Support</h4>
            <p className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">Available 24/7</p>
          </div>
        </div>
        <p className="text-xs text-emerald-50 text-medium leading-relaxed">Need instant updates? Chat with us on WhatsApp for 1-on-1 assistance.</p>
        <button className="w-full py-4 bg-white text-emerald-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-lg shadow-black/10">
          Chat on WhatsApp
        </button>
      </div>

      {/* Business Hours */}
      <div className="bg-slate-900 p-8 rounded-[3.5rem] text-white shadow-2xl shadow-slate-900/20 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-tight">Branch Office</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Physical Support</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-slate-300 font-medium">9:00 AM - 6:00 PM (Mon-Sat)</p>
          <p className="text-sm font-black text-white leading-tight">7th Floor, Policy Tower, BKC Mumbai, India</p>
          <div className="flex items-center text-[10px] font-black text-emerald-400 uppercase tracking-widest cursor-pointer hover:underline">
            <span>View on Map</span>
            <ChevronRight className="w-3 h-3 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <div className="space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Support Center</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">We're here to help you 24/7</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setViewMode('form')}
            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-tighter transition-all ${viewMode === 'form' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Raise Ticket
          </button>
          <button 
            onClick={() => setViewMode('history')}
            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-tighter transition-all ${viewMode === 'history' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Ticket History
          </button>
        </div>
      </div>

      {/* Primary Support Channels */}
      <AnimatePresence mode="wait">
        {viewMode === 'form' ? (
          <motion.div 
            key="form-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
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
                  <select 
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-bold text-slate-900 appearance-none"
                  >
                    <option>Policy Related</option>
                    <option>Payment Issue</option>
                    <option>Claim Dispute</option>
                    <option>Technical Glitch</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Related Policy</label>
                  <select 
                    value={ticketForm.policy}
                    onChange={(e) => setTicketForm({...ticketForm, policy: e.target.value})}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-bold text-slate-900 appearance-none"
                  >
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
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
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
            <SupportSidebar />
          </motion.div>
        ) : (
          <motion.div 
            key="history-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between px-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Active & Past Tickets</h3>
              </div>
              
              <div className="space-y-6">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl group hover:border-emerald-100 transition-all">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-4 flex-grow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                              <Ticket className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-black text-slate-900">{ticket.category}</h4>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{ticket.id} • {ticket.date}</p>
                            </div>
                          </div>
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            ticket.status === 'Open' ? 'text-blue-600 bg-blue-50' : 
                            ticket.status === 'In Progress' ? 'text-orange-600 bg-orange-50' : 
                            'text-emerald-600 bg-emerald-50'
                          }`}>
                            {ticket.status}
                          </span>
                        </div>
                        
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Description</p>
                          <p className="text-xs font-medium text-slate-600 leading-relaxed line-clamp-1">{ticket.description}</p>
                        </div>

                        <div className="pt-4 px-2">
                          <div className="relative h-1 bg-slate-100 rounded-full overflow-hidden mb-4">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: ticket.status === 'Open' ? '33.33%' : ticket.status === 'In Progress' ? '66.66%' : '100%' }}
                              className={`h-full ${ticket.status === 'Resolved' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                            />
                          </div>
                          <div className="grid grid-cols-3 text-[8px] font-black uppercase tracking-widest text-slate-400">
                            <div className={ticket.status === 'Open' || ticket.status === 'In Progress' || ticket.status === 'Resolved' ? 'text-slate-900' : ''}>Submitted</div>
                            <div className={`text-center ${ticket.status === 'In Progress' || ticket.status === 'Resolved' ? 'text-slate-900' : ''}`}>Reviewing</div>
                            <div className={`text-right ${ticket.status === 'Resolved' ? 'text-emerald-600' : ''}`}>Resolved</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>            <SupportSidebar />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Live Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 w-96 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100 z-[100] overflow-hidden flex flex-col h-[500px]"
          >
            {/* Chat Header */}
            <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-tight">Sarah Expert</h4>
                  <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Online • Support Agent</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-6 overflow-y-auto bg-slate-50/50 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                    <p className={`text-[8px] mt-1 opacity-60 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 flex space-x-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex items-center space-x-3">
              <input 
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow py-3 px-4 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-medium text-xs text-slate-900"
              />
              <button 
                type="submit"
                disabled={!newMessage.trim()}
                className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default CustomerSupport;
