import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Download, Github, Linkedin, Copy, Check, Sparkles } from 'lucide-react';
import { NeuralTensorScene } from '../3d/NeuralTensorScene';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { useToast } from '../ui/ToastContext';

export const HeroSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    showToast('📋 Email copied to clipboard: ' + PORTFOLIO_DATA.personal.email, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="profile" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* 3D WebGL Neural Scene Background */}
      <NeuralTensorScene />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-surface/90 border border-cyan-primary/30 backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-glow animate-pulse" />
              <span className="font-mono text-xs font-semibold text-cyan-glow uppercase tracking-wider">
                DEEP LEARNING RESEARCH • SENIOR WEB DEV
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.15]"
            >
              Engineering{' '}
              <span className="text-cyan-glow">
                Intelligent Systems
              </span>{' '}
              & High-Craft Web Architectures.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Hello, I'm <strong className="text-white font-bold">{PORTFOLIO_DATA.personal.name}</strong>.
              An Information Systems scholar at {PORTFOLIO_DATA.personal.institution}.
              I bridge mathematical neural formulations in PyTorch with reactive, zero-jank frontend engineering.
            </motion.p>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <a
                href="#lab"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-cyan-primary/25 border border-white/20 transition-all hover:-translate-y-0.5"
              >
                <span>Launch Neural Lab</span>
                <Play className="w-4 h-4" />
              </a>

              <a
                href="#projects"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-bg-surface hover:bg-bg-elevated border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-semibold text-sm transition-all hover:-translate-y-0.5"
              >
                <span>View Research</span>
                <ArrowRight className="w-4 h-4 text-cyan-glow" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-transparent hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Download CV</span>
              </a>
            </motion.div>

            {/* Social Connect Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4 text-xs"
            >
              <span className="font-mono text-slate-400 uppercase tracking-wider">Connect:</span>

              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-surface/80 border border-white/10 text-slate-300 hover:text-cyan-glow hover:border-cyan-primary/40 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github/wahyusatya</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-surface/80 border border-white/10 text-slate-300 hover:text-cyan-glow hover:border-cyan-primary/40 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>in/wahyusatya</span>
              </a>

              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-surface/80 border border-white/10 text-slate-300 hover:text-cyan-glow hover:border-cyan-primary/40 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-primary" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="font-mono">{PORTFOLIO_DATA.personal.email}</span>
              </button>
            </motion.div>
          </div>

          {/* Right Hologram Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-sm rounded-3xl bg-bg-surface/80 backdrop-blur-xl border border-white/15 p-6 shadow-2xl shadow-cyan-primary/10 transition-all hover:border-cyan-primary/50"
            >
              <div className="relative w-36 h-36 mx-auto mb-5 rounded-full p-1.5 bg-gradient-to-br from-cyan-primary to-violet-primary shadow-lg shadow-cyan-primary/20">
                <img
                  src={PORTFOLIO_DATA.personal.profileImg}
                  alt={PORTFOLIO_DATA.personal.name}
                  className="w-full h-full object-cover rounded-full bg-bg-dark"
                />
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-bg-deep border border-emerald-primary/40 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-emerald-primary animate-ping" />
                </div>
              </div>

              <div className="text-center space-y-1 mb-5">
                <h3 className="text-xl font-bold text-slate-100">{PORTFOLIO_DATA.personal.name}</h3>
                <p className="text-xs text-slate-400 font-mono">Information Systems • Undiksha</p>
              </div>

              {/* Hologram Telemetry Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-left">
                <div className="p-2.5 rounded-xl bg-bg-deep/80 border border-white/5 space-y-0.5">
                  <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">DOMAIN</div>
                  <div className="text-xs font-semibold text-cyan-glow">Deep Learning / AI</div>
                </div>
                <div className="p-2.5 rounded-xl bg-bg-deep/80 border border-white/5 space-y-0.5">
                  <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">SPECIALTY</div>
                  <div className="text-xs font-semibold text-violet-glow">Web Engineering</div>
                </div>
                <div className="p-2.5 rounded-xl bg-bg-deep/80 border border-white/5 space-y-0.5">
                  <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">CORE STACK</div>
                  <div className="text-xs font-semibold text-slate-200">PyTorch / TS / SQL</div>
                </div>
                <div className="p-2.5 rounded-xl bg-bg-deep/80 border border-white/5 space-y-0.5">
                  <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">STATUS</div>
                  <div className="text-xs font-semibold text-emerald-primary">Active Research</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Telemetry Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 p-4 sm:p-6 rounded-2xl bg-bg-surface/80 backdrop-blur-md border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {PORTFOLIO_DATA.stats.map((st, i) => (
            <div key={i} className="space-y-1">
              <div className="font-mono text-2xl sm:text-3xl font-extrabold text-cyan-glow">
                {st.num}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {st.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
