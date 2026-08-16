import React from 'react';
import { InteractiveHero } from '../components/InteractiveHero';
import { SelectedWorkGrid } from '../components/SelectedWorkGrid';
import { InteractiveServices } from '../components/InteractiveServices';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { AboutPreview } from '../components/AboutPreview';
import { Project } from '../types';

interface HomePageProps {
  onSelectProject: (project: Project) => void;
  onOpenBooking: () => void;
  onPlayShowreel: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProject,
  onOpenBooking,
  onPlayShowreel
}) => {
  return (
    <div className="space-y-0">
      {/* 1. Hero */}
      <InteractiveHero
        onPlayShowreel={onPlayShowreel}
        onOpenBooking={onOpenBooking}
      />

      {/* 2. Selected Work */}
      <SelectedWorkGrid
        onSelectProject={onSelectProject}
        limit={6}
        showFilters={true}
      />

      {/* 3. Capabilities / Services */}
      <InteractiveServices onOpenBooking={onOpenBooking} />

      {/* 4. Process & Workflow */}
      <ProcessTimeline />

      {/* 5. Human Story Behind the Studio */}
      <AboutPreview />
    </div>
  );
};
