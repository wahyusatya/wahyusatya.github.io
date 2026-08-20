import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-bg-dark/90 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            className="relative z-10 max-w-4xl max-h-[90vh] bg-bg-surface border border-white/15 rounded-2xl p-4 shadow-elevated flex flex-col gap-4 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 px-2">
              <span className="font-semibold text-slate-100 text-sm md:text-base">
                {title}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-bg-elevated hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-2 flex items-center justify-center overflow-auto max-h-[75vh]">
              <img
                src={imageUrl}
                alt={title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
