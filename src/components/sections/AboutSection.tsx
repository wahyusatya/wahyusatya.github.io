import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Brain, Sparkles, Terminal, CheckCircle2, ArrowRight, MapPin, GraduationCap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

type TabType = 'web' | 'data' | 'research';

interface TabContent {
  id: TabType;
  label: string;
  badge: string;
  command: string;
  title: string;
  narrative: string;
  stack: string[];
  principles: string[];
  outputName: string;
  outputMetric: string;
}

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('web');

  const tabs: TabContent[] = [
    {
      id: 'web',
      label: 'WEB',
      badge: 'Frontend & Interactive Systems',
      command: 'whoami --domain=web-development',
      title: 'High-Craft Frontend Engineering & Interactive Experiences',
      narrative:
        'Engineering deterministic, zero-jank web experiences with React 19, TypeScript, and modern CSS architectures. I specialize in building data visualization tools, dense technical canvas engines, accessible component trees, and resilient client-side systems that remain fluid across all viewports.',
      stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'HTML5 Canvas / SVG', 'Vite', 'Framer Motion'],
      principles: [
        'Deterministic state & strict type contracts',
        'Sub-millisecond interactive responsiveness',
        'Rich data visualizations & canvas telemetry',
        'Semantic keyboard accessibility (WCAG AA)',
      ],
      outputName: 'SynapseFlow Canvas Visualizer Engine',
      outputMetric: '60 FPS @ 1,000+ Dynamic Nodes',
    },
    {
      id: 'data',
      label: 'DATA',
      badge: 'Python & Statistical Data Science',
      command: 'whoami --domain=data-science',
      title: 'Statistical Modeling, Data Pipelines & Relational Schemas',
      narrative:
        'Constructing end-to-end data-driven workflows in Python. From exploratory data analysis (EDA), longitudinal data imputation, and statistical feature engineering in Pandas/NumPy to normalized relational SQL schema design and predictive ensemble modeling in Scikit-learn.',
      stack: ['Python 3.11+', 'Pandas', 'NumPy', 'Scikit-learn', 'MySQL', 'PostgreSQL', 'MongoDB'],
      principles: [
        'Rigorous exploratory data analysis (EDA)',
        'Normalized 3NF relational architectures',
        'Cross-validation & leakage prevention',
        'Interpretable feature importance matrices',
      ],
      outputName: 'Academic Performance Telemetry Engine',
      outputMetric: 'AUC-ROC: 0.941 (Ensemble Boosting)',
    },
    {
      id: 'research',
      label: 'RESEARCH',
      badge: 'Deep Learning & 1D-ViT',
      command: 'whoami --domain=deep-learning-research',
      title: '1D Vision Transformers & Biomedical Time-Series Modeling',
      narrative:
        'Investigating deep learning architectures in PyTorch with a primary focus on continuous biosignal time-series and computer vision. My core research focuses on ECG classification using pure 1D Vision Transformers with anatomically informed lead grouping, evaluating PTB-XL and Chapman-Shaoxing cohorts under domain distribution shift.',
      stack: ['PyTorch', 'TorchVision', '1D-ViT', 'ResNet-50 / U-Net', 'CUDA / GPU Compute', 'Scipy Signal'],
      principles: [
        'Anatomically informed 1D lead grouping',
        'Multi-head self-attention feature extraction',
        'Convolutional decoders & spatial preservation',
        'Cross-dataset generalizability & ablation rigor',
      ],
      outputName: 'Anatomically Grouped 1D-ViT for ECG Classification',
      outputMetric: 'PTB-XL + Chapman-Shaoxing Cohorts',
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="about" className="py-24 border-b border-hairline">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">
            INSPECTOR // IDENTITY & PERSPECTIVE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-text tracking-tight">
            About Wahyu Satya
          </h2>
          <p className="text-sm text-slate-muted max-w-2xl font-sans">
            Personal identity dossier, engineering perspective, and interactive exploration of core disciplines.
          </p>
        </div>

        {/* 1. RESTORED PERSONAL PROFILE & IDENTITY CARD */}
        <div className="p-6 sm:p-8 rounded-lg bg-bg-surface border border-hairline mb-12 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 shadow-xl">
          {/* Profile Photo */}
          <div className="shrink-0 relative">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-lg overflow-hidden border border-hairline bg-bg-ground shadow-md">
              <img
                src="./assets/about-pic.png"
                alt="Wahyu Satya"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-bg-dark border border-hairline font-mono text-[10px] text-accent-primary">
              ID: WAHYU SATYA
            </div>
          </div>

          {/* Profile Bio Details */}
          <div className="space-y-3 flex-grow text-center md:text-left">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-text font-sans">
                  Putu Wahyu Satya Giridharma
                </h3>
                <span className="font-mono text-xs text-accent-primary font-medium">(Wahyu Satya)</span>
              </div>
              <p className="font-mono text-xs sm:text-sm text-slate-text font-semibold">
                Web Developer • Data Scientist • Deep Learning Researcher
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-sans max-w-3xl">
              I build interactive web experiences, data-driven systems, and intelligent ML solutions. My research focuses on ECG classification using pure 1D Vision Transformers with anatomically informed lead grouping.
            </p>

            {/* Academic Affiliation & Location Strip */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 font-mono text-xs text-slate-dim pt-1 border-t border-hairline/40">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-accent-primary" />
                <span>Universitas Pendidikan Ganesha (B.Sc Information Systems)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent-primary" />
                <span>Singaraja, Bali, Indonesia</span>
              </div>
            </div>

            {/* Core Competency & Interest Tags */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 pt-1">
              {PORTFOLIO_DATA.personal.interests.map((interest) => (
                <span
                  key={interest}
                  className="font-mono text-[10px] px-2.5 py-0.5 rounded bg-bg-ground border border-hairline/60 text-slate-dim"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. INTERACTIVE WHOAMI TERMINAL INTERFACE */}
        <div className="rounded-lg bg-bg-surface border border-hairline overflow-hidden mb-16 shadow-2xl">
          {/* Terminal Window Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-bg-ground border-b border-hairline font-mono text-xs">
            {/* Window Controls & Command Prompt */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-hairline/80 border border-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-hairline/80 border border-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-hairline/80 border border-white/10" />
              </div>
              <div className="flex items-center gap-1.5 text-slate-dim text-[11px]">
                <span className="text-accent-primary">wahyusatya@lab</span>
                <span>:</span>
                <span className="text-slate-muted">~$</span>
                <span className="text-slate-text">{currentTab.command}</span>
              </div>
            </div>

            {/* 3 Interactive Tabs */}
            <div className="flex items-center gap-1 bg-bg-surface p-1 rounded border border-hairline">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-3 py-1 rounded text-xs font-mono tracking-wider transition-all cursor-pointer ${
                    activeTab === t.id
                      ? 'bg-bg-ground text-slate-text font-bold border border-hairline shadow-sm'
                      : 'text-slate-dim hover:text-slate-muted'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Tab Body */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Domain Title & Badge */}
                <div className="space-y-1.5">
                  <div className="font-mono text-xs text-accent-primary uppercase tracking-wider">
                    FOCUS DOMAIN // {currentTab.badge}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-text">
                    {currentTab.title}
                  </h3>
                </div>

                {/* Domain Narrative */}
                <p className="text-sm sm:text-base text-slate-muted leading-relaxed max-w-3xl font-sans">
                  {currentTab.narrative}
                </p>

                {/* Stack & Principles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                  {/* Left: Core Toolchain */}
                  <div className="md:col-span-5 space-y-3 p-4 rounded bg-bg-ground border border-hairline/60">
                    <div className="font-mono text-xs text-slate-text font-bold uppercase tracking-wider">
                      Primary Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentTab.stack.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-xs font-mono bg-bg-surface border border-hairline text-slate-muted"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Engineering Principles & Key Metrics */}
                  <div className="md:col-span-7 space-y-3 p-4 rounded bg-bg-ground border border-hairline/60 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-xs text-slate-text font-bold uppercase tracking-wider mb-2">
                        Core Methodologies
                      </div>
                      <ul className="space-y-1.5 font-sans text-xs text-slate-muted">
                        {currentTab.principles.map((pr, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent-primary shrink-0 mt-0.5" />
                            <span>{pr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benchmark Output Strip */}
                    <div className="pt-3 border-t border-hairline/40 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                      <span className="text-slate-dim text-[11px]">BENCHMARK OUTPUT:</span>
                      <span className="text-accent-primary font-medium text-[11px]">{currentTab.outputMetric}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3. HOW I THINK (Three Core Principles: Build, Measure, Explore) */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">
              OPERATING MENTAL MODEL
            </span>
            <h3 className="text-xl font-bold text-slate-text">
              How I Think
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline rounded-lg overflow-hidden border border-hairline">
            {/* 01 / BUILD */}
            <div className="p-6 bg-bg-surface hover:bg-bg-elevated transition-colors space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-accent-primary font-bold">01 / BUILD</span>
                <span className="text-slate-dim uppercase text-[10px]">Deterministic Systems</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-text">
                High Craft & Working Code
              </h4>
              <p className="text-xs text-slate-muted leading-relaxed font-sans">
                Move rapidly from mathematical hypothesis to typed, working software. No speculative fluff or fragile prototypes—every interface and model pipeline is engineered for durability, performance, and clear utility.
              </p>
            </div>

            {/* 02 / MEASURE */}
            <div className="p-6 bg-bg-surface hover:bg-bg-elevated transition-colors space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-accent-primary font-bold">02 / MEASURE</span>
                <span className="text-slate-dim uppercase text-[10px]">Empirical Rigor</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-text">
                Metrics Over Assumptions
              </h4>
              <p className="text-xs text-slate-muted leading-relaxed font-sans">
                Opinions yield to benchmarks. Neural architectures and frontend systems alike are validated with concrete telemetry: loss curves, cross-validation scores, inference latencies, and zero-CLS rendering metrics.
              </p>
            </div>

            {/* 03 / EXPLORE */}
            <div className="p-6 bg-bg-surface hover:bg-bg-elevated transition-colors space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-accent-primary font-bold">03 / EXPLORE</span>
                <span className="text-slate-dim uppercase text-[10px]">Frontier Inquiry</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-text">
                Continuous Research Curiosity
              </h4>
              <p className="text-xs text-slate-muted leading-relaxed font-sans">
                Probing the frontier of intelligent computation and interactive experiences. Investigating how 1D Vision Transformers, tokenized biosignals, and responsive modern web architectures can converge to solve real problems.
              </p>
            </div>
          </div>
        </div>

        {/* Academic Foundation Dossier Footer */}
        <div className="mt-8 p-4 rounded-lg bg-bg-surface border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-slate-dim">
          <div className="flex items-center gap-2">
            <span className="text-slate-text font-medium">Academic Affiliation:</span>
            <span>Universitas Pendidikan Ganesha (B.Sc. Information Systems)</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span>LOCATION: BALI, INDONESIA</span>
            <span className="text-hairline">|</span>
            <span className="text-accent-primary">WAHYU SATYA LAB</span>
          </div>
        </div>
      </div>
    </section>
  );
};
