import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building2 } from 'lucide-react';
import BubbleNavigation from '../components/BubbleNavigation';
import GearScroll from '../components/GearScroll';
import CircuitBackground from '../components/CircuitBackground';
import StaggeredContent from '../components/StaggeredContent';

interface ExperiencePageProps {
  onNavigate: (page: string) => void;
}

const experiences = [
  {
    id: 1,
    title: 'Robotics Engineering Intern',
    company: 'Placeholder Robotics Inc.',
    location: 'Toronto, ON',
    period: 'May 2025 - Aug 2025',
    description: 'Developed autonomous navigation systems for industrial robots. Implemented computer vision algorithms for object detection and tracking.',
    skills: ['ROS2', 'Python', 'Computer Vision', 'SLAM'],
  },
  {
    id: 2,
    title: 'Mechatronics Research Assistant',
    company: 'University of Waterloo',
    location: 'Waterloo, ON',
    period: 'Sep 2024 - Apr 2025',
    description: 'Assisted in research on bio-inspired robotic systems. Designed and manufactured custom actuators using advanced 3D printing techniques.',
    skills: ['SolidWorks', 'MATLAB', '3D Printing', 'Arduino'],
  },
  {
    id: 3,
    title: 'Automation Engineering Co-op',
    company: 'Advanced Manufacturing Corp.',
    location: 'Cambridge, ON',
    period: 'Jan 2024 - Apr 2024',
    description: 'Optimized PLC programs for assembly line automation. Reduced cycle time by 15% through process improvements and sensor integration.',
    skills: ['PLC Programming', 'Ladder Logic', 'HMI Design', 'Sensors'],
  },
  {
    id: 4,
    title: 'Junior Hardware Developer',
    company: 'Tech Innovations Lab',
    location: 'Kitchener, ON',
    period: 'May 2023 - Aug 2023',
    description: 'Designed PCB layouts for IoT devices. Conducted testing and debugging of embedded systems prototypes.',
    skills: ['PCB Design', 'Eagle CAD', 'Embedded C', 'Testing'],
  },
];

const ExperiencePage = ({ onNavigate }: ExperiencePageProps) => {
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
      
      {/* Compact navigation */}
      <BubbleNavigation currentPage="experience" onNavigate={onNavigate} isCompact />
      
      {/* Gear scroll */}
      <GearScroll onScroll={handleGearScroll} />
      
      {/* Main content */}
      <div 
        ref={containerRef}
        className="relative z-10 min-h-screen overflow-y-auto pt-24 pb-16 px-4 md:px-8 lg:px-16"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Page header */}
        <motion.div
          className="max-w-4xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold holographic-text mb-4">
            EXPERIENCE
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            [ PROFESSIONAL JOURNEY & ACHIEVEMENTS ]
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical timeline line */}
          <div className="timeline-line hidden md:block" />

          <StaggeredContent className="space-y-8" staggerDelay={0.5}>
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background z-10">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                </div>

                {/* Experience card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    className="glass-card rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-500 group"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 0 30px hsl(var(--primary) / 0.3), inset 0 0 20px hsl(var(--primary) / 0.05)',
                    }}
                  >
                    {/* Scanning line effect on hover */}
                    <motion.div
                      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ top: 0 }}
                      animate={{ top: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-xl font-orbitron font-semibold text-foreground group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary/70" />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary/70" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary/70" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <p className="text-foreground/80 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </StaggeredContent>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
