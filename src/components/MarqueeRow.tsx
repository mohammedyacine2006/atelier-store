import { motion } from 'motion/react';

export default function MarqueeRow() {
  const badges = [
    "FULL-GRAIN LEATHER",
    "SWISS PRECISION",
    "HANDCRAFTED PROVENANCE",
    "RECYCLED SOLID GOLD",
    "LIFETIME WARRANTY",
    "FLORENCE DESIGN",
    "SLOW CRAFTSMANSHIP",
    "CERTIFIED LWG TANNERIES",
  ];

  return (
    <section className="bg-[#FAF8F5] py-8 border-t border-b border-[#E5D9C8]/35 overflow-hidden relative">
      
      {/* Editorial Gradient Masks for Faded Edges */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

      {/* Scrolling Marquee Track */}
      <div className="flex overflow-hidden whitespace-nowrap w-full">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
          style={{ willChange: "transform", transform: "translateZ(0)" }}
          className="flex space-x-8 items-center flex-nowrap"
        >
          {[...badges, ...badges].map((badge, index) => (
            <div
              key={index}
              className="inline-flex items-center space-x-2 px-4 py-2 border border-[#E5D9C8]/40 bg-[#FAF8F5] rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.01)] text-[11px] sm:text-xs font-sans font-semibold tracking-[0.25em] text-[#1C1C1C] flex-shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5B3A6]" />
              <span>{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
