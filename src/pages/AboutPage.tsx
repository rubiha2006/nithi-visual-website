import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Camera, Film, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { studioGear, siteConfig } from '../data/siteConfig';
import nitheshPortrait from '../assets/images/nithesh_portrait.png';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-14 bg-[#FAF9F6] text-[#353535]">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#353535]/10 text-xs font-mono text-[#353535]/70">
          <Sparkles className="w-3.5 h-3.5 text-[#353535]" />
          <span>ABOUT NITHI VISUAL</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#353535] tracking-tight">
          Hey, Nithesh here.
        </h1>
        <p className="text-base sm:text-lg text-[#353535]/75 leading-relaxed font-light">
          A visual creator working across filmmaking, photography, editing and colour.
          What started with a love for creating frames slowly became a space where I could bring an entire idea to life — from the first concept and shoot to the final edit.
        </p>
      </motion.div>

      {/* Hero Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left: Portrait & Studio Atmosphere */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-white border border-[#353535]/10 shadow-lg">
            <img
              src={nitheshPortrait}
              alt="Nithesh - Founder of Nithi Visual"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#353535]/10 shadow-md flex items-center justify-between">
              <div>
                <div className="font-serif font-bold text-sm text-[#353535]">Nithesh</div>
                <div className="text-xs font-mono text-[#353535]/60">Founder · Filmmaker · Editor</div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#FFE5D9] text-[#8C3A2D] font-bold border border-[#F8C4B4]">
                FOUNDED BY NITHESH
              </span>
            </div>
          </div>

          <div className="absolute -top-3 -right-3 px-3.5 py-1.5 rounded-2xl bg-[#ECE4DB] border border-[#D6CCC2] shadow-sm font-mono text-xs font-bold text-[#554A40] rotate-2">
            BEHIND NITHIVISUAL
          </div>
        </motion.div>

        {/* Right: Story & Manifesto */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="space-y-3.5 text-sm sm:text-base text-[#353535]/80 leading-relaxed font-light">
            <p>I like being involved in the whole process.</p>
            <p>Finding the right frame. Getting the shot. Building the story. Finding the right rhythm in the edit. And making sure the final colour feels just right.</p>
            <p>
              For me, good visuals aren't about making everything look perfect. They're about making something feel intentional, natural and memorable.
            </p>
            <p>
              At Nithi Visual, every project is approached differently. Whether it's a brand film, product shoot, event, fashion content or a simple reel, the goal stays the same: Make the idea look like itself — only better.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3.5 pt-4 border-t border-[#353535]/10">
            <div className="p-4 rounded-2xl bg-white border border-[#353535]/10 text-center shadow-2xs">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#353535]">{siteConfig.stats.projectsCount}</div>
              <div className="text-[11px] font-mono text-[#353535]/60 mt-0.5">Video Production</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#353535]/10 text-center shadow-2xs">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#353535]">{siteConfig.stats.happyClients}</div>
              <div className="text-[11px] font-mono text-[#353535]/60 mt-0.5">Video Editing</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#353535]/10 text-center shadow-2xs">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#353535]">{siteConfig.stats.yearsExperience}</div>
              <div className="text-[11px] font-mono text-[#353535]/60 mt-0.5">Photography</div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Studio Capabilities & Approach */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6 pt-6 border-t border-[#353535]/10"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#353535]/10 text-xs font-mono text-[#353535]/70">
            <Camera className="w-3.5 h-3.5 text-[#353535]" />
            <span>PRODUCTION ARSENAL</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#353535] tracking-tight">
            How We Build Visuals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {studioGear.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-[#353535]/10 space-y-2 shadow-2xs flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="font-mono text-[11px] font-bold text-[#8C3A2D] uppercase tracking-wider">
                  {item.tag}
                </div>
                <h3 className="font-serif font-bold text-base text-[#353535]">
                  {item.name}
                </h3>
                <p className="text-xs text-[#353535]/75 leading-relaxed font-light">
                  {item.detail}
                </p>
              </div>
              <div className="pt-3 border-t border-[#353535]/5 text-[10px] font-mono text-[#353535]/50 uppercase tracking-widest">
                {item.category}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
};
