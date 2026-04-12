import InsuranceDetails from '../components/common/InsuranceDetails';
import { Heart, Shield, Zap, TrendingUp } from 'lucide-react';

const Life = () => {
  const benefits = [
    { title: 'Family Protection', text: 'Secure the financial future of your loved ones even when you are not around.', icon: Heart },
    { title: 'Debt Coverage', text: 'Ensure your mortgages and debts dont become a burden for your family.', icon: Shield },
    { title: 'Wealth Building', text: 'Some of our plans offer investment opportunities along with coverage.', icon: TrendingUp },
    { title: 'Fast Payouts', text: 'Our simplified claims process ensures beneficiaries get paid within 48 hours.', icon: Zap }
  ];

  const plans = [
    { name: 'Basic', price: '$25/mo', features: ['Global Coverage', '24/7 Support'] },
    { name: 'Standard', price: '$55/mo', features: ['Global Coverage', '24/7 Support', 'Fast Payouts'] },
    { name: 'Premium', price: '$95/mo', features: ['Global Coverage', '24/7 Support', 'Fast Payouts', 'Personal Advisor'] }
  ];

  return (
    <InsuranceDetails 
      title="Life" 
      description="Life is unpredictable, but your family's future shouldn't be. Get the peace of mind you deserve with our comprehensive life insurance plans."
      icon={Heart}
      benefits={benefits}
      plans={plans}
      color="emerald"
    />
  );
};

export default Life;
