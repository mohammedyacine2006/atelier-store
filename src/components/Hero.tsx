import { motion } from 'motion/react';
import { PageType } from '../types';

interface HeroProps {
  setCurrentPage: (page: PageType) => void;
  setActiveCategory: (category: 'all' | 'handbags' | 'watches' | 'footwear' | 'jewelry') => void;
}

export default function Hero({ setCurrentPage, setActiveCategory }: HeroProps) {
  const handleShopNow = () => {
    setActiveCategory('all');
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="hero-section" className="relative min-h-[92vh] bg-[#FAF8F5] flex items-center overflow-hidden py-16 sm:py-24">
      
      {/* Background Subtle Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5B3A6_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Copy (Left 6 columns on desktop) with Vertical Rotated Label */}
          <div className="lg:col-span-6 text-left flex flex-col justify-center space-y-8 pr-4 relative pl-0 sm:pl-12">
            
            {/* Vertical Rotated Label */}
            <div className="absolute left-0 top-1/3 -translate-y-1/2 -rotate-90 origin-left text-[12px] uppercase tracking-[0.45em] text-[#C5B3A6]/80 whitespace-nowrap hidden sm:block select-none font-medium">
              Atelier Universe • Form No. V
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <p className="font-sans text-sm tracking-[0.35em] text-[#C5B3A6] uppercase font-semibold">
                Sartorial Excellence • Handcrafted Provenance
              </p>
              
              <h1 className="font-serif text-6xl sm:text-7xl xl:text-8xl text-[#1C1C1C] leading-[1.08] tracking-tight font-light">
                The Beauty of <br />
                <span className="italic font-normal text-stone-600">Pure Form.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-base sm:text-lg text-[#1C1C1C]/70 font-light leading-relaxed max-w-lg"
            >
              Exquisite accessories engineered with quiet luxury in mind. Crafted from the finest Italian full-grain leathers and Swiss components, our items prioritize raw materials, architectural forms, and slow craftsmanship.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button
                id="hero-shop-btn"
                onClick={handleShopNow}
                className="group relative px-9 py-4.5 bg-[#1C1C1C] text-[#FAF8F5] font-sans text-sm uppercase tracking-[0.25em] overflow-hidden rounded-full transition-shadow hover:shadow-lg focus:outline-none cursor-pointer"
              >
                <span className="relative z-10">Explore Collection</span>
                <span className="absolute inset-0 bg-[#3D2B1F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
              </button>
              
              <button
                id="hero-provenance-btn"
                onClick={() => {
                  setActiveCategory('watches');
                  setCurrentPage('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-4 font-sans text-sm text-[#1C1C1C] uppercase tracking-[0.25em] border-b border-transparent hover:border-[#1C1C1C] transition-all ml-2 cursor-pointer"
              >
                The Atelier Story
              </button>
            </motion.div>

            {/* Feature Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 pt-12 border-t border-[#E5D9C8]/40 max-w-md text-[#1C1C1C]/85"
            >
              <div>
                <span className="font-serif italic text-xl text-stone-500 block">01</span>
                <span className="font-sans text-xs uppercase tracking-widest font-semibold block mt-1 text-stone-600">Responsible Gold</span>
              </div>
              <div>
                <span className="font-serif italic text-xl text-stone-500 block">02</span>
                <span className="font-sans text-xs uppercase tracking-widest font-semibold block mt-1 text-stone-600">LWG Tanneries</span>
              </div>
              <div>
                <span className="font-serif italic text-xl text-stone-500 block">03</span>
                <span className="font-sans text-xs uppercase tracking-widest font-semibold block mt-1 text-stone-600">Swiss Precision</span>
              </div>
            </motion.div>

          </div>

          {/* Staggered Editorial Images (Right 6 columns on desktop) - Offset Handbag and Watch */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[480px] lg:min-h-[580px] mt-8 lg:mt-0">
            
            {/* Main Primary Image - Handbag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[70%] sm:w-[350px] mr-12 sm:mr-16 h-[360px] sm:h-[460px] rounded-[2.2rem] overflow-hidden shadow-xl z-20 border-4 border-[#FAF8F5]"
            >
              <img
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop"
                alt="The Atelier Grain Handbag"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1C1C1C]/5 pointer-events-none" />
            </motion.div>

            {/* Secondary Floating Image - Fine Swiss Watch */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 bottom-6 w-[50%] sm:w-[240px] h-[200px] sm:h-[280px] rounded-[1.8rem] overflow-hidden shadow-lg z-30 border-4 border-[#FAF8F5]"
            >
              <img
                src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1200&auto=format&fit=crop"
                alt="Swiss Mechanical Chronograph"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1C1C1C]/5 pointer-events-none" />
            </motion.div>

            {/* Accent Circle Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-[#E5D9C8]/15 z-10 blur-2xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
