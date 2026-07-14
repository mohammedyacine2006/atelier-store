import { motion } from 'motion/react';
import { Product, PageType } from '../types';

interface BestsellersShowcaseProps {
  products: Product[];
  setCurrentPage: (page: PageType) => void;
  setSelectedProduct: (product: Product) => void;
}

export default function BestsellersShowcase({ products, setCurrentPage, setSelectedProduct }: BestsellersShowcaseProps) {
  
  // Select the 3 specific bestseller items from data
  // hb-1: The Atelier Grain Bag
  // wt-1: The Chronograph No. I
  // fw-1: The Suede Atelier Mule
  const bestsellerIds = ['hb-1', 'wt-1', 'fw-1'];
  let bestsellerProducts = products.filter(p => bestsellerIds.includes(p.id));
  if (bestsellerProducts.length === 0 && products.length > 0) {
    bestsellerProducts = products.slice(0, 3);
  }

  // Custom material checkmarks for these 3 products to display physical material provenance
  const materialSpecs: Record<string, string[]> = {
    'hb-1': [
      'French pebbled calfskin outer',
      'Solid brass champagne hardware',
      'Hand-finished edge coloring',
      'Responsibly sourced LWG tanneries'
    ],
    'wt-1': [
      'Swiss automatic mechanical core',
      '316L surgical-grade steel case',
      'Anti-reflective sapphire crystal',
      'Premium black alligator leather'
    ],
    'fw-1': [
      'Buttery Italian split calf suede',
      'Anatomical cork-latex footbed',
      'Natural crepe non-slip sole',
      'Hand-finished Porto craft'
    ]
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-28 bg-[#FAF8F5] border-t border-[#E5D9C8]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-20 space-y-4">
          <p className="font-sans text-[12px] uppercase tracking-[0.35em] text-[#C5B3A6] font-semibold">
            Limited Quantities
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1C1C] font-light tracking-tight">
            The Bestsellers <span className="italic font-normal">Showcase</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#C5B3A6] mx-auto mt-6"></div>
        </div>

        {/* Bestsellers Grid (3-columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {bestsellerProducts.map((product, idx) => {
            const specs = materialSpecs[product.id] || [
              'Responsibly sourced premium materials',
              'Architectural design & timeless form',
              'Individually inspected and certified',
              'Lifetime craftsmanship warranty'
            ];
            
            return (
              <motion.div
                key={product.id}
                id={`bestseller-card-${product.id}`}
                onClick={() => handleProductSelect(product)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer flex flex-col justify-between h-full bg-[#FCFAF7] rounded-[2.5rem] p-6 border border-[#E5D9C8]/25 hover:border-[#1C1C1C]/15 hover:shadow-lg transition-all duration-500"
              >
                <div>
                  
                  {/* Card Media Header with "LIMITED EDITION" Tag */}
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-stone-100 border border-[#E5D9C8]/15 mb-6">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-104"
                    />
                    
                    {/* Floating LIMITED EDITION tag */}
                    <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 bg-[#1C1C1C]/90 text-white rounded-full text-[10px] font-sans font-semibold tracking-[0.25em] backdrop-blur-sm shadow-sm">
                      LIMITED EDITION
                    </div>

                    <div className="absolute inset-0 bg-[#1C1C1C]/5 pointer-events-none" />
                  </div>

                  {/* Product Title and Price Row */}
                  <div className="space-y-2 px-1">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-serif text-2xl text-[#1C1C1C] font-light leading-snug group-hover:text-stone-600 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <span className="font-mono text-sm text-stone-600 font-medium whitespace-nowrap pt-1">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="font-sans text-[11px] text-[#C5B3A6] uppercase tracking-[0.25em] font-medium">
                      {product.category}
                    </p>

                    <p className="font-sans text-sm text-stone-500 font-light leading-relaxed pt-2 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Material Specs List - Bullet Checkmarks */}
                  <div className="mt-6 pt-5 border-t border-[#E5D9C8]/35 space-y-2.5 px-1">
                    {specs.map((spec, specIdx) => (
                      <div key={specIdx} className="flex items-center space-x-2.5 text-xs text-stone-600 font-sans font-light">
                        <span className="text-[#C5B3A6] font-medium flex-shrink-0 select-none">✓</span>
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card footer CTA */}
                <div className="mt-8 pt-4 border-t border-[#E5D9C8]/20 flex items-center justify-between text-[12px] uppercase tracking-widest text-[#1C1C1C] font-semibold px-1">
                  <span>Acquire Piece</span>
                  <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
