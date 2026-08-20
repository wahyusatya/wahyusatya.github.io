import React, { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, Send } from 'lucide-react';
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
    showToast('Email address copied to clipboard: ' + PORTFOLIO_DATA.personal.email, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToast(`Inquiry received from ${formData.name || 'Visitor'}. I will respond promptly via email.`, 'success');
      setFormData({ name: '', email: '', topic: 'research', message: '' });
    }, 500);
  };

  return (
    <section id="contact" className="py-24 border-b border-hairline">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">
            COMMUNICATION & INQUIRIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-text tracking-tight">
            Direct Inquiries & Collaboration
          </h2>
          <p className="text-sm text-slate-muted max-w-2xl">
            Available for deep learning research initiatives, senior web engineering roles, data science consulting, and technical leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-lg bg-bg-surface border border-hairline space-y-3">
              <div className="font-mono text-xs text-slate-dim uppercase tracking-wider">
                Direct Email Channel
              </div>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="font-mono text-xs sm:text-sm text-slate-text hover:text-accent-primary transition-colors truncate"
                >
                  {PORTFOLIO_DATA.personal.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="p-1.5 rounded bg-bg-ground border border-hairline text-slate-muted hover:text-slate-text transition-colors"
                  title="Copy email address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-bg-surface border border-hairline space-y-4">
              <div className="font-mono text-xs text-slate-dim uppercase tracking-wider">
                Professional Networks
              </div>
              <div className="space-y-3 font-mono text-xs">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded bg-bg-ground border border-hairline/60 text-slate-muted hover:text-slate-text hover:border-subtle transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-dim" />
                    <span>github.com/wahyusatya</span>
                  </div>
                  <span className="text-[10px] text-accent-primary">Code</span>
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded bg-bg-ground border border-hairline/60 text-slate-muted hover:text-slate-text hover:border-subtle transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-slate-dim" />
                    <span>linkedin.com/in/wahyusatya</span>
                  </div>
                  <span className="text-[10px] text-accent-primary">Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Technical Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-lg bg-bg-surface border border-hairline space-y-4"
            >
              <div className="border-b border-hairline/60 pb-3">
                <span className="font-mono text-xs text-slate-text uppercase tracking-wider">
                  Transmit Inquiry
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-dim">Name / Organization</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Alex Chen / Research Lab"
                    className="w-full bg-bg-ground border border-hairline rounded px-3 py-2 text-xs text-slate-text placeholder:text-slate-dim focus:border-accent-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-dim">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex.chen@institution.edu"
                    className="w-full bg-bg-ground border border-hairline rounded px-3 py-2 text-xs text-slate-text placeholder:text-slate-dim focus:border-accent-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-dim">Inquiry Scope</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full bg-bg-ground border border-hairline rounded px-3 py-2 text-xs text-slate-text focus:border-accent-primary focus:outline-none font-sans"
                >
                  <option value="research">Deep Learning Research & Vision Architecture</option>
                  <option value="web">Fullstack / Senior Web Engineering Role</option>
                  <option value="data">Data Science & Machine Learning Pipeline</option>
                  <option value="general">Academic Exchange & General Inquiries</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-dim">Message Details</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your research goals, technical requirements, or collaboration scope..."
                  className="w-full bg-bg-ground border border-hairline rounded px-3 py-2 text-xs text-slate-text placeholder:text-slate-dim focus:border-accent-primary focus:outline-none font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded bg-bg-elevated hover:bg-bg-ground border border-hairline hover:border-accent-primary text-slate-text text-xs font-mono tracking-wide transition-colors cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                <Send className="w-3.5 h-3.5 text-accent-primary" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
