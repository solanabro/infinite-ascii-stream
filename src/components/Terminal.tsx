import React, { useRef, useState, useEffect } from 'react';
import { useCodeGeneration } from './terminal/CodeGenerator';
import { TimeDisplay } from './terminal/TimeDisplay';
import { CodeDisplay } from './terminal/CodeDisplay';

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const displayedCode = useCodeGeneration();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [displayedCode]);

  return (
    <div className="relative">
      <div 
        ref={terminalRef} 
        className="h-[calc(100vh-16rem)] overflow-y-auto bg-black/50 backdrop-blur-sm p-4 border border-white/20 rounded-lg"
        style={{ scrollBehavior: 'smooth' }}
      >
        {displayedCode.map((code, index) => (
          <CodeDisplay 
            key={index} 
            code={code} 
            isLast={index === displayedCode.length - 1} 
          />
        ))}
      </div>
      <TimeDisplay currentTime={currentTime} />
    </div>
  );
};

export default Terminal;