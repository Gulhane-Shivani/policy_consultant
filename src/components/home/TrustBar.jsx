import { motion } from 'framer-motion';

const TrustBar = () => {
  const partners = [
    'SafeGuard', 'EliteCare', 'GlobalHealth', 'ZenithSure', 'Allianz', 
    'Axa', 'MetLife', 'Prudential', 'StateFarm', 'Geico'
  ];

  return (
    <div className="py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Partnering with leading global insurers</p>
      </div>
      
      <div className="flex relative items-center">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex space-x-12 shrink-0 px-6"
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-40 hover:opacity-100 cursor-pointer"
            >
              <span className="text-2xl font-bold text-slate-900 border-2 border-slate-900 px-4 py-1 rounded">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TrustBar;
