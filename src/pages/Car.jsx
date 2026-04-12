import InsuranceDetails from '../components/common/InsuranceDetails';
import { Car as CarIcon, Shield, Zap, TrendingUp } from 'lucide-react';

const Car = () => {
  const benefits = [
    { title: 'Zero Depreciation', text: 'Get full value of replaced parts without any depreciation deductions.', icon: CarIcon },
    { title: 'Roadside Assistance', text: 'Stuck in middle of nowhere? We are just a call away, 24/7.', icon: Shield },
    { title: 'Cashless Repairs', text: 'Repair your car at any of our 5000+ network garages without paying a dime.', icon: Zap },
    { title: 'Personal Accident', text: 'Coverage for you and your passengers against unforeseen accidents.', icon: TrendingUp }
  ];

  const plans = [
    { name: 'Third Party', price: '$20/mo', features: ['24/7 Support'] },
    { name: 'Comprehensive', price: '$60/mo', features: ['Global Coverage', '24/7 Support', 'Fast Payouts'] },
    { name: 'Luxury Plus', price: '$120/mo', features: ['Global Coverage', '24/7 Support', 'Fast Payouts', 'Personal Advisor'] }
  ];

  return (
    <InsuranceDetails 
      title="Car" 
      description="Protect your journey on every road. Our car insurance offers complete coverage for you, your vehicle, and third-party liabilities."
      icon={CarIcon}
      benefits={benefits}
      plans={plans}
      color="emerald"
    />
  );
};

export default Car;
