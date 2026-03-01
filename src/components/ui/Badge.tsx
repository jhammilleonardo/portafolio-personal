import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'purple' | 'cyan' | 'blue' | 'green' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: 'bg-white/5 text-slate-300 border border-white/10',
  purple: 'bg-purple-500/10 text-purple-300 border border-purple-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20',
  blue: 'bg-blue-500/10 text-blue-300 border border-blue-500/20',
  green: 'bg-green-500/10 text-green-300 border border-green-500/20',
  outline: 'bg-transparent text-slate-400 border border-white/10',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function Badge({ children, variant = 'default', size = 'sm', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
