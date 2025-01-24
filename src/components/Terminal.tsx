import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

const Terminal = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const systemMessages = [
      'Initializing secure connection...',
      'Loading system modules...',
      'Establishing data stream...',
      'Running integrity checks...',
      'Verifying network protocols...',
      'Starting data processing engine...',
      'Monitoring active streams...'
    ];

    let currentIndex = 0;
    const addLog = () => {
      if (currentIndex < systemMessages.length) {
        setLogs(prev => [...prev, systemMessages[currentIndex]]);
        currentIndex++;
        setTimeout(addLog, Math.random() * 1000 + 500);
      } else {
        startDataStream();
      }
    };

    const startDataStream = () => {
      const interval = setInterval(() => {
        const dataPoint = generateDataPoint();
        setLogs(prev => [...prev.slice(-50), dataPoint]);
      }, 100);

      return () => clearInterval(interval);
    };

    addLog();
  }, []);

  const generateDataPoint = () => {
    const timestamp = format(new Date(), 'HH:mm:ss.SSS');
    const hex = [...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    return `[${timestamp}] Processing data block 0x${hex}`;
  };

  return (
    <div className="relative space-y-2 sm:space-y-4 mb-8">
      <div className="terminal-header p-2 sm:p-4 border border-white/5 rounded-lg flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500 animate-pulse status-glow"></div>
          <span className="text-white/80 font-mono text-xs sm:text-sm">SYSTEM STATUS: ACTIVE</span>
        </div>
        <div className="text-white/80 font-mono text-xs sm:text-sm">
          {format(currentTime, 'HH:mm:ss')}
        </div>
      </div>
      
      <div className="terminal-body h-[calc(100vh-16rem)] sm:h-[calc(100vh-26rem)] p-2 sm:p-4 border border-white/5 rounded-lg overflow-y-auto">
        <div className="space-y-1">
          {logs.map((log, index) => (
            <div 
              key={index} 
              className="text-white/90 font-mono text-xs sm:text-sm tracking-wide"
              style={{
                opacity: Math.max(0.3, index / logs.length)
              }}
            >
              {log}
            </div>
          ))}
        </div>
        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default Terminal;