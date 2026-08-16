import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ArrowUpRight, HelpCircle, ChevronDown, Video, Film, Camera, Compass, Layers } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { faqList } from '../data/siteConfig';

interface ServicesPageProps {
  onOpenBooking: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const iconMap: Record<string, React.ReactNode> = {
    '01': <Video className="w-4 h-4 text-[#353535]" />,
    '02': <Film className="w-4 h-4 text-[#353535]" />,
    '03': <Camera className="w-4 h-4 text-[#353535]" />,
    '04': <Sparkles className="w-4 h-4 text-[#353535]" />,
    '05': <Compass className="w-4 h-4 text-[#353535]" />,
    '06': <Layers className="w-4 h-4 text-[#353535]" />
  };

  const pastelHoverStyles: Record<string, { hoverBg: string; borderAccent: string }> = {
    '01': { hoverBg: 'hover:bg-[#FDE2E4]/20', borderAccent: 'hover:border-[#F8B4B8]/60' },
    '02': { hoverBg: 'hover:bg-[#E8E8FD]/25', borderAccent: 'hover:border-[#B8B8F8]/60' },
    '03': { hoverBg: 'hover:bg-[#FFE5D9]/25', borderAccent: 'hover:border-[#F8C4B4]/60' },
    '04': { hoverBg: 'hover:bg-[#FFF1C5]/25', borderAccent: 'hover:border-[#EAD170]/60' },
    '05': { hoverBg: 'hover:bg-[#D8E2DC]/25', borderAccent: 'hover:border-[#B4C6BA]/60' },
    '06': { hoverBg: 'hover:bg-[#ECE4DB]/30', borderAccent: 'hover:border-[#D9CFBF]/60' }
  };

  return (
    <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-14 bg-[#FAF9F6] text-[#353535]">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#353535]/10 text-xs font-mono text-[#353535]/70 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#353535]" />
          <span>SERVICES & CAPABILITIES</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#353535] tracking-tight">
          SERVICES.
        </h1>
        <p className="text-base text-[#353535]/75 leading-relaxed font-light">
          Clean, intentional visual craft from the first conversation to the final frame.
        </p>
      </div>

      {/* Services Grid (6 Clean Minimal Editorial Cards — NO IMAGES) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {servicesData.map((service, index) => {
          const style = pastelHoverStyles[service.number] || pastelHoverStyles['01'];

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={onOpenBooking}
              id={`service-page-card-${service.number}`}
              className={`group relative cursor-pointer bg-white rounded-3xl p-6 sm:p-7 md:p-8 border border-[#353535]/10 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${style.borderAccent} ${style.hoverBg} flex flex-col justify-between h-full`}
            >
              {/* Upper Content Area */}
              <div className="space-y-5">
                
                {/* Top Row: Number Badge & Service Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tracking-wider text-[#353535]/70 px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#353535]/10">
                    {service.number}
                  </span>

                  <div className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-[#353535]/10 flex items-center justify-center transition-colors group-hover:bg-white shadow-2xs">
                    {iconMap[service.number]}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#353535] tracking-tight group-hover:text-black transition-colors pt-1">
                  {service.number} — {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#353535]/75 font-light leading-relaxed min-h-[2.75rem]">
                  {service.description}
                </p>

                {/* Deliverables / Includes Section */}
                <div className="pt-4 border-t border-[#353535]/10 space-y-3">
                  <div className="text-[10px] sm:text-[11px] font-mono text-[#353535]/60 font-semibold tracking-wider uppercase">
                    INCLUDES:
                  </div>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#353535]/85 font-normal">
                        <Check className="w-3.5 h-3.5 text-[#353535]/60 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Bottom Footer Area: Aligned identically on every card */}
              <div className="pt-5 mt-6 border-t border-[#353535]/10 flex items-center justify-between text-xs font-semibold text-[#353535]">
                <span className="text-[#353535]/70 group-hover:text-[#353535] transition-colors">
                  Inquire Service
                </span>
                <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#353535]/10 flex items-center justify-center text-[#353535] group-hover:bg-[#353535] group-hover:text-white transition-all shadow-2xs">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Frequently Asked Questions */}
      <div className="pt-8 border-t border-[#353535]/10 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#353535]/10 text-xs font-mono text-[#353535]/70 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#353535]" />
            <span>COMMISSION & TIMELINES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#353535] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqList.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-[#353535]/10 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif font-semibold text-base sm:text-lg text-[#353535] hover:text-black transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-[#353535]/60 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#353535]/75 font-light leading-relaxed border-t border-[#353535]/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
