import React from 'react';

interface ToolChainItem {
  name: string;
  image: string;
  url: string;
}

export const TechMarquee: React.FC = () => {
  const toolChain: ToolChainItem[] = [
    {
      name: 'JavaScript (ES6+)',
      image: './assets/ToolChain/JS%20ES6.png',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      name: 'Python',
      image: './assets/ToolChain/Python.png',
      url: 'https://www.python.org/',
    },
    {
      name: 'PyTorch',
      image: './assets/ToolChain/Pytorch.png',
      url: 'https://pytorch.org/',
    },
    {
      name: 'Anaconda',
      image: './assets/ToolChain/Anaconda.png',
      url: 'https://www.anaconda.com/',
    },
    {
      name: 'Git',
      image: './assets/ToolChain/Git.png',
      url: 'https://git-scm.com/',
    },
    {
      name: 'PostgreSQL',
      image: './assets/ToolChain/PostgreSQL.png',
      url: 'https://www.postgresql.org/',
    },
    {
      name: 'Laragon',
      image: './assets/ToolChain/Laragon.png',
      url: 'https://laragon.org/',
    },
    {
      name: 'MongoDB',
      image: './assets/ToolChain/MongoDB.png',
      url: 'https://www.mongodb.com/',
    },
    {
      name: 'React',
      image: './assets/ToolChain/React.png',
      url: 'https://react.dev/',
    },
    {
      name: 'Docker',
      image: './assets/ToolChain/Docker.png',
      url: 'https://www.docker.com/',
    },
  ];

  // Duplicate for seamless infinite loop
  const doubleList = [...toolChain, ...toolChain];

  return (
    <section className="relative py-8 sm:py-12 overflow-hidden border-y border-white/5 bg-bg-deep/40 backdrop-blur-sm">
      {/* Marquee Container with Gradient Edge Fades */}
      <div className="relative w-full overflow-hidden marquee-container group">
        {/* Left Gradient Edge Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Edge Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />

        {/* Animated Scrolling Track */}
        <div className="flex items-center gap-10 sm:gap-16 md:gap-20 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {doubleList.map((item, index) => (
            <a
              key={`${item.name}-${index}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${item.name} — Visit Official Site`}
              className="flex items-center justify-center p-2 transition-all duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_25px_rgba(6,182,212,0.65)] cursor-pointer select-none shrink-0 opacity-85 hover:opacity-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-md"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
