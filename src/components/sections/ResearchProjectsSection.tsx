import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../../data/portfolioData';
import { ProjectVisualPreview } from '../ui/ProjectVisualPreview';
import { CaseStudyModal } from '../ui/CaseStudyModal';

type FilterType = 'all' | 'web' | 'data' | 'ai' | 'research';

export const ResearchProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web' },
    { id: 'data', label: 'Data' },
    { id: 'ai', label: 'AI' },
    { id: 'research', label: 'Research' },
  ];

  const filteredProjects = PORTFOLIO_DATA.projects.filter(
    (proj: Project) => activeFilter === 'all' || proj.filterCategories.includes(activeFilter)
  );

  return (
    <section id="work" className="py-24 border-b border-hairline relative">
      <div id="research" className="absolute -top-16" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">
              CASE STUDIES & RESEARCH SYSTEMS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-text tracking-tight">
              Selected Projects & Technical Case Studies
            </h2>
            <p className="text-sm text-slate-muted max-w-2xl font-sans">
              In-depth engineering breakdowns of neural vision architectures, high-throughput canvas systems, and statistical telemetry models.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-1 bg-bg-surface p-1 rounded border border-hairline shrink-0">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-wide transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-bg-ground text-slate-text font-bold border border-hairline shadow-sm'
                    : 'text-slate-dim hover:text-slate-muted'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Large Editorial Project Panels */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj: Project) => (
              <motion.article
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedProject(proj)}
                className="group p-6 sm:p-8 rounded-lg bg-bg-surface border border-hairline hover:border-subtle transition-all duration-200 cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left: Project Details */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Header Row: Number, Category & Status */}
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                      <span className="text-accent-primary font-bold text-sm">
                        {proj.number}
                      </span>
                      <span className="text-slate-dim">/</span>
                      <span className="text-slate-muted uppercase tracking-wider">
                        {proj.category}
                      </span>
                      <span className="text-slate-dim">•</span>
                      <span className="text-slate-dim text-[11px]">
                        {proj.year}
                      </span>
                      <span className="ml-auto px-2 py-0.5 rounded bg-bg-ground border border-hairline/60 text-slate-dim text-[10px]">
                        {proj.status}
                      </span>
                    </div>

                    {/* Title & Summary */}
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-text group-hover:text-accent-primary transition-colors tracking-tight">
                        {proj.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-sans">
                        {proj.summary}
                      </p>
                    </div>

                    {/* Architecture Brief */}
                    <div className="p-3 rounded bg-bg-ground border border-hairline/60 font-mono text-xs text-slate-dim">
                      <span className="text-slate-muted font-medium">Architecture: </span>
                      <span>{proj.architectureBrief}</span>
                    </div>

                    {/* Technologies & Hover Action */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-hairline/40">
                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="font-mono text-[10px] px-2 py-0.5 rounded bg-bg-ground border border-hairline text-slate-dim"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* View Case Study Hover Prompt */}
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-muted group-hover:text-accent-primary transition-colors">
                        <span>View Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Right: Interactive Wireframe / Visual Preview */}
                  <div className="lg:col-span-5 h-full flex flex-col justify-center">
                    <ProjectVisualPreview type={proj.visualType} />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Client-Side Case Study Inspection Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
