import React from 'react';
import { format } from 'date-fns';

const Terminal = () => {
  const status = 'PROCESSING DATA';
  const statusColors = {
    'ACTIVE': 'bg-green-500',
    'SCANNING': 'bg-blue-500',
    'PROCESSING': 'bg-yellow-500',
    'PROCESSING DATA': 'bg-yellow-500',
    'ANALYZING': 'bg-purple-500'
  };

  return (
    <div className="relative space-y-2 sm:space-y-4 mb-8">
      <div className="terminal-header p-2 sm:p-4 border border-white/5 rounded-lg flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${statusColors[status]} animate-pulse status-glow`}></div>
          <span className="text-white/80 font-mono text-xs sm:text-sm glow">STATUS: {status}</span>
        </div>
        <div className="text-white/80 font-mono text-xs sm:text-sm glow">
          {format(new Date(), 'HH:mm:ss')}
        </div>
      </div>
      
      <div className="terminal-body overflow-hidden h-[calc(100vh-16rem)] sm:h-[calc(100vh-26rem)] flex items-center justify-center p-2 sm:p-4 border border-white/5 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-white/90 font-mono text-sm sm:text-base tracking-widest animate-pulse glow">
            LOADING
          </span>
          <span className="inline-block w-1.5 h-4 bg-white/90 animate-[blink_1s_steps(1)_infinite] glow"></span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;