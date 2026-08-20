import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const [timeString, setTimeString] = useState('--:--:--');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Makassar',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      setTimeString(`${now.toLocaleTimeString('en-US', options)} WITA`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-bg-deep border-t border-white/10 pt-16 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-cyan-glow bg-cyan-primary/10 border border-cyan-primary/30 px-2 py-1 rounded-md">
                &lt;WS /&gt;
              </span>
              <span className="font-bold text-slate-100 text-lg">
                {PORTFOLIO_DATA.personal.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Bridging the gap between computational deep learning research and modern high-performance web architecture.
            </p>
            <div className="font-mono text-xs text-cyan-glow flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-primary animate-pulse" />
              <span>Singaraja, Bali (UTC+8) • {timeString}</span>
            </div>
          </div>

          {/* Nav Jumps */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-slate-200 tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#about" className="hover:text-cyan-glow transition-colors">About Overview</a></li>
              <li><a href="#lab" className="hover:text-cyan-glow transition-colors">Neural Lab Sandbox</a></li>
              <li><a href="#skills" className="hover:text-cyan-glow transition-colors">Skills Matrix</a></li>
              <li><a href="#projects" className="hover:text-cyan-glow transition-colors">Research Projects</a></li>
              <li><a href="#certifications" className="hover:text-cyan-glow transition-colors">Certifications</a></li>
            </ul>
          </div>

          {/* Socials & Verified Links */}
          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-slate-200 tracking-wider mb-3">
              Verified Links
            </h4>
            <div className="space-y-2.5">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Workspace</span>
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Network</span>
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Direct Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Wahyu Satya. React 19 • Three.js • Vite • Tailwind.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-glow transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
