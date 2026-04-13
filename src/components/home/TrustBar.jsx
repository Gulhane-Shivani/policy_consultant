import { motion } from 'framer-motion';

const TrustBar = () => {
  const partners = [
    { name: 'Allianz', domain: 'allianz.com' },
    { name: 'Axa', domain: 'axa.com' },
    { name: 'MetLife', domain: 'metlife.com' },
    { name: 'Prudential', domain: 'prudential.com' },
    { name: 'StateFarm', domain: 'statefarm.com' },
    { name: 'Geico', domain: 'geico.com' },
    { name: 'HDFC Life', domain: 'hdfclife.com' },
    { name: 'ICICI Prudential', domain: 'iciciprulife.com' },
    { name: 'LIC India', domain: 'licindia.in' },
    { name: 'TATA AIG', domain: 'tataaig.com' },
  ];

  return (
    <div className="py-16 bg-white border-y border-slate-50 overflow-hidden">
      <div className="container mx-auto px-6 mb-10 text-center">
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Partnering with leading global insurers</p>
      </div>
      
      <div className="flex relative items-center">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          className="flex space-x-20 shrink-0 px-10"
        >
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center p-1.5 border border-slate-100 group-hover:border-emerald-200 group-hover:bg-white transition-all">
                <img 
                  src={`https://www.google.com/s2/favicons?sz=64&domain=${partner.domain}`} 
                  alt={partner.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full flex items-center justify-center font-bold text-slate-400 text-[10px]">
                  {partner.name.substring(0, 1)}
                </div>
              </div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TrustBar;
