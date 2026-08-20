/**
 * ============================================================================
 * WAHYU SATYA — SENIOR WEB DEVELOPER & DEEP LEARNING RESEARCHER PORTFOLIO
 * High-Performance Interactive Engine & Neural Simulation Sandbox
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. AMBIENT CURSOR GLOW
     ========================================================================== */
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateGlow = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(animateGlow);
    };
    requestAnimationFrame(animateGlow);
  }

  /* ==========================================================================
     2. NAVBAR SCROLL EFFECT & MOBILE DRAWER
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let currentSection = '';
    const scrollPosition = window.scrollY + 160;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach((item) => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      if (href === `#${currentSection}`) {
        item.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile Drawer Toggle
  if (hamburgerBtn && mobileDrawer) {
    const toggleMobileMenu = () => {
      const isOpen = hamburgerBtn.classList.toggle('open');
      mobileDrawer.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      mobileDrawer.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        mobileDrawer.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ==========================================================================
     3. HERO NEURAL NETWORK & SYNAPTIC PARTICLE CANVAS (60 FPS Engine)
     ========================================================================== */
  const neuralCanvas = document.getElementById('neural-canvas');
  if (neuralCanvas) {
    const ctx = neuralCanvas.getContext('2d');
    let width = (neuralCanvas.width = window.innerWidth);
    let height = (neuralCanvas.height = neuralCanvas.parentElement.offsetHeight || window.innerHeight);

    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('resize', () => {
      width = neuralCanvas.width = window.innerWidth;
      height = neuralCanvas.height = neuralCanvas.parentElement.offsetHeight || window.innerHeight;
      initNodes();
    });

    neuralCanvas.addEventListener('mousemove', (e) => {
      const rect = neuralCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    neuralCanvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Synaptic Burst on Click
    neuralCanvas.addEventListener('click', (e) => {
      const rect = neuralCanvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      for (let i = 0; i < 12; i++) {
        pulses.push({
          x: clickX,
          y: clickY,
          targetNode: nodes[Math.floor(Math.random() * nodes.length)],
          progress: 0,
          speed: 0.04 + Math.random() * 0.04,
          color: Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6',
          size: 3.5
        });
      }
    });

    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 35 : 70;
    let nodes = [];
    let pulses = [];

    class NeuralNode {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2.2 + 1.2;
        this.baseColor = Math.random() > 0.4 ? 'rgba(6, 182, 212,' : 'rgba(139, 92, 246,';
        this.alpha = Math.random() * 0.4 + 0.3;
        this.activation = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse physics
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 0.03;
            this.x -= dx * force;
            this.y -= dy * force;
            this.activation = Math.min(1, this.activation + 0.04);
          }
        }

        if (this.activation > 0) {
          this.activation -= 0.015;
          if (this.activation < 0) this.activation = 0;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + this.activation * 2, 0, Math.PI * 2);
        ctx.fillStyle = `${this.baseColor} ${Math.min(1, this.alpha + this.activation)})`;
        ctx.fill();

        if (this.activation > 0.2) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, (this.radius + this.activation * 3) * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `${this.baseColor} ${this.activation * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new NeuralNode());
      }
    };
    initNodes();

    // Spontaneous Forward Propagation Signals
    setInterval(() => {
      if (nodes.length > 2 && Math.random() > 0.3) {
        const fromNode = nodes[Math.floor(Math.random() * nodes.length)];
        // Find nearest neighbour
        let nearest = null;
        let minDist = 180;
        nodes.forEach((n) => {
          if (n !== fromNode) {
            const d = Math.hypot(n.x - fromNode.x, n.y - fromNode.y);
            if (d < minDist) {
              minDist = d;
              nearest = n;
            }
          }
        });

        if (nearest) {
          pulses.push({
            startX: fromNode.x,
            startY: fromNode.y,
            endX: nearest.x,
            endY: nearest.y,
            progress: 0,
            speed: 0.025 + Math.random() * 0.02,
            color: Math.random() > 0.5 ? '#22d3ee' : '#a78bfa'
          });
        }
      }
    }, 450);

    const renderNeuralFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Connections (Synapses)
      const maxDistance = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      nodes.forEach((node) => {
        node.update();
        node.draw();
      });

      // Draw Signal Pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const curX = pulse.startX + (pulse.endX - pulse.startX) * pulse.progress;
        const curY = pulse.startY + (pulse.endY - pulse.startY) * pulse.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(renderNeuralFrame);
    };

    renderNeuralFrame();
  }

  /* ==========================================================================
     4. INTERACTIVE DEEP LEARNING MODEL LAB SIMULATOR
     ========================================================================== */
  const archSelect = document.getElementById('arch-select');
  const activationSelect = document.getElementById('activation-select');
  const lrSlider = document.getElementById('lr-slider');
  const lrVal = document.getElementById('lr-val');
  const epochsSlider = document.getElementById('epochs-slider');
  const epochsVal = document.getElementById('epochs-val');
  const hiddenSlider = document.getElementById('hidden-slider');
  const hiddenVal = document.getElementById('hidden-val');
  const runSimBtn = document.getElementById('run-simulation-btn');
  const resetSimBtn = document.getElementById('reset-simulation-btn');
  const simStatus = document.getElementById('sim-status');

  const liveEpoch = document.getElementById('live-epoch');
  const liveLoss = document.getElementById('live-loss');
  const liveAcc = document.getElementById('live-acc');
  const liveGrad = document.getElementById('live-grad');

  const lossCanvas = document.getElementById('loss-canvas');
  const topologyCanvas = document.getElementById('topology-canvas');
  const codeSnippet = document.getElementById('pytorch-code-snippet');
  const vizTabs = document.querySelectorAll('.viz-tab');
  const vizViews = document.querySelectorAll('.viz-view');

  // Sliders label updates
  if (lrSlider && lrVal) {
    lrSlider.addEventListener('input', (e) => {
      lrVal.textContent = parseFloat(e.target.value).toFixed(4);
      updatePyTorchSnippet();
    });
  }

  if (epochsSlider && epochsVal) {
    epochsSlider.addEventListener('input', (e) => {
      epochsVal.textContent = `${e.target.value} Epochs`;
    });
  }

  if (hiddenSlider && hiddenVal) {
    hiddenSlider.addEventListener('input', (e) => {
      hiddenVal.textContent = e.target.value;
      updatePyTorchSnippet();
      drawTopologyCanvas();
    });
  }

  if (archSelect) archSelect.addEventListener('change', updatePyTorchSnippet);
  if (activationSelect) activationSelect.addEventListener('change', updatePyTorchSnippet);

  // Tab switching
  vizTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      vizTabs.forEach((t) => t.classList.remove('active'));
      vizViews.forEach((v) => v.classList.remove('active'));

      tab.classList.add('active');
      const targetViz = tab.getAttribute('data-viz');
      const targetView = document.getElementById(`view-${targetViz}`);
      if (targetView) targetView.classList.add('active');

      if (targetViz === 'topology') {
        drawTopologyCanvas();
      } else if (targetViz === 'loss') {
        drawLossCurve();
      }
    });
  });

  // Dynamic PyTorch Code Generation
  function updatePyTorchSnippet() {
    if (!codeSnippet) return;
    const arch = archSelect ? archSelect.value : 'mlp';
    const act = activationSelect ? activationSelect.value.toUpperCase() : 'GELU';
    const hidden = hiddenSlider ? hiddenSlider.value : '128';
    const lr = lrSlider ? lrSlider.value : '0.001';

    let code = `import torch\nimport torch.nn as nn\n\n`;

    if (arch === 'mlp') {
      code += `class DeepMLPClassifier(nn.Module):
    def __init__(self, in_features=64, hidden_dim=${hidden}, num_classes=10):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, hidden_dim),
            nn.${act}(),
            nn.LayerNorm(hidden_dim),
            nn.Dropout(p=0.15),
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.${act}(),
            nn.Linear(hidden_dim // 2, num_classes)
        )

    def forward(self, x):
        return self.net(x)\n\n`;
    } else if (arch === 'cnn') {
      code += `class ConvFeatureExtractor(nn.Module):
    def __init__(self, in_channels=3, hidden_dim=${hidden}, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(in_channels, 32, kernel_size=3, padding=1),
            nn.${act}(),
            nn.MaxPool2d(2, 2),
            nn.Conv2d(32, ${hidden}, kernel_size=3, padding=1),
            nn.${act}(),
            nn.AdaptiveAvgPool2d((4, 4))
        )
        self.classifier = nn.Linear(${hidden} * 16, num_classes)

    def forward(self, x):
        feat = self.features(x)
        return self.classifier(torch.flatten(feat, 1))\n\n`;
    } else if (arch === 'transformer') {
      code += `class MultiHeadAttentionBlock(nn.Module):
    def __init__(self, d_model=${hidden}, n_heads=8, num_classes=10):
        super().__init__()
        self.attn = nn.MultiheadAttention(embed_dim=d_model, num_heads=n_heads, batch_first=True)
        self.norm1 = nn.LayerNorm(d_model)
        self.ffn = nn.Sequential(
            nn.Linear(d_model, d_model * 2),
            nn.${act}(),
            nn.Linear(d_model * 2, d_model)
        )
        self.norm2 = nn.LayerNorm(d_model)
        self.head = nn.Linear(d_model, num_classes)

    def forward(self, x):
        attn_out, _ = self.attn(x, x, x)
        x = self.norm1(x + attn_out)
        return self.head(self.norm2(x + self.ffn(x)).mean(dim=1))\n\n`;
    } else {
      code += `class ResidualBottleneckBlock(nn.Module):
    def __init__(self, channels=${hidden}):
        super().__init__()
        self.conv1 = nn.Conv2d(channels, channels, 3, padding=1)
        self.act = nn.${act}()
        self.conv2 = nn.Conv2d(channels, channels, 3, padding=1)
        self.norm = nn.BatchNorm2d(channels)

    def forward(self, x):
        residual = x
        out = self.act(self.conv1(x))
        out = self.norm(self.conv2(out))
        return self.act(out + residual)\n\n`;
    }

    code += `# Scaled Optimization & Telemetry Pipeline
model = ${arch === 'mlp' ? 'DeepMLPClassifier' : arch === 'cnn' ? 'ConvFeatureExtractor' : arch === 'transformer' ? 'MultiHeadAttentionBlock' : 'ResidualBottleneckBlock'}()
optimizer = torch.optim.AdamW(model.parameters(), lr=${lr}, weight_decay=1e-4)
criterion = nn.CrossEntropyLoss()`;

    codeSnippet.textContent = code;
  }
  updatePyTorchSnippet();

  // Loss Curve Simulation
  let lossPoints = [];
  let isSimulating = false;

  function generateLossData(totalEpochs, lr) {
    lossPoints = [];
    let currentLoss = 2.45 + Math.random() * 0.3;
    const decayRate = Math.min(0.08, 0.02 + lr * 8);

    for (let e = 1; e <= totalEpochs; e++) {
      const noise = (Math.random() - 0.5) * (0.08 / (1 + e * 0.1));
      currentLoss = Math.max(0.005, currentLoss * (1 - decayRate) + noise);
      lossPoints.push({ epoch: e, loss: currentLoss });
    }
  }

  function drawLossCurve(progressIndex = lossPoints.length) {
    if (!lossCanvas) return;
    const ctx = lossCanvas.getContext('2d');
    const w = (lossCanvas.width = lossCanvas.offsetWidth);
    const h = (lossCanvas.height = lossCanvas.offsetHeight);

    ctx.clearRect(0, 0, w, h);

    // Draw Grid Lines
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

    if (lossPoints.length === 0) return;

    const pointsToDraw = lossPoints.slice(0, progressIndex);
    if (pointsToDraw.length < 2) return;

    const maxEpoch = lossPoints[lossPoints.length - 1].epoch;
    const maxLoss = 2.8;

    const mapX = (ep) => 40 + ((ep - 1) / maxEpoch) * (w - 65);
    const mapY = (val) => (h - 35) - (val / maxLoss) * (h - 60);

    // Draw Area under curve
    ctx.beginPath();
    ctx.moveTo(mapX(pointsToDraw[0].epoch), mapY(pointsToDraw[0].loss));
    for (let i = 1; i < pointsToDraw.length; i++) {
      ctx.lineTo(mapX(pointsToDraw[i].epoch), mapY(pointsToDraw[i].loss));
    }
    ctx.lineTo(mapX(pointsToDraw[pointsToDraw.length - 1].epoch), h - 35);
    ctx.lineTo(mapX(pointsToDraw[0].epoch), h - 35);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
    grad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Draw Line
    ctx.beginPath();
    ctx.moveTo(mapX(pointsToDraw[0].epoch), mapY(pointsToDraw[0].loss));
    for (let i = 1; i < pointsToDraw.length; i++) {
      ctx.lineTo(mapX(pointsToDraw[i].epoch), mapY(pointsToDraw[i].loss));
    }
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Current point dot
    const latest = pointsToDraw[pointsToDraw.length - 1];
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
    ctx.fillText('1.5', 12, (h - 35) / 2 + 10);
    ctx.fillText('2.8', 12, 28);

    ctx.fillText('Epoch 1', 40, h - 12);
    ctx.fillText(`Epoch ${maxEpoch}`, w - 75, h - 12);
  }

  // Initial loss curve
  generateLossData(120, 0.001);
  drawLossCurve();

  // Run Simulation Execution
  if (runSimBtn) {
    runSimBtn.addEventListener('click', () => {
      if (isSimulating) return;
      isSimulating = true;
      runSimBtn.disabled = true;
      if (simStatus) simStatus.textContent = 'Training in Progress...';
      showToast('🚀 Running PyTorch Forward & Backward Pass simulation...');

      const totalEpochs = parseInt(epochsSlider.value, 10);
      const lr = parseFloat(lrSlider.value);
      generateLossData(totalEpochs, lr);

      let currentStep = 1;
      const stepInterval = Math.max(12, Math.floor(1800 / totalEpochs));

      const timer = setInterval(() => {
        currentStep++;
        drawLossCurve(currentStep);

        const curLossVal = lossPoints[currentStep - 1].loss;
        const curAccVal = Math.min(99.6, (1 - curLossVal / 2.8) * 100 + (Math.random() * 0.8)).toFixed(1);
        const curGradVal = (curLossVal * 0.0012).toExponential(2);

        if (liveEpoch) liveEpoch.textContent = `${currentStep} / ${totalEpochs}`;
        if (liveLoss) liveLoss.textContent = curLossVal.toFixed(4);
        if (liveAcc) liveAcc.textContent = `${curAccVal}%`;
        if (liveGrad) liveGrad.textContent = curGradVal;

        if (currentStep >= totalEpochs) {
          clearInterval(timer);
          isSimulating = false;
          runSimBtn.disabled = false;
          if (simStatus) simStatus.textContent = 'Convergence Reached';
          showToast(`✨ Model converged at Loss: ${curLossVal.toFixed(4)} | Accuracy: ${curAccVal}%`);
        }
      }, stepInterval);
    });
  }

  if (resetSimBtn) {
    resetSimBtn.addEventListener('click', () => {
      generateLossData(parseInt(epochsSlider.value, 10), parseFloat(lrSlider.value));
      drawLossCurve();
      if (liveEpoch) liveEpoch.textContent = `1 / ${epochsSlider.value}`;
      if (liveLoss) liveLoss.textContent = '2.4500';
      if (liveAcc) liveAcc.textContent = '42.1%';
      if (liveGrad) liveGrad.textContent = '4.20e-2';
      if (simStatus) simStatus.textContent = 'Weights Initialized (Xavier/He)';
      showToast('🔄 Model parameters reset with Xavier Uniform distribution.');
    });
  }

  // Interactive Neural Topology Canvas
  function drawTopologyCanvas() {
    if (!topologyCanvas) return;
    const ctx = topologyCanvas.getContext('2d');
    const w = (topologyCanvas.width = topologyCanvas.offsetWidth);
    const h = (topologyCanvas.height = topologyCanvas.offsetHeight);

    ctx.clearRect(0, 0, w, h);

    const layers = [
      { name: 'Input', count: 4, x: w * 0.15 },
      { name: 'Hidden 1', count: 6, x: w * 0.38 },
      { name: 'Hidden 2', count: 6, x: w * 0.62 },
      { name: 'Output', count: 3, x: w * 0.85 }
    ];

    // Compute node coordinates
    layers.forEach((layer) => {
      layer.nodes = [];
      const spacing = (h - 60) / (layer.count + 1);
      for (let i = 1; i <= layer.count; i++) {
        layer.nodes.push({ x: layer.x, y: 30 + i * spacing });
      }
    });

    // Draw Synaptic Connections
    for (let l = 0; l < layers.length - 1; l++) {
      const curr = layers[l];
      const next = layers[l + 1];

      curr.nodes.forEach((n1) => {
        next.nodes.forEach((n2) => {
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
    layers.forEach((layer) => {
      // Layer Title
      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(layer.name, layer.x, 22);

      layer.nodes.forEach((n) => {
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
  }

  if (topologyCanvas) {
    topologyCanvas.addEventListener('click', (e) => {
      drawTopologyCanvas();
      const rect = topologyCanvas.getBoundingClientRect();
      const ctx = topologyCanvas.getContext('2d');
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Pulse flash
      ctx.beginPath();
      ctx.arc(clickX, clickY, 18, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.fill();
      showToast('⚡ Synaptic Activation Stimulus Dispatched');
    });
  }

  /* ==========================================================================
     5. SKILLS MATRIX FILTER TABS
     ========================================================================== */
  const skillFilterBtns = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-skill-filter');

      skillCards.forEach((card) => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'toast-in 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     6. CERTIFICATE LIGHTBOX MODAL
     ========================================================================== */
  const certCards = document.querySelectorAll('.cert-card');
  const certLightbox = document.getElementById('cert-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  if (certLightbox && lightboxImg) {
    certCards.forEach((card) => {
      card.addEventListener('click', () => {
        const imgSrc = card.getAttribute('data-cert-img');
        if (imgSrc) {
          lightboxImg.src = imgSrc;
          certLightbox.classList.add('open');
          certLightbox.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      certLightbox.classList.remove('open');
      certLightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certLightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  /* ==========================================================================
     7. COMMAND PALETTE & TERMINAL HUD (Ctrl + K)
     ========================================================================== */
  const openCmdBtn = document.getElementById('open-cmd-palette');
  const cmdBackdrop = document.getElementById('cmd-palette-backdrop');
  const closeCmdBtn = document.getElementById('close-cmd-palette');
  const cmdInput = document.getElementById('cmd-input');
  const cmdActionList = document.getElementById('cmd-action-list');
  const cmdTerminalOutput = document.getElementById('cmd-terminal-output');

  const openPalette = () => {
    if (!cmdBackdrop) return;
    cmdBackdrop.classList.add('open');
    cmdBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (cmdInput) {
      cmdInput.value = '';
      cmdInput.focus();
    }
    if (cmdTerminalOutput) cmdTerminalOutput.style.display = 'none';
    if (cmdActionList) cmdActionList.style.display = 'flex';
  };

  const closePalette = () => {
    if (!cmdBackdrop) return;
    cmdBackdrop.classList.remove('open');
    cmdBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (openCmdBtn) openCmdBtn.addEventListener('click', openPalette);
  if (closeCmdBtn) closeCmdBtn.addEventListener('click', closePalette);

  if (cmdBackdrop) {
    cmdBackdrop.addEventListener('click', (e) => {
      if (e.target === cmdBackdrop) closePalette();
    });
  }

  // Keyboard shortcut Ctrl + K / Cmd + K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdBackdrop && cmdBackdrop.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && cmdBackdrop && cmdBackdrop.classList.contains('open')) {
      closePalette();
    }
  });

  // Action clicks inside palette
  if (cmdActionList) {
    cmdActionList.addEventListener('click', (e) => {
      const item = e.target.closest('.cmd-item');
      if (!item) return;

      const action = item.getAttribute('data-action');
      const target = item.getAttribute('data-target');
      const url = item.getAttribute('data-url');

      closePalette();

      if (action === 'jump' && target) {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'link' && url) {
        window.open(url, '_blank');
      } else if (action === 'copy-email') {
        copyEmailToClipboard();
      }
    });
  }

  // Terminal command evaluation
  if (cmdInput) {
    cmdInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = cmdInput.value.trim().toLowerCase();
        if (!query) return;

        if (['help', 'man'].includes(query)) {
          showTerminalOutput(`[TERMINAL COMMANDS AVAILABLE]
- lab           : Jump to Neural Simulation Sandbox
- cv / resume   : Open official CV PDF document
- skills        : Inspect capabilities matrix
- projects      : View deep learning research & engineering artifacts
- certifications: View verified credentials (IBM / HackerRank)
- contact       : Dispatch transmission or copy direct email
- clear         : Reset command list`);
        } else if (['lab', 'sandbox', 'dl', 'model'].includes(query)) {
          closePalette();
          document.querySelector('#lab')?.scrollIntoView({ behavior: 'smooth' });
        } else if (['cv', 'resume', 'pdf'].includes(query)) {
          window.open('./assets/ws-cv-resume.pdf', '_blank');
          closePalette();
        } else if (['skills', 'tech', 'stack'].includes(query)) {
          closePalette();
          document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
        } else if (['projects', 'research', 'work'].includes(query)) {
          closePalette();
          document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        } else if (['certifications', 'certi', 'certs'].includes(query)) {
          closePalette();
          document.querySelector('#certifications')?.scrollIntoView({ behavior: 'smooth' });
        } else if (['contact', 'email', 'touch'].includes(query)) {
          closePalette();
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        } else if (query === 'clear') {
          if (cmdTerminalOutput) cmdTerminalOutput.style.display = 'none';
          if (cmdActionList) cmdActionList.style.display = 'flex';
        } else {
          showTerminalOutput(`Unknown command: "${query}". Type "help" for valid commands.`);
        }
      }
    });
  }

  function showTerminalOutput(text) {
    if (cmdTerminalOutput && cmdActionList) {
      cmdActionList.style.display = 'none';
      cmdTerminalOutput.style.display = 'block';
      cmdTerminalOutput.textContent = text;
    }
  }

  /* ==========================================================================
     8. TOAST NOTIFICATION UTILITY
     ========================================================================== */
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, duration = 3200) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
  window.showToast = showToast;

  /* ==========================================================================
     9. CLIPBOARD COPY UTILITY
     ========================================================================== */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const quickCopyEmail = document.getElementById('quick-copy-email');

  function copyEmailToClipboard() {
    const email = 'satyagiridharma@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('📋 Email satyagiridharma@gmail.com copied to clipboard!');
    }).catch(() => {
      showToast('Email: satyagiridharma@gmail.com');
    });
  }

  if (copyEmailBtn) copyEmailBtn.addEventListener('click', copyEmailToClipboard);
  if (quickCopyEmail) quickCopyEmail.addEventListener('click', copyEmailToClipboard);

  // Demo Project Buttons
  const demoButtons = document.querySelectorAll('.open-demo-toast');
  demoButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const proj = btn.getAttribute('data-project');
      showToast(`📦 Live telemetry weights for [${proj}] synced via HuggingFace.`);
    });
  });

  /* ==========================================================================
     10. CONTACT FORM SUBMISSION
     ========================================================================== */
  window.handleFormSubmit = () => {
    const name = document.getElementById('contact-name')?.value;
    const email = document.getElementById('contact-email')?.value;
    const topic = document.getElementById('contact-topic')?.value;
    const message = document.getElementById('contact-message')?.value;

    showToast(`🚀 Transmission dispatched from ${name || 'User'} (${email}). I will respond shortly!`);

    const form = document.getElementById('interactive-contact-form');
    if (form) form.reset();
  };

  /* ==========================================================================
     11. FOOTER LIVE CLOCK (Bali UTC+8)
     ========================================================================== */
  const footerClock = document.getElementById('footer-live-clock');
  const updateClock = () => {
    if (!footerClock) return;
    const now = new Date();
    const options = { timeZone: 'Asia/Makassar', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    footerClock.textContent = `${now.toLocaleTimeString('en-US', options)} WITA`;
  };
  setInterval(updateClock, 1000);
  updateClock();
});