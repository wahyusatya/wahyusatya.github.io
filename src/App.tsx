import React, { useState } from 'react';
import { ToastProvider } from './components/ui/ToastContext';
import { ThemeProvider } from './components/ui/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { TechMarquee } from './components/sections/TechMarquee';
import { AboutSection } from './components/sections/AboutSection';
import { ResearchProjectsSection } from './components/sections/ResearchProjectsSection';
import { ResearchSection } from './components/sections/ResearchSection';
import { SignalPlaygroundSection } from './components/sections/SignalPlaygroundSection';
import { SkillsMatrixSection } from './components/sections/SkillsMatrixSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';
import { CommandPalette } from './components/ui/CommandPalette';

export function App() {
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-bg-dark text-slate-text font-sans antialiased selection:bg-accent-primary/25 selection:text-white transition-colors duration-200">
          {/* Sticky Minimal Navbar */}
          <Navbar onOpenCommandPalette={() => setCmdOpen(true)} />

          {/* Main Content Stream */}
          <main role="main">
            <HeroSection />
            <TechMarquee />
            <AboutSection />
            <ResearchProjectsSection />
            <ResearchSection />
            <SignalPlaygroundSection />
            <SkillsMatrixSection />
            <CertificationsSection />
            <ExperienceSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Command Palette Modal (Ctrl+K / Cmd+K) */}
          <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
