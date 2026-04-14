import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-emerald-600 p-2 rounded-xl">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Policy Consultant</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Empowering you to make smart insurance decisions with AI-driven insights and personalized solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-emerald-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Insurance Plans</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/plans" className="text-emerald-500 font-bold hover:underline transition-colors">View All Plans</Link></li>
              <li><Link to="/life" className="hover:text-emerald-500 transition-colors">Life Insurance</Link></li>
              <li><Link to="/health" className="hover:text-emerald-500 transition-colors">Health Insurance</Link></li>
              <li><Link to="/car" className="hover:text-emerald-500 transition-colors">Car Insurance</Link></li>
              <li><Link to="/business" className="hover:text-emerald-500 transition-colors">Business Insurance</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/support?tab=help" className="hover:text-emerald-500 transition-colors">Help Center</Link></li>
              <li><Link to="/support?tab=claims" className="hover:text-emerald-500 transition-colors">Claims Support</Link></li>
              <li><Link to="/support?tab=renewals" className="hover:text-emerald-500 transition-colors">Policy Renewals</Link></li>
              <li><Link to="/support#contact-section" className="hover:text-emerald-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-500" />
                <span>support@policyconsultant.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-500" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <span>123 Finance Plaza, Wall Street, New York, NY 10005</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© 2026 Policy Consultant. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-emerald-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-emerald-500 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-emerald-500 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
