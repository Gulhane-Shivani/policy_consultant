import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server } from 'lucide-react';

const Privacy = () => {
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
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Privacy Policy</h1>
              <p className="text-slate-500">Last updated: April 14, 2026</p>
            </div>
          </div>

          <div className="space-y-12 text-slate-600 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Eye className="w-6 h-6 text-emerald-600" />
                Information We Collect
              </h2>
              <p>
                We collect personal information that you provide to us when you use our services. This includes your name, email address, phone number, and any other details necessary to provide you with accurate insurance advice and quotes.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal identification details</li>
                <li>Financial and medical history for specific insurance types</li>
                <li>Usage data and device information</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Server className="w-6 h-6 text-emerald-600" />
                How We Use Your Data
              </h2>
              <p>
                Your data is primarily used to analyze your profile and provide personalized insurance recommendations. We may also use it to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Improve our AI advisor algorithm</li>
                <li>Communicate with you regarding your policy</li>
                <li>Ensure the security and integrity of our platform</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-6 h-6 text-emerald-600" />
                Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your information from unauthorized access, disclosure, or destruction. Your data is encrypted both in transit and at rest.
              </p>
            </section>

            <section className="space-y-4 bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <h2 className="text-xl font-bold text-emerald-900">Your Rights</h2>
              <p className="text-emerald-800 text-sm">
                You have the right to access, correct, or delete your personal data at any time. If you wish to exercise these rights, please contact our support team at privacy@policyconsultant.com.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
