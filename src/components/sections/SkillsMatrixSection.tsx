import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, Code2, Database, Brain, Wrench, CheckCircle } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../../data/portfolioData';

type StackCategory = 'web' | 'data' | 'dl' | 'tools';

interface TechnologyItem {
  id: string;
  name: string;
  category: StackCategory;
  level: string;
  description: string;
  relatedProjectIds: string[]; // matches Project.id in portfolioData
}

export const SkillsMatrixSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<StackCategory>('dl');
  const [selectedTechId, setSelectedTechId] = useState<string>('pytorch');

  const technologies: TechnologyItem[] = [
    // Deep Learning
    {
      id: 'pytorch',
      name: 'PyTorch 2.X',
      category: 'dl',
      level: 'Research Standard',
      description: 'Dynamic computational graph construction, custom loss functions, and multi-GPU tensor training loops.',
      relatedProjectIds: ['proj-ecg', 'proj-vision'],
    },
    {
      id: '1d-vit',
      name: '1D Vision Transformer',
      category: 'dl',
      level: 'Research Focus',
      description: '1D patch tokenization, linear embedding projections, and multi-head self-attention on continuous time-series.',
      relatedProjectIds: ['proj-ecg'],
    },
    {
      id: 'torchvision',
      name: 'TorchVision & CNNs',
      category: 'dl',
      level: 'Advanced',
      description: 'Pre-trained convolutional backbones (ResNet-50), U-Net decoders, and custom spatial segmentation architectures.',
      relatedProjectIds: ['proj-vision'],
    },
    {
      id: 'scipy-signal',
      name: 'Scipy Signal Processing',
      category: 'dl',
      level: 'Proficient',
      description: 'Butterworth bandpass filtering, detrending, and digital biosignal preprocessing for cardiac recordings.',
      relatedProjectIds: ['proj-ecg'],
    },
    {
      id: 'cuda',
      name: 'CUDA / GPU Compute',
      category: 'dl',
      level: 'Operational',
      description: 'TensorRT / CUDA tensor acceleration for mixed-precision sub-20ms inference.',
      relatedProjectIds: ['proj-ecg', 'proj-vision'],
    },

    // Web Engineering
    {
      id: 'react',
      name: 'React 19',
      category: 'web',
      level: 'Production Grade',
      description: 'Declarative component architecture, custom performance hooks, and zero-jank UI lifecycles.',
      relatedProjectIds: ['proj-synapse'],
    },
    {
      id: 'typescript',
      name: 'TypeScript (Strict)',
      category: 'web',
      level: 'Production Grade',
      description: 'Strict type contracts, generic tensor interfaces, and deterministic client-side state models.',
      relatedProjectIds: ['proj-synapse'],
    },
    {
      id: 'canvas',
      name: 'HTML5 Canvas 2D API',
      category: 'web',
      level: 'Advanced',
      description: 'Direct double-buffered canvas rendering, Verlet particle integration, and 60 FPS graph physics.',
      relatedProjectIds: ['proj-synapse'],
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'web',
      level: 'Production Grade',
      description: 'Hairline architectural design systems, dark-mode tokens, and responsive fluid layouts.',
      relatedProjectIds: ['proj-synapse'],
    },
    {
      id: 'vite',
      name: 'Vite & Modern Tooling',
      category: 'web',
      level: 'Production Grade',
      description: 'Ultra-fast ESM bundling, asset optimization, and instant static build pipeline for GitHub Pages.',
      relatedProjectIds: ['proj-synapse'],
    },

    // Data Science & ML
    {
      id: 'python',
      name: 'Python 3.11+',
      category: 'data',
      level: 'Core Language',
      description: 'High-performance computational scientific programming, matrix operations, and backend pipelines.',
      relatedProjectIds: ['proj-ecg', 'proj-vision', 'proj-telemetry'],
    },
    {
      id: 'pandas-numpy',
      name: 'Pandas & NumPy',
      category: 'data',
      level: 'Core Library',
      description: 'Vectorized tensor operations, exploratory longitudinal data wrangling, and statistical feature formulation.',
      relatedProjectIds: ['proj-ecg', 'proj-telemetry'],
    },
    {
      id: 'scikit-learn',
      name: 'Scikit-learn',
      category: 'data',
      level: 'Advanced',
      description: 'Ensemble gradient boosting, cross-validation protocols, and ROC/PR metric evaluations.',
      relatedProjectIds: ['proj-telemetry'],
    },
    {
      id: 'mysql-sql',
      name: 'MySQL & Relational SQL',
      category: 'data',
      level: 'Production Grade',
      description: 'Normalized 3NF relational schema design, indexing, and high-throughput query optimization.',
      relatedProjectIds: ['proj-telemetry'],
    },
    {
      id: 'mongodb',
      name: 'MongoDB & Document Stores',
      category: 'data',
      level: 'Proficient',
      description: 'Flexible JSON document schemas for unstructured experimental metrics and logging.',
      relatedProjectIds: ['proj-telemetry'],
    },

    // Tooling & Environment
    {
      id: 'git-github',
      name: 'Git & GitHub',
      category: 'tools',
      level: 'Standard Workflow',
      description: 'Branching strategies, CI/CD automated deployment to GitHub Pages, and versioned experiment tracking.',
      relatedProjectIds: ['proj-ecg', 'proj-vision', 'proj-synapse', 'proj-telemetry'],
    },
    {
      id: 'linux-cli',
      name: 'Linux Shell & Bash',
      category: 'tools',
      level: 'Operational',
      description: 'Command-line scripting, environment configuration, and headless server orchestration.',
      relatedProjectIds: ['proj-ecg', 'proj-telemetry'],
    },
    {
      id: 'docker',
      name: 'Docker Containers',
      category: 'tools',
      level: 'Operational',
      description: 'Containerized reproducible scientific environments ensuring cross-platform experimental parity.',
      relatedProjectIds: ['proj-telemetry'],
    },
    {
      id: 'anaconda',
      name: 'Anaconda / Conda',
      category: 'tools',
      level: 'Core Environment',
      description: 'Virtual scientific environment management and isolated CUDA/CUDNN library resolution.',
      relatedProjectIds: ['proj-ecg', 'proj-vision'],
    },
  ];

  const categories: { id: StackCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dl', label: 'Deep Learning', icon: Brain },
    { id: 'web', label: 'Web Engineering', icon: Code2 },
    { id: 'data', label: 'Data & ML', icon: Database },
    { id: 'tools', label: 'Tools & Environment', icon: Wrench },
  ];

  const filteredTechnologies = technologies.filter((t) => t.category === activeCategory);
  const currentTech = technologies.find((t) => t.id === selectedTechId) || technologies[0];

  // Find related projects in portfolioData
  const relatedProjects = PORTFOLIO_DATA.projects.filter((p: Project) =>
    currentTech.relatedProjectIds.includes(p.id)
  );

  return (
    <section id="stack" className="py-24 border-b border-hairline bg-bg-dark relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">
              TECHNOLOGY REPERTOIRE // INTERACTIVE MAP
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-text tracking-tight">
              Technical Stack & Project Connections
            </h2>
            <p className="text-sm text-slate-muted max-w-2xl font-sans">
              Select any framework or tool to inspect its technical competency and dynamically highlight its applied implementation across research and systems projects.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-bg-surface p-1 rounded border border-hairline shrink-0 font-mono text-xs">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    const firstInCat = technologies.find((t) => t.category === cat.id);
                    if (firstInCat) setSelectedTechId(firstInCat.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-bg-ground text-slate-text font-bold border border-hairline shadow-sm'
                      : 'text-slate-dim hover:text-slate-muted'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-accent-primary" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Interactive Stack & Project Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Technology Selector Grid */}
          <div className="lg:col-span-6 space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredTechnologies.map((tech) => {
                const isSelected = selectedTechId === tech.id;
                return (
                  <button
                    key={tech.id}
                    onClick={() => setSelectedTechId(tech.id)}
                    className={`p-4 rounded-lg text-left transition-all cursor-pointer border flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'bg-bg-surface border-accent-primary shadow-lg'
                        : 'bg-bg-surface/60 border-hairline hover:border-subtle hover:bg-bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-slate-text font-bold">{tech.name}</span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                      )}
                    </div>
                    <div className="font-mono text-[10px] text-accent-primary">
                      {tech.level}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Technology Inspector & Highlighted Projects */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTech.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 rounded-lg bg-bg-surface border border-hairline space-y-6"
              >
                {/* Tech Title & Competency Level */}
                <div className="flex items-center justify-between border-b border-hairline/60 pb-3 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-text font-bold text-sm">{currentTech.name}</span>
                    <span className="text-slate-dim">•</span>
                    <span className="text-accent-primary uppercase">{currentTech.category}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-bg-ground border border-hairline text-slate-dim text-[10px]">
                    {currentTech.level}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-sans">
                  {currentTech.description}
                </p>

                {/* Directly Highlighted Projects */}
                <div className="space-y-3 pt-2 border-t border-hairline/40">
                  <div className="font-mono text-xs text-slate-dim uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                    <span>Applied in Portfolio Projects:</span>
                  </div>

                  {relatedProjects.length > 0 ? (
                    <div className="space-y-2">
                      {relatedProjects.map((proj: Project) => (
                        <a
                          key={proj.id}
                          href="#work"
                          className="flex items-center justify-between p-3 rounded bg-bg-ground border border-hairline hover:border-accent-primary transition-colors group"
                        >
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-slate-text group-hover:text-accent-primary transition-colors font-sans">
                              {proj.title}
                            </div>
                            <div className="font-mono text-[10px] text-slate-dim">
                              {proj.category} // {proj.status}
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-dim group-hover:text-accent-primary group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-dim font-mono">
                      General foundation utilized across multiple exploratory scripts.
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
