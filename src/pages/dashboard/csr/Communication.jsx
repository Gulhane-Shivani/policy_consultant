import React, { useState } from 'react';
import { 
  MessageSquare, Mail, Phone, 
  Send, Search, Clock, 
  CheckCircle, Plus, Filter,
  Smartphone, Globe, Info, ChevronRight, X,
  ArrowLeft, User, Paperclip, Smile
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Communication = () => {
  const [view, setView] = useState('hub'); // 'hub', 'new', 'chat'
  const [activeTab, setActiveTab] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  const [messages] = useState([
    { id: 1, customer: 'Sarah Jenkins', type: 'Email', subject: 'Renewal Confirmation', time: '10 min ago', status: 'Delivered', preview: 'Hi Sarah, your policy renewal for Health Care Supreme...' },
    { id: 2, customer: 'Robert Fox', type: 'SMS', subject: 'Payment Link Sent', time: '1 hour ago', status: 'Sent', preview: 'Hello Robert, please use this link to complete your payment...' },
    { id: 3, customer: 'Jane Cooper', type: 'WhatsApp', subject: 'Document Verification', time: '3 hours ago', status: 'Read', preview: 'The documents you uploaded for ID proof are verified...' },
    { id: 4, customer: 'Michael Scott', type: 'Email', subject: 'Policy Documents', time: '1 day ago', status: 'Delivered', preview: 'Attached are your policy documents for the year 2024...' }
  ]);

  const filteredMessages = messages.filter(msg => 
    msg.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
    msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (view === 'chat' && selectedChat) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="h-[calc(100vh-200px)] flex flex-col space-y-6"
      >
        <div className="flex items-center justify-between bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
           <div className="flex items-center space-x-4">
              <button onClick={() => setView('hub')} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
                 <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black">
                 {selectedChat.customer.charAt(0)}
              </div>
              <div>
                 <h2 className="text-xl font-black text-slate-900 leading-none">{selectedChat.customer}</h2>
                 <p className="text-[10px] font-bold text-slate-400 mt-1">{selectedChat.type} • Active Session</p>
              </div>
           </div>
           <div className="flex items-center space-x-3">
              <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all"><Phone className="w-5 h-5" /></button>
              <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"><Mail className="w-5 h-5" /></button>
           </div>
        </div>

        <div className="flex-1 bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden flex flex-col">
           <div className="flex-1 p-8 overflow-y-auto space-y-6">
              <div className="flex flex-col items-center py-10 opacity-20">
                 <div className="px-4 py-1 bg-slate-100 rounded-full text-[9px] font-black">Conversation started on {selectedChat.time}</div>
              </div>
              
              <div className="flex justify-start">
                 <div className="max-w-md p-6 bg-slate-50 rounded-[2rem] rounded-tl-none border border-slate-100 text-sm font-bold text-slate-600 leading-relaxed">
                    {selectedChat.preview}
                 </div>
              </div>

              <div className="flex justify-end">
                 <div className="max-w-md p-6 bg-slate-900 rounded-[2rem] rounded-tr-none text-white text-sm font-bold leading-relaxed shadow-xl shadow-slate-900/20">
                    Hello, I'm reviewing your request. Please hold on for a moment while I verify the details in our system.
                 </div>
              </div>
           </div>

           <div className="p-6 bg-slate-50 border-t border-slate-100">
              <div className="relative flex items-center">
                 <button className="absolute left-4 p-2 text-slate-400 hover:text-indigo-600"><Paperclip className="w-5 h-5" /></button>
                 <input 
                    type="text" 
                    placeholder="Type your message here..."
                    className="w-full pl-14 pr-32 py-5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-900 shadow-sm outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all"
                 />
                 <div className="absolute right-3 flex items-center space-x-2">
                    <button className="p-2 text-slate-300 hover:text-amber-500"><Smile className="w-5 h-5" /></button>
                    <button onClick={() => toast.success('Response Sent')} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs hover:bg-indigo-500 transition-all shadow-lg flex items-center space-x-2">
                       <span>Send</span>
                       <Send className="w-4 h-4" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>
    );
  }

  if (view === 'new') {
     return (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
           <div className="flex items-center space-x-4">
              <button onClick={() => setView('hub')} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                 <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                 <h1 className="text-3xl font-black text-slate-900 leading-none">New Conversation</h1>
                 <p className="text-slate-500 font-bold text-[10px] mt-1">Select channel and identify customer</p>
              </div>
           </div>

           <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-2xl shadow-slate-200/50 flex flex-col items-center">
              <h3 className="text-xl font-black text-slate-900 mb-10 text-center">How would you like to connect?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
                 {[
                   { id: 'email', name: 'Email', icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50' },
                   { id: 'sms', name: 'SMS', icon: Smartphone, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                   { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                   { id: 'call', name: 'Cloud Call', icon: Phone, color: 'text-rose-600', bg: 'bg-rose-50' },
                 ].map((channel) => (
                   <button 
                     key={channel.id} 
                     onClick={() => toast.success(`${channel.name} Channel selected`)}
                     className="flex flex-col items-center p-8 bg-slate-50 border-2 border-slate-100 rounded-[3rem] hover:border-indigo-500 hover:bg-white transition-all group shadow-sm"
                   >
                      <div className={`w-16 h-16 ${channel.bg} ${channel.color} rounded-[1.5rem] flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform`}>
                         <channel.icon className="w-8 h-8" />
                      </div>
                      <span className="font-black text-slate-900 text-xs">{channel.name}</span>
                   </button>
                 ))}
              </div>

              <div className="mt-12 w-full max-w-lg space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 ml-1 uppercase tracking-widest">Identify Customer</label>
                    <div className="relative">
                       <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                       <input 
                         type="text" 
                         placeholder="Enter Name, Policy ID or Mobile..."
                         className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all text-lg shadow-inner"
                       />
                    </div>
                 </div>
                 <button onClick={() => { toast.success('Initializing Secure Connection...'); setView('hub'); }} className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-900/20 active:scale-95 flex items-center justify-center space-x-3">
                    <span>Initiate Conversation</span>
                    <Send className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </motion.div>
     );
  }

  return (
    <div className="space-y-8 pb-12 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 leading-none">Communication Hub</h1>
          <p className="text-slate-500 font-bold text-[10px] mt-1">Multi-channel customer engagement terminal</p>
        </div>
        <button 
          onClick={() => setView('new')}
          className="flex items-center space-x-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>New Conversation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
            <h3 className="text-[10px] font-black text-slate-400 mb-6 px-2 uppercase tracking-widest">Select Channel</h3>
            <div className="space-y-2">
              {[
                { id: 'email', name: 'Email Portal', icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50' },
                { id: 'sms', name: 'SMS Console', icon: Smartphone, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { id: 'whatsapp', name: 'WhatsApp Web', icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { id: 'call', name: 'Cloud Calling', icon: Phone, color: 'text-rose-600', bg: 'bg-rose-50' },
              ].map((channel) => (
                <button 
                  key={channel.id} 
                  onClick={() => toast.success(`Switching to ${channel.name}...`)}
                  className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-all group active:scale-95"
                >
                  <div className={`w-12 h-12 ${channel.bg} ${channel.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                    <channel.icon className="w-6 h-6" />
                  </div>
                  <span className="font-black text-slate-900 text-xs">{channel.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl overflow-hidden relative group">
            <div className="relative z-10">
              <h4 className="font-black text-[10px] text-emerald-400 mb-2 uppercase tracking-widest">Internal Notice</h4>
              <p className="text-xs font-bold text-slate-400 leading-relaxed">Ensure all WhatsApp interactions follow the pre-approved template guidelines for compliance.</p>
              <button onClick={() => toast.success('Policy Viewer Launched')} className="mt-6 p-4 bg-white/5 rounded-xl border border-white/5 flex items-center space-x-3 w-full hover:bg-white/10 transition-all active:scale-95">
                <Info className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] font-black">Read Policy</span>
              </button>
            </div>
            <Globe className="absolute -right-10 -bottom-10 w-40 h-40 text-white/5 group-hover:rotate-12 transition-transform duration-1000" />
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50">
              <div className="flex items-center space-x-4 bg-white p-1 rounded-2xl border border-slate-100 shadow-inner">
                {['recent', 'sent', 'archived'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black transition-all ${activeTab === tab ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search logs..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-4 focus:ring-emerald-600/5 font-bold" 
                />
              </div>
            </div>

            <div className="divide-y divide-slate-50">
              {filteredMessages.map((msg) => (
                <div key={msg.id} onClick={() => { setSelectedChat(msg); setView('chat'); }} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all group cursor-pointer">
                  <div className="flex items-center space-x-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${msg.type === 'Email' ? 'bg-blue-50 text-blue-600' : msg.type === 'SMS' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {msg.type === 'Email' ? <Mail className="w-7 h-7" /> : msg.type === 'SMS' ? <Smartphone className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">{msg.customer}</h4>
                      <p className="text-xs font-bold text-slate-700 mt-0.5 line-clamp-1">{msg.subject}</p>
                      <p className="text-[10px] font-black text-slate-400 mt-1">{msg.time} • {msg.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right hidden md:block">
                      <div className="flex items-center justify-end space-x-2 text-emerald-500 font-black text-[10px]">
                        <CheckCircle className="w-4 h-4" />
                        <span>{msg.status}</span>
                      </div>
                    </div>
                    <button className="p-3 bg-slate-50 text-slate-300 group-hover:bg-slate-900 group-hover:text-white rounded-2xl transition-all shadow-sm active:scale-90">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredMessages.length === 0 && (
                <div className="p-20 text-center text-slate-400 font-bold text-xs">No communication logs found.</div>
              )}
            </div>

            <div className="p-8 bg-slate-50/50 text-center border-t border-slate-50">
              <button onClick={() => toast.success('Loading archive...')} className="text-[10px] font-black text-slate-400 hover:text-emerald-600 transition-all flex items-center mx-auto space-x-2 group">
                <span>Load Complete History Archive</span>
                <Clock className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
