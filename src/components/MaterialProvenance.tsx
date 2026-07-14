import { motion } from 'motion/react';

export default function MaterialProvenance() {
  const materials = [
    {
      num: "01",
      title: "Vegetable-Tanned Leather",
      desc: "Sourced exclusively from certified LWG (Leather Working Group) tanneries in Florence. Our leathers are tanned with organic chestnut and mimosa barks, resulting in a rich, fibrous structure that breathes and develops a deep, golden patina.",
    },
    {
      num: "02",
      title: "Grade 5 Titanium",
      desc: "An aerospace-grade alloy, micro-blasted for a smooth, matte slate finish. Selected for our timepiece casings due to its incredible strength-to-weight ratio, high corrosion resistance, and complete hypoallergenic compatibility.",
    },
    {
      num: "03",
      title: "18k Recycled Solid Gold",
      desc: "Meticulously cast and hand-polished by third-generation goldsmiths. We use 100% recycled yellow, white, and rose gold. Each alloy has an understated, soft satin glaze, stamped with our official custom workshop hallmark.",
    },
    {
      num: "04",
      title: "Baroque Freshwater Pearls",
      desc: "Organically grown high-luster freshwater pearls. Meticulously selected for their unique, irregular forms and pearlescent AAA-grade iridescence. No two pearls are identical, making every pendant a unique sculpture of nature.",
    },
  ];

  return (
    <section className="py-28 bg-[#FAF8F5] border-t border-b border-[#E5D9C8]/30 relative overflow-hidden">
      
      {/* Background Subtle Accent lines */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#E5D9C8]/10 blur-3xl pointer-events-none -mr-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Column: Artisan Monochrome Visual Card (5 Columns on Desktop) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-md border border-[#E5D9C8]/20"
            >
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop"
                alt="Craftsman hands working with raw leather"
                className="w-full h-full object-cover filter grayscale contrast-125 transition-transform duration-[2.5s] hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              {/* Text Badge on image */}
              <div className="absolute bottom-8 left-8 text-[#FAF8F5] space-y-1 pr-8">
                <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#E5D9C8] font-semibold">
                  Florence Workshop
                </span>
                <p className="font-serif text-xl leading-snug font-light">
                  "Provenance is the ultimate luxury."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 2x2 Grid of Material Details (7 Columns on Desktop) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Header copy */}
            <div className="space-y-3">
              <p className="font-sans text-[12px] uppercase tracking-[0.35em] text-[#C5B3A6] font-semibold">
                Pure Provenance
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1C1C] font-light tracking-tight">
                Honoring Raw <span className="italic font-normal text-stone-600">Materiality.</span>
              </h2>
            </div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
              {materials.map((mat, idx) => (
                <motion.div
                  key={mat.num}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3.5 group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-serif italic text-xl text-[#C5B3A6] font-light">
                      {mat.num}
                    </span>
                    <div className="h-[1px] w-6 bg-[#E5D9C8] group-hover:w-10 transition-all duration-500" />
                  </div>

                  <h3 className="font-serif text-2xl text-[#1C1C1C] font-light tracking-wide">
                    {mat.title}
                  </h3>
                  
                  <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
                    {mat.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
