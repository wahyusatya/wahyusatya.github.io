import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GraduationCap, Award, Compass, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

type TimelineFilter = 'evolution' | 'governance';

interface EvolutionStage {
  period: string;
  stage: string;
  focusTitle: string;
  domain: string;
  description: string;
  keyMilestones: string[];
  stack: string[];
}

export const ExperienceSection: React.FC = () => {
  const [activeView, setActiveView] = useState<TimelineFilter>('evolution');

  const evolutionStages: EvolutionStage[] = [
    {
      period: '2022 - 2023',
      stage: 'STAGE 01',
      focusTitle: 'Foundational Programming & Relational Data',
      domain: 'Computing Foundations & Schema Architecture',
      description:
        'Established core computer science foundations: object-oriented and procedural programming in Python and JavaScript, algorithmic computational thinking, normalized 3NF relational database modeling in MySQL, and Linux command-line workflows.',
      keyMilestones: [
        'Algorithmic problem-solving & data structures',
        'Normalized 3NF relational schemas & SQL querying',
        'Frontend basics (Semantic HTML5, CSS3, ES6+ JS)',
      ],
      stack: ['Python', 'JavaScript (ES6+)', 'MySQL', 'Git', 'Linux CLI'],
    },
    {
      period: '2023 - 2024',
      stage: 'STAGE 02',
      focusTitle: 'Statistical Data Science & Machine Learning',
      domain: 'Predictive Modeling & Empirical Analysis',
      description:
        'Deepened focus into statistical data pipelines and machine learning algorithms. Conducted exploratory data analysis, longitudinal data imputation, and predictive tree modeling (Gradient Boosting, Random Forest) using Pandas, NumPy, and Scikit-learn.',
      keyMilestones: [
        'IBM Data Science Professional credential verification',
        'Predictive academic telemetry engine development',
        'Belajar Skill Python for Data Science certification',
      ],
      stack: ['Python 3.11+', 'Pandas', 'NumPy', 'Scikit-learn', 'MySQL', 'EDA'],
    },
    {
      period: '2024 - 2025',
      stage: 'STAGE 03',
      focusTitle: 'Deep Learning & High-Craft Web Systems',
      domain: 'Neural Vision & Deterministic Canvas Engines',
      description:
        'Transitioned into deep learning architectures in PyTorch. Formulated convolutional encoder-decoders (ResNet-50 + U-Net) for pixel-level anomaly segmentation while simultaneously engineering deterministic 60 FPS HTML5 Canvas visualizers in React 19 and TypeScript.',
      keyMilestones: [
        'Deep Vision Anomaly Segmentation (mIoU: 0.892, 18ms inference)',
        'SynapseFlow high-throughput canvas rendering engine',
        'TOEFL ITP® Level 1 Score 530 (B2 Bronze) certification',
      ],
      stack: ['PyTorch', 'TorchVision', 'U-Net / ResNet', 'React 19', 'TypeScript', 'Canvas API'],
    },
    {
      period: '2025 - Present',
      stage: 'STAGE 04',
      focusTitle: '1D-Vision Transformers & ECG Time-Series Research',
      domain: 'Frontier AI Research & Multi-Label Classification',
      description:
        'Current research investigation: formulating Anatomically Grouped 1D-Vision Transformers for continuous 12-lead electrocardiac time-series. Focusing on PTB-XL and Chapman-Shaoxing cross-dataset generalization, patch tokenization, and multi-head attention saliency.',
      keyMilestones: [
        '1D-ViT architecture formulation for physiological lead groups',
        'PTB-XL & Chapman-Shaoxing cross-dataset evaluation protocol',
        'Asymmetric focal loss multi-label classification pipeline',
      ],
      stack: ['1D-ViT', 'PyTorch 2.X', 'Scipy Signal', 'CUDA', 'Attention Saliency'],
    },
  ];

  return (
    <section id="timeline" className="py-24 border-b border-hairline bg-bg-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">
              CHRONOLOGY & TRAJECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-text tracking-tight">
              Technical Evolution & Institutional Record
            </h2>
            <p className="text-sm text-slate-muted max-w-2xl font-sans">
              An authentic progression from foundational programming and statistical data science to deep learning research and university governance.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-bg-surface p-1 rounded border border-hairline font-mono text-xs shrink-0">
            <button
              onClick={() => setActiveView('evolution')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeView === 'evolution'
                  ? 'bg-bg-ground text-slate-text font-bold border border-hairline shadow-sm'
                  : 'text-slate-dim hover:text-slate-muted'
              }`}
            >
              Research & Tech Evolution
            </button>
            <button
              onClick={() => setActiveView('governance')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeView === 'governance'
                  ? 'bg-bg-ground text-slate-text font-bold border border-hairline shadow-sm'
                  : 'text-slate-dim hover:text-slate-muted'
              }`}
            >
              Academic Governance
            </button>
          </div>
        </div>

        {/* 1. RESEARCH & TECH EVOLUTION TIMELINE */}
        {activeView === 'evolution' && (
          <div className="relative pl-6 sm:pl-8 border-l border-hairline space-y-10">
            {evolutionStages.map((st, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Marker Node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-3.5 h-3.5 rounded bg-bg-dark border border-hairline group-hover:border-accent-primary transition-colors flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                </div>

                <div className="p-6 sm:p-7 rounded-lg bg-bg-surface border border-hairline hover:border-subtle space-y-4 transition-colors">
                  {/* Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-accent-primary font-bold">{st.period}</span>
                      <span className="text-slate-dim">•</span>
                      <span className="text-slate-dim text-[11px] uppercase">{st.stage}</span>
                    </div>
                    <span className="text-[10px] text-slate-dim uppercase px-2 py-0.5 rounded bg-bg-ground border border-hairline/60">
                      {st.domain}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-text font-sans">
                      {st.focusTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-sans">
                      {st.description}
                    </p>
                  </div>

                  {/* Key Milestones */}
                  <div className="space-y-1.5 pt-2 border-t border-hairline/40">
                    <div className="font-mono text-[10px] text-slate-dim uppercase tracking-wider">
                      Key Progression Milestones:
                    </div>
                    <ul className="space-y-1 font-sans text-xs text-slate-muted">
                      {st.keyMilestones.map((ms, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-2">
                          <span className="text-accent-primary">•</span>
                          <span>{ms}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {st.stack.map((item, sIdx) => (
                      <span
                        key={sIdx}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-bg-ground border border-hairline text-slate-dim"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. ACADEMIC GOVERNANCE & COMMITTEE RECORD */}
        {activeView === 'governance' && (
          <div className="relative pl-6 sm:pl-8 border-l border-hairline space-y-8">
            {PORTFOLIO_DATA.experiences.map((exp) => (
              <div key={exp.id} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-3.5 h-3.5 rounded bg-bg-dark border border-hairline group-hover:border-accent-primary transition-colors" />

                <div className="p-6 rounded-lg bg-bg-surface border border-hairline hover:border-subtle space-y-2.5 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                    <span className="text-accent-primary font-bold">{exp.year}</span>
                    <span className="text-[10px] text-slate-dim uppercase px-2 py-0.5 rounded bg-bg-ground border border-hairline/60">
                      {exp.tag}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-slate-text font-sans">
                      {exp.role}
                    </h3>
                    <div className="text-xs font-medium text-slate-muted font-sans">
                      {exp.organization}
                    </div>
                  </div>

                  <p className="text-xs text-slate-muted leading-relaxed pt-1 font-sans">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
