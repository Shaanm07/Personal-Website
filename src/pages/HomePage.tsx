import { motion } from 'framer-motion';
import BubbleNavigation from '../components/BubbleNavigation';
import TypingText from '../components/TypingText';
import roboticArmBg from '../assets/robotic-arm-bg.jpg';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={roboticArmBg}
          alt="Robotic arm background"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
        
        {/* Animated circuit overlay */}
        <div className="absolute inset-0 circuit-pattern opacity-10 animate-circuit" />
        
        {/* Glowing accent lines */}
        <motion.div
          className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-2/3 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-accent/50 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Top HUD elements */}
        <motion.div
          className="absolute top-6 left-6 text-xs font-mono text-primary/60"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>SYSTEM ONLINE</span>
          </div>
          <div className="mt-1 text-muted-foreground/50">v2.0.26</div>
        </motion.div>

        <motion.div
          className="absolute top-6 right-6 text-xs font-mono text-right text-primary/60"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div>WATERLOO // ONTARIO</div>
          <div className="text-muted-foreground/50">43.4643° N, 80.5204° W</div>
        </motion.div>

        {/* Hero typing animation */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            className="mb-4 text-sm font-mono text-primary/80 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            [ INITIALIZING PORTFOLIO INTERFACE ]
          </motion.div>
          
          <TypingText
            lines={[
              "Mechatronics Engineering student at Waterloo",
              "Ready for Summer 2026 internships"
            ]}
            className="text-2xl md:text-4xl lg:text-5xl text-foreground leading-relaxed"
            typingSpeed={40}
            delayBetweenLines={800}
          />
        </motion.div>

        {/* Navigation bubbles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mb-16"
        >
          <BubbleNavigation currentPage="home" onNavigate={onNavigate} />
        </motion.div>

        {/* Quote at bottom */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 max-w-2xl text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <div className="relative">
            {/* Decorative brackets */}
            <span className="absolute -left-4 -top-2 text-2xl text-primary/40 font-mono">[</span>
            <span className="absolute -right-4 -top-2 text-2xl text-primary/40 font-mono">]</span>
            
            <p className="text-sm md:text-base text-muted-foreground/80 italic font-rajdhani tracking-wide">
              "A jack of all trades is a master of none,
              <br className="hidden md:block" />
              <span className="text-primary/80"> but oftentimes better than a master of one</span>"
            </p>
          </div>
          
          {/* Subtle glow line */}
          <motion.div
            className="mt-4 mx-auto w-32 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Decorative corner elements */}
        <svg className="absolute top-20 left-4 w-16 h-16 text-primary/30" viewBox="0 0 100 100">
          <motion.path
            d="M 0 40 L 0 0 L 40 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </svg>
        
        <svg className="absolute bottom-20 right-4 w-16 h-16 text-primary/30" viewBox="0 0 100 100">
          <motion.path
            d="M 100 60 L 100 100 L 60 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </svg>
      </div>
    </div>
  );
};

export default HomePage;
