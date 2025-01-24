import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

const Terminal = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const status = 'ACTIVE';

  const statusColors = {
    ACTIVE: 'bg-green-500',
    SCANNING: 'bg-blue-500',
    PROCESSING: 'bg-yellow-500',
    ANALYZING: 'bg-purple-500'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative space-y-2 sm:space-y-4 mb-8">
      <div className="terminal-header p-2 sm:p-4 border border-white/5 rounded-lg flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${statusColors[status]} animate-pulse status-glow`}></div>
          <span className="text-white/80 font-mono text-xs sm:text-sm glow">STATUS: {status}</span>
        </div>
        <div className="text-white/80 font-mono text-xs sm:text-sm glow">
          {format(currentTime, 'HH:mm:ss')}
        </div>
      </div>
      
      <div className="terminal-body h-[calc(100vh-16rem)] sm:h-[calc(100vh-26rem)] flex items-center justify-center border border-white/5 rounded-lg">
        <div className="text-center">
          <div className="text-4xl sm:text-6xl font-bold text-white/90 tracking-wider animate-pulse glow">
            LOADING
            <span className="animate-pulse inline-block">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;