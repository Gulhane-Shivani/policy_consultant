import Hero from '../components/home/Hero';
import TrustBar from '../components/home/TrustBar';
import AdvisorForm from '../components/advisor/AdvisorForm';
import QuoteEngine from '../components/quote/QuoteEngine';

const Home = () => {
  return (
    <div className="space-y-16 pb-16">
      <Hero />
      <TrustBar />
      
      {/* Smart Advisor Section */}
      <section id="advisor" className="container mx-auto px-6">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Get Personalized Advice</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base">
            Our AI-powered advisor analyzes your profile to suggest the best coverage options for your specific situation.
          </p>
        </div>
        <AdvisorForm />
      </section>
 
      {/* Quote Engine Section */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Instant Quote Estimator</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base">
              Get a rough estimate of your premiums across various insurance types in seconds.
            </p>
          </div>
          <QuoteEngine />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
                  Why millions trust <br />
                  <span className="text-emerald-600">Policy Consultant</span>
                </h2>
                <div className="space-y-6">
                   <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                         <span className="text-emerald-600 font-bold text-lg">01</span>
                      </div>
                      <div>
                         <h3 className="text-lg font-bold">Unbiased Recommendations</h3>
                         <p className="text-slate-500 text-sm">We work for you, not the insurance companies. Our AI ensures objective advice.</p>
                      </div>
                   </div>
                   <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                         <span className="text-emerald-600 font-bold text-lg">02</span>
                      </div>
                      <div>
                         <h3 className="text-lg font-bold">Best Price Guarantee</h3>
                         <p className="text-slate-500 text-sm">We compare 100+ policies to find you the most competitive rates available.</p>
                      </div>
                   </div>
                   <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                         <span className="text-emerald-600 font-bold text-lg">03</span>
                      </div>
                      <div>
                         <h3 className="text-lg font-bold">Paperless Experience</h3>
                         <p className="text-slate-500 text-sm">Buy and manage policies completely online. No more messy paperwork.</p>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="relative">
                <div className="aspect-square bg-emerald-600 rounded-[3rem] overflow-hidden relative">
                   <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000" alt="Professional Consultant" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
                   <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent"></div>
                </div>
                {/* Stats floating boxes */}
                <div className="absolute -top-10 -right-10 glass p-6 rounded-2xl shadow-2xl border-white/40 max-w-[200px]">
                   <p className="text-3xl font-bold text-emerald-600">4.9/5</p>
                   <p className="text-sm font-semibold text-slate-800">Average User Rating</p>
                </div>
             </div>
          </div>
      </section>
    </div>
  );
};

export default Home;
