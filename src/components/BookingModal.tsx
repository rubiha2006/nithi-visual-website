import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/siteConfig';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [projectType, setProjectType] = useState<string>('Video Production');
  const [budget, setBudget] = useState<string>('₹5,000 - ₹10,000');
  const [timeline, setTimeline] = useState<string>('Within 1 Month');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const projectTypes = [
    'Video Production',
    'Video Editing',
    'Photography',
    'Reels & Social Content',
    'Creative Direction',
    'Complete Visuals'
  ];

  const budgetTiers = [
    'Under ₹5,000',
    '₹5,000 - ₹10,000',
    '₹10,000 - ₹25,000',
    '₹25,000+'
  ];

  const timelineOptions = [
    'Within 1 Week',
    'Within 2 Weeks',
    'Within 1 Month',
    'Just Exploring'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const fullMessage = location.trim()
      ? `Location: ${location.trim()}\n\n${message.trim()}`
      : message.trim();

    const payload = {
      name: name.trim(),
      email: email.trim(),
      projectType,
      budget,
      timeline,
      message: fullMessage
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Trigger celebratory pastel confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FDE2E4', '#FFE5D9', '#E8E8FD', '#FFF1C5', '#D8E2DC', '#18181B']
          });
        } catch {}

        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Something went wrong. Please try again or contact us directly.');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setErrorMessage('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setLocation('');
    setMessage('');
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#18181B]/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#353535]/15 shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col text-[#353535]"
        >
          {/* Top Header */}
          <div className="p-6 border-b border-[#353535]/10 flex items-center justify-between bg-[#FAF9F6]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-serif font-bold text-base text-[#353535]">
                START A PROJECT WITH NITHI VISUAL
              </span>
            </div>

            <button
              onClick={onClose}
              id="booking-modal-close-btn"
              className="w-8 h-8 rounded-full bg-white border border-[#353535]/15 text-[#353535] flex items-center justify-center hover:bg-[#FAF9F6] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form / Submitted States */}
          <div className="overflow-y-auto p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#353535]">
                    MESSAGE RECEIVED!
                  </h3>
                  <p className="text-sm text-[#353535]/80 max-w-md mx-auto font-light">
                    Thank you, <strong className="text-[#353535] font-semibold">{name}</strong>. We’ve received your inquiry for <strong>{projectType}</strong>. We typically respond within 12-24 hours with ideas and next steps.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#353535]/10 text-xs font-mono text-[#353535]/80 max-w-md mx-auto">
                  Need urgent production? Direct email: <a href={`mailto:${siteConfig.email}`} className="text-[#353535] underline font-semibold">{siteConfig.email}</a>
                </div>

                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full bg-[#353535] text-white text-xs font-semibold hover:opacity-90 transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-[#FFE5D9] border border-[#F8C4B4] text-[#8C3A2D] text-xs font-medium flex items-center gap-2">
                    <span>{errorMessage}</span>
                  </div>
                )}
                
                {/* 1. Project Type Selector */}
                <div className="space-y-2.5">
                  <label className="text-xs font-mono font-bold text-[#353535]/70 uppercase tracking-wider block">
                    WHAT ARE WE CREATING?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setProjectType(type)}
                        id={`btn-type-${type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                          projectType === type
                            ? 'bg-[#353535] text-white font-bold shadow-xs'
                            : 'bg-[#FAF9F6] border border-[#353535]/10 text-[#353535]/80 hover:bg-[#ECE4DB]/40'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Budget Tier */}
                <div className="space-y-2.5">
                  <label className="text-xs font-mono font-bold text-[#353535]/70 uppercase tracking-wider block">
                    ESTIMATED BUDGET (INR)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetTiers.map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setBudget(tier)}
                        id={`btn-budget-${tier.replace(/[^a-z0-9]/g, '')}`}
                        className={`p-2.5 rounded-xl text-xs font-mono text-center transition-all ${
                          budget === tier
                            ? 'bg-[#FFE5D9] text-[#8C3A2D] font-bold border border-[#F8C4B4]'
                            : 'bg-[#FAF9F6] border border-[#353535]/10 text-[#353535]/80 hover:bg-[#ECE4DB]/40'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Timeline */}
                <div className="space-y-2.5">
                  <label className="text-xs font-mono font-bold text-[#353535]/70 uppercase tracking-wider block">
                    WHEN DO YOU NEED IT?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timelineOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setTimeline(opt)}
                        className={`p-2.5 rounded-xl text-[11px] font-mono text-center transition-all ${
                          timeline === opt
                            ? 'bg-[#D8E2DC] text-[#2A4E36] font-bold border border-[#B4C6BA]'
                            : 'bg-[#FAF9F6] border border-[#353535]/10 text-[#353535]/80 hover:bg-[#ECE4DB]/40'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-[#353535]/70 uppercase">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="booking-name-input"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#353535]/15 text-sm text-[#353535] focus:outline-hidden focus:border-[#353535]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-[#353535]/70 uppercase">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="booking-email-input"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#353535]/15 text-sm text-[#353535] focus:outline-hidden focus:border-[#353535]"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#353535]/70 uppercase">
                    PROJECT LOCATION
                  </label>
                  <input
                    type="text"
                    placeholder="City / Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    id="booking-location-input"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#353535]/15 text-sm text-[#353535] focus:outline-hidden focus:border-[#353535]"
                  />
                </div>

                {/* 5. Project Brief */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#353535]/70 uppercase">
                    TELL US ABOUT YOUR PROJECT
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you have in mind, your requirements, references or links..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="booking-message-input"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#353535]/15 text-sm text-[#353535] focus:outline-hidden focus:border-[#353535]"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="booking-submit-btn"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-[#353535] text-white font-semibold text-sm hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Proposal...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#FFE5D9]" />
                        <span>SEND PROJECT INQUIRY</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
