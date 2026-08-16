import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ArrowUpRight, Camera, Film } from 'lucide-react';
import nitheshPortrait from '../assets/images/nithesh_portrait.png';

export const AboutPreview: React.FC = () => {
  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] text-[#353535]">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#353535]/10 shadow-sm overflow-hidden relative"
        >
          {/* Subtle Background Natural Light Highlights */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#FFE5D9]/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#D8E2DC]/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Creative Portrait */}
            <div className="lg:col-span-5 relative mx-auto max-w-sm lg:max-w-none w-full">
              <motion.div 
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-[#FAF9F6] border border-[#353535]/15 shadow-md"
              >
                <img
                  src={nitheshPortrait}
                  alt="Nithesh - Visual Director & Filmmaker"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Bottom Overlay Pill */}
                <div className="absolute bottom-4 inset-x-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-[#353535]/10 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-serif font-bold text-sm text-[#353535]">Nithesh</div>
                      <div className="text-[10px] font-mono text-[#353535]/60">Founder · Filmmaker · Editor</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#FFE5D9] text-[#8C3A2D] text-[10px] font-mono font-bold">
                      FOUNDED BY NITHESH
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Camera Badge */}
              <div className="absolute -top-4 -left-4 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#FFF1C5] border border-[#EAD170] shadow-md -rotate-3">
                <Camera className="w-3.5 h-3.5 text-[#7A610A]" />
                <span className="text-[11px] font-mono font-bold text-[#7A610A]">SONY CINEMA RIG</span>
              </div>

              {/* Floating Color Badge */}
              <div className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#D8E2DC] border border-[#B4C6BA] shadow-md rotate-3">
                <Film className="w-3.5 h-3.5 text-[#2A4E36]" />
                <span className="text-[11px] font-mono font-bold text-[#2A4E36]">DAVINCI RESOLVE PRO</span>
              </div>
            </div>

            {/* Right: Story & Values */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#353535]/10 text-xs font-mono text-[#353535]/70">
                  <Heart className="w-3.5 h-3.5 text-[#353535]" />
                  <span>THE HUMAN BEHIND THE LENS</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#353535] tracking-tight">
                  OBSESSED WITH LIGHT, RHYTHM & GENUINE EMOTION.
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#353535]/80 leading-relaxed font-light">
                <p>
                  Hey, I'm Nithesh. I founded NITHI VISUAL out of a love for tactile, sun-drenched imagery that doesn't take itself too seriously while delivering uncompromising cinema quality.
                </p>
                <p>
                  I like being involved in the whole process — finding the right frame, getting the shot, building the story, finding the right rhythm in the edit, and making sure the final colour feels just right.
                </p>
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#353535]/10 space-y-1">
                  <div className="font-serif font-bold text-sm text-[#353535]">01. Tactile Daylight</div>
                  <p className="text-xs text-[#353535]/70 font-light">Organic bounce, lens textures & natural grain over artificial plastic setups.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#353535]/10 space-y-1">
                  <div className="font-serif font-bold text-sm text-[#353535]">02. Musical Rhythm</div>
                  <p className="text-xs text-[#353535]/70 font-light">Every cut is choreographed to sonic transients, sub-bass, and emotional beats.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#353535]/10 space-y-1">
                  <div className="font-serif font-bold text-sm text-[#353535]">03. Signature Color</div>
                  <p className="text-xs text-[#353535]/70 font-light">Carefully crafted palettes that make your content feel memorable and distinct.</p>
                </div>
              </div>

              {/* Link CTA */}
              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/about"
                  id="about-learn-more-link"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#353535] text-white text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-xs"
                >
                  <span>Read Full Bio & Studio Gear</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
