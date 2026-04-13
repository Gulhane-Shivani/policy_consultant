import InsuranceDetails from '../components/common/InsuranceDetails';
import { Briefcase, Shield, Zap, TrendingUp } from 'lucide-react';

const Business = () => {
  const benefits = [
    { title: 'Asset Protection', text: 'Secure your office, machinery, and inventory against fire, theft, and natural disasters.', icon: Briefcase },
    { title: 'Liability Coverage', text: 'Protect your business from legal claims and lawsuits from third parties.', icon: Shield },
    { title: 'Cyber Security', text: 'Robust protection against data breaches, phishing, and digital extortion.', icon: Zap },
    { title: 'Employee Benefits', text: 'Group health and life insurance for your most valuable assets—your team.', icon: TrendingUp }
  ];

  const plans = [
    { name: 'Startup', price: '₹7,999/mo', features: ['24/7 Support', 'Fast Payouts'] },
    { name: 'SMB Pro', price: '₹27,499/mo', features: ['Global Coverage', '24/7 Support', 'Fast Payouts'] },
    { name: 'Enterprise', price: '₹71,999+/mo', features: ['Global Coverage', '24/7 Support', 'Fast Payouts', 'Personal Advisor'] }
  ];

  return (
    <InsuranceDetails 
      title="Business" 
      description="Risk management is business management. Scale with confidence knowing your enterprise is protected by industry-leading coverage."
      icon={Briefcase}
      benefits={benefits}
      plans={plans}
      color="emerald"
    />
  );
};

export default Business;
