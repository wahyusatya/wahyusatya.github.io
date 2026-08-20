export interface Project {
  id: string;
  title: string;
  category: 'Deep Learning' | 'Web Engineering' | 'Data Science';
  year: string;
  summary: string;
  architecture: string;
  framework: string;
  metric: string;
  repoUrl: string;
  demoUrl?: string;
  tags: string[];
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
    role: 'Senior Web Developer & Deep Learning Researcher',
    institution: 'Universitas Pendidikan Ganesha (Undiksha)',
    department: 'Information Systems',
    status: 'Available for Roles & Research',
    email: 'satyagiridharma@gmail.com',
    github: 'https://github.com/wahyusatya',
    linkedin: 'https://www.linkedin.com/in/wahyusatya/',
    resumePdf: './assets/ws-cv-resume.pdf',
    profileImg: './assets/profile-pic.png',
    aboutImg: './assets/about-pic.png',
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
      id: 'proj-1',
      title: 'Deep Vision Anomaly Segmentation',
      category: 'Deep Learning',
      year: '2024',
      summary: 'Custom convolutional encoder-decoder neural network designed to isolate subtle pixel-level anomalies in high-throughput imagery with 98.6% precision.',
      architecture: 'ResNet-50 Backbone + U-Net Skip Connections',
      framework: 'PyTorch • OpenCV • NumPy',
      metric: 'mIoU: 0.892 • Inference: 18ms',
      repoUrl: 'https://github.com/wahyusatya',
      tags: ['Computer Vision', 'PyTorch', 'Image Segmentation', 'ResNet']
    },
    {
      id: 'proj-2',
      title: 'SynapseFlow Interactive Visualizer',
      category: 'Web Engineering',
      year: '2024',
      summary: 'Ultra-responsive web visualizer mapping multi-dimensional neural activations, loss landscapes, and real-time canvas topological projections at 60 frames per second.',
      architecture: 'Custom 3D WebGL Shader + Verlet Particle Spring Physics',
      framework: 'React 19 • Three.js • TypeScript • Tailwind CSS',
      metric: 'Zero Dependency Core • < 40KB Gzip Bundle',
      repoUrl: 'https://github.com/wahyusatya',
      tags: ['Three.js', 'React', 'WebGL', 'Simulation']
    },
    {
      id: 'proj-3',
      title: 'Predictive Academic Telemetry System',
      category: 'Data Science',
      year: '2024',
      summary: 'End-to-end data pipeline processing longitudinal institutional metrics to forecast student retention, scholastic risk factors, and curriculum optimization targets.',
      architecture: 'Ensemble Gradient Boosting + Random Forest + Logistic Regression',
      framework: 'MySQL Schemas • Pandas • Scikit-learn',
      metric: 'AUC-ROC: 0.941 • F1-Score: 0.912',
      repoUrl: 'https://github.com/wahyusatya',
      tags: ['Data Science', 'Machine Learning', 'MySQL', 'Scikit-learn']
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
      description: 'Applied computational Python, algorithmic workflows, statistical packages (NumPy, Pandas, Matplotlib), and practical dataset processing.',
      skills: ['Python 3', 'Pandas', 'NumPy', 'Data Structures']
    },
    {
      id: 'cert-3',
      title: 'TOEFL ITP® - Score 530 (Bronze / B2)',
      issuer: 'The TOEFL® Program • One Stop English Education',
      issuerKey: 'toefl',
      image: './assets/certi-3.png',
      description: 'Official standardized assessment demonstrating advanced English proficiency (Listening: 57, Reading: 53, Structure: 49) with Level 1 Total Score 530.',
      skills: ['TOEFL ITP (530)', 'Listening (57)', 'Reading (53)', 'Structure (49)', 'Academic English']
    }
  ] as Certification[],

  experiences: [
    {
      id: 'exp-1',
      year: '2024',
      role: 'Member of the Competition Committee',
      organization: 'PAT x Tweak #9 Summit',
      description: 'Orchestrated competitive rules, participant technical submissions, and judging scoring matrices for high-stakes technology competitions.',
      category: 'Governance',
      tag: 'Competition Governance'
    },
    {
      id: 'exp-2',
      year: '2024',
      role: 'Secretary of the Competition Committee',
      organization: 'U-Tech 2024 Technological Symposium',
      description: 'Led administrative documentation, institutional correspondence, and scoring pipeline management across faculty-wide tech events.',
      category: 'Leadership',
      tag: 'Executive Administration'
    },
    {
      id: 'exp-3',
      year: '2024',
      role: 'Videographer & Documentary Video Editor',
      organization: 'Community Service Committee • SMA Negeri Bali Mandara',
      description: 'Curated and edited comprehensive documentary films chronicling institutional community outreach, educational initiatives, and visual storytelling.',
      category: 'Media',
      tag: 'Visual Media Production'
    },
    {
      id: 'exp-4',
      year: '2024',
      role: 'Member of the Assignment Committee',
      organization: 'OKF-ID 2024',
      description: 'Supervised participant project deliverables, operational workflows, and curriculum assignment evaluations.',
      category: 'Governance',
      tag: 'Evaluation Logistics'
    },
    {
      id: 'exp-5',
      year: '2024',
      role: 'Public Relations & Social Service Division Staff',
      organization: 'BEM FTK (Faculty of Engineering & Vocational) 2024/2025',
      description: 'Spearheaded institutional public communications, ZI-WBK integrity pact conventions, working meeting PR, and grassroots social service programs.',
      category: 'Leadership',
      tag: 'Institutional PR & Leadership'
    },
    {
      id: 'exp-6',
      year: '2023',
      role: 'Member of the Competition Committee',
      organization: 'Tweak #8 Technology Event',
      description: 'Coordinated technical tournament tracks, event logistics, and candidate orientation for the annual faculty technology summit.',
      category: 'Governance',
      tag: 'Event Operations'
    }
  ] as ExperienceItem[],

  skills: [
    {
      name: 'PyTorch & Deep Learning',
      category: 'dl',
      level: 'Advanced Research',
      levelColor: 'text-cyan-glow',
      description: 'Convolutional Neural Networks, Vision Transformers, MLP architectures, Loss Optimization, PyTorch Lightning, Tensor manipulation.',
      tags: ['PyTorch', 'TensorFlow', 'TorchVision', 'NumPy']
    },
    {
      name: 'Modern Web Engineering',
      category: 'web',
      level: 'Senior Craft',
      levelColor: 'text-violet-glow',
      description: 'React 19, TypeScript, Semantic HTML5, Advanced Tailwind CSS, Canvas 2D/WebGL engines, Responsive Fluid Systems, Zero-jank rendering.',
      tags: ['React 19', 'TypeScript', 'Three.js', 'Tailwind CSS']
    },
    {
      name: 'Data Science & Statistical ML',
      category: 'data',
      level: 'Certified & Practiced',
      levelColor: 'text-emerald-primary',
      description: 'Exploratory Data Analysis (EDA), Feature Engineering, Scikit-learn classification & regression, Pandas high-throughput pipelines.',
      tags: ['Pandas', 'Scikit-Learn', 'Statistical Inference', 'EDA']
    },
    {
      name: 'SQL & Database Architecture',
      category: 'data',
      level: 'HackerRank Certified',
      levelColor: 'text-amber-primary',
      description: 'Relational database design (3NF/BCNF), complex joins, subqueries, indexing strategies, MySQL, PostgreSQL, data normalization & query profiling.',
      tags: ['MySQL', 'PostgreSQL', 'Normalization', 'Query Optimization']
    },
    {
      name: 'Computer Vision & Multimedia',
      category: 'dl',
      level: 'Applied Experience',
      levelColor: 'text-cyan-glow',
      description: 'Image preprocessing, OpenCV filtering, spatial convolutions, video editing & post-production (Videography, documentary narrative curation).',
      tags: ['OpenCV', 'Video Editing', 'Image Augmentation', 'Media Pipelines']
    },
    {
      name: 'DevOps, Git & Scientific Env',
      category: 'tools',
      level: 'Daily Workflow',
      levelColor: 'text-violet-glow',
      description: 'Git version control, Linux CLI environments, Jupyter Scientific Workbenches, Google Colab GPU acceleration, GitHub Pages & CI/CD deployment.',
      tags: ['Git / GitHub', 'Linux CLI', 'Jupyter', 'Google Colab']
    }
  ] as SkillItem[]
};
