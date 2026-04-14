import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Family Physician",
    text: "The AI advisor saved me hours of research. I found a better policy for 20% less than my previous provider.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Michael Ross",
    role: "Tech Entrepreneur",
    text: "Best insurance platform I've used. The claim process was incredibly smooth when I needed it most during my startup's expansion.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=michael"
  },
  {
    name: "Elena Petrov",
    role: "Graphic Designer",
    text: "Finally an insurance site that speaks human. No confusing jargon, just clear choices and beautiful UI.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=elena"
  },
  {
    name: "David Kumar",
    role: "Financial Analyst",
    text: "The recommendations were spot on for my family's needs. The transparency in pricing is refreshing for this industry.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=david"
  },
  {
    name: "Priya Sharma",
    role: "Marketing Director",
    text: "The dashboard makes managing multiple policies so easy. I haven't missed a renewal since I switched.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=priya"
  },
  {
    name: "Thomas Burke",
    role: "Small Business Owner",
    text: "Customer support is top-notch. They helped me through a complex business policy setup with extreme patience.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=thomas"
  },
  {
    name: "Jessica Wong",
    role: "Real Estate Agent",
    text: "Transparent, fast, and reliable. Policy Consultant has become my first recommendation for all my clients.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=jessica"
  },
  {
    name: "Kevin Lee",
    role: "Software Engineer",
    text: "The quote engine is lightning fast. I got 5 comparable quotes in under a minute. Truly impressive tech.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=kevin"
  },
  {
    name: "Amanda Miller",
    role: "Freelance Writer",
    text: "Love the paperless experience. Everything from sign-up to claims is handled digitally and efficiently.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=amanda"
  },
  {
    name: "Robert Hudson",
    role: "Construction Manager",
    text: "Highly recommended for business owners. The liability coverage options are the best I've seen in years.",
    rating: 4,
    image: "https://i.pravatar.cc/150?u=robert"
  }
];

const ReviewCard = ({ review }) => (
  <div className="w-[350px] shrink-0 p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
      <Quote className="w-24 h-24 rotate-180" />
    </div>
    
    <div className="flex items-center space-x-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < review.rating ? 'fill-emerald-500 text-emerald-500' : 'text-slate-200'}`} 
        />
      ))}
    </div>

    <p className="text-slate-600 font-medium leading-relaxed mb-8 relative z-10">
      "{review.text}"
    </p>

    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/20">
        <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="font-bold text-slate-900">{review.name}</h4>
        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{review.role}</p>
      </div>
    </div>
  </div>
);

const Reviews = () => {
  const firstRow = reviews.slice(0, 5);
  const secondRow = reviews.slice(5, 10);

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          Trusted by <span className="text-emerald-600">Millions</span> <br />
          Across the Globe
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">
          Don't just take our word for it. Here's what our customers have to say about their experience with Policy Consultant.
        </p>
      </div>

      <div className="space-y-8 relative">
        {/* Row 1 - Left to Right */}
        <div className="flex">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex space-x-8 shrink-0 px-4"
          >
            {[...firstRow, ...firstRow].map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="flex overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex space-x-8 shrink-0 px-4"
          >
            {[...secondRow, ...secondRow].map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </motion.div>
        </div>

        {/* Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Reviews;
