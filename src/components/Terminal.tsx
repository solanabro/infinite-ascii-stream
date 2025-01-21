import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [displayedCode, setDisplayedCode] = useState<string[]>(['']); // Initialize with empty string to start typing
  const [currentTime, setCurrentTime] = useState(new Date());

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
    // Start with initial code generation
    const initialCode = generateCode();
    let currentIndex = 0;
    let tempCode = '';
    const maxDisplayedLines = 100;

    // Function to type out characters
    const typeCharacter = () => {
      if (currentIndex < initialCode.length) {
        const randomDelay = Math.random() < 0.1;
        if (!randomDelay) {
          tempCode += initialCode[currentIndex];
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

    // Start typing immediately
    typeCharacter();

    // Set up interval for continuous code generation
    const typingInterval = setInterval(() => {
      const currentCode = generateCode();
      if (!currentCode) return;

      tempCode = '';
      currentIndex = 0;

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
    <div className="relative">
      <div 
        ref={terminalRef} 
        className="h-[calc(100vh-16rem)] overflow-y-auto bg-black/50 backdrop-blur-sm p-4 border border-white/20 rounded-lg"
        style={{ scrollBehavior: 'smooth' }}
      >
        {displayedCode.map((code, index) => (
          <pre key={index} className="text-white/80 text-xs sm:text-sm font-mono mb-4 whitespace-pre">
            {code}
            {index === displayedCode.length - 1 && (
              <span className="animate-pulse inline-block w-2 h-4 bg-white/80 ml-1">_</span>
            )}
          </pre>
        ))}
      </div>
      <div className="absolute bottom-4 right-4 text-white/80 font-mono text-sm backdrop-blur-sm bg-black/30 px-3 py-1 rounded-md">
        {format(currentTime, 'HH:mm:ss')}
      </div>
    </div>
  );
};

export default Terminal;