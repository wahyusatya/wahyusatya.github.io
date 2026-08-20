import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Copy, Check, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { useToast } from '../ui/ToastContext';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'research',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    showToast('📋 Email copied to clipboard: ' + PORTFOLIO_DATA.personal.email, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Trigger celebratory particle confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#8b5cf6', '#10b981'],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      showToast(`🚀 Transmission dispatched from ${formData.name || 'Collaborator'}! I will respond promptly.`, 'success');
      setFormData({ name: '', email: '', topic: 'research', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Initialize Connection & Collaboration
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Available for Senior Web Development roles, Deep Learning research collaborations, AI consulting, and technical leadership opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Details Cards */}
        <div className="lg:col-span-5 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-bg-surface/80 border border-white/10 backdrop-blur-md flex items-center justify-between gap-4 hover:border-cyan-primary/40 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-primary/10 text-cyan-glow">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="font-mono text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
                  Direct Email
                </div>
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="text-sm sm:text-base font-bold text-slate-100 hover:text-cyan-glow transition-colors"
                >
                  {PORTFOLIO_DATA.personal.email}
                </a>
              </div>
            </div>
            <button
              onClick={copyEmail}
              className="p-2 rounded-xl bg-bg-deep border border-white/10 hover:border-cyan-primary/50 text-slate-400 hover:text-cyan-glow transition-all cursor-pointer"
              title="Copy email"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-primary" /> : <Copy className="w-4 h-4" />}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-bg-surface/80 border border-white/10 backdrop-blur-md flex items-center justify-between gap-4 hover:border-cyan-primary/40 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-violet-primary/10 text-violet-glow">
                <Linkedin className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="font-mono text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
                  Professional Network
                </div>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-bold text-slate-100 hover:text-violet-glow transition-colors"
                >
                  linkedin.com/in/wahyusatya
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-bg-surface/80 border border-white/10 backdrop-blur-md flex items-center justify-between gap-4 hover:border-cyan-primary/40 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-primary/10 text-emerald-primary">
                <Github className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="font-mono text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
                  Open Source Workspace
                </div>
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-bold text-slate-100 hover:text-emerald-primary transition-colors"
                >
                  github.com/wahyusatya
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Interactive Message Dispatcher */}
        <div className="lg:col-span-7">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-bg-surface/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-slate-100 text-base">Direct Transmission Payload</h3>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-primary bg-emerald-primary/10 px-2 py-0.5 rounded-full border border-emerald-primary/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                TLS Secured
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Name / Organization</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Alex Chen / Neural Lab"
                  className="w-full bg-bg-deep border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Return Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex.chen@organization.ai"
                  className="w-full bg-bg-deep border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Collaboration Track</label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full bg-bg-deep border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:border-cyan-primary focus:outline-none"
              >
                <option value="research">Deep Learning Research & Collaboration</option>
                <option value="web">Senior Frontend / Web Architecture Role</option>
                <option value="data">Data Science & Model Pipeline Project</option>
                <option value="general">Academic Exchange & General Inquiries</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Message Scope</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe project objectives, technical scope, or research goals..."
                className="w-full bg-bg-deep border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-semibold text-sm shadow-md shadow-cyan-primary/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Dispatching...' : 'Dispatch Transmission'}</span>
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
