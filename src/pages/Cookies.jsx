import { motion } from 'framer-motion';
import { Cookie, Settings, BarChart3, Info } from 'lucide-react';

const Cookies = () => {
  return (
    <div className="pt-12 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100"
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className="bg-emerald-100 p-3 rounded-2xl">
              <Cookie className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Cookie Policy</h1>
              <p className="text-slate-500">Last updated: April 14, 2026</p>
            </div>
          </div>

          <div className="space-y-12 text-slate-600 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Info className="w-6 h-6 text-emerald-600" />
                What are Cookies?
              </h2>
              <p>
                Cookies are small text files stored on your device that help our website function better. They allow us to remember your preferences and provide a more personalized experience.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Types of Cookies We Use</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Settings className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-slate-900">Essential</h3>
                  </div>
                  <p className="text-sm">Necessary for the website to function, such as secure login and session management.</p>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-slate-900">Analytics</h3>
                  </div>
                  <p className="text-sm">Help us understand how visitors interact with our platform so we can improve the experience.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Managing Cookies</h2>
              <p>
                You can control and manage cookies through your browser settings. Please note that disabling essential cookies may impact the performance and functionality of our platform.
              </p>
            </section>

            <section className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl">
              <h2 className="text-xl font-bold mb-4">Cookie Consent</h2>
              <p className="text-slate-400 text-sm mb-6">By continuing to use our site, you agree to our use of cookies according to this policy.</p>
              <button className="btn-primary py-3 px-8 text-sm">Got it!</button>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cookies;
