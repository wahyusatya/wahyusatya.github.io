import React, { useState } from 'react';
import { ToastProvider } from './components/ui/ToastContext';
import { CursorGlow } from './components/ui/CursorGlow';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { NeuralLabSection } from './components/sections/NeuralLabSection';
import { SkillsMatrixSection } from './components/sections/SkillsMatrixSection';
import { ResearchProjectsSection } from './components/sections/ResearchProjectsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';
import { CommandPalette } from './components/ui/CommandPalette';

export function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="relative min-h-screen bg-bg-dark text-slate-100 font-sans selection:bg-cyan-primary/30 selection:text-white">
        {/* Ambient Cursor Glow Follower */}
        <CursorGlow />

        {/* Top Navbar */}
        <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <NeuralLabSection />
          <SkillsMatrixSection />
          <ResearchProjectsSection />
          <CertificationsSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Terminal HUD & Command Palette (Ctrl+K) */}
        <CommandPalette
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
        />
      </div>
    </ToastProvider>
  );
}

export default App;
