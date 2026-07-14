import { motion } from 'motion/react';
import { Star, ShieldCheck } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  location: string;
  date: string;
  rating: number;
  product: string;
  comment: string;
}

export default function Reviews() {
  const reviews: Review[] = [
    {
      id: 1,
      name: "Arthur de Saint-Exupéry",
      location: "Paris, France",
      date: "May 12, 2026",
      rating: 5,
      product: "The Chronograph No. I",
      comment: "The precision is exemplary. The matte opaline dial sits beautifully beneath the double-domed crystal, capturing light in the most subtle, quiet way. It has immediately become the centerpiece of my collection.",
    },
    {
      id: 2,
      name: "Eleanor Vance",
      location: "London, UK",
      date: "June 24, 2026",
      rating: 5,
      product: "The Atelier Grain Bag",
      comment: "Incredibly sculptural form. The French calfskin has a beautiful, rich texture and a wonderful heavy leather scent. The hand-painted edges are impeccably polished. It drapes naturally against the silhouette.",
    },
    {
      id: 3,
      name: "Kenji Takahashi",
      location: "Tokyo, Japan",
      date: "July 02, 2026",
      rating: 5,
      product: "The Horizon Titanium",
      comment: "An exercise in extreme restraint. At 6.2mm, it is incredibly lightweight, feeling almost like a second skin. The sandblasted titanium finish matches my architectural aesthetic perfectly.",
    },
    {
      id: 4,
      name: "Charlotte Laurent",
      location: "Geneva, Switzerland",
      date: "July 18, 2026",
      rating: 5,
      product: "The Sculpted Twist Band",
      comment: "The weight of the 18k solid gold ring is very substantial. It has a lovely organic contour that fits my finger comfortably. The satin-matte glaze is far more beautiful than high-polish alternatives.",
    }
  ];

  const ratingStats = [
    { stars: 5, percentage: 94 },
    { stars: 4, percentage: 5 },
    { stars: 3, percentage: 1 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ];

  return (
    <section className="py-28 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-20 space-y-4 max-w-xl">
          <p className="font-sans text-[12px] uppercase tracking-[0.35em] text-[#C5B3A6] font-semibold">
            Global Credibility
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1C1C] font-light tracking-tight">
            Trusted globally <br />
            by <span className="italic font-normal text-stone-600">collectors.</span>
          </h2>
        </div>

        {/* Grid Split: Rating bar chart & Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Rating Bar Chart (4 Columns on Desktop) */}
          <div className="lg:col-span-4 bg-[#FCFAF7] p-8 rounded-[2.2rem] border border-[#E5D9C8]/25 space-y-8 shadow-sm">
            
            {/* Overall score indicator */}
            <div className="space-y-1.5">
              <div className="flex items-baseline space-x-2.5">
                <span className="font-serif text-6xl text-[#1C1C1C] font-light">4.9</span>
                <span className="font-sans text-sm text-stone-400 font-medium tracking-wide">out of 5.0</span>
              </div>
              
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5B3A6] stroke-none" />
                ))}
                <span className="font-sans text-[12px] uppercase tracking-widest text-stone-500 font-medium pl-2">
                  184 COLLECTORS
                </span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#E5D9C8]/35" />

            {/* Distribution chart */}
            <div className="space-y-3.5">
              {ratingStats.map((stat) => (
                <div key={stat.stars} className="flex items-center space-x-4 text-sm">
                  <span className="font-sans text-xs text-[#1C1C1C] font-medium w-4">
                    {stat.stars}★
                  </span>
                  
                  {/* Outer Bar */}
                  <div className="flex-grow h-1.5 bg-[#F2EFE9] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-[#C5B3A6] rounded-full"
                    />
                  </div>

                  <span className="font-mono text-[12px] text-stone-500 w-8 text-right">
                    {stat.percentage}%
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 text-[12px] text-stone-500 font-sans tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5B3A6]" />
                <span>100% Verified Collector Submissions</span>
              </div>
            </div>

          </div>

          {/* Right Side: Horizontal Scrollable reviews (8 Columns on Desktop) */}
          <div className="lg:col-span-8 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin scrollbar-thumb-stone-200">
            <div className="flex space-x-6 sm:space-x-8 min-w-max pb-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="w-[290px] sm:w-[350px] bg-[#FCFAF7] border border-[#E5D9C8]/25 p-8 rounded-[2.2rem] flex flex-col justify-between space-y-6 shadow-sm"
                >
                  <div className="space-y-4">
                    
                    {/* Stars and date row */}
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#C5B3A6] stroke-none" />
                        ))}
                      </div>
                      <span className="font-sans text-[12px] text-stone-400 font-light">
                        {rev.date}
                      </span>
                    </div>

                    {/* Review text */}
                    <p className="font-serif text-stone-600 text-base leading-relaxed font-light italic">
                      "{rev.comment}"
                    </p>

                  </div>

                  {/* Customer bio footer */}
                  <div className="pt-4 border-t border-[#E5D9C8]/25 flex flex-col space-y-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-sans text-sm text-[#1C1C1C] font-semibold tracking-wide">
                        {rev.name}
                      </span>
                      <ShieldCheck className="w-3 h-3 text-[#C5B3A6]" />
                    </div>
                    
                    <div className="flex justify-between text-[12px] font-sans text-stone-400 font-medium">
                      <span>{rev.location}</span>
                      <span className="uppercase tracking-widest text-[#C5B3A6] text-[11px]">{rev.product}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
