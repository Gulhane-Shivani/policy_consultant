import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, TrendingUp, Users, Target, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const steps = [
  {
    id: 'age',
    title: 'What is your age range?',
    icon: <Calendar className="w-6 h-6" />,
    options: ['18-25', '26-40', '41-60', '60+']
  },
  {
    id: 'income',
    title: 'Monthly income range?',
    icon: <TrendingUp className="w-6 h-6" />,
    options: ['Under $3k', '$3k - $7k', '$7k - $12k', '$12k+']
  },
  {
    id: 'family',
    title: 'Family size?',
    icon: <Users className="w-6 h-6" />,
    options: ['Just me', 'Me + Partner', 'Small Family (1-2 kids)', 'Large Family (3+ kids)']
  },
  {
    id: 'goal',
    title: 'Primary insurance goal?',
    icon: <Target className="w-6 h-6" />,
    options: ['Wealth Protection', 'Family Security', 'Medical Coverage', 'Tax Savings']
  }
];

const plans = [
  { name: 'Silver Safeguard', price: '45', features: ['Basic Coverage', '24/7 Support', 'Fast Claims'], color: 'bg-slate-100' },
  { name: 'Emerald Elite', price: '120', features: ['Comprehensive Coverage', 'Free Health Checkups', 'Global Protection'], color: 'bg-emerald-600', text: 'text-white' },
  { name: 'Legacy Builder', price: '200', features: ['Investment Link', 'Estate Planning', 'Premium Benefits'], color: 'bg-slate-900', text: 'text-white' }
];

const AdvisorForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = (option) => {
    const newFormData = { ...formData, [steps[currentStep].id]: option };
    setFormData(newFormData);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsFinished(true);
      toast.success("We've analyzed your needs!");
    }
  };

  const currentProgress = (currentStep / steps.length) * 100;

  if (isFinished) {
    return (
      <div className="max-w-4xl mx-auto p-6 glass rounded-2xl text-center space-y-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-600" />
        </motion.div>
        
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Recommended Plans for You</h2>
          <p className="text-slate-600 text-base">Based on your profile, we recommend these top-rated policies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className={`p-6 rounded-2xl shadow-lg flex flex-col justify-between ${plan.color} ${plan.text || 'text-slate-900'}`}
            >
              <div className="space-y-3">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <div className="text-2xl font-bold font-mono">
                  ${plan.price}<span className="text-sm font-normal opacity-70">/mo</span>
                </div>
                <ul className="space-y-2 text-sm text-left">
                  {plan.features.map(f => <li key={f} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" /> <span>{f}</span>
                  </li>)}
                </ul>
              </div>
              <button className={`mt-8 py-3 rounded-xl font-bold w-full transition-all ${plan.text ? 'bg-white text-emerald-700' : 'bg-emerald-600 text-white'}`}>
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
        
        <button onClick={() => {setIsFinished(false); setCurrentStep(0); setFormData({});}} className="text-emerald-600 font-semibold hover:underline">
          Retake Questionnaire
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 glass rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
        <motion.div 
          className="h-full bg-emerald-600" 
          initial={{ width: 0 }}
          animate={{ width: `${currentProgress}%` }}
        />
      </div>

      <div className="space-y-12 py-4">
        <div className="flex justify-between items-center text-sm font-bold text-slate-400">
          <span>STEP {currentStep + 1} OF {steps.length}</span>
          <span>{Math.round(currentProgress)}% COMPLETE</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
                {steps[currentStep].icon}
              </div>
              <h2 className="text-lg font-bold text-slate-900">{steps[currentStep].title}</h2>
            </div>
 
            <div className="grid grid-cols-1 gap-3">
              {steps[currentStep].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleNext(option)}
                  className="group p-4 bg-white border border-slate-100 rounded-xl text-left hover:border-emerald-500 hover:shadow-md transition-all flex justify-between items-center"
                >
                  <span className="font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors text-sm">{option}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="flex items-center space-x-2 text-slate-400 hover:text-emerald-600 transition-colors font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AdvisorForm;
