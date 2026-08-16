import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Play, CheckCircle2, Sparkles, SlidersHorizontal, Eye, Clock, Layers } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { ColorGradeSlider } from '../components/ColorGradeSlider';

interface ProjectDetailPageProps {
  onOpenBooking: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ onOpenBooking }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[currentIndex];

  if (!project) {
    return (
      <div className="pt-36 pb-24 px-4 text-center max-w-lg mx-auto space-y-4 bg-[#FAF9F6] text-[#353535]">
        <h2 className="font-serif text-3xl font-bold text-[#353535]">Project Not Found</h2>
        <p className="text-sm text-[#353535]/70">The requested visual project does not exist or has moved.</p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#353535] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 bg-[#FAF9F6] text-[#353535]">
      
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/portfolio"
          id="back-to-portfolio-link"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#353535]/70 hover:text-[#353535] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ALL PROJECTS</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white border border-[#353535]/15 text-[#353535]">
            {project.category}
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#353535] text-white">
            {project.year}
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-4 max-w-4xl">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#353535] tracking-tight">
          {project.title}
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#353535]/75 font-light">
          {project.subtitle}
        </p>
      </div>

      {/* Hero Media Player */}
      <div className="relative rounded-3xl overflow-hidden bg-[#18181B] border border-[#353535]/10 shadow-2xl aspect-video">
        {project.videoUrl ? (
          project.videoUrl.includes('drive.google.com') ? (
            <iframe
              src={project.videoUrl}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <video
              src={project.videoUrl}
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          )
        ) : (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Project Metadata Specs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-white border border-[#353535]/10 shadow-xs">
        <div>
          <div className="text-[11px] font-mono text-[#353535]/60 uppercase">CATEGORY</div>
          <div className="font-serif font-bold text-sm sm:text-base text-[#353535] mt-0.5">{project.category}</div>
        </div>
        <div>
          <div className="text-[11px] font-mono text-[#353535]/60 uppercase">SUBCATEGORY</div>
          <div className="font-serif font-bold text-sm sm:text-base text-[#353535] mt-0.5">{project.subcategory || 'Main Feature'}</div>
        </div>
        <div>
          <div className="text-[11px] font-mono text-[#353535]/60 uppercase">SOURCE FORMAT</div>
          <div className="font-serif font-bold text-sm sm:text-base text-[#353535] mt-0.5">Original .MOV File</div>
        </div>
        <div>
          <div className="text-[11px] font-mono text-[#353535]/60 uppercase">DELIVERY FORMAT</div>
          <div className="font-serif font-bold text-sm sm:text-base text-[#353535] mt-0.5">4K DCI • Uncompressed</div>
        </div>
      </div>

      {/* Metrics Row (if available) */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.metrics.map((metric, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-[#353535]/10 text-center space-y-1">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#353535]">{metric.value}</div>
              <div className="text-xs font-mono text-[#353535]/60 uppercase">{metric.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Story, Challenge & Solution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Columns: Story Breakdown */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-bold text-[#353535]">
              OVERVIEW & PRODUCTION
            </h3>
            <p className="text-base text-[#353535]/80 leading-relaxed font-light">
              {project.summary || `Authentic cinematic footage capturing ${project.title} for ${project.category}${project.subcategory ? ` (${project.subcategory})` : ''}. Delivered in original high-resolution master quality.`}
            </p>
          </div>

          {(project.challenge || project.solution) && (
            <div className="space-y-4">
              {project.challenge && (
                <div className="p-6 rounded-3xl bg-white border border-[#353535]/10 space-y-2">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#8C3A2D]">
                    THE CHALLENGE
                  </h4>
                  <p className="text-sm text-[#353535] leading-relaxed font-light">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-6 rounded-3xl bg-white border border-[#353535]/10 space-y-2">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#2A4E36]">
                    THE EXECUTION & SOLUTION
                  </h4>
                  <p className="text-sm text-[#353535] leading-relaxed font-light">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right 5 Columns: Deliverables & Camera Kit */}
        <div className="lg:col-span-5 space-y-6">
          {project.deliverables && project.deliverables.length > 0 && (
            <div className="p-6 rounded-3xl bg-white border border-[#353535]/10 space-y-4">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#353535]/60">
                DELIVERED ASSETS
              </h4>
              <div className="space-y-2.5">
                {project.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#353535]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.toolsUsed && project.toolsUsed.length > 0 && (
            <div className="p-6 rounded-3xl bg-white border border-[#353535]/10 space-y-4">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#353535]/60">
                PRODUCTION & COLOR SUITE GEAR
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.toolsUsed.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#353535]/10 text-xs font-mono text-[#353535]/80">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Inquiry Box */}
          <div className="p-6 rounded-3xl bg-[#FFE5D9] border border-[#F8C4B4] space-y-3 text-[#353535]">
            <h4 className="font-serif font-bold text-base text-[#353535]">
              Need a similar visual campaign?
            </h4>
            <p className="text-xs text-[#353535]/80 font-light">
              Let's craft a bespoke storyboard and visual direction tailored to your brand goals.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-3 rounded-2xl bg-[#353535] text-white text-xs font-semibold hover:opacity-90 transition-all shadow-xs"
            >
              Inquire Project Timeline
            </button>
          </div>
        </div>

      </div>

      {/* Optional Color Grade Slider if before/after images exist */}
      {project.beforeGradingImage && project.afterGradingImage && (
        <div className="pt-6">
          <ColorGradeSlider
            beforeImage={project.beforeGradingImage}
            afterImage={project.afterGradingImage}
            title={`${project.title} — COLOR GRADE`}
            client={project.client}
          />
        </div>
      )}

      {/* Visual Stills Gallery */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#353535]/10 text-xs font-mono text-[#353535]/70">
              <Sparkles className="w-3.5 h-3.5 text-[#353535]" />
              <span>PROJECT FRAMES & STILLS</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#353535]">
              BEHIND THE FRAMES.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.galleryImages.map((img, idx) => (
              <div key={idx} className="rounded-3xl overflow-hidden bg-white border border-[#353535]/10 shadow-xs aspect-[16/11]">
                <img
                  src={img}
                  alt={`${project.title} frame ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next & Previous Project Navigation */}
      <div className="pt-12 border-t border-[#353535]/10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to={`/portfolio/${prevProject.slug}`}
          id="prev-project-link"
          className="p-6 rounded-3xl bg-white border border-[#353535]/10 hover:border-[#353535]/40 transition-colors flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-mono text-[#353535]/60">← PREVIOUS PROJECT</span>
            <h4 className="font-serif font-bold text-lg text-[#353535] group-hover:opacity-75 transition-opacity">
              {prevProject.title}
            </h4>
          </div>
          <span className="text-xs font-mono text-[#353535]/60">{prevProject.category}</span>
        </Link>

        <Link
          to={`/portfolio/${nextProject.slug}`}
          id="next-project-link"
          className="p-6 rounded-3xl bg-white border border-[#353535]/10 hover:border-[#353535]/40 transition-colors flex items-center justify-between group text-right"
        >
          <span className="text-xs font-mono text-[#353535]/60">{nextProject.category}</span>
          <div>
            <span className="text-xs font-mono text-[#353535]/60">NEXT PROJECT →</span>
            <h4 className="font-serif font-bold text-lg text-[#353535] group-hover:opacity-75 transition-opacity">
              {nextProject.title}
            </h4>
          </div>
        </Link>
      </div>

    </div>
  );
};
