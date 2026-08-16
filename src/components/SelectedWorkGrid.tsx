import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  ArrowRight, 
  ArrowDown, 
  Briefcase, 
  Calendar, 
  Sparkles, 
  Radio, 
  Landmark, 
  Heart 
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { projectsData } from '../data/projectsData';

import businessBrandsImg from '../assets/images/business-brands.png';
import eventsImg from '../assets/images/events.png';
import fashionModelImg from '../assets/images/fashion-model.png';
import liveEventEditsImg from '../assets/images/live-event-edits.png';
import politicalEventImg from '../assets/images/political-event.png';
import weddingIndustryImg from '../assets/images/wedding-industry.png';

interface SelectedWorkGridProps {
  onSelectProject: (project: Project) => void;
  limit?: number;
  showFilters?: boolean;
}

interface CategoryInfo {
  number: string;
  name: Exclude<ProjectCategory, 'All'>;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  pastelImage: string;
  pastelBg: string;
  pastelAccent: string;
  textColor: string;
  hasSubcategories: boolean;
  subcategories?: string[];
}

const MAIN_PORTFOLIO_CATEGORIES: CategoryInfo[] = [
  {
    number: '01',
    name: 'Business & Brands',
    title: 'BUSINESS & BRANDS',
    description: 'Commercial brand films, automotive showcases, catering stories, and spatial decor productions.',
    icon: Briefcase,
    pastelImage: businessBrandsImg,
    pastelBg: 'bg-[#FAF3EB]',
    pastelAccent: 'border-[#F2D7C2]/70',
    textColor: 'text-[#8C4E2D]',
    hasSubcategories: true,
    subcategories: ['Car Delivery', 'Catering', 'Decor']
  },
  {
    number: '02',
    name: 'Events',
    title: 'EVENTS',
    description: 'Curated milestone gatherings, spiritual temple rituals, and family celebrations captured with warmth.',
    icon: Calendar,
    pastelImage: eventsImg,
    pastelBg: 'bg-[#FBF8EC]',
    pastelAccent: 'border-[#EFE1A9]/70',
    textColor: 'text-[#7D6614]',
    hasSubcategories: true,
    subcategories: ['Birthday', 'Temple', 'Puberty']
  },
  {
    number: '03',
    name: 'Fashion & Model',
    title: 'FASHION & MODEL',
    description: 'High-concept editorial styling, model lookbooks, and fashion aesthetics with rhythmic pacing.',
    icon: Sparkles,
    pastelImage: fashionModelImg,
    pastelBg: 'bg-[#F6F2FA]',
    pastelAccent: 'border-[#DFD4EC]/70',
    textColor: 'text-[#6B4B90]',
    hasSubcategories: false
  },
  {
    number: '04',
    name: 'Live Event Edits',
    title: 'LIVE EVENT EDITS',
    description: 'Fast same-day edits, celebratory inaugurations, and dynamic corporate event coverage.',
    icon: Radio,
    pastelImage: liveEventEditsImg,
    pastelBg: 'bg-[#F0F6F3]',
    pastelAccent: 'border-[#CFE4DA]/70',
    textColor: 'text-[#2E6854]',
    hasSubcategories: false
  },
  {
    number: '05',
    name: 'Political Event',
    title: 'POLITICAL EVENT',
    description: 'Dignified leadership conventions, public summits, and formal address coverage.',
    icon: Landmark,
    pastelImage: politicalEventImg,
    pastelBg: 'bg-[#F3F4F6]',
    pastelAccent: 'border-[#D9DDE2]/70',
    textColor: 'text-[#475569]',
    hasSubcategories: false
  },
  {
    number: '06',
    name: 'Wedding Industry',
    title: 'WEDDING INDUSTRY',
    description: 'Cinematic matrimony, pre-wedding memories, joyful haldi ceremonies, and engagement films.',
    icon: Heart,
    pastelImage: weddingIndustryImg,
    pastelBg: 'bg-[#FDF2F4]',
    pastelAccent: 'border-[#F8CCD3]/70',
    textColor: 'text-[#96374C]',
    hasSubcategories: true,
    subcategories: ['Engagement', 'Pre Wedding', 'Haldi', 'Wedding']
  }
];

