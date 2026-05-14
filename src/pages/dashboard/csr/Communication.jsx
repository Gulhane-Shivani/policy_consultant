import React, { useState } from 'react';
import { 
  MessageSquare, Mail, Phone, 
  Send, Search, Clock, 
  CheckCircle, Plus, Filter,
  Smartphone, Globe, Info, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Communication = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [messages] = useState([
    { id: 1, customer: 'Sarah Jenkins', type: 'Email', subject: 'Renewal Confirmation', time: '10m ago', status: 'Delivered' },
    { id: 2, customer: 'Robert Fox', type: 'SMS', subject: 'Payment Link Sent', time: '1h ago', status: 'Sent' },
    { id: 3, customer: 'Jane Cooper', type: 'WhatsApp', subject: 'Document Verification', time: '3h ago', status: 'Read' },
    { id: 4, customer: 'Michael Scott', type: 'Email', subject: 'Policy Documents', time: '1d ago', status: 'Delivered' }
  ]);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Communication Hub</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Multi-Channel Customer Engagement Terminal</p>
        </div>
        <button className="flex items-center space-x-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20">
          <Plus className="w-5 h-5" />
          <span>New Conversation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Channel Selector */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-2">Select Channel</h3>
            <div className="space-y-2">
              {[
                { id: 'email', name: 'Email Portal', icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50' },
                { id: 'sms', name: 'SMS Console', icon: Smartphone, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { id: 'whatsapp', name: 'WhatsApp Web', icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { id: 'call', name: 'Cloud Calling', icon: Phone, color: 'text-rose-600', bg: 'bg-rose-50' },
              ].map((channel) => (
                <button key={channel.id} className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-all group">
                  <div className={`w-12 h-12 ${channel.bg} ${channel.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <channel.icon className="w-6 h-6" />
                  </div>
                  <span className="font-black text-slate-900 text-xs uppercase tracking-tight">{channel.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="font-black uppercase tracking-widest text-[10px] text-emerald-400 mb-2">Internal Notice</h4>
              <p className="text-xs font-bold text-slate-400 leading-relaxed">Ensure all WhatsApp interactions follow the pre-approved template guidelines for compliance.</p>
              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/5 flex items-center space-x-3">
                <Info className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Read Policy</span>
              </div>
            </div>
            <Globe className="absolute -right-10 -bottom-10 w-40 h-40 text-white/5" />
          </div>
        </div>

        {/* Right: Message History */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-indigo-900/5 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50">
              <div className="flex items-center space-x-4 bg-white p-1 rounded-2xl border border-slate-100 shadow-inner">
                {['recent', 'sent', 'archived'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search logs..." className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-emerald-600/20" />
              </div>
            </div>

            <div className="divide-y divide-slate-50">
              {messages.map((msg) => (
                <div key={msg.id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                  <div className="flex items-center space-x-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${msg.type === 'Email' ? 'bg-blue-50 text-blue-600' : msg.type === 'SMS' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {msg.type === 'Email' ? <Mail className="w-7 h-7" /> : msg.type === 'SMS' ? <Smartphone className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">{msg.customer}</h4>
                      <p className="text-xs font-bold text-slate-700 mt-0.5">{msg.subject}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{msg.time} • {msg.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="flex items-center justify-end space-x-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                        <CheckCircle className="w-4 h-4" />
                        <span>{msg.status}</span>
                      </div>
                    </div>
                    <button className="p-3 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-100">
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50/50 text-center border-t border-slate-50">
              <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-all">
                Load Complete History Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
