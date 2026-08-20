import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Code, Activity, Network, Copy, Check } from 'lucide-react';
import { useToast } from '../ui/ToastContext';

export const NeuralLabSection: React.FC = () => {
  const [arch, setArch] = useState<'mlp' | 'cnn' | 'transformer' | 'resnet'>('mlp');
  const [activation, setActivation] = useState<'GELU' | 'ReLU' | 'SiLU' | 'Sigmoid'>('GELU');
  const [lr, setLr] = useState<number>(0.001);
  const [epochs, setEpochs] = useState<number>(120);
  const [hiddenDim, setHiddenDim] = useState<number>(128);

  const [activeTab, setActiveTab] = useState<'loss' | 'topology' | 'code'>('loss');
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(120);
  const [currentLoss, setCurrentLoss] = useState(0.0084);
  const [currentAcc, setCurrentAcc] = useState(99.2);
  const [currentGrad, setCurrentGrad] = useState('1.14e-3');
  const [copiedCode, setCopiedCode] = useState(false);

  const lossCanvasRef = useRef<HTMLCanvasElement>(null);
  const topologyCanvasRef = useRef<HTMLCanvasElement>(null);
  const { showToast } = useToast();

  // Loss data points
  const lossPointsRef = useRef<{ epoch: number; loss: number }[]>([]);

  const generateLossData = (totalEpochs: number, learningRate: number) => {
    const points: { epoch: number; loss: number }[] = [];
    let cur = 2.45 + Math.random() * 0.3;
    const decay = Math.min(0.08, 0.02 + learningRate * 8);

    for (let e = 1; e <= totalEpochs; e++) {
      const noise = (Math.random() - 0.5) * (0.08 / (1 + e * 0.1));
      cur = Math.max(0.005, cur * (1 - decay) + noise);
      points.push({ epoch: e, loss: cur });
    }
    lossPointsRef.current = points;
  };

  const drawLossCurve = (progressIndex: number) => {
    const canvas = lossCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = (canvas.width = canvas.offsetWidth);
    const h = (canvas.height = canvas.offsetHeight);

    ctx.clearRect(0, 0, w, h);

    // Draw Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 40; x < w; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 20);
      ctx.lineTo(x, h - 30);
      ctx.stroke();
    }
    for (let y = 20; y < h - 30; y += 40) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();
    }

    const points = lossPointsRef.current.slice(0, progressIndex);
    if (points.length < 2) return;

    const maxEpoch = lossPointsRef.current[lossPointsRef.current.length - 1].epoch;
    const maxLoss = 2.8;

    const mapX = (ep: number) => 40 + ((ep - 1) / maxEpoch) * (w - 65);
    const mapY = (val: number) => (h - 35) - (val / maxLoss) * (h - 60);

    // Fill area under curve
    ctx.beginPath();
    ctx.moveTo(mapX(points[0].epoch), mapY(points[0].loss));
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(mapX(points[i].epoch), mapY(points[i].loss));
    }
    ctx.lineTo(mapX(points[points.length - 1].epoch), h - 35);
    ctx.lineTo(mapX(points[0].epoch), h - 35);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
    grad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Draw Line
    ctx.beginPath();
    ctx.moveTo(mapX(points[0].epoch), mapY(points[0].loss));
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(mapX(points[i].epoch), mapY(points[i].loss));
    }
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Latest Point Dot
    const latest = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(mapX(latest.epoch), mapY(latest.loss), 5, 0, Math.PI * 2);
    ctx.fillStyle = '#22d3ee';
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Axis Labels
    ctx.fillStyle = '#64748b';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('0.0', 12, h - 32);
    ctx.fillText('1.4', 12, (h - 35) / 2 + 10);
    ctx.fillText('2.8', 12, 28);
    ctx.fillText('Epoch 1', 40, h - 12);
    ctx.fillText(`Epoch ${maxEpoch}`, w - 75, h - 12);
  };

  const drawTopology = () => {
    const canvas = topologyCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = (canvas.width = canvas.offsetWidth);
    const h = (canvas.height = canvas.offsetHeight);

    ctx.clearRect(0, 0, w, h);

    const layers = [
      { name: 'Input Layer', count: 4, x: w * 0.15 },
      { name: `Hidden 1 (${hiddenDim})`, count: 6, x: w * 0.38 },
      { name: `Hidden 2 (${hiddenDim / 2})`, count: 6, x: w * 0.62 },
      { name: 'Output Classes', count: 3, x: w * 0.85 },
    ];

    const layerNodes: { x: number; y: number }[][] = [];

    layers.forEach((layer) => {
      const nodes: { x: number; y: number }[] = [];
      const spacing = (h - 60) / (layer.count + 1);
      for (let i = 1; i <= layer.count; i++) {
        nodes.push({ x: layer.x, y: 30 + i * spacing });
      }
      layerNodes.push(nodes);
    });

    // Draw Synapses
    for (let l = 0; l < layerNodes.length - 1; l++) {
      const curr = layerNodes[l];
      const next = layerNodes[l + 1];
      curr.forEach((n1) => {
        next.forEach((n2) => {
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.18)';
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });
    }

    // Draw Nodes
    layers.forEach((layer, idx) => {
      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(layer.name, layer.x, 22);

      layerNodes[idx].forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#22d3ee';
        ctx.fill();
      });
    });
  };

  useEffect(() => {
    generateLossData(epochs, lr);
    if (activeTab === 'loss') drawLossCurve(epochs);
    if (activeTab === 'topology') drawTopology();
  }, [arch, activation, lr, epochs, hiddenDim, activeTab]);

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    showToast('🚀 Running PyTorch Forward & Backward Pass simulation...');

    generateLossData(epochs, lr);
    let step = 1;
    const intervalTime = Math.max(12, Math.floor(1800 / epochs));

    const timer = setInterval(() => {
      step++;
      setCurrentEpoch(step);

      if (activeTab === 'loss') {
        drawLossCurve(step);
      }

      const curLoss = lossPointsRef.current[step - 1]?.loss || 0.01;
      const curAcc = Math.min(99.6, (1 - curLoss / 2.8) * 100 + Math.random() * 0.8);

      setCurrentLoss(curLoss);
      setCurrentAcc(parseFloat(curAcc.toFixed(1)));
      setCurrentGrad((curLoss * 0.0012).toExponential(2));

      if (step >= epochs) {
        clearInterval(timer);
        setIsSimulating(false);
        showToast(`✨ Model converged! Final Loss: ${curLoss.toFixed(4)} • Accuracy: ${curAcc.toFixed(1)}%`, 'success');
      }
    }, intervalTime);
  };

  const handleReset = () => {
    generateLossData(epochs, lr);
    setCurrentEpoch(1);
    setCurrentLoss(2.45);
    setCurrentAcc(42.1);
    setCurrentGrad('4.20e-2');
    if (activeTab === 'loss') drawLossCurve(1);
    showToast('🔄 Parameters re-initialized with Xavier Uniform distribution.');
  };

  const generatePyTorchCode = () => {
    if (arch === 'mlp') {
      return `import torch
import torch.nn as nn

class DeepMLPClassifier(nn.Module):
    def __init__(self, in_features=64, hidden_dim=${hiddenDim}, num_classes=10):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, hidden_dim),
            nn.${activation}(),
            nn.LayerNorm(hidden_dim),
            nn.Dropout(p=0.15),
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.${activation}(),
            nn.Linear(hidden_dim // 2, num_classes)
        )

    def forward(self, x):
        return self.net(x)

# Optimization Pipeline
model = DeepMLPClassifier()
optimizer = torch.optim.AdamW(model.parameters(), lr=${lr}, weight_decay=1e-4)
criterion = nn.CrossEntropyLoss()`;
    } else if (arch === 'cnn') {
      return `import torch
import torch.nn as nn

class ConvFeatureExtractor(nn.Module):
    def __init__(self, in_channels=3, hidden_dim=${hiddenDim}, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(in_channels, 32, kernel_size=3, padding=1),
            nn.${activation}(),
            nn.MaxPool2d(2, 2),
            nn.Conv2d(32, ${hiddenDim}, kernel_size=3, padding=1),
            nn.${activation}(),
            nn.AdaptiveAvgPool2d((4, 4))
        )
        self.classifier = nn.Linear(${hiddenDim} * 16, num_classes)

    def forward(self, x):
        feat = self.features(x)
        return self.classifier(torch.flatten(feat, 1))

model = ConvFeatureExtractor()
optimizer = torch.optim.AdamW(model.parameters(), lr=${lr})
criterion = nn.CrossEntropyLoss()`;
    } else if (arch === 'transformer') {
      return `import torch
import torch.nn as nn

class TransformerEncoderBlock(nn.Module):
    def __init__(self, d_model=${hiddenDim}, nhead=8, num_classes=10):
        super().__init__()
        self.attn = nn.MultiheadAttention(embed_dim=d_model, num_heads=nhead, batch_first=True)
        self.norm1 = nn.LayerNorm(d_model)
        self.ffn = nn.Sequential(
            nn.Linear(d_model, d_model * 2),
            nn.${activation}(),
            nn.Linear(d_model * 2, d_model)
        )
        self.norm2 = nn.LayerNorm(d_model)
        self.head = nn.Linear(d_model, num_classes)

    def forward(self, x):
        attn_out, _ = self.attn(x, x, x)
        x = self.norm1(x + attn_out)
        return self.head(self.norm2(x + self.ffn(x)).mean(dim=1))

model = TransformerEncoderBlock()
optimizer = torch.optim.AdamW(model.parameters(), lr=${lr})
criterion = nn.CrossEntropyLoss()`;
    } else {
      return `import torch
import torch.nn as nn

class ResNetResidualBlock(nn.Module):
    def __init__(self, channels=${hiddenDim}):
        super().__init__()
        self.conv1 = nn.Conv2d(channels, channels, 3, padding=1)
        self.act = nn.${activation}()
        self.conv2 = nn.Conv2d(channels, channels, 3, padding=1)
        self.norm = nn.BatchNorm2d(channels)

    def forward(self, x):
        residual = x
        out = self.act(self.conv1(x))
        out = self.norm(self.conv2(out))
        return self.act(out + residual)

model = ResNetResidualBlock()
optimizer = torch.optim.AdamW(model.parameters(), lr=${lr})
criterion = nn.CrossEntropyLoss()`;
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatePyTorchCode());
    setCopiedCode(true);
    showToast('📋 PyTorch code copied to clipboard!', 'success');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="lab" className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Interactive Neural Simulation Sandbox
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Tweak hyperparameters in real-time and observe convergence telemetry, forward activation flow, and weight matrices right in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-bg-surface/90 border border-cyan-primary/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-primary/10 backdrop-blur-xl">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-5 bg-bg-deep/80 p-5 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <span className="font-mono text-xs text-slate-400">hyperparameters.py</span>
          </div>

          {/* Architecture Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Architecture Type</span>
              <span className="font-mono text-[10px] text-cyan-glow">Model Layer</span>
            </label>
            <select
              value={arch}
              onChange={(e) => setArch(e.target.value as any)}
              className="w-full bg-bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:border-cyan-primary focus:outline-none"
            >
              <option value="mlp">Multi-Layer Perceptron (MLP)</option>
              <option value="cnn">ConvNet Feature Extractor (CNN)</option>
              <option value="transformer">Multi-Head Self-Attention</option>
              <option value="resnet">Deep Residual Block (ResNet)</option>
            </select>
          </div>

          {/* Activation Function */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Activation Function</span>
              <span className="font-mono text-[10px] text-violet-glow">Non-Linearity</span>
            </label>
            <select
              value={activation}
              onChange={(e) => setActivation(e.target.value as any)}
              className="w-full bg-bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:border-cyan-primary focus:outline-none"
            >
              <option value="GELU">GELU (Gaussian Error Linear)</option>
              <option value="ReLU">ReLU (Rectified Linear)</option>
              <option value="SiLU">SiLU / Swish (β=1.0)</option>
              <option value="Sigmoid">Sigmoid Logistic</option>
            </select>
          </div>

          {/* Learning Rate Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Learning Rate (η)</span>
              <span className="font-mono text-cyan-glow font-bold">{lr}</span>
            </div>
            <input
              type="range"
              min="0.0001"
              max="0.05"
              step="0.0005"
              value={lr}
              onChange={(e) => setLr(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-cyan-primary"
            />
          </div>

          {/* Epochs Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Training Iterations</span>
              <span className="font-mono text-cyan-glow font-bold">{epochs} Epochs</span>
            </div>
            <input
              type="range"
              min="20"
              max="300"
              step="10"
              value={epochs}
              onChange={(e) => setEpochs(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-cyan-primary"
            />
          </div>

          {/* Hidden Dim Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Hidden Dimension (d_model)</span>
              <span className="font-mono text-cyan-glow font-bold">{hiddenDim}</span>
            </div>
            <input
              type="range"
              min="32"
              max="512"
              step="32"
              value={hiddenDim}
              onChange={(e) => setHiddenDim(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-cyan-primary"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-semibold text-xs shadow-md shadow-cyan-primary/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              <span>{isSimulating ? 'Computing Forward Pass...' : 'Execute Forward & Backward Pass'}</span>
            </button>

            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-bg-surface hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Weights (Random Init)</span>
            </button>
          </div>
        </div>

        {/* Visualizer Column */}
        <div className="lg:col-span-8 space-y-4 flex flex-col justify-between">
          {/* Visualizer Tabs Header */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-white/10">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('loss')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'loss'
                    ? 'bg-cyan-primary/20 border border-cyan-primary/40 text-cyan-glow'
                    : 'bg-bg-deep border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Loss Curve</span>
              </button>

              <button
                onClick={() => setActiveTab('topology')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'topology'
                    ? 'bg-cyan-primary/20 border border-cyan-primary/40 text-cyan-glow'
                    : 'bg-bg-deep border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Active Topology</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'code'
                    ? 'bg-cyan-primary/20 border border-cyan-primary/40 text-cyan-glow'
                    : 'bg-bg-deep border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>PyTorch Snippet</span>
              </button>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-primary animate-pulse" />
              <span>{isSimulating ? 'Training in Progress...' : 'Convergence Standby'}</span>
            </div>
          </div>

          {/* Tab Views */}
          <div className="flex-grow flex items-center justify-center min-h-[300px]">
            {activeTab === 'loss' && (
              <div className="w-full space-y-4">
                <canvas
                  ref={lossCanvasRef}
                  className="w-full h-64 bg-bg-deep rounded-2xl border border-white/5"
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                  <div className="p-2.5 rounded-xl bg-bg-deep border border-white/5">
                    <div className="text-[10px] text-slate-400">EPOCH</div>
                    <div className="text-sm font-bold text-slate-100">{currentEpoch} / {epochs}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-bg-deep border border-white/5">
                    <div className="text-[10px] text-slate-400">LOSS (&Lscr;)</div>
                    <div className="text-sm font-bold text-cyan-glow">{currentLoss.toFixed(4)}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-bg-deep border border-white/5">
                    <div className="text-[10px] text-slate-400">ACCURACY</div>
                    <div className="text-sm font-bold text-emerald-primary">{currentAcc}%</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-bg-deep border border-white/5">
                    <div className="text-[10px] text-slate-400">GRAD NORM</div>
                    <div className="text-sm font-bold text-slate-200">{currentGrad}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'topology' && (
              <div className="w-full space-y-2">
                <canvas
                  ref={topologyCanvasRef}
                  onClick={() => showToast('⚡ Synaptic Activation Stimulus Dispatched')}
                  className="w-full h-72 bg-bg-deep rounded-2xl border border-white/5 cursor-crosshair"
                />
                <div className="text-center font-mono text-[11px] text-slate-400">
                  Click on canvas to trigger synaptic excitation signal
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="w-full relative bg-bg-deep p-4 rounded-2xl border border-white/5 max-h-80 overflow-auto">
                <button
                  onClick={copyCode}
                  className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-bg-surface border border-white/10 text-xs font-mono text-cyan-glow hover:bg-bg-elevated transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                  <code>{generatePyTorchCode()}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
