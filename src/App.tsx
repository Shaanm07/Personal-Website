import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

type PageType = 'home' | 'experience' | 'skills' | 'projects' | 'contact';

const App = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = useCallback((page: string) => {
    if (page === currentPage || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Delay page change to allow transition animation
    setTimeout(() => {
      setCurrentPage(page as PageType);
      setIsTransitioning(false);
    }, 500);
  }, [currentPage, isTransitioning]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'experience':
        return <ExperiencePage onNavigate={handleNavigate} />;
      case 'skills':
        return <SkillsPage onNavigate={handleNavigate} />;
      case 'projects':
        return <ProjectsPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Page transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Radial expansion effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-primary/30 via-background/90 to-background"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 3, opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            
            {/* Horizontal scan lines */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                style={{ top: `${5 + i * 10}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ delay: i * 0.02, duration: 0.4 }}
              />
            ))}
            
            {/* Center flash */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                boxShadow: '0 0 60px hsl(var(--primary)), 0 0 100px hsl(var(--primary) / 0.5)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* Global HUD elements */}
      <div className="fixed bottom-4 left-4 text-xs font-mono text-primary/40 hidden md:block z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          PORTFOLIO.SYS // {currentPage.toUpperCase()}
        </motion.div>
      </div>
    </div>
  );
};

export default App;