export const SelectedWorkGrid: React.FC<SelectedWorkGridProps> = ({ onSelectProject }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const renderVideoCard = (project: Project, index: number) => {
    return (
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: index * 0.04 }}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(project);
        }}
        className="group/videocard rounded-xl border border-[#353535]/15 bg-white overflow-hidden hover:border-[#353535]/45 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between h-full shadow-2xs hover:shadow-xs"
      >
        {/* Video Thumbnail with Fixed Aspect Ratio */}
        <div className="relative w-full aspect-video bg-[#18181B] overflow-hidden shrink-0">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover/videocard:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80';
            }}
          />

          <div className="absolute inset-0 bg-black/20 group-hover/videocard:bg-black/35 transition-colors" />

          {/* Centered Play Indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/95 text-[#353535] flex items-center justify-center shadow-xs group-hover/videocard:scale-110 group-hover/videocard:bg-white transition-all duration-150">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
          </div>
        </div>

        {/* Card Title Bar (Equal Height Across All Cards) */}
        <div className="h-12 px-3.5 sm:px-4 bg-white flex items-center justify-between gap-2 border-t border-[#353535]/10 shrink-0">
          <div className="min-w-0 flex-1">
            <h5 className="font-serif text-xs sm:text-sm font-semibold text-[#353535] group-hover/videocard:text-black transition-colors truncate">
              {project.title}
            </h5>
          </div>
          <span className="text-[11px] font-mono text-[#353535]/50 group-hover/videocard:text-[#353535] shrink-0 font-medium">
            Play →
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="selected-work-section" className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] text-[#353535]">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#353535]/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#353535]/10 text-xs font-mono text-[#353535]/70">
              <Sparkles className="w-3.5 h-3.5 text-[#353535]" />
              <span>SELECTED WORKS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#353535] tracking-tight">
              A FEW THINGS WE'VE MADE.
            </h2>
            <p className="text-sm sm:text-base text-[#353535]/75 font-light leading-relaxed">
              Explore 16 cinematic productions categorized across commercial films, cultural celebrations, and editorial commissions.
            </p>
          </div>
        </div>

        {/* 6 Premium Category Boxes Grid (PERFECT 3x2 EQUAL DIMENSIONS & ALIGNMENT) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          {MAIN_PORTFOLIO_CATEGORIES.map((cat, index) => {
            const isExpanded = expandedCategory === cat.name;
            const categoryVideos = projectsData.filter((p) => p.category === cat.name);
            const IconComponent = cat.icon;

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`group rounded-2xl sm:rounded-3xl border bg-white transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between h-full ${
                  isExpanded
                    ? 'lg:col-span-3 md:col-span-2 border-[#353535]/40 shadow-md ring-1 ring-[#353535]/10'
                    : 'border-[#353535]/15 hover:border-[#353535]/40 hover:-translate-y-1 hover:shadow-sm'
                }`}
                onClick={() => toggleCategory(cat.name)}
                id={`cat-card-${cat.number}`}
              >
                {/* Main Card Content Container */}
                <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-between flex-1">
                  {isExpanded ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-center">
                      {/* Left Info Column */}
                      <div className="space-y-3.5 sm:space-y-4 flex flex-col justify-between">
                        {/* Top Bar: Number, Tag & Minimal Icon */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-xs sm:text-sm font-bold text-[#353535]/60 tracking-wider">
                              {cat.number}
                            </span>
                            <span className="text-[#353535]/20">/</span>
                            <span className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full ${cat.pastelBg} ${cat.textColor} border ${cat.pastelAccent}`}>
                              {categoryVideos.length} {categoryVideos.length === 1 ? 'Production' : 'Productions'}
                            </span>
                          </div>

                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${cat.pastelBg} ${cat.textColor} border ${cat.pastelAccent}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Editorial Category Title & Minimal Description */}
                        <div className="space-y-1.5">
                          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#353535]">
                            {cat.number} — {cat.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#353535]/70 font-light leading-relaxed">
                            {cat.description}
                          </p>
                        </div>

                        {/* Clean Bottom Area: Explore Indicator */}
                        <div className="pt-3.5 sm:pt-4 flex items-center justify-between border-t border-[#353535]/10 text-xs font-mono text-[#353535]/70">
                          <span className="font-medium tracking-wide">Hide Collection</span>
                          <div className="flex items-center gap-1 font-semibold text-xs text-[#353535]">
                            <span>Collapse</span>
                            <ArrowDown className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* Right Artwork Column with Consistent Aspect Frame */}
                      <div className="w-full aspect-[16/9.5] overflow-hidden rounded-xl sm:rounded-2xl border border-[#353535]/10 shadow-2xs">
                        <img
                          src={cat.pastelImage}
                          alt={cat.title}
                          className="w-full h-full object-cover object-center block"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Collapsed View (Uniform 3x2 Grid Card: Header -> Title -> Description -> Image -> Divider -> CTA) */
                    <div className="flex flex-col justify-between h-full space-y-3 sm:space-y-3.5">
                      {/* 1. Category Top Bar: Number, Tag & Minimal Icon */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs sm:text-sm font-bold text-[#353535]/60 tracking-wider">
                            {cat.number}
                          </span>
                          <span className="text-[#353535]/20">/</span>
                          <span className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full ${cat.pastelBg} ${cat.textColor} border ${cat.pastelAccent}`}>
                            {categoryVideos.length} {categoryVideos.length === 1 ? 'Production' : 'Productions'}
                          </span>
                        </div>

                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${cat.pastelBg} ${cat.textColor} border ${cat.pastelAccent} transition-transform group-hover:scale-105`}>
                          <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                      </div>

                      {/* 2 & 3. Category Title & Short Description (Above the image) */}
                      <div className="space-y-1">
                        <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#353535] group-hover:text-black transition-colors">
                          {cat.number} — {cat.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#353535]/70 font-light leading-relaxed line-clamp-2 min-h-[2.5rem]">
                          {cat.description}
                        </p>
                      </div>

                      {/* 4. Category Artwork Image (Immediately below description) */}
                      <div className="w-full aspect-[16/9.5] overflow-hidden rounded-xl sm:rounded-2xl border border-[#353535]/10 shadow-2xs">
                        <img
                          src={cat.pastelImage}
                          alt={cat.title}
                          className="w-full h-full object-cover object-center block transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>

                      {/* 5 & 6. Divider & Explore Collection / View CTA */}
                      <div className="pt-3 sm:pt-3.5 flex items-center justify-between border-t border-[#353535]/10 text-xs font-mono text-[#353535]/70 group-hover:text-[#353535] transition-colors mt-auto">
                        <span className="font-medium tracking-wide">Explore Collection</span>
                        <div className="flex items-center gap-1 font-semibold text-xs text-[#353535]">
                          <span>View</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Expanded Accordion Drawer with Projects (Equal Grid of Videos) */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`content-${cat.name}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden border-t border-[#353535]/10 bg-[#FAF9F6]/60 cursor-default"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-5 sm:p-7 md:p-8 space-y-6">
                        {/* Subcategorized Layout */}
                        {cat.hasSubcategories && cat.subcategories ? (
                          <div className="space-y-6">
                            {cat.subcategories.map((subName) => {
                              const subVideos = categoryVideos.filter(
                                (p) => p.subcategory?.toLowerCase() === subName.toLowerCase()
                              );

                              if (subVideos.length === 0) return null;

                              return (
                                <div key={subName} className="space-y-3">
                                  <div className="flex items-center gap-2 pb-1.5 border-b border-[#353535]/10">
                                    <span className="font-mono text-xs text-[#353535]/50 uppercase tracking-wider">
                                      Subcategory:
                                    </span>
                                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#353535]">
                                      {subName}
                                    </h4>
                                    <span className="text-[11px] font-mono text-[#353535]/40 ml-auto">
                                      {subVideos.length} {subVideos.length === 1 ? 'film' : 'films'}
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 items-stretch">
                                    {subVideos.map((video, idx) => renderVideoCard(video, idx))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          /* Direct Grid for Non-Subcategorized Categories */
                          <div className="space-y-3">
                            <div className="flex items-center justify-between pb-1.5 border-b border-[#353535]/10">
                              <span className="font-mono text-xs text-[#353535]/50 uppercase tracking-wider">
                                Featured Films
                              </span>
                              <span className="text-[11px] font-mono text-[#353535]/40">
                                {categoryVideos.length} {categoryVideos.length === 1 ? 'film' : 'films'}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 items-stretch">
                              {categoryVideos.map((video, idx) => renderVideoCard(video, idx))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
