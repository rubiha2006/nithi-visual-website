import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6"
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Subtle Blur Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#18181B]/80 backdrop-blur-xs"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-white rounded-xl border border-[#353535]/20 shadow-2xl overflow-hidden z-10 flex flex-col my-auto max-h-[92vh] text-[#353535]"
        >
          {/* Header Bar */}
          <div className="px-3.5 py-3 sm:px-5 sm:py-3.5 border-b border-[#353535]/10 flex items-center justify-between bg-white gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="font-mono text-xs text-[#353535]/60 font-semibold shrink-0">
                {project.category}
              </span>
              <span className="text-[#353535]/30">/</span>
              <h2 className="font-serif font-bold text-sm sm:text-base text-[#353535] truncate">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              id="project-modal-close-btn"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#FAF9F6] border border-[#353535]/15 text-[#353535] flex items-center justify-center hover:bg-[#353535] hover:text-white transition-colors shrink-0"
              aria-label="Close video player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Video Container */}
          <div className="relative w-full bg-black flex items-center justify-center overflow-hidden flex-1 select-none">
            <div className="w-full aspect-video max-h-[72vh] flex items-center justify-center">
              {project.driveId ? (
                <iframe
                  src={`https://drive.google.com/file/d/${project.driveId}/preview`}
                  title={project.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : project.videoUrl ? (
                <video
                  src={project.videoUrl}
                  controls
                  controlsList="nodownload noplaybackrate"
                  disablePictureInPicture
                  playsInline
                  className="w-full h-full object-contain"
                  onContextMenu={(e) => e.preventDefault()}
                />
              ) : (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
