import React from 'react';

export const DnaHelixVisual: React.FC<{ count?: number; className?: string }> = ({
  count = 14,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center gap-1.5 overflow-hidden py-1 ${className}`} id="dna-helix-animation">
      {Array.from({ length: count }).map((_, i) => {
        const delay = (i * 0.15).toFixed(2);
        return (
          <div key={i} className="flex flex-col items-center justify-between h-9 w-2 relative">
            <span
              className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-500/50"
              style={{
                animation: `bounce 1.6s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
            <div className="w-0.5 h-4 bg-slate-700/60 my-0.5 rounded-full" />
            <span
              className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-sm shadow-sky-500/50"
              style={{
                animation: `bounce 1.6s ease-in-out infinite`,
                animationDelay: `${parseFloat(delay) + 0.8}s`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
