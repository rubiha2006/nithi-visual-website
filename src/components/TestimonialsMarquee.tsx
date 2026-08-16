import React from 'react';
import { Star, Sparkles, Quote } from 'lucide-react';
import { testimonialsData } from '../data/testimonialsData';

export const TestimonialsMarquee: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] text-[#353535]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#353535]/10 text-xs font-mono text-[#353535]/70">
            <Sparkles className="w-3.5 h-3.5 text-[#353535]" />
            <span>COMMUNITY & COLLABORATIONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#353535] tracking-tight">
            KIND WORDS FROM VISIONARIES.
          </h2>
          <p className="text-sm sm:text-base text-[#353535]/75 font-light">
            What directors, brand heads, and founders say about collaborating with NITHI VISUAL.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-[#353535]/10 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#353535]/20" />
                </div>

                <p className="text-xs sm:text-sm text-[#353535]/85 leading-relaxed font-light italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-4 border-t border-[#353535]/10 flex items-center gap-3">
                <img
                  src={item.avatarUrl}
                  alt={item.clientName}
                  className="w-10 h-10 rounded-full object-cover border border-[#353535]/10"
                />
                <div>
                  <div className="font-serif font-bold text-xs sm:text-sm text-[#353535]">
                    {item.clientName}
                  </div>
                  <div className="text-[11px] font-mono text-[#353535]/60 truncate">
                    {item.clientRole}, {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
