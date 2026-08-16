import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ProjectModal } from './components/ProjectModal';
import { BookingModal } from './components/BookingModal';
import { ShowreelModal } from './components/ShowreelModal';

import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { Project } from './types';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#353535] relative selection:bg-[#FFE5D9] selection:text-[#353535]">
        
        {/* Custom Desktop Follower Cursor */}
        <CustomCursor />

        {/* Global Navbar */}
        <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Main Content Pages */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onSelectProject={(project) => setSelectedProject(project)}
                  onOpenBooking={() => setIsBookingOpen(true)}
                  onPlayShowreel={() => setIsShowreelOpen(true)}
                />
              }
            />

            <Route
              path="/portfolio"
              element={
                <PortfolioPage
                  onSelectProject={(project) => setSelectedProject(project)}
                />
              }
            />

            <Route
              path="/portfolio/:slug"
              element={
                <ProjectDetailPage
                  onOpenBooking={() => setIsBookingOpen(true)}
                />
              }
            />

            <Route
              path="/services"
              element={
                <ServicesPage
                  onOpenBooking={() => setIsBookingOpen(true)}
                />
              }
            />

            <Route
              path="/about"
              element={
                <AboutPage
                  onOpenBooking={() => setIsBookingOpen(true)}
                />
              }
            />

            <Route
              path="/contact"
              element={<ContactPage />}
            />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Instant Project Quick Preview Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* Project Booking & Inquiry Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />

        {/* Showreel Fullscreen Video Modal */}
        <ShowreelModal
          isOpen={isShowreelOpen}
          onClose={() => setIsShowreelOpen(false)}
        />

      </div>
    </BrowserRouter>
  );
}
