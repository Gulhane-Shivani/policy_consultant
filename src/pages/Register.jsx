import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    mobile: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      toast.error('Mobile number must be exactly 10 digits');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      await api.post('/register', formData);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <div className="grid lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          {/* Info Side */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-emerald-600 text-white space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            
            <div className="relative">
              <ShieldCheck className="w-12 h-12 mb-6" />
              <h2 className="text-4xl font-bold leading-tight">Secure Your Future with Us</h2>
              <p className="text-emerald-100 mt-4 text-lg">Join 10,000+ users who trust Policy Consultant for their insurance needs.</p>
            </div>

            <div className="space-y-4 relative">
              {[
                'Instant Quote Generation',
                'Paperless Documentation',
                '24/7 Dedicated Support',
                'Multiple Provider Options'
              ].map((feature) => (
                <div key={feature} className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <span className="font-medium text-emerald-50">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 lg:p-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
              <p className="text-slate-500 mt-2">Start your journey with us today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 ml-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 rounded-xl text-lg font-bold flex items-center justify-center space-x-2 shadow-xl shadow-emerald-100 disabled:opacity-70"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <span>Sign Up</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-500 text-sm font-medium">
                Already have an account?{' '}
                <Link to="/login" className="text-emerald-600 font-bold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
