'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ModernButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'glass';
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  loading?: boolean;
}

const ModernButton = ({ 
  children, 
  onClick, 
  variant = 'secondary', 
  disabled = false,
  className = '',
  icon,
  loading = false
}: ModernButtonProps) => {
  const baseClasses = `
    relative inline-flex items-center justify-center px-6 py-3 
    font-medium rounded-lg transition-all duration-300 
    backdrop-filter backdrop-blur-sm border overflow-hidden
    group focus:outline-none focus:ring-2 focus:ring-green-400/50
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-green-400 to-green-500 
      border-green-400 text-black font-semibold
      hover:from-green-300 hover:to-green-400
      shadow-lg shadow-green-400/25
      hover:shadow-green-400/40 hover:shadow-xl
    `,
    secondary: `
      bg-white/10 border-white/20 text-white
      hover:bg-white/20 hover:border-white/30
      shadow-lg shadow-black/20
    `,
    glass: `
      bg-black/20 border-green-400/30 text-green-400
      hover:bg-green-400/10 hover:border-green-400/50
      shadow-lg shadow-green-400/10
      hover:shadow-green-400/20
    `
  };

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
      disabled={disabled || loading}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Efecto de brillo */}
      <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
      
      {/* Contenido */}
      <span className="relative flex items-center gap-2">
        {loading ? (
          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
        ) : icon ? (
          <span className="text-sm">{icon}</span>
        ) : null}
        {children}
      </span>
    </motion.button>
  );
};

export default ModernButton;
