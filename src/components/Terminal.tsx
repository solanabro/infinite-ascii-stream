import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState<'ACTIVE' | 'SCANNING' | 'PROCESSING' | 'ANALYZING'>('ACTIVE');

  const statusColors = {
    ACTIVE: 'bg-green-500',
    SCANNING: 'bg-blue-500',
    PROCESSING: 'bg-yellow-500',
    ANALYZING: 'bg-purple-500'
  };

  useEffect(() => {
    const statusInterval = setInterval(() => {
      const statuses: ('ACTIVE' | 'SCANNING' | 'PROCESSING' | 'ANALYZING')[] = ['ACTIVE', 'SCANNING', 'PROCESSING', 'ANALYZING'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setStatus(randomStatus);
    }, 3000);

    return () => clearInterval(statusInterval);
  }, []);

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
    const maxDisplayedLines = 100;

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
    <div className="relative space-y-2 sm:space-y-4 mb-16 sm:mb-20">
      <div className="bg-black/50 backdrop-blur-sm p-2 sm:p-4 border border-white/20 rounded-lg flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${statusColors[status]} animate-pulse`}></div>
          <span className="text-white/80 font-mono text-xs sm:text-sm">STATUS: {status}</span>
        </div>
        <div className="text-white/80 font-mono text-xs sm:text-sm">
          {format(currentTime, 'HH:mm:ss')}
        </div>
      </div>
      
      <div 
        ref={terminalRef} 
        className="h-[calc(100vh-12rem)] sm:h-[calc(100vh-16rem)] overflow-y-auto bg-black/50 backdrop-blur-sm p-2 sm:p-4 border border-white/20 rounded-lg"
        style={{ scrollBehavior: 'smooth' }}
      >
        {displayedCode.map((code, index) => (
          <pre key={index} className="text-white/80 text-xs sm:text-sm font-mono mb-2 sm:mb-4 whitespace-pre">
            {code}
            {index === displayedCode.length - 1 && (
              <span className="animate-pulse inline-block w-1.5 sm:w-2 h-3 sm:h-4 bg-white/80 ml-1">_</span>
            )}
          </pre>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
