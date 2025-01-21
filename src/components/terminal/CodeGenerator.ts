import { useState, useEffect } from 'react';

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

export const generateCode = () => {
  return functions[Math.floor(Math.random() * functions.length)];
};

export const useCodeGeneration = () => {
  const [displayedCode, setDisplayedCode] = useState<string[]>(['']);
  const maxDisplayedLines = 100;

  const typeCharacter = (currentCode: string, tempCode: string, currentIndex: number) => {
    if (currentIndex < currentCode.length) {
      const randomDelay = Math.random() < 0.1;
      if (!randomDelay) {
        const newTempCode = tempCode + currentCode[currentIndex];
        setDisplayedCode(prev => {
          const newArray = [...prev];
          if (newArray.length >= maxDisplayedLines) {
            newArray.shift();
          }
          newArray[newArray.length - 1] = newTempCode;
          return newArray;
        });
        setTimeout(() => typeCharacter(currentCode, newTempCode, currentIndex + 1), 35);
      } else {
        setTimeout(() => typeCharacter(currentCode, tempCode, currentIndex), 100);
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

  useEffect(() => {
    const initialCode = generateCode();
    typeCharacter(initialCode, '', 0);

    const typingInterval = setInterval(() => {
      const currentCode = generateCode();
      if (!currentCode) return;
      typeCharacter(currentCode, '', 0);
    }, 4000);

    return () => clearInterval(typingInterval);
  }, []);

  return displayedCode;
};