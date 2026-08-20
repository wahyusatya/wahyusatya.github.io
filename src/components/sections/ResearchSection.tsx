import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, HelpCircle, GitBranch, ArrowRight, Eye, ShieldCheck, Sparkles } from 'lucide-react';

interface ArchitectureNode {
  id: string;
  stage: string;
  name: string;
  summary: string;
  technicalSpecs: {
    inputTensor: string;
    outputTensor: string;
    operation: string;
    keyHyperparameters: string;
  };
  details: string;
}

interface ResearchQuestion {
  id: string;
  number: string;
  topic: string;
  question: string;
  hypothesis: string;
  status: 'Research' | 'In Progress' | 'Exploring' | 'Planned';
  methodology: string;
  metricTarget: string;
}

export const ResearchSection: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('lead-grouping');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('rq-1');

  const architectureNodes: ArchitectureNode[] = [
    {
      id: '12-lead-ecg',
      stage: '01',
      name: '12-Lead ECG Input',
      summary: 'Raw continuous 12-channel electrocardiac voltage potentials.',
      technicalSpecs: {
        inputTensor: '[ B, 12, 2500 ] (10s @ 250Hz)',
        outputTensor: '[ B, 12, 2500 ] normalized',
        operation: 'Butterworth Bandpass (0.5-45Hz) + Z-score scaling',
        keyHyperparameters: 'Sampling: 250Hz • Leads: I, II, III, aVR, aVL, aVF, V1-V6',
      },
      details:
        'Standard 12-lead clinical ECG recordings captured across 10-second intervals from PTB-XL and Chapman-Shaoxing datasets. Signals are filtered to remove baseline wander and high-frequency EMG muscle artifacts without truncating high-frequency QRS morphological peaks.',
    },
    {
      id: 'lead-grouping',
      stage: '02',
      name: 'Anatomical Lead Grouping',
      summary: 'Partitioning leads into physiological and coronary anatomical territories.',
      technicalSpecs: {
        inputTensor: '[ B, 12, 2500 ]',
        outputTensor: '4 Anatomical Sets: Inferior, Lateral, Septal, Anterior',
        operation: 'Spatial coordinate mapping based on myocardial vectors',
        keyHyperparameters: 'Inferior: (II, III, aVF) • Lateral: (I, aVL, V5, V6) • Septal: (V1, V2) • Anterior: (V3, V4)',
      },
      details:
        'Instead of concatenating all 12 channels into an arbitrary uniform tensor, leads are explicitly organized into anatomical territories. This preserves local cardiac electro-vector relationships (e.g. ST elevation localized to inferior myocardial walls).',
    },
    {
      id: 'patch-embedding',
      stage: '03',
      name: '1D Patch Embedding',
      summary: 'Temporal tokenization mapping 1D waveform segments to embedding space.',
      technicalSpecs: {
        inputTensor: '[ B, G, L_sub, T ] where T = 2500',
        outputTensor: '[ B, N_tokens, d_model ] where d_model = 128',
        operation: '1D Strided Conv / Linear Projection + 1D Learnable Positional Embeddings',
        keyHyperparameters: 'Patch Length (P): 16 samples • Stride: 16 • Tokens (N): 156 per lead',
      },
      details:
        'Each grouped lead waveform is decomposed into non-overlapping temporal patches of length P=16 (corresponding to 64ms windows). A learnable linear projection maps each patch into a continuous d_model=128 vector space, augmented with 1D learnable position embeddings to retain temporal cadence.',
    },
    {
      id: 'transformer-encoder',
      stage: '04',
      name: 'Transformer Encoder',
      summary: 'Multi-head self-attention extracting intra-lead & inter-lead correlations.',
      technicalSpecs: {
        inputTensor: '[ B, N_tokens + 1, 128 ] with prepended [CLS]',
        outputTensor: '[ B, N_tokens + 1, 128 ] latent representations',
        operation: '6x Transformer Blocks (MHSA + LayerNorm + GELU MLP + Residuals)',
        keyHyperparameters: 'Layers: 6 • Attention Heads: 8 • MLP Ratio: 4x (512-dim) • Dropout: 0.1',
      },
      details:
        'The core 1D-ViT encoder processes the sequence of patch tokens. Multi-Head Self-Attention dynamically weights long-range morphological dependencies across the P-Q-R-S-T wave cycle without suffering from recurrent step-by-step memory bottlenecks.',
    },
    {
      id: 'multi-label-pred',
      stage: '05',
      name: 'Multi-Label Prediction',
      summary: 'Multi-target sigmoid classification of co-occurring cardiac pathologies.',
      technicalSpecs: {
        inputTensor: '[CLS] Token Vector [ B, 128 ]',
        outputTensor: 'Class Probability Vector [ B, C_classes ] (Sigmoid)',
        operation: 'Multi-Layer Perceptron Head + Asymmetric Focal Loss',
        keyHyperparameters: 'Classes: MI, STTC, CD, HYP, NORM (PTB-XL Diagnostic Subclasses)',
      },
      details:
        'The extracted [CLS] token is passed through a dense classification head. Because clinical ECGs frequently exhibit multiple simultaneous diagnostic findings (e.g. Atrial Fibrillation combined with Left Bundle Branch Block), binary cross-entropy with asymmetric focal weighting is employed.',
    },
  ];

  const researchQuestions: ResearchQuestion[] = [
    {
      id: 'rq-1',
      number: 'RQ-01',
      topic: 'Anatomical Lead Grouping',
      question:
        'How does anatomical lead partitioning compare to unconstrained 12-channel flattening in isolating regional cardiac pathology?',
      hypothesis:
        'Explicitly grouping leads into Inferior (II, III, aVF), Lateral (I, aVL, V5, V6), Septal (V1, V2), and Anterior (V3, V4) subsets constrains the attention search space, accelerating convergence and improving localization of localized myocardial infarctions.',
      status: 'In Progress',
      methodology: 'Ablation benchmarking: Grouped Attention vs. Full 12-lead dense cross-attention on PTB-XL.',
      metricTarget: 'Target: >2.5% improvement in localized MI Macro-F1',
    },
    {
      id: 'rq-2',
      number: 'RQ-02',
      topic: 'Cross-Dataset Generalization',
      question:
        'Can a 1D-Vision Transformer maintain high multi-label diagnostic recall under hospital-level demographic and hardware distribution shift?',
      hypothesis:
        'Global self-attention over continuous patch tokens captures invariant morphological relationships (e.g. ST-elevation ratio to R-peak) more robustly than localized convolutional filters when transferred zero-shot from PTB-XL to Chapman-Shaoxing.',
      status: 'Exploring',
      methodology: 'Zero-shot evaluation protocol on Chapman-Shaoxing without target domain fine-tuning.',
      metricTarget: 'Target: <4.0% drop in Macro-AUC under zero-shot transfer',
    },
    {
      id: 'rq-3',
      number: 'RQ-03',
      topic: 'Attention Saliency & Clinical Interpretability',
      question:
        'Do self-attention heads learn to align with established clinical wave fiducials (P, QRS, ST, T) without supervised wave-boundary annotations?',
      hypothesis:
        'Deeper transformer heads will exhibit high attention weights coinciding with the QRS complex and ST-segment during ischemic events, providing built-in clinical explainability without manual segmentation masks.',
      status: 'Research',
      methodology: 'Attention rollout visualization overlaid on raw 1D lead traces during abnormal cardiac cycles.',
      metricTarget: 'Target: Qualitatively aligned attention peaks on 5 major arrhythmia subclasses',
    },
    {
      id: 'rq-4',
      number: 'RQ-04',
      topic: 'Temporal Patch Granularity (P)',
      question:
        'What is the optimal temporal patch length (P) that balances morphological feature fidelity with quadratic attention complexity?',
      hypothesis:
        'A patch length of P=16 samples (64ms at 250Hz) provides the ideal Nyquist-compatible window to capture the rapid dV/dt deflection of R-peaks while keeping sequence length N <= 160 tokens per lead.',
      status: 'Planned',
      methodology: 'Systematic grid sweep of P in {8, 16, 32, 64} on NVIDIA Tensor Core GPUs measuring latency vs. F1.',
      metricTarget: 'Target: Sub-15ms GPU inference @ optimal F1 trade-off',
    },
  ];

  const activeNode = architectureNodes.find((n) => n.id === activeNodeId) || architectureNodes[1];
  const activeQuestion = researchQuestions.find((q) => q.id === selectedQuestionId) || researchQuestions[0];

  const getStatusColor = (status: ResearchQuestion['status']) => {
    switch (status) {
      case 'In Progress':
        return 'text-accent-primary border-accent-primary/40 bg-accent-primary/10';
      case 'Research':
        return 'text-sky-400 border-sky-400/40 bg-sky-400/10';
      case 'Exploring':
        return 'text-amber-400 border-amber-400/40 bg-amber-400/10';
      case 'Planned':
        return 'text-slate-dim border-hairline bg-bg-ground';
    }
  };

  return (
    <section id="research" className="py-24 border-b border-hairline bg-bg-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Eyebrow & Headline */}
        <div className="mb-14 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">
              LEAD INVESTIGATION // CLINICAL AI RESEARCH
            </span>
            <span className="text-slate-dim">•</span>
            <span className="px-2 py-0.5 rounded bg-bg-surface border border-hairline font-mono text-[10px] text-accent-primary">
              Active Research
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-text tracking-tight">
            Anatomically Grouped 1D-Vision Transformer for Multi-Label ECG Classification
          </h2>
          <p className="text-sm sm:text-base text-slate-muted max-w-3xl font-sans leading-relaxed">
            Investigating a pure 1D Vision Transformer architecture that combines physiological lead grouping with multi-head self-attention to model long-range morphological dependencies in clinical 12-lead electrocardiac time-series.
          </p>
        </div>

        {/* 1. INTERACTIVE ARCHITECTURE TOPOLOGY */}
        <div className="mb-16 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-slate-dim border-b border-hairline/60 pb-3">
            <span className="text-slate-text font-semibold uppercase tracking-wider">
              Interactive System Topology
            </span>
            <span className="text-[11px] text-accent-primary">
              Click or hover any pipeline node to inspect tensor dimensions
            </span>
          </div>

          {/* Node Pipeline Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {architectureNodes.map((node) => {
              const isActive = activeNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  className={`p-4 rounded-lg text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 border ${
                    isActive
                      ? 'bg-bg-elevated border-accent-primary shadow-lg'
                      : 'bg-bg-surface border-hairline hover:border-subtle hover:bg-bg-elevated'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className={isActive ? 'text-accent-primary font-bold' : 'text-slate-dim'}>
                      {node.stage}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                    )}
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-slate-text leading-tight font-sans">
                    {node.name}
                  </div>
                  <div className="text-[10px] text-slate-dim font-mono line-clamp-1">
                    {node.technicalSpecs.operation}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Node Inspector Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="p-6 sm:p-8 rounded-lg bg-bg-surface border border-hairline space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline/60 pb-3">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-accent-primary font-bold">NODE {activeNode.stage}</span>
                  <span className="text-slate-dim">/</span>
                  <span className="text-slate-text font-bold">{activeNode.name}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-dim uppercase">
                  {activeNode.summary}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-sans max-w-3xl">
                {activeNode.details}
              </p>

              {/* Technical Telemetry Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded bg-bg-ground border border-hairline/60 space-y-1 font-mono text-xs">
                  <div className="text-[10px] text-slate-dim uppercase">Input Tensor</div>
                  <div className="text-slate-text text-[11px] font-medium">{activeNode.technicalSpecs.inputTensor}</div>
                </div>

                <div className="p-3 rounded bg-bg-ground border border-hairline/60 space-y-1 font-mono text-xs">
                  <div className="text-[10px] text-slate-dim uppercase">Output Tensor</div>
                  <div className="text-accent-primary text-[11px] font-medium">{activeNode.technicalSpecs.outputTensor}</div>
                </div>

                <div className="p-3 rounded bg-bg-ground border border-hairline/60 space-y-1 font-mono text-xs">
                  <div className="text-[10px] text-slate-dim uppercase">Mathematical Operation</div>
                  <div className="text-slate-text text-[11px] font-medium">{activeNode.technicalSpecs.operation}</div>
                </div>

                <div className="p-3 rounded bg-bg-ground border border-hairline/60 space-y-1 font-mono text-xs">
                  <div className="text-[10px] text-slate-dim uppercase">Key Parameters</div>
                  <div className="text-slate-muted text-[11px] font-medium">{activeNode.technicalSpecs.keyHyperparameters}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 2. ONGOING EXPERIMENTS & RESEARCH QUESTIONS LEDGER */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline/60 pb-3">
            <div className="space-y-1">
              <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">
                SCIENTIFIC INQUIRY & HYPOTHESIS TESTING
              </span>
              <h3 className="text-xl font-bold text-slate-text font-sans">
                Ongoing Research Questions
              </h3>
            </div>
            <span className="font-mono text-xs text-slate-dim">
              Empirical Status: Research in Progress
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Research Question Navigation Cards */}
            <div className="lg:col-span-5 space-y-2.5">
              {researchQuestions.map((rq) => {
                const isSelected = selectedQuestionId === rq.id;
                return (
                  <button
                    key={rq.id}
                    onClick={() => setSelectedQuestionId(rq.id)}
                    className={`w-full p-4 rounded-lg text-left transition-all cursor-pointer border flex flex-col space-y-2 ${
                      isSelected
                        ? 'bg-bg-surface border-accent-primary shadow-md'
                        : 'bg-bg-surface/50 border-hairline hover:border-subtle hover:bg-bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-slate-text font-bold">{rq.number}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] border font-mono ${getStatusColor(rq.status)}`}>
                        {rq.status}
                      </span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-text font-sans leading-snug">
                      {rq.topic}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Detailed Hypothesis Inspector */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQuestion.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 sm:p-8 rounded-lg bg-bg-surface border border-hairline space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline/60 pb-3">
                    <div className="font-mono text-xs text-accent-primary font-bold">
                      {activeQuestion.number} // {activeQuestion.topic.toUpperCase()}
                    </div>
                    <span className={`px-2.5 py-0.5 rounded text-xs border font-mono ${getStatusColor(activeQuestion.status)}`}>
                      Status: {activeQuestion.status}
                    </span>
                  </div>

                  {/* Research Question */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[10px] text-slate-dim uppercase tracking-wider">
                      Target Research Question
                    </div>
                    <p className="text-sm sm:text-base font-bold text-slate-text font-sans leading-snug">
                      "{activeQuestion.question}"
                    </p>
                  </div>

                  {/* Scientific Hypothesis */}
                  <div className="space-y-1.5 p-4 rounded bg-bg-ground border border-hairline/60">
                    <div className="font-mono text-[10px] text-accent-primary uppercase tracking-wider">
                      Scientific Hypothesis & Formulation
                    </div>
                    <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-sans">
                      {activeQuestion.hypothesis}
                    </p>
                  </div>

                  {/* Methodology & Target Metric */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                    <div className="p-3 rounded bg-bg-ground border border-hairline/60 space-y-1">
                      <div className="text-[10px] text-slate-dim uppercase">Experimental Protocol</div>
                      <p className="text-slate-muted text-[11px] font-sans">{activeQuestion.methodology}</p>
                    </div>

                    <div className="p-3 rounded bg-bg-ground border border-hairline/60 space-y-1">
                      <div className="text-[10px] text-slate-dim uppercase">Validation Target</div>
                      <p className="text-accent-primary text-[11px] font-sans font-medium">{activeQuestion.metricTarget}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
