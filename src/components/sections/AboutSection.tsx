import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Brain, Code2, Database } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Bridging Theory & Production Engineering
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          How computational curiosity transforms into robust neural algorithms and intuitive web interfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: About Picture & Academic Dossier */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg group"
          >
            <img
              src={PORTFOLIO_DATA.personal.aboutImg}
              alt="Wahyu Satya research workspace"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent flex items-end p-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-bg-surface/90 backdrop-blur-md border border-white/10 text-xs font-mono text-cyan-glow">
                <span className="w-2 h-2 rounded-full bg-cyan-primary animate-pulse" />
                <span>Neural Architectures • Vision • Data Systems</span>
              </div>
            </div>
          </motion.div>

          {/* Academic Timeline Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-bg-surface/80 border border-white/10 backdrop-blur-md space-y-4"
          >
            <div className="flex items-center gap-2.5 text-cyan-glow border-b border-white/10 pb-3">
              <GraduationCap className="w-5 h-5" />
              <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
                Academic Background
              </h3>
            </div>

            <ul className="space-y-4 text-xs">
              {PORTFOLIO_DATA.academic.map((ac, idx) => (
                <li key={idx} className="relative pl-4 border-l border-cyan-primary/30 space-y-0.5">
                  <div className="font-semibold text-slate-200 text-sm">{ac.institution}</div>
                  <div className="text-slate-400">{ac.program}</div>
                  <div className="font-mono text-[10px] text-cyan-glow/80">{ac.period}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Right: Narrative & 3 Core Pillars */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-bg-surface/80 border border-white/10 backdrop-blur-md space-y-4 text-sm sm:text-base leading-relaxed text-slate-300"
          >
            <p className="text-slate-100 font-medium text-lg">
              I am an Information Systems scholar and developer at <strong>Ganesha University of Education</strong>. My research and engineering work centers on the premise that data is the fundamental fabric of all modern decision-making systems.
            </p>
            <p>
              As a Deep Learning researcher and senior web developer, I specialize in crafting end-to-end computational pipelines — from exploratory data analysis, mathematical feature formulation, and neural loss function design in <strong>Python & PyTorch</strong>, to deploying performant, accessible web interfaces that make complex data immediately actionable.
            </p>
            <p>
              My philosophy is simple: <em>an algorithm is only as impactful as its interpretability and reliability in production</em>. Whether architecting committee operations for university-wide technology summits or training convolutional and transformer networks, I approach every challenge with rigorous analytical depth.
            </p>
          </motion.div>

          {/* 3 Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-5 rounded-2xl bg-bg-surface/80 border border-white/10 backdrop-blur-md space-y-2.5 hover:border-cyan-primary/40 transition-colors"
            >
              <div className="p-2 w-fit rounded-xl bg-cyan-primary/10 text-cyan-glow">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-100 text-sm">Deep Learning & AI</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Formulating neural models, convolutional feature extractors, and classification benchmarks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl bg-bg-surface/80 border border-white/10 backdrop-blur-md space-y-2.5 hover:border-violet-primary/40 transition-colors"
            >
              <div className="p-2 w-fit rounded-xl bg-violet-primary/10 text-violet-glow">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-100 text-sm">High-Craft Web Dev</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Constructing modular frontend systems, fluid animations, custom canvas engines, and zero-layout-shift UIs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-5 rounded-2xl bg-bg-surface/80 border border-white/10 backdrop-blur-md space-y-2.5 hover:border-emerald-primary/40 transition-colors"
            >
              <div className="p-2 w-fit rounded-xl bg-emerald-primary/10 text-emerald-primary">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-100 text-sm">Quantitative Analytics</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Querying complex relational schemas (MySQL), data normalization, statistical inference, and hypothesis testing.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
