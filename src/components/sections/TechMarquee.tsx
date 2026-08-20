import React from 'react';
import jsIcon from '../../../public/assets/ToolChain/JS ES6.png';
import pythonIcon from '../../../public/assets/ToolChain/Python.png';
import pytorchIcon from '../../../public/assets/ToolChain/Pytorch.png';
import anacondaIcon from '../../../public/assets/ToolChain/Anaconda.png';
import gitIcon from '../../../public/assets/ToolChain/Git.png';
import postgresIcon from '../../../public/assets/ToolChain/PostgreSQL.png';
import laragonIcon from '../../../public/assets/ToolChain/Laragon.png';
import mongoIcon from '../../../public/assets/ToolChain/MongoDB.png';
import reactIcon from '../../../public/assets/ToolChain/React.png';
import dockerIcon from '../../../public/assets/ToolChain/Docker.png';

interface ToolChainItem {
  name: string;
  image: string;
  url: string;
}

export const TechMarquee: React.FC = () => {
  const toolChain: ToolChainItem[] = [
    {
      name: 'JavaScript (ES6+)',
      image: jsIcon,
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      name: 'Python',
      image: pythonIcon,
      url: 'https://www.python.org/',
    },
    {
      name: 'PyTorch',
      image: pytorchIcon,
      url: 'https://pytorch.org/',
    },
    {
      name: 'Anaconda',
      image: anacondaIcon,
      url: 'https://www.anaconda.com/',
    },
    {
      name: 'Git',
      image: gitIcon,
      url: 'https://git-scm.com/',
    },
    {
      name: 'PostgreSQL',
      image: postgresIcon,
      url: 'https://www.postgresql.org/',
    },
    {
      name: 'Laragon',
      image: laragonIcon,
      url: 'https://laragon.org/',
    },
    {
      name: 'MongoDB',
      image: mongoIcon,
      url: 'https://www.mongodb.com/',
    },
    {
      name: 'React',
      image: reactIcon,
      url: 'https://react.dev/',
    },
    {
      name: 'Docker',
      image: dockerIcon,
      url: 'https://www.docker.com/',
    },
  ];

  // Duplicate for seamless infinite loop
  const doubleList = [...toolChain, ...toolChain];

  return (
    <section className="py-8 overflow-hidden border-b border-hairline bg-bg-ground/50">
      {/* Marquee Container with Gradient Edge Fades */}
      <div className="relative w-full overflow-hidden marquee-container group">
        {/* Left Gradient Edge Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Edge Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />

        {/* Animated Scrolling Track */}
        <div className="flex items-center gap-12 sm:gap-16 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {doubleList.map((item, index) => (
            <a
              key={`${item.name}-${index}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${item.name} — Official Documentation`}
              className="flex items-center justify-center p-2 opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-200 cursor-pointer select-none shrink-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
