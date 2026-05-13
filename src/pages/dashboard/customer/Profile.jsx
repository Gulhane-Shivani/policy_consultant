import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Shield, 
  Settings, Gift, Heart, Zap, Camera,
  Edit3, Lock, Bell, MessageSquare, Landmark, Plus, LogOut, ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerProfile = () => {
  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : { full_name: 'John Doe', email: 'john@example.com' };
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center px-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">My Identity</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Manage your profile and security</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-slate-50 transition-all shadow-sm">
          <Settings className="w-4 h-4" />
          <span>Security Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-32 h-32 mx-auto mb-8 rounded-[3rem] bg-emerald-50 flex items-center justify-center text-emerald-600 relative group cursor-pointer shadow-lg shadow-emerald-900/5">
                <User className="w-16 h-16 relative z-10" />
                <div className="absolute inset-0 bg-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-xl">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900">{user?.full_name || 'John Doe'}</h3>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-2 px-4 py-1.5 bg-emerald-50 rounded-full inline-block">
                Verified Member Since 2021
              </p>
              
              <div className="mt-10 pt-10 border-t border-slate-50 flex flex-col space-y-4">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-2xl">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kyc Status</span>
                  <span className="flex items-center text-emerald-600 font-black text-[10px] uppercase">
                    <Shield className="w-3 h-3 mr-1" /> Verified
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-2xl">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Health Score</span>
                  <span className="text-slate-900 font-black text-[10px] uppercase">750 (Excellent)</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-50" />
          </div>

          {/* Perks Card */}
          <div className="bg-slate-900 p-8 rounded-[3.5rem] text-white space-y-8 relative overflow-hidden shadow-2xl shadow-emerald-900/20">
            <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest px-2">Membership Benefits</h4>
            <div className="space-y-6">
              {[
                { label: 'Priority Support', icon: Zap, color: 'emerald' },
                { label: 'Renewal Rewards', icon: Gift, color: 'blue' },
                { label: 'Family Wellness', icon: Heart, color: 'rose' },
              ].map((p, i) => (
                <div key={i} className="flex items-center space-x-5 group cursor-pointer p-2 rounded-2xl hover:bg-white/5 transition-all">
                  <div className={`w-11 h-11 rounded-2xl bg-${p.color}-500/20 flex items-center justify-center text-${p.color}-400 group-hover:scale-110 transition-transform`}>
                    <p.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {/* Information Section */}
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl space-y-12">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Contact Information</h4>
              <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-xl transition-all group">
                <Edit3 className="w-5 h-5 group-hover:scale-110" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-slate-400">
                  <User className="w-3.5 h-3.5" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Full Name</p>
                </div>
                <p className="text-xl font-black text-slate-900">{user?.full_name || 'John Doe'}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-slate-400">
                  <Mail className="w-3.5 h-3.5" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Email Address</p>
                </div>
                <p className="text-xl font-black text-slate-900">{user?.email || 'john@example.com'}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-slate-400">
                  <Phone className="w-3.5 h-3.5" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Phone Number</p>
                </div>
                <p className="text-xl font-black text-slate-900">+91 98765 43210</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Primary Address</p>
                </div>
                <p className="text-xl font-black text-slate-900 leading-tight">Mumbai, Maharashtra, India</p>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Nominee & Family</h4>
                <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Manage Nominees</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Nominee</p>
                      <p className="text-sm font-black text-slate-900">Jane Doe (Spouse)</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                    <span>Allocation: 100%</span>
                    <span>Verified: Yes</span>
                  </div>
                </div>
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 border-dashed flex items-center justify-center cursor-pointer hover:bg-white hover:border-emerald-200 transition-all group">
                   <div className="flex items-center space-x-2 text-slate-400 group-hover:text-emerald-600">
                     <Plus className="w-4 h-4" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Add Contingent Nominee</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Bank Account Details</h4>
                <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Change Account</button>
              </div>
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm">
                    <Landmark className="w-7 h-7" />
                  </div>
                  <div>
                    <h5 className="text-lg font-black text-slate-900">HDFC Bank Limited</h5>
                    <p className="text-sm font-bold text-slate-500 tracking-widest">**** **** 4242</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-[9px] font-black uppercase tracking-widest">Primary</div>
                  <div className="px-4 py-2 bg-white text-slate-400 border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center">
                    <Shield className="w-3 h-3 mr-1" /> E-Mandate Active
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Communication Preferences</h4>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', status: 'Enabled', icon: Mail, color: 'blue' },
                  { label: 'WhatsApp Updates', status: 'Enabled', icon: MessageSquare, color: 'emerald' },
                  { label: 'SMS Alerts', status: 'Enabled', icon: Phone, color: 'purple' },
                ].map((pref, i) => (
                  <div key={i} className="flex justify-between items-center p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-emerald-200 transition-all group">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl bg-${pref.color}-50 flex items-center justify-center text-${pref.color}-600 group-hover:scale-110 transition-transform`}>
                        <pref.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{pref.label}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${pref.status === 'Enabled' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'bg-slate-200 text-slate-400'}`}>
                        {pref.status}
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* 2FA Toggle */}
                <div className="flex justify-between items-center p-6 bg-slate-900 rounded-[2rem] border border-slate-800 hover:border-emerald-500/30 transition-all group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-white uppercase tracking-tight">Two-Factor Authentication</span>
                      <p className="text-[10px] text-slate-400 font-bold">Extra layer of security for your account</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-emerald-600 rounded-full flex items-center px-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Security & Privacy</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button className="p-6 bg-white border border-slate-100 rounded-[2rem] hover:border-emerald-200 transition-all text-left flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Change Password / PIN</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">Last changed 3 months ago</p>
                  </div>
                </button>
                <button className="p-6 bg-white border border-slate-100 rounded-[2rem] hover:border-rose-200 transition-all text-left flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-rose-50 group-hover:text-rose-600 transition-all">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Logout from all devices</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">Protect your account from intrusion</p>
                  </div>
                </button>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-4">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">Data Privacy Commitment</p>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                    Your personal information is encrypted and never shared with third parties without your explicit consent. 
                    We comply with global data protection standards (GDPR & CCPA).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
