export interface CaseStudy {
  problem: string;
  approach: string;
  architecture: string;
  experiment: string;
  results: string;
  takeaway: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: 'Web' | 'Data' | 'AI' | 'Research';
  filterCategories: ('all' | 'web' | 'data' | 'ai' | 'research')[];
  year: string;
  status: 'Completed' | 'Active Research' | 'In Progress' | 'Production';
  summary: string;
  architectureBrief: string;
  framework: string;
  metric: string;
  repoUrl: string;
  demoUrl?: string;
  tags: string[];
  visualType: 'vision-anomaly' | 'canvas-engine' | 'data-telemetry' | 'ecg-vit';
  caseStudy: CaseStudy;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerKey: 'ibm' | 'skill' | 'toefl' | 'hr';
  image: string;
  description: string;
  skills: string[];
  verifyUrl?: string;
}

export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  organization: string;
  description: string;
  category: 'Leadership' | 'Media' | 'Governance';
  tag: string;
}

export interface SkillItem {
  name: string;
  category: 'dl' | 'web' | 'data' | 'tools';
  level: string;
  levelColor: string;
  description: string;
  tags: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Wahyu Satya',
    fullName: 'Putu Wahyu Satya Giridharma',
    role: 'Web Developer • Data Scientist • Deep Learning Researcher',
    focus: 'ECG Classification using 1D-ViT & Interactive Data-Driven Systems',
    mission: 'I build interactive web experiences, data-driven systems, and intelligent ML solutions.',
    institution: 'Universitas Pendidikan Ganesha (Undiksha)',
    department: 'Information Systems',
    status: 'Available for Engineering Roles & Research Collaboration',
    email: 'satyagiridharma@gmail.com',
    github: 'https://github.com/wahyusatya',
    linkedin: 'https://www.linkedin.com/in/wahyusatya/',
    resumePdf: './assets/ws-cv-resume.pdf',
    profileImg: './assets/profile-pic.png',
    aboutImg: './assets/about-pic.png',
    interests: [
      'Web Development',
      'Python',
      'Data Science',
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Transformers',
      'Time-Series Data',
      'Data Visualization'
    ],
  },

  academic: [
    {
      institution: 'Universitas Pendidikan Ganesha (Undiksha)',
      program: 'Bachelor of Information Systems (Data Science & Web Architecture Track)',
      period: '2023 - Present'
    },
    {
      institution: 'SMAN 2 Singaraja',
      program: 'Science & Mathematics Program',
      period: 'Graduated'
    },
    {
      institution: 'SMPN 2 Singaraja & SDN 3 Banjar Jawa',
      program: 'Foundational Mathematics & Computing',
      period: 'Foundational'
    }
  ],

  stats: [
    { num: '3+', label: 'Years Data & Web Craft' },
    { num: '100%', label: 'Verified Credentials (IBM & TOEFL ITP)' },
    { num: '9+', label: 'Academic & Committee Leadership Roles' },
    { num: '60 FPS', label: 'Zero-Jank WebGL/Canvas Architecture' },
  ],

  projects: [
    {
      id: 'proj-ecg',
      number: '01',
      title: 'ECG 1D-ViT Time-Series Anomaly Classification',
      category: 'Research',
      filterCategories: ['all', 'research', 'ai', 'data'],
      year: '2025 - Present',
      status: 'Active Research',
      summary: 'A pure 1D Vision Transformer architecture designed to segment and classify single-lead electrocardiac time-series waveforms without recurrent bottleneck overhead.',
      architectureBrief: '1D Patch Tokenizer (P=16) + 6-Layer Multi-Head Transformer Encoder (d=128)',
      framework: 'PyTorch • Scipy Signal • NumPy • CUDA',
      metric: 'In Progress (Target: >95% Ventricular Ectopic Recall)',
      repoUrl: 'https://github.com/wahyusatya',
      tags: ['1D-ViT', 'PyTorch', 'Time-Series', 'Signal Processing', 'ECG'],
      visualType: 'ecg-vit',
      caseStudy: {
        problem: 'Traditional 2D spectrogram CNNs applied to continuous 1D cardiac signals introduce severe computational latency and discard subtle phase-delay information, while standard 1D RNN/LSTM architectures suffer from gradient degradation over long sequence windows.',
        approach: 'Formulate a 1D Vision Transformer that decomposes continuous raw single-lead ECG signal streams into sequential temporal patches (length: 16 samples), projects them through a linear embedding layer with 1D learnable position tokens, and computes global multi-head self-attention across the heartbeat cycle.',
        architecture: 'Raw 1D Signal Buffer (250Hz) → 1D Patch Embedder (d_model = 128, heads = 8) → 6x Multi-Head Self-Attention Blocks → MLP Classification Head (Multi-class Arrhythmia / Normal).',
        experiment: 'Benchmarked on normalized MIT-BIH Arrhythmia records with Butterworth bandpass noise filtering (0.5Hz - 45Hz) and Focal Loss formulation to balance rare cardiac arrhythmia classes.',
        results: 'Active Research in Progress: Preliminary validation cohorts demonstrate over 94% recall on ventricular ectopic beat detection. Comprehensive ablation studies across patch lengths (8, 16, 32) are currently ongoing.',
        takeaway: 'Multi-head self-attention effectively models long-range morphological dependencies in biological signals without the step-by-step recursion bottlenecks of traditional RNNs.'
      }
    },
    {
      id: 'proj-vision',
      number: '02',
      title: 'Deep Vision Anomaly Segmentation',
      category: 'AI',
      filterCategories: ['all', 'ai', 'research'],
      year: '2024',
      status: 'Completed',
      summary: 'Hybrid convolutional encoder-decoder neural network designed to isolate subtle pixel-level micro-structural anomalies in high-throughput imagery with 98.6% precision.',
      architectureBrief: 'ResNet-50 Feature Backbone + Asymmetric U-Net Decoder Skip Connections',
      framework: 'PyTorch • OpenCV • Albumentations • NumPy',
      metric: 'mIoU: 0.892 • Precision: 98.6% • Latency: 18ms',
      repoUrl: 'https://github.com/wahyusatya',
      tags: ['Computer Vision', 'PyTorch', 'Image Segmentation', 'ResNet', 'U-Net'],
      visualType: 'vision-anomaly',
      caseStudy: {
        problem: 'Detecting micro-structural anomalies and surface defects requires dense pixel-level localization that standard image classification backbones fail to resolve due to excessive downsampling.',
        approach: 'Engineered a hybrid encoder-decoder topology combining a pre-trained ResNet-50 backbone for multi-scale semantic feature extraction with asymmetric skip-connections in a U-Net decoder to reconstruct crisp boundary segmentations.',
        architecture: 'Input Image (512x512) → ResNet-50 Residual Stages → Spatial Bottleneck Layer → Transposed 2D Convolutions with Skip Concatenations → Sigmoid Probability Mask.',
        experiment: 'Trained using combined Binary Cross-Entropy (BCE) and Soft Dice Loss over 100 epochs with AdamW optimization and cosine annealing learning rate schedules.',
        results: 'Achieved Mean Intersection over Union (mIoU: 0.892) and 98.6% precision with an ultra-fast GPU tensor core inference time of 18ms per frame.',
        takeaway: 'Preserving low-level spatial features via lateral skip connections is essential when segmenting thin micro-defects that would otherwise vanish in deep residual representations.'
      }
    },
    {
      id: 'proj-synapse',
      number: '03',
      title: 'SynapseFlow High-Throughput Canvas Engine',
      category: 'Web',
      filterCategories: ['all', 'web'],
      year: '2024',
      status: 'Production',
      summary: 'Ultra-responsive 2D HTML5 Canvas rendering engine projecting dynamic multi-dimensional neural activations, particle topologies, and interactive nodes at stable 60 FPS.',
      architectureBrief: 'Double-Buffered Canvas Game Loop + Verlet Particle Physics Engine',
      framework: 'React 19 • TypeScript • HTML5 Canvas • Tailwind CSS',
      metric: 'Stable 60 FPS @ 1,000+ Nodes • Zero Layout Shift (CLS: 0.00)',
      repoUrl: 'https://github.com/wahyusatya',
      tags: ['React 19', 'TypeScript', 'HTML5 Canvas', 'Physics Engine', 'Zero Jank'],
      visualType: 'canvas-engine',
      caseStudy: {
        problem: 'Standard DOM and SVG-based graph visualization engines experience severe frame rate degradation and browser jank when rendering and simulating more than 200 interconnected physics nodes concurrently.',
        approach: 'Developed a zero-dependency HTML5 2D Canvas rendering engine operating on an unthrottled requestAnimationFrame cycle with custom Verlet particle integration and spatial grid collision pruning.',
        architecture: 'React 19 State Invariants → Animation RAF Dispatcher → Verlet Particle Spring Physics → Batch Canvas 2D Path Renderer.',
        experiment: 'Benchmarked across mobile and desktop devices with up to 1,500 continuous particle nodes subjected to continuous cursor gravity repulsion and interactive node dragging.',
        results: 'Maintains rock-solid 60 FPS with 1,000+ active nodes, zero Cumulative Layout Shift (CLS: 0.00), and a tiny core bundle weight under 40 KB gzip.',
        takeaway: 'Direct canvas batch rendering eliminates the massive memory overhead of DOM nodes, making complex real-time computational visualizations accessible even on low-powered mobile clients.'
      }
    },
    {
      id: 'proj-telemetry',
      number: '04',
      title: 'Predictive Academic Telemetry System',
      category: 'Data',
      filterCategories: ['all', 'data', 'web'],
      year: '2024',
      status: 'Completed',
      summary: 'End-to-end data pipeline processing longitudinal institutional metrics from relational database schemas to forecast student risk factors and retention indicators.',
      architectureBrief: 'Normalized 3NF MySQL Schemas + Ensemble Gradient Boosting & Random Forest',
      framework: 'Python • Pandas • Scikit-learn • MySQL • FastAPI',
      metric: 'AUC-ROC: 0.941 • F1-Score: 0.912',
      repoUrl: 'https://github.com/wahyusatya',
      tags: ['Data Science', 'Machine Learning', 'MySQL', 'Scikit-learn', 'ETL Pipeline'],
      visualType: 'data-telemetry',
      caseStudy: {
        problem: 'University departments lacked systematic, automated telemetry to identify at-risk students early enough in the academic semester to implement targeted educational interventions.',
        approach: 'Architected a normalized 3NF MySQL relational database schema and built an automated Python ETL pipeline that extracts longitudinal assignment milestones, attendance deltas, and historical grade trajectories into a tuned voting classifier.',
        architecture: 'Relational 3NF MySQL Store → Automated Python Imputation & Feature Extraction Pipeline → Voting Classifier (Gradient Boosting + Random Forest + Logistic Regression) → Telemetry Dashboard.',
        experiment: 'Evaluated using 5-Fold Stratified Cross-Validation on multi-year student cohorts with precision-recall threshold tuning to prioritize recall on high-risk students.',
        results: 'Achieved an AUC-ROC of 0.941 and an F1-Score of 0.912, accompanied by global Tree SHAP feature importance charts providing transparent interpretability for academic advisors.',
        takeaway: 'Longitudinal velocity features (e.g., changes in submission timing and incremental grade deltas) provide significantly greater predictive signal than static cumulative GPA metrics.'
      }
    }
  ] as Project[],

  certifications: [
    {
      id: 'cert-1',
      title: 'Data Science Professional',
      issuer: 'IBM Professional Network',
      issuerKey: 'ibm',
      image: './assets/certi-1.png',
      description: 'Mastery of data science methodologies, exploratory data analysis, machine learning foundations, and Python-driven predictive analytics.',
      skills: ['Data Science', 'Machine Learning', 'Python', 'Predictive Modeling']
    },
    {
      id: 'cert-2',
      title: 'Python for Data Science',
      issuer: 'Belajar Skill Academy',
      issuerKey: 'skill',
      image: './assets/certi-2.png',
      description: 'Advanced Python programming for computational analytics, data structures, algorithm design, and statistical data visualization.',
      skills: ['Python', 'Data Structures', 'Data Analysis', 'Algorithms']
    },
    {
      id: 'cert-3',
      title: 'TOEFL ITP® - Score 530 (Bronze / B2)',
      issuer: 'Indonesian International Education Foundation (IIEF) / ETS',
      issuerKey: 'toefl',
      image: './assets/certi-3.png',
      description: 'Standardized international academic English proficiency certification. Listening: 57, Structure & Written Expression: 49, Reading: 53. Level 1 Total: 530 (CEFR B2 Bronze).',
      skills: ['Academic English', 'Technical Reading', 'International Collaboration', 'CEFR B2']
    }
  ] as Certification[],

  experiences: [
    {
      id: 'exp-1',
      year: '2024',
      role: 'Coordinator of Administration & Secretariat',
      organization: 'HUT Jurusan Teknik Informatika Ke-13 (Undiksha)',
      description: 'Spearheaded operational governance and executive document workflows for the 13th anniversary summit of the Department of Informatics Engineering.',
      category: 'Leadership',
      tag: 'Executive Governance'
    },
    {
      id: 'exp-2',
      year: '2024',
      role: 'General Affairs Officer & Technical Logistics',
      organization: 'Gelar Karya TIK (Undiksha)',
      description: 'Engineered physical computing infrastructure and technical equipment orchestration for the annual ICT Grand Exhibition.',
      category: 'Governance',
      tag: 'Technical Logistics'
    },
    {
      id: 'exp-3',
      year: '2024',
      role: 'Field Scoring Coordinator & Judge Liaison',
      organization: 'Gema Lomba Matematika (GLM)',
      description: 'Managed competitive scoring matrices, tabulation accuracy, and judging protocols for the regional Mathematics Olympiad.',
      category: 'Governance',
      tag: 'Evaluation Matrices'
    },
    {
      id: 'exp-4',
      year: '2024',
      role: 'Head of Media, Documentation & Live Broadcast',
      organization: 'Lomba Keterampilan Baris-Berbaris (LKBB)',
      description: 'Directed multi-camera live broadcast, real-time photographic curation, and digital public dissemination for the annual marching competition.',
      category: 'Media',
      tag: 'Digital Curation'
    },
    {
      id: 'exp-5',
      year: '2024',
      role: 'Documentation & Public Affairs Coordinator',
      organization: 'Dies Natalis Undiksha Ke-31',
      description: 'Led digital media archiving, visual asset creation, and institutional press coverage for the 31st Anniversary of Universitas Pendidikan Ganesha.',
      category: 'Media',
      tag: 'Media Production'
    }
  ] as ExperienceItem[],

  skills: [
    {
      name: 'Deep Learning & Vision',
      category: 'dl',
      level: 'Research Focus',
      levelColor: 'text-accent-primary',
      description: '1D/2D Vision Transformers, convolutional encoder-decoder backbones (ResNet, U-Net), anomaly segmentation, and PyTorch training loops.',
      tags: ['PyTorch', '1D-ViT', 'TorchVision', 'U-Net', 'CUDA', 'OpenCV']
    },
    {
      name: 'High-Craft Web Systems',
      category: 'web',
      level: 'Production Grade',
      levelColor: 'text-accent-primary',
      description: 'Building zero-jank client architectures with React 19, strict TypeScript contracts, direct HTML5 Canvas rendering, and accessible styling.',
      tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'HTML5 Canvas', 'Vite', 'Framer Motion']
    },
    {
      name: 'Data Science & Statistical ML',
      category: 'data',
      level: 'Proficient',
      levelColor: 'text-accent-primary',
      description: 'Exploratory data analysis, missing-value imputation, feature engineering, and predictive tree algorithms in Scikit-learn.',
      tags: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Statistical Inference', 'EDA']
    },
    {
      name: 'Relational Schemas & Tooling',
      category: 'tools',
      level: 'Production Grade',
      levelColor: 'text-accent-primary',
      description: 'Normalized 3NF database schema design, containerization, Git version control workflows, and Linux command-line environments.',
      tags: ['MySQL', 'PostgreSQL', 'MongoDB', 'Docker', 'Git / GitHub', 'Linux CLI', 'Anaconda']
    }
  ] as SkillItem[],
};
