import { motion } from 'framer-motion';
import { FileText, Scale, AlertCircle, HelpCircle } from 'lucide-react';

const Terms = () => {
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
              <FileText className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Terms of Service</h1>
              <p className="text-slate-500">Last updated: April 14, 2026</p>
            </div>
          </div>

          <div className="space-y-12 text-slate-600 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-6 h-6 text-emerald-600" />
                Agreement to Terms
              </h2>
              <p>
                By accessing or using Policy Consultant, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-emerald-600" />
                Service Description
              </h2>
              <p>
                Policy Consultant provides AI-driven insurance advice and comparison tools. We are an independent platform and do not provide legal or financial advice. All recommendations are based on the data provided by you and our partners.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-emerald-600" />
                Limitations of Liability
              </h2>
              <p>
                Policy Consultant shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services. We do not guarantee the absolute accuracy of quotes, as they are subject to change by insurance providers.
              </p>
            </section>

            <section className="space-y-4 border-l-4 border-emerald-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-slate-900">User Responsibilities</h3>
              <p className="text-sm">
                You are responsible for providing accurate and truthful information. Misrepresentation of facts may lead to the invalidation of insurance policies or denial of claims by providers.
              </p>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <p className="text-sm italic">
                For any questions regarding these terms, please reach out to legal@policyconsultant.com.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
