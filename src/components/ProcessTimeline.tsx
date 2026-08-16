import React, { useState } from 'react';
import { motion } from 'motion/react';
import { processSteps } from '../data/servicesData';
import { Sparkles, ArrowRight, Check, Clock } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] text-[#353535]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#353535]/10 text-xs font-mono text-[#353535]/70">
            <Sparkles className="w-3.5 h-3.5 text-[#353535]" />
            <span>WORKFLOW & EXECUTION</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#353535] tracking-tight">
            FROM IDEA → TO FINAL FRAME.
          </h2>
          <p className="text-sm sm:text-base text-[#353535]/75 font-light">
            A seamless, transparent 5-step collaboration engineered for creative clarity, speed, and unforgettable visual quality.
          </p>
        </div>

        {/* Step Tabs Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {processSteps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                id={`process-tab-${step.step}`}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between space-y-2 ${
                  isActive
                    ? 'bg-[#353535] text-white border-[#353535] shadow-sm'
                    : 'bg-white text-[#353535] border-[#353535]/10 hover:bg-[#ECE4DB]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#FFE5D9]' : 'text-[#353535]/60'}`}>
                    PHASE {step.step}
                  </span>
                  <span className={`text-[10px] font-mono ${isActive ? 'text-white/70' : 'text-[#353535]/50'}`}>
                    {step.duration}
                  </span>
                </div>
                <div className="font-serif text-xs sm:text-sm font-bold truncate">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Box */}
        <motion.div
          key={activeStepIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#353535]/10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-[#8C3A2D] bg-[#FFE5D9] border border-[#F8C4B4]">
                STEP {processSteps[activeStepIndex].step} OF 05
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#353535]/60">
                <Clock className="w-3.5 h-3.5" />
                <span>Typical Duration: {processSteps[activeStepIndex].duration}</span>
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#353535]">
              {processSteps[activeStepIndex].title}
            </h3>

            <p className="font-serif italic text-base sm:text-lg text-[#353535]/80">
              "{processSteps[activeStepIndex].tagline}"
            </p>

            <p className="text-sm text-[#353535]/75 leading-relaxed font-light">
              {processSteps[activeStepIndex].description}
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#FAF9F6] rounded-2xl p-6 border border-[#353535]/10 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#353535]/60 font-semibold">
              KEY DELIVERABLES IN THIS PHASE:
            </h4>
            <div className="space-y-2.5">
              {processSteps[activeStepIndex].keyDeliverables.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#353535]">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
