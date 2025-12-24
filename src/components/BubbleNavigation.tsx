import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Wrench, Rocket, Mail } from 'lucide-react';

interface BubbleNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isCompact?: boolean;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: Rocket },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const BubbleNavigation = ({ currentPage, onNavigate, isCompact = false }: BubbleNavigationProps) => {
  const [hoveredBubble, setHoveredBubble] = useState<string | null>(null);
  const [expandingBubble, setExpandingBubble] = useState<string | null>(null);

  const handleBubbleClick = (pageId: string) => {
    if (pageId === currentPage) return;
    setExpandingBubble(pageId);
    setTimeout(() => {
      onNavigate(pageId);
      setExpandingBubble(null);
    }, 500);
  };

  const bubbleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    }),
    hover: {
      scale: 1.15,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const glowVariants = {
    initial: { opacity: 0.3 },
    hover: { opacity: 0.8, scale: 1.3 },
  };

  if (isCompact) {
    return (
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-full glass-card border border-primary/30"
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleBubbleClick(item.id)}
              className={`relative p-3 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Icon className="w-5 h-5" />
              {isActive && (
                <motion.div
                  layoutId="activeBubble"
                  className="absolute inset-0 rounded-full border border-primary animate-glow-pulse"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Tooltip */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-primary whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            </motion.button>
          );
        })}
        
        {/* Expanding bubble transition */}
        <AnimatePresence>
          {expandingBubble && (
            <motion.div
              className="fixed inset-0 bg-primary/20 rounded-full pointer-events-none"
              initial={{ scale: 0, x: '-50%', y: '-50%', left: '50%', top: '50%' }}
              animate={{ scale: 100 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>
      </motion.nav>
    );
  }

  return (
    <div className="relative flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 p-8">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isHovered = hoveredBubble === item.id;
        const isExpanding = expandingBubble === item.id;
        
        return (
          <motion.div
            key={item.id}
            className="relative"
            custom={index}
            variants={bubbleVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onMouseEnter={() => setHoveredBubble(item.id)}
            onMouseLeave={() => setHoveredBubble(null)}
            onClick={() => handleBubbleClick(item.id)}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
              variants={glowVariants}
              animate={isHovered ? 'hover' : 'initial'}
            />
            
            {/* Main bubble */}
            <motion.div
              className={`relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full cursor-pointer
                         flex flex-col items-center justify-center gap-2
                         glass-card border border-primary/40 overflow-hidden
                         ${isExpanding ? 'animate-bubble-expand' : ''}`}
              style={{
                boxShadow: isHovered 
                  ? '0 0 40px hsl(var(--primary) / 0.5), inset 0 0 30px hsl(var(--primary) / 0.1)'
                  : '0 0 20px hsl(var(--primary) / 0.2), inset 0 0 15px hsl(var(--primary) / 0.05)',
              }}
            >
              {/* Circuit pattern overlay */}
              <div className="absolute inset-0 circuit-pattern opacity-30" />
              
              {/* Holographic shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10"
                animate={{
                  opacity: isHovered ? 0.8 : 0.3,
                }}
              />
              
              {/* Icon */}
              <Icon 
                className={`w-8 h-8 md:w-10 md:h-10 transition-all duration-300 relative z-10
                           ${isHovered ? 'text-primary text-glow-strong' : 'text-foreground/80'}`}
              />
              
              {/* Label */}
              <span 
                className={`font-orbitron text-xs md:text-sm font-semibold tracking-wider relative z-10
                           ${isHovered ? 'text-primary text-glow' : 'text-foreground/70'}`}
              >
                {item.label.toUpperCase()}
              </span>
              
              {/* Scanning line effect */}
              {isHovered && (
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ top: '-10%' }}
                  animate={{ top: '110%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </motion.div>
            
            {/* Orbiting particles */}
            {isHovered && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-primary rounded-full"
                      style={{
                        transform: `translateX(${60 + i * 15}px) translateY(-50%)`,
                        boxShadow: '0 0 10px hsl(var(--primary))',
                      }}
                    />
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        );
      })}
      
      {/* Page transition overlay */}
      <AnimatePresence>
        {expandingBubble && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-primary/30 via-background/80 to-background"
              initial={{ scale: 0 }}
              animate={{ scale: 2 }}
              transition={{ duration: 0.5 }}
            />
            {/* Digital glitch lines */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 right-0 h-px bg-primary/50"
                style={{ top: `${20 + i * 15}%` }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0, 1, 0] }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BubbleNavigation;
