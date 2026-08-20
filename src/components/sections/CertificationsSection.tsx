import React, { useState } from 'react';
import { ZoomIn, Award } from 'lucide-react';
import { PORTFOLIO_DATA, Certification } from '../../data/portfolioData';
import { LightboxModal } from '../ui/LightboxModal';

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="credentials" className="py-24 border-b border-hairline">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">
            AUTHENTICATED VAULT
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-text tracking-tight">
            Verified Credentials & Academic Certifications
          </h2>
          <p className="text-sm text-slate-muted max-w-2xl">
            Formal standardized certifications validating proficiency in Data Science, Computational Python, and International Academic English.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.certifications.map((cert: Certification) => (
            <article
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="rounded-lg bg-bg-surface border border-hairline hover:border-subtle flex flex-col justify-between overflow-hidden cursor-pointer transition-colors group"
            >
              {/* Document Thumbnail Preview */}
              <div className="relative h-44 bg-bg-ground border-b border-hairline/60 p-3 flex items-center justify-center overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-h-full max-w-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center gap-2 text-slate-text font-mono text-xs">
                  <ZoomIn className="w-4 h-4 text-accent-primary" />
                  <span>Inspect Document</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <div className="font-mono text-[11px] text-accent-primary uppercase tracking-wider">
                    {cert.issuer}
                  </div>
                  <h3 className="text-sm font-bold text-slate-text">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-muted leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-hairline/40">
                  {cert.skills.map((sk) => (
                    <span
                      key={sk}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-bg-ground border border-hairline/60 text-slate-dim"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Inspection Modal */}
      {selectedCert && (
        <LightboxModal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          imageUrl={selectedCert.image}
          title={`${selectedCert.title} — ${selectedCert.issuer}`}
        />
      )}
    </section>
  );
};
