import React, { useEffect, useRef, useState } from 'react';

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [currentCode, setCurrentCode] = useState('');
  const [displayedCode, setDisplayedCode] = useState('');
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

    if (currentCode && !isTyping) {
      setIsTyping(true);
      typingInterval = setInterval(() => {
        if (currentIndex < currentCode.length) {
          setDisplayedCode(prev => prev + currentCode[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 20); // Adjust typing speed here
    }

    return () => clearInterval(typingInterval);
  }, [currentCode]);

  useEffect(() => {
    const codeInterval = setInterval(() => {
      if (!isTyping) {
        if (terminalRef.current) {
          const newCode = document.createElement('pre');
          newCode.className = 'text-white/80 text-xs sm:text-sm font-mono mb-4 whitespace-pre opacity-0 transition-opacity duration-500';
          newCode.textContent = displayedCode;
          terminalRef.current.appendChild(newCode);
          
          // Trigger fade in
          setTimeout(() => {
            newCode.classList.remove('opacity-0');
          }, 50);

          // Auto-scroll to bottom
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;

          // Remove old code if too many lines
          if (terminalRef.current.children.length > 20) {
            terminalRef.current.removeChild(terminalRef.current.children[0]);
          }

          // Generate new code
          setDisplayedCode('');
          setCurrentCode(generateCode());
        }
      }
    }, 4000); // Adjust interval between code blocks

    return () => clearInterval(codeInterval);
  }, [isTyping, displayedCode]);

  return (
    <div 
      ref={terminalRef} 
      className="h-[calc(100vh-16rem)] overflow-y-auto bg-black/50 backdrop-blur-sm p-4 border border-white/20 rounded-lg"
    >
      {displayedCode && (
        <pre className="text-white/80 text-xs sm:text-sm font-mono mb-4 whitespace-pre">
          {displayedCode}
          <span className="animate-pulse">_</span>
        </pre>
      )}
    </div>
  );
};

export default Terminal;