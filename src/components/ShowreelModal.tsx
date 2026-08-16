import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Volume2 } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#18181B]/80 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-5xl bg-[#18181B] rounded-3xl border border-white/10 shadow-2xl overflow-hidden z-10 my-auto flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#353535] text-white">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFE5D9] animate-pulse"></span>
              <span className="font-serif font-bold text-sm text-[#FAF9F6]">
                NITHI VISUAL — OFFICIAL SHOWREEL (4K DCI)
              </span>
              <span className="hidden sm:inline text-xs font-mono text-white/60">
                • SONY FX6 / FX3 • DAVINCI RESOLVE
              </span>
            </div>

            <button
              onClick={onClose}
              id="showreel-modal-close-btn"
              className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close Showreel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Video Container */}
          <div className="relative aspect-video bg-black">
            <video
              src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-a-sunny-studio-41481-large.mp4"
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Footer Bar */}
          <div className="p-4 sm:p-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60 bg-[#353535]">
            <span>Director & Colorist: Nithi</span>
            <span>All Footage Shot on Anamorphic & Cinema Primes</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
