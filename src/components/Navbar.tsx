import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sparkles, Mail } from 'lucide-react';
import { Logo } from './Logo';
import { siteConfig } from '../data/siteConfig';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Work', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
          isScrolled ? 'pt-3 pb-3 bg-[#FAF9F6]/85 backdrop-blur-md border-b border-[#353535]/10 shadow-xs' : 'pt-4 pb-2 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className={`${isScrolled ? '' : 'bg-[#FAF9F6]/90 backdrop-blur-md border border-[#353535]/10 shadow-xs'} px-3.5 py-2 rounded-2xl transition-all duration-200`}>
              <Logo size="sm" showBadge={false} />
            </div>
          </div>

          {/* Center Navigation Capsule */}
          <nav className={`hidden md:flex items-center gap-1 ${isScrolled ? 'bg-white/80' : 'bg-[#FAF9F6]/90'} backdrop-blur-md px-3 py-1.5 rounded-full border border-[#353535]/10 shadow-xs transition-all duration-200`}>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                id={`nav-link-${link.name.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-4 py-1.5 text-xs font-medium tracking-wider rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#353535] text-white shadow-xs'
                      : 'text-[#353535]/70 hover:text-[#353535] hover:bg-[#ECE4DB]/60'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenBooking}
              id="header-lets-talk-btn"
              className="group hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFE5D9] hover:bg-[#FFD7BA] border border-[#353535]/10 text-[#353535] text-xs font-semibold active:scale-95 transition-all duration-200 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#353535]" />
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF9F6]/90 backdrop-blur-md border border-[#353535]/10 text-[#353535] shadow-xs"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-[#FAF9F6]/98 backdrop-blur-xl border border-[#353535]/10 rounded-3xl p-6 shadow-2xl space-y-6"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  id={`mobile-nav-link-${link.name.toLowerCase()}`}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-2xl text-base font-serif font-medium transition-colors flex items-center justify-between ${
                      isActive ? 'bg-[#353535] text-white' : 'text-[#353535] hover:bg-[#ECE4DB]/60'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </NavLink>
              ))}
            </div>

            <div className="pt-4 border-t border-[#353535]/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#353535]/70">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{siteConfig.location}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                id="mobile-lets-talk-btn"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#FFE5D9] hover:bg-[#FFD7BA] text-[#353535] border border-[#353535]/10 font-semibold text-sm flex items-center justify-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#353535]" />
                <span>Start a Project</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
