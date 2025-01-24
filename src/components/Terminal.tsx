import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [displayedCode, setDisplayedCode] = useState<string[]>(['']);
  const [currentTime, setCurrentTime] = useState(new Date());
  const status = 'ACTIVE';

  const statusColors = {
    ACTIVE: 'bg-green-500',
    SCANNING: 'bg-blue-500',
    PROCESSING: 'bg-yellow-500',
    ANALYZING: 'bg-purple-500'
  };

  const generateSolanaCode = async () => {
    try {
      const connection = new Connection(clusterApiUrl('mainnet-beta'));
      const signatures = await connection.getSignaturesForAddress(
        new PublicKey('1111111111111111111111111111111111111111111'),
        { limit: 1 }
      );

      if (signatures.length > 0) {
        const tx = signatures[0];
        return `async function processSolanaTransaction() {
    // Transaction signature: ${tx.signature.substring(0, 20)}...
    const blockTime = new Date(${tx.blockTime! * 1000});
    console.log("Processing transaction at block ${tx.slot}");
    await validateTransaction({
        slot: ${tx.slot},
        timestamp: blockTime,
        confirmationStatus: "${tx.confirmationStatus}"
    });
    return { status: "SUCCESS" };
}`;
      }
    } catch (error) {
      return generateDefaultCode();
    }
  };

  const generateDefaultCode = () => {
    const functions = [
      `function analyzeSolanaProtocol() {
    console.log("[ SOLANA PROTOCOL ANALYSIS ]");
    const protocol = {
        status: "ACTIVE",
        network: "MAINNET",
        modules: ["Transaction Processing", "Block Validation"]
    };
    console.log(":: PROTOCOL CONFIGURATION ::");
    initializeProtocol(protocol);
}`,
      `async function validateSolanaBlock(block) {
    console.log(":: BLOCK VALIDATION ::");
    if (block.transactions > 0) {
        console.log("> Processing transactions...");
        return true;
    }
    return false;
}`,
      `function monitorNetwork() {
    console.log(":: NETWORK MONITORING ::");
    console.log("> Scanning for new blocks...");
    return {
        status: "healthy",
        latency: "23ms",
        peers: 200
    };
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

    const typeNextBlock = async () => {
      const code = await generateSolanaCode() || generateDefaultCode();
      if (!code) return;

      const typeCharacter = () => {
        if (currentIndex < code.length) {
          tempCode += code[currentIndex];
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
          setDisplayedCode(prev => {
            const newArray = [...prev, ''];
            if (newArray.length > maxDisplayedLines) {
              newArray.shift();
            }
            return newArray;
          });
          
          setTimeout(() => {
            currentIndex = 0;
            tempCode = '';
            typeNextBlock();
          }, 1000);
        }
      };

      typeCharacter();
    };

    typeNextBlock();

    return () => {
      currentIndex = 0;
    };
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
      
      <div 
        ref={terminalRef} 
        className="terminal-body h-[calc(100vh-16rem)] sm:h-[calc(100vh-26rem)] overflow-y-auto overflow-x-hidden p-2 sm:p-4 border border-white/5 rounded-lg scrollbar-hide"
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
          <pre key={index} className="text-white/90 text-xs sm:text-sm font-mono mb-2 sm:mb-4 whitespace-pre hover:text-white/100 transition-colors">
            {code}
            {index === displayedCode.length - 1 && (
              <span className="animate-pulse inline-block w-1.5 sm:w-2 h-3 sm:h-4 bg-white/90 ml-1 glow">_</span>
            )}
          </pre>
        ))}
      </div>
    </div>
  );
};

export default Terminal;