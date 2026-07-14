import { motion } from 'motion/react';
import { PageType } from '../types';

interface BentoCategoriesProps {
  setCurrentPage: (page: PageType) => void;
  setActiveCategory: (category: 'all' | 'handbags' | 'watches' | 'footwear' | 'jewelry') => void;
}

export default function BentoCategories({ setCurrentPage, setActiveCategory }: BentoCategoriesProps) {
  
  const handleCategorySelect = (category: 'handbags' | 'watches' | 'footwear' | 'jewelry') => {
    setActiveCategory(category);
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    {
      id: 'handbags',
      title: 'Handbags',
      subtitle: 'SCULPTURAL LEATHER',
      desc: 'Florence-crafted pebbled calfskin envelopes and box totes.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'watches',
      title: 'Fine Watches',
      subtitle: 'SWISS PRECISION',
      desc: 'Automatic movements encased in surgical steel and grade-5 titanium.',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'footwear',
      title: 'Footwear',
      subtitle: 'UNDERSTATED STEPS',
      desc: 'Water-resistant Italian split suede mules and Goodyear boots.',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'jewelry',
      title: 'Fine Jewelry',
      subtitle: 'RECYCLED SOLID GOLD',
      desc: 'Organically cast yellow gold bands and high-luster freshwater pearls.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <section id="bento-categories" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="font-sans text-[12px] uppercase tracking-[0.35em] text-[#C5B3A6] font-semibold">
            Brand Universe
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1C1C] tracking-tight font-light">
            Quiet Forms, <span className="italic">Eternal Materials</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#C5B3A6] mx-auto mt-6"></div>
        </div>

        {/* 5-Card Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Large Editorial Story Card (Left Side, 5 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative overflow-hidden rounded-[2.2rem] shadow-sm hover:shadow-md transition-all duration-500 bg-[#F2EFE9] p-8 sm:p-10 flex flex-col justify-between min-h-[400px] lg:min-h-[620px] border border-[#E5D9C8]/40"
          >
            {/* Soft Overlay/Background Image */}
            <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply">
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop"
                alt="Leather atelier"
                className="w-full h-full object-cover filter grayscale"
              />
            </div>
            
            <div className="space-y-4 relative z-10">
              <span className="font-sans text-[12px] uppercase tracking-[0.3em] text-[#8E7D6F] font-semibold block">
                Atelier Philosophy
              </span>
              <h3 className="font-serif text-4xl sm:text-5xl text-[#1C1C1C] tracking-tight font-light leading-tight">
                Curated by <span className="italic font-normal">Pure Form.</span>
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#1C1C1C]/70 leading-relaxed font-light max-w-sm">
                We believe that true luxury lies in the subtraction of the unnecessary. Our Florence-designed objects represent absolute geometrical precision, crafted with durable natural materials to age gracefully alongside you.
              </p>
            </div>

            <div className="pt-8 space-y-6 relative z-10">
              <div className="border-t border-[#E5D9C8] pt-6 grid grid-cols-2 gap-4">
                <div>
                  <span className="font-serif text-3xl text-stone-600 block">100%</span>
                  <span className="font-sans text-[11px] uppercase tracking-widest text-[#8E7D6F] font-medium mt-0.5 block">Sustainably Cast Gold</span>
                </div>
                <div>
                  <span className="font-serif text-3xl text-stone-600 block">Grade 5</span>
                  <span className="font-sans text-[11px] uppercase tracking-widest text-[#8E7D6F] font-medium mt-0.5 block">Swiss Titanium</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveCategory('all');
                  setCurrentPage('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 text-[12px] uppercase tracking-[0.25em] text-[#1C1C1C] font-semibold border-b border-[#1C1C1C] pb-1 hover:text-[#8E7D6F] hover:border-[#8E7D6F] transition-all cursor-pointer"
              >
                <span>Read Design Manual</span>
                <span>→</span>
              </button>
            </div>
          </motion.div>

          {/* Cards 2-5: Category Grid (Right Side, 7 columns, containing 4 small category cards in a 2x2 grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                id={`bento-card-${cat.id}`}
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id as any)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer bg-stone-100 h-[280px] lg:h-[296px]"
              >
                {/* Cover Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                />

                {/* Muted Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-950/20 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>

                {/* Card Label and Typography Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white space-y-1.5">
                  <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#E5D9C8]/80 font-medium">
                    {cat.subtitle}
                  </p>
                  <h3 className="font-serif text-3xl tracking-wide font-light">
                    {cat.title}
                  </h3>
                  <p className="font-sans text-xs text-stone-300 font-light leading-relaxed max-w-sm pt-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 line-clamp-2">
                    {cat.desc}
                  </p>
                  
                  {/* Minimal Link indicator */}
                  <div className="pt-2 flex items-center space-x-2 text-[11px] uppercase tracking-widest text-[#E5D9C8] font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

                {/* Delicate Inner border */}
                <div className="absolute inset-4 rounded-[1.3rem] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
