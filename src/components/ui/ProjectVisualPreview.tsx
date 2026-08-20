import React from 'react';

interface ProjectVisualPreviewProps {
  type: 'vision-anomaly' | 'canvas-engine' | 'data-telemetry' | 'ecg-vit';
}

export const ProjectVisualPreview: React.FC<ProjectVisualPreviewProps> = ({ type }) => {
  if (type === 'ecg-vit') {
    return (
      <div className="w-full h-full min-h-[160px] bg-bg-ground border border-hairline/60 rounded p-3 flex flex-col justify-between font-mono text-[10px] select-none">
        <div className="flex items-center justify-between text-slate-dim border-b border-hairline/40 pb-1.5">
          <span className="text-accent-primary">TOPOLOGY: 1D-ViT ENCODER</span>
          <span>PATCHES: 16</span>
        </div>
        <svg viewBox="0 0 320 90" className="w-full h-16 overflow-visible">
          <path
            d="M 10,45 L 60,45 L 75,30 L 85,60 L 95,45 L 120,45 L 135,15 L 150,75 L 165,5 L 180,55 L 195,35 L 210,45 L 250,45 L 265,30 L 280,55 L 295,45 L 310,45"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Patch Token Boxes */}
          {[20, 60, 100, 140, 180, 220, 260].map((x, i) => (
            <rect
              key={i}
              x={x}
              y={75}
              width={28}
              height={10}
              rx={2}
              fill="rgba(59, 130, 246, 0.15)"
              stroke="rgba(59, 130, 246, 0.4)"
              strokeWidth="0.8"
            />
          ))}
        </svg>
        <div className="flex items-center justify-between text-[10px] text-slate-dim pt-1 border-t border-hairline/40">
          <span>SAMPLING: 250Hz</span>
          <span className="text-accent-primary">ATTN HEADS: 8</span>
        </div>
      </div>
    );
  }

  if (type === 'vision-anomaly') {
    return (
      <div className="w-full h-full min-h-[160px] bg-bg-ground border border-hairline/60 rounded p-3 flex flex-col justify-between font-mono text-[10px] select-none">
        <div className="flex items-center justify-between text-slate-dim border-b border-hairline/40 pb-1.5">
          <span className="text-accent-primary">SEGMENTATION: RESNET+U-NET</span>
          <span>mIoU: 0.892</span>
        </div>
        <div className="grid grid-cols-2 gap-2 my-1 flex-grow items-center">
          {/* Input Feature Matrix */}
          <div className="h-16 bg-bg-surface border border-hairline/60 rounded p-1.5 flex flex-col justify-between">
            <span className="text-[10px] text-slate-dim">INPUT TENSOR (512x512)</span>
            <div className="w-full h-8 bg-bg-dark rounded border border-hairline/40 flex items-center justify-center">
              <span className="text-[10px] text-slate-dim font-mono">[ 3, 512, 512 ]</span>
            </div>
          </div>
          {/* Output Defect Mask */}
          <div className="h-16 bg-bg-surface border border-hairline/60 rounded p-1.5 flex flex-col justify-between">
            <span className="text-[10px] text-accent-primary">ANOMALY MASK</span>
            <div className="w-full h-8 bg-bg-dark rounded border border-accent-primary/40 flex items-center justify-center relative overflow-hidden">
              <div className="w-4 h-4 rounded-full bg-accent-primary/30 border border-accent-primary animate-pulse" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-dim pt-1 border-t border-hairline/40">
          <span>PRECISION: 98.6%</span>
          <span className="text-accent-primary">INFERENCE: 18ms</span>
        </div>
      </div>
    );
  }

  if (type === 'canvas-engine') {
    return (
      <div className="w-full h-full min-h-[160px] bg-bg-ground border border-hairline/60 rounded p-3 flex flex-col justify-between font-mono text-[10px] select-none">
        <div className="flex items-center justify-between text-slate-dim border-b border-hairline/40 pb-1.5">
          <span className="text-accent-primary">CANVAS ENGINE // RAF LOOP</span>
          <span>60 FPS</span>
        </div>
        <svg viewBox="0 0 320 80" className="w-full h-16 overflow-visible my-1">
          {/* Interconnected Canvas Node Network */}
          <g stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.8">
            <line x1="40" y1="20" x2="100" y2="50" />
            <line x1="100" y1="50" x2="160" y2="25" />
            <line x1="100" y1="50" x2="140" y2="70" />
            <line x1="160" y1="25" x2="220" y2="40" />
            <line x1="140" y1="70" x2="220" y2="40" />
            <line x1="220" y1="40" x2="280" y2="60" />
            <line x1="220" y1="40" x2="270" y2="20" />
          </g>
          {/* Particle Node Dots */}
          {[
            { x: 40, y: 20 },
            { x: 100, y: 50, active: true },
            { x: 160, y: 25 },
            { x: 140, y: 70 },
            { x: 220, y: 40, active: true },
            { x: 280, y: 60 },
            { x: 270, y: 20 },
          ].map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={pt.active ? 4.5 : 3}
              fill={pt.active ? '#3b82f6' : '#090a0d'}
              stroke={pt.active ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'}
              strokeWidth="1.2"
            />
          ))}
        </svg>
        <div className="flex items-center justify-between text-[10px] text-slate-dim pt-1 border-t border-hairline/40">
          <span>ACTIVE NODES: 1,000+</span>
          <span className="text-accent-primary">CLS: 0.00</span>
        </div>
      </div>
    );
  }

  // data-telemetry
  return (
    <div className="w-full h-full min-h-[160px] bg-bg-ground border border-hairline/60 rounded p-3 flex flex-col justify-between font-mono text-[10px] select-none">
      <div className="flex items-center justify-between text-slate-dim border-b border-hairline/40 pb-1.5">
        <span className="text-accent-primary">TELEMETRY // ENSEMBLE CLASSIFIER</span>
        <span>AUC: 0.941</span>
      </div>
      <svg viewBox="0 0 320 80" className="w-full h-16 overflow-visible my-1">
        {/* ROC Reference Diagonal */}
        <line x1="20" y1="70" x2="300" y2="10" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
        {/* High-Performance ROC Curve */}
        <path
          d="M 20,70 Q 30,15 300,10"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* AUC Shaded Region */}
        <path
          d="M 20,70 Q 30,15 300,10 L 300,70 Z"
          fill="rgba(59, 130, 246, 0.08)"
        />
      </svg>
      <div className="flex items-center justify-between text-[10px] text-slate-dim pt-1 border-t border-hairline/40">
        <span>F1-SCORE: 0.912</span>
        <span className="text-accent-primary">SCHEMA: 3NF RELATIONAL</span>
      </div>
    </div>
  );
};
