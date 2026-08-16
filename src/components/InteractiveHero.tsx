import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import mainImage from '../assets/images/Main-image.png';

interface InteractiveHeroProps {
  onPlayShowreel?: () => void;
  onOpenBooking?: () => void;
}

export const InteractiveHero: React.FC<InteractiveHeroProps> = ({ onPlayShowreel }) => {
  // Smooth, subtle mouse parallax physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 32, stiffness: 90, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle parallax displacement for visual elements
  const imageTranslateX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const imageTranslateY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const ambientTranslateX = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const ambientTranslateY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen min-h-[100dvh] flex items-center justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:py-0 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden bg-[#FAF9F6] text-[#353535]"
    >
      {/* =========================================================================
          1. AMBIENT LIGHTING & WARM PASTEL BACKDROPS
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        
        {/* Soft Warm Radial Glow Base */}
        <motion.div
          style={{
            x: ambientTranslateX,
            y: ambientTranslateY,
          }}
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.4, 0.55, 0.4],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-[10%] right-[10%] w-[900px] h-[700px] bg-gradient-to-b from-[#FFE5D9]/45 via-[#FAF9F6]/20 to-transparent blur-3xl rounded-full"
        />

        {/* Subtle Pastel Tint Accents */}
        <motion.div
          animate={{
            x: [-20, 20, -20],
            y: [-15, 15, -15],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 right-[-5%] w-[600px] h-[600px] bg-[#D8E2DC]/30 blur-3xl rounded-full"
        />

        <motion.div
          animate={{
            x: [15, -15, 15],
            y: [10, -10, 10],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-10 left-[5%] w-[500px] h-[500px] bg-[#FFE5D9]/25 blur-3xl rounded-full"
        />

        {/* Micro Grid Texture for Studio Craftsmanship */}
        <div 
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(#353535 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Top/Bottom Seamless Ambient Fades */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FAF9F6] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAF9F6] to-transparent pointer-events-none" />
      </div>

      {/* =========================================================================
          2. WIDE DESKTOP HERO COMPOSITION (LEFT 40% TEXT + RIGHT 60% VISUAL)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 xl:gap-8 items-center min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-4rem)]">
        
        {/* =======================================================================
            LEFT COLUMN (40-45%): EDITORIAL CONTENT & CALL TO ACTIONS
            ======================================================================= */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center text-left space-y-5 sm:space-y-6 md:space-y-6.5 relative z-20 pt-4 sm:pt-6 lg:pt-0">
          
          {/* 1. Small Label: VISUALS THAT SPEAK */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-[#353535]/80 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.26em] text-[#353535]/75 uppercase font-medium">
              VISUALS THAT SPEAK
            </span>
          </motion.div>

          {/* 2. Main Studio Title: NITHI VISUAL */}
          <div className="space-y-0 select-none">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.22,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-serif font-bold tracking-tight text-[#353535] leading-[0.96] sm:leading-[0.92]"
              >
                NITHI
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.34,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-serif font-normal italic text-[#353535]/90 tracking-tight leading-[0.96] sm:leading-[0.92]"
              >
                VISUAL
              </motion.h1>
            </div>
          </div>

          {/* 3. Supporting Line: CRAFTING STORIES. CREATING IMPACT. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm font-mono tracking-[0.2em] sm:tracking-[0.22em] text-[#353535]/85 uppercase font-semibold border-l-2 border-[#353535]/30 pl-3.5"
          >
            CRAFTING STORIES. CREATING IMPACT.
          </motion.div>

          {/* 4. Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-[#353535]/80 font-light leading-relaxed max-w-md"
          >
            We transform ideas into powerful visuals through editing, videography and photography that connect, inspire and leave a lasting impression.
          </motion.p>

          {/* 5. Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3.5 pt-2 sm:pt-3"
          >
            {/* Button 1: VIEW SHOWREEL */}
            {onPlayShowreel ? (
              <button
                onClick={onPlayShowreel}
                id="hero-view-showreel-btn"
                className="group inline-flex items-center gap-2.5 bg-[#353535] text-white px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide hover:bg-black active:scale-98 transition-all shadow-md shadow-black/5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current transition-transform group-hover:scale-110" />
                <span>VIEW SHOWREEL</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <Link
                to="/portfolio"
                id="hero-view-showreel-link"
                className="group inline-flex items-center gap-2.5 bg-[#353535] text-white px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide hover:bg-black active:scale-98 transition-all shadow-md shadow-black/5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current transition-transform group-hover:scale-110" />
                <span>VIEW SHOWREEL</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}

            {/* Button 2: EXPLORE OUR WORK */}
            <Link
              to="/portfolio"
              id="hero-explore-work-btn"
              className="group inline-flex items-center gap-2 bg-white hover:bg-[#FAF8F5] text-[#353535] border border-[#353535]/20 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide active:scale-98 transition-all shadow-xs hover:border-[#353535]/40"
            >
              <span>EXPLORE OUR WORK</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>

        {/* =======================================================================
            RIGHT SIDE (60-70%): FULL ATMOSPHERIC SEAMLESS BACKGROUND VISUAL
            ======================================================================= */}
        <div className="absolute right-[-4%] lg:right-[-2%] top-0 bottom-0 w-full lg:w-[68%] xl:w-[64%] h-full flex items-center justify-end pointer-events-none select-none z-0 overflow-hidden">
          
          {/* Subtle Ambient Backlight Glow behind the visual elements */}
          <div className="absolute top-1/2 -translate-y-1/2 right-[10%] w-[600px] h-[550px] bg-gradient-to-tr from-[#FFE5D9]/50 via-white/60 to-[#D8E2DC]/40 blur-3xl rounded-full pointer-events-none -z-10" />

          {/* Interactive Subtle Parallax Frame */}
          <motion.div
            style={{
              x: imageTranslateX,
              y: imageTranslateY,
            }}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1.03 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative flex items-center justify-end"
          >
            {/* Cinematic Floating & Breathing Loop (8-12s continuous calm motion) */}
            <motion.div
              animate={{
                y: [-6, 6, -6],
                scale: [1.02, 1.045, 1.02],
                opacity: [0.65, 0.74, 0.65],
              }}
              transition={{
                duration: 10.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full h-full flex items-center justify-end relative"
            >
              {/* Multi-directional Feathered Mask Container: Dissolves seamlessly on Left, Top, and Bottom */}
              <div
                className="w-full h-full flex items-center justify-end"
                style={{
                  maskImage: `
                    radial-gradient(ellipse 95% 85% at 75% 50%, black 40%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.3) 80%, transparent 98%),
                    linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 18%, black 40%, black 100%),
                    linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
                  `,
                  WebkitMaskImage: `
                    radial-gradient(ellipse 95% 85% at 75% 50%, black 40%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.3) 80%, transparent 98%),
                    linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 18%, black 40%, black 100%),
                    linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
                  `,
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'destination-in',
                }}
              >
                <img
                  src={mainImage}
                  alt="Nithi Visual Atmospheric Studio Suite"
                  id="main-hero-atmospheric-visual"
                  loading="eager"
                  decoding="async"
                  className="w-full max-w-[850px] xl:max-w-[980px] h-full max-h-[86vh] object-contain object-right mix-blend-multiply pointer-events-none select-none filter contrast-[1.03] saturate-[0.98]"
                />
              </div>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};



