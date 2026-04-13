import InsuranceDetails from '../components/common/InsuranceDetails';
import { Activity, Shield, Zap, TrendingUp } from 'lucide-react';

const Health = () => {
  const benefits = [
    { title: 'Global Coverage', text: 'Get treated at the best hospitals worldwide with our international network.', icon: Activity },
    { title: 'Preventive Care', text: 'Annual checkups and vaccinations included to keep you in peak health.', icon: Shield },
    { title: 'Mental Wellness', text: 'Comprehensive support for mental health and therapy sessions.', icon: TrendingUp },
    { title: 'Digital Health', text: '24/7 video consultations with top doctors from the comfort of your home.', icon: Zap }
  ];

  const plans = [
    { name: 'Core', price: '₹3,499/mo', features: ['Global Coverage', '24/7 Support'] },
    { name: 'Plus', price: '₹6,499/mo', features: ['Global Coverage', '24/7 Support', 'Fast Payouts'] },
    { name: 'Elite', price: '₹11,999/mo', features: ['Global Coverage', '24/7 Support', 'Fast Payouts', 'Personal Advisor'] }
  ];

  return (
    <InsuranceDetails 
      title="Health" 
      description="Prioritize your well-being with health insurance that goes beyond bills. Access world-class medical facilities and digital healthcare solutions."
      icon={Activity}
      benefits={benefits}
      plans={plans}
      color="emerald"
    />
  );
};

export default Health;
