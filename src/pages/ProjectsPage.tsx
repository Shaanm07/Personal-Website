import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';
import BubbleNavigation from '../components/BubbleNavigation';
import GearScroll from '../components/GearScroll';
import CircuitBackground from '../components/CircuitBackground';
import StaggeredContent from '../components/StaggeredContent';

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

const projects = [
  {
    id: 1,
    title: 'Autonomous Robot Navigation System',
    description: 'Developed a fully autonomous mobile robot using ROS2 and SLAM algorithms. Features real-time obstacle avoidance and path planning.',
    image: null,
    githubUrl: 'https://github.com/placeholder/autonomous-robot',
    tags: ['ROS2', 'Python', 'Computer Vision'],
  },
  {
    id: 2,
    title: '6-DOF Robotic Arm Controller',
    description: 'Designed and built a 6 degree-of-freedom robotic arm with custom inverse kinematics and precision control algorithms.',
    image: null,
    githubUrl: 'https://github.com/placeholder/robotic-arm',
    tags: ['Arduino', 'C++', 'SolidWorks'],
  },
  {
    id: 3,
    title: 'Smart Manufacturing IoT Platform',
    description: 'Created an IoT platform for monitoring and optimizing manufacturing processes with real-time analytics and predictive maintenance.',
    image: null,
    githubUrl: 'https://github.com/placeholder/iot-manufacturing',
    tags: ['ESP32', 'Python', 'MQTT'],
  },
  {
    id: 4,
    title: 'AI-Powered Quality Inspection System',
    description: 'Built a machine learning system for automated visual quality inspection in assembly lines with 98% accuracy.',
    image: null,
    githubUrl: 'https://github.com/placeholder/ai-inspection',
    tags: ['TensorFlow', 'OpenCV', 'Python'],
  },
];

const ProjectsPage = ({ onNavigate }: ProjectsPageProps) => {
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
      
      <BubbleNavigation currentPage="projects" onNavigate={onNavigate} isCompact />
      <GearScroll onScroll={handleGearScroll} />
      
      <div 
        ref={containerRef}
        className="relative z-10 min-h-screen overflow-y-auto pt-24 pb-16 px-4 md:px-8 lg:px-16"
      >
        {/* Page header */}
        <motion.div
          className="max-w-4xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold holographic-text mb-4">
            PROJECTS
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            [ ENGINEERING INNOVATIONS & CREATIONS ]
          </p>
        </motion.div>

        {/* Projects list */}
        <div className="max-w-4xl mx-auto">
          <StaggeredContent className="space-y-8" staggerDelay={0.4}>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="project-card glass-card rounded-2xl overflow-hidden group"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Project image placeholder */}
                  <div className="w-full md:w-72 h-48 md:h-auto relative bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 circuit-pattern opacity-30" />
                    <ImageIcon className="w-16 h-16 text-muted-foreground/30" />
                    
                    {/* Animated overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    {/* Scanning line */}
                    <motion.div
                      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ top: 0 }}
                      animate={{ top: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>

                  {/* Project content */}
                  <div className="flex-1 p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-orbitron font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-foreground/70 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Learn more button */}
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 text-primary border border-primary/40 font-orbitron text-sm font-medium transition-all duration-300 hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>LEARN MORE</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </StaggeredContent>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
