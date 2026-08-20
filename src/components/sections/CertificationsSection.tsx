import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, Award } from 'lucide-react';
import { PORTFOLIO_DATA, Certification } from '../../data/portfolioData';
import { LightboxModal } from '../ui/LightboxModal';

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const getIssuerDot = (key: string) => {
    if (key === 'ibm') return 'bg-blue-600';
    if (key === 'skill') return 'bg-emerald-500';
    if (key === 'toefl') return 'bg-amber-500';
    return 'bg-cyan-500';
  };

  return (
    <section id="certifications" className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Industry & Academic Certifications
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Authenticated credentials validating competence in Data Science, Computational Python, and International Academic English Proficiency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PORTFOLIO_DATA.certifications.map((cert: Certification, idx: number) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => setSelectedCert(cert)}
            className="rounded-3xl bg-bg-surface/80 border border-white/10 backdrop-blur-md overflow-hidden flex flex-col justify-between hover:border-cyan-primary/50 transition-all hover:-translate-y-1.5 cursor-pointer shadow-lg group"
          >
            {/* Certificate Image Box with Zoom Overlay */}
            <div className="relative h-48 bg-white p-3 flex items-center justify-center overflow-hidden">
              <img
                src={cert.image}
                alt={cert.title}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-bg-dark/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 text-white font-semibold text-xs">
                <ZoomIn className="w-5 h-5 text-cyan-glow" />
                <span>View Full-Res Document</span>
              </div>
            </div>

            {/* Content Box */}
            <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className={`w-2 h-2 rounded-full ${getIssuerDot(cert.issuerKey)}`} />
                  <span>{cert.issuer}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">{cert.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {cert.skills.map((sk) => (
                  <span
                    key={sk}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-bg-deep text-cyan-glow border border-white/5"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <LightboxModal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          imageUrl={selectedCert.image}
          title={`${selectedCert.title} - ${selectedCert.issuer}`}
        />
      )}
    </section>
  );
};
