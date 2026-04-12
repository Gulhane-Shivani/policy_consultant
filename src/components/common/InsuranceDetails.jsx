import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Zap, TrendingUp, ArrowRight } from 'lucide-react';

const InsuranceDetails = ({ title, description, icon: Icon, benefits, plans, color = 'emerald' }) => {
  return (
    <div className="pt-20 pb-20">
      {/* Page Hero */}
      <section className="relative px-6 mb-24">
        <div className="container mx-auto">
          <div className="glass rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-center">
            <div className="p-12 lg:p-20 lg:w-3/5 space-y-8">
              <div className={`inline-flex p-4 rounded-3xl bg-${color}-100 text-${color}-600`}>
                <Icon className="w-12 h-12" />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
                {title} <br />
                <span className={`text-${color}-600`}>Insurance</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
                {description}
              </p>
              <button className="btn-primary">Get Your Quote</button>
            </div>
            <div className={`lg:w-2/5 h-full min-h-[400px] bg-${color}-600 flex items-center justify-center relative overflow-hidden`}>
              <Icon className="w-64 h-64 text-white/20 absolute -right-20 -bottom-20 rotate-12" />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="bg-white/10 backdrop-blur-2xl p-12 rounded-full border border-white/20 shadow-2xl"
              >
                <Icon className="w-32 h-32 text-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-slate-900">Why choose our {title} coverage?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">We provide comprehensive solutions tailored to your unique needs and lifestyle.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl bg-${color}-50 flex items-center justify-center mb-6`}>
                <benefit.icon className={`w-7 h-7 text-${color}-600`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
              <p className="text-slate-500 leading-relaxed">{benefit.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-slate-900 py-24 px-6 text-white rounded-[4rem] mx-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Compare Our Plans</h2>
            <p className="text-slate-400">Choose the level of protection that fits your budget.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-6 text-xl font-bold">Features</th>
                  {plans.map(plan => (
                    <th key={plan.name} className="py-6 text-center">
                      <div className="text-xl font-bold mb-1">{plan.name}</div>
                      <div className="text-emerald-500 text-sm font-medium">{plan.price}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {['Global Coverage', '24/7 Support', 'Fast Payouts', 'Personal Advisor'].map((feature, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-6 font-medium">{feature}</td>
                    {plans.map(plan => (
                       <td key={plan.name} className="py-6 text-center">
                          <CheckCircle2 className={`w-6 h-6 mx-auto ${plan.features.includes(feature) ? 'text-emerald-500' : 'text-slate-700'}`} />
                       </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-16 text-center">
             <button className="btn-primary">Compare All Features</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 mt-32">
        <div className="relative p-12 lg:p-24 rounded-[3.5rem] bg-emerald-600 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-24"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-white space-y-6 lg:w-2/3">
              <h2 className="text-4xl lg:text-6xl font-bold">Ready to secure your future?</h2>
              <p className="text-emerald-100 text-xl max-w-xl">Join thousands of happy customers who trust Policy Consultant for their protection.</p>
            </div>
            <button className="group bg-white text-emerald-600 px-12 py-6 rounded-[2rem] text-xl font-bold flex items-center space-x-3 transition-all hover:shadow-2xl hover:bg-emerald-50 active:scale-95">
              <span>Get Started Now</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsuranceDetails;
