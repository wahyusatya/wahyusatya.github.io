import React, { useState } from 'react';
import { Activity, User, MapPin, GraduationCap, Sparkles } from 'lucide-react';

export const TechnicalWaveVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visual' | 'profile'>('profile');

  return (
    <div className="relative w-full aspect-[4/3] max-w-md mx-auto rounded-lg bg-bg-surface border border-hairline p-5 overflow-hidden flex flex-col justify-between select-none shadow-2xl">
      {/* Top Header & Tab Toggle */}
      <div className="flex items-center justify-between font-mono text-[10px] text-slate-dim border-b border-hairline/60 pb-2.5">
        <div className="flex items-center gap-1 bg-bg-ground p-0.5 rounded border border-hairline">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-bg-surface text-slate-text font-bold border border-hairline shadow-sm'
                : 'text-slate-dim hover:text-slate-muted'
            }`}
          >
            <User className="w-3 h-3 text-accent-primary" />
            <span>Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('visual')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all cursor-pointer ${
              activeTab === 'visual'
                ? 'bg-bg-surface text-slate-text font-bold border border-hairline shadow-sm'
                : 'text-slate-dim hover:text-slate-muted'
            }`}
          >
            <Activity className="w-3 h-3 text-accent-primary" />
            <span>Topology</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-muted uppercase">● RESEARCH LAB ACTIVE</span>
        </div>
      </div>

      {/* Main Display Area */}
      {activeTab === 'profile' ? (
        /* 1. AUTHENTIC RESEARCHER PROFILE CARD */
        <div className="flex-grow my-3 flex items-center gap-4 sm:gap-5 px-1">
          {/* Photo Frame */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border border-hairline bg-bg-ground shadow-md">
              <img
                src="./assets/about-pic.png"
                alt="Wahyu Satya"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full bg-bg-dark border border-hairline flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent-primary" />
            </div>
          </div>

          {/* Dossier Information */}
          <div className="space-y-1.5 flex-grow">
            <div>
              <div className="text-sm sm:text-base font-bold text-slate-text font-sans leading-tight">
                Wahyu Satya
              </div>
              <div className="text-[11px] font-mono text-accent-primary font-medium">
                Putu Wahyu Satya Giridharma
              </div>
            </div>

            <p className="text-[11px] text-slate-muted font-sans leading-relaxed line-clamp-2">
              Web Developer, Data Scientist, & Deep Learning Researcher.
            </p>

            <div className="space-y-0.5 pt-1 border-t border-hairline/40 font-mono text-[10px] text-slate-dim">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-3 h-3 text-accent-primary shrink-0" />
                <span className="truncate">Undiksha (B.Sc Info Systems)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-accent-primary shrink-0" />
                <span>Bali, Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2. SVG NEURAL WAVEFORM & NODE VISUALIZATION */
        <div className="relative flex-grow my-3 flex items-center justify-center">
          <svg
            viewBox="0 0 400 240"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="tech-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
              </pattern>
              <linearGradient id="wave-grad" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            <rect width="400" height="240" fill="url(#tech-grid)" />

            <line x1="20" y1="120" x2="380" y2="120" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="4 4" />

            {/* Hairline Connections */}
            <g stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.75">
              <line x1="50" y1="60" x2="130" y2="40" />
              <line x1="50" y1="60" x2="130" y2="90" />
              <line x1="50" y1="120" x2="130" y2="90" />
              <line x1="50" y1="120" x2="130" y2="150" />
              <line x1="50" y1="180" x2="130" y2="150" />
              <line x1="50" y1="180" x2="130" y2="200" />

              <line x1="130" y1="40" x2="210" y2="70" />
              <line x1="130" y1="90" x2="210" y2="70" />
              <line x1="130" y1="90" x2="210" y2="140" />
              <line x1="130" y1="150" x2="210" y2="140" />
              <line x1="130" y1="150" x2="210" y2="180" />
              <line x1="130" y1="200" x2="210" y2="180" />

              <line x1="210" y1="70" x2="300" y2="50" />
              <line x1="210" y1="70" x2="300" y2="110" />
              <line x1="210" y1="140" x2="300" y2="110" />
              <line x1="210" y1="140" x2="300" y2="170" />
              <line x1="210" y1="180" x2="300" y2="170" />

              <line x1="300" y1="50" x2="360" y2="120" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1" />
              <line x1="300" y1="110" x2="360" y2="120" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="1.2" />
              <line x1="300" y1="170" x2="360" y2="120" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1" />
            </g>

            {/* Continuous ECG Waveform */}
            <path
              d="M 20,120 L 70,120 L 85,105 L 95,135 L 110,120 L 140,120 L 155,75 L 170,175 L 185,50 L 200,140 L 215,110 L 230,120 L 270,120 L 285,100 L 305,135 L 320,120 L 380,120"
              stroke="url(#wave-grad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]"
            />

            {/* Nodes */}
            <circle cx="50" cy="60" r="3" fill="#090a0d" stroke="#60a5fa" strokeWidth="1.5" />
            <circle cx="50" cy="120" r="3.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
            <circle cx="50" cy="180" r="3" fill="#090a0d" stroke="#60a5fa" strokeWidth="1.5" />

            <circle cx="130" cy="40" r="3.5" fill="#090a0d" stroke="#9ca3af" strokeWidth="1.2" />
            <circle cx="130" cy="90" r="3.5" fill="#090a0d" stroke="#3b82f6" strokeWidth="1.5" />
            <circle cx="130" cy="150" r="3.5" fill="#090a0d" stroke="#3b82f6" strokeWidth="1.5" />
            <circle cx="130" cy="200" r="3.5" fill="#090a0d" stroke="#9ca3af" strokeWidth="1.2" />

            <circle cx="210" cy="70" r="4.5" fill="#090a0d" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="210" cy="140" r="4.5" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
            <circle cx="210" cy="180" r="4" fill="#090a0d" stroke="#60a5fa" strokeWidth="1.5" />

            <circle cx="300" cy="50" r="3.5" fill="#090a0d" stroke="#9ca3af" strokeWidth="1.2" />
            <circle cx="300" cy="110" r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="300" cy="170" r="3.5" fill="#090a0d" stroke="#9ca3af" strokeWidth="1.2" />

            <circle cx="360" cy="120" r="5.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>
      )}

      {/* Bottom Technical Readout Bar */}
      <div className="flex items-center justify-between font-mono text-[10px] text-slate-dim pt-2 border-t border-hairline/60">
        <div className="flex items-center gap-3">
          <span>SR: 250Hz</span>
          <span className="text-hairline">|</span>
          <span>PTB-XL + CHAPMAN</span>
        </div>
        <span className="text-accent-primary font-medium">1D-ViT PIPELINE</span>
      </div>
    </div>
  );
};
