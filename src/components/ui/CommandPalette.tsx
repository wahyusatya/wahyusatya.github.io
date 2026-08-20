import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Search, X, FileText, Cpu, Mail, ArrowRight, Sun, Moon, Activity, Code2, Database } from 'lucide-react';
import { useToast } from './ToastContext';
import { useTheme } from './ThemeContext';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const { showToast } = useToast();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  const handleCommandEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = query.trim().toLowerCase();
      if (!cmd) return;

      // Terminal Easter Eggs & Command Processing
      if (['help', 'man', '?'].includes(cmd)) {
        setOutput(`ASH RESEARCH LAB TERMINAL COMMANDS:
• about       - Jump to WHOAMI identity & perspective
• research    - Inspect 1D-ViT ECG clinical research
• work        - Jump to selected projects & case studies
• lab         - Launch 12-Lead Signal Playground & experiments
• timeline    - Inspect technical evolution chronology
• stack       - Open interactive capabilities matrix
• theme       - Toggle between Dark / Light theme
• whoami      - Display investigator terminal identity
• matrix      - Display neural tensor coordinate stream
• sudo        - Request root administrative privilege
• resume / cv - Download official Curriculum Vitae PDF
• clear       - Reset output buffer`);
      } else if (['whoami', 'wahyu', 'satya', 'investigator', 'ash'].includes(cmd)) {
        setOutput(`USER: Putu Wahyu Satya Giridharma (Wahyu Satya)
ROLE: Web Developer • Data Scientist • Deep Learning Researcher
AFFILIATION: Universitas Pendidikan Ganesha (B.Sc Information Systems)
LAB LOCALE: Singaraja, Bali, Indonesia (UTC+8)
FOCUS: ECG Classification using pure 1D-ViT with Anatomical Lead Grouping
INTERESTS: Web Development, Python, Data Science, Machine Learning, Deep Learning, Computer Vision, Transformers, Time-Series Data, Data Visualization`);
      } else if (cmd === 'sudo') {
        setOutput(`[ACCESS DENIED] Wahyu Satya is the sole root investigator. Nice try! ;)`);
      } else if (cmd === 'matrix') {
        setOutput(`[TENSOR STREAM]:
[ 0.892, 0.941, 0.986 ] -> 1D-ViT (P=16) -> Attn(Q,K,V) = softmax(QK^T / sqrt(d)) * V
[ 250Hz, 12-Lead, 2500pts ] -> Latency: 14ms -> FPS: 60`);
      } else if (['theme', 'dark', 'light'].includes(cmd)) {
        toggleTheme();
        setOutput(`Theme toggled to: ${theme === 'dark' ? 'LIGHT THEME' : 'DARK THEME'}`);
      } else if (['about', 'bio'].includes(cmd)) {
        handleAction(() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }));
      } else if (['research', 'ecg', 'vit'].includes(cmd)) {
        handleAction(() => document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' }));
      } else if (['work', 'projects', 'cases'].includes(cmd)) {
        handleAction(() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }));
      } else if (['lab', 'signal', 'playground'].includes(cmd)) {
        handleAction(() => document.querySelector('#lab')?.scrollIntoView({ behavior: 'smooth' }));
      } else if (['timeline', 'evolution', 'experience'].includes(cmd)) {
        handleAction(() => document.querySelector('#timeline')?.scrollIntoView({ behavior: 'smooth' }));
      } else if (['stack', 'skills', 'tools'].includes(cmd)) {
        handleAction(() => document.querySelector('#stack')?.scrollIntoView({ behavior: 'smooth' }));
      } else if (['cv', 'resume', 'pdf'].includes(cmd)) {
        handleAction(() => window.open(PORTFOLIO_DATA.personal.resumePdf, '_blank'));
      } else if (['contact', 'email', 'mail'].includes(cmd)) {
        handleAction(() => {
          navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
          showToast('Email address copied to clipboard: ' + PORTFOLIO_DATA.personal.email, 'success');
        });
      } else if (cmd === 'clear') {
        setOutput(null);
        setQuery('');
      } else {
        setOutput(`Command not recognized: "${cmd}". Type "help" for a list of valid commands.`);
      }
    }
  };

  const actions = [
    {
      id: 'research',
      title: 'ECG 1D-ViT Research Investigation',
      desc: 'Anatomical lead grouping & transformer encoder architecture',
      icon: Activity,
      action: () => document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' }),
      category: 'Research',
    },
    {
      id: 'lab',
      title: '12-Lead Signal Playground & Experiments',
      desc: 'Synthetic multi-lead time-series & threshold simulation',
      icon: Cpu,
      action: () => document.querySelector('#lab')?.scrollIntoView({ behavior: 'smooth' }),
      category: 'Lab',
    },
    {
      id: 'work',
      title: 'Explore Case Studies & Projects',
      desc: 'Deep vision segmentation, canvas engines & data telemetry',
      icon: Code2,
      action: () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }),
      category: 'Projects',
    },
    {
      id: 'timeline',
      title: 'Technical Evolution & Academic Timeline',
      desc: 'Chronological progression from programming to 1D-ViT research',
      icon: Database,
      action: () => document.querySelector('#timeline')?.scrollIntoView({ behavior: 'smooth' }),
      category: 'Timeline',
    },
    {
      id: 'theme',
      title: `Toggle Theme (${theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'})`,
      desc: 'Change visual system theme mode',
      icon: theme === 'dark' ? Sun : Moon,
      action: toggleTheme,
      category: 'System',
    },
    {
      id: 'resume',
      title: 'Download Curriculum Vitae (PDF)',
      desc: 'Official verified academic and engineering resume document',
      icon: FileText,
      action: () => window.open(PORTFOLIO_DATA.personal.resumePdf, '_blank'),
      category: 'Document',
    },
    {
      id: 'contact',
      title: 'Copy Direct Email Address',
      desc: PORTFOLIO_DATA.personal.email,
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
        showToast('Email address copied to clipboard: ' + PORTFOLIO_DATA.personal.email, 'success');
      },
      category: 'Contact',
    },
  ];

  const filteredActions = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.desc.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg-dark/85 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            className="relative z-10 w-full max-w-xl bg-bg-surface border border-hairline rounded-lg shadow-2xl overflow-hidden flex flex-col font-mono text-xs"
          >
            {/* Header / Command Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-hairline bg-bg-ground">
              <Terminal className="w-4 h-4 text-accent-primary shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (output) setOutput(null);
                }}
                onKeyDown={handleCommandEnter}
                placeholder="Type command or search (e.g. research, lab, whoami, help)..."
                className="w-full bg-transparent text-slate-text placeholder:text-slate-dim focus:outline-none font-mono text-xs"
              />
              <button
                onClick={onClose}
                className="p-1 rounded text-slate-dim hover:text-slate-text cursor-pointer"
                aria-label="Close Command Palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-3 max-h-[380px] overflow-y-auto space-y-2">
              {output ? (
                <div className="p-4 rounded bg-bg-ground border border-hairline font-mono text-xs text-accent-primary leading-relaxed whitespace-pre-wrap">
                  {output}
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-[10px] uppercase text-slate-dim px-2 pt-1 font-bold">
                    Quick Navigation & Commands ({filteredActions.length})
                  </div>

                  {filteredActions.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleAction(item.action)}
                        className="w-full flex items-center justify-between p-2.5 rounded bg-bg-surface hover:bg-bg-elevated border border-hairline/60 hover:border-accent-primary/40 transition-colors text-left group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded bg-bg-ground border border-hairline text-slate-dim group-hover:text-accent-primary">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-sans font-bold text-xs text-slate-text group-hover:text-accent-primary transition-colors">
                              {item.title}
                            </div>
                            <div className="font-sans text-[11px] text-slate-dim">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-dim uppercase px-1.5 py-0.5 rounded bg-bg-ground border border-hairline">
                          {item.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Tip Bar */}
            <div className="px-4 py-2.5 bg-bg-ground border-t border-hairline flex items-center justify-between text-[10px] text-slate-dim">
              <div className="flex items-center gap-2">
                <span>Press <kbd className="px-1 py-0.5 bg-bg-surface border border-hairline rounded text-slate-text">Enter</kbd> to run</span>
                <span>•</span>
                <span>Type <span className="text-accent-primary font-bold">help</span> for easter eggs</span>
              </div>
              <span>ESC to dismiss</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
