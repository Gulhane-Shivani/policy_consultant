import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Activity, Car, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-50">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-20 mesh-gradient"></div>
      
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700 text-sm font-semibold uppercase tracking-wider">Trusted by 2M+ Users</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
              Smart Insurance <br />
              <span className="text-emerald-600">Decisions</span> Made <br />
              <span className="underline decoration-emerald-500/30">Simple</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              Get personalized AI-driven advice to find the perfect policy for you, your family, or your business in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="btn-primary flex items-center space-x-2 group w-full sm:w-auto justify-center">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary w-full sm:w-auto">Explore Plans</button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 glass rounded-[2.5rem] p-8 shadow-2xl border-white/40">
              {/* Illustration Placeholder / 3D Style Elements */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="bg-emerald-600 p-8 rounded-3xl flex flex-col items-center justify-center text-white space-y-4 shadow-xl"
                >
                  <Activity className="w-12 h-12" />
                  <span className="font-bold">Health</span>
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                  className="bg-slate-900 p-8 rounded-3xl flex flex-col items-center justify-center text-white space-y-4 shadow-xl"
                >
                  <Car className="w-12 h-12" />
                  <span className="font-bold">Auto</span>
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                  className="bg-white p-8 rounded-3xl flex flex-col items-center justify-center text-emerald-600 space-y-4 shadow-xl border border-emerald-50"
                >
                  <Briefcase className="w-12 h-12" />
                  <span className="font-bold text-slate-900">Business</span>
                </motion.div>
                <div className="bg-emerald-100 p-8 rounded-3xl flex flex-col items-center justify-center text-emerald-700 space-y-4 shadow-inner">
                  <ShieldCheck className="w-12 h-12" />
                  <span className="font-bold">Life</span>
                </div>
              </div>

              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">99%</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Claim Success</p>
                  <p className="text-sm font-bold text-slate-900">Fast & Secure</p>
                </div>
              </div>
            </div>
            
            {/* Background Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50 rounded-full -z-10 blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
