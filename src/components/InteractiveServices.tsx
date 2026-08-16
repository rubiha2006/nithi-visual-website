import React from 'react';
import { motion } from 'motion/react';
import { Video, Film, Camera, Sparkles, Compass, Layers, ArrowUpRight, Check } from 'lucide-react';
import { servicesData } from '../data/servicesData';

interface InteractiveServicesProps {
  onOpenBooking: () => void;
}

export const InteractiveServices: React.FC<InteractiveServicesProps> = ({ onOpenBooking }) => {
  const iconMap: Record<string, React.ReactNode> = {
    '01': <Video className="w-4 h-4 text-[#353535]" />,
    '02': <Film className="w-4 h-4 text-[#353535]" />,
    '03': <Camera className="w-4 h-4 text-[#353535]" />,
    '04': <Sparkles className="w-4 h-4 text-[#353535]" />,
    '05': <Compass className="w-4 h-4 text-[#353535]" />,
    '06': <Layers className="w-4 h-4 text-[#353535]" />
  };

  const pastelHoverStyles: Record<string, { hoverBg: string; borderAccent: string; badgeBg: string }> = {
    '01': { hoverBg: 'hover:bg-[#FDE2E4]/20', borderAccent: 'hover:border-[#F8B4B8]/60', badgeBg: 'bg-[#FDE2E4]/60 text-[#8C2D35]' },
    '02': { hoverBg: 'hover:bg-[#E8E8FD]/25', borderAccent: 'hover:border-[#B8B8F8]/60', badgeBg: 'bg-[#E8E8FD]/70 text-[#3D3B8E]' },
    '03': { hoverBg: 'hover:bg-[#FFE5D9]/25', borderAccent: 'hover:border-[#F8C4B4]/60', badgeBg: 'bg-[#FFE5D9]/70 text-[#8C3A2D]' },
    '04': { hoverBg: 'hover:bg-[#FFF1C5]/25', borderAccent: 'hover:border-[#EAD170]/60', badgeBg: 'bg-[#FFF1C5]/70 text-[#7A610A]' },
    '05': { hoverBg: 'hover:bg-[#D8E2DC]/25', borderAccent: 'hover:border-[#B4C6BA]/60', badgeBg: 'bg-[#D8E2DC]/70 text-[#2A4E36]' },
    '06': { hoverBg: 'hover:bg-[#ECE4DB]/30', borderAccent: 'hover:border-[#D9CFBF]/60', badgeBg: 'bg-[#ECE4DB]/80 text-[#4A4337]' }
  };

  return (
    <section id="services-section" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] text-[#353535]">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#353535]/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#353535]/10 text-xs font-mono text-[#353535]/70 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#353535]" />
              <span>SERVICES & CAPABILITIES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#353535] tracking-tight">
              SERVICES.
            </h2>
            <p className="text-sm sm:text-base text-[#353535]/75 font-light leading-relaxed">
              Clean, intentional creative work from initial concept through final master delivery.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            id="services-inquire-btn"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#353535] text-white text-xs font-semibold hover:bg-black active:scale-98 transition-all shadow-xs self-start md:self-auto shrink-0"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 6 Clean Minimal Editorial Service Cards (NO IMAGES — Equal Dimensions & Height) */}
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
                id={`service-card-${service.number}`}
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

      </div>
    </section>
  );
};
