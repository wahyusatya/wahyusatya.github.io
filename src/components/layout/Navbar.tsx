import React, { useState, useEffect } from 'react';
import { Terminal, Download, Menu, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['profile', 'about', 'lab', 'skills', 'projects', 'certifications', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'lab', label: 'Lab Sandbox', badge: 'Interactive' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Research' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-18 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-dark/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#profile" className="flex items-center gap-2.5 group">
          <span className="font-mono text-xs text-cyan-glow bg-cyan-primary/10 border border-cyan-primary/30 px-2 py-1 rounded-md group-hover:border-cyan-primary transition-colors">
            &lt;WS /&gt;
          </span>
          <span className="font-bold text-slate-100 text-sm sm:text-base tracking-tight">
            Wahyu Satya
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-primary/10 border border-emerald-primary/30 text-[11px] font-mono text-emerald-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-primary animate-pulse" />
            Active
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSection === link.id
                  ? 'text-slate-100 bg-white/10 font-semibold'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-white/5'
              }`}
            >
              {link.badge && (
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-cyan-primary/20 text-cyan-glow mr-1 border border-cyan-primary/30">
                  {link.badge}
                </span>
              )}
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-surface hover:bg-bg-elevated border border-white/10 hover:border-cyan-primary/40 text-xs text-slate-300 hover:text-cyan-glow transition-all"
            title="Open Command Palette (Ctrl+K)"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-glow" />
            <span className="hidden sm:inline">Terminal</span>
            <kbd className="hidden sm:inline font-mono text-[10px] bg-bg-deep border border-white/10 text-cyan-glow px-1.5 py-0.5 rounded">
              Ctrl K
            </kbd>
          </button>

          <a
            href={PORTFOLIO_DATA.personal.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white text-xs font-semibold shadow-md shadow-cyan-primary/20 border border-white/15 transition-all hover:-translate-y-0.5"
          >
            <span>CV</span>
            <Download className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-bg-surface border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-18 bottom-0 bg-bg-dark/95 backdrop-blur-2xl p-6 flex flex-col justify-between border-b border-white/10 z-40">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-cyan-primary/10 border border-cyan-primary/30 text-cyan-glow'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10">
            <a
              href={PORTFOLIO_DATA.personal.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-cyan-primary/20"
            >
              <span>Download Official Curriculum Vitae</span>
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
