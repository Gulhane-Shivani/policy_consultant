import { useState } from 'react';
import { Shield, Clock, Gift, Settings, LogOut, LayoutDashboard, FileText, Activity, AlertCircle, ShoppingBag, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const activePolicies = [
    { title: 'Health Elite', premium: '₹6,400/mo', status: 'Active', icon: Activity, color: 'emerald' },
    { title: 'Life SafeGuard', premium: '₹4,200/mo', status: 'Renewing Soon', icon: Shield, color: 'blue' },
  ];

  const offers = [
    { title: 'Home Insurance', discount: '20% OFF', text: 'Bundle with Health Elite for maximum savings.' },
    { title: 'Pet Coverage', discount: 'FREE 1st Month', text: 'New policy option for your furry family members.' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Navigation - Fixed for desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 p-6 space-y-10">
        <div className="flex items-center space-x-2 px-2">
            <div className="bg-emerald-600 p-2 rounded-xl">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900">Portal</span>
          </div>

          <nav className="flex-grow space-y-2">
            {[
              { label: 'Overview', icon: LayoutDashboard },
              { label: 'My Policies', icon: Shield },            
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === item.label ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <button className="flex items-center space-x-3 px-4 py-3 text-red-500 font-semibold hover:bg-red-50 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-5 lg:p-10 space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">Welcome Back, Alex!</h1>
            <p className="text-slate-500 text-xs">You have 2 active policies and 1 renewal coming up.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-full border border-slate-100 relative cursor-pointer">
               <AlertCircle className="w-6 h-6 text-slate-400" />
               <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="bg-emerald-100 px-4 py-2 rounded-xl font-bold text-emerald-700">Premium Member</div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Active Policies */}
          <section className="xl:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Active Policies</h2>
              <button className="text-emerald-600 font-bold text-xs hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activePolicies.map((policy) => (
                <motion.div 
                  key={policy.title}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4"
                >
                  <div className="flex justify-between">
                    <div className={`p-4 rounded-2xl bg-${policy.color}-50 text-${policy.color}-600`}>
                      <policy.icon className="w-7 h-7" />
                    </div>
                    <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full h-fit ${policy.status.includes('Soon') ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {policy.status}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{policy.title}</h3>
                    <p className="text-base font-medium text-slate-400 mt-0.5">{policy.premium}</p>
                  </div>
                  <button className="w-full py-2.5 bg-slate-50 font-bold rounded-xl text-slate-700 text-sm hover:bg-slate-100 transition-colors">Manage Policy</button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Sidebar Cards */}
          <aside className="space-y-8">
            {/* Renewal Alert */}
            <div className="bg-slate-900 p-6 rounded-[2rem] text-white space-y-4 relative overflow-hidden">
               <Clock className="w-10 h-10 text-emerald-500" />
               <div className="space-y-1.5">
                 <h3 className="text-xl font-bold">Upcoming Renewal</h3>
                 <p className="text-slate-400 text-xs">Your life insurance policy expires in 12 days. Renew now to avoid gap in coverage.</p>
               </div>
               <button className="w-full btn-primary py-3 text-sm">Renew Safely</button>
               <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-emerald-500/10 rounded-full"></div>
            </div>

            {/* Personalized Offers */}
            <div className="space-y-6">
               <h2 className="text-xl font-bold flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-emerald-600" />
                  <span>Exclusive Offers</span>
               </h2>
               <div className="space-y-4">
                  {offers.map((offer) => (
                    <div key={offer.title} className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 group cursor-pointer hover:bg-emerald-600 transition-all duration-300">
                       <span className="text-xs font-bold bg-white text-emerald-600 px-2 py-1 rounded mb-2 inline-block shadow-sm">{offer.discount}</span>
                       <h4 className="font-bold text-slate-900 group-hover:text-white transition-colors capitalize">{offer.title}</h4>
                       <p className="text-emerald-700 text-xs mt-1 group-hover:text-emerald-100 transition-colors">{offer.text}</p>
                    </div>
                  ))}
               </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
