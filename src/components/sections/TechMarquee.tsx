import React from 'react';

interface TechItem {
  name: string;
  category: string;
  color: string;
  iconBg: string;
  svg: React.ReactNode;
}

export const TechMarquee: React.FC = () => {
  const techStack: TechItem[] = [
    {
      name: 'JavaScript (ES6+)',
      category: 'Language / Runtime',
      color: '#f7df1e',
      iconBg: 'rgba(247, 223, 30, 0.1)',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#f7df1e]">
          <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.82-.664-1.504-2.062-2.081-.617-.262-1.207-.502-1.564-.81-.229-.204-.326-.453-.326-.744 0-.395.27-.723.754-.875.479-.15 1.059-.09 1.482.164.281.168.48.455.57.818l1.734-.732c-.223-.746-.719-1.346-1.428-1.701-.689-.348-1.551-.432-2.404-.264-1.025.203-1.84.814-2.129 1.631-.176.502-.152 1.156.168 1.65.373.578.988.947 1.764 1.287.727.318 1.344.57 1.643.869.256.254.348.566.307.947-.074.697-.66 1.127-1.574 1.152-.693.02-1.332-.236-1.758-.699-.301-.328-.48-.779-.541-1.334l-1.789.471c.148 1.006.598 1.838 1.303 2.373.834.633 1.947.818 3.018.664.996-.145 1.861-.646 2.338-1.375.438-.668.514-1.52.207-2.315zm-6.721-5.467h-2.102v7.197c0 1.088-.418 1.631-1.252 1.631-.479 0-.9-.168-1.191-.482-.24-.26-.379-.627-.414-1.088l-1.826.311c.109 1.033.535 1.838 1.258 2.348.736.52 1.688.662 2.656.402.936-.252 1.637-.84 1.977-1.66.195-.473.297-1.082.297-1.787l-.003-6.872h.6z" />
        </svg>
      ),
    },
    {
      name: 'Python',
      category: 'Core Scientific Language',
      color: '#3776ab',
      iconBg: 'rgba(55, 118, 171, 0.15)',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#38bdf8]">
          <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.75h5.813v.825H3.903S0 5.768 0 11.9c0 6.137 3.404 5.92 3.404 5.92h2.035v-2.858s-.11-3.405 3.348-3.405h5.753s3.24.053 3.24-3.133V2.656S18.232 0 11.914 0zm-3.23 1.777a1.045 1.045 0 1 1 0 2.09 1.045 1.045 0 0 1 0-2.09zm3.398 22.223c6.094 0 5.715-2.656 5.715-2.656l-.006-2.75h-5.813v-.825h8.117s3.903.463 3.903-5.669c0-6.136-3.404-5.92-3.404-5.92h-2.035v2.858s.11 3.405-3.348 3.405H8.396s-3.24-.053-3.24 3.133v5.768s-.454 2.656 5.864 2.656zm3.23-1.777a1.045 1.045 0 1 1 0-2.09 1.045 1.045 0 0 1 0 2.09z" />
        </svg>
      ),
    },
    {
      name: 'PyTorch',
      category: 'Deep Learning Engine',
      color: '#ee4c2c',
      iconBg: 'rgba(238, 76, 44, 0.15)',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#f97316]">
          <path d="M12.784 0a11.97 11.97 0 0 0-3.66.568c-.642.2-1.077.78-1.077 1.451v7.697a.75.75 0 0 0 .75.75h7.697c.671 0 1.251-.435 1.451-1.077A12.022 12.022 0 0 0 12.784 0zm-1.583 12.066H3.504c-.671 0-1.251.435-1.451 1.077a12.02 12.02 0 0 0 9.398 10.789c.642.115 1.25-.333 1.25-.986v-9.38a1.5 1.5 0 0 0-1.5-1.5z" />
        </svg>
      ),
    },
    {
      name: 'Anaconda',
      category: 'Scientific Environment',
      color: '#43b02a',
      iconBg: 'rgba(67, 176, 42, 0.15)',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#4ade80]">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="14 5" />
          <circle cx="12" cy="12" r="4" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'Git & GitHub',
      category: 'Version Control & CI/CD',
      color: '#f05032',
      iconBg: 'rgba(240, 80, 50, 0.15)',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#fb7185]">
          <path d="M2.6 10.59L8.38 4.8a2.53 2.53 0 0 1 3.58 0l1.24 1.24L10.9 8.35a1.86 1.86 0 0 0-.46 2.37l-2.07 2.07a1.86 1.86 0 0 0-2.37.46l-3.4-3.4a2.54 2.54 0 0 1 0-3.58v.32zm18.8 2.82L15.62 19.2a2.53 2.53 0 0 1-3.58 0l-1.24-1.24 2.3-2.31a1.86 1.86 0 0 0 .46-2.37l2.07-2.07a1.86 1.86 0 0 0 2.37-.46l3.4 3.4a2.54 2.54 0 0 1 0 3.58v-.32z" />
        </svg>
      ),
    },
    {
      name: 'PostgreSQL',
      category: 'Relational Database',
      color: '#336791',
      iconBg: 'rgba(51, 103, 145, 0.15)',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#38bdf8]">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93c-2.38.16-4.3-1.57-4.48-3.95H7v-1.96h1.52c.18-2.38 2.1-4.11 4.48-3.95 1.55.1 2.87.97 3.58 2.22l-1.63 1.09c-.43-.75-1.22-1.28-2.12-1.34-1.31-.09-2.42.86-2.52 2.17h5.17v1.54H9.83c.1 1.31 1.21 2.26 2.52 2.17.9-.06 1.69-.59 2.12-1.34l1.63 1.09c-.71 1.25-2.03 2.12-3.58 2.22l.48.04z" />
        </svg>
      ),
    },
    {
      name: 'Laragon',
      category: 'Fast Web Server Env',
      color: '#00bcd4',
      iconBg: 'rgba(0, 188, 212, 0.15)',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current text-[#22d3ee] stroke-2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <circle cx="6" cy="8" r="1" fill="currentColor" />
          <circle cx="10" cy="8" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'MongoDB',
      category: 'Document NoSQL Store',
      color: '#47a248',
      iconBg: 'rgba(71, 162, 72, 0.15)',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#4ade80]">
          <path d="M12.001 0c-.394 0-.756.208-.949.544C10.428 1.642 6.5 8.793 6.5 14.184 6.5 19.349 9.176 24 12.001 24s5.5-4.651 5.5-9.816c0-5.391-3.928-12.542-4.552-13.64A1.106 1.106 0 0 0 12.001 0zm.014 2.535c1.884 3.037 4.285 7.697 4.285 11.649 0 3.738-1.895 7.416-4.299 8.566V2.535z" />
        </svg>
      ),
    },
    {
      name: 'RESTful API & JSON',
      category: 'Architecture & Protocol',
      color: '#06b6d4',
      iconBg: 'rgba(6, 182, 212, 0.15)',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current text-[#06b6d4] stroke-2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      ),
    },
    {
      name: 'MySQL',
      category: 'Relational Database',
      color: '#00758f',
      iconBg: 'rgba(0, 117, 143, 0.15)',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current text-[#38bdf8] stroke-2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
    {
      name: 'React 19 & TypeScript',
      category: 'Modern Web Architecture',
      color: '#61dafb',
      iconBg: 'rgba(97, 218, 251, 0.15)',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#67e8f9]">
          <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="1.8" />
        </svg>
      ),
    },
    {
      name: 'Linux & Terminal CLI',
      category: 'Server / Deployment',
      color: '#f59e0b',
      iconBg: 'rgba(245, 158, 11, 0.15)',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current text-[#fbbf24] stroke-2">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      ),
    },
  ];

  // Duplicate for seamless infinite loop
  const doubleList = [...techStack, ...techStack];

  return (
    <section className="relative py-10 overflow-hidden border-y border-white/5 bg-bg-deep/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-400 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-cyan-primary animate-pulse" />
          <span>Active Engineering & Research Toolchain</span>
        </div>
        <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
          Hover to pause ticker
        </span>
      </div>

      {/* Marquee Container with Gradient Edge Fades */}
      <div className="relative w-full overflow-hidden marquee-container group">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />

        {/* Animated Scrolling Track */}
        <div className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {doubleList.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-bg-surface/90 border border-white/10 hover:border-cyan-primary/50 shadow-sm hover:shadow-cyan-primary/20 transition-all hover:-translate-y-0.5 cursor-default select-none shrink-0"
            >
              <div
                className="p-2 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: item.iconBg }}
              >
                {item.svg}
              </div>
              <div className="space-y-0.5 pr-2">
                <div className="text-xs font-bold text-slate-100 whitespace-nowrap">
                  {item.name}
                </div>
                <div className="font-mono text-[10px] text-slate-400 whitespace-nowrap">
                  {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
