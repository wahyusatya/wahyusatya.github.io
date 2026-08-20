import React, { useState, useEffect } from 'react';
import { Menu, X, Command, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ui/ThemeContext';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['about', 'work', 'research', 'lab', 'timeline', 'contact'];
      const scrollPos = window.scrollY + 160;

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
    { id: 'work', label: 'Work' },
    { id: 'research', label: 'Research' },
    { id: 'lab', label: 'Lab' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 left-0 right-0 h-16 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-bg-dark/90 backdrop-blur-md border-b border-hairline'
          : 'bg-bg-dark/60 border-b border-hairline/40'
      }`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
        {/* Brand: ASH */}
        <a
          href="#"
          className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-accent-primary rounded"
          aria-label="Ash Home"
        >
          <span className="font-mono font-bold text-sm tracking-tight text-slate-text group-hover:text-accent-primary transition-colors">
            ASH
          </span>
        </a>

        {/* Right Navigation & Tools */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-xs font-mono tracking-wide transition-colors ${
                  activeSection === link.id
                    ? 'text-slate-text font-semibold'
                    : 'text-slate-muted hover:text-slate-text'
                }`}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded bg-bg-surface hover:bg-bg-elevated border border-hairline hover:border-subtle text-slate-muted hover:text-slate-text transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Color Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-slate-muted hover:text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-muted hover:text-indigo-400" />
            )}
          </button>

          {/* Command Palette Trigger (Ctrl/Cmd + K) */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-bg-surface hover:bg-bg-elevated border border-hairline hover:border-subtle text-xs font-mono text-slate-muted hover:text-slate-text transition-all cursor-pointer"
            title="Open Command Palette (Ctrl+K / Cmd+K)"
            aria-label="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-slate-dim" />
            <span className="hidden sm:inline text-[11px] text-slate-dim">Search</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bg-ground border border-hairline text-slate-dim">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded bg-bg-surface border border-hairline text-slate-muted hover:text-slate-text"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-bg-dark border-b border-hairline p-6 space-y-3 shadow-2xl">
          <nav className="space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-xs font-mono transition-colors ${
                  activeSection === link.id
                    ? 'text-accent-primary font-semibold'
                    : 'text-slate-muted hover:text-slate-text'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
