import { motion } from 'motion/react';
import { PageType } from '../types';

interface CategoryFormCardsProps {
  setCurrentPage: (page: PageType) => void;
  setActiveCategory: (category: 'all' | 'handbags' | 'watches' | 'footwear' | 'jewelry') => void;
}

export default function CategoryFormCards({ setCurrentPage, setActiveCategory }: CategoryFormCardsProps) {
  const categories = [
    {
      id: 'handbags' as const,
      title: 'Sculptural Leather',
      subtitle: 'VOL. I • HANDBAGS',
      desc: 'Bespoke, hand-painted edge finishes and selected double-tanned grain calfskin from Italian heritage tanneries.',
      image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop',
      btnText: 'Explore Leatherwork',
    },
    {
      id: 'watches' as const,
      title: 'Precision Horology',
      subtitle: 'VOL. II • WATCHES',
      desc: 'Swiss-certified mechanical movements encased in micro-blasted Grade 5 titanium and anti-reflective sapphire glass.',
      image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=800&auto=format&fit=crop',
      btnText: 'Explore Timepieces',
    },
    {
      id: 'footwear' as const,
      title: 'Understated Stance',
      subtitle: 'VOL. III • FOOTWEAR',
      desc: 'Water-repellent split suede, molded cork-latex soles, and hand-lasted Blake construction built for comfort and longevity.',
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop',
      btnText: 'Explore Footwear',
    },
  ];

  const handleCategorySelect = (category: 'handbags' | 'watches' | 'footwear' | 'jewelry') => {
    setActiveCategory(category);
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-28 bg-[#FAF8F5] border-t border-[#E5D9C8]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="font-sans text-[12px] uppercase tracking-[0.35em] text-[#C5B3A6] font-semibold">
              The Aesthetic Order
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1C1C] font-light tracking-tight">
              Curated by <span className="italic font-normal">Form.</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-stone-500 font-light max-w-md leading-relaxed">
            Every category represents an ongoing architectural study. We treat handbags, timepieces, and footwear as wearable structures that honor traditional craft and minimal geometry.
          </p>
        </div>

        {/* 3-Column Vertical Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer flex flex-col h-full bg-[#FDFDFD] rounded-[2.5rem] overflow-hidden border border-[#E5D9C8]/25 hover:border-[#1C1C1C]/15 hover:shadow-md transition-all duration-500"
            >
              
              {/* Vertical Card Aspect Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-103"
                />
                
                {/* Visual Label overlay */}
                <div className="absolute top-6 left-6 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-sans font-semibold tracking-widest text-[#1C1C1C]">
                  {cat.subtitle}
                </div>

                {/* Subtle dark tint */}
                <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Text Context Frame */}
              <div className="p-8 flex flex-col flex-grow justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-serif text-3xl text-[#1C1C1C] font-light tracking-wide group-hover:text-stone-600 transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E5D9C8]/30">
                  <span className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#1C1C1C] font-semibold">
                    <span>{cat.btnText}</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
