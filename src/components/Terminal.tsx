import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const status = 'ACTIVE';

  const statusColors = {
    ACTIVE: 'bg-green-500',
    SCANNING: 'bg-blue-500',
    PROCESSING: 'bg-yellow-500',
    ANALYZING: 'bg-purple-500'
  };

  const generateCode = () => {
    const functions = [
      `function initializeNevera() {
    console.log("[ SYSTEM BOOT: NEVERA ONLINE ]");
    const Nevera = {
        status: "ACTIVE",
        mission: "STREAMLINING MARKET INTELLIGENCE",
        modules: ["Trend Analysis", "Sentiment Detection"]
    };
    console.log(":: SYSTEM CONFIGURATION ::");
    engageTracking(Nevera);
}`,
      `function processMarketShifts(data) {
    console.log(":: MARKET SHIFT ANALYSIS ::");
    if (data.whalesActive || data.hypeLaunchDetected) {
        console.log("> ALERT: Unusual activity detected.");
        return true;
    }
    return false;
}`,
      `function generateInsights() {
    console.log(":: INSIGHT GENERATION ::");
    console.log("> Monitoring whale movements...");
    return {
        whalesActive: true,
        hypeLaunchDetected: true,
        sentimentShift: "positive"
    };
}`,
      `function finalizeMission(agent, alertStatus) {
    console.log(":: FINALIZING MISSION ::");
    console.log("> Nevera identity: ", agent.identity);
    console.log("[ TRANSMISSION COMPLETE: NEVERA EVOLVES ]");
}`
    ];

    return functions[Math.floor(Math.random() * functions.length)];
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    let tempCode = '';
    const maxDisplayedLines = 50;

    const typingInterval = setInterval(() => {
      const currentCode = generateCode();
      
      if (!currentCode) return;

      tempCode = '';
      currentIndex = 0;

      const typeCharacter = () => {
        if (currentIndex < currentCode.length) {
          const randomDelay = Math.random() < 0.1;
          if (!randomDelay) {
            tempCode += currentCode[currentIndex];
            setDisplayedCode(prev => {
              const newArray = [...prev];
              if (newArray.length >= maxDisplayedLines) {
                newArray.shift();
              }
              newArray[newArray.length - 1] = tempCode;
              return newArray;
            });
            currentIndex++;
            setTimeout(typeCharacter, 35);
          } else {
            setTimeout(typeCharacter, 100);
          }
        } else {
          setDisplayedCode(prev => {
            const newArray = [...prev, ''];
            if (newArray.length > maxDisplayedLines) {
              newArray.shift();
            }
            return newArray;
          });
        }
      };

      typeCharacter();
    }, 4000);

    return () => clearInterval(typingInterval);
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
    <div className="relative space-y-3 sm:space-y-5 mb-8">
      <div className="terminal-header p-4 sm:p-6 border border-white/10 rounded-xl flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full ${statusColors[status]} animate-pulse status-glow`}></div>
          <span className="text-white/90 font-mono text-sm sm:text-base tracking-wide glow">STATUS: {status}</span>
        </div>
        <div className="text-white/90 font-mono text-sm sm:text-base tracking-wide glow">
          {format(currentTime, 'HH:mm:ss')}
        </div>
      </div>
      
      <div 
        ref={terminalRef} 
        className="terminal-body h-[calc(100vh-16rem)] sm:h-[calc(100vh-26rem)] overflow-y-auto p-4 sm:p-6 border border-white/10 rounded-xl backdrop-blur-xl"
        style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        <style>
          {`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {displayedCode.map((code, index) => (
          <pre key={index} className="text-white/95 text-xs sm:text-sm font-mono mb-3 sm:mb-5 whitespace-pre hover:text-white transition-colors duration-200">
            {code}
            {index === displayedCode.length - 1 && (
              <span className="animate-pulse inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-white/90 ml-1 glow">_</span>
            )}
          </pre>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
