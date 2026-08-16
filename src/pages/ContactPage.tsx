import React, { useState } from 'react';
import { Sparkles, Mail, Phone, MessageSquare, MapPin, Clock, Copy, Check, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/siteConfig';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Brand Video');
  const [budget, setBudget] = useState('₹5,000 - ₹10,000');
  const [timeline, setTimeline] = useState('Within 1 Month');
  const [message, setMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      projectType,
      budget,
      timeline,
      message: message.trim()
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
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FDE2E4', '#FFE5D9', '#E8E8FD', '#FFF1C5', '#D8E2DC', '#18181B']
          });
        } catch {}

        // Clear the form after successful submission
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setProjectType('Brand Video');
        setBudget('₹5,000 - ₹10,000');
        setTimeline('Within 1 Month');
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Something went wrong. Please try again or contact us directly.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 bg-[#FAF9F6] text-[#353535]">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#353535]/10 text-xs font-mono text-[#353535]/70">
          <Sparkles className="w-3.5 h-3.5 text-[#353535]" />
          <span>INQUIRIES & BOOKING</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#353535] tracking-tight">
          An idea is a start. Let's make it visual.
        </h1>
        <p className="text-base sm:text-lg text-[#353535]/75 leading-relaxed font-light">
          Tell us about your brand, your upcoming shoot, or the edits you need. We will respond within 6-12 hours.
        </p>
      </div>

      {/* Main Grid: Form on Left, Direct Contact on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Form Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#353535]/10 shadow-xl">
          {submitted ? (
            <div className="text-center py-16 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#D8E2DC] text-[#2A4E36] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-3xl font-bold text-[#353535]">
                  INQUIRY SENT!
                </h3>
                <p className="text-base text-[#353535] max-w-md mx-auto font-medium">
                  Thanks! Your project inquiry has been sent successfully.
                </p>
                <p className="text-xs text-[#353535]/65 max-w-sm mx-auto font-light">
                  We have received your details and will get back to you shortly.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 rounded-full bg-[#353535] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-[#FFE5D9] border border-[#F8C4B4] text-[#8C3A2D] text-xs font-medium flex items-center gap-2">
                  <span>{errorMessage}</span>
                </div>
              )}
              
              {/* Project Type Chips */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-[#353535]/70 uppercase">
                  PROJECT TYPE
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Brand Video',
                    'Event Video',
                    'Wedding Videos',
                    'Product Videos',
                    'Fashion Videos',
                    'Promotional Videos',
                    'Reels',
                    'Live Events'
                  ].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setProjectType(type)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                        projectType === type
                          ? 'bg-[#353535] text-white font-bold shadow-xs'
                          : 'bg-[#FAF9F6] border border-[#353535]/10 text-[#353535]/75 hover:bg-[#ECE4DB]/40'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#353535]/70 uppercase">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#353535]/10 text-sm text-[#353535] focus:outline-hidden focus:border-[#353535]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#353535]/70 uppercase">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#353535]/10 text-sm text-[#353535] focus:outline-hidden focus:border-[#353535]"
                  />
                </div>
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#353535]/70 uppercase">
                    BUDGET ESTIMATE (INR)
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#353535]/10 text-sm text-[#353535] focus:outline-hidden focus:border-[#353535]"
                  >
                    <option>Under ₹5,000</option>
                    <option>₹5,000 - ₹10,000</option>
                    <option>₹10,000 - ₹25,000</option>
                    <option>₹25,000+</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#353535]/70 uppercase">
                    TIMELINE
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#353535]/10 text-sm text-[#353535] focus:outline-hidden focus:border-[#353535]"
                  >
                    <option>Urgent (Within 1-2 Weeks)</option>
                    <option>Within 1 Month</option>
                    <option>Next Quarter</option>
                    <option>Flexible / Planning</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#353535]/70 uppercase">
                  PROJECT BRIEF & LINKS
                </label>
                <textarea
                  rows={4}
                  placeholder="Share a short brief, target audience, moodboard links, or any questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#353535]/10 text-sm text-[#353535] focus:outline-hidden focus:border-[#353535]"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#353535] text-white font-semibold text-sm hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#FFE5D9]" />
                    <span>Submit Project Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Information & Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct Email Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#353535]/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#353535]/60">
              <Mail className="w-4 h-4 text-[#353535]" />
              <span>DIRECT INBOX</span>
            </div>
            <div>
              <div className="font-serif font-bold text-xl text-[#353535] mb-1">
                {siteConfig.email}
              </div>
              <p className="text-xs text-[#353535]/75 font-light">
                For project enquiries, collaborations, or sharing your vision.
              </p>
            </div>

            <button
              onClick={handleCopyEmail}
              className="w-full py-2.5 rounded-xl bg-[#FAF9F6] border border-[#353535]/10 text-xs font-mono text-[#353535] hover:bg-[#ECE4DB]/40 transition-colors flex items-center justify-center gap-2"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#353535]/60" />
                  <span>Click to Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Direct WhatsApp Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#353535]/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#353535]/60">
              <MessageSquare className="w-4 h-4 text-[#2A4E36]" />
              <span>INSTANT MESSAGING & WHATSAPP</span>
            </div>
            <div>
              <div className="font-serif font-bold text-xl text-[#353535] mb-1">
                Say Hi👋
              </div>
              <p className="text-xs text-[#353535]/75 font-light">
                Fastest response for urgent production calls & timeline checks.
              </p>
            </div>

            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#2A4E36] text-white text-xs font-semibold hover:bg-[#1f3b28] transition-colors flex items-center justify-center gap-2"
            >
              <span>Chat on WhatsApp </span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Studio Specs */}
          <div className="p-6 rounded-3xl bg-[#FAF9F6] border border-[#353535]/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#353535]">
              <MapPin className="w-4 h-4 text-[#353535]/60" />
              <span>Nithi Visual: Erode</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#353535]">
              <Clock className="w-4 h-4 text-[#353535]/60" />
              <span>Response Time: Typically within 6h</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
