import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Leadership' | 'Governance' | 'Media'>('All');

  const filteredExperiences = PORTFOLIO_DATA.experiences.filter(
    (exp) => filter === 'All' || exp.category === filter
  );

  return (
    <section id="experience" className="relative py-24 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Institutional Experience & Leadership
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          A verified track record of operational execution, committee governance, and technological coordination across university summits.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {(['All', 'Leadership', 'Governance', 'Media'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === cat
                ? 'bg-cyan-primary/20 border border-cyan-primary text-cyan-glow shadow-sm'
                : 'bg-bg-surface border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {cat} Track
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-gradient space-y-8">
        {filteredExperiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="relative group"
          >
            {/* Timeline Marker Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-3.5 h-3.5 rounded-full bg-bg-dark border-2 border-cyan-primary group-hover:scale-125 transition-transform shadow-md shadow-cyan-primary/50" />

            <div className="p-6 rounded-2xl bg-bg-surface/80 border border-white/10 backdrop-blur-md space-y-2 hover:border-cyan-primary/40 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-cyan-glow">{exp.year}</span>
                <span className="font-mono text-[10px] uppercase font-semibold text-slate-400 px-2 py-0.5 rounded bg-bg-deep border border-white/5">
                  {exp.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
              <h4 className="text-sm font-semibold text-violet-glow">{exp.organization}</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
