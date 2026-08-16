import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import nithiLogoImg from '../assets/images/nithi visual logo.jpeg';

export const CinematicHeroBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 35]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle natural film grain generator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = 256);
    let height = (canvas.height = 256);

    const generateGrain = () => {
      const imgData = ctx.createImageData(width, height);
      const data = imgData.data;
      const len = data.length;

      for (let i = 0; i < len; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 10; // Ultra-fine, subtle grain opacity
      }

      ctx.putImageData(imgData, 0, 0);
      animationFrameId = window.requestAnimationFrame(generateGrain);
    };

    generateGrain();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Base Studio Tone */}
      <div className="absolute inset-0 w-full h-full bg-[#FAF9F6]" />

      {/* 2. TRUE FULL-BLEED BACKGROUND VIDEO (Edge-to-Edge, 100% width & height, object-cover, no borders) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Layer 2a: Google Drive NITHI VISUAL Video Stream Embed (Full Bleed) */}
        <iframe
          src="https://drive.google.com/file/d/1ft9BqI1ghscZzzXNKZoG22x0pycwc__J/preview"
          className="absolute min-w-[130%] min-h-[130%] w-[135vw] h-[135vh] max-w-none -top-[17.5%] -left-[17.5%] object-cover pointer-events-none border-0 opacity-40 mix-blend-luminosity scale-110"
          allow="autoplay; encrypted-media; fullscreen"
          loading="eager"
          title="Nithi Visual Background Reel"
        />

        {/* Layer 2b: HTML5 Video Element for instant autoplay across all devices */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-35 mix-blend-multiply filter contrast-110 saturate-85"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-cinematographer-filming-a-scene-in-the-street-42526-large.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-of-a-model-41584-large.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-vintage-photo-camera-42484-large.mp4" 
            type="video/mp4" 
          />
        </video>
      </div>

      {/* 3. Soft Ivory / Pastel Ambient Overlays (Ensures high contrast & readable typography while video stays active) */}
      <div className="absolute inset-0 w-full h-full bg-[#FAF9F6]/65 mix-blend-normal" />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#FAF8F5]/70 via-[#FAF9F6]/50 to-[#FAF9F6]/85" />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-[#FFE5D9]/15 via-transparent to-[#D8E2DC]/15" />

      {/* 4. Subtle Ambient Moving Light Passes */}
      <motion.div
        animate={{
          x: ['-4%', '4%', '-2%', '-4%'],
          y: ['-2%', '3%', '-1%', '-2%'],
          opacity: [0.3, 0.45, 0.35, 0.3],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vh] rounded-[140px] bg-gradient-to-br from-[#FFF5EB]/50 via-[#FDFBF7]/30 to-transparent blur-3xl pointer-events-none"
      />

      {/* 5. Subtly Layered NITHI VISUAL Centered Identity Accent */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          animate={{
            scale: [1.8, 1.3, 1.0, 0.98, 1.0, 1.4, 1.8],
            opacity: [0.02, 0.16, 0.12, 0.08, 0.06, 0.03, 0.02],
            y: [0, 0, -3, 2, -1, 0, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.25, 0.5, 0.72, 0.88, 0.96, 1.0],
          }}
          className="relative flex items-center justify-center max-w-[85vw]"
        >
          <img
            src={nithiLogoImg}
            alt=""
            aria-hidden="true"
            className="w-48 sm:w-64 md:w-80 lg:w-[22rem] h-auto object-contain mix-blend-multiply opacity-80 select-none pointer-events-none"
            loading="eager"
          />
        </motion.div>
      </motion.div>

      {/* 6. Minimal Film Grain Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay pointer-events-none"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};
