import React from 'react';
import { ArrowRight, Activity, FileText } from 'lucide-react';
import { TechnicalWaveVisual } from '../ui/TechnicalWaveVisual';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-16 pb-20 border-b border-hairline">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Currently Building Research Indicator */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-bg-surface border border-hairline text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-slate-dim">Currently Building:</span>
            <span className="text-slate-text font-medium flex items-center gap-1">
              <span>ECG 1D-ViT Research</span>
              <Activity className="w-3.5 h-3.5 text-accent-primary" />
            </span>
          </div>
        </div>

        {/* Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Statement & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-text tracking-tight leading-[1.15]">
                I build intelligent systems and interactive digital experiences.
              </h1>
              <p className="text-sm sm:text-base font-mono text-accent-primary tracking-wide">
                Web Developer • Data Scientist • Deep Learning Researcher
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-muted leading-relaxed max-w-xl font-sans">
              Hello, I'm <strong className="text-slate-text font-semibold">Wahyu Satya</strong>. I build interactive web experiences, data-driven systems, and intelligent ML solutions. My research focuses on ECG classification using pure 1D Vision Transformers with anatomically informed lead grouping.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-bg-surface hover:bg-bg-elevated border border-hairline hover:border-accent-primary/50 text-slate-text text-xs font-mono tracking-wide transition-all"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent-primary" />
              </a>

              <a
                href="#research"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-transparent hover:bg-bg-surface border border-hairline text-slate-muted hover:text-slate-text text-xs font-mono tracking-wide transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-slate-dim" />
                <span>Explore Research</span>
              </a>
            </div>

            {/* Brief Research Scope Note */}
            <div className="pt-4 border-t border-hairline/40 grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs text-slate-dim">
              <div>
                <div className="text-[10px] uppercase text-slate-dim">Focus</div>
                <div className="text-slate-text text-[11px] font-medium pt-0.5">Vision & 1D-ViT</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-slate-dim">Stack</div>
                <div className="text-slate-text text-[11px] font-medium pt-0.5">PyTorch / React 19</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-slate-dim">Affiliation</div>
                <div className="text-slate-text text-[11px] font-medium pt-0.5">Undiksha (B.Sc)</div>
              </div>
            </div>
          </div>

          {/* Right Column: Subtle Technical Visual (Waveform + Data Nodes) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <TechnicalWaveVisual />
          </div>
        </div>
      </div>
    </section>
  );
};
