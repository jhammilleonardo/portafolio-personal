import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', hover = false, gradient = false, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl overflow-hidden
        bg-white/3 backdrop-blur-sm
        border border-white/6
        ${hover ? 'hover:bg-white/6 hover:border-white/12 hover:-translate-y-1 cursor-pointer' : ''}
        ${gradient ? 'gradient-border' : ''}
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}
