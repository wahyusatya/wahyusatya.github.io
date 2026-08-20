import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, ArrowRight, CheckCircle, Cpu, Layers, Activity } from 'lucide-react';
import { Project } from '../../data/portfolioData';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-bg-dark/85 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-3xl bg-bg-surface border border-hairline rounded-lg shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-bg-ground border-b border-hairline shrink-0">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-accent-primary font-bold">{project.number} // CASE STUDY</span>
              <span className="text-slate-dim">•</span>
              <span className="text-slate-muted uppercase">{project.category}</span>
              <span className="text-slate-dim">•</span>
              <span className="px-2 py-0.5 rounded bg-bg-surface border border-hairline text-slate-dim text-[10px]">
                {project.status}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded bg-bg-surface border border-hairline text-slate-muted hover:text-slate-text transition-colors cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 font-sans">
            {/* Title & Summary */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-text tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm text-slate-muted leading-relaxed">
                {project.summary}
              </p>

              {/* Technologies Tag Strip */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] px-2.5 py-0.5 rounded bg-bg-ground border border-hairline text-slate-dim"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 6 Structured Case Study Sections */}
            <div className="space-y-6 pt-2 border-t border-hairline/60">
              {/* 1. Problem */}
              <div className="space-y-2">
                <div className="font-mono text-xs text-accent-primary uppercase tracking-wider">
                  01 / PROBLEM STATEMENT
                </div>
                <p className="text-xs sm:text-sm text-slate-muted leading-relaxed">
                  {project.caseStudy.problem}
                </p>
              </div>

              {/* 2. Approach */}
              <div className="space-y-2">
                <div className="font-mono text-xs text-accent-primary uppercase tracking-wider">
                  02 / TECHNICAL APPROACH
                </div>
                <p className="text-xs sm:text-sm text-slate-muted leading-relaxed">
                  {project.caseStudy.approach}
                </p>
              </div>

              {/* 3. Architecture */}
              <div className="space-y-2">
                <div className="font-mono text-xs text-accent-primary uppercase tracking-wider">
                  03 / SYSTEM ARCHITECTURE
                </div>
                <div className="p-3.5 rounded bg-bg-ground border border-hairline/60 font-mono text-xs text-slate-text leading-relaxed">
                  {project.caseStudy.architecture}
                </div>
              </div>

              {/* 4. Experiment Protocol */}
              <div className="space-y-2">
                <div className="font-mono text-xs text-accent-primary uppercase tracking-wider">
                  04 / EXPERIMENT & EVALUATION PROTOCOL
                </div>
                <p className="text-xs sm:text-sm text-slate-muted leading-relaxed">
                  {project.caseStudy.experiment}
                </p>
              </div>

              {/* 5. Empirical Results */}
              <div className="space-y-2">
                <div className="font-mono text-xs text-accent-primary uppercase tracking-wider">
                  05 / VERIFIED RESULTS & METRICS
                </div>
                <div className="p-3.5 rounded bg-bg-ground border border-hairline/60 space-y-1">
                  <div className="font-mono text-xs font-semibold text-accent-primary">
                    {project.metric}
                  </div>
                  <p className="text-xs text-slate-muted leading-relaxed">
                    {project.caseStudy.results}
                  </p>
                </div>
              </div>

              {/* 6. Technical Takeaway */}
              <div className="space-y-2">
                <div className="font-mono text-xs text-accent-primary uppercase tracking-wider">
                  06 / ENGINEERING TAKEAWAY
                </div>
                <p className="text-xs sm:text-sm text-slate-muted leading-relaxed">
                  {project.caseStudy.takeaway}
                </p>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="px-6 py-4 bg-bg-ground border-t border-hairline flex items-center justify-between shrink-0 font-mono text-xs">
            <span className="text-slate-dim text-[11px]">
              DATA SOURCE: CLIENT-SIDE STATIC
            </span>

            <div className="flex items-center gap-3">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-surface hover:bg-bg-elevated border border-hairline hover:border-subtle text-slate-text text-xs transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-slate-dim" />
                <span>Code Repository</span>
              </a>

              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded bg-transparent hover:bg-bg-surface border border-hairline text-slate-dim hover:text-slate-text text-xs transition-colors cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
