import React from 'react';
import { motion } from 'framer-motion';
import { Github, Play, ExternalLink, Cpu, Layers } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../../data/portfolioData';
import { useToast } from '../ui/ToastContext';

export const ResearchProjectsSection: React.FC = () => {
  const { showToast } = useToast();

  const handleSyncWeights = (projectTitle: string) => {
    showToast(`📦 Live telemetry weights for [${projectTitle}] synced via HuggingFace hub.`, 'info');
  };

  return (
    <section id="projects" className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Selected Research & Engineering Projects
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Applied deep learning research and high-performance web systems engineered for tangible real-world impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PORTFOLIO_DATA.projects.map((proj: Project, idx: number) => (
          <motion.article
            key={proj.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-bg-surface/80 border border-white/10 backdrop-blur-md flex flex-col justify-between space-y-5 hover:border-cyan-primary/50 transition-all hover:-translate-y-1.5 shadow-lg hover:shadow-cyan-primary/10"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-cyan-glow bg-cyan-primary/10 border border-cyan-primary/30 px-2.5 py-0.5 rounded-full">
                  {proj.category}
                </span>
                <span className="font-mono text-xs text-slate-400">{proj.year}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{proj.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {proj.summary}
                </p>
              </div>

              {/* Architecture Meta Specs */}
              <div className="p-3.5 rounded-xl bg-bg-deep border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <span className="font-mono text-slate-400 shrink-0">Architecture:</span>
                  <span className="text-slate-200 text-right font-medium">{proj.architecture}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="font-mono text-slate-400 shrink-0">Framework:</span>
                  <span className="text-slate-200 text-right font-medium">{proj.framework}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="font-mono text-slate-400 shrink-0">Evaluation:</span>
                  <span className="text-emerald-primary text-right font-semibold">{proj.metric}</span>
                </div>
              </div>
            </div>

            {/* Project Footer Actions */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
              <a
                href={proj.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg-deep hover:bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code Repository</span>
              </a>

              {proj.id === 'proj-2' ? (
                <a
                  href="#lab"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-primary/20 hover:bg-cyan-primary/30 border border-cyan-primary/40 text-xs font-semibold text-cyan-glow transition-all"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Try in Lab</span>
                </a>
              ) : (
                <button
                  onClick={() => handleSyncWeights(proj.title)}
                  className="px-3 py-1.5 rounded-xl bg-transparent hover:bg-white/5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  Model Specs
                </button>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
