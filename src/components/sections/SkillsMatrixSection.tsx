import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const SkillsMatrixSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dl' | 'web' | 'data' | 'tools'>('all');

  const filteredSkills = PORTFOLIO_DATA.skills.filter(
    (s) => activeFilter === 'all' || s.category === activeFilter
  );

  const filters: { id: 'all' | 'dl' | 'web' | 'data' | 'tools'; label: string }[] = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'dl', label: 'Deep Learning & AI' },
    { id: 'web', label: 'Web Architecture' },
    { id: 'data', label: 'Data & Databases' },
    { id: 'tools', label: 'Tooling & Environment' },
  ];

  return (
    <section id="skills" className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Capabilities Matrix
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Tools, frameworks, and mathematical primitives mastered across deep learning, frontend engineering, and backend data layers.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === f.id
                ? 'bg-cyan-primary/20 border border-cyan-primary text-cyan-glow shadow-sm shadow-cyan-primary/20'
                : 'bg-bg-surface border border-white/10 text-slate-400 hover:text-white hover:bg-bg-elevated'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="p-6 rounded-2xl bg-bg-surface/80 border border-white/10 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-cyan-primary/40 transition-all hover:-translate-y-1"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-slate-100 text-base">{skill.name}</h3>
                <span className={`font-mono text-[11px] font-semibold ${skill.levelColor}`}>
                  {skill.level}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {skill.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-0.5 rounded bg-bg-deep border border-white/5 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
