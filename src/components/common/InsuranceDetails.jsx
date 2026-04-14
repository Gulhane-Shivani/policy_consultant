import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Shield, Zap, TrendingUp, ArrowRight } from 'lucide-react';

const InsuranceDetails = ({ title, description, icon: Icon, benefits, plans, color = 'emerald' }) => {
  return (
    <div className="pt-8 pb-12">
      {/* Page Hero */}
      <section className="relative px-6 mb-12">
        <div className="container mx-auto">
          <div className="glass rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row items-center">
            <div className="p-8 lg:p-12 lg:w-3/5 space-y-4">
              <div className={`inline-flex p-2 rounded-xl bg-${color}-100 text-${color}-600`}>
                <Icon className="w-8 h-8" />
              </div>
              <h1 className="text-2xl lg:text-4xl font-bold text-slate-900 leading-tight">
                {title} <br />
                <span className={`text-${color}-600`}>Insurance</span>
              </h1>
              <p className="text-base text-slate-600 max-w-xl leading-relaxed">
                {description}
              </p>
              <Link to="/plans" className="btn-primary py-2.5 px-6 text-sm inline-block">Get Your Quote</Link>
            </div>
            <div className={`lg:w-2/5 h-full min-h-[300px] bg-${color}-600 flex items-center justify-center relative overflow-hidden`}>
              <Icon className="w-48 h-48 text-white/20 absolute -right-16 -bottom-16 rotate-12" />
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="bg-white/10 backdrop-blur-2xl p-8 rounded-full border border-white/20 shadow-2xl"
              >
                <Icon className="w-20 h-20 text-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="container mx-auto px-6 mb-12">
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-xl font-bold text-slate-900">Why choose our {title} coverage?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm">We provide comprehensive solutions tailored to your unique needs and lifestyle.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-6 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-${color}-50 flex items-center justify-center mb-4`}>
                <benefit.icon className={`w-6 h-6 text-${color}-600`} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{benefit.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-slate-900 py-16 px-6 text-white rounded-[3rem] mx-6">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">Compare Our Plans</h2>
            <p className="text-slate-400 text-sm">Choose the level of protection that fits your budget.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 text-lg font-bold">Features</th>
                  {plans.map(plan => (
                    <th key={plan.name} className="py-4 text-center">
                      <div className="text-lg font-bold mb-1">{plan.name}</div>
                      <div className="text-emerald-500 text-xs font-medium">{plan.price}</div>
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
             <Link to="/plans" className="btn-primary">Compare All Features</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 mt-16">
        <div className="relative p-8 lg:p-12 rounded-[2rem] bg-emerald-600 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-24"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-white space-y-3 lg:w-2/3">
              <h2 className="text-2xl lg:text-4xl font-bold">Ready to secure your future?</h2>
              <p className="text-emerald-100 text-base max-w-xl">Join thousands of happy customers who trust Policy Consultant for their protection.</p>
            </div>
            <Link to="/plans" className="group bg-white text-emerald-600 px-6 py-3 rounded-lg text-base font-bold flex items-center space-x-3 transition-all hover:shadow-2xl hover:bg-emerald-50 active:scale-95">
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsuranceDetails;
