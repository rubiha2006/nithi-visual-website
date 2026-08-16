import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, SlidersHorizontal, Eye, Layers } from 'lucide-react';

interface ColorGradeSliderProps {
  beforeImage?: string;
  afterImage?: string;
  title?: string;
  client?: string;
}

export const ColorGradeSlider: React.FC<ColorGradeSliderProps> = ({
  beforeImage = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=40&sat=-80',
  afterImage = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90',
  title = 'SOLARIS SUMMER — COLOR SUITE',
  client = 'DaVinci Resolve Studio 19'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] text-[#353535]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#353535]/10 text-xs font-mono text-[#353535]/70">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#353535]" />
            <span>INTERACTIVE COLOR SUITE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#353535] tracking-tight">
            COLOR SCIENCE & LOOK CRAFT.
          </h2>
          <p className="text-sm sm:text-base text-[#353535]/75 font-light">
            Slide to compare flat uncompressed Log sensor capture against our custom DaVinci pastel film grade.
          </p>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="relative rounded-3xl overflow-hidden border border-[#353535]/15 shadow-xl bg-[#353535]">
          
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] select-none cursor-ew-resize overflow-hidden"
          >
            {/* After Image (Graded) - Full background */}
            <img
              src={afterImage}
              alt="After Color Grade"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* Before Image (Flat Log) - Clipped to slider width */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={beforeImage}
                alt="Before Flat Raw Log"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'
                }}
                draggable={false}
              />
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Center Handle Capsule */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#353535] border-2 border-[#353535] flex items-center justify-center shadow-2xl">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>

            {/* Top Left Label: RAW LOG */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="px-3 py-1.5 rounded-full bg-[#353535]/80 text-white text-xs font-mono backdrop-blur-md border border-white/20">
                RAW S-LOG3 / UNGRADED
              </span>
            </div>

            {/* Top Right Label: SIGNATURE PASTEL */}
            <div className="absolute top-4 right-4 z-10 pointer-events-none">
              <span className="px-3 py-1.5 rounded-full bg-[#FFE5D9] text-[#8C3A2D] text-xs font-mono font-bold shadow-md border border-[#F8C4B4]">
                ★ NITHI PASTEL MASTER
              </span>
            </div>

            {/* Bottom Color Node Info Pill */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono">
                <Layers className="w-3.5 h-3.5 text-[#FFE5D9]" />
                <span>ACEScct • Kodak 5207 Emulation • Halation 1.2 • Soft Rolloff</span>
              </div>

              <div className="ml-auto text-[11px] font-mono text-white/90 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md">
                Drag slider to inspect
              </div>
            </div>
          </div>

          {/* Bottom Bar Details */}
          <div className="p-4 sm:p-6 bg-white border-t border-[#353535]/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="font-serif font-bold text-base text-[#353535]">{title}</h4>
              <p className="text-xs font-mono text-[#353535]/60">{client}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#353535]/10 text-[#353535]/70">
                10-bit 4:2:2 Color Space
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FFE5D9] text-[#8C3A2D] border border-[#F8C4B4]">
                Custom Show LUT Included
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
