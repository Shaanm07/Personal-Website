import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';
import BubbleNavigation from '../components/BubbleNavigation';
import GearScroll from '../components/GearScroll';
import CircuitBackground from '../components/CircuitBackground';
import StaggeredContent from '../components/StaggeredContent';
import MockInterviewImg from '../assets/AI Mock Interviewer.png';
import ElectriumImg from '../assets/Electrium Mobility.png';
import cardDealerImg from '../assets/Robotic Card Dealer.png';
import adversarialImg from '../assets/Adversarial Attacks.png';
import studyMateImg from '../assets/StudyMate HTN.png';
import ANCconverterImg from '../assets/ANC Converter.png';

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

const projects = [
  {
    id: 1,
    title: 'AI Mock Interviewer',
    description: 'Mock interview robot that simulates realistic job interviews and gives intelligent feedback and scoring.',
    image: MockInterviewImg,
    githubUrl: 'https://github.com/shaanmehta/AI-Mock-Interviewer',
    tags: ['Voice/Facial Recognition', 'Position-specific questions', 'OpenAI API']
  },
  {
    id: 2,
    title: 'Electric Bike',
    description: 'Eco-friendly electric bike with a TFT-like dashboard.',
    image: ElectriumImg,
    githubUrl: 'https://github.com/shaanmehta/Electrium-Mobility-E-Bike',
    tags: ['Battery Tracker', 'Speed Display', 'Distance Tracker']
  },
  {
    id: 3,
    title: 'Robotic Poker Player',
    description: 'Fully automated card dealing & playing poker robot.',
    image: cardDealerImg,
    githubUrl: 'https://github.com/shaanmehta/Robotic-Poker-Player',
    tags: ['Integrated Betting System', '360 degree rotation']
  },
  {
    id: 4,
    title: 'AI Research Paper',
    description: 'Published paper on the impact of adversarial attacks on AI ethics. See condensed version.',
    image: adversarialImg,
    githubUrl: 'https://drive.google.com/file/d/1hA_6v75-kuSvdrAjlwncPEXu9aTIRlVi/view',
    tags: ['IDS', 'Adversarial Training', 'Columbia University-affiliated']
  },
  {
    id: 5,
    title: 'StudyMate',
    description: 'Screen-free study assistant with conversational abilities.',
    image: studyMateImg,
    tags: ['LED Feedback', 'Arduino Uno', 'Hack The North']
  },
  {
    id: 6,
    title: 'ANC Converter',
    description: 'Noise reduction in digital audio samples using Fourier theory.',
    image: ANCconverterImg,
    githubUrl: 'https://github.com/shaanmehta/Noise-Reduction',
    tags: ['Fourier Transform', 'Matplotlib', 'Adaptive Filters']
  }
];

const ProjectsPage = ({ onNavigate }: ProjectsPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleGearScroll = (direction: 'up' | 'down', delta: number) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'down' ? delta : -delta;
      containerRef.current.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      <CircuitBackground />
      
      <div ref={containerRef} className="relative z-10 min-h-screen overflow-y-auto">
        <BubbleNavigation currentPage="projects" onNavigate={onNavigate} isCompact />
        <GearScroll onScroll={handleGearScroll} />
        
        <div className="pb-16 px-4 md:px-8 lg:px-16">
          {/* Page header */}
          <motion.div
            className="max-w-4xl mx-auto mb-12 pt-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold holographic-text mb-4">
              PROJECTS
            </h1>
          </motion.div>

          {/* Projects list */}
          <div className="max-w-4xl mx-auto">
            <StaggeredContent className="space-y-8" staggerDelay={0.4}>
              {projects.map(project => (
                <motion.div
                  key={project.id}
                  className="project-card glass-card rounded-2xl overflow-hidden group"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Project image placeholder */}
                    <div className="w-full md:w-72 h-48 md:h-auto relative bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 circuit-pattern opacity-30" />

                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <ImageIcon className="w-16 h-16 text-muted-foreground/30" />
                      )}
                      
                      {/* Animated overlay on hover */}
                      <motion.div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
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
                        {project.tags.map(tag => (
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
    </div>
  );
};

export default ProjectsPage;
