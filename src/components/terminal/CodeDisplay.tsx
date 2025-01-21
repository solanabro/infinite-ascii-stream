import React from 'react';

interface CodeDisplayProps {
  code: string;
  isLast: boolean;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, isLast }) => {
  return (
    <pre className="text-white/80 text-xs sm:text-sm font-mono mb-4 whitespace-pre">
      {code}
      {isLast && <span className="animate-pulse inline-block w-2 h-4 bg-white/80 ml-1">_</span>}
    </pre>
  );
};