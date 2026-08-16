import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { siteConfig } from '../data/siteConfig';
import { ArrowUp, Copy, Check, Sparkles, Mail, Phone, Instagram, Youtube, Video, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-12 pb-8 sm:pt-14 sm:pb-10 px-4 sm:px-6 lg:px-8 border-t border-[#353535]/10 bg-[#FAF9F6] text-[#353535]">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        

        {/* Middle Navigation & Social Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-4">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showBadge={true} />
            <p className="text-xs sm:text-sm text-[#353535]/75 max-w-sm leading-relaxed">
              A creative studio by Nithesh, built around moving images, honest storytelling and a love for details that make a frame feel right.
            </p>

            {/* Live Clock Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#353535]/10 text-xs font-mono text-[#353535]/70">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>India: {currentTime || 'Loading...'}</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#353535]/50 font-semibold">
              EXPLORE
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/portfolio" className="text-[#353535]/80 hover:text-[#353535] transition-colors">
                  The Work (Portfolio)
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#353535]/80 hover:text-[#353535] transition-colors">
                  Services 
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#353535]/80 hover:text-[#353535] transition-colors">
                  About 
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#353535]/80 hover:text-[#353535] transition-colors">
                  Inquiries & Booking
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#353535]/50 font-semibold">
              SERVICES
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#353535]/80">
              <li>Video Production</li>
              <li>Creative Video Editing</li>
              <li>Product & Fashion</li>
              <li>Reels & Social Content</li>
            </ul>
          </div>

          {/* Col 4: Social & Direct */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#353535]/50 font-semibold">
              CONNECT
            </div>
            <div className="flex flex-col space-y-2 text-xs sm:text-sm">
              {siteConfig.instagram && (
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#353535]/80 hover:text-[#353535] transition-colors inline-flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              )}
              
              {siteConfig.whatsapp && (
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#353535]/80 hover:text-[#353535] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>WhatsApp Direct</span>
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 border-t border-[#353535]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#353535]/60">
          <div>
            © {new Date().getFullYear()} NITHI VISUAL. All rights reserved. Editorial visual craft.
          </div>

          <button
            onClick={scrollToTop}
            id="back-to-top-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#353535]/10 hover:bg-[#FAF9F6] text-[#353535] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
