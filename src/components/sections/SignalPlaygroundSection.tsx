import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Grid, Activity, BarChart3, Layers, Sliders, Info, ShieldAlert } from 'lucide-react';

type LeadId = 'I' | 'II' | 'III' | 'aVR' | 'aVL' | 'aVF' | 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6';
type ExperimentTab = 'distribution' | 'imbalance' | 'comparison' | 'metrics';

interface LeadProfile {
  id: LeadId;
  name: string;
  territory: string;
  pAmp: number;
  qAmp: number;
  rAmp: number;
  sAmp: number;
  tAmp: number;
  inverted?: boolean;
}

export const SignalPlaygroundSection: React.FC = () => {
  const [activeLead, setActiveLead] = useState<LeadId>('II');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(1.0);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [activeExperimentTab, setActiveExperimentTab] = useState<ExperimentTab>('distribution');
  const [decisionThreshold, setDecisionThreshold] = useState<number>(0.5);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);

  // 12 Standard Clinical Leads with Realistic Morphological Vector Profiles
  const leadProfiles: Record<LeadId, LeadProfile> = {
    'I': { id: 'I', name: 'Lead I', territory: 'Lateral (High)', pAmp: 0.15, qAmp: -0.05, rAmp: 0.8, sAmp: -0.1, tAmp: 0.25 },
    'II': { id: 'II', name: 'Lead II', territory: 'Inferior (Primary Rhythm)', pAmp: 0.25, qAmp: -0.1, rAmp: 1.4, sAmp: -0.2, tAmp: 0.35 },
    'III': { id: 'III', name: 'Lead III', territory: 'Inferior', pAmp: 0.1, qAmp: -0.15, rAmp: 0.7, sAmp: -0.15, tAmp: 0.15 },
    'aVR': { id: 'aVR', name: 'Lead aVR', territory: 'Right Cavity (Inverted)', pAmp: -0.2, qAmp: 0.1, rAmp: -1.1, sAmp: 0.2, tAmp: -0.3, inverted: true },
    'aVL': { id: 'aVL', name: 'Lead aVL', territory: 'Lateral (High)', pAmp: 0.1, qAmp: -0.05, rAmp: 0.6, sAmp: -0.1, tAmp: 0.2 },
    'aVF': { id: 'aVF', name: 'Lead aVF', territory: 'Inferior', pAmp: 0.2, qAmp: -0.1, rAmp: 1.0, sAmp: -0.15, tAmp: 0.3 },
    'V1': { id: 'V1', name: 'Lead V1', territory: 'Septal', pAmp: 0.1, qAmp: -0.02, rAmp: 0.3, sAmp: -1.2, tAmp: 0.15 },
    'V2': { id: 'V2', name: 'Lead V2', territory: 'Septal', pAmp: 0.15, qAmp: -0.05, rAmp: 0.6, sAmp: -1.4, tAmp: 0.25 },
    'V3': { id: 'V3', name: 'Lead V3', territory: 'Anterior (Transition)', pAmp: 0.18, qAmp: -0.08, rAmp: 1.0, sAmp: -0.9, tAmp: 0.3 },
    'V4': { id: 'V4', name: 'Lead V4', territory: 'Anterior', pAmp: 0.2, qAmp: -0.1, rAmp: 1.3, sAmp: -0.5, tAmp: 0.35 },
    'V5': { id: 'V5', name: 'Lead V5', territory: 'Lateral (Low)', pAmp: 0.22, qAmp: -0.1, rAmp: 1.5, sAmp: -0.2, tAmp: 0.4 },
    'V6': { id: 'V6', name: 'Lead V6', territory: 'Lateral (Low)', pAmp: 0.2, qAmp: -0.08, rAmp: 1.2, sAmp: -0.1, tAmp: 0.35 },
  };

  const currentProfile = leadProfiles[activeLead];

  // Mathematical synthetic ECG waveform generator based on cardiac vector parameters
  const generateEcgSample = (t: number, p: LeadProfile) => {
    // Cardiac cycle period: 0.85s (~70 BPM)
    const cycle = (t % 0.85) / 0.85;

    let v = 0;
    // P wave (Atrial depolarization): 0.10 - 0.22
    if (cycle > 0.10 && cycle < 0.22) {
      const ph = (cycle - 0.16) / 0.06;
      v += p.pAmp * Math.exp(-ph * ph * 4);
    }
    // Q wave: 0.28 - 0.32
    else if (cycle > 0.28 && cycle < 0.32) {
      const ph = (cycle - 0.30) / 0.02;
      v += p.qAmp * Math.exp(-ph * ph * 8);
    }
    // R peak (Ventricular depolarization): 0.32 - 0.38
    else if (cycle > 0.32 && cycle < 0.38) {
      const ph = (cycle - 0.35) / 0.02;
      v += p.rAmp * Math.exp(-ph * ph * 12);
    }
    // S wave: 0.38 - 0.42
    else if (cycle > 0.38 && cycle < 0.42) {
      const ph = (cycle - 0.40) / 0.02;
      v += p.sAmp * Math.exp(-ph * ph * 8);
    }
    // T wave (Ventricular repolarization): 0.52 - 0.72
    else if (cycle > 0.52 && cycle < 0.72) {
      const ph = (cycle - 0.62) / 0.09;
      v += p.tAmp * Math.exp(-ph * ph * 4);
    }

    // Baseline subtle noise
    const noise = Math.sin(t * 50) * 0.015 + Math.sin(t * 120) * 0.008;
    return v + noise;
  };

  // Render ECG Waveform on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Millimeter ECG Grid
      if (showGrid) {
        // Small grid (1mm = 0.04s)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 0.5;
        const smallStep = 10 * zoom;
        for (let x = 0; x < width; x += smallStep) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += smallStep) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Major grid (5mm = 0.20s)
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
        ctx.lineWidth = 1;
        const majorStep = 50 * zoom;
        for (let x = 0; x < width; x += majorStep) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += majorStep) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // 2. Draw Zero Voltage Baseline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Draw Continuous ECG Voltage Trace
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2.2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();

      const timeSpan = 3.0 / zoom; // seconds visible on screen
      const stepPixels = 1.5;
      const totalPoints = Math.ceil(width / stepPixels);

      for (let i = 0; i <= totalPoints; i++) {
        const x = i * stepPixels;
        const t = offsetRef.current + (i / totalPoints) * timeSpan;
        const voltage = generateEcgSample(t, currentProfile);
        const y = centerY - voltage * 65 * zoom;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 4. Draw Sweeping Scanline Indicator
      const sweepX = (offsetRef.current * 80) % width;
      const grad = ctx.createLinearGradient(sweepX - 40, 0, sweepX, 0);
      grad.addColorStop(0, 'rgba(59, 130, 246, 0)');
      grad.addColorStop(1, 'rgba(59, 130, 246, 0.25)');
      ctx.fillStyle = grad;
      ctx.fillRect(Math.max(0, sweepX - 40), 0, 40, height);

      // Advance time if playing
      if (isPlaying) {
        offsetRef.current += 0.008;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeLead, isPlaying, zoom, showGrid, currentProfile]);

  return (
    <section id="lab" className="py-24 border-b border-hairline bg-bg-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-accent-primary">
            <span className="uppercase tracking-widest">INTERACTIVE LAB & DATA EXPLORER</span>
            <span className="text-slate-dim">•</span>
            <span className="px-2 py-0.5 rounded bg-bg-surface border border-hairline text-[10px] text-emerald-400">
              ● Synthetic Educational Signal
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-text tracking-tight">
            12-Lead Signal Playground & Experimental Data
          </h2>
          <p className="text-sm text-slate-muted max-w-2xl font-sans">
            Explore synthetic 12-lead cardiac wave trajectories, lead groupings, dataset distributions, and simulated multi-label classification metrics.
          </p>
        </div>

        {/* 1. SIGNAL PLAYGROUND CONTAINER */}
        <div className="rounded-lg bg-bg-surface border border-hairline overflow-hidden mb-16 shadow-2xl">
          {/* Waveform Header Telemetry */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-bg-ground border-b border-hairline font-mono text-xs">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-accent-primary animate-pulse" />
              <div>
                <span className="font-bold text-slate-text">{currentProfile.name}</span>
                <span className="text-slate-dim text-[11px] ml-2">
                  // {currentProfile.territory} Territory
                </span>
              </div>
            </div>

            {/* Static Telemetry Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-slate-dim text-[10px]">
              <span>SAMPLE RATE: 500 Hz</span>
              <span className="text-hairline">|</span>
              <span>WINDOW: 10.0s (5,000 pts)</span>
              <span className="text-hairline">|</span>
              <span className="text-accent-primary">12-LEAD TIME-SERIES</span>
            </div>
          </div>

          {/* Interactive HTML5 Canvas Waveform */}
          <div className="relative w-full h-64 sm:h-72 bg-bg-ground overflow-hidden">
            <canvas
              ref={canvasRef}
              width={1000}
              height={300}
              className="w-full h-full block cursor-crosshair"
            />

            {/* Educational Disclaimer Watermark */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-bg-dark/80 border border-hairline font-mono text-[10px] text-slate-dim backdrop-blur-sm">
              DEMO / SYNTHETIC RESEARCH WAVEFORM
            </div>
          </div>

          {/* Playground Control Bar */}
          <div className="p-4 sm:p-6 bg-bg-surface border-t border-hairline space-y-4">
            {/* 12-Lead Switcher Buttons */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-dim">
                <span className="uppercase">Select Clinical Lead (12 Channels):</span>
                <span>Active: {currentProfile.id}</span>
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 font-mono text-xs">
                {(Object.keys(leadProfiles) as LeadId[]).map((lead) => (
                  <button
                    key={lead}
                    onClick={() => setActiveLead(lead)}
                    className={`py-1.5 rounded transition-all cursor-pointer text-center ${
                      activeLead === lead
                        ? 'bg-accent-primary text-white font-bold shadow-sm'
                        : 'bg-bg-ground text-slate-muted hover:text-slate-text border border-hairline'
                    }`}
                  >
                    {lead}
                  </button>
                ))}
              </div>
            </div>

            {/* Playback & View Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-hairline/40 font-mono text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-ground hover:bg-bg-elevated border border-hairline text-slate-text transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-accent-primary" /> : <Play className="w-3.5 h-3.5 text-accent-primary" />}
                  <span>{isPlaying ? 'Pause' : 'Resume'}</span>
                </button>

                <button
                  onClick={() => {
                    offsetRef.current = 0;
                    setZoom(1.0);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-ground hover:bg-bg-elevated border border-hairline text-slate-dim hover:text-slate-text transition-colors cursor-pointer"
                  title="Reset viewport"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-bg-ground p-1 rounded border border-hairline">
                  <button
                    onClick={() => setZoom((z) => Math.max(0.75, +(z - 0.25).toFixed(2)))}
                    className="p-1 text-slate-dim hover:text-slate-text cursor-pointer"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1 text-[11px] text-slate-muted">{zoom.toFixed(1)}x</span>
                  <button
                    onClick={() => setZoom((z) => Math.min(2.0, +(z + 0.25).toFixed(2)))}
                    className="p-1 text-slate-dim hover:text-slate-text cursor-pointer"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Grid Toggle */}
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border transition-colors cursor-pointer ${
                    showGrid
                      ? 'bg-accent-primary/10 border-accent-primary/40 text-accent-primary'
                      : 'bg-bg-ground border-hairline text-slate-dim hover:text-slate-muted'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span className="text-[11px]">ECG Grid</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. DATA & EXPERIMENTS DASHBOARD */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">
                EMPIRICAL METRICS & BENCHMARKS
              </span>
              <h3 className="text-xl font-bold text-slate-text">
                Dataset Telemetry & Model Evaluation
              </h3>
            </div>

            {/* Experiment Tabs */}
            <div className="flex items-center gap-1 bg-bg-surface p-1 rounded border border-hairline font-mono text-xs shrink-0">
              <button
                onClick={() => setActiveExperimentTab('distribution')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  activeExperimentTab === 'distribution'
                    ? 'bg-bg-ground text-slate-text font-bold border border-hairline'
                    : 'text-slate-dim hover:text-slate-muted'
                }`}
              >
                Distribution
              </button>
              <button
                onClick={() => setActiveExperimentTab('imbalance')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  activeExperimentTab === 'imbalance'
                    ? 'bg-bg-ground text-slate-text font-bold border border-hairline'
                    : 'text-slate-dim hover:text-slate-muted'
                }`}
              >
                Imbalance
              </button>
              <button
                onClick={() => setActiveExperimentTab('comparison')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  activeExperimentTab === 'comparison'
                    ? 'bg-bg-ground text-slate-text font-bold border border-hairline'
                    : 'text-slate-dim hover:text-slate-muted'
                }`}
              >
                Comparison
              </button>
              <button
                onClick={() => setActiveExperimentTab('metrics')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  activeExperimentTab === 'metrics'
                    ? 'bg-bg-ground text-slate-text font-bold border border-hairline'
                    : 'text-slate-dim hover:text-slate-muted'
                }`}
              >
                Threshold Simulator
              </button>
            </div>
          </div>

          {/* Interactive Experiment Content Area */}
          <div className="p-6 sm:p-8 rounded-lg bg-bg-surface border border-hairline">
            {/* TAB 1: DATASET DISTRIBUTION */}
            {activeExperimentTab === 'distribution' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-hairline/60 pb-3">
                  <h4 className="text-sm font-bold text-slate-text font-mono">
                    PTB-XL vs. Chapman-Shaoxing Clinical Cohort Distribution
                  </h4>
                  <span className="font-mono text-[10px] text-slate-dim">N = 32,483 TOTAL RECORDS</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* PTB-XL Distribution Bar */}
                  <div className="p-5 rounded bg-bg-ground border border-hairline/60 space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-slate-text font-semibold">PTB-XL (Primary Benchmark)</span>
                      <span className="text-accent-primary font-bold">21,837 Records</span>
                    </div>
                    {/* Visual Segmented Bar */}
                    <div className="h-3 w-full rounded-full overflow-hidden bg-bg-surface flex">
                      <div className="bg-accent-primary h-full w-[80%]" title="Train: 80%" />
                      <div className="bg-sky-400 h-full w-[10%]" title="Val: 10%" />
                      <div className="bg-indigo-400 h-full w-[10%]" title="Test: 10%" />
                    </div>
                    <div className="flex justify-between font-mono text-[10px] text-slate-dim">
                      <span>Train: 17,441 (80%)</span>
                      <span>Val: 2,184 (10%)</span>
                      <span>Test: 2,212 (10%)</span>
                    </div>
                    <p className="text-xs text-slate-muted leading-relaxed font-sans pt-1">
                      Standardized 10-fold stratified split. Each patient is strictly isolated to prevent data leakage across train and test partitions.
                    </p>
                  </div>

                  {/* Chapman-Shaoxing Distribution Bar */}
                  <div className="p-5 rounded bg-bg-ground border border-hairline/60 space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-slate-text font-semibold">Chapman-Shaoxing (External Cohort)</span>
                      <span className="text-sky-400 font-bold">10,646 Records</span>
                    </div>
                    {/* Visual Segmented Bar */}
                    <div className="h-3 w-full rounded-full overflow-hidden bg-bg-surface flex">
                      <div className="bg-sky-500 h-full w-[100%]" title="Zero-Shot Generalization: 100%" />
                    </div>
                    <div className="flex justify-between font-mono text-[10px] text-slate-dim">
                      <span>Zero-Shot Generalization Test Cohort</span>
                      <span>500 Hz Sampling</span>
                    </div>
                    <p className="text-xs text-slate-muted leading-relaxed font-sans pt-1">
                      Independent clinical demographic cohort used exclusively for cross-institution robustness evaluation under domain shift.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CLASS IMBALANCE */}
            {activeExperimentTab === 'imbalance' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-hairline/60 pb-3">
                  <h4 className="text-sm font-bold text-slate-text font-mono">
                    PTB-XL Diagnostic Superclass Imbalance & Frequency
                  </h4>
                  <span className="font-mono text-[10px] text-accent-primary">FOCAL LOSS REGULARIZATION</span>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'NORM (Normal Sinus Rhythm)', count: 9528, pct: 43.6, color: 'bg-emerald-500' },
                    { label: 'MI (Myocardial Infarction)', count: 5486, pct: 25.1, color: 'bg-red-500' },
                    { label: 'STTC (ST/T-wave Change)', count: 5250, pct: 24.0, color: 'bg-amber-500' },
                    { label: 'CD (Conduction Disturbance)', count: 4907, pct: 22.4, color: 'bg-accent-primary' },
                    { label: 'HYP (Ventricular/Atrial Hypertrophy)', count: 2655, pct: 12.1, color: 'bg-purple-500' },
                  ].map((cls, i) => (
                    <div key={i} className="p-3.5 rounded bg-bg-ground border border-hairline/60 space-y-1.5">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-slate-text font-medium">{cls.label}</span>
                        <span className="text-slate-dim text-[11px]">{cls.count.toLocaleString()} cases ({cls.pct}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-bg-surface overflow-hidden">
                        <div className={`h-full ${cls.color}`} style={{ width: `${cls.pct * 2}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-muted font-sans leading-relaxed">
                  Notice that minority subclasses (e.g. Hypertrophy and multi-label co-occurrences) represent less than 15% of cases, motivating the design of our asymmetric multi-label loss function.
                </p>
              </div>
            )}

            {/* TAB 3: MODEL COMPARISON */}
            {activeExperimentTab === 'comparison' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-hairline/60 pb-3">
                  <h4 className="text-sm font-bold text-slate-text font-mono">
                    Baseline Architectures & Target Telemetry
                  </h4>
                  <span className="font-mono text-[10px] text-slate-dim">BENCHMARK COMPARISON</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-hairline text-slate-dim text-[10px]">
                        <th className="py-2.5 pr-4">ARCHITECTURE</th>
                        <th className="py-2.5 px-4">PARAMS</th>
                        <th className="py-2.5 px-4">INFERENCE (GPU)</th>
                        <th className="py-2.5 px-4">TARGET METRIC</th>
                        <th className="py-2.5 pl-4">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hairline/40 text-slate-muted">
                      <tr>
                        <td className="py-3 pr-4 font-semibold text-slate-text">1D-CNN (ResNet-1D Baseline)</td>
                        <td className="py-3 px-4">4.2M</td>
                        <td className="py-3 px-4">12 ms</td>
                        <td className="py-3 px-4">Macro AUC: 0.925</td>
                        <td className="py-3 pl-4 text-emerald-400">Baseline</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-semibold text-slate-text">Bi-LSTM Temporal Model</td>
                        <td className="py-3 px-4">2.8M</td>
                        <td className="py-3 px-4">38 ms</td>
                        <td className="py-3 px-4">Macro AUC: 0.898</td>
                        <td className="py-3 pl-4 text-slate-dim">Baseline</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-semibold text-slate-text">Spectrogram 2D-ResNet</td>
                        <td className="py-3 px-4">11.4M</td>
                        <td className="py-3 px-4">26 ms</td>
                        <td className="py-3 px-4">Macro AUC: 0.914</td>
                        <td className="py-3 pl-4 text-slate-dim">Baseline</td>
                      </tr>
                      <tr className="bg-bg-ground">
                        <td className="py-3 pr-4 font-bold text-accent-primary">1D-Vision Transformer (Ours)</td>
                        <td className="py-3 px-4 font-medium text-slate-text">1.8M (Lightweight)</td>
                        <td className="py-3 px-4 font-medium text-slate-text">14 ms</td>
                        <td className="py-3 px-4 font-bold text-accent-primary">Target: &gt;0.935</td>
                        <td className="py-3 pl-4 text-accent-primary font-bold">In Progress</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-3 rounded bg-bg-ground border border-hairline/60 font-mono text-[10px] text-slate-dim flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-accent-primary shrink-0" />
                  <span>Baselines established on standard PTB-XL literature benchmarks; 1D-ViT validation is actively exploring patch lengths.</span>
                </div>
              </div>
            )}

            {/* TAB 4: THRESHOLD SIMULATOR */}
            {activeExperimentTab === 'metrics' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-hairline/60 pb-3">
                  <h4 className="text-sm font-bold text-slate-text font-mono">
                    Multi-Label Sigmoid Decision Threshold Simulator
                  </h4>
                  <span className="font-mono text-[10px] text-accent-primary">
                    THRESHOLD: {decisionThreshold.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-xs text-slate-dim">
                      <span>Adjust Decision Threshold ($\tau$):</span>
                      <span className="text-slate-text font-bold">{decisionThreshold.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.10"
                      max="0.90"
                      step="0.05"
                      value={decisionThreshold}
                      onChange={(e) => setDecisionThreshold(parseFloat(e.target.value))}
                      className="w-full accent-accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-slate-dim">
                      <span>0.10 (High Sensitivity / Recall)</span>
                      <span>0.50 (Balanced Standard)</span>
                      <span>0.90 (High Specificity / Precision)</span>
                    </div>
                  </div>

                  {/* Simulated Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded bg-bg-ground border border-hairline/60 space-y-1 font-mono text-xs">
                      <div className="text-[10px] text-slate-dim uppercase">Simulated Sensitivity (Recall)</div>
                      <div className="text-lg font-bold text-slate-text">
                        {(Math.min(0.98, 0.85 + (0.5 - decisionThreshold) * 0.25) * 100).toFixed(1)}%
                      </div>
                      <p className="text-[10px] text-slate-dim font-sans">Ventricular anomaly detection capture rate.</p>
                    </div>

                    <div className="p-4 rounded bg-bg-ground border border-hairline/60 space-y-1 font-mono text-xs">
                      <div className="text-[10px] text-slate-dim uppercase">Simulated Specificity</div>
                      <div className="text-lg font-bold text-slate-text">
                        {(Math.min(0.99, 0.88 + (decisionThreshold - 0.5) * 0.22) * 100).toFixed(1)}%
                      </div>
                      <p className="text-[10px] text-slate-dim font-sans">Normal rhythm false-positive suppression.</p>
                    </div>

                    <div className="p-4 rounded bg-bg-ground border border-hairline/60 space-y-1 font-mono text-xs">
                      <div className="text-[10px] text-slate-dim uppercase">Simulated F1-Score</div>
                      <div className="text-lg font-bold text-accent-primary">
                        {(Math.max(0.80, 0.91 - Math.abs(decisionThreshold - 0.45) * 0.18) * 100).toFixed(1)}%
                      </div>
                      <p className="text-[10px] text-slate-dim font-sans">Harmonic balance of precision and recall.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
