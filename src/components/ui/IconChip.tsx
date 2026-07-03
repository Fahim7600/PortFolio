import React from 'react';
import { motion } from 'framer-motion';

export interface IconChipProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  accentColor?: 'violet' | 'cyan' | 'magenta';
  size?: 'sm' | 'md' | 'lg';
}

export const IconChip: React.FC<IconChipProps> = ({
  children,
  title,
  className = '',
  accentColor = 'violet',
  size = 'md',
}) => {
  // Define border and hover shadow colors based on the chosen accent
  const accentClasses = {
    violet: 'border-purple-500/20 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.45)]',
    cyan: 'border-cyan-500/20 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.45)]',
    magenta: 'border-pink-500/20 hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.45)]',
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-11 h-11 text-lg',
    lg: 'w-14 h-14 text-2xl',
  };

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className={`inline-flex items-center justify-center rounded-full bg-[#1b2234] border text-foreground transition-all duration-300 ${sizeClasses[size]} ${accentClasses[accentColor]} ${className}`}
      title={title}
    >
      {children}
    </motion.div>
  );
};
