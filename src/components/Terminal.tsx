import React, { useEffect, useRef, useState } from 'react';

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [currentCode, setCurrentCode] = useState('');
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

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
    let typingInterval: NodeJS.Timeout;
    let currentIndex = 0;
    let tempCode = '';

    if (currentCode && !isTyping) {
      setIsTyping(true);
      typingInterval = setInterval(() => {
        if (currentIndex < currentCode.length) {
          const randomDelay = Math.random() < 0.1;
          if (!randomDelay) {
            tempCode += currentCode[currentIndex];
            setDisplayedCode(prev => {
              const newArray = [...prev];
              newArray[newArray.length - 1] = tempCode;
              return newArray;
            });
            currentIndex++;
          }
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          // Start new code block after current one is complete
          setTimeout(() => {
            setDisplayedCode(prev => [...prev, '']);
            setCurrentCode(generateCode());
          }, 1000);
        }
      }, 35); // Slower typing speed
    }

    return () => clearInterval(typingInterval);
  }, [currentCode]);

  useEffect(() => {
    if (!currentCode && !isTyping) {
      setDisplayedCode(['']);
      setCurrentCode(generateCode());
    }
  }, [currentCode, isTyping]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [displayedCode]);

  return (
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
  );
};

export default Terminal;