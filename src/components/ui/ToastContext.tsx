import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-elevated/95 backdrop-blur-md border border-cyan-primary/40 shadow-elevated text-sm text-slate-100 font-medium"
            >
              {t.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-primary shrink-0" />
              ) : t.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              ) : (
                <Sparkles className="w-4 h-4 text-cyan-glow shrink-0" />
              )}
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
