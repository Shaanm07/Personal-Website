import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingTextProps {
  lines: string[];
  className?: string;
  typingSpeed?: number;
  delayBetweenLines?: number;
}

const TypingText = ({ 
  lines, 
  className = '', 
  typingSpeed = 50,
  delayBetweenLines = 500 
}: TypingTextProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, delayBetweenLines);

      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed, delayBetweenLines]);

  return (
    <div className={`font-orbitron ${className}`}>
      {displayedLines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center"
        >
          <span className="text-glow">{line}</span>
          {index === currentLineIndex && isTyping && (
            <motion.span
              className="inline-block w-0.5 h-[1.2em] bg-primary ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            />
          )}
        </motion.div>
      ))}
      {!isTyping && displayedLines.length === lines.length && (
        <motion.span
          className="inline-block w-0.5 h-[1.2em] bg-primary ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}
    </div>
  );
};

export default TypingText;
