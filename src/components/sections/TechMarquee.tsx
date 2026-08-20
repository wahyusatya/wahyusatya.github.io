import React from 'react';

interface ToolChainItem {
  name: string;
  category: string;
  image: string;
}

export const TechMarquee: React.FC = () => {
  const toolChain: ToolChainItem[] = [
    {
      name: 'JavaScript (ES6+)',
      category: 'Language / Runtime',
      image: './assets/ToolChain/JS%20ES6.png',
    },
    {
      name: 'Python',
      category: 'Core Scientific Language',
      image: './assets/ToolChain/Python.png',
    },
    {
      name: 'PyTorch',
      category: 'Deep Learning Framework',
      image: './assets/ToolChain/Pytorch.png',
    },
    {
      name: 'Anaconda',
      category: 'Scientific Environment',
      image: './assets/ToolChain/Anaconda.png',
    },
    {
      name: 'Git',
      category: 'Version Control & Workflow',
      image: './assets/ToolChain/Git.png',
    },
    {
      name: 'PostgreSQL',
      category: 'Relational Database (SQL)',
      image: './assets/ToolChain/PostgreSQL.png',
    },
    {
      name: 'Laragon',
      category: 'Local Web Server Environment',
      image: './assets/ToolChain/Laragon.png',
    },
    {
      name: 'MongoDB',
      category: 'Document NoSQL Store',
      image: './assets/ToolChain/MongoDB.png',
    },
    {
      name: 'React',
      category: 'Modern Web Architecture',
      image: './assets/ToolChain/React.png',
    },
    {
      name: 'Docker',
      category: 'Containerization & DevOps',
      image: './assets/ToolChain/Docker.png',
    },
  ];

  // Duplicate for seamless infinite loop
  const doubleList = [...toolChain, ...toolChain];

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
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />

        {/* Animated Scrolling Track */}
        <div className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {doubleList.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-bg-surface/90 border border-white/10 hover:border-cyan-primary/50 shadow-sm hover:shadow-cyan-primary/20 transition-all hover:-translate-y-0.5 cursor-default select-none shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 p-1.5 rounded-xl bg-bg-deep/90 border border-white/5 flex items-center justify-center shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="space-y-0.5 pr-2">
                <div className="text-xs sm:text-sm font-bold text-slate-100 whitespace-nowrap">
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
