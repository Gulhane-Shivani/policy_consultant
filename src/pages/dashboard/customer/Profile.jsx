import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Shield, 
  Settings, Gift, Heart, Zap, Camera,
  Edit3, Lock, Bell, MessageSquare, Landmark, Plus, LogOut, ShieldCheck,
  Save, X, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved && saved !== 'undefined' ? JSON.parse(saved) : { 
      full_name: 'Shivani Ashok Gulhane', 
      email: 'shivanigulhane2002@gmail.com',
      mobile: '+91 98765 43210',
      address: 'Mumbai, Maharashtra, India'
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  
  const [preferences, setPreferences] = useState({
    email: true,
    whatsapp: true,
    sms: false,
    twoFactor: true
  });

  const handleSave = () => {
    setUser(formData);
    localStorage.setItem('user', JSON.stringify(formData));
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePreference = (key) => {
    const newStatus = !preferences[key] ? 'Enabled' : 'Disabled';
    toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} ${newStatus}`);
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center px-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter">My Identity</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Manage your profile and security</p>
        </div>
        <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-tighter hover:bg-slate-50 transition-all shadow-sm">
          <Settings className="w-3.5 h-3.5" />
          <span>Security Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Profile Card & Perks */}
        <div className="lg:col-span-4 space-y-6">
          {/* Profile Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-6 rounded-[2rem] bg-emerald-50 flex items-center justify-center text-emerald-600 relative group cursor-pointer shadow-md">
                <User className="w-12 h-12 relative z-10" />
                <div className="absolute inset-0 bg-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-[2rem]" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center border-4 border-white shadow-lg">
                  <Camera className="w-3.5 h-3.5" />
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900">{user?.full_name}</h3>
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-1.5 px-3 py-1 bg-emerald-50 rounded-full inline-block">
                Verified Member Since 2021
              </p>
              
              <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col space-y-3">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 rounded-xl">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Kyc Status</span>
                  <span className="flex items-center text-emerald-600 font-black text-[9px] uppercase">
                    <Shield className="w-3 h-3 mr-1" /> Verified
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 rounded-xl">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Health Score</span>
                  <span className="text-slate-900 font-black text-[9px] uppercase">750 (Excellent)</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50" />
          </div>

          {/* Membership Benefits */}
          <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden shadow-2xl">
            <h4 className="text-[9px] font-black text-emerald-400 uppercase tracking-widest px-2">Membership Benefits</h4>
            <div className="space-y-4">
              {[
                { label: 'Priority Support', icon: Zap, color: 'emerald' },
                { label: 'Renewal Rewards', icon: Gift, color: 'blue' },
                { label: 'Family Wellness', icon: Heart, color: 'rose' },
              ].map((p, i) => (
                <div key={i} className="flex items-center space-x-4 group cursor-pointer p-1.5 rounded-xl hover:bg-white/5 transition-all">
                  <div className={`w-9 h-9 rounded-xl bg-${p.color}-500/20 flex items-center justify-center text-${p.color}-400 group-hover:scale-105 transition-transform`}>
                    <p.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-300 group-hover:text-white transition-colors">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-10">
            {/* Contact Info Header */}
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Information</h4>
              <AnimatePresence mode="wait">
                {!isEditing ? (
                  <motion.button 
                    key="edit-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-100 transition-all group"
                  >
                    <Edit3 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span>Edit Profile</span>
                  </motion.button>
                ) : (
                  <motion.div 
                    key="save-btns"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center space-x-2"
                  >
                    <button 
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                    <button 
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                { label: 'Full Name', name: 'full_name', icon: User, value: formData.full_name },
                { label: 'Email Address', name: 'email', icon: Mail, value: formData.email },
                { label: 'Phone Number', name: 'mobile', icon: Phone, value: formData.mobile },
                { label: 'Primary Address', name: 'address', icon: MapPin, value: formData.address },
              ].map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <field.icon className="w-3 h-3" />
                    <p className="text-[9px] font-black uppercase tracking-widest">{field.label}</p>
                  </div>
                  {isEditing ? (
                    <input 
                      type="text"
                      name={field.name}
                      value={field.value}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600/20 font-bold text-slate-900 text-sm transition-all"
                    />
                  ) : (
                    <p className="text-sm font-black text-slate-900 px-1">{field.value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Nominee Section */}
            <div className="pt-10 border-t border-slate-50">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Nominee & Family</h4>
                <button 
                  onClick={() => navigate('/dashboard/requests', { state: { type: 'nominee' } })}
                  className="text-[9px] font-black text-emerald-600 uppercase tracking-widest hover:underline"
                >
                  Manage Nominees
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 group hover:border-emerald-200 transition-all">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Primary Nominee</p>
                      <p className="text-xs font-black text-slate-900">Jane Doe (Spouse)</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-[8px] font-bold text-slate-500 uppercase px-1">
                    <span>Allocation: 100%</span>
                    <span className="flex items-center text-emerald-600"><Check className="w-2.5 h-2.5 mr-0.5" /> Verified</span>
                  </div>
                </div>
                <div className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 border-dashed flex items-center justify-center cursor-pointer hover:bg-white hover:border-emerald-200 transition-all group">
                   <div className="flex items-center space-x-2 text-slate-400 group-hover:text-emerald-600">
                     <Plus className="w-3.5 h-3.5" />
                     <span className="text-[9px] font-black uppercase tracking-widest">Add Nominee</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Bank Section */}
            <div className="pt-10 border-t border-slate-50">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Bank Account Details</h4>
                <button 
                  onClick={() => navigate('/dashboard/requests', { state: { type: 'bank' } })} 
                  className="text-[9px] font-black text-emerald-600 uppercase tracking-widest hover:underline"
                >
                  Change Account
                </button>
              </div>
              <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-sm">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-slate-900">HDFC Bank Limited</h5>
                    <p className="text-[11px] font-bold text-slate-500 tracking-widest">**** **** 4242</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-[8px] font-black uppercase tracking-widest">Primary</div>
                  <div className="px-3 py-1.5 bg-white text-slate-400 border border-slate-100 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center">
                    <Shield className="w-3 h-3 mr-1" /> E-Mandate Active
                  </div>
                </div>
              </div>
            </div>

            {/* Communication Preferences */}
            <div className="pt-10 border-t border-slate-50">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Communication Preferences</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Email', key: 'email', icon: Mail, color: 'blue' },
                  { label: 'WhatsApp', key: 'whatsapp', icon: MessageSquare, color: 'emerald' },
                  { label: 'SMS', key: 'sms', icon: Phone, color: 'purple' },
                ].map((pref, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-all group">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg bg-${pref.color}-50 flex items-center justify-center text-${pref.color}-600`}>
                        <pref.icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{pref.label}</span>
                    </div>
                    <div 
                      onClick={() => togglePreference(pref.key)}
                      className={`w-8 h-4 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${preferences[pref.key] ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${preferences[pref.key] ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Section */}
            <div className="pt-10 border-t border-slate-50">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Security & Privacy</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => toast.success('Password change portal opened')}
                  className="p-5 bg-white border border-slate-100 rounded-[1.5rem] hover:border-emerald-200 transition-all text-left flex items-center space-x-4 group"
                >
                  <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">Change Password / PIN</p>
                    <p className="text-[8px] text-slate-400 font-bold mt-0.5">Last changed 3 months ago</p>
                  </div>
                </button>
                <div className="p-5 bg-slate-900 rounded-[1.5rem] border border-slate-800 flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white uppercase tracking-tight">2FA Security</p>
                      <p className="text-[8px] text-slate-400 font-bold">{preferences.twoFactor ? 'Enabled via SMS' : 'Disabled'}</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => togglePreference('twoFactor')}
                    className={`w-8 h-4 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${preferences.twoFactor ? 'bg-emerald-600' : 'bg-slate-700'}`}
                  >
                    <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${preferences.twoFactor ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <button 
                  onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('access_token');
                    window.location.href = '/login';
                  }}
                  className="p-5 bg-rose-50 border border-rose-100 rounded-[1.5rem] hover:bg-rose-100 transition-all text-left flex items-center space-x-4 group"
                >
                  <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform shadow-sm">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-rose-900 uppercase tracking-tight">Logout Everywhere</p>
                    <p className="text-[8px] text-rose-400 font-bold mt-0.5">Securely sign out of all devices</p>
                  </div>
                </button>
              </div>

              <div className="mt-8 p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-start space-x-4">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest mb-1">Data Privacy Commitment</p>
                  <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
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
