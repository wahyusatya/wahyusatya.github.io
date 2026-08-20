import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-bg-dark border-t border-hairline py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-hairline/60">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-slate-text">
                WAHYU SATYA
              </span>
              <span className="font-mono text-xs text-slate-dim">
                / RESEARCH LAB & SYSTEMS
              </span>
            </div>
            <p className="text-xs text-slate-muted max-w-sm leading-relaxed">
              Synthesizing 1D-ViT biosignal research, statistical data science, and high-performance interactive web engineering.
            </p>
            <div className="font-mono text-[11px] text-slate-dim pt-1">
              Singaraja, Bali, Indonesia • Universitas Pendidikan Ganesha
            </div>
          </div>

          {/* Nav Jumps */}
          <div className="space-y-3 font-mono text-xs">
            <div className="text-slate-text uppercase tracking-wider text-[11px]">
              Index
            </div>
            <ul className="space-y-1.5 text-slate-muted">
              <li><a href="#about" className="hover:text-slate-text transition-colors">01 / About & Focus</a></li>
              <li><a href="#work" className="hover:text-slate-text transition-colors">02 / Selected Work</a></li>
              <li><a href="#research" className="hover:text-slate-text transition-colors">03 / ECG 1D-ViT Research</a></li>
              <li><a href="#lab" className="hover:text-slate-text transition-colors">04 / Signal Playground</a></li>
              <li><a href="#stack" className="hover:text-slate-text transition-colors">05 / Technical Stack</a></li>
              <li><a href="#timeline" className="hover:text-slate-text transition-colors">06 / Evolution & Timeline</a></li>
            </ul>
          </div>

          {/* Socials & Verified Links */}
          <div className="space-y-3 font-mono text-xs">
            <div className="text-slate-text uppercase tracking-wider text-[11px]">
              Connect
            </div>
            <div className="space-y-2">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-muted hover:text-slate-text transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-muted hover:text-slate-text transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="flex items-center gap-2 text-slate-muted hover:text-slate-text transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Direct Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-dim font-mono">
          <p>© {new Date().getFullYear()} Putu Wahyu Satya Giridharma. Static Frontend Architecture (React 19, TypeScript, Tailwind).</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-muted hover:text-slate-text transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
