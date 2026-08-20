import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Search, X, Play, FileText, Cpu, Award, Mail, ArrowRight } from 'lucide-react';
import { useToast } from './ToastContext';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const { showToast } = useToast();

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

      if (['help', 'man'].includes(cmd)) {
        setOutput(`AVAILABLE SYSTEM COMMANDS:
• lab          - Launch interactive Neural Model Sandbox
• cv / resume  - Open official Curriculum Vitae PDF
• skills       - Inspect deep learning & web capabilities matrix
• projects     - View research artifacts & repo weights
• certs        - View verified IBM & HackerRank credentials
• contact      - Initialize transmission / copy email
• clear        - Reset output buffer`);
      } else if (['lab', 'dl', 'model', 'sandbox'].includes(cmd)) {
        handleAction(() => document.querySelector('#lab')?.scrollIntoView({ behavior: 'smooth' }));
      } else if (['cv', 'resume', 'pdf'].includes(cmd)) {
        handleAction(() => window.open(PORTFOLIO_DATA.personal.resumePdf, '_blank'));
      } else if (['skills', 'stack', 'tech'].includes(cmd)) {
        handleAction(() => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }));
      } else if (['projects', 'research'].includes(cmd)) {
        handleAction(() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }));
      } else if (['certs', 'certifications'].includes(cmd)) {
        handleAction(() => document.querySelector('#certifications')?.scrollIntoView({ behavior: 'smooth' }));
      } else if (['contact', 'email'].includes(cmd)) {
        handleAction(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }));
      } else if (cmd === 'clear') {
        setOutput(null);
        setQuery('');
      } else {
        setOutput(`Command not recognized: "${cmd}". Type "help" for options.`);
      }
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    showToast('📋 Email copied to clipboard: ' + PORTFOLIO_DATA.personal.email, 'success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 md:pt-28">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-bg-dark/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative z-10 w-full max-w-xl bg-bg-surface border border-cyan-primary/30 rounded-2xl shadow-elevated overflow-hidden flex flex-col"
          >
            {/* Header / Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-bg-deep">
              <Terminal className="w-5 h-5 text-cyan-glow shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (output) setOutput(null);
                }}
                onKeyDown={handleCommandEnter}
                placeholder="Type command or jump (e.g. lab, cv, skills, help)..."
                className="w-full bg-transparent text-slate-100 text-sm font-sans placeholder:text-slate-500 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-3 max-h-[380px] overflow-y-auto space-y-2">
              {output ? (
                <div className="p-3.5 rounded-xl bg-bg-deep border border-white/5 font-mono text-xs text-cyan-glow leading-relaxed whitespace-pre-wrap">
                  {output}
                </div>
              ) : (
                <>
                  <div className="text-[11px] font-mono font-semibold text-slate-400 px-2 pt-1 uppercase tracking-wider">
                    Quick Actions & Jumps
                  </div>

                  <div className="space-y-1.5">
                    <button
                      onClick={() => handleAction(() => document.querySelector('#lab')?.scrollIntoView({ behavior: 'smooth' }))}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-bg-deep hover:bg-bg-elevated border border-white/5 hover:border-cyan-primary/40 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-cyan-primary/10 text-cyan-glow">
                          <Play className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-100 group-hover:text-cyan-glow">
                            Launch Interactive Neural Lab
                          </div>
                          <div className="text-xs text-slate-400">
                            Hyperparameter tuning, forward propagation & loss curve
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] bg-bg-surface px-2 py-0.5 rounded text-cyan-glow border border-white/10">
                        JUMP
                      </span>
                    </button>

                    <button
                      onClick={() => handleAction(() => window.open(PORTFOLIO_DATA.personal.resumePdf, '_blank'))}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-bg-deep hover:bg-bg-elevated border border-white/5 hover:border-emerald-primary/40 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-emerald-primary/10 text-emerald-primary">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-100 group-hover:text-emerald-primary">
                            Download Curriculum Vitae (PDF)
                          </div>
                          <div className="text-xs text-slate-400">
                            Official verified academic and engineering resume
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] bg-bg-surface px-2 py-0.5 rounded text-emerald-primary border border-white/10">
                        DOC
                      </span>
                    </button>

                    <button
                      onClick={() => handleAction(() => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }))}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-bg-deep hover:bg-bg-elevated border border-white/5 hover:border-violet-primary/40 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-violet-primary/10 text-violet-glow">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-100 group-hover:text-violet-glow">
                            Inspect Capabilities Matrix
                          </div>
                          <div className="text-xs text-slate-400">
                            PyTorch, Modern Web, Scikit-learn, Relational SQL
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] bg-bg-surface px-2 py-0.5 rounded text-violet-glow border border-white/10">
                        JUMP
                      </span>
                    </button>

                    <button
                      onClick={() => handleAction(copyEmail)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-bg-deep hover:bg-bg-elevated border border-white/5 hover:border-cyan-primary/40 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-cyan-primary/10 text-cyan-glow">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-100 group-hover:text-cyan-glow">
                            Copy Direct Email
                          </div>
                          <div className="text-xs text-slate-400 font-mono">
                            {PORTFOLIO_DATA.personal.email}
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] bg-bg-surface px-2 py-0.5 rounded text-cyan-glow border border-white/10">
                        COPY
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-bg-deep border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span>Press <kbd className="px-1.5 py-0.5 bg-bg-surface border border-white/10 rounded">Enter</kbd> to run</span>
                <span>•</span>
                <span>Type <span className="text-cyan-glow font-bold">help</span> for commands</span>
              </div>
              <span className="hidden sm:inline">ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
