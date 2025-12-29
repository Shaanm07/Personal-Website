import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import BubbleNavigation from '../components/BubbleNavigation';
import CircuitBackground from '../components/CircuitBackground';
import StaggeredContent from '../components/StaggeredContent';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

const contactLinks = [
  {
    id: 'github',
    label: 'GitHub',
    description: 'Check out my code & projects',
    icon: Github,
    url: 'https://github.com/Shaanm07',
    color: 'from-gray-600/20 to-gray-800/20',
    hoverBorder: 'hover:border-gray-400',
    iconBg: 'bg-gray-700/50'
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    description: 'Connect professionally',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/shaanmehta07/',
    color: 'from-blue-600/20 to-blue-800/20',
    hoverBorder: 'hover:border-blue-400',
    iconBg: 'bg-blue-700/50'
  },
  {
    id: 'email',
    label: 'Email',
    description: 'Get in touch directly',
    icon: Mail,
    url: 'https://mail.google.com/mail/?view=cm&fs=1&to=shaanm0727@gmail.com',
    color: 'from-red-600/20 to-orange-600/20',
    hoverBorder: 'hover:border-red-400',
    iconBg: 'bg-red-700/50'
  },
  {
    id: 'resume',
    label: 'Resume',
    description: 'Download my resume',
    icon: FileText,
    url: 'https://drive.google.com/file/d/1bOcRjxQI8gi7ZOw_59jMeMau6dHuP7Kw/view',
    color: 'from-green-600/20 to-teal-600/20',
    hoverBorder: 'hover:border-green-400',
    iconBg: 'bg-green-700/50'
  }
];

const ContactPage = ({ onNavigate }: ContactPageProps) => {
  return (
    <div className="relative min-h-screen bg-background">
      <CircuitBackground />
      
      <div className="relative z-10 min-h-screen overflow-y-auto">
        <BubbleNavigation currentPage="contact" onNavigate={onNavigate} isCompact />
        
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] pb-16 px-4 md:px-8">
          {/* Page header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold holographic-text mb-4">
              CONNECT WITH ME
            </h1>
          </motion.div>

          {/* Contact cards */}
          <div className="w-full max-w-2xl">
            <StaggeredContent className="space-y-4" staggerDelay={0.3}>
              {contactLinks.map(contact => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={contact.id}
                    href={contact.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`contact-card rounded-xl border border-primary/20 ${contact.hoverBorder} group`}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${contact.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
                    
                    {/* Icon */}
                    <div className={`relative z-10 p-4 rounded-xl ${contact.iconBg} border border-primary/20 group-hover:border-primary/50 transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex-1">
                      <h3 className="text-xl font-orbitron font-semibold text-foreground group-hover:text-primary transition-colors">
                        {contact.label}
                      </h3>
                    </div>
                    
                    {/* Arrow indicator */}
                    <motion.div
                      className="relative z-10 text-muted-foreground group-hover:text-primary transition-colors"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                    
                    {/* Scanning line effect */}
                    <motion.div
                      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100"
                      style={{ bottom: 0 }}
                    />
                  </motion.a>
                );
              })}
            </StaggeredContent>
          </div>

          {/* Bottom decoration */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex items-center justify-center gap-4 text-muted-foreground/50 text-sm font-mono" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
