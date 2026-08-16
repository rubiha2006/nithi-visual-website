import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'view' | 'play' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate custom cursor on non-touch devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const cursorTextAttr = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');

      if (cursorTextAttr) {
        setCursorText(cursorTextAttr);
        setCursorVariant('view');
      } else if (cursorAttr === 'play') {
        setCursorText('PLAY');
        setCursorVariant('play');
      } else if (cursorAttr === 'view') {
        setCursorText('VIEW');
        setCursorVariant('view');
      } else if (cursorAttr === 'drag') {
        setCursorText('SLIDE');
        setCursorVariant('drag');
      } else if (target.closest('button, a, input, select, textarea, [role="button"]')) {
        setCursorText('');
        setCursorVariant('hover');
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    document.addEventListener('mouseover', handleHoverStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleHoverStart);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isTextCursor = cursorVariant === 'view' || cursorVariant === 'play' || cursorVariant === 'drag';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Follower Badge */}
      <motion.div
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none transition-colors duration-200 ${
          isTextCursor
            ? 'bg-[#353535] text-[#FAF9F6] shadow-lg px-3 py-1 font-mono text-[11px] font-medium tracking-widest'
            : cursorVariant === 'hover'
            ? 'border-2 border-[#353535] bg-[#FFE5D9]/50 w-10 h-10'
            : 'bg-[#353535]/20 w-5 h-5'
        }`}
        animate={{
          x: mousePosition.x - (isTextCursor ? 36 : cursorVariant === 'hover' ? 20 : 10),
          y: mousePosition.y - (isTextCursor ? 16 : cursorVariant === 'hover' ? 20 : 10),
          scale: cursorVariant === 'hover' ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 28,
          mass: 0.2
        }}
      >
        {isTextCursor && <span>{cursorText}</span>}
      </motion.div>

      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#353535] rounded-full pointer-events-none"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: isTextCursor ? 0 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 35
        }}
      />
    </div>
  );
};
