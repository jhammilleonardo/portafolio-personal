import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-500 text-white hover:opacity-90 shadow-lg hover:shadow-purple-500/25',
  secondary: 'bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10 hover:border-white/20',
  ghost: 'text-slate-400 hover:text-white hover:bg-white/5',
  danger: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
};

export function Button({ variant = 'secondary', size = 'md', href, children, className = '', ...props }: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
