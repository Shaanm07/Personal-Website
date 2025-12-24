import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Cog, Code, Zap } from 'lucide-react';
import BubbleNavigation from '../components/BubbleNavigation';
import GearScroll from '../components/GearScroll';
import CircuitBackground from '../components/CircuitBackground';
import StaggeredContent from '../components/StaggeredContent';

interface SkillsPageProps {
  onNavigate: (page: string) => void;
}

const skillCategories = [
  {
    id: 'mechanical',
    title: 'Mechanical',
    icon: Cog,
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/40 hover:border-orange-500/70',
    iconColor: 'text-orange-400',
    skills: [
      { name: 'SolidWorks', level: 90 },
      { name: 'AutoCAD', level: 85 },
      { name: 'CNC Machining', level: 75 },
      { name: '3D Printing', level: 95 },
      { name: 'Mechanical Design', level: 88 },
    ],
  },
  {
    id: 'software',
    title: 'Software',
    icon: Code,
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/40 hover:border-cyan-500/70',
    iconColor: 'text-cyan-400',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'C/C++', level: 85 },
      { name: 'MATLAB', level: 88 },
      { name: 'ROS2', level: 78 },
      { name: 'Machine Learning', level: 72 },
    ],
  },
  {
    id: 'electrical',
    title: 'Electrical',
    icon: Zap,
    color: 'from-yellow-500/20 to-green-500/20',
    borderColor: 'border-yellow-500/40 hover:border-yellow-500/70',
    iconColor: 'text-yellow-400',
    skills: [
      { name: 'PCB Design', level: 82 },
      { name: 'Arduino/ESP32', level: 95 },
      { name: 'PLC Programming', level: 75 },
      { name: 'Circuit Analysis', level: 85 },
      { name: 'Embedded Systems', level: 80 },
    ],
  },
];

const SkillsPage = ({ onNavigate }: SkillsPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleGearScroll = (direction: 'up' | 'down', delta: number) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'down' ? delta : -delta;
      containerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      <CircuitBackground />
      
      <BubbleNavigation currentPage="skills" onNavigate={onNavigate} isCompact />
      <GearScroll onScroll={handleGearScroll} />
      
      <div 
        ref={containerRef}
        className="relative z-10 min-h-screen overflow-y-auto pt-24 pb-16 px-4 md:px-8 lg:px-16"
      >
        {/* Page header */}
        <motion.div
          className="max-w-6xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold holographic-text mb-4">
            SKILLS
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            [ TECHNICAL CAPABILITIES & EXPERTISE ]
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="max-w-6xl mx-auto">
          <StaggeredContent 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
            staggerDelay={0.4}
          >
            {skillCategories.map((category) => {
              const Icon = category.icon;
              
              return (
                <motion.div
                  key={category.id}
                  className={`glass-card rounded-2xl p-6 md:p-8 border ${category.borderColor} transition-all duration-500 group`}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 0 40px hsl(var(--primary) / 0.2)',
                  }}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} border border-primary/20`}>
                      <Icon className={`w-8 h-8 ${category.iconColor}`} />
                    </div>
                    <h2 className="text-2xl font-orbitron font-semibold text-foreground">
                      {category.title}
                    </h2>
                  </div>

                  {/* Skills list */}
                  <div className="space-y-6">
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-rajdhani font-medium text-foreground/90">
                            {skill.name}
                          </span>
                          <span className="text-xs font-mono text-primary">
                            {skill.level}%
                          </span>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden">
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                              background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))`,
                              boxShadow: '0 0 10px hsl(var(--primary) / 0.5)',
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: 'easeOut' }}
                          />
                          
                          {/* Animated glow dot at end */}
                          <motion.div
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"
                            style={{
                              boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)',
                            }}
                            initial={{ left: 0, opacity: 0 }}
                            animate={{ 
                              left: `calc(${skill.level}% - 6px)`,
                              opacity: 1,
                            }}
                            transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Decorative circuit lines */}
                  <div className="absolute bottom-4 right-4 w-16 h-16 opacity-20">
                    <svg viewBox="0 0 64 64" className="w-full h-full">
                      <path
                        d="M 0 32 L 20 32 L 24 28 L 32 28 L 32 20 L 40 20 L 40 12 L 52 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-primary"
                      />
                      <circle cx="52" cy="12" r="3" className="fill-primary" />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </StaggeredContent>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
