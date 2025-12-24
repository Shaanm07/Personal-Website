import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
}

const PageTransition = ({ children, pageKey }: PageTransitionProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen"
      >
        {/* Scanline effect on entry */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
              style={{ top: `${10 + i * 12}%` }}
              initial={{ scaleX: 0, x: i % 2 === 0 ? '-100%' : '100%' }}
              animate={{ scaleX: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
            />
          ))}
        </motion.div>
        
        {/* Grid overlay flash */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-40 circuit-pattern"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
        
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
