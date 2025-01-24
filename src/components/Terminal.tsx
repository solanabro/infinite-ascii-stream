import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Terminal = () => {
  const [time, setTime] = useState(new Date());
  const [dots, setDots] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const loadingTimer = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(loadingTimer);
    };
  }, []);

  return (
    <div className="relative space-y-2 sm:space-y-4 mb-8">
      <div className="terminal-header p-2 sm:p-4 border border-white/5 rounded-lg flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="flex space-x-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/90"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500/90"></div>
            <div className="h-3 w-3 rounded-full bg-green-500/90"></div>
          </div>
          <span className="text-white/80 font-mono text-xs sm:text-sm">backend-service ~ /usr/local/bin</span>
        </div>
        <div className="text-white/80 font-mono text-xs sm:text-sm">
          {format(time, 'HH:mm:ss')}
        </div>
      </div>
      
      <div className="terminal-body overflow-hidden h-[calc(100vh-16rem)] sm:h-[calc(100vh-26rem)] p-4 sm:p-6 border border-white/5 rounded-lg font-mono">
        <div className="space-y-2 text-sm sm:text-base">
          <div className="text-green-400">$ initializing backend service</div>
          <div className="text-white/80">Establishing secure connection...</div>
          <div className="text-white/80">Loading system components{dots}</div>
          <div className="text-yellow-400 mt-4">STATUS: System initialization in progress</div>
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-green-400">$</span>
            <span className="w-2 h-4 bg-white/80 animate-[blink_1s_steps(1)_infinite]"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;